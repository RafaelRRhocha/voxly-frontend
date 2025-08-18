import { User } from "@/types";

import { api } from "./api";

export class UsersService {
  async getUsers(entityId: number): Promise<Array<User>> {
    return api.get<Array<User>>(`/users/entity/${entityId}`);
  }

  async getUserById(userId: number): Promise<User> {
    return api.get<User>(`/users/${userId}`);
  }

  async updateUser(userId: number, user: Partial<User>): Promise<User> {
    return api.put<User>(`/users/${userId}`, user);
  }

  async deleteUser(userId: number): Promise<void> {
    return api.delete<void>(`/users/${userId}`);
  }

  async createUser(user: User): Promise<User> {
    return api.post<User>("/users/register", {
      ...user,
      entity_id: user.entityId,
    });
  }
}

export const usersService = new UsersService();
