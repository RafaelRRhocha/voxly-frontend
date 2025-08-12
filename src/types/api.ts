export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface PaginatedResponse<T> {
  data: Array<T>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
