"use client";

import { useAccount } from "wagmi";
import { AccountView } from "@/components/AccountView";
import { GlobalStats } from "@/components/GlobalStats";
import Footer from "@/components/footer";

export default function Home() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  return (
    <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto">
      <div className="flex-1">
        <GlobalStats />

        {isConnected && address && !isConnecting && !isReconnecting ? (
          <AccountView address={address} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 mx-auto px-8">
            <p className="text-muted-foreground">
              Connect your wallet to view your portfolio
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
