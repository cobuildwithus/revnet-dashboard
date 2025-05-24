"use server";

import { unstable_cache } from "next/cache";
import database from "@/lib/database";

const getTotalLoanedUncached = async (): Promise<string> => {
  const result = await database.loan.aggregate({
    _sum: {
      borrowAmount: true,
    },
  });

  return result._sum.borrowAmount?.toString() || "0";
};

export const getTotalLoaned = unstable_cache(
  getTotalLoanedUncached,
  ["total-loaned"],
  {
    revalidate: 3600, // 1 hour
  }
);
