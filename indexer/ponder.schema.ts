import {
  index,
  onchainTable,
  primaryKey,
  type PgColumnsBuilders,
} from "ponder";

export const chainId = (t: PgColumnsBuilders) => ({
  chainId: t.integer().notNull(),
});

export const project = onchainTable(
  "project",
  (t) => ({
    ...chainId(t),
    projectId: t.numeric(),
    isRevnet: t.boolean().notNull(),
  }),
  (t) => ({
    projectIdx: index().on(t.projectId),
    pk: primaryKey({ columns: [t.chainId, t.projectId] }),
  })
);
