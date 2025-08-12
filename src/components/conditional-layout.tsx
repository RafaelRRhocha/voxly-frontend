"use client";

import { usePathname } from "next/navigation";

import Header from "@/app/header";
import Sidebar from "@/components/sidebar";

import { ProtectedRoute } from "./auth/protected-route";

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
      <Sidebar />
      <Header entityName="Voxly" />
      <main className="flex-1 pt-20 p-6 overflow-y-auto">{children}</main>
    </ProtectedRoute>
  );
}
