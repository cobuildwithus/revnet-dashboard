import { ponder, type Context, type Event } from "ponder:registry";
import { project, rulesetActivationState } from "ponder:schema";

ponder.on("CheckRulesetBase:block", handleRulesetActivation);
ponder.on("CheckRulesetEthereum:block", handleRulesetActivation);
ponder.on("CheckRulesetOptimism:block", handleRulesetActivation);
ponder.on("CheckRulesetArbitrum:block", handleRulesetActivation);

async function handleRulesetActivation(params: {
  event: Event<
    | "CheckRulesetBase:block"
    | "CheckRulesetEthereum:block"
    | "CheckRulesetOptimism:block"
    | "CheckRulesetArbitrum:block"
  >;
  context: Context<
    | "CheckRulesetBase:block"
    | "CheckRulesetEthereum:block"
    | "CheckRulesetOptimism:block"
    | "CheckRulesetArbitrum:block"
  >;
}) {
  const { context, event } = params;
  const chainId = context.chain.id;
  const currentTimestamp = BigInt(event.block.timestamp);
  const state = await context.db.find(rulesetActivationState, { chainId });
  const lastChecked = state?.lastChecked ?? 0n;
  const effectiveLastChecked = lastChecked > 0n ? lastChecked - 1n : 0n;

  // Fetch rulesets that became active since the last check (start time passed)
  const pendingRulesets = await context.db.sql.query.ruleset.findMany({
    where: (ruleset, { eq, lte, gt, and }) =>
      and(
        eq(ruleset.chainId, chainId),
        gt(ruleset.start, effectiveLastChecked),
        lte(ruleset.start, currentTimestamp)
      ),
    columns: {
      projectId: true,
      rulesetId: true,
      start: true,
    },
  });

  // Group rulesets by projectId and select the one with the largest start time per project
  const latestRulesetsByProject = new Map<
    number,
    { rulesetId: bigint; start: bigint }
  >();

  for (const ruleset of pendingRulesets) {
    const existing = latestRulesetsByProject.get(ruleset.projectId);
    if (!existing || ruleset.start > existing.start) {
      latestRulesetsByProject.set(ruleset.projectId, {
        rulesetId: ruleset.rulesetId,
        start: ruleset.start,
      });
    }
  }

  const latestRulesets = Array.from(latestRulesetsByProject.entries());

  // Process all rulesets in parallel
  await Promise.all(
    latestRulesets.map(async ([projectId, { rulesetId }]) => {
      // Fetch current project to check if update is needed
      const currentProject = await context.db.find(project, {
        chainId,
        projectId,
      });

      if (!currentProject) {
        throw new Error(`Missing project ${projectId} on chain ${chainId}`);
      }

      // Only update if the currentRulesetId is different
      if (currentProject.currentRulesetId !== rulesetId) {
        await context.db
          .update(project, {
            chainId,
            projectId,
          })
          .set({
            currentRulesetId: rulesetId,
          });
      }
    })
  );

  await context.db
    .insert(rulesetActivationState)
    .values({
      chainId,
      lastChecked: currentTimestamp,
    })
    .onConflictDoUpdate({
      lastChecked: currentTimestamp,
    });
}
