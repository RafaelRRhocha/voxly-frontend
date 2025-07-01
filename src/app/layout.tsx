import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";

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
        className={
          cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )
        }
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
