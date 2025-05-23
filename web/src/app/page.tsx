"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isConnected && address ? (
        <Link href={`/account/${address}`}>
          <Button>View my portfolio</Button>
        </Link>
      ) : (
        <p className="text-muted-foreground">
          Connect your wallet to view your portfolio
        </p>
      )}
    </div>
  );
}
