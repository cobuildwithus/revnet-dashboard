import {
  index,
  onchainTable,
  primaryKey,
  type PgColumnsBuilders,
  relations,
} from "ponder";
import { generateId } from "./src/util/id";

export const uniqueId = (t: PgColumnsBuilders) => ({
  id: t
    .text()
    .notNull()
    .$default(() => generateId())
    .primaryKey(),
});

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

export const timestamp = (t: PgColumnsBuilders) => ({
  timestamp: t.integer().notNull(),
});
export const logIndex = (t: PgColumnsBuilders) => ({
  logIndex: t.integer().notNull(),
});
export const txHash = (t: PgColumnsBuilders) => ({ txHash: t.hex().notNull() });
export const caller = (t: PgColumnsBuilders) => ({ caller: t.hex().notNull() });
export const from = (t: PgColumnsBuilders) => ({ from: t.hex().notNull() });
export const suckerGroupId = (t: PgColumnsBuilders) => ({
  suckerGroupId: t.text().notNull(),
});

// Common event parameters helper
export const eventParams = (t: PgColumnsBuilders) => ({
  ...uniqueId(t),
  ...chainId(t),
  ...txHash(t),
  ...timestamp(t),
  ...caller(t),
  ...from(t),
  ...logIndex(t),
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
    metadata: t.json().$type<{
      name: string | null;
      description: string | null;
      logoUri: string | null;
      infoUri: string | null;
      coverImageUri: string | null;
      twitter: string | null;
      discord: string | null;
      telegram: string | null;
      tokens: string[] | null;
      tags: string[] | null;
      softTargetCurrency?: string;
      domain: string | null;
      version?: number;
      projectTagline: string | null;
      payDisclosure?: string;
    }>(),
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

    accountingToken: t.hex(),
    accountingDecimals: t.integer(),
    accountingCurrency: t.integer(),
    accountingTokenSymbol: t.text(),
    accountingTokenName: t.text(),

    // For loan calculations
    suckerGroupId: t.text(),
  }),
  (t) => ({
    projectIdx: index().on(t.projectId),
    pk: primaryKey({ columns: [t.chainId, t.projectId] }),
  })
);

export const suckerGroup = onchainTable("sucker_group", (t) => ({
  id: t
    .text()
    .$default(() => generateId())
    .primaryKey(),
  projects: t.text().array().notNull().default([]),
  addresses: t.hex().array().notNull().default([]),
  createdAt: t.integer().notNull(),
}));

export const projectRelations = relations(project, ({ one, many }) => ({
  suckerGroup: one(suckerGroup, {
    fields: [project.suckerGroupId],
    references: [suckerGroup.id],
  }),
  loans: many(loan),
  borrowLoanEvents: many(borrowLoanEvent),
  repayLoanEvents: many(repayLoanEvent),
  liquidateLoanEvents: many(liquidateLoanEvent),
  reallocateLoanEvents: many(reallocateLoanEvent),
  suckers: many(sucker),
}));

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
    borrowableAmount: t.bigint().notNull().default(BigInt(0)),
  }),
  (t) => ({
    addressIdx: index().on(t.address),
    chainIdProjectIdIdx: index().on(t.chainId, t.projectId),
    pk: primaryKey({ columns: [t.chainId, t.projectId, t.address] }),
  })
);

export const payEvent = onchainTable("pay_event", (t) => ({
  ...eventParams(t),
  ...projectId(t),
  rulesetId: t.bigint().notNull(),
  rulesetCycleNumber: t.bigint().notNull(),
  payer: t.hex().notNull(),
  beneficiary: t.hex().notNull(),
  amount: t.bigint().notNull(),
  newlyIssuedTokenCount: t.bigint().notNull(),
  memo: t.text().notNull(),
  metadata: t.hex().notNull(),
  suckerGroupId: t.text().notNull(),
  caller: t.hex().notNull(),
}));

// Basic loan entity for tracking borrowable amounts
export const loan = onchainTable(
  "loan",
  (t) => ({
    id: t.bigint().notNull(),
    ...projectId(t),
    ...chainId(t),
    ...createdAt(t),
    borrowAmount: t.bigint().notNull(),
    collateral: t.bigint().notNull(),
    sourceFeeAmount: t.bigint().notNull(),
    prepaidDuration: t.integer().notNull(),
    prepaidFeePercent: t.integer().notNull(),
    beneficiary: t.hex().notNull(),
    owner: t.hex().notNull(),
    token: t.hex().notNull(),
    terminal: t.hex().notNull(),
    tokenUri: t.text(),
  }),
  (t) => ({
    pk: primaryKey({ columns: [t.id, t.chainId] }),
  })
);

export const loanRelations = relations(loan, ({ one }) => ({
  project: one(project, {
    fields: [loan.projectId, loan.chainId],
    references: [project.projectId, project.chainId],
  }),
}));

// Basic loan event entities for activity tracking
export const borrowLoanEvent = onchainTable("borrow_loan_event", (t) => ({
  ...eventParams(t),
  ...projectId(t),
  ...suckerGroupId(t),
  borrowAmount: t.bigint().notNull(),
  collateral: t.bigint().notNull(),
  sourceFeeAmount: t.bigint().notNull(),
  prepaidDuration: t.integer().notNull(),
  prepaidFeePercent: t.integer().notNull(),
  beneficiary: t.hex().notNull(),
  token: t.hex().notNull(),
  terminal: t.hex().notNull(),
}));

export const borrowLoanEventRelations = relations(
  borrowLoanEvent,
  ({ one }) => ({
    project: one(project, {
      fields: [borrowLoanEvent.chainId, borrowLoanEvent.projectId],
      references: [project.chainId, project.projectId],
    }),
  })
);

export const repayLoanEvent = onchainTable("repay_loan_event", (t) => ({
  ...eventParams(t),
  ...projectId(t),
  ...suckerGroupId(t),
  loanId: t.bigint().notNull(),
  paidOffLoanId: t.bigint().notNull(),
  repayBorrowAmount: t.bigint().notNull(),
  collateralCountToReturn: t.bigint().notNull(),
}));

export const repayLoanEventRelations = relations(repayLoanEvent, ({ one }) => ({
  project: one(project, {
    fields: [repayLoanEvent.chainId, repayLoanEvent.projectId],
    references: [project.chainId, project.projectId],
  }),
}));

export const liquidateLoanEvent = onchainTable("liquidate_loan_event", (t) => ({
  ...eventParams(t),
  ...projectId(t),
  ...suckerGroupId(t),
  borrowAmount: t.bigint().notNull(),
  collateral: t.bigint().notNull(),
}));

export const liquidateLoanEventRelations = relations(
  liquidateLoanEvent,
  ({ one }) => ({
    project: one(project, {
      fields: [liquidateLoanEvent.chainId, liquidateLoanEvent.projectId],
      references: [project.chainId, project.projectId],
    }),
  })
);

export const reallocateLoanEvent = onchainTable(
  "reallocate_loan_event",
  (t) => ({
    ...eventParams(t),
    ...projectId(t),
    ...suckerGroupId(t),
    loanId: t.bigint().notNull(),
    reallocatedLoanId: t.bigint().notNull(),
    removedCollateralCount: t.bigint().notNull(),
  })
);

export const reallocateLoanEventRelations = relations(
  reallocateLoanEvent,
  ({ one }) => ({
    project: one(project, {
      fields: [reallocateLoanEvent.chainId, reallocateLoanEvent.projectId],
      references: [project.chainId, project.projectId],
    }),
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

export const sucker = onchainTable(
  "sucker",
  (t) => ({
    ...projectId(t),
    ...chainId(t),
    address: t.hex().notNull(),
  }),
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.chainId, t.address] }),
  })
);

export const suckerRelations = relations(sucker, ({ one }) => ({
  project: one(project, {
    fields: [sucker.projectId, sucker.chainId],
    references: [project.projectId, project.chainId],
  }),
}));
