import { ponder, type Event, type Context } from "ponder:registry";
import { ruleset, project } from "ponder:schema";
import { unpackMetadata } from "../../lib/ruleset-metadata";
import { deriveStartFrom } from "../../lib/ruleset-utils";
import { zeroAddress } from "viem";

ponder.on("JBRulesets:RulesetQueued", handleRulesetQueued);

async function handleRulesetQueued({
  event,
  context,
}: {
  event: Event<"JBRulesets:RulesetQueued">;
  context: Context<"JBRulesets:RulesetQueued">;
}) {
  const { args } = event;
  const {
    rulesetId,
    projectId: _projectId,
    duration: _duration,
    weight: _weight,
    weightCutPercent: _weightCutPercent,
    approvalHook,
    metadata: _metadata,
    mustStartAtOrAfter: _mustStartAtOrAfter,
    caller,
  } = args;

  const projectId = Number(_projectId);
  const chainId = context.chain.id;
  const duration = Number(_duration);
  const weightCutPercent = Number(_weightCutPercent);
  const mustStartAtOrAfter = Number(_mustStartAtOrAfter);

  // The raw weight value from the event. This may be a flag (1) indicating the
  // on-chain contract derived the real weight from the previous ruleset. We
  // replicate that derivation below so the indexed data stores the *actual*
  // weight value rather than the flag sentinel.
  let weight = _weight;

  // Verify project exists
  const _project = await context.db.find(project, {
    projectId,
    chainId,
  });

  if (!_project) {
    throw new Error(`Missing project ${projectId} on chain ${chainId}`);
  }

  // Unpack metadata
  const unpackedMetadata = unpackMetadata(_metadata);

  // Calculate cycle number (accurately handles skipped cycles between the base ruleset and the newly queued one)
  const previousRuleset = await context.db.find(ruleset, {
    chainId,
    projectId,
    rulesetId,
  });

  let cycleNumber = 1;
  // Track how many cycles have elapsed since the base (defaults to 0)
  let cyclesElapsed = 0;
  // Will hold the base ruleset if we find one – used for zero-duration checks
  let baseRuleset: {
    duration: bigint;
    cycleNumber: number;
    weight: bigint;
    weightCutPercent: number;
    start: bigint;
    rulesetId: bigint;
  } | null = null;

  if (previousRuleset && previousRuleset.basedOnId > 0n) {
    // Get the base ruleset to determine cycle number and, if needed, derive weight
    baseRuleset = await context.db.find(ruleset, {
      chainId,
      projectId,
      rulesetId: previousRuleset.basedOnId,
    });

    // If the base ruleset is unexpectedly missing, fail loud to avoid corrupt data
    if (!baseRuleset) {
      throw new Error(
        `Missing base ruleset ${previousRuleset.basedOnId.toString()} for project ${projectId} on chain ${chainId}`
      );
    }

    // ---------------------------------------------------------------------
    //        Derive cycle number & cycles elapsed (handles skipped cycles)
    // ---------------------------------------------------------------------
    if (baseRuleset.duration !== 0n) {
      const gap =
        BigInt(mustStartAtOrAfter) > baseRuleset.start
          ? BigInt(mustStartAtOrAfter) - baseRuleset.start
          : 0n;
      // floor division gives the number of *full* cycles completed since base
      cyclesElapsed = Number(gap / baseRuleset.duration);
    }

    // For zero-duration bases, a new cycle starts immediately after the base
    // "instant cycle" completes, so we always increment by exactly one.
    if (baseRuleset.duration === 0n) {
      cycleNumber = baseRuleset.cycleNumber + 1;
    } else {
      // Otherwise, the new cycle is the base plus the number of full cycles that have elapsed
      cycleNumber = baseRuleset.cycleNumber + cyclesElapsed;
    }

    // -------------------------------------------------------------------
    //              Derive weight when the flag (weight == 1) is used
    // -------------------------------------------------------------------
    if (weight === 1n) {
      const MAX_WEIGHT_CUT_PERCENT = 1_000_000_000n; // JBConstants.MAX_WEIGHT_CUT_PERCENT
      const baseWeight = baseRuleset.weight;
      const cutPercent = BigInt(baseRuleset.weightCutPercent);
      const cutFactor = MAX_WEIGHT_CUT_PERCENT - cutPercent;

      // Number of cuts to apply equals cyclesElapsed, except we always apply
      // at least one cut when the base ruleset duration is 0 (instant cycle)
      const cyclesToApply = baseRuleset.duration === 0n ? 1 : cyclesElapsed;

      let derivedWeight = baseWeight;
      for (let i = 0; i < cyclesToApply; i++) {
        derivedWeight = (derivedWeight * cutFactor) / MAX_WEIGHT_CUT_PERCENT;
      }
      weight = derivedWeight;
    }
  }

  // --------------------------------------------------------------
  //        Derive the actual start time of the new ruleset
  // --------------------------------------------------------------
  const derivedStart = baseRuleset
    ? deriveStartFrom(
        baseRuleset.start,
        baseRuleset.duration,
        BigInt(mustStartAtOrAfter)
      )
    : BigInt(mustStartAtOrAfter);

  // ---------------------------------------------------------------------
  //   Determine active status, accounting for zero-duration base rulesets
  // ---------------------------------------------------------------------
  // Use the block timestamp of the event as the reference clock to avoid any
  // local-machine time drift.
  const now = BigInt(event.block.timestamp);
  const isActive =
    (baseRuleset && baseRuleset.duration === 0n) || derivedStart <= now;

  // Ensure only one ruleset is marked active at a time. If this new ruleset is
  // already active (either because the base had duration 0 *or* its start time
  // is now in the past), mark the base as inactive.
  if (baseRuleset && (baseRuleset.duration === 0n || isActive)) {
    await context.db
      .update(ruleset, {
        chainId,
        projectId,
        rulesetId: baseRuleset.rulesetId,
      })
      .set({ isActive: false });
  }

  // Create or update the ruleset with all queue data
  await context.db
    .insert(ruleset)
    .values({
      chainId,
      projectId,
      rulesetId,
      createdAt: Number(event.block.timestamp),
      queuedAt: Number(event.block.timestamp),
      cycleNumber,
      basedOnId: previousRuleset?.basedOnId || 0n,
      start: derivedStart,
      duration: BigInt(duration),
      weight,
      weightCutPercent,
      approvalHook: approvalHook === zeroAddress ? null : approvalHook,
      metadata: _metadata,
      mustStartAtOrAfter: BigInt(mustStartAtOrAfter),
      caller,
      isActive,
      // Unpacked metadata fields
      reservedPercent: unpackedMetadata.reservedPercent,
      cashOutTaxRate: unpackedMetadata.cashOutTaxRate,
      baseCurrency: unpackedMetadata.baseCurrency,
      pausePay: unpackedMetadata.pausePay,
      pauseCreditTransfers: unpackedMetadata.pauseCreditTransfers,
      allowOwnerMinting: unpackedMetadata.allowOwnerMinting,
      allowSetCustomToken: unpackedMetadata.allowSetCustomToken,
      allowTerminalMigration: unpackedMetadata.allowTerminalMigration,
      allowSetTerminals: unpackedMetadata.allowSetTerminals,
      allowSetController: unpackedMetadata.allowSetController,
      allowAddAccountingContext: unpackedMetadata.allowAddAccountingContext,
      allowAddPriceFeed: unpackedMetadata.allowAddPriceFeed,
      ownerMustSendPayouts: unpackedMetadata.ownerMustSendPayouts,
      holdFees: unpackedMetadata.holdFees,
      useTotalSurplusForCashOuts: unpackedMetadata.useTotalSurplusForCashOuts,
      useDataHookForPay: unpackedMetadata.useDataHookForPay,
      useDataHookForCashOut: unpackedMetadata.useDataHookForCashOut,
      dataHook:
        unpackedMetadata.dataHook === zeroAddress
          ? null
          : unpackedMetadata.dataHook,
      metadataExtra: unpackedMetadata.metadataExtra,
    })
    .onConflictDoUpdate({
      queuedAt: Number(event.block.timestamp),
      cycleNumber,
      start: derivedStart,
      duration: BigInt(duration),
      weight,
      weightCutPercent,
      approvalHook: approvalHook === zeroAddress ? null : approvalHook,
      metadata: _metadata,
      mustStartAtOrAfter: BigInt(mustStartAtOrAfter),
      caller,
      isActive,
      // Update all unpacked metadata fields
      reservedPercent: unpackedMetadata.reservedPercent,
      cashOutTaxRate: unpackedMetadata.cashOutTaxRate,
      baseCurrency: unpackedMetadata.baseCurrency,
      pausePay: unpackedMetadata.pausePay,
      pauseCreditTransfers: unpackedMetadata.pauseCreditTransfers,
      allowOwnerMinting: unpackedMetadata.allowOwnerMinting,
      allowSetCustomToken: unpackedMetadata.allowSetCustomToken,
      allowTerminalMigration: unpackedMetadata.allowTerminalMigration,
      allowSetTerminals: unpackedMetadata.allowSetTerminals,
      allowSetController: unpackedMetadata.allowSetController,
      allowAddAccountingContext: unpackedMetadata.allowAddAccountingContext,
      allowAddPriceFeed: unpackedMetadata.allowAddPriceFeed,
      ownerMustSendPayouts: unpackedMetadata.ownerMustSendPayouts,
      holdFees: unpackedMetadata.holdFees,
      useTotalSurplusForCashOuts: unpackedMetadata.useTotalSurplusForCashOuts,
      useDataHookForPay: unpackedMetadata.useDataHookForPay,
      useDataHookForCashOut: unpackedMetadata.useDataHookForCashOut,
      dataHook:
        unpackedMetadata.dataHook === zeroAddress
          ? null
          : unpackedMetadata.dataHook,
      metadataExtra: unpackedMetadata.metadataExtra,
    });
}
