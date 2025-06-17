import { resolveEnsToAddress } from "./ens";

// Ethereum address validation regex (42 characters, starts with 0x)
export const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
// ENS name validation regex (supports subdomains and ends with .eth)
export const ENS_NAME_REGEX = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.eth$/;

export function isValidEthAddress(address: string): boolean {
  return ETH_ADDRESS_REGEX.test(address);
}

export function isValidEnsName(name: string): boolean {
  return ENS_NAME_REGEX.test(name);
}

export function isValidAddressOrEns(input: string): boolean {
  return isValidEthAddress(input) || isValidEnsName(input);
}

export async function resolveAddressOrEns(
  addressOrEns: string
): Promise<string | null> {
  if (isValidEthAddress(addressOrEns)) {
    return addressOrEns;
  }

  if (isValidEnsName(addressOrEns)) {
    try {
      return await resolveEnsToAddress(addressOrEns);
    } catch (error) {
      console.error("Error resolving ENS name:", error);
      return null;
    }
  }

  return null;
}

export interface NavigationResult {
  success: boolean;
  address?: string;
  error?: string;
}

export async function handleAddressNavigation(
  input: string,
  navigate: (path: string) => void,
  clearInput: () => void
): Promise<NavigationResult> {
  if (isValidEthAddress(input)) {
    navigate(`/account/${input}`);
    clearInput();
    return { success: true, address: input };
  }

  if (isValidEnsName(input)) {
    try {
      const resolvedAddress = await resolveEnsToAddress(input);
      if (resolvedAddress) {
        navigate(`/account/${resolvedAddress}`);
        clearInput();
        return { success: true, address: resolvedAddress };
      }
      return { success: false, error: `Failed to resolve ENS name: ${input}` };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        error: `Error resolving ENS name: ${errorMessage}`,
      };
    }
  }

  return { success: false, error: "Invalid address or ENS name format" };
}
