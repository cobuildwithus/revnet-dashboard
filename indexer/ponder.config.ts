import { createConfig } from "ponder";

import { base } from "viem/chains";
import { baseContracts } from "../contracts/addresses";
import { revDeployerAbi } from "./abis";

const StartBlocks = {
  Base: 26521040,
};

export default createConfig({
  chains: {
    base: {
      id: base.id,
      rpc: process.env.PONDER_RPC_URL_BASE,
    },
  },
  contracts: {
    REVDeployer: {
      chain: "base",
      abi: revDeployerAbi,
      address: baseContracts.REVDeployer,
      startBlock: StartBlocks.Base,
    },
  },
});
