"use server";

import { unstable_cache } from "next/cache";
import database from "@/lib/database";

const getTotalRevnetsUncached = async (): Promise<number> => {
  const count = await database.project.count({
    where: {
      isRevnet: true,
    },
  });

  return count;
};

export const getTotalRevnets = unstable_cache(
  getTotalRevnetsUncached,
  ["total-revnets"],
  {
    revalidate: 3600, // 1 hour
  }
);
