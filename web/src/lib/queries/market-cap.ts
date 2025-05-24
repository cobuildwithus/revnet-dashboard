"use server";

import { unstable_cache } from "next/cache";
import database from "@/lib/database";

const getTotalMarketCapUncached = async (): Promise<string> => {
  const result = await database.project.aggregate({
    _sum: {
      balance: true,
    },
    where: {
      isRevnet: true,
    },
  });

  return result._sum.balance?.toString() || "0";
};
export const getTotalMarketCap = unstable_cache(
  getTotalMarketCapUncached,
  ["total-market-cap"],
  {
    revalidate: 3600,
  }
);
