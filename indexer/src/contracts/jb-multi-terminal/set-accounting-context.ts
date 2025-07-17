import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";

ponder.on("JBMultiTerminal:SetAccountingContext", setAccountingContext);

async function setAccountingContext(params: {
  event: Event<"JBMultiTerminal:SetAccountingContext">;
  context: Context<"JBMultiTerminal:SetAccountingContext">;
}) {
  const { event, context } = params;
  const { args } = event;
  const { id: chainId } = context.chain;

  const { projectId: _projectId, context: accountingContext } = args;

  const projectId = Number(_projectId);
  const { token, decimals, currency } = accountingContext;

  await context.db
    .update(project, {
      chainId,
      projectId,
    })
    .set({
      accountingToken: token,
      accountingDecimals: Number(decimals),
      accountingCurrency: Number(currency),
    });
}
