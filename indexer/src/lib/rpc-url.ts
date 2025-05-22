import { http } from "viem";

const getPrefix = (chain: "base" | "eth" | "arbitrum" | "optimism") => {
  switch (chain) {
    case "base":
      return "base-mainnet";
    case "eth":
      return "eth-mainnet";
    case "arbitrum":
      return "arb-mainnet";
    case "optimism":
      return "opt-mainnet";
  }
};

const constructUrl = (prefix: string) =>
  http(`https://${prefix}.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

export const rpcUrl = (chain: "base" | "eth" | "arbitrum" | "optimism") => {
  const prefix = getPrefix(chain);
  return constructUrl(prefix);
};
