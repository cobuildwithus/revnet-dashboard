"use server";

import { unstable_cache } from "next/cache";
import { getClient } from "@/lib/client";
import { contracts } from "../../../../addresses";
import { revLoansAbi } from "../../../../lib/abis";

const getBorrowableAmountUncached = async (
  chainId: number,
  revnetId: number,
  collateralCount: number,
  decimals: number,
  currency: number
): Promise<string> => {
  try {
    const client = getClient(chainId);

    const address = contracts.REVLoans[chainId.toString() as keyof typeof contracts.REVLoans];
    if (!address) throw new Error(`REVLoans contract not found for chainId: ${chainId}`);

    const result = await client.readContract({
      address,
      abi: revLoansAbi,
      functionName: "borrowableAmountFrom",
      args: [BigInt(revnetId), BigInt(collateralCount), BigInt(decimals), BigInt(currency)],
    });

    return result.toString();
  } catch (error) {
    console.error("Failed to get borrowable amount:", error);
    return "0";
  }
};

export const getBorrowableAmount = unstable_cache(getBorrowableAmountUncached, [
  "borrowable-amount",
]);

interface BorrowableAmountParams {
  chainId: number;
  revnetId: number;
  collateralCount: number;
  decimals: number;
  currency: number;
}

const getMultipleBorrowableAmountsUncached = async (
  paramsList: BorrowableAmountParams[]
): Promise<{
  amounts: string[];
  totalAmount: string;
}> => {
  try {
    const results = await Promise.all(
      paramsList.map(({ chainId, revnetId, collateralCount, decimals, currency }) =>
        getBorrowableAmountUncached(chainId, revnetId, collateralCount, decimals, currency)
      )
    );

    const totalAmount = results.reduce((sum, amount) => sum + Number(amount), 0);

    return {
      amounts: results,
      totalAmount: totalAmount.toString(),
    };
  } catch (error) {
    console.error("Failed to get multiple borrowable amounts:", error);
    return {
      amounts: [],
      totalAmount: "0",
    };
  }
};

export const getMultipleBorrowableAmounts = unstable_cache(getMultipleBorrowableAmountsUncached, [
  "multiple-borrowable-amounts",
]);
