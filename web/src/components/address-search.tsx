"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

// Ethereum address validation regex (42 characters, starts with 0x)
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function AddressSearch() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const isValidEthAddress = useCallback((addr: string): boolean => {
    return ETH_ADDRESS_REGEX.test(addr);
  }, []);

  const navigateToAccount = useCallback(
    (addr: string) => {
      if (isValidEthAddress(addr)) {
        router.push(`/account/${addr}`);
        setAddress(""); // Clear the input after navigation
      }
    },
    [isValidEthAddress, router]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigateToAccount(address);
    }
  };

  // Auto-search when valid address is entered
  useEffect(() => {
    if (isValidEthAddress(address)) {
      navigateToAccount(address);
    }
  }, [address, isValidEthAddress, navigateToAccount]);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={cn("relative transition-all duration-200", {
        "w-64 sm:w-80": isFocused,
        "w-24 sm:w-40": !isFocused,
      })}
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="text"
        placeholder="ETH address"
        className="w-full pl-10 h-10 shadow-none"
        value={address}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
