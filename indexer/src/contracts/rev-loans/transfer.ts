import { ponder, type Context, type Event } from "ponder:registry";
import { loan } from "ponder:schema";

ponder.on("RevLoans:Transfer", handleTransfer);

async function handleTransfer(params: {
  event: Event<"RevLoans:Transfer">;
  context: Context<"RevLoans:Transfer">;
}) {
  const { event, context } = params;
  const { to, tokenId } = event.args;
  const chainId = context.chain.id;

  // Check if loan exists (loans are created via Borrow events first)
  const existingLoan = await context.db.find(loan, {
    id: tokenId,
    chainId,
  });

  if (!existingLoan) {
    // No loan exists yet, this is likely a mint before the Borrow event
    return;
  }

  // Update loan ownership
  await context.db.update(loan, { id: tokenId, chainId }).set({ owner: to });
}
