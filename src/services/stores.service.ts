import { Store } from "@/types/stores";

import { api } from "./api";

export class StoresService {
  async getStores(entityId: number): Promise<Array<Store>> {
    return api.get<Array<Store>>(`/stores/entity/${entityId}`);
  }

  async getStoreById(storeId: number): Promise<Store> {
    return api.get<Store>(`/stores/${storeId}`);
  }

  async updateStore(storeId: number, store: Partial<Store>): Promise<Store> {
    return api.put<Store>(`/stores/${storeId}`, store);
  }

  async deleteStore(storeId: number): Promise<void> {
    return api.delete<void>(`/stores/${storeId}`);
  }

  async createStore(store: Store): Promise<Store> {
    return api.post<Store>("/stores/register", {
      ...store,
      entity_id: store.entityId,
    });
  }
}

export const storesService = new StoresService();
