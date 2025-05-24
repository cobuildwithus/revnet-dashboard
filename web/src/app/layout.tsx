import { AddressSearch } from "@/components/address-search";
import { Logo } from "@/components/logo";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { WagmiProvider } from "@/lib/wagmi-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/footer";

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
            <header className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 py-4 px-4 md:px-8 bg-background shadow-sm sticky top-0 z-50 min-h-[64px]">
              <div className="flex justify-start">
                <Link href="/">
                  <Logo />
                </Link>
              </div>

              <div className="flex justify-center">
                <AddressSearch />
              </div>

              <div className="flex items-center justify-end space-x-2 md:space-x-4 min-h-[40px]">
                <ThemeToggle />
                <UserMenu />
              </div>
            </header>
            {children}
            <Footer />
          </WagmiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
