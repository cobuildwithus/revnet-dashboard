import { type Event, type Context, ponder } from "ponder:registry";
import { project } from "ponder:schema";

ponder.on("JBTokens:Burn", burn);

async function burn({
  event,
  context,
}: {
  event: Event<"JBTokens:Burn">;
  context: Context<"JBTokens:Burn">;
}) {
  const { projectId: _projectId, holder, count } = event.args;
  const projectId = Number(_projectId);
  const { id: chainId } = context.chain;

  const _project = await context.db.find(project, { projectId, chainId });

  if (!_project) {
    throw new Error("Missing project");
  }

  await context.db
    .update(project, {
      chainId,
      projectId,
    })
    .set(({ erc20Supply }) => ({
      erc20Supply: erc20Supply - count,
    }));

  //todo
}
