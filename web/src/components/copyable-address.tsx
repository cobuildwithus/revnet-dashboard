"use client";

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

  const shortenAddress = (addr: string): string => {
    if (addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

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
      {copied ? "Copied!" : shortenAddress(address)}
    </button>
  );
}
