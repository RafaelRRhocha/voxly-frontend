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
  createUser: (
    userData: Omit<User, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateUser: (userId: number, userData: Partial<User>) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
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

  createUser: async (
    userData: Omit<User, "id" | "created_at" | "updated_at">,
  ) => {
    set({ error: null });

    try {
      const newUser = await usersService.createUser(userData as User);

      set((state) => ({
        users: [...state.users, newUser],
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao criar usuário",
      });
      throw error;
    }
  },

  updateUser: async (userId: number, userData: Partial<User>) => {
    set({ error: null });

    try {
      const updatedUser = await usersService.updateUser(userId, userData);

      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, ...updatedUser } : user,
        ),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Erro ao atualizar usuário",
      });
      throw error;
    }
  },

  deleteUser: async (userId: number) => {
    set({ error: null });

    try {
      await usersService.deleteUser(userId);

      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Erro ao excluir usuário",
      });
      throw error;
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
