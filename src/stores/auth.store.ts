import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authService } from "@/services";
import { AuthState, LoginCredentials, User } from "@/types";

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  initializeAuth: () => void;
  refreshUserData: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

      // Ações
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });

          const response = await authService.login(credentials);

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Limpar localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
          localStorage.removeItem("auth-user");
        }
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setToken: (token: string | null) => {
        set({ token });
      },

      setIsLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      initializeAuth: () => {
        if (typeof window === "undefined") {
          set({ isLoading: false });
          return;
        }

        const storedToken = localStorage.getItem("auth-token");
        const storedUser = localStorage.getItem("auth-user");

        if (storedToken && storedUser) {
          try {
            const user = JSON.parse(storedUser);
            set({
              user,
              token: storedToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch {
            // Se houver erro ao parsear, limpa os dados
            localStorage.removeItem("auth-token");
            localStorage.removeItem("auth-user");
            set({ isLoading: false });
          }
        } else {
          set({ isLoading: false });
        }
      },

      refreshUserData: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const user = await authService.getProfile();
          set({ user });
        } catch (error) {
          // Se falhar ao buscar dados do usuário, fazer logout
          get().logout();
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
