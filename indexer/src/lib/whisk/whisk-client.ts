const WHISK_API_ENDPOINT = "https://api.whisk.so/graphql";

interface GraphQLError {
  message: string;
}

export async function queryWhiskGraphQL(query: string, variables?: Record<string, unknown>) {
  const apiKey = process.env.WHISK_API_KEY;

  if (!apiKey) {
    throw new Error("WHISK_API_KEY environment variable is not set");
  }

  const response = await fetch(WHISK_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const result: any = await response.json();

  if (result.errors) {
    throw new Error(
      `GraphQL errors: ${result.errors.map((e: GraphQLError) => e.message).join(", ")}`
    );
  }

  return result.data;
}
