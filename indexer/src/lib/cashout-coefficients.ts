import type { Context } from "ponder:registry";
import { project, ruleset } from "ponder:schema";

const MAX = 10_000n;

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
 * A = overflow * (MAX - tax) / MAX / totalSupply
 * B = overflow * tax / MAX / (totalSupply ** 2)
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
 * Calculate cashout coefficient A.
 * A = overflow * (MAX - tax) / MAX / totalSupply
 */
function calculateCashoutA(
  overflow: bigint,
  tax: bigint,
  totalSupply: bigint
): bigint {
  if (totalSupply === 0n) return 0n;
  return (overflow * (MAX - tax)) / MAX / totalSupply;
}

/**
 * Calculate cashout coefficient B.
 * B = overflow * tax / MAX / (totalSupply ** 2)
 */
function calculateCashoutB(
  overflow: bigint,
  tax: bigint,
  totalSupply: bigint
): bigint {
  if (totalSupply === 0n) return 0n;
  return (overflow * tax) / MAX / (totalSupply * totalSupply);
}

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

  const A = calculateCashoutA(
    currentProject.balance,
    BigInt(currentRuleset.cashOutTaxRate),
    currentProject.erc20Supply
  );
  const B = calculateCashoutB(
    currentProject.balance,
    BigInt(currentRuleset.cashOutTaxRate),
    currentProject.erc20Supply
  );

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

  //   // Update all participants' cashOutValue in a single SQL pass
  //   await db.sql
  //     .update(participant)
  //     .set((p) => ({
  //       balance,
  //       cashOutValue: A * balance + B * balance * balance,
  //     }))
  //     .where(
  //       and(
  //         eq(participant.chainId, chainId),
  //         eq(participant.projectId, projectId)
  //       )
  //     );
}
