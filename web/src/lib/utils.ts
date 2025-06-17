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
