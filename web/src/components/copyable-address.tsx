"use client";

import { getShortAddress } from "@/lib/formatting";
import { useState } from "react";

interface CopyableAddressProps {
  address: string;
  className?: string;
}

export function CopyableAddress({
  address,
  className = "",
}: CopyableAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`cursor-pointer hover:text-primary transition-colors ${className}`}
      title={copied ? "Copied!" : "Click to copy address"}
    >
      {copied ? "Copied!" : getShortAddress(address)}
    </button>
  );
}
