import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";

ponder.on("JBProjects:Create", create);

async function create(params: {
  event: Event<"JBProjects:Create">;
  context: Context<"JBProjects:Create">;
}) {
  const { context, event } = params;
  const { args, block } = event;
  const { projectId, owner, caller } = args;

  await context.db.insert(project).values({
    chainId: context.chain.id,
    projectId: Number(projectId),
    isRevnet: false,
    createdAt: Number(block.timestamp),
    owner,
    deployer: caller,
  });
}
