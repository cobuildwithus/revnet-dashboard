import { createConfig } from "ponder";
import { contracts } from "../contracts/addresses";
import { jbTokensAbi, revDeployerAbi } from "./abis";
import { config, getChainsAndRpcUrls } from "./lib/config";

export default createConfig({
  ordering: "omnichain",
  chains: getChainsAndRpcUrls(),
  contracts: {
    REVDeployer: {
      chain: config.RevDeployer,
      abi: revDeployerAbi,
      address: contracts.REVDeployer,
    },
    JBTokens: {
      chain: config.JBTokens,
      abi: jbTokensAbi,
      address: contracts.JBTokens,
    },
  },
});
