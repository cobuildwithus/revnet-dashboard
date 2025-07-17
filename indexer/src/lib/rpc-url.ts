import { http } from "viem";

type Chain =
  | "base"
  | "eth"
  | "arbitrum"
  | "optimism"
  | "base-sepolia"
  | "eth-sepolia"
  | "arb-sepolia"
  | "opt-sepolia";

const getPrefix = (chain: Chain): string => {
  switch (chain) {
    case "base":
      return "base-mainnet";
    case "eth":
      return "mainnet";
    case "arbitrum":
      return "arbitrum-mainnet";
    case "optimism":
      return "optimism-mainnet";
    case "base-sepolia":
      return "base-sepolia";
    case "eth-sepolia":
      return "sepolia";
    case "arb-sepolia":
      return "arbitrum-sepolia";
    case "opt-sepolia":
      return "optimism-sepolia";
    default:
      // Should be unreachable if Chain is properly typed
      throw new Error(`Unknown chain: ${chain}`);
  }
};

const constructUrl = (prefix: string) =>
  http(`https://${prefix}.infura.io/v3/${process.env.INFURA_API_KEY}`);

export const rpcUrl = (chain: Chain) => {
  const prefix = getPrefix(chain);
  return constructUrl(prefix);
};
