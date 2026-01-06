import { type Context, type Event, ponder } from "ponder:registry";
import { project, suckerGroup } from "ponder:schema";

ponder.on("JBProjects:Create", create);

async function create(params: {
  event: Event<"JBProjects:Create">;
  context: Context<"JBProjects:Create">;
}) {
  const { context, event } = params;
  const { args, block } = event;
  const { projectId, owner, caller } = args;

  const chainId = context.chain.id;
  const projectIdNum = Number(projectId);

  // Idempotency guard: the create event can be replayed during crash recovery/reorgs.
  const existing = await context.db.find(project, {
    chainId,
    projectId: projectIdNum,
  });
  if (existing) return;

  // Create a unique identifier for the project using chainId and projectId
  const projectUniqueId = `${chainId}-${projectIdNum}`;

  // Create a default sucker group for the project
  const newSuckerGroup = await context.db.insert(suckerGroup).values({
    projects: [projectUniqueId],
    addresses: [] as `0x${string}`[],
    createdAt: Number(block.timestamp),
  });

  // Create the project with the suckerGroupId
  await context.db.insert(project).values({
    chainId,
    projectId: projectIdNum,
    isRevnet: false,
    createdAt: Number(block.timestamp),
    owner,
    deployer: caller,
    suckerGroupId: newSuckerGroup.id,
    accountingToken: "0x0000000000000000000000000000000000000000",
    accountingDecimals: 18,
    accountingCurrency: 0n,
    accountingTokenSymbol: "",
    accountingTokenName: "",
  });
}
