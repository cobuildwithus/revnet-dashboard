"use client";

import { useAccountData } from "@/lib/hooks/use-account-data";
import { AccountHeader } from "@/app/account/[address]/components/AccountHeader";
import { AccountStats } from "@/app/account/[address]/components/AccountStats";
import { RevnetsTable } from "@/app/account/[address]/components/RevnetsTable";
import { Skeleton } from "@/components/ui/skeleton";

interface AccountViewProps {
  address: string;
}

export function AccountView({ address }: AccountViewProps) {
  const { accountData, isLoading, error } = useAccountData(address);

  if (isLoading) {
    return (
      <main className="py-12 px-8 max-w-screen-xl mx-auto">
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

  if (error) {
    return (
      <main className="py-12 px-8 max-w-screen-xl mx-auto">
        <div className="text-center">
          <p className="text-red-500">
            Error loading account data. {error.message}
          </p>
        </div>
      </main>
    );
  }

  if (!accountData) {
    return null;
  }

  return (
    <main className="py-12 px-8 max-w-screen-xl mx-auto">
      <AccountHeader
        address={address}
        displayName={accountData.profile.name}
        avatarUrl={accountData.profile.avatar}
        bio={accountData.profile.bio}
      />

      <AccountStats
        totalCashOutValue={accountData.stats.totalCashOutValue}
        totalRevnets={accountData.stats.totalRevnets}
        totalBorrowableAmount={accountData.stats.totalBorrowableAmount}
      />

      <RevnetsTable participants={accountData.participants} />
    </main>
  );
}
