import {
  index,
  onchainTable,
  primaryKey,
  type PgColumnsBuilders,
} from "ponder";

export const chainId = (t: PgColumnsBuilders) => ({
  chainId: t.integer().notNull(),
});
export const createdAt = (t: PgColumnsBuilders) => ({
  createdAt: t.integer().notNull(),
});

export const projectId = (t: PgColumnsBuilders) => ({
  projectId: t.integer().notNull(),
});

export const paymentsCount = (t: PgColumnsBuilders) => ({
  paymentsCount: t.integer().notNull().default(0),
});

export const balance = (t: PgColumnsBuilders) => ({
  balance: t.bigint().notNull().default(BigInt(0)),
});

export const project = onchainTable(
  "project",
  (t) => ({
    ...chainId(t),
    ...createdAt(t),
    ...projectId(t),
    ...balance(t),
    ...paymentsCount(t),
    isRevnet: t.boolean().notNull(),
    deployer: t.hex().notNull(),
    owner: t.hex().notNull(),

    erc20: t.hex(),
    erc20Supply: t.bigint().notNull().default(BigInt(0)),
    erc20Name: t.text(),
    erc20Symbol: t.text(),

    cashout__A: t.bigint().notNull().default(BigInt(0)),
    cashout__B: t.bigint().notNull().default(BigInt(0)),

    currentRulesetId: t.bigint().notNull().default(BigInt(0)),

    contributorsCount: t.integer().notNull().default(0),
    redeemCount: t.integer().notNull().default(0),
    redeemVolume: t.bigint().notNull().default(BigInt(0)),

    pendingReservedTokens: t.bigint().notNull().default(BigInt(0)),

    metadataUri: t.text(),
    metadata: t.json(),
    name: t.text(),
    infoUri: t.text(),
    logoUri: t.text(),
    coverImageUri: t.text(),
    twitter: t.text(),
    discord: t.text(),
    telegram: t.text(),
    tokens: t.text().array(),
    domain: t.text(),
    description: t.text(),
    tags: t.text().array(),
    projectTagline: t.text(),
  }),
  (t) => ({
    projectIdx: index().on(t.projectId),
    pk: primaryKey({ columns: [t.chainId, t.projectId] }),
  })
);

export const participant = onchainTable(
  "participant",
  (t) => ({
    ...chainId(t),
    ...projectId(t),
    ...createdAt(t),
    ...balance(t),
    isRevnet: t.boolean(),
    address: t.hex().notNull(),
    firstOwned: t.integer(),
    cashOutValue: t.bigint().notNull().default(BigInt(0)),
  }),
  (t) => ({
    addressIdx: index().on(t.address),
    pk: primaryKey({ columns: [t.chainId, t.projectId, t.address] }),
  })
);

export const ruleset = onchainTable(
  "ruleset",
  (t) => ({
    // Primary identifiers
    ...chainId(t),
    ...projectId(t),
    rulesetId: t.bigint().notNull(), // uint256 from events

    // Timestamps
    ...createdAt(t), // when queued/initialized
    queuedAt: t.integer().notNull(),

    // Core ruleset properties from JBRuleset struct
    cycleNumber: t.integer().notNull(),
    basedOnId: t.bigint().notNull(),
    start: t.bigint().notNull(),
    duration: t.bigint().notNull(),
    weight: t.bigint().notNull(),
    weightCutPercent: t.integer().notNull(),
    approvalHook: t.hex(),

    // Metadata fields (unpacked from uint256)
    reservedPercent: t.integer().notNull(),
    cashOutTaxRate: t.integer().notNull(),
    baseCurrency: t.integer().notNull(),

    // Boolean flags from metadata
    pausePay: t.boolean().notNull(),
    pauseCreditTransfers: t.boolean().notNull(),
    allowOwnerMinting: t.boolean().notNull(),
    allowSetCustomToken: t.boolean().notNull(),
    allowTerminalMigration: t.boolean().notNull(),
    allowSetTerminals: t.boolean().notNull(),
    allowSetController: t.boolean().notNull(),
    allowAddAccountingContext: t.boolean().notNull(),
    allowAddPriceFeed: t.boolean().notNull(),
    ownerMustSendPayouts: t.boolean().notNull(),
    holdFees: t.boolean().notNull(),
    useTotalSurplusForCashOuts: t.boolean().notNull(),
    useDataHookForPay: t.boolean().notNull(),
    useDataHookForCashOut: t.boolean().notNull(),

    // Data hook address from metadata
    dataHook: t.hex(),

    // Raw metadata values
    metadata: t.bigint().notNull(), // Full uint256 metadata
    metadataExtra: t.integer(), // The uint16 metadata field from expandMetadata

    // Event specific fields
    mustStartAtOrAfter: t.bigint(),
    caller: t.hex().notNull(),

    // Status fields
    approvalStatus: t.text(), // Could be enum: 'Empty', 'Approved', 'Failed', 'ApprovalExpected'
  }),
  (table) => ({
    projectIdx: index().on(table.projectId),
    rulesetIdx: index().on(table.rulesetId),
    startIdx: index().on(table.start),
    pk: primaryKey({
      columns: [table.chainId, table.projectId, table.rulesetId],
    }),
  })
);

export const ERC20ToProjectId = onchainTable(
  "_kv_ERC20ToProjectId",
  (t) => ({
    erc20: t.hex(),
    chainId: t.integer().notNull(),
    projectId: t.integer().notNull(),
  }),
  (table) => ({
    pk: primaryKey({ columns: [table.erc20, table.chainId] }),
  })
);
