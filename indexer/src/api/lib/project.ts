import { db } from "ponder:api";
import { getRevnetTokenPrice } from "./token-price";

export async function getProject(chainId: number, projectId: number) {
  const project = await db.query.project.findFirst({
    columns: {
      chainId: true,
      projectId: true,
      name: true,
      projectTagline: true,
      erc20: true,
      erc20Name: true,
      erc20Symbol: true,
      logoUri: true,
      metadata: true,
    },
    where: (project, { eq, and }) =>
      and(eq(project.projectId, projectId), eq(project.chainId, chainId)),
  });

  if (!project) return null;

  const tokenPrice = await getRevnetTokenPrice(project.projectId, chainId);

  return {
    chainId,
    projectId,
    name: project.name,
    tagline: project.projectTagline,
    token: {
      name: project.erc20Name,
      symbol: project.erc20Symbol,
      address: project.erc20,
      price: tokenPrice,
      disclosure: project.metadata?.payDisclosure || "",
    },
  };
}
