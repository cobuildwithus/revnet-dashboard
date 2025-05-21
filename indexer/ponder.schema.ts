import { onchainTable } from "ponder";

export const Revnet = onchainTable("revnet", (t) => ({
  revnetId: t.numeric().primaryKey(),
}));
