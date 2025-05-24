"use client";

import useSWR from "swr";
import { getAccountData } from "@/lib/queries/account-data";

export function useAccountData(address: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR(
    address ? ["account-data", address] : null,
    () => (address ? getAccountData(address) : Promise.resolve(null))
  );

  return {
    accountData: data,
    error,
    isLoading,
    mutate,
  };
}
