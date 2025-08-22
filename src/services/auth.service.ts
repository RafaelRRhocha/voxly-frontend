import { AuthResponse, LoginCredentials, User } from "@/types";
import { CryptoUtils } from "@/utils/crypto";
import { StorageManager } from "@/utils/storage";

import { api } from "./api";

export class AuthService {
  private getStoredToken(): string | null {
    const encryptedToken = StorageManager.get("auth-token");
    if (!encryptedToken) return null;
    return CryptoUtils.decrypt(encryptedToken);
  }

  private saveToken(token: string): void {
    const encryptedToken = CryptoUtils.encrypt(token);
    StorageManager.set("auth-token", encryptedToken);
  }

  getStoredEmail(): string | null {
    return StorageManager.get("auth-email");
  }

  saveAuth(email: string, token: string): void {
    if (email) {
      StorageManager.set("auth-email", email);
      this.saveToken(token);
    }
  }

  clearAuth(): void {
    StorageManager.clear();
  }

  hasAuth(): boolean {
    return StorageManager.hasAuth();
  }

  async getProfile(): Promise<User> {
    return api.get<User>("/auth/profile");
  }

  async putProfile(userData: Partial<User>): Promise<User> {
    return api.put<User>("/auth/profile", userData);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.postWithoutAuth<AuthResponse>(
      "/auth/login",
      credentials,
    );

    this.saveAuth(credentials.email, response.token);
    return response;
  }

  async refreshToken(email: string): Promise<AuthResponse> {
    const response = await api.postWithoutAuth<AuthResponse>("/auth/refresh", {
      email,
    });
    this.saveToken(response.token);
    return response;
  }

  async requestPasswordReset(email: string): Promise<void> {
    return api.postWithoutAuth<void>("/auth/forgot-password", {
      email,
    });
  }

  async resetPassword(email: string, password: string): Promise<void> {
    return api.postWithoutAuth<void>("/auth/reset-password", {
      email,
      password,
    });
  }
}

export const authService = new AuthService();
