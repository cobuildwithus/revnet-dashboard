import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to parse logo URI to shared gateway
export function parseIpfsUri(uri: string | null): string | null {
  if (!uri) return null;

  const cid = uri.replace(/^ipfs:\/\//, "");
  if (!cid) return null;

  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
// Helper function to determine decimal places based on value
export function getDecimalPlaces(value: number): number {
  if (value >= 1000) return 2;
  if (value >= 100) return 3;
  if (value >= 10) return 4;
  if (value >= 1) return 4;
  if (value >= 0.1) return 5;
  if (value >= 0.01) return 6;
  return 8;
}

export function formatBalance(value: number): string {
  const actualValue = value / 1e18;
  const decimalPlaces = getDecimalPlaces(actualValue);
  return actualValue.toFixed(decimalPlaces).replace(/\.?0+$/, "");
}
