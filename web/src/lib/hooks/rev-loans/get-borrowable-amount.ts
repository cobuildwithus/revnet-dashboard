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

interface BorrowableAmountParams {
  chainId: number;
  revnetId: number;
  collateralCount: number;
  decimals?: number;
  currency?: number;
}

const getMultipleBorrowableAmountsUncached = async (
  paramsList: BorrowableAmountParams[]
): Promise<{
  amounts: string[];
  totalAmount: string;
}> => {
  const results = await Promise.all(
    paramsList.map(
      ({ chainId, revnetId, collateralCount, decimals = 18, currency = 1 }) =>
        getBorrowableAmountUncached(
          chainId,
          revnetId,
          collateralCount,
          decimals,
          currency
        )
    )
  );

  const totalAmount = results.reduce((sum, amount) => sum + Number(amount), 0);

  return {
    amounts: results,
    totalAmount: totalAmount.toString(),
  };
};

export const getMultipleBorrowableAmounts = unstable_cache(
  getMultipleBorrowableAmountsUncached,
  ["multiple-borrowable-amounts"]
);
