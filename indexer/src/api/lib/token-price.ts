import { db } from "ponder:api";
import { NATIVE_TOKEN } from "../../constants/eth";

export const getRevnetTokenPrice = async (
  projectId: number,
  chainId: number,
  accountingToken: `0x${string}`
): Promise<string> => {
  try {
    const currencyPriceAdjustment = await getCurrencyPriceAdjustment(
      chainId,
      accountingToken
    );

    const currentTime = Math.floor(Date.now() / 1000);

    // Find the currently active ruleset
    const activeRuleset = await db.query.ruleset.findFirst({
      columns: {
        weight: true,
        weightCutPercent: true,
        duration: true,
        cycleNumber: true,
        start: true,
        reservedPercent: true,
      },
      where: (ruleset, { eq, and, lte }) =>
        and(
          eq(ruleset.chainId, chainId),
          eq(ruleset.projectId, Number(projectId)),
          lte(ruleset.start, BigInt(currentTime))
        ),
      orderBy: (ruleset, { desc }) => [desc(ruleset.start)],
    });

    if (!activeRuleset) return "0";

    // Calculate how much time has passed since the ruleset started
    const timeElapsed = currentTime - Number(activeRuleset.start);

    let tokensPerEth: bigint;

    // If duration is 0, weight doesn't decay
    if (activeRuleset.duration === BigInt(0)) {
      tokensPerEth = BigInt(activeRuleset.weight.toString());
    } else {
      // Calculate how many complete cycles have passed
      const durationSeconds = Number(activeRuleset.duration);
      const cyclesPassed =
        durationSeconds > 0 ? Math.floor(timeElapsed / durationSeconds) : 0;

      // Calculate current weight with decay
      const decayFactor = calculateDecayFactor(
        activeRuleset.weightCutPercent,
        cyclesPassed
      );

      // Convert weight from Decimal to number, handling the 1e18 scaling
      const initialWeightScaled = Number(activeRuleset.weight);
      const currentWeightScaled = Math.floor(initialWeightScaled * decayFactor);
      tokensPerEth = BigInt(currentWeightScaled);
    }

    // Calculate base price per token
    const basePricePerToken = calculatePricePerToken(tokensPerEth);

    // Adjust for reserved percentage
    const adjustedPricePerToken = adjustPriceForReserved(
      basePricePerToken,
      activeRuleset.reservedPercent
    );

    return adjustPriceForDifferentCurrency(
      adjustedPricePerToken,
      currencyPriceAdjustment
    );
  } catch (error) {
    console.error("Error fetching revnet token price:", error);
    return "0";
  }
};

// Helper to determine the price adjustment for the currency backing the token
async function getCurrencyPriceAdjustment(
  chainId: number,
  accountingToken: `0x${string}`
): Promise<string> {
  const isBackedByEth = accountingToken.toLowerCase() === NATIVE_TOKEN;
  let currencyPriceAdjustment = BigInt(1e18).toString();

  // if not backed by eth, check if backed by another revnet token
  if (!isBackedByEth) {
    const backedBy = await db.query.project.findFirst({
      columns: {
        projectId: true,
        chainId: true,
        accountingToken: true,
      },
      where: (project, { eq, and }) =>
        and(eq(project.erc20, accountingToken), eq(project.chainId, chainId)),
    });

    if (backedBy && backedBy.accountingToken) {
      const isBackedByEth =
        backedBy.accountingToken.toLowerCase() === NATIVE_TOKEN;

      if (isBackedByEth) {
        currencyPriceAdjustment = await getRevnetTokenPrice(
          backedBy.projectId,
          backedBy.chainId,
          backedBy.accountingToken as `0x${string}`
        );
      }
    }
  }

  return currencyPriceAdjustment;
}

// Helper to calculate the decay factor based on weight cut and cycles passed
function calculateDecayFactor(
  weightCutPercent: number,
  cyclesPassed: number
): number {
  const weightCutDecimal = weightCutPercent / 1e9;
  return (1 - weightCutDecimal) ** cyclesPassed;
}

// Helper to calculate price per token from tokens per ETH
function calculatePricePerToken(tokensPerEth: bigint): bigint {
  if (tokensPerEth === BigInt(0)) {
    return BigInt(0);
  }
  // Price per token = 1 ETH / tokens per ETH = 1e18 / tokensPerEth
  return (BigInt(1e18) * BigInt(1e18)) / tokensPerEth;
}

// Helper to adjust price for reserved percentage
function adjustPriceForReserved(
  price: bigint,
  reservedPercent: number
): bigint {
  // reservedPercent is scaled by 1e4 (e.g., 3800 = 38%)
  // If 38% are reserved, buyers only get 62% of tokens
  // So effective price = price / (1 - reservedPercent/1e4)
  const effectivePercent = BigInt(1e4) - BigInt(reservedPercent);
  if (effectivePercent === BigInt(0)) {
    // If 100% reserved, price is infinite (no tokens available for buyers)
    return BigInt(0);
  }
  return (price * BigInt(1e4)) / effectivePercent;
}

function adjustPriceForDifferentCurrency(
  price: bigint,
  currencyPriceAdjustment: string
): string {
  return BigInt(
    Math.floor(Number(price) * (Number(currencyPriceAdjustment) / 1e18))
  ).toString();
}
