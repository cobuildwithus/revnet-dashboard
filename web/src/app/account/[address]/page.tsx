import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import database from "@/lib/database";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { getProfile } from "@/lib/profile-data";
import { CopyableAddress } from "@/components/copyable-address";
import { parseIpfsUri } from "@/lib/utils";

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
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className={profile?.bio ? "size-20" : "size-16"}>
          <AvatarImage
            src={avatarUrl || "https://placehold.co/64"}
            alt="Avatar"
          />
          <AvatarFallback className={profile?.bio ? "text-xl" : "text-lg"}>
            {displayName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {displayName}
          </h1>
          <CopyableAddress
            address={address}
            className="text-sm text-muted-foreground"
          />
          {profile?.bio && (
            <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Cash out value
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">
              Ξ {(totalCashOutValue / 1e18).toFixed(4)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Borrowable amount
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">
              Ξ {((totalCashOutValue * 0.5) / 1e18).toFixed(4)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Revnets
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">
              {totalRevnets}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16" />
                <TableHead>Token</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Cash out value</TableHead>
                <TableHead>Borrowable amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => {
                const cashOutValueEth = Number(participant.cashOutValue) / 1e18;
                const borrowableAmount = cashOutValueEth * 0.5;
                const chainName =
                  participant.chainId === 1
                    ? "mainnet"
                    : participant.chainId === 42161
                    ? "arbitrum"
                    : participant.chainId === 8453
                    ? "base"
                    : participant.chainId === 10
                    ? "optimism"
                    : "ethereum";

                const logoUrl = parseIpfsUri(participant.project.logoUri);

                return (
                  <TableRow
                    key={`${participant.chainId}-${participant.projectId}`}
                  >
                    <TableCell>
                      <div className="size-8 bg-muted rounded-sm flex items-center justify-center text-xs font-bold">
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={participant.project.name || "Token"}
                            width={32}
                            height={32}
                            className="rounded-sm"
                          />
                        ) : (
                          (
                            participant.project.erc20Symbol ||
                            participant.project.name ||
                            "?"
                          )
                            .substring(0, 2)
                            .toUpperCase()
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {participant.project.erc20Symbol ||
                            participant.project.name ||
                            "Unknown Token"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {participant.project.name || "Unknown Project"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {Number(participant.balance).toFixed(4)}
                        </div>
                        <div className="flex mt-1 space-x-1">
                          <Image
                            src={`https://www.revnet.app/assets/img/logo/${chainName}.svg`}
                            alt={chainName}
                            width={16}
                            height={16}
                            className="rounded"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      Ξ {cashOutValueEth.toFixed(4)}
                    </TableCell>
                    <TableCell className="font-medium">
                      Ξ {borrowableAmount.toFixed(4)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
