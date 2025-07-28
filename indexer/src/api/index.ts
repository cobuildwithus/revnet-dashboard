import { Hono } from "hono";
import { client, graphql } from "ponder";
import { db } from "ponder:api";
import schema from "ponder:schema";
import { getActivityLog } from "./lib/activity-log";
import { getProjects } from "./lib/project";
import { getRevnetTokenPrice } from "./lib/token-price";

const app = new Hono();

app.use("/sql/*", client({ db, schema }));

app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

app.get("/project/:chainId/:id", async (c) => {
  try {
    const projects = await getProjects(
      Number(c.req.param("chainId")),
      Number(c.req.param("id"))
    );
    if (!projects) return c.json({ error: "Projects not found" }, 404);
    return c.json(projects);
  } catch (error) {
    return c.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

app.get("/activity/:chainId/:projectId", async (c) => {
  try {
    const chainId = parseInt(c.req.param("chainId"));
    const projectId = parseInt(c.req.param("projectId"));
    const limit = Math.min(parseInt(c.req.query("limit") || "50"), 100);
    const offset = parseInt(c.req.query("offset") || "0");

    const result = await getActivityLog(chainId, projectId, limit, offset);

    return c.json(result);
  } catch (error) {
    return c.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

app.get("/price/:chainId/:address", async (c) => {
  try {
    const chainId = Number(c.req.param("chainId"));
    const address = c.req.param("address").toLowerCase() as `0x${string}`;

    // Find the project whose ERC-20 matches the requested token
    const projectRow = await db.query.project.findFirst({
      columns: {
        projectId: true,
        accountingToken: true,
      },
      where: (project, { eq, and }) =>
        and(eq(project.erc20, address), eq(project.chainId, chainId)),
    });

    if (!projectRow) {
      return c.json({ token: { price: null } }, 404);
    }

    const price = await getRevnetTokenPrice(
      projectRow.projectId,
      chainId,
      projectRow.accountingToken as `0x${string}`
    );

    return c.json({ token: { price } });
  } catch (error) {
    return c.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

export default app;
