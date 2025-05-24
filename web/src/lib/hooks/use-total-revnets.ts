"use client";

import useSWR from "swr";
import { getTotalRevnets } from "@/lib/queries/total-revnets";

export function useTotalRevnets() {
  const { data, error, isLoading, mutate } = useSWR("total-revnets", () =>
    getTotalRevnets()
  );

  return {
    totalRevnets: data,
    error,
    isLoading,
    mutate,
  };
}
