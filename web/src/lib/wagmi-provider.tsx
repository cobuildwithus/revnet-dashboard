"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { useTheme } from "next-themes";
import { PropsWithChildren } from "react";
import { WagmiProvider as WagmiProviderBase } from "wagmi";
import { wagmiConfig } from "./wagmi.config";

const queryClient = new QueryClient();

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  const { resolvedTheme } = useTheme();

  return (
    <WagmiProviderBase config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode={resolvedTheme === "dark" ? "dark" : "light"}>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProviderBase>
  );
};
