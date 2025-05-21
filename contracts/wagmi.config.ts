import { defineConfig, loadEnv } from "@wagmi/cli"
import { etherscan } from "@wagmi/cli/plugins"
import { base, mainnet } from "./addresses"

const mainnetContracts = []

const baseContracts = []

export default defineConfig(() => {
  const env = loadEnv({ mode: process.env.NODE_ENV, envDir: process.cwd() })

  return {
    out: "src/generated.ts",
    contracts: [],
    plugins: [
      // etherscan({ apiKey: env.ETHERSCAN_API_KEY, chainId: 1, contracts: mainnetContracts }),
      // etherscan({ apiKey: env.BASESCAN_API_KEY, chainId: 8453, contracts: baseContracts }),
    ],
  }
})
