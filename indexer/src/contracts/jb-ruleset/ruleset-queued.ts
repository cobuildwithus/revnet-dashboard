import { ponder, type Event, type Context } from "ponder:registry";
import { ruleset, project } from "ponder:schema";
import { unpackMetadata } from "../../lib/ruleset-metadata";
import { deriveStartFrom } from "../../lib/ruleset-utils";
import { zeroAddress } from "viem";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

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
    //   Derive the actual start time *first* so we can precisely measure
    //   how many complete cycles have occurred since the base began.
    // ---------------------------------------------------------------------
    const _derivedStart = deriveStartFrom(
      baseRuleset.start,
      baseRuleset.duration,
      BigInt(mustStartAtOrAfter)
    );

    // ---------------------------------------------------------------------
    //        Derive cycle number & cycles elapsed (handles skipped cycles)
    // ---------------------------------------------------------------------
    if (baseRuleset.duration !== 0n) {
      // The number of *whole* cycles between the base start and the derived
      // start is the authoritative elapsed-cycle count.
      cyclesElapsed = Number(
        (_derivedStart - baseRuleset.start) / baseRuleset.duration
      );
    }

    // For zero-duration bases, a follow-on ruleset is always exactly one cycle
    // ahead. Otherwise, we advance by the number of elapsed cycles.
    cycleNumber =
      baseRuleset.duration === 0n
        ? baseRuleset.cycleNumber + 1
        : baseRuleset.cycleNumber + cyclesElapsed;

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

  const currentTimestamp = new Date().getTime() / 1000;
  if (currentTimestamp > derivedStart) {
    await context.db
      .update(project, {
        chainId,
        projectId,
      })
      .set({
        currentRulesetId: rulesetId,
      });

    await refreshProjectCashoutCoefficients({
      db: context.db,
      chainId,
      projectId,
    });
  }
}
