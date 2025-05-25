import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { arbitrum, base, mainnet, optimism } from "viem/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to parse logo URI to shared gateway
export function parseIpfsUri(uri: string | null): string | null {
  if (!uri) return null;

  const cid = uri.replace(/^ipfs:\/\//, "");
  if (!cid) return null;

  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
// Helper function to determine decimal places based on value
export function getDecimalPlaces(value: number): number {
  if (value >= 1000) return 2;
  if (value >= 100) return 3;
  if (value >= 10) return 4;
  if (value >= 1) return 4;
  if (value >= 0.1) return 5;
  if (value >= 0.01) return 6;
  return 8;
}

export function formatBalance(value: number): string {
  const actualValue = value / 1e18;
  const decimalPlaces = getDecimalPlaces(actualValue);
  return actualValue.toFixed(decimalPlaces).replace(/\.?0+$/, "");
}

export function getChainName(chainId: number): string {
  switch (chainId) {
    case 1:
      return "mainnet";
    case 42161:
      return "arbitrum";
    case 8453:
      return "base";
    case 10:
      return "optimism";
    default:
      return "ethereum";
  }
}

// Revnet grouping utilities
export function groupParticipantsBySuckerGroup<
  T extends {
    chainId: number;
    projectId: number;
    project: { suckerGroupId: string | null };
  }
>(participants: T[]) {
  return participants.reduce((groups, participant) => {
    const groupId =
      participant.project.suckerGroupId ||
      `${participant.chainId}-${participant.projectId}`;

    if (!groups[groupId]) {
      groups[groupId] = [];
    }
    groups[groupId].push(participant);
    return groups;
  }, {} as Record<string, T[]>);
}

export function aggregateGroupData<
  T extends {
    chainId: number;
    balance: number;
    cashOutValue: bigint | number;
  }
>(participants: T[]) {
  return {
    totalBalance: participants.reduce((sum, p) => sum + p.balance, 0),
    totalCashOutValue: participants.reduce(
      (sum, p) => sum + Number(p.cashOutValue),
      0
    ),
    uniqueChains: [...new Set(participants.map((p) => p.chainId))] as number[],
  };
}

export function getGroupDisplayInfo(participants: { chainId: number }[]) {
  const uniqueChains = [...new Set(participants.map((p) => p.chainId))];
  const chainNames = uniqueChains.map((chainId) => getChainName(chainId));

  return {
    isMultiChain: participants.length > 1,
    chainCount: uniqueChains.length,
    chainNames,
  };
}

export function getRevnetUrl(chainId: number, projectId: number): string {
  const chainPrefix = getChainPrefix(chainId);
  return `https://revnet.app/${chainPrefix}:${projectId}`;
}

function getChainPrefix(chainId: number): string {
  switch (chainId) {
    case mainnet.id:
      return "eth";
    case optimism.id:
      return "op";
    case arbitrum.id:
      return "arb";
    case base.id:
      return "base";
    default:
      return "eth"; // fallback to eth
  }
}

export const getShortAddress = (addr: string): string => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};
