import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { WagmiProvider } from "@/lib/wagmi-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revdash",
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
          <TooltipProvider delayDuration={350}>
            <WagmiProvider>
              <Header />
              {children}
              <Footer />
            </WagmiProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
