import database from "@/lib/database";
import { getProfile } from "@/lib/profile-data";
import { AccountHeader } from "./components/AccountHeader";
import { AccountStats } from "./components/AccountStats";
import { RevnetsTable } from "./components/RevnetsTable";

interface Props {
  params: Promise<{ address: string }>;
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;
  const addressLower = address.toLowerCase() as `0x${string}`;

  const [profile, participants] = await Promise.all([
    getProfile(address),
    getParticipants(addressLower),
  ]);

  const displayName = profile?.name || "revnet.eth";
  const avatarUrl = profile?.avatar;

  // Calculate totals
  const totalCashOutValue = participants.reduce(
    (sum, p) => sum + Number(p.cashOutValue),
    0
  );

  const totalRevnets = participants.length;

  return (
    <main className="p-8">
      <AccountHeader
        address={address}
        displayName={displayName}
        avatarUrl={avatarUrl}
        bio={profile?.bio}
      />

      <AccountStats
        totalCashOutValue={totalCashOutValue}
        totalRevnets={totalRevnets}
        totalBorrowableAmount={0}
      />

      <RevnetsTable participants={participants} />
    </main>
  );
}

async function getParticipants(address: `0x${string}`) {
  const participants = await database.participant.findMany({
    where: {
      address,
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
        },
      },
    },
  });

  return participants.map((participant) => ({
    ...participant,
    balance: Number(participant.balance),
  }));
}
