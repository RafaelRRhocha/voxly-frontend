import { AuthResponse, LoginCredentials, User } from "@/types";

import { api } from "./api";

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return api.postWithoutAuth<AuthResponse>("/auth/login", credentials);
  }

  async register(
    userData: LoginCredentials & { name: string },
  ): Promise<AuthResponse> {
    return api.postWithoutAuth<AuthResponse>("/auth/register", userData);
  }

  async getProfile(): Promise<User> {
    return api.get<User>("/auth/profile");
  }

  async refreshToken(): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/refresh");
  }

  async logout(): Promise<void> {
    return api.post<void>("/auth/logout");
  }

  async forgotPassword(email: string): Promise<void> {
    return api.postWithoutAuth<void>("/auth/forgot-password", { email });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    return api.postWithoutAuth<void>("/auth/reset-password", {
      token,
      password,
    });
  }
}

export const authService = new AuthService();
