import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { projectUniqueId } from "../../lib/ids";

ponder.on("REVDeployer:DeployRevnet", deployRevnet);

async function deployRevnet(params: {
  event: Event<"REVDeployer:DeployRevnet">;
  context: Context<"REVDeployer:DeployRevnet">;
}) {
  const { context, event } = params;

  const { args } = event;

  const { revnetId } = args;

  await context.db.insert(project).values({
    id: projectUniqueId(context.chain.id, revnetId),
    chainId: context.chain.id,
    projectId: revnetId.toString(),
    isRevnet: true,
  });
}
