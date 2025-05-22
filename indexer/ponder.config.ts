import { createConfig, factory } from "ponder";
import { contracts } from "../contracts/addresses";
import {
  jbControllerAbi,
  jbMultiTerminalAbi,
  jbProjectsAbi,
  jbTokensAbi,
  revDeployerAbi,
} from "./abis";
import { config, getChainsAndRpcUrls } from "./src/lib/config";
import { erc20Abi, getAbiItem } from "viem";

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
    JBProjects: {
      chain: config.JBProjects,
      abi: jbProjectsAbi,
      address: contracts.JBProjects,
    },
    JBController: {
      chain: config.JBController,
      abi: jbControllerAbi,
      address: contracts.JBController,
    },
    ERC20: {
      abi: erc20Abi,
      address: factory({
        address: contracts.JBTokens,
        event: getAbiItem({ abi: jbTokensAbi, name: "DeployERC20" }),
        parameter: "token",
      }),
      chain: config.ERC20,
    },
    JBMultiTerminal: {
      chain: config.JBMultiTerminal,
      abi: jbMultiTerminalAbi,
      address: contracts.JBMultiTerminal,
    },
  },
});
