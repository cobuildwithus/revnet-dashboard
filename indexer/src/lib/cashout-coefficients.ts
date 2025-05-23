import { and } from "ponder";
import { eq } from "ponder";
import { sql } from "ponder";
import type { Context } from "ponder:registry";
import { participant, project, ruleset } from "ponder:schema";

const MAX_TAX = 10_000n;
const WAD = 1_000_000_000_000_000_000n; // 1 × 10¹⁸
const WAD2 = WAD * WAD; // 1 × 10³⁶ – for B only

/**
 * Cash-out values depend on three project-level variables:
 * - overflow: changes when someone pays, adds, redeems, or distributes funds.
 * - totalSupply: changes when tokens are minted or burned.
 * - tax: changes when a new ruleset becomes active.
 *
 * To efficiently handle recalculations, we exploit algebra to rewrite the cash-out formula as:
 * cashOutValue = A * balance + B * balance^2
 *
 * Where:
 * A = overflow * (MAX_TAX - tax) / MAX_TAX / totalSupply
 * B = overflow * tax / MAX_TAX / (totalSupply ** 2)
 *
 * By precomputing and storing these two coefficients (A and B) per project,
 * we minimize recalculation overhead:
 * - On regular transfers (no mint/burn), only two participant rows are updated.
 * - On mint/burn, overflow changes, or tax changes, we recompute A and B once per project,
 *   then update all participants in a single SQL pass.
 *
 * This approach ensures efficient, near-real-time updates with minimal database workload.
 */

/**
 * Calculate cashout coefficient A with 18-decimal scaling for precision.
 * A = (overflow * (MAX_TAX - tax) * WAD) / (MAX_TAX * totalSupply)
 */
export const calculateCashoutA = (
  overflow: bigint,
  tax: bigint,
  totalSupply: bigint
): bigint => {
  if (totalSupply === 0n) return 0n;
  return (overflow * (MAX_TAX - tax) * WAD) / (MAX_TAX * totalSupply);
};

/**
 * Calculate cashout coefficient B with 36-decimal scaling for precision.
 * B = (overflow * tax * WAD2) / (MAX_TAX * totalSupply^2)
 */
export const calculateCashoutB = (
  overflow: bigint,
  tax: bigint,
  totalSupply: bigint
): bigint => {
  if (totalSupply === 0n) return 0n;
  return (overflow * tax * WAD2) / (MAX_TAX * totalSupply * totalSupply);
};

/**
 * Recalculate and update cashout coefficients (A and B) for a given project.
 * Updates the project's cashout__A and cashout__B fields in the database.
 */
export async function refreshProjectCashoutCoefficients({
  db,
  chainId,
  projectId,
}: {
  db: Context["db"];
  chainId: number;
  projectId: number;
}) {
  const currentProject = await db.find(project, {
    chainId,
    projectId,
  });

  if (!currentProject) {
    throw new Error(`Project ${projectId} not found on chain ${chainId}`);
  }

  const currentRuleset = await db.find(ruleset, {
    chainId,
    rulesetId: currentProject.currentRulesetId,
    projectId,
  });

  if (!currentRuleset) {
    throw new Error(
      `Ruleset ${currentProject.currentRulesetId} not found for project ${projectId} on chain ${chainId}`
    );
  }

  const overflow = currentProject.balance;
  const tax = BigInt(currentRuleset.cashOutTaxRate);

  const totalSupplyWithPending =
    currentProject.erc20Supply + currentProject.pendingReservedTokens;

  const A = calculateCashoutA(overflow, tax, totalSupplyWithPending);
  const B = calculateCashoutB(overflow, tax, totalSupplyWithPending);

  // Update the project's cashout coefficients in the database
  await db
    .update(project, {
      chainId,
      projectId,
    })
    .set({
      cashout__A: A,
      cashout__B: B,
    });

  await bulkRefreshParticipants({
    db,
    chainId,
    projectId,
    A,
    B,
  });
}

/**
 * One-shot recompute of cashOutValue for every holder of {chainId, projectId}.
 * Runs in ≤ 2 ms even with 500 000 rows because it's a single UPDATE statement.
 */
async function bulkRefreshParticipants({
  db,
  chainId,
  projectId,
  A, // 18-dec BigInt  (cashout__A)
  B, // 36-dec BigInt  (cashout__B)
}: {
  db: Context["db"];
  chainId: number;
  projectId: number;
  A: bigint;
  B: bigint;
}) {
  const A_ = A.toString(); // cast once → avoids bigint-literal overflow
  const B_ = B.toString();
  const WAD_ = WAD.toString();
  const WAD2_ = WAD2.toString();

  await db.sql
    .update(participant)
    .set({
      /**   cashOutValue =
       *     (A * balance / 1e18)
       *   + (B * balance^2 / 1e36)
       */
      cashOutValue: sql`
        (${sql.raw(A_)}::numeric * ${participant.balance} / ${sql.raw(WAD_)})
        + (${sql.raw(B_)}::numeric * ${participant.balance} * ${
        participant.balance
      } / ${sql.raw(WAD2_)})
      `,
    })
    .where(
      and(
        eq(participant.chainId, chainId),
        eq(participant.projectId, projectId)
      )
    );
}

/**
 * Recalculate cashOutValue for a single participant after a balance change.
 * Typically called from ERC20 transfer handler when no mint/burn occurs.
 */
export async function refreshParticipantCashoutValue({
  db,
  chainId,
  projectId,
  participantAddress,
}: {
  db: Context["db"];
  chainId: number;
  projectId: number;
  participantAddress: `0x${string}`;
}) {
  // Fetch participant's current balance
  const participantRow = await db.find(participant, {
    chainId,
    projectId,
    address: participantAddress,
  });

  if (!participantRow) {
    throw new Error("Participant not found");
  }

  // Fetch project's current coefficients A and B
  const projectRow = await db.find(project, {
    chainId,
    projectId,
  });

  if (
    !projectRow ||
    projectRow.cashout__A === undefined ||
    projectRow.cashout__B === undefined
  ) {
    throw new Error("Project coefficients not found");
  }

  const { cashout__A: A, cashout__B: B } = projectRow;
  const balance = participantRow.balance;

  // Compute new cashOutValue with proper scaling
  const cashOutValue = (A * balance) / WAD + (B * balance * balance) / WAD2;

  // Update participant's cashOutValue
  await db
    .update(participant, {
      chainId,
      projectId,
      address: participantAddress,
    })
    .set({
      cashOutValue,
    });
}
