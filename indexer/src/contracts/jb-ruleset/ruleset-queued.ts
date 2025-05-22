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
    if (baseRuleset) {
      // Derive the number of cycles that have elapsed between the base ruleset
      // and the intended start of the newly-queued ruleset.
      if (baseRuleset.duration !== 0n) {
        const gap =
          BigInt(mustStartAtOrAfter) > baseRuleset.start
            ? BigInt(mustStartAtOrAfter) - baseRuleset.start
            : 0n;
        cyclesElapsed = Number(gap / baseRuleset.duration);
      }

      cycleNumber = baseRuleset.cycleNumber + cyclesElapsed + 1;

      // -------------------------------------------------------------------
      //              Derive weight when the flag (weight == 1) is used
      // -------------------------------------------------------------------
      if (weight === 1n) {
        const MAX_WEIGHT_CUT_PERCENT = 1_000_000_000n; // JBConstants.MAX_WEIGHT_CUT_PERCENT
        const baseWeight = baseRuleset.weight;
        const cutPercent = BigInt(baseRuleset.weightCutPercent);
        const cutFactor = MAX_WEIGHT_CUT_PERCENT - cutPercent;
        // Apply the cut once per cycle between base and new (cyclesElapsed+1)
        let derivedWeight = baseWeight;
        const cyclesToApply = cyclesElapsed + 1; // always at least 1
        for (let i = 0; i < cyclesToApply; i++) {
          derivedWeight = (derivedWeight * cutFactor) / MAX_WEIGHT_CUT_PERCENT;
        }
        weight = derivedWeight;
      }
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
  const now = BigInt(Math.floor(Date.now() / 1000));
  const isActive =
    (baseRuleset && baseRuleset.duration === 0n) || derivedStart <= now;

  // If the base ruleset had duration = 0, it ends immediately once this new
  // ruleset is queued, so mark the base as inactive.
  if (baseRuleset && baseRuleset.duration === 0n) {
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
