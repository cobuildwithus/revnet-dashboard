import { type Context, type Event, ponder } from "ponder:registry";
import { participant, project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on("JBMultiTerminal:Pay", pay);

async function pay(params: {
  event: Event<"JBMultiTerminal:Pay">;
  context: Context<"JBMultiTerminal:Pay">;
}) {
  const { context, event } = params;
  const { args } = event;

  const { projectId: _projectId, amount, payer } = args;
  const { id: chainId } = context.chain;
  const projectId = Number(_projectId);

  const payerParticipant = await context.db.find(participant, {
    address: payer,
    projectId,
    chainId,
  });

  await context.db
    .update(project, {
      projectId,
      chainId,
    })
    .set((p) => ({
      balance: p.balance + amount,
      paymentsCount: p.paymentsCount + 1,
      contributorsCount: p.contributorsCount + (payerParticipant ? 0 : 1),
    }));

  await refreshProjectCashoutCoefficients({
    db: context.db,
    chainId,
    projectId,
  });
}
