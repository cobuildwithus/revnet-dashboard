import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";

ponder.on("JBMultiTerminal:SendPayouts", sendPayouts);

async function sendPayouts(params: {
  event: Event<"JBMultiTerminal:SendPayouts">;
  context: Context<"JBMultiTerminal:SendPayouts">;
}) {
  const { context, event } = params;
  const { args } = event;
  const { id: chainId } = context.chain;

  const { projectId: _projectId, amountPaidOut } = args;
  const projectId = Number(_projectId);

  await context.db
    .update(project, {
      chainId,
      projectId,
    })
    .set((p) => ({
      balance: p.balance - amountPaidOut,
    }));
}
