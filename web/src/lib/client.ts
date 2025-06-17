import { createPublicClient } from "viem";
import { arbitrum, base, mainnet, optimism } from "viem/chains";
import { transports } from "./wagmi.config";

export const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: transports[mainnet.id],
  batch: { multicall: true },
});

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: transports[optimism.id],
  batch: { multicall: true },
});

export const arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: transports[arbitrum.id],
  batch: { multicall: true },
});

export const baseClient = createPublicClient({
  chain: base,
  transport: transports[base.id],
  batch: { multicall: true },
});

export const getClient = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
      return mainnetClient;
    case optimism.id:
      return optimismClient;
    case arbitrum.id:
      return arbitrumClient;
    case base.id:
      return baseClient;
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
};

export function getChain(chainId: number) {
  switch (chainId) {
    case mainnet.id:
      return mainnet;
    case optimism.id:
      return optimism;
    case arbitrum.id:
      return arbitrum;
    case base.id:
      return base;
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
}
