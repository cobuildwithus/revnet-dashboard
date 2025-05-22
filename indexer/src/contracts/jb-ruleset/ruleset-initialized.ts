import { ponder, type Event, type Context } from "ponder:registry";
import { ruleset, project } from "ponder:schema";

ponder.on("JBRulesets:RulesetInitialized", handleRulesetInitialized);

async function handleRulesetInitialized({
  event,
  context,
}: {
  event: Event<"JBRulesets:RulesetInitialized">;
  context: Context<"JBRulesets:RulesetInitialized">;
}) {
  const { args } = event;
  const { rulesetId, projectId: _projectId, basedOnId, caller } = args;

  const projectId = Number(_projectId);
  const chainId = context.chain.id;

  // Verify project exists
  const _project = await context.db.find(project, {
    projectId,
    chainId,
  });

  if (!_project) {
    throw new Error(`Missing project ${projectId} on chain ${chainId}`);
  }

  // Create or update the ruleset record with initialization data
  await context.db
    .insert(ruleset)
    .values({
      chainId,
      projectId,
      rulesetId,
      createdAt: Number(event.block.timestamp),
      queuedAt: Number(event.block.timestamp), // Set to same as createdAt for now
      cycleNumber: 0, // Will be updated when queued
      basedOnId,
      start: 0n, // Will be updated when queued
      duration: 0n, // Will be updated when queued
      weight: 0n, // Will be updated when queued
      weightCutPercent: 0, // Will be updated when queued
      metadata: 0n, // Will be updated when queued
      caller,
      // Default metadata values
      reservedPercent: 0,
      cashOutTaxRate: 0,
      baseCurrency: 0,
      pausePay: false,
      pauseCreditTransfers: false,
      allowOwnerMinting: false,
      allowSetCustomToken: false,
      allowTerminalMigration: false,
      allowSetTerminals: false,
      allowSetController: false,
      allowAddAccountingContext: false,
      allowAddPriceFeed: false,
      ownerMustSendPayouts: false,
      holdFees: false,
      useTotalSurplusForCashOuts: false,
      useDataHookForPay: false,
      useDataHookForCashOut: false,
    })
    .onConflictDoUpdate({
      basedOnId,
      createdAt: Number(event.block.timestamp),
    });
}
