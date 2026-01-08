import { type Context, type Event, ponder } from "ponder:registry";
import { activityLog, participant, payEvent, project } from "ponder:schema";
import { refreshProjectCashoutCoefficients } from "../../lib/cashout-coefficients";
import { formatAmount } from "../../util/format-amount";

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
      currentRulesetId: rulesetId,
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
    txnValue: event.transaction.value.toString(),
    payer,
    beneficiary,
    amount,
    newlyIssuedTokenCount,
    memo,
    metadata,
    suckerGroupId: updatedProject.suckerGroupId,
  });

  if (newlyIssuedTokenCount > 0) {
    await context.db.insert(activityLog).values({
      type: "pay",
      user: beneficiary,
      amount: formatAmount(amount, updatedProject.accountingDecimals ?? 18),
      currency: updatedProject.accountingTokenSymbol || "ETH",
      description: `got ${formatAmount(newlyIssuedTokenCount, 18)} $${
        updatedProject.erc20Symbol
      }`,
      memo: memo || undefined,
      chainId,
      timestamp: Number(event.block.timestamp),
      txHash: event.transaction.hash,
      suckerGroupId: updatedProject.suckerGroupId,
    });
  }

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
