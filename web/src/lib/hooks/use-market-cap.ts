"use client";

import useSWR from "swr";
import { getTotalMarketCap } from "@/lib/queries/market-cap";

export function useMarketCap() {
  const { data, error, isLoading, mutate } = useSWR("total-market-cap", () =>
    getTotalMarketCap()
  );

  return {
    marketCap: data,
    error,
    isLoading,
    mutate,
  };
}
