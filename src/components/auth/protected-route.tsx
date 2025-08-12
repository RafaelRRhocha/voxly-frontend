"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import NotFound from "@/app/not-found";
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
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <NotFound />;
  }

  return <>{children}</>;
}
