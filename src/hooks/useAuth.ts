import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    authStore.initializeAuth();
  }, []);

  const loginAndRedirect = async (
    email: string,
    password: string,
    redirectTo: string = "/dashboard",
  ) => {
    await authStore.login({ email, password });
    router.push(redirectTo);
  };

  const logoutAndRedirect = (redirectTo: string = "/login") => {
    authStore.logout();
    router.push(redirectTo);
  };

  return {
    ...authStore,
    loginAndRedirect,
    logoutAndRedirect,
  };
};
