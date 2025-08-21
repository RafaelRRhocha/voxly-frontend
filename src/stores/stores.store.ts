import { create } from "zustand";

import { storesService } from "@/services/stores.service";
import { Store } from "@/types/stores";

interface StoresState {
  stores: Array<Store>;
  isLoadingStores: boolean;
  error: string | null;
}

interface StoresActions {
  fetchStores: (entityId: number) => Promise<void>;
  createStore: (
    storeData: Omit<Store, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateStore: (storeId: number, storeData: Partial<Store>) => Promise<void>;
  deleteStore: (storeId: number) => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetStores: () => void;
}

type StoresStore = StoresState & StoresActions;

const initialState: StoresState = {
  stores: [],
  isLoadingStores: false,
  error: null,
};

export const useStoresStore = create<StoresStore>((set) => ({
  ...initialState,

  fetchStores: async (entityId: number) => {
    set({ isLoadingStores: true, error: null });

    try {
      const stores = await storesService.getStores(entityId);
      set({ stores, isLoadingStores: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Erro ao carregar lojas",
        isLoadingStores: false,
      });
    }
  },

  createStore: async (
    storeData: Omit<Store, "id" | "created_at" | "updated_at">,
  ) => {
    set({ error: null });

    try {
      const newStore = await storesService.createStore(storeData as Store);

      set((state) => ({
        stores: [...state.stores, newStore],
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao criar loja",
      });
      throw error;
    }
  },

  updateStore: async (storeId: number, storeData: Partial<Store>) => {
    set({ error: null });

    try {
      const updatedStore = await storesService.updateStore(storeId, storeData);

      set((state) => ({
        stores: state.stores.map((store) =>
          store.id === storeId ? { ...store, ...updatedStore } : store,
        ),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Erro ao atualizar loja",
      });
      throw error;
    }
  },

  deleteStore: async (storeId: number) => {
    set({ error: null });

    try {
      await storesService.deleteStore(storeId);

      set((state) => ({
        stores: state.stores.filter((store) => store.id !== storeId),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao excluir loja",
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

  resetStores: () => {
    set(initialState);
  },
}));
