"use client";

import { useAccountData } from "@/lib/hooks/use-account-data";
import { AccountHeader } from "@/app/account/[addressOrEns]/components/account-header";
import { AccountStats } from "@/app/account/[addressOrEns]/components/account-stats";
import { RevnetsTable } from "@/app/account/[addressOrEns]/components/revnets-table";
import { Skeleton } from "@/components/ui/skeleton";

type AccountData = Awaited<
  ReturnType<typeof import("@/lib/queries/account-data").getAccountData>
>;

interface AccountViewProps {
  address: string;
  data?: AccountData;
}

export function AccountView({ address, data }: AccountViewProps) {
  const { accountData, isLoading, error } = useAccountData(
    data ? undefined : address
  );

  // Use provided data or hook data
  const finalData = data || accountData;
  const finalIsLoading = data ? false : isLoading;
  const finalError = data ? null : error;

  if (finalIsLoading) {
    return (
      <main className="py-12 px-4 md:px-8 mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton height={40} width="300px" />
            <Skeleton height={20} width="200px" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton height={100} width="100%" />
            <Skeleton height={100} width="100%" />
            <Skeleton height={100} width="100%" />
          </div>
          <Skeleton height={300} width="100%" />
        </div>
      </main>
    );
  }

  if (finalError) {
    return (
      <main className="py-12 px-4 md:px-8 mx-auto">
        <div className="text-center">
          <p className="text-red-500">
            Error loading account data. {finalError.message}
          </p>
        </div>
      </main>
    );
  }

  if (!finalData) {
    return null;
  }

  return (
    <main className="py-12 px-4 md:px-8 mx-auto">
      <AccountHeader
        address={address}
        displayName={finalData.profile.name}
        avatarUrl={finalData.profile.avatar}
        bio={finalData.profile.bio}
      />

      <AccountStats
        totalCashOutValue={finalData.stats.totalCashOutValue}
        totalRevnets={finalData.stats.totalRevnets}
        totalBorrowableAmount={finalData.stats.totalBorrowableAmount}
      />

      <RevnetsTable participants={finalData.participants} />
    </main>
  );
}
