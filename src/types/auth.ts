import { EUserRole } from "@/enums/user";

export interface User {
  id: number;
  email: string;
  name: string;
  entityId: number;
  entityName: string;
  role: EUserRole;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  name?: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  email: string | null;
  isLoading: boolean;
  isInitialized: boolean;
}
