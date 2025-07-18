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

  // Derive a provisional cycle number. This will be updated (with full accuracy)
  // once the corresponding `RulesetQueued` event is processed, but setting it
  // here avoids having a placeholder value of 0 in the interim.
  let cycleNumber = 1;
  if (basedOnId > 0n) {
    const baseRuleset = await context.db.find(ruleset, {
      chainId,
      projectId,
      rulesetId: basedOnId,
    });
    if (!baseRuleset) {
      throw new Error(
        `Missing base ruleset ${basedOnId.toString()} for project ${projectId} on chain ${chainId}`
      );
    }

    // We cannot know yet if any cycles were skipped (that requires duration &
    // start from the queued event), so we assume the typical sequential case
    // of exactly one cycle ahead of the base.
    cycleNumber = baseRuleset.cycleNumber + 1;
  }

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
      suckerGroupId: _project.suckerGroupId,
      rulesetId,
      createdAt: Number(event.block.timestamp),
      queuedAt: Number(event.block.timestamp), // Set to same as createdAt for now
      cycleNumber, // Provisional value; will be re-evaluated when queued
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
      // Only update immutable or authoritative fields. We intentionally do NOT
      // update cycleNumber here to avoid overwriting the finalized
      // values that the later RulesetQueued handler will compute.
      basedOnId,
      createdAt: Number(event.block.timestamp),
    });
}
