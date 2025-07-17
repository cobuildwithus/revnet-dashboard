"use server";

import database from "@/lib/database";
import { getProfile } from "@/lib/profile-data";
import { getBorrowableAmount } from "@/lib/hooks/rev-loans/get-borrowable-amount";
import { unstable_cache } from "next/cache";
import { resolveEnsToAddress } from "../ens";
import { getShortAddress } from "../formatting";
import { NATIVE_TOKEN } from "@/lib/config";

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
    (sum, p) => sum + (p.ethBalance ?? Number(p.cashOutValue)),
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
          accountingToken: true,
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

  // Build mapping of backing revnet token -> price in ETH (balance / supply)
  const tokensToLookup = Array.from(
    new Set(
      participants
        .map((p) => p.project.accountingToken?.toLowerCase())
        .filter(
          (token): token is `0x${string}` =>
            !!token && token !== NATIVE_TOKEN.toLowerCase()
        )
    )
  );

  let backingProjects: {
    erc20: string | null;
    cashoutA: number;
    cashoutB: number;
  }[] = [];

  if (tokensToLookup.length > 0) {
    backingProjects = (
      await database.project.findMany({
        where: {
          erc20: { in: tokensToLookup },
          isRevnet: true,
        },
        select: {
          erc20: true,
          cashoutA: true,
          cashoutB: true,
        },
      })
    ).map((bp) => ({
      erc20: bp.erc20,
      cashoutA: Number(bp.cashoutA),
      cashoutB: Number(bp.cashoutB),
    }));
  }

  const tokenPriceMap = new Map<string, number>();
  for (const bp of backingProjects) {
    if (!bp.erc20) continue;
    // price per token in ETH = (cashoutA + cashoutB) / 1e18 (wei to eth)
    const A = BigInt(bp.cashoutA.toString());
    const B = BigInt(bp.cashoutB.toString());
    const priceWei = A + B;
    const priceEth = Number(priceWei) / 1e18;
    tokenPriceMap.set(bp.erc20.toLowerCase(), priceEth);
  }

  // Get borrowable amounts and compute ethBalance for all participants
  const participantsWithExtra = await Promise.all(
    participants.map(async (participant) => {
      const borrowableAmount = await getBorrowableAmount(
        participant.chainId,
        participant.projectId,
        Number(participant.balance),
        18,
        1
      );

      // Calculate ethBalance
      let ethBalance = 0;
      const acctToken = participant.project.accountingToken?.toLowerCase();
      if (!acctToken || acctToken === NATIVE_TOKEN.toLowerCase()) {
        // Native token backed – cashOutValue is in ETH
        ethBalance = Number(participant.cashOutValue);
      } else {
        const price = tokenPriceMap.get(acctToken);
        if (price !== undefined) {
          ethBalance = Number(participant.cashOutValue) * price;
        }
      }

      return {
        ...participant,
        balance: Number(participant.balance),
        borrowableAmount: Number(borrowableAmount),
        ethBalance,
      };
    })
  );

  return participantsWithExtra;
}
