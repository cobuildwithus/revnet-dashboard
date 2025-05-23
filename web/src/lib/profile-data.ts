"use server";

interface IdentityAggregate {
  name?: string;
  avatar?: string;
  bio?: string;
}

interface IdentityResponse {
  identity: {
    aggregate: IdentityAggregate;
  };
}

interface GraphQLError {
  message: string;
}

const WHISK_API_ENDPOINT = "https://api.whisk.so/graphql";

async function queryWhiskGraphQL(
  query: string,
  variables?: Record<string, unknown>
) {
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
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(
      `GraphQL errors: ${result.errors
        .map((e: GraphQLError) => e.message)
        .join(", ")}`
    );
  }

  return result.data;
}

export async function getProfile(
  address: string
): Promise<IdentityAggregate | null> {
  try {
    const query = `
      query GetIdentity($address: String!) {
        identity(address: $address) {
          aggregate {
            name
            avatar
            bio
          }
        }
      }
    `;

    const data: IdentityResponse = await queryWhiskGraphQL(query, { address });
    return data.identity?.aggregate || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function getName(address: string): Promise<string | null> {
  try {
    const profile = await getProfile(address);
    return profile?.name || null;
  } catch (error) {
    console.error("Error fetching name:", error);
    return null;
  }
}

export async function getAvatar(address: string): Promise<string | null> {
  try {
    const profile = await getProfile(address);
    return profile?.avatar || null;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return null;
  }
}

export async function getBio(address: string): Promise<string | null> {
  try {
    const profile = await getProfile(address);
    return profile?.bio || null;
  } catch (error) {
    console.error("Error fetching bio:", error);
    return null;
  }
}
