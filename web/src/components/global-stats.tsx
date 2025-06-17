"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketCap } from "@/lib/hooks/use-market-cap";
import { useTotalLoaned } from "@/lib/hooks/use-total-loaned";
import { useTotalRevnets } from "@/lib/hooks/use-total-revnets";
import { Logo } from "./revnet-logo";

export function GlobalStats() {
  const { marketCap, isLoading: marketCapLoading } = useMarketCap();
  const { totalLoaned, isLoading: totalLoanedLoading } = useTotalLoaned();
  const { totalRevnets, isLoading: totalRevnetsLoading } = useTotalRevnets();

  const marketCapEth = marketCap ? (Number(marketCap) / 1e18).toFixed(2) : "0";
  const totalLoanedEth = totalLoaned
    ? (Number(totalLoaned) / 1e18).toFixed(2)
    : "0";

  return (
    <div className="w-full mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Logo className="w-12 h-12" title="Revdash logo" />
          <h1 className="text-5xl font-extrabold text-primary italic">
            revdash
          </h1>
        </div>
        <p className="text-muted-foreground text-lg italic">
          Track the revenue that runs itself
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Market Cap
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">
              {marketCapLoading ? (
                <Skeleton height={32} width="120px" rounded="rounded-md" />
              ) : (
                `Ξ ${marketCapEth}`
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Total Loaned
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">
              {totalLoanedLoading ? (
                <Skeleton height={32} width="120px" rounded="rounded-md" />
              ) : (
                `Ξ ${totalLoanedEth}`
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Total Revnets
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">
              {totalRevnetsLoading ? (
                <Skeleton height={32} width="120px" rounded="rounded-md" />
              ) : (
                totalRevnets || 0
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
