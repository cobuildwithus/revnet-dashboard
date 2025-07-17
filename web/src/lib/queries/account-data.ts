"use server";

import database from "@/lib/database";
import { getProfile } from "@/lib/profile-data";
import { getBorrowableAmount } from "@/lib/hooks/rev-loans/get-borrowable-amount";
import { unstable_cache } from "next/cache";
import { resolveEnsToAddress } from "../ens";
import { getShortAddress } from "../formatting";

export async function getAccountData(addressOrEns: string) {
  let address: string;

  // Check if it's an ENS name (contains .eth or other TLD)
  if (addressOrEns.includes(".")) {
    const resolvedAddress = await resolveEnsToAddress(addressOrEns);
    if (!resolvedAddress) {
      throw new Error(`Failed to resolve ENS name: ${addressOrEns}`);
    }
    address = resolvedAddress;
  } else {
    address = addressOrEns;
  }

  const addressLower = address.toLowerCase() as `0x${string}`;

  const [profile, participants] = await Promise.all([
    getProfile(address),
    getParticipants(addressLower),
  ]);

  // Calculate totals
  const totalCashOutValue = participants.reduce(
    (sum, p) => sum + Number(p.cashOutValue),
    0
  );

  const totalBorrowableAmount = participants.reduce(
    (sum, p) => sum + Number(p.borrowableAmount),
    0
  );

  const uniqueSuckerGroupIds = new Set(
    participants.map((p) => p.project.suckerGroupId).filter((id) => id !== null)
  );
  const totalRevnets = uniqueSuckerGroupIds.size;

  return {
    profile: {
      name: profile?.name || getShortAddress(address),
      avatar: profile?.avatar,
      bio: profile?.bio,
      address,
    },
    participants,
    stats: {
      totalCashOutValue,
      totalBorrowableAmount,
      totalRevnets,
    },
  };
}

const getParticipantsFromDbUncached = async (address: `0x${string}`) => {
  const participants = await database.participant.findMany({
    where: {
      address,
      isRevnet: true,
    },
    select: {
      address: true,
      cashOutValue: true,
      balance: true,
      projectId: true,
      chainId: true,
      project: {
        select: {
          name: true,
          erc20Symbol: true,
          erc20: true,
          logoUri: true,
          chainId: true,
          suckerGroupId: true,
          erc20Supply: true,
          cashoutA: true,
          cashoutB: true,
          balance: true,
        },
      },
    },
  });

  return participants.map((participant) => ({
    ...participant,
    balance: Number(participant.balance),
    cashOutValue: Number(participant.cashOutValue),
    project: {
      ...participant.project,
      // Ensure any Decimal/BigInt fields are safely serializable
      erc20Supply: Number(participant.project.erc20Supply),
      cashoutA: Number(participant.project.cashoutA),
      cashoutB: Number(participant.project.cashoutB),
      balance: Number(participant.project.balance),
    },
  }));
};

const getParticipantsFromDb = unstable_cache(
  getParticipantsFromDbUncached,
  ["participants-db"],
  {
    revalidate: 60, // Cache for 1 minute
    tags: ["participants"],
  }
);

async function getParticipants(address: `0x${string}`) {
  const participants = await getParticipantsFromDb(address);

  // Get borrowable amounts for all participants
  const participantsWithBorrowableAmount = await Promise.all(
    participants.map(async (participant) => {
      const borrowableAmount = await getBorrowableAmount(
        participant.chainId,
        participant.projectId,
        Number(participant.balance),
        18,
        1
      );

      return {
        ...participant,
        balance: Number(participant.balance),
        borrowableAmount: Number(borrowableAmount),
      };
    })
  );

  return participantsWithBorrowableAmount;
}
