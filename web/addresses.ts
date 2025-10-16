import { jbContractAddress } from "juice-sdk-core";

export const contracts = {
  REVDeployer: jbContractAddress[5]["REVDeployer"],
  JBTokens: jbContractAddress[5]["JBTokens"],
  JBProjects: jbContractAddress[5]["JBProjects"],
  JBController: jbContractAddress[5]["JBController"],
  JBMultiTerminal: jbContractAddress[5]["JBMultiTerminal"],
  JBRulesets: jbContractAddress[5]["JBRulesets"],
  REVLoans: jbContractAddress[5]["REVLoans"],
  JBSuckerRegistry: jbContractAddress[5]["JBSuckerRegistry"],
} as const;
