import { create } from "zustand";

import { usersService } from "@/services/users.service";
import { User } from "@/types";

interface UsersState {
  users: Array<User>;
  isLoadingUsers: boolean;
  error: string | null;
}

interface UsersActions {
  fetchUsers: (entityId: number) => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetUsers: () => void;
}

type UsersStore = UsersState & UsersActions;

const initialState: UsersState = {
  users: [],
  isLoadingUsers: false,
  error: null,
};

export const useUsersStore = create<UsersStore>((set) => ({
  ...initialState,

  fetchUsers: async (entityId: number) => {
    set({ isLoadingUsers: true, error: null });

    try {
      const users = await usersService.getUsers(entityId);
      set({ users, isLoadingUsers: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Erro ao carregar usuários",
        isLoadingUsers: false,
      });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  resetUsers: () => {
    set(initialState);
  },
}));
