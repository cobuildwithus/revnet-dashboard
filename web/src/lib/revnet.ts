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
    ethBalance?: number;
    projectId?: number;
    project?: {
      erc20Supply: number | string | { toString(): string }; // Prisma Decimal type
      cashoutA: number | string | { toString(): string }; // Prisma Decimal type
      cashoutB: number | string | { toString(): string }; // Prisma Decimal type
      balance?: number | string | { toString(): string }; // Project balance
    };
  }
>(participants: T[]) {
  const totalBalance = participants.reduce((sum, p) => sum + p.balance, 0);
  // Prefer ethBalance if available (native-equivalent value), otherwise fall back to cashOutValue
  const totalCashOutValue = participants.reduce((sum, p) => {
    if (p.ethBalance !== undefined) {
      return sum + p.ethBalance;
    }
    return sum + Number(p.cashOutValue);
  }, 0);

  // Group by project to calculate conditional net worth per project
  const projectGroups = participants.reduce((groups, participant) => {
    const key = `${participant.chainId}-${participant.projectId || 0}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(participant);
    return groups;
  }, {} as Record<string, T[]>);

  return {
    totalBalance,
    totalCashOutValue,
    uniqueChains: [...new Set(participants.map((p) => p.chainId))] as number[],
  };
}

export function getGroupDisplayInfo(participants: { chainId: number }[]) {
  const uniqueChains = [...new Set(participants.map((p) => p.chainId))];
  const chainNames = uniqueChains.map((chainId) => {
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
  });

  return {
    isMultiChain: participants.length > 1,
    chainCount: uniqueChains.length,
    chainNames,
  };
}
