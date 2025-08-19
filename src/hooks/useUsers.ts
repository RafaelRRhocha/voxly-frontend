import { useEffect } from "react";

import { useUsersStore } from "@/stores";

import { useAuth } from "./useAuth";

export const useUsers = () => {
  const { user, logoutAndRedirect } = useAuth();
  const usersStore = useUsersStore();

  const handleLogout = async () => {
    await logoutAndRedirect("/login");
  };

  useEffect(() => {
    if (user?.entityId) {
      usersStore.fetchUsers(user.entityId);
    } else {
      console.error("Entidade não encontrada para o usuário", user);
      handleLogout();
    }
  }, [user?.entityId]);

  return {
    ...usersStore,
  };
};
