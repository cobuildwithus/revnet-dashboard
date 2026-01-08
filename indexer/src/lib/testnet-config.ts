import { baseSepolia, sepolia, optimismSepolia } from "viem/chains";
import { rpcUrl } from "./rpc-url";

export const config = {
  RevDeployer: {
    ethereumSepolia: {
      startBlock: 7729792,
    },
    baseSepolia: {
      startBlock: 22031613,
    },
    optimismSepolia: {
      startBlock: 24014488,
    },
  },
  JBTokens: {
    ethereumSepolia: {
      startBlock: 7724144,
    },
    baseSepolia: {
      startBlock: 21993057,
    },
    optimismSepolia: {
      startBlock: 23975934,
    },
  },
  JBProjects: {
    ethereumSepolia: {
      startBlock: 7724105,
    },
    baseSepolia: {
      startBlock: 21993006,
    },
    optimismSepolia: {
      startBlock: 23975881,
    },
  },
  JBController: {
    ethereumSepolia: {
      startBlock: 7724149,
    },
    baseSepolia: {
      startBlock: 21993075,
    },
    optimismSepolia: {
      startBlock: 23975952,
    },
  },
  ERC20: {
    ethereumSepolia: {
      startBlock: 7724144,
    },
    baseSepolia: {
      startBlock: 21993057,
    },
    optimismSepolia: {
      startBlock: 23975934,
    },
  },
  JBMultiTerminal: {
    ethereumSepolia: {
      startBlock: 7724161,
    },
    baseSepolia: {
      startBlock: 21993109,
    },
    optimismSepolia: {
      startBlock: 23975987,
    },
  },
  JBRulesets: {
    baseSepolia: {
      startBlock: 21993057,
    },
    ethereumSepolia: { startBlock: 7724144 },
    optimismSepolia: { startBlock: 23975934 },
  },
  RevLoans: {
    ethereumSepolia: {
      startBlock: 7729794,
    },
    baseSepolia: {
      startBlock: 22031619,
    },
    optimismSepolia: {
      startBlock: 24014494,
    },
  },
  JBSuckersRegistry: {
    ethereumSepolia: {
      startBlock: 7724468,
    },
    baseSepolia: {
      startBlock: 21998497,
    },
    optimismSepolia: {
      startBlock: 23981375,
    },
  },
};

export const getTestnetChainsAndRpcUrls = () => {
  return {
    baseSepolia: {
      id: baseSepolia.id,
      rpc: rpcUrl("base-sepolia"),
    },
    ethereumSepolia: {
      id: sepolia.id,
      rpc: rpcUrl("eth-sepolia"),
    },
    optimismSepolia: {
      id: optimismSepolia.id,
      rpc: rpcUrl("opt-sepolia"),
    },
  };
};
