import { mainnetClient } from "./client";
import { normalize } from "viem/ens";

// Simple client-side ENS resolution without server caching
export async function resolveEnsToAddress(
  ensName: string
): Promise<string | null> {
  try {
    console.log("Attempting to resolve ENS name:", ensName);

    const normalizedName = normalize(ensName);
    console.log("Normalized ENS name:", normalizedName);

    const address = await mainnetClient.getEnsAddress({
      name: normalizedName,
    });

    console.log("Resolved address:", address);
    return address;
  } catch (error) {
    console.error("Failed to resolve ENS name:", ensName, error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return null;
  }
}
