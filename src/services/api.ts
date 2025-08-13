import { ApiError } from "@/types";
import { CryptoUtils } from "@/utils/crypto";
import { StorageManager } from "@/utils/storage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number>;
  skipRefresh?: boolean;
}

class ApiService {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private isRefreshing = false;
  private refreshPromise: Promise<string> | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    const encryptedToken = StorageManager.get("auth-token");
    if (!encryptedToken) return null;
    return CryptoUtils.decrypt(encryptedToken);
  }

  private async refreshToken(): Promise<string> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;

    this.refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const email = StorageManager.get("auth-email");
        if (!email) {
          throw new Error("No email found");
        }

        const response = await this.postWithoutAuth<{ token: string }>(
          "/auth/refresh",
          { email },
          { skipRefresh: true },
        );

        const encryptedToken = CryptoUtils.encrypt(response.token);
        StorageManager.set("auth-token", encryptedToken);

        resolve(response.token);
      } catch (error) {
        StorageManager.clear();
        reject(error);
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    });

    return this.refreshPromise;
  }

  private buildURL(
    endpoint: string,
    params?: Record<string, string | number>,
  ): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(
    response: Response,
    config: RequestConfig = {},
  ): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText || "Erro na requisição",
        status: response.status,
      };

      try {
        const errorData = await response.json();
        error.message = errorData.message || error.message;
        error.code = errorData.code;
      } catch {
        // Se não conseguir parsear o JSON, mantém a mensagem padrão
      }

      if (response.status === 401 && !config.skipRefresh) {
        try {
          await this.refreshToken();
          throw { ...error, shouldRetry: true };
        } catch (refreshError) {
          console.error(refreshError);
          throw error;
        }
      }

      throw error;
    }

    try {
      return await response.json();
    } catch {
      return {} as T;
    }
  }

  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers = { ...this.defaultHeaders };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        (headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, skipRefresh, ...requestConfig } = config;

    const makeRequest = async (): Promise<T> => {
      const url = this.buildURL(endpoint, params);
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
        ...requestConfig,
      });

      return this.handleResponse<T>(response, config);
    };

    try {
      return await makeRequest();
    } catch (error: any) {
      if (error.shouldRetry && !skipRefresh) {
        return makeRequest();
      }
      throw error;
    }
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {},
  ): Promise<T> {
    const { params, skipRefresh, ...requestConfig } = config;

    const makeRequest = async (): Promise<T> => {
      const url = this.buildURL(endpoint, params);
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        ...requestConfig,
      });

      return this.handleResponse<T>(response, config);
    };

    try {
      return await makeRequest();
    } catch (error: any) {
      if (error.shouldRetry && !skipRefresh) {
        return makeRequest();
      }
      throw error;
    }
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {},
  ): Promise<T> {
    const { params, skipRefresh, ...requestConfig } = config;

    const makeRequest = async (): Promise<T> => {
      const url = this.buildURL(endpoint, params);
      const response = await fetch(url, {
        method: "PUT",
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        ...requestConfig,
      });

      return this.handleResponse<T>(response, config);
    };

    try {
      return await makeRequest();
    } catch (error: any) {
      if (error.shouldRetry && !skipRefresh) {
        return makeRequest();
      }
      throw error;
    }
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, skipRefresh, ...requestConfig } = config;

    const makeRequest = async (): Promise<T> => {
      const url = this.buildURL(endpoint, params);
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.getHeaders(),
        ...requestConfig,
      });

      return this.handleResponse<T>(response, config);
    };

    try {
      return await makeRequest();
    } catch (error: any) {
      if (error.shouldRetry && !skipRefresh) {
        return makeRequest();
      }
      throw error;
    }
  }

  async postWithoutAuth<T>(
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {},
  ): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "POST",
      headers: this.getHeaders(false),
      body: data ? JSON.stringify(data) : undefined,
      ...requestConfig,
    });

    return this.handleResponse<T>(response, { ...config, skipRefresh: true });
  }
}

export const api = new ApiService();
export default api;
