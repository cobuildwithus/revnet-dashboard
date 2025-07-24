import { ponder, type Context, type Event } from "ponder:registry";
import { loan, reallocateLoanEvent, project, activityLog } from "ponder:schema";
import { formatAmount } from "../../util/format-amount";

ponder.on("RevLoans:ReallocateCollateral", handleReallocateCollateral);

async function handleReallocateCollateral(params: {
  event: Event<"RevLoans:ReallocateCollateral">;
  context: Context<"RevLoans:ReallocateCollateral">;
}) {
  const { event, context } = params;
  const { loanId, revnetId, reallocatedLoanId, reallocatedLoan, removedcollateralCount, caller } =
    event.args;

  const projectId = Number(revnetId);
  const chainId = context.chain.id;

  const _project = await context.db.find(project, {
    projectId,
    chainId,
  });

  if (!_project) {
    throw new Error("Missing project");
  }

  // Create new loan with reallocated collateral
  await context.db.insert(loan).values({
    id: reallocatedLoanId,
    projectId,
    chainId,
    suckerGroupId: _project.suckerGroupId,
    createdAt: Number(reallocatedLoan.createdAt),
    borrowAmount: reallocatedLoan.amount,
    collateral: reallocatedLoan.collateral,
    prepaidDuration: Number(reallocatedLoan.prepaidDuration),
    prepaidFeePercent: Number(reallocatedLoan.prepaidFeePercent),
    token: reallocatedLoan.source.token,
    terminal: reallocatedLoan.source.terminal,
    beneficiary: caller,
    sourceFeeAmount: BigInt(0),
    owner: caller,
  });

  // Insert the reallocate event (ID is auto-generated)
  await context.db.insert(reallocateLoanEvent).values({
    chainId,
    txHash: event.transaction.hash,
    timestamp: Number(event.block.timestamp),
    caller: event.transaction.from,
    from: event.transaction.from,
    logIndex: event.log.logIndex,
    projectId,
    suckerGroupId: _project.suckerGroupId || `project-${projectId}`,
    loanId,
    reallocatedLoanId,
    removedCollateralCount: removedcollateralCount,
  });

  await context.db.insert(activityLog).values({
    type: "reallocate",
    user: event.transaction.from,
    amount: "0",
    currency: _project.accountingTokenSymbol || "ETH",
    description: `reallocated loan, removed ${formatAmount(removedcollateralCount, 18)} $${
      _project.erc20Symbol || "ETH"
    }`,
    chainId,
    timestamp: Number(event.block.timestamp),
    txHash: event.transaction.hash,
    suckerGroupId: _project.suckerGroupId,
  });
}
