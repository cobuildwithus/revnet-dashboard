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
import { getProfile, getName, getAvatar } from "@/lib/profile-data";
import { CopyableAddress } from "@/components/copyable-address";

interface Props {
  params: Promise<{ address: string }>;
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;

  const addressLower = address.toLowerCase() as `0x${string}`;

  // Fetch profile data from Whisk API
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
    },
  });

  console.log(participants);

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
            <div className="mt-1 text-2xl font-bold text-primary">Ξ 123.45</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Borrowable amount
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">Ξ 67.89</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground">
              Revnets
            </div>
            <div className="mt-1 text-2xl font-bold text-primary">4</div>
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
              {[
                {
                  ticker: "$NANA",
                  name: "Bananapus",
                  balance: "123.45",
                  networks: ["mainnet"],
                  cash: "45.67",
                  borrow: "12.34",
                },
                {
                  ticker: "$REV",
                  name: "Revnet Network",
                  balance: "678.90",
                  networks: ["mainnet", "arbitrum"],
                  cash: "234.56",
                  borrow: "78.90",
                },
                {
                  ticker: "$BAN",
                  name: "Banny Network",
                  balance: "50.00",
                  networks: ["base"],
                  cash: "25.00",
                  borrow: "5.00",
                },
                {
                  ticker: "$CPN",
                  name: "Croptop Publishing Network",
                  balance: "10.00",
                  networks: ["optimism"],
                  cash: "5.00",
                  borrow: "1.00",
                },
              ].map((token) => (
                <TableRow key={token.ticker}>
                  <TableCell>
                    <div className="size-8 bg-muted rounded-sm flex items-center justify-center text-xs font-bold">
                      {token.ticker.substring(1, 3)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{token.ticker}</span>
                      <span className="text-xs text-muted-foreground">
                        {token.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{token.balance}</div>
                      <div className="flex mt-1 space-x-1">
                        {token.networks.map((network) => (
                          <Image
                            key={network}
                            src={`https://www.revnet.app/assets/img/logo/${network}.svg`}
                            alt={network}
                            width={16}
                            height={16}
                            className="rounded"
                          />
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">Ξ {token.cash}</TableCell>
                  <TableCell className="font-medium">
                    Ξ {token.borrow}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
