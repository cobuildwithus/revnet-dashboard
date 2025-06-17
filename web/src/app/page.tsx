"use client";

import { useAccount } from "wagmi";
import { AccountView } from "@/components/account-view";
import { GlobalStats } from "@/components/global-stats";

export default function Home() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  return (
    <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto">
      <div className="flex-1">
        <GlobalStats />

        {isConnected && address && !isConnecting && !isReconnecting && (
          <AccountView address={address} />
        )}
      </div>
    </div>
  );
}
