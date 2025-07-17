"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { formatBalance, getChainName, getRevnetUrl } from "@/lib/formatting";
import { parseIpfsUri } from "@/lib/utils";
import type { Participant, Project } from "@prisma/client";
import { useMultipleBorrowableAmounts } from "@/lib/hooks/rev-loans/use-multiple-borrowable-amounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

interface RevnetTableRowProps {
  suckerGroupId: string;
  participants: (Pick<Participant, "chainId" | "projectId"> & {
    balance: number;
    cashOutValue: number;
    project: Pick<Project, "name" | "erc20Symbol" | "logoUri" | "chainId">;
  })[];
  totalBalance: number;
  totalCashOutValue: number;
  uniqueChains: number[];
}

export function RevnetTableRow({
  suckerGroupId,
  participants,
  totalBalance,
  totalCashOutValue,
  uniqueChains,
}: RevnetTableRowProps) {
  // Use first project - they're all the same in a sucker group
  const project = participants[0].project;

  // Prepare params for multiple borrowable amounts
  const borrowableParams = useMemo(
    () =>
      participants.map((participant) => ({
        chainId: participant.chainId,
        revnetId: BigInt(participant.projectId),
        collateralCount: BigInt(participant.balance),
      })),
    [participants]
  );

  const { totalBorrowableAmount, isLoading } =
    useMultipleBorrowableAmounts(borrowableParams);

  const cashOutValueEth = formatBalance(totalCashOutValue);
  const borrowableAmountEth = formatBalance(totalBorrowableAmount);
  const logoUrl = parseIpfsUri(project.logoUri);

  const displayName = project.erc20Symbol || project.name || "Unknown Token";
  const description = project.name || "Unknown Project";

  return (
    <TableRow key={suckerGroupId} className="hover:bg-muted/50">
      <TableCell>
        <a
          href={getRevnetUrl(
            participants[0].chainId,
            participants[0].projectId
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <div className="size-8 bg-muted rounded-sm flex items-center justify-center text-xs font-bold flex-shrink-0">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={project.name || "Token"}
                width={32}
                height={32}
                className="rounded-sm"
              />
            ) : (
              (project.erc20Symbol || project.name || "?")
                .substring(0, 2)
                .toUpperCase()
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{displayName}</span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </a>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{formatBalance(totalBalance)}</div>
          <div className="flex mt-1 space-x-1">
            {uniqueChains.map((chainId) => {
              const chainName = getChainName(chainId);
              return (
                <a
                  key={chainId}
                  href={getRevnetUrl(
                    chainId,
                    participants.find((p) => p.chainId === chainId)
                      ?.projectId || participants[0].projectId
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`https://www.revnet.app/assets/img/logo/${chainName}.svg`}
                    alt={chainName}
                    width={16}
                    height={16}
                    className="rounded hover:opacity-80 transition-opacity"
                  />
                </a>
              );
            })}
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
