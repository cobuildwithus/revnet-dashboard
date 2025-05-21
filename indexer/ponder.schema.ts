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

export const project = onchainTable(
  "project",
  (t) => ({
    ...chainId(t),
    ...createdAt(t),
    ...projectId(t),
    isRevnet: t.boolean().notNull(),
    deployer: t.hex().notNull(),
    owner: t.hex().notNull(),
    erc20: t.hex(),
    erc20Name: t.text(),
    erc20Symbol: t.text(),
  }),
  (t) => ({
    projectIdx: index().on(t.projectId),
    pk: primaryKey({ columns: [t.chainId, t.projectId] }),
  })
);
