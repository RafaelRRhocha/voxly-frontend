"use client";

import { usePathname } from "next/navigation";

import Sidebar from "@/components/sidebar";

import { ProtectedRoute } from "./protected-route";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-muted/10">
          <div className="container p-6">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
