import { db } from "ponder:api";
import { getRevnetTokenPrice } from "./token-price";

export async function getProjects(chainId: number, projectId: number) {
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
      suckerGroupId: true,
    },
    where: (project, { eq, and }) =>
      and(eq(project.projectId, projectId), eq(project.chainId, chainId)),
  });

  if (!project) return null;

  // Get all projects with the same suckerGroupId
  const allProjects = await db.query.project.findMany({
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
      suckerGroupId: true,
    },
    where: (project, { eq }) =>
      eq(project.suckerGroupId, project.suckerGroupId),
  });

  // Build the response array with token prices
  const projectsWithPrices = await Promise.all(
    allProjects.map(async (proj) => {
      const tokenPrice = await getRevnetTokenPrice(
        proj.projectId,
        proj.chainId
      );

      return {
        chainId: proj.chainId,
        projectId: proj.projectId,
        name: proj.name,
        tagline: proj.projectTagline,
        token: {
          name: proj.erc20Name,
          symbol: proj.erc20Symbol,
          address: proj.erc20,
          price: tokenPrice,
          disclosure: proj.metadata?.payDisclosure || "",
        },
        suckerGroupId: proj.suckerGroupId,
      };
    })
  );

  return projectsWithPrices;
}
