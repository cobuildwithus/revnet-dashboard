import { ponder, type Context, type Event } from "ponder:registry";
import { loan, liquidateLoanEvent, project } from "ponder:schema";

ponder.on("RevLoans:Liquidate", handleLiquidate);

async function handleLiquidate(params: {
  event: Event<"RevLoans:Liquidate">;
  context: Context<"RevLoans:Liquidate">;
}) {
  const { event, context } = params;
  const { loanId, revnetId, loan: _loan } = event.args;

  const projectId = Number(revnetId);
  const chainId = context.chain.id;

  const _project = await context.db.find(project, {
    projectId,
    chainId,
  });

  if (!_project) {
    throw new Error("Missing project");
  }

  // Update loan to reflect liquidation (collateral is forfeited)
  await context.db
    .update(loan, {
      id: loanId,
      chainId,
    })
    .set({
      collateral: _loan.collateral,
      borrowAmount: _loan.amount,
    });

  // Insert the liquidate event (ID is auto-generated)
  await context.db.insert(liquidateLoanEvent).values({
    chainId,
    txHash: event.transaction.hash,
    timestamp: Number(event.block.timestamp),
    caller: event.transaction.from,
    from: event.transaction.from,
    logIndex: event.log.logIndex,
    projectId,
    suckerGroupId: _project.suckerGroupId || `project-${projectId}`,
    borrowAmount: _loan.amount,
    collateral: _loan.collateral,
  });
}
