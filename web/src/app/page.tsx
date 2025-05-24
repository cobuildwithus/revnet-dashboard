"use client";

import { useAccount } from "wagmi";
import { AccountView } from "@/components/AccountView";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen">
      {isConnected && address ? (
        <AccountView address={address} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-muted-foreground">
            Connect your wallet to view your portfolio
          </p>
        </div>
      )}
    </div>
  );
}
