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

export const projectId = (t: PgColumnsBuilders) => ({ projectId: t.numeric() });

export const project = onchainTable(
  "project",
  (t) => ({
    ...chainId(t),
    ...createdAt(t),
    ...projectId(t),
    isRevnet: t.boolean().notNull(),
  }),
  (t) => ({
    projectIdx: index().on(t.projectId),
    pk: primaryKey({ columns: [t.chainId, t.projectId] }),
  })
);
