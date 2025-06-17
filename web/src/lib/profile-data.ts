"use server";

import { unstable_cache } from "next/cache";

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

const getProfileUncached = async (
  address: string
): Promise<IdentityAggregate | null> => {
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
};

export const getProfile = unstable_cache(getProfileUncached, ["profile"], {
  revalidate: 3600, // Cache for 1 hour
  tags: ["profile"],
});

const getNameUncached = async (address: string): Promise<string | null> => {
  try {
    const profile = await getProfile(address);
    return profile?.name || null;
  } catch (error) {
    console.error("Error fetching name:", error);
    return null;
  }
};

export const getName = unstable_cache(getNameUncached, ["name"], {
  revalidate: 3600, // Cache for 1 hour
  tags: ["name"],
});

const getAvatarUncached = async (address: string): Promise<string | null> => {
  try {
    const profile = await getProfile(address);
    return profile?.avatar || null;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return null;
  }
};

export const getAvatar = unstable_cache(getAvatarUncached, ["avatar"], {
  revalidate: 3600, // Cache for 1 hour
  tags: ["avatar"],
});

const getBioUncached = async (address: string): Promise<string | null> => {
  try {
    const profile = await getProfile(address);
    return profile?.bio || null;
  } catch (error) {
    console.error("Error fetching bio:", error);
    return null;
  }
};

export const getBio = unstable_cache(getBioUncached, ["bio"], {
  revalidate: 3600, // Cache for 1 hour
  tags: ["bio"],
});
