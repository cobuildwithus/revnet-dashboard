import { type Context, type Event, ponder } from "ponder:registry";
import { participant, payEvent, project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";

ponder.on("JBMultiTerminal:Pay", pay);

async function pay(params: {
  event: Event<"JBMultiTerminal:Pay">;
  context: Context<"JBMultiTerminal:Pay">;
}) {
  const { context, event } = params;
  const { args } = event;

  const {
    projectId: _projectId,
    amount,
    payer,
    rulesetId,
    rulesetCycleNumber,
    beneficiary,
    newlyIssuedTokenCount,
    memo,
    metadata,
    caller,
  } = args;
  const { id: chainId } = context.chain;
  const projectId = Number(_projectId);

  const payerParticipant = await context.db.find(participant, {
    address: payer,
    projectId,
    chainId,
  });

  const updatedProject = await context.db
    .update(project, {
      projectId,
      chainId,
    })
    .set((p) => ({
      balance: p.balance + amount,
      paymentsCount: p.paymentsCount + 1,
      contributorsCount: p.contributorsCount + (payerParticipant ? 0 : 1),
    }));

  if (!updatedProject.suckerGroupId) {
    throw new Error("Project has no sucker group id");
  }

  await context.db.insert(payEvent).values({
    chainId,
    txHash: event.transaction.hash,
    timestamp: Number(event.block.timestamp),
    caller,
    from: event.transaction.from,
    logIndex: event.log.logIndex,
    projectId,
    rulesetId,
    rulesetCycleNumber,
    payer,
    beneficiary,
    amount,
    newlyIssuedTokenCount,
    memo,
    metadata,
    suckerGroupId: updatedProject.suckerGroupId,
  });

  await refreshProjectCashoutCoefficients({
    db: context.db,
    chainId,
    projectId,
  });
}
