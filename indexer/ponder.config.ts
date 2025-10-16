import { createConfig, factory } from "ponder";
import { contracts } from "./addresses";
import { config, getChainsAndRpcUrls } from "./src/lib/config";
import { erc20Abi, getAbiItem } from "viem";
import {
  jbControllerAbi,
  jbMultiTerminalAbi,
  jbProjectsAbi,
  jbRulesetsAbi,
  jbSuckerRegistryAbi,
  jbTokensAbi,
  revDeployerAbi,
  revLoansAbi,
} from "juice-sdk-core";

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
    JBRulesets: {
      chain: config.JBRulesets,
      abi: jbRulesetsAbi,
      address: contracts.JBRulesets,
    },
    RevLoans: {
      chain: config.RevLoans,
      abi: revLoansAbi,
      address: contracts.REVLoans,
    },
    JBSuckersRegistry: {
      chain: config.JBSuckerRegistry,
      abi: jbSuckerRegistryAbi,
      address: contracts.JBSuckerRegistry,
    },
  },
  blocks: {
    CheckRulesetBase: {
      chain: "base",
      startBlock: "latest",
      interval: 60 / 2, // Every 1 minute (base block time is 2s)
    },
    CheckRulesetEthereum: {
      chain: "ethereum",
      startBlock: "latest",
      interval: 60 / 12, // Every 1 minute (ethereum block time is ~12s)
    },
    CheckRulesetOptimism: {
      chain: "optimism",
      startBlock: "latest",
      interval: 60 / 2, // Every 1 minute (optimism block time is 2s)
    },
    CheckRulesetArbitrum: {
      chain: "arbitrum",
      startBlock: "latest",
      interval: 60 / 0.25, // Every 1 minute (arbitrum block time is ~0.25s)
    },
  },
});
