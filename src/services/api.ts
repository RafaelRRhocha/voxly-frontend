import { ApiError, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number>;
}

class ApiService {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth-token");
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

  private async handleResponse<T>(response: Response): Promise<T> {
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
    const { params, ...requestConfig } = config;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {},
  ): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "POST",
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {},
  ): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "PUT",
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "DELETE",
      headers: this.getHeaders(),
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
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

    return this.handleResponse<T>(response);
  }
}

export const api = new ApiService();
export default api;
