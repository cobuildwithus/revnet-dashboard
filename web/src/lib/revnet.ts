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

/**
 * Calculate conditional net worth - what tokens would be worth if all other holders cash out first
 * Formula: projectBalance - cashOut(totalSupply - userSupply)
 *
 * If the user is the most patient and waits for everyone else to cash out first,
 * they would receive whatever balance remains in the project.
 *
 * The cashout formula is: cashOutValue = A * balance + B * balance^2
 * Where A and B are precomputed coefficients stored in the project
 */
export function calculateConditionalNetWorth(
  userBalance: number,
  totalSupply: number,
  cashoutA: string,
  cashoutB: string,
  projectBalance: number
): number {
  // Constants for fixed-point maths (use string to avoid BigInt literal syntax)
  const WAD = BigInt("1000000000000000000"); // 1e18
  const WAD2 = WAD * WAD; // 1e36

  const userBal = BigInt(Math.floor(userBalance));
  const supplyTotal = BigInt(Math.floor(totalSupply));

  // If user owns all tokens, conditional net worth equals project balance
  if (userBal >= supplyTotal || supplyTotal === BigInt(0)) {
    return projectBalance;
  }

  // Coerce coefficients to bigint
  const A = BigInt(cashoutA);
  const B = BigInt(cashoutB);

  const othersSupply = supplyTotal - userBal;

  // othersCashoutValue = (A * othersSupply / 1e18) + (B * othersSupply^2 / 1e36)
  const othersCashoutValueBig =
    (A * othersSupply) / WAD + (B * othersSupply * othersSupply) / WAD2;

  const remainingBalanceBig = BigInt(Math.max(projectBalance, 0));

  // Guard against negative values
  const conditionalNetWorthBig =
    remainingBalanceBig > othersCashoutValueBig
      ? remainingBalanceBig - othersCashoutValueBig
      : BigInt(0);

  // Convert back to number (wei) for UI purposes – note: precision may be lost
  return Number(conditionalNetWorthBig);
}

export function aggregateGroupData<
  T extends {
    chainId: number;
    balance: number;
    cashOutValue: bigint | number;
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
  const totalCashOutValue = participants.reduce(
    (sum, p) => sum + Number(p.cashOutValue),
    0
  );
  console.log({ totalBalance, totalCashOutValue });

  // Calculate total conditional net worth
  let totalConditionalNetWorth = 0;

  // Group by project to calculate conditional net worth per project
  const projectGroups = participants.reduce((groups, participant) => {
    const key = `${participant.chainId}-${participant.projectId || 0}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(participant);
    return groups;
  }, {} as Record<string, T[]>);

  // Calculate conditional net worth for each project group
  for (const projectParticipants of Object.values(projectGroups)) {
    const project = projectParticipants[0].project;
    if (!project) continue;

    const projectTotalBalance = projectParticipants.reduce(
      (sum, p) => sum + p.balance,
      0
    );

    // Use the actual project balance for net-worth calculations.
    // If the balance is missing (undefined/null), we cannot compute a
    // reliable conditional net-worth for this project, so skip it.
    if (project.balance === undefined || project.balance === null) {
      continue;
    }

    const projectBalance = Number(project.balance);

    const conditionalNetWorth = calculateConditionalNetWorth(
      projectTotalBalance,
      Number(project.erc20Supply),
      project.cashoutA.toString(),
      project.cashoutB.toString(),
      projectBalance
    );

    totalConditionalNetWorth += conditionalNetWorth;
  }

  return {
    totalBalance,
    totalCashOutValue,
    totalConditionalNetWorth,
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
