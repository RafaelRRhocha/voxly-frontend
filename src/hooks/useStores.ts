import { useEffect } from "react";

import { useStoresStore } from "@/stores/stores.store";

import { useAuth } from "./useAuth";

export const useStores = () => {
  const { user, logoutAndRedirect } = useAuth();
  const storesStore = useStoresStore();

  const handleLogout = async () => {
    await logoutAndRedirect("/login");
  };

  useEffect(() => {
    if (user?.entityId) {
      storesStore.fetchStores(user.entityId);
    } else {
      console.error("Entidade não encontrada para o usuário", user);
      handleLogout();
    }
  }, [user?.entityId]);

  return {
    ...storesStore,
  };
};
