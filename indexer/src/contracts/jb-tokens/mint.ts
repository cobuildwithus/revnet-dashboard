import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on("JBTokens:Mint", mint);

async function mint({
  event,
  context,
}: {
  event: Event<"JBTokens:Mint">;
  context: Context<"JBTokens:Mint">;
}) {
  const { projectId: _projectId, count } = event.args;
  const { id: chainId } = context.chain;
  const projectId = Number(_projectId);

  // Update project: increment erc20Supply
  await context.db
    .update(project, {
      chainId,
      projectId,
    })
    .set(({ erc20Supply }) => ({
      erc20Supply: erc20Supply + count,
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
