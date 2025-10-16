import { ponder, type Context, type Event } from "ponder:registry";
import { loan, borrowLoanEvent, project, activityLog } from "ponder:schema";
import { revLoansAbi } from "juice-sdk-core";
import { contracts } from "../../../addresses";
import { formatAmount } from "../../util/format-amount";

ponder.on("RevLoans:Borrow", handleBorrow);

async function handleBorrow(params: {
  event: Event<"RevLoans:Borrow">;
  context: Context<"RevLoans:Borrow">;
}) {
  const { event, context } = params;
  const {
    revnetId,
    beneficiary,
    loanId,
    loan: _loan,
    caller,
    source,
    sourceFeeAmount,
    borrowAmount,
    collateralCount,
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

  let tokenUri: string | undefined;
  try {
    tokenUri = await context.client.readContract({
      abi: revLoansAbi,
      address: contracts.REVLoans,
      functionName: "tokenURI",
      args: [loanId],
    });
  } catch (e) {
    console.warn("Failed to fetch tokenURI for loan", loanId, e);
  }

  // Insert the loan record
  await context.db.insert(loan).values({
    id: loanId,
    projectId,
    chainId,
    suckerGroupId: _project.suckerGroupId,
    owner: caller,
    beneficiary,
    borrowAmount,
    collateral: collateralCount,
    createdAt: Number(_loan.createdAt),
    token: source.token,
    terminal: source.terminal,
    sourceFeeAmount,
    prepaidDuration: Number(_loan.prepaidDuration),
    prepaidFeePercent: Number(_loan.prepaidFeePercent),
    tokenUri,
  });

  // Insert the borrow event (ID is auto-generated)
  await context.db.insert(borrowLoanEvent).values({
    chainId,
    txHash: event.transaction.hash,
    timestamp: Number(event.block.timestamp),
    caller: event.transaction.from,
    from: event.transaction.from,
    logIndex: event.log.logIndex,
    projectId,
    suckerGroupId: _project.suckerGroupId || `project-${projectId}`,
    beneficiary,
    borrowAmount,
    collateral: collateralCount,
    token: source.token,
    terminal: source.terminal,
    sourceFeeAmount,
    prepaidDuration: Number(_loan.prepaidDuration),
    prepaidFeePercent: Number(_loan.prepaidFeePercent),
  });

  await context.db.insert(activityLog).values({
    type: "borrow",
    user: event.transaction.from,
    amount: formatAmount(borrowAmount, _project.accountingDecimals ?? 18),
    currency: _project.accountingTokenSymbol || "ETH",
    description: `borrowed with ${formatAmount(collateralCount, 18)} $${
      _project.erc20Symbol || "ETH"
    } as collateral`,
    chainId,
    timestamp: Number(event.block.timestamp),
    txHash: event.transaction.hash,
    suckerGroupId: _project.suckerGroupId,
  });
}
