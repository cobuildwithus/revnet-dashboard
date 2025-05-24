"use server";

import { unstable_cache } from "next/cache";
import { getClient } from "@/lib/client";
import { contracts } from "../../../../addresses";
import { revLoansAbi } from "../../../../lib/abis";

const getBorrowableAmountUncached = async (
  chainId: number,
  revnetId: number,
  collateralCount: number,
  decimals = 18,
  currency = 1
): Promise<string> => {
  const client = getClient(chainId);

  const result = await client.readContract({
    address: contracts.RevLoans,
    abi: revLoansAbi,
    functionName: "borrowableAmountFrom",
    args: [
      BigInt(revnetId),
      BigInt(collateralCount),
      BigInt(decimals),
      BigInt(currency),
    ],
  });

  return result.toString();
};

export const getBorrowableAmount = unstable_cache(getBorrowableAmountUncached, [
  "borrowable-amount",
]);
