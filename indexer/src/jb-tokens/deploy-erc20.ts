import { ponder, type Event, type Context } from "ponder:registry";
import { project } from "ponder:schema";

ponder.on("JBTokens:DeployERC20", deployErc20);

async function deployErc20({
  event,
  context,
}: {
  event: Event<"JBTokens:DeployERC20">;
  context: Context<"JBTokens:DeployERC20">;
}) {
  const { args } = event;
  const { symbol, token, name, projectId } = args;

  const _project = await context.db.find(project, {
    projectId: Number(projectId),
    chainId: context.chain.id,
  });

  if (!_project) {
    throw new Error("Missing project");
  }

  await context.db
    .update(project, {
      projectId: Number(projectId),
      chainId: context.chain.id,
    })
    .set({
      erc20: token,
      erc20Name: name,
      erc20Symbol: symbol,
    });
}
