import { ponder, type Event, type Context } from "ponder:registry";
import { ruleset, project } from "ponder:schema";
import { unpackMetadata } from "../../lib/ruleset-metadata";
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
    weight,
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

  // Calculate cycle number (this is simplified - in production you'd need to query previous rulesets)
  const previousRuleset = await context.db.find(ruleset, {
    chainId,
    projectId,
    rulesetId,
  });

  let cycleNumber = 1;
  if (previousRuleset && previousRuleset.basedOnId > 0n) {
    // Get the base ruleset to determine cycle number
    const baseRuleset = await context.db.find(ruleset, {
      chainId,
      projectId,
      rulesetId: previousRuleset.basedOnId,
    });
    if (baseRuleset) {
      cycleNumber = baseRuleset.cycleNumber + 1;
    }
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
      start: BigInt(mustStartAtOrAfter),
      duration: BigInt(duration),
      weight,
      weightCutPercent,
      approvalHook: approvalHook === zeroAddress ? null : approvalHook,
      metadata: _metadata,
      mustStartAtOrAfter: BigInt(mustStartAtOrAfter),
      caller,
      isActive: mustStartAtOrAfter <= new Date().getTime() / 1000,
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
      start: BigInt(mustStartAtOrAfter),
      duration: BigInt(duration),
      weight,
      weightCutPercent,
      approvalHook: approvalHook === zeroAddress ? null : approvalHook,
      metadata: _metadata,
      mustStartAtOrAfter: BigInt(mustStartAtOrAfter),
      caller,
      isActive: mustStartAtOrAfter <= new Date().getTime() / 1000,
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
