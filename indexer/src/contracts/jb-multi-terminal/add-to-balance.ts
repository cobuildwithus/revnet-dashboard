import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on("JBMultiTerminal:AddToBalance", addToBalance);

async function addToBalance(params: {
  event: Event<"JBMultiTerminal:AddToBalance">;
  context: Context<"JBMultiTerminal:AddToBalance">;
}) {
  const { context, event } = params;
  const { args } = event;
  const { id: chainId } = context.chain;

  const { projectId: _projectId, amount } = args;
  const projectId = Number(_projectId);

  await context.db
    .update(project, {
      chainId,
      projectId,
    })
    .set((p) => ({
      balance: p.balance + amount,
    }));

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
