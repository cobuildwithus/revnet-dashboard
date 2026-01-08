import { type Context, type Event, ponder } from "ponder:registry";
import { project, activityLog } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";
import { formatAmount } from "../../util/format-amount";

ponder.on("JBMultiTerminal:CashOutTokens", cashOutTokens);

async function cashOutTokens(params: {
  event: Event<"JBMultiTerminal:CashOutTokens">;
  context: Context<"JBMultiTerminal:CashOutTokens">;
}) {
  const { context, event } = params;
  const { args } = event;
  const { id: chainId } = context.chain;

  const { projectId: _projectId, rulesetId, reclaimAmount, cashOutCount } = args;
  const projectId = Number(_projectId);

  const updatedProject = await context.db
    .update(project, {
      projectId,
      chainId,
    })
    .set((p) => ({
      redeemCount: p.redeemCount + 1,
      redeemVolume: p.redeemVolume + reclaimAmount,
      balance: p.balance - reclaimAmount,
      currentRulesetId: rulesetId,
    }));

  if (!updatedProject.suckerGroupId) {
    throw new Error("Project has no sucker group id");
  }

  await context.db.insert(activityLog).values({
    type: "cashout",
    user: event.transaction.from,
    amount: formatAmount(reclaimAmount, updatedProject.accountingDecimals ?? 18),
    currency: updatedProject.accountingTokenSymbol || "ETH",
    description: `cashed out ${formatAmount(cashOutCount, 18)} $${updatedProject.erc20Symbol}`,
    chainId,
    timestamp: Number(event.block.timestamp),
    txHash: event.transaction.hash,
    suckerGroupId: updatedProject.suckerGroupId,
  });

  await refreshProjectCashoutCoefficients({
    db: context.db,
    chainId,
    projectId,
    snapshot: {
      timestamp: Number(event.block.timestamp),
      txHash: event.transaction.hash,
    },
  });
}
