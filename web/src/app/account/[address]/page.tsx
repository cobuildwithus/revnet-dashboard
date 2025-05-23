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

  const profile = await getProfile(address);
  const displayName = profile?.name || "revnet.eth";
  const avatarUrl = profile?.avatar;

  const participants = await database.participant.findMany({
    where: {
      address: addressLower,
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
        },
      },
    },
  });

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
      />

      <TokensTable participants={participants} />
    </main>
  );
}
