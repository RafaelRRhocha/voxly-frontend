import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";

import Header from "./header";

import "./globals.css";

const inter = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voxly",
  description: "Voxly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className,
        )}
      >
        <Sidebar />
        <Header
          entityName="Voxly"
          userName="John Doe"
          userEmail="john.doe@example.com"
        />

        <main className="flex-1 pt-20 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
