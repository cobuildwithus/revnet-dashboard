import { createConfig } from "ponder";
import { arbitrum, base, mainnet, optimism } from "viem/chains";

import { baseContracts } from "../contracts/addresses";
import { revDeployerAbi } from "./abis";
import { rpcUrl } from "./lib/rpc-url";
import { indexerConfig } from "./lib/config";

export default createConfig({
  ordering: "omnichain",
  chains: {
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
  },
  contracts: {
    REVDeployer: {
      chain: indexerConfig.RevDeployer,
      abi: revDeployerAbi,
      address: baseContracts.REVDeployer,
    },
  },
});
