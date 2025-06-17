import { defineConfig, loadEnv } from "@wagmi/cli"
import { etherscan } from "@wagmi/cli/plugins"
import { contracts } from "./addresses"

const contractsToGenerate = [
  { name: "REVDeployer", address: contracts.REVDeployer },
  { name: "JBTokens", address: contracts.JBTokens },
  { name: "JBProjects", address: contracts.JBProjects },
  { name: "JBController", address: contracts.JBController },
  { name: "JBMultiTerminal", address: contracts.JBMultiTerminal },
  { name: "JBRulesets", address: contracts.JBRulesets },
  { name: "RevLoans", address: contracts.RevLoans },
  { name: "JBSuckersRegistry", address: contracts.JBSuckersRegistry },
]

export default defineConfig(() => {
  const env = loadEnv({ mode: process.env.NODE_ENV, envDir: process.cwd() })

  return {
    out: "src/generated.ts",
    contracts: [],
    plugins: [
      // etherscan({ apiKey: env.ETHERSCAN_API_KEY, chainId: 1, contracts: mainnetContracts }),
      etherscan({ apiKey: env.BASESCAN_API_KEY, chainId: 8453, contracts: contractsToGenerate }),
    ],
  }
})
