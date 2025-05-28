import { http } from "viem";

const getPrefix = (chain: "base" | "eth" | "arbitrum" | "optimism") => {
  switch (chain) {
    case "base":
      return "base-mainnet";
    case "eth":
      return "mainnet";
    case "arbitrum":
      return "arbitrum-mainnet";
    case "optimism":
      return "optimism-mainnet";
  }
};

const constructUrl = (prefix: string) =>
  http(`https://${prefix}.infura.io/v3/${process.env.INFURA_API_KEY}`);

export const rpcUrl = (chain: "base" | "eth" | "arbitrum" | "optimism") => {
  const prefix = getPrefix(chain);
  return constructUrl(prefix);
};
