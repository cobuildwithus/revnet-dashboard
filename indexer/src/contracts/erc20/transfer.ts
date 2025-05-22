import { ponder, type Context, type Event } from "ponder:registry";
import { zeroAddress } from "viem";
import { ERC20ToProjectId, participant, project } from "ponder:schema";
import { refreshParticipantCashoutValue } from "../../lib/cashout-coefficients";

ponder.on("ERC20:Transfer", handleTransfer);

async function handleTransfer(params: {
  event: Event<"ERC20:Transfer">;
  context: Context<"ERC20:Transfer">;
}) {
  const { event, context } = params;
  const { value } = event.args;
  const chainId = context.chain.id;

  const tokenContract = event.log.address.toLowerCase() as `0x${string}`;
  const from = event.args.from.toLowerCase() as `0x${string}`;
  const to = event.args.to.toLowerCase() as `0x${string}`;

  const projectMapping = await context.db.find(ERC20ToProjectId, {
    erc20: tokenContract,
    chainId,
  });

  if (!projectMapping) {
    throw new Error("Missing project");
  }

  const projectId = projectMapping.projectId;

  const _project = await context.db.find(project, {
    projectId,
    chainId,
  });

  if (!_project) {
    throw new Error("Missing project");
  }

  // Decrease the amount from the sender
  if (from !== zeroAddress) {
    await context.db
      .update(participant, { chainId, address: from, projectId })
      .set((row) => ({
        balance: row.balance - value,
      }));

    await refreshParticipantCashoutValue({
      db: context.db,
      chainId,
      projectId,
      participantAddress: from,
    });
  }

  // Increase the amount for the receiver
  if (to !== zeroAddress) {
    await context.db
      .insert(participant)
      .values({
        createdAt: Number(event.block.timestamp),
        address: to,
        chainId,
        projectId,
        balance: value,
        firstOwned: Number(event.block.timestamp),
        isRevnet: _project.isRevnet,
      })
      .onConflictDoUpdate((row) => ({
        balance: row.balance + value,
      }));

    await refreshParticipantCashoutValue({
      db: context.db,
      chainId,
      projectId,
      participantAddress: to,
    });
  }
}
