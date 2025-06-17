import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on("JBController:MintTokens", mintTokens);

async function mintTokens(params: {
  event: Event<"JBController:MintTokens">;
  context: Context<"JBController:MintTokens">;
}) {
  const { event, context } = params;
  const { args } = event;
  const { projectId: _projectId, beneficiaryTokenCount, tokenCount } = args;
  const projectId = Number(_projectId);
  const chainId = context.chain.id;

  const newReservedTokens = tokenCount - beneficiaryTokenCount;

  await context.db.update(project, { chainId, projectId }).set((p) => ({
    pendingReservedTokens: p.pendingReservedTokens + newReservedTokens,
  }));

  await refreshProjectCashoutCoefficients({
    db: context.db,
    chainId,
    projectId,
  });
}
