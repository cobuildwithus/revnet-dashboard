"use client";

import { AddressSearch } from "@/components/address-search";
import { Logo } from "@/components/revnet-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import Link from "next/link";

export function Header() {
  return (
    <header className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 py-4 px-4 md:px-8 bg-background shadow-sm sticky top-0 z-50 min-h-[64px] max-w-full overflow-hidden">
      <div className="flex justify-start">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex justify-center">
        <AddressSearch />
      </div>

      <div className="flex items-center justify-end space-x-2 md:space-x-4 min-h-[40px]">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
