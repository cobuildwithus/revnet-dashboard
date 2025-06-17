export function unpackMetadata(metadata: bigint) {
  return {
    reservedPercent: Number((metadata >> 4n) & 0xffffn),
    cashOutTaxRate: Number((metadata >> 20n) & 0xffffn),
    baseCurrency: Number((metadata >> 36n) & 0xffffffffn),
    pausePay: ((metadata >> 68n) & 1n) === 1n,
    pauseCreditTransfers: ((metadata >> 69n) & 1n) === 1n,
    allowOwnerMinting: ((metadata >> 70n) & 1n) === 1n,
    allowSetCustomToken: ((metadata >> 71n) & 1n) === 1n,
    allowTerminalMigration: ((metadata >> 72n) & 1n) === 1n,
    allowSetTerminals: ((metadata >> 73n) & 1n) === 1n,
    allowSetController: ((metadata >> 74n) & 1n) === 1n,
    allowAddAccountingContext: ((metadata >> 75n) & 1n) === 1n,
    allowAddPriceFeed: ((metadata >> 76n) & 1n) === 1n,
    ownerMustSendPayouts: ((metadata >> 77n) & 1n) === 1n,
    holdFees: ((metadata >> 78n) & 1n) === 1n,
    useTotalSurplusForCashOuts: ((metadata >> 79n) & 1n) === 1n,
    useDataHookForPay: ((metadata >> 80n) & 1n) === 1n,
    useDataHookForCashOut: ((metadata >> 81n) & 1n) === 1n,
    dataHook: `0x${((metadata >> 82n) & ((1n << 160n) - 1n))
      .toString(16)
      .padStart(40, "0")}` as `0x${string}`,
    metadataExtra: Number((metadata >> 242n) & 0x3fffn),
  };
}
