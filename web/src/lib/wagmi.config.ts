import { arbitrum, base, mainnet, optimism } from "viem/chains";
import { createConfig, fallback, http } from "wagmi";
import { coinbaseWallet, safe, walletConnect } from "wagmi/connectors";

const safeConnector = safe({
  allowedDomains: [/^app\.safe\.global$/],
  debug: true,
  shimDisconnect: true,
});

export const transports = {
  [mainnet.id]: fallback([
    ...(process.env.NEXT_PUBLIC_INFURA_ID
      ? [
          http(
            `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
          ),
        ]
      : []),
    http(), // Public RPC fallback
  ]),
  [optimism.id]: fallback([
    ...(process.env.NEXT_PUBLIC_INFURA_ID
      ? [
          http(
            `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
          ),
        ]
      : []),
    http(), // Public RPC fallback
  ]),
  [base.id]: fallback([
    ...(process.env.NEXT_PUBLIC_INFURA_ID
      ? [
          http(
            `https://base-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
          ),
        ]
      : []),
    http(), // Public RPC fallback
  ]),
  [arbitrum.id]: fallback([
    ...(process.env.NEXT_PUBLIC_INFURA_ID
      ? [
          http(
            `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
          ),
        ]
      : []),
    http(), // Public RPC fallback
  ]),
};

export const wagmiConfig = createConfig({
  chains: [mainnet, optimism, arbitrum, base],
  connectors: [
    safeConnector,
    coinbaseWallet({
      appName: "REVNET",
      appLogoUrl: "https://app.revnet.eth.sucks/assets/img/small-bw.svg",
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
      showQrModal: false,
      metadata: {
        name: "REVNET",
        description: "Tokenize revenues and fundraises. 100% autonomous.",
        url: "https://app.revnet.eth.sucks",
        icons: ["https://app.revnet.eth.sucks/assets/img/small-bw.svg"],
      },
    }),
  ],
  transports,
});
