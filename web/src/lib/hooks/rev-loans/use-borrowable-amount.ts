"use client";

import useSWR from "swr";
import { getBorrowableAmount } from "./get-borrowable-amount";

interface UseBorrowableAmountParams {
  chainId: number;
  revnetId: bigint;
  collateralCount: bigint;
  decimals?: number;
  currency?: number;
}

export function useBorrowableAmount({
  chainId,
  revnetId,
  collateralCount,
  decimals = 18,
  currency = 1,
}: UseBorrowableAmountParams) {
  const { data, error, isLoading, mutate } = useSWR(
    [
      "borrowable-amount",
      chainId,
      revnetId.toString(),
      collateralCount.toString(),
      decimals,
      currency,
    ],
    () =>
      getBorrowableAmount(
        chainId,
        Number(revnetId),
        Number(collateralCount),
        decimals,
        currency
      )
  );

  return {
    borrowableAmount: data,
    error,
    isLoading,
    mutate,
  };
}
