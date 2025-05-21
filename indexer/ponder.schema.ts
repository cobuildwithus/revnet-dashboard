import { onchainTable, type PgColumnsBuilders } from "ponder";

export const chainId = (t: PgColumnsBuilders) => ({
  chainId: t.integer().notNull(),
});

export const project = onchainTable("project", (t) => ({
  id: t.text().primaryKey(),
  ...chainId(t),
  projectId: t.numeric(),
  isRevnet: t.boolean().notNull(),
}));
