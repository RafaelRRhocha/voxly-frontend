import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      authStore.initializeAuth();
    }
  }, []);

  const loginAndRedirect = async (
    email: string,
    password: string,
    redirectTo: string = "/dashboard",
  ) => {
    await authStore.login({ email, password });
    router.push(redirectTo);
  };

  const logoutAndRedirect = async (redirectTo: string = "/login") => {
    await authStore.logout();
    router.push(redirectTo);
  };

  const isAuthenticated = !!authStore.user && !!authStore.email;

  return {
    ...authStore,
    isAuthenticated,
    loginAndRedirect,
    logoutAndRedirect,
  };
};
