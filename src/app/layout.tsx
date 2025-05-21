import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/app/_trpc/Provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Accessibility } from "@/components/layout/accessibility";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Japanese Restaurants | Discover Authentic Japanese Cuisine",
  description: "Explore the finest Japanese restaurants with authentic cuisine ranging from sushi to ramen, tempura, and more. Find your next favorite dining spot.",
  keywords: "Japanese restaurants, sushi, ramen, tempura, Japanese cuisine, food, dining",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Suppress hydration warning on body due to browser extensions */}
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <Accessibility />
            
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            
            <Toaster />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
