import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Participant, Project } from "@prisma/revnet";
import { RevnetTableRow } from "./RevnetTableRow";

interface RevnetsTableProps {
  participants: (Pick<
    Participant,
    "chainId" | "projectId" | "balance" | "cashOutValue"
  > & {
    project: Pick<Project, "name" | "erc20Symbol" | "logoUri" | "chainId">;
  })[];
}

export function RevnetsTable({ participants }: RevnetsTableProps) {
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
              <TableHead>Net worth</TableHead>
              <TableHead>Borrowable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <RevnetTableRow
                key={`${participant.chainId}-${participant.projectId}`}
                participant={participant}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
