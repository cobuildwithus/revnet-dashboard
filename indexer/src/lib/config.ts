import { base } from "viem/chains";
import { mainnet } from "viem/chains";
import { arbitrum, optimism } from "viem/chains";
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
  };
};
