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
    erc20Name: t.text(),
    erc20Symbol: t.text(),

    contributorsCount: t.integer().notNull().default(0),
    redeemCount: t.integer().notNull().default(0),
    redeemVolume: t.bigint().notNull().default(BigInt(0)),

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
  }),
  (t) => ({
    addressIdx: index().on(t.address),
    pk: primaryKey({ columns: [t.chainId, t.projectId, t.address] }),
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
