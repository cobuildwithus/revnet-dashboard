import { AddressSearch } from "@/components/address-search";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { WagmiProvider } from "@/lib/wagmi-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revnet Dash",
  description: "View your Revnet portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiProvider>
            <header className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 py-4 px-4 md:px-8 bg-background shadow-sm sticky top-0">
              <div className="flex justify-start">
                <Link href="/">
                  <svg
                    viewBox="0 0 288 140"
                    fill="none"
                    className="w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Revnet Dash logo"
                  >
                    <title>Revnet Dash logo</title>
                    <path
                      d="M287.451 69.6339L173.138 0.0389404L150.509 58.7621L54.0338 0.0389404L0.246094 139.618L142.096 80.5446L119.35 139.618L287.451 69.6339Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>

              <div className="flex justify-center">
                <AddressSearch />
              </div>

              <div className="flex items-center justify-end space-x-2 md:space-x-4">
                <ThemeToggle />
                <UserMenu />
              </div>
            </header>
            {children}
          </WagmiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
