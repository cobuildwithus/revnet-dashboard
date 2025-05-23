import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on(
  "JBController:SendReservedTokensToSplits",
  sendReservedTokensToSplits
);

async function sendReservedTokensToSplits(params: {
  event: Event<"JBController:SendReservedTokensToSplits">;
  context: Context<"JBController:SendReservedTokensToSplits">;
}) {
  const { event, context } = params;
  const { args } = event;
  const { projectId: _projectId, tokenCount } = args;
  const projectId = Number(_projectId);
  const chainId = context.chain.id;

  await context.db.update(project, { chainId, projectId }).set((p) => ({
    pendingReservedTokens: p.pendingReservedTokens - tokenCount,
  }));

  await refreshProjectCashoutCoefficients({
    db: context.db,
    chainId,
    projectId,
  });
}
