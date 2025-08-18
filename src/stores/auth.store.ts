import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authService } from "@/services";
import { AuthState, LoginCredentials, User } from "@/types";
import { StorageManager } from "@/utils";

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  setUser: (user: User | null) => void;
  setEmail: (email: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsInitialized: (initialized: boolean) => void;
  initializeAuth: () => Promise<void>;
  loadUserProfile: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  email: null,
  isLoading: true,
  isInitialized: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });

          const response = await authService.login(credentials);

          set({
            user: response.user,
            email: credentials.email,
            isLoading: false,
            isInitialized: true,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        StorageManager.remove("auth-email");
        StorageManager.remove("auth-token");

        set({
          user: null,
          email: null,
          isLoading: false,
          isInitialized: true,
        });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setEmail: (email: string | null) => {
        set({ email });
      },

      setIsLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setIsInitialized: (isInitialized: boolean) => {
        set({ isInitialized });
      },

      initializeAuth: async () => {
        const currentState = get();

        if (currentState.user && currentState.isInitialized) {
          set({ isLoading: false });
          return;
        }

        set({ isLoading: true });

        try {
          const hasAuthInStorage = authService.hasAuth();
          const storedEmail = authService.getStoredEmail();

          if (hasAuthInStorage && storedEmail) {
            if (!currentState.email || currentState.email !== storedEmail) {
              set({ email: storedEmail });
            }

            await get().loadUserProfile();
          } else {
            authService.clearAuth();
            set({ user: null, email: null });
          }
        } catch (error) {
          console.error("Erro ao inicializar auth:", error);
          authService.clearAuth();
          set({ user: null, email: null });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },

      updateProfile: async (userData: Partial<User>) => {
        try {
          const updatedUser = await authService.putProfile(userData);
          set({ user: updatedUser });
        } catch (error) {
          console.error("Erro ao atualizar perfil:", error);
          throw error;
        }
      },

      loadUserProfile: async () => {
        try {
          const user = await authService.getProfile();
          set({ user });
        } catch (error) {
          console.error("Erro ao carregar perfil:", error);
          get().logout();
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        email: state.email,
        user: state.user,
        // isInitialized e isLoading não são persistidos
      }),
      // onRehydrateStorage: () => (state) => {
      //   if (state) {
      //     logger.debug("Zustand rehydrated with:", {
      //       email: state.email,
      //       hasUser: !!state.user,
      //     });
      //   }
      // },
    },
  ),
);
