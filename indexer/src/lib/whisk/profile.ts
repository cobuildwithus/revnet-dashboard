import { truncateAddress } from "../../util/truncate-address";
import { queryWhiskGraphQL } from "./whisk-client";
import { saveOrGet } from "../kv-store";

interface Profile {
  address: string;
  name: string;
  avatar: string | null;
  bio: string | null;
}

export async function getProfile(address: string): Promise<Profile> {
  const cacheKey = `profile-v2:${address.toLowerCase()}`;
  const cacheTtl = 60 * 60 * 48; // 48 hours

  return saveOrGet(
    cacheKey,
    async () => {
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

        const data: {
          identity: { aggregate: { name?: string; avatar?: string; bio?: string } };
        } = await queryWhiskGraphQL(query, { address });

        const profile = {
          address,
          name: data.identity?.aggregate?.name || truncateAddress(address),
          avatar: data.identity?.aggregate?.avatar || null,
          bio: data.identity?.aggregate?.bio || null,
        };

        return profile;
      } catch (error) {
        return { address, name: truncateAddress(address), avatar: null, bio: null };
      }
    },
    cacheTtl
  );
}
