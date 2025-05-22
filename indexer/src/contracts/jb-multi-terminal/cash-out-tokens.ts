import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on("JBMultiTerminal:CashOutTokens", cashOutTokens);

async function cashOutTokens(params: {
  event: Event<"JBMultiTerminal:CashOutTokens">;
  context: Context<"JBMultiTerminal:CashOutTokens">;
}) {
  const { context, event } = params;
  const { args } = event;
  const { id: chainId } = context.chain;

  const { projectId: _projectId, reclaimAmount } = args;
  const projectId = Number(_projectId);

  await context.db
    .update(project, {
      projectId,
      chainId,
    })
    .set((p) => ({
      redeemCount: p.redeemCount + 1,
      redeemVolume: p.redeemVolume + reclaimAmount,
      balance: p.balance - reclaimAmount,
    }));

  await refreshProjectCashoutCoefficients({
    db: context.db,
    chainId,
    projectId,
  });
}
