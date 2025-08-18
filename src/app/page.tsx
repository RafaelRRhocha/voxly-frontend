"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks";

export default function HomePage() {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoading) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, isInitialized]);

  return <Loading className="mt-5" />;
}
