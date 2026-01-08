import { base, mainnet, optimism } from "viem/chains";
import { rpcUrl } from "./rpc-url";

export const config = {
  RevDeployer: {
    ethereum: {
      startBlock: 21869094,
    },
    base: {
      startBlock: 26521040,
    },
    optimism: {
      startBlock: 132116325,
    },
  },
  JBTokens: {
    ethereum: {
      startBlock: 21863179,
    },
    base: {
      startBlock: 26485001,
    },
    optimism: {
      startBlock: 132080297,
    },
  },
  JBProjects: {
    ethereum: {
      startBlock: 21863142,
    },
    base: {
      startBlock: 26484953,
    },
    optimism: {
      startBlock: 132080242,
    },
  },
  JBController: {
    ethereum: {
      startBlock: 21863191,
    },
    base: {
      startBlock: 26485017,
    },
    optimism: {
      startBlock: 132080314,
    },
  },
  ERC20: {
    ethereum: {
      startBlock: 21863179,
    },
    base: {
      startBlock: 26485001,
    },
    optimism: {
      startBlock: 132080297,
    },
  },
  JBMultiTerminal: {
    ethereum: {
      startBlock: 21863215,
    },
    base: {
      startBlock: 26485049,
    },
    optimism: {
      startBlock: 132080347,
    },
  },
  JBRulesets: {
    base: {
      startBlock: 26484977,
    },
    ethereum: { startBlock: 21863161 },
    optimism: { startBlock: 132080269 },
  },
  RevLoans: {
    ethereum: {
      startBlock: 21869096,
    },
    base: {
      startBlock: 26521046,
    },
    optimism: {
      startBlock: 132116331,
    },
  },
  JBSuckerRegistry: {
    ethereum: {
      startBlock: 21863660,
    },
    base: {
      startBlock: 26487986,
    },
    optimism: {
      startBlock: 132083296,
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
    optimism: {
      id: optimism.id,
      rpc: rpcUrl("optimism"),
    },
  };
};
