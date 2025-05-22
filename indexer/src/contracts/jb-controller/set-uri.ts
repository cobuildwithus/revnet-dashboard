import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { fetchProjectMetadata } from "../../lib/project-metadata";

ponder.on("JBController:SetUri", setUri);

async function setUri(params: {
  event: Event<"JBController:SetUri">;
  context: Context<"JBController:SetUri">;
}) {
  const { event, context } = params;
  const { args } = event;
  const { projectId: _projectId, uri } = args;
  const projectId = Number(_projectId);
  const chainId = context.chain.id;

  const metadata = await fetchProjectMetadata(uri);

  await context.db.update(project, { chainId, projectId }).set({
    metadataUri: uri,
    metadata,
    name: metadata?.name,
    infoUri: metadata?.infoUri,
    logoUri: metadata?.logoUri,
    coverImageUri: metadata?.coverImageUri,
    twitter: metadata?.twitter,
    discord: metadata?.discord,
    telegram: metadata?.telegram,
    tokens: metadata?.tokens,
    domain: metadata?.domain,
    description: metadata?.description,
    tags: metadata?.tags,
    projectTagline: metadata?.projectTagline,
  });
}
