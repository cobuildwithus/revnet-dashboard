import { type Event, type Context, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on("JBTokens:Burn", burn);

async function burn({
  event,
  context,
}: {
  event: Event<"JBTokens:Burn">;
  context: Context<"JBTokens:Burn">;
}) {
  const { projectId: _projectId, holder, count } = event.args;
  const projectId = Number(_projectId);
  const { id: chainId } = context.chain;

  await context.db
    .update(project, {
      chainId,
      projectId,
    })
    .set(({ erc20Supply }) => ({
      erc20Supply: erc20Supply - count,
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
