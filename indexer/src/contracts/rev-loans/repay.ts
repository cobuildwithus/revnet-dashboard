import { ponder, type Context, type Event } from "ponder:registry";
import { loan, repayLoanEvent, project } from "ponder:schema";

ponder.on("RevLoans:RepayLoan", handleRepayLoan);

async function handleRepayLoan(params: {
  event: Event<"RevLoans:RepayLoan">;
  context: Context<"RevLoans:RepayLoan">;
}) {
  const { event, context } = params;
  const {
    loanId,
    loan: _loan,
    paidOffLoanId,
    paidOffLoan,
    revnetId,
    repayBorrowAmount,
    collateralCountToReturn,
    beneficiary,
    caller,
  } = event.args;

  const projectId = Number(revnetId);
  const chainId = context.chain.id;

  const _project = await context.db.find(project, {
    projectId,
    chainId,
  });

  if (!_project) {
    throw new Error("Missing project");
  }

  const shouldCreateLoan = loanId !== paidOffLoanId;

  if (shouldCreateLoan) {
    // Partial repayment: old loan is burned, new loan is created
    await context.db
      .insert(loan)
      .values({
        id: paidOffLoanId,
        projectId,
        chainId,
        createdAt: Number(paidOffLoan.createdAt),
        borrowAmount: paidOffLoan.amount,
        collateral: paidOffLoan.collateral,
        prepaidDuration: Number(paidOffLoan.prepaidDuration),
        prepaidFeePercent: Number(paidOffLoan.prepaidFeePercent),
        token: paidOffLoan.source.token,
        terminal: paidOffLoan.source.terminal,
        beneficiary,
        sourceFeeAmount: BigInt(0), // This will be set by the borrow event
        owner: caller,
      })
      .onConflictDoUpdate(() => ({
        createdAt: Number(paidOffLoan.createdAt),
        borrowAmount: paidOffLoan.amount,
        collateral: paidOffLoan.collateral,
        prepaidDuration: Number(paidOffLoan.prepaidDuration),
        prepaidFeePercent: Number(paidOffLoan.prepaidFeePercent),
        token: paidOffLoan.source.token,
        terminal: paidOffLoan.source.terminal,
        beneficiary,
        sourceFeeAmount: BigInt(0),
        owner: caller,
      }));
  } else {
    // Complete repayment: loan is fully paid off
    await context.db.update(loan, { id: loanId, chainId }).set({
      borrowAmount: BigInt(0),
      collateral: BigInt(0),
    });
  }

  // Insert the repay event (ID is auto-generated)
  await context.db.insert(repayLoanEvent).values({
    chainId,
    txHash: event.transaction.hash,
    timestamp: Number(event.block.timestamp),
    caller: event.transaction.from,
    from: event.transaction.from,
    logIndex: event.log.logIndex,
    projectId,
    suckerGroupId: _project.suckerGroupId || `project-${projectId}`,
    loanId,
    paidOffLoanId,
    repayBorrowAmount,
    collateralCountToReturn,
  });
}
