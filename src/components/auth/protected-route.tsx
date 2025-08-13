"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks";

import Loading from "../ui/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, isInitialized]);

  if (isLoading || !isInitialized) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
