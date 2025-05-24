import database from "@/lib/database";
import { getProfile } from "@/lib/profile-data";
import { AccountHeader } from "./components/AccountHeader";
import { AccountStats } from "./components/AccountStats";
import { TokensTable } from "./components/TokensTable";

interface Props {
  params: Promise<{ address: string }>;
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;
  const addressLower = address.toLowerCase() as `0x${string}`;

  const [profile, participantsWithBorrowableAmounts] = await Promise.all([
    getProfile(address),
    getParticipantsWithBorrowableAmounts(addressLower),
  ]);

  const displayName = profile?.name || "revnet.eth";
  const avatarUrl = profile?.avatar;

  // Calculate totals
  const totalCashOutValue = participantsWithBorrowableAmounts.reduce(
    (sum, p) => sum + Number(p.cashOutValue),
    0
  );
  const totalBorrowableAmount = participantsWithBorrowableAmounts.reduce(
    (sum, p) => sum + Number(p.borrowableAmount),
    0
  );
  const totalRevnets = participantsWithBorrowableAmounts.length;

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
        totalBorrowableAmount={totalBorrowableAmount}
        totalRevnets={totalRevnets}
      />

      <TokensTable participants={participantsWithBorrowableAmounts} />
    </main>
  );
}

async function getParticipantsWithBorrowableAmounts(address: `0x${string}`) {
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
      borrowableAmount: true,
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

  return participants;
}
