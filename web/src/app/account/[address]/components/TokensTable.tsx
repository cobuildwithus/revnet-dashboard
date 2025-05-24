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
import { formatBalance, getChainName, parseIpfsUri } from "@/lib/utils";
import type { Participant, Project } from "@prisma/revnet";

interface TokensTableProps {
  participants: (Pick<
    Participant,
    "chainId" | "projectId" | "balance" | "cashOutValue"
  > & {
    project: Pick<Project, "name" | "erc20Symbol" | "logoUri" | "chainId">;
    borrowableAmount: bigint;
  })[];
}

export function TokensTable({ participants }: TokensTableProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Your Revnets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead>Revnet</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Cash out value</TableHead>
              <TableHead>Borrowable amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => {
              const cashOutValueEth = formatBalance(
                Number(participant.cashOutValue)
              );
              // Use calculated borrowable amount if available, otherwise fallback to 50% of cashout
              const borrowableAmountEth = formatBalance(
                Number(participant.borrowableAmount)
              );
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
                    Ξ {cashOutValueEth}
                  </TableCell>
                  <TableCell className="font-medium">
                    Ξ {borrowableAmountEth}
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
