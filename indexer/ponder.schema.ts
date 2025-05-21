import { onchainTable, type PgColumnsBuilders } from "ponder";

export const chainId = (t: PgColumnsBuilders) => ({
  chainId: t.integer().notNull(),
});

export const project = onchainTable("project", (t) => ({
  ...chainId(t),
  projectId: t.numeric().primaryKey(),
  isRevnet: t.boolean().notNull(),
}));
