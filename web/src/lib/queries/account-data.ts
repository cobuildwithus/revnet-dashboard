"use server";

import database from "@/lib/database";
import { getProfile } from "@/lib/profile-data";
import { getBorrowableAmount } from "@/lib/hooks/rev-loans/get-borrowable-amount";

export async function getAccountData(address: string) {
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
      name: profile?.name || "revnet.eth",
      avatar: profile?.avatar,
      bio: profile?.bio,
    },
    participants,
    stats: {
      totalCashOutValue,
      totalBorrowableAmount,
      totalRevnets,
    },
  };
}

async function getParticipants(address: `0x${string}`) {
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
        },
      },
    },
  });

  // Get borrowable amounts for all participants
  const participantsWithBorrowableAmount = await Promise.all(
    participants.map(async (participant) => {
      const borrowableAmount = await getBorrowableAmount(
        participant.chainId,
        participant.projectId,
        Number(participant.balance)
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
