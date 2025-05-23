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
import { formatBalance, parseIpfsUri } from "@/lib/utils";
import type { Decimal } from "@prisma/client/runtime/library";

interface Participant {
  address: string;
  cashOutValue: bigint;
  balance: Decimal;
  projectId: number;
  chainId: number;
  project: {
    name: string | null;
    erc20Symbol: string | null;
    erc20: string | null;
    logoUri: string | null;
  };
}

interface TokensTableProps {
  participants: Participant[];
}

function getChainName(chainId: number): string {
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
}

export function TokensTable({ participants }: TokensTableProps) {
  return (
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
              const chainName = getChainName(participant.chainId);
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
                        {formatBalance(Number(participant.balance))}
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
  );
}
