"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  isValidAddressOrEns,
  handleAddressNavigation,
  type NavigationResult,
} from "@/lib/address-utils";

export function AddressSearch() {
  const [input, setInput] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const clearInput = useCallback(() => {
    setInput("");
  }, []);

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const navigateToAccount = useCallback(
    async (addressOrEns: string) => {
      setIsResolving(true);

      try {
        const result: NavigationResult = await handleAddressNavigation(
          addressOrEns,
          navigate,
          clearInput
        );

        if (!result.success && result.error) {
          console.error("Navigation failed:", result.error);
        }
      } finally {
        setIsResolving(false);
      }
    },
    [navigate, clearInput]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isResolving) {
      navigateToAccount(input);
    }
  };

  // Auto-search when valid address or ENS name is entered
  useEffect(() => {
    if (isValidAddressOrEns(input)) {
      navigateToAccount(input);
    }
  }, [input, navigateToAccount]);

  return (
    <div
      className={cn("relative transition-all duration-200", {
        "w-64 sm:w-96": isFocused,
        "w-24 sm:w-64": !isFocused,
      })}
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="text"
        placeholder={isResolving ? "Resolving..." : "ETH address or ENS"}
        className="w-full pl-10 h-10 shadow-none"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isResolving}
      />
    </div>
  );
}
