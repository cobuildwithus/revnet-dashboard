"use client";

import useSWR from "swr";
import { getTotalLoaned } from "@/lib/queries/total-loaned";

export function useTotalLoaned() {
  const { data, error, isLoading, mutate } = useSWR("total-loaned", () =>
    getTotalLoaned()
  );

  return {
    totalLoaned: data,
    error,
    isLoading,
    mutate,
  };
}
