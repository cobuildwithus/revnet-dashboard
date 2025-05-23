"use client";

import { WhiskSdkProvider } from "@paperclip-labs/whisk-sdk";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WhiskSdkProvider
      apiKey={process.env.WHISK_API_KEY || ""}
      config={
        {
          // Define configuration for each kit you plan to use.
          // See respective Kit docs for full config.
        }
      }
    >
      {children}
    </WhiskSdkProvider>
  );
}
