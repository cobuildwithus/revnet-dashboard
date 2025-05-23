import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Participant, Project } from "@prisma/client";
import { RevnetTableRow } from "./revnet-table-row";
import {
  groupParticipantsBySuckerGroup,
  aggregateGroupData,
} from "@/lib/utils";

interface RevnetsTableProps {
  participants: (Pick<Participant, "chainId" | "projectId" | "cashOutValue"> & {
    project: Pick<
      Project,
      "name" | "erc20Symbol" | "logoUri" | "chainId" | "suckerGroupId"
    >;
    balance: number;
  })[];
}

export function RevnetsTable({ participants }: RevnetsTableProps) {
  const groupedParticipants = groupParticipantsBySuckerGroup(participants);

  const groupedData = Object.entries(groupedParticipants)
    .map(([suckerGroupId, groupParticipants]) => {
      const aggregated = aggregateGroupData(groupParticipants);
      return {
        suckerGroupId,
        participants: groupParticipants,
        ...aggregated,
      };
    })
    .sort((a, b) => b.totalBalance - a.totalBalance);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Your Revnets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Revnet</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Net worth</TableHead>
              <TableHead>Borrowable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedData.map((group) => (
              <RevnetTableRow
                key={group.suckerGroupId}
                suckerGroupId={group.suckerGroupId}
                participants={group.participants}
                totalBalance={group.totalBalance}
                totalCashOutValue={group.totalCashOutValue}
                uniqueChains={group.uniqueChains}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
