"use client";

import useSWR from "swr";
import { getMultipleBorrowableAmounts } from "./get-borrowable-amount";

interface BorrowableAmountParams {
  chainId: number;
  revnetId: bigint;
  collateralCount: bigint;
  decimals?: number;
  currency?: number;
}

export function useMultipleBorrowableAmounts(
  paramsList: BorrowableAmountParams[]
) {
  // Convert bigints to numbers for the server function
  const serverParams = paramsList.map((p) => ({
    chainId: p.chainId,
    revnetId: Number(p.revnetId),
    collateralCount: Number(p.collateralCount),
    decimals: p.decimals || 18,
    currency: p.currency || 1,
  }));

  const { data, error, isLoading, mutate } = useSWR(
    ["multiple-borrowable-amounts", serverParams],
    () => getMultipleBorrowableAmounts(serverParams),
    {
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  return {
    borrowableAmounts: data?.amounts || [],
    totalBorrowableAmount: Number(data?.totalAmount || 0),
    error,
    isLoading,
    mutate,
  };
}
