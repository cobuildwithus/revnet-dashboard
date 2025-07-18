import { base, mainnet, arbitrum, optimism } from "viem/chains";
import { sepolia } from "viem/chains";
import { rpcUrl } from "./rpc-url";

export const config = {
  RevDeployer: {
    ethereum: {
      startBlock: 21869094,
    },
    arbitrum: {
      startBlock: 307144912,
    },
    base: {
      startBlock: 26521040,
    },
    optimism: {
      startBlock: 132116325,
    },
    ethereumSepolia: {
      startBlock: 7729792,
    },
  },
  JBTokens: {
    ethereum: {
      startBlock: 21863179,
    },
    arbitrum: {
      startBlock: 306857750,
    },
    base: {
      startBlock: 26485001,
    },
    optimism: {
      startBlock: 132080297,
    },
    ethereumSepolia: {
      startBlock: 7724144,
    },
  },
  JBProjects: {
    ethereum: {
      startBlock: 21863142,
    },
    arbitrum: {
      startBlock: 306857479,
    },
    base: {
      startBlock: 26484953,
    },
    optimism: {
      startBlock: 132080242,
    },
    ethereumSepolia: {
      startBlock: 7724105,
    },
  },
  JBController: {
    ethereum: {
      startBlock: 21863191,
    },
    arbitrum: {
      startBlock: 306857842,
    },
    base: {
      startBlock: 26485017,
    },
    optimism: {
      startBlock: 132080314,
    },
    ethereumSepolia: {
      startBlock: 7724149,
    },
  },
  ERC20: {
    ethereum: {
      startBlock: 21863179,
    },
    arbitrum: {
      startBlock: 306857750,
    },
    base: {
      startBlock: 26485001,
    },
    optimism: {
      startBlock: 132080297,
    },
    ethereumSepolia: {
      startBlock: 7724144,
    },
  },
  JBMultiTerminal: {
    ethereum: {
      startBlock: 21863215,
    },
    arbitrum: {
      startBlock: 306858028,
    },
    base: {
      startBlock: 26485049,
    },
    optimism: {
      startBlock: 132080347,
    },
    ethereumSepolia: {
      startBlock: 7724161,
    },
  },
  JBRulesets: {
    base: {
      startBlock: 26484977,
    },
    ethereum: { startBlock: 21863161 },
    optimism: { startBlock: 132080269 },
    arbitrum: { startBlock: 306857614 },
    ethereumSepolia: { startBlock: 7724144 },
  },
  RevLoans: {
    ethereum: {
      startBlock: 21869096,
    },
    arbitrum: {
      startBlock: 307144959,
    },
    base: {
      startBlock: 26521046,
    },
    optimism: {
      startBlock: 132116331,
    },
    ethereumSepolia: {
      startBlock: 7729794,
    },
  },
  JBSuckersRegistry: {
    ethereum: {
      startBlock: 21863660,
    },
    arbitrum: {
      startBlock: 306881281,
    },
    base: {
      startBlock: 26487986,
    },
    optimism: {
      startBlock: 132083296,
    },
    ethereumSepolia: {
      startBlock: 7724468,
    },
  },
};

export const getChainsAndRpcUrls = () => {
  return {
    base: {
      id: base.id,
      rpc: rpcUrl("base"),
    },
    ethereum: {
      id: mainnet.id,
      rpc: rpcUrl("eth"),
    },
    arbitrum: {
      id: arbitrum.id,
      rpc: rpcUrl("arbitrum"),
    },
    optimism: {
      id: optimism.id,
      rpc: rpcUrl("optimism"),
    },
    ethereumSepolia: {
      id: sepolia.id,
      rpc: rpcUrl("eth-sepolia"),
    },
  };
};
