import { jbContractAddress } from "juice-sdk-core";

export const contracts = {
  REVDeployer: jbContractAddress[5]["REVDeployer"]["1"],
  JBTokens: jbContractAddress[5]["JBTokens"]["1"],
  JBProjects: jbContractAddress[5]["JBProjects"]["1"],
  JBController: jbContractAddress[5]["JBController"]["1"],
  JBMultiTerminal: jbContractAddress[5]["JBMultiTerminal"]["1"],
  JBRulesets: jbContractAddress[5]["JBRulesets"]["1"],
  REVLoans: jbContractAddress[5]["REVLoans"]["1"],
  JBSuckerRegistry: jbContractAddress[5]["JBSuckerRegistry"]["1"],
} as const;
