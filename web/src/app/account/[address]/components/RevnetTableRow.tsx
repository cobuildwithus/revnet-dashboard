"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { formatBalance, getChainName, parseIpfsUri } from "@/lib/utils";
import type { Participant, Project } from "@prisma/revnet";
import { useBorrowableAmount } from "@/lib/hooks/rev-loans/use-borrowable-amount";
import { Skeleton } from "@/components/ui/skeleton";

interface RevnetTableRowProps {
  participant: Pick<Participant, "chainId" | "projectId" | "cashOutValue"> & {
    balance: number;
    project: Pick<Project, "name" | "erc20Symbol" | "logoUri" | "chainId">;
  };
}

export function RevnetTableRow({ participant }: RevnetTableRowProps) {
  const { borrowableAmount, isLoading } = useBorrowableAmount({
    chainId: participant.chainId,
    revnetId: BigInt(participant.projectId),
    collateralCount: BigInt(participant.balance),
  });

  const cashOutValueEth = formatBalance(Number(participant.cashOutValue));
  const borrowableAmountEth = formatBalance(Number(borrowableAmount || 0));
  const chainName = getChainName(participant.chainId);
  const logoUrl = parseIpfsUri(participant.project.logoUri);

  return (
    <TableRow key={`${participant.chainId}-${participant.projectId}`}>
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
            (participant.project.erc20Symbol || participant.project.name || "?")
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
      <TableCell className="font-medium">Ξ {cashOutValueEth}</TableCell>
      <TableCell className="font-medium">
        <div className="w-20 h-5 flex items-center">
          {isLoading ? (
            <Skeleton height={16} width="64px" rounded="rounded-sm" />
          ) : (
            <span>Ξ {borrowableAmountEth}</span>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
