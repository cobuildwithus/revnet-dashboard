import { type Context, type Event, ponder } from "ponder:registry";
import { project } from "ponder:schema";
import { erc20Abi } from "viem";
import { NATIVE_TOKEN } from "../../constants/eth";

ponder.on("JBMultiTerminal:SetAccountingContext", setAccountingContext);

async function getTokenNameAndSymbol(
  client: Context["client"],
  token: `0x${string}`
): Promise<{ name: string; symbol: string }> {
  // Handle native token
  if (token.toLowerCase() === NATIVE_TOKEN) {
    return {
      name: "Ether",
      symbol: "ETH",
    };
  }
  try {
    const [name, symbol] = await Promise.all([
      client.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "name",
      }),
      client.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "symbol",
      }),
    ]);
    return {
      name: typeof name === "string" ? name : "",
      symbol: typeof symbol === "string" ? symbol : "",
    };
  } catch (e) {
    // fallback if contract call fails
    return {
      name: "",
      symbol: "",
    };
  }
}

async function setAccountingContext(params: {
  event: Event<"JBMultiTerminal:SetAccountingContext">;
  context: Context<"JBMultiTerminal:SetAccountingContext">;
}) {
  const { event, context } = params;
  const { args } = event;
  const { id: chainId } = context.chain;

  const { projectId: _projectId, context: accountingContext } = args;

  const projectId = Number(_projectId);
  const { token, decimals, currency } = accountingContext;

  const { name: tokenName, symbol: tokenSymbol } = await getTokenNameAndSymbol(
    context.client,
    token
  );

  await context.db
    .update(project, {
      chainId,
      projectId,
    })
    .set({
      accountingToken: token,
      accountingDecimals: Number(decimals),
      accountingCurrency: BigInt(currency),
      accountingTokenName: tokenName,
      accountingTokenSymbol: tokenSymbol,
    });
}
