import { Hono } from "hono";
import { client, graphql } from "ponder";
import { db } from "ponder:api";
import schema from "ponder:schema";
import { getProjects } from "./lib/project";

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
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default app;
