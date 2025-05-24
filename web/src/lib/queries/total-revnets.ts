"use server";

import { unstable_cache } from "next/cache";
import database from "@/lib/database";

const getTotalRevnetsUncached = async (): Promise<number> => {
  const revnetProjects = await database.project.findMany({
    where: {
      isRevnet: true,
    },
    select: {
      suckerGroupId: true,
    },
  });

  const uniqueSuckerGroupIds = new Set(
    revnetProjects
      .map((project) => project.suckerGroupId)
      .filter((id) => id !== null)
  );

  return uniqueSuckerGroupIds.size;
};

export const getTotalRevnets = unstable_cache(
  getTotalRevnetsUncached,
  ["total-revnets"],
  {
    revalidate: 3600, // 1 hour
  }
);
