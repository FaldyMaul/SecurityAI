import type { ApiResponse, ApiError } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // send HttpOnly cookies
    });

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: response.statusText,
      };

      try {
        const body = await response.json();
        error.message = body.message || error.message;
        error.code = body.code;
        error.details = body.details;
      } catch {
        // Response body is not JSON
      }

      // Handle auth errors globally
      if (response.status === 401) {
        window.location.href = '/login';
      }

      throw error;
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request<T>(`${endpoint}${query}`);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async promoteToModelHub(
    modelId: string,
    payload: { runId?: string; overallScore: number; grade?: 'A' | 'B' | 'C' | 'D' | 'E' }
  ): Promise<{ success: boolean; message?: string; data?: { modelId: string; status: string } }> {
    return this.post(`/api/models/${modelId}/promote`, payload);
  }

  async updateModelStatus(
    modelId: string,
    status: string
  ): Promise<{ success: boolean; message?: string }> {
    return this.patch(`/api/models/${modelId}`, { status });
  }
}

export const api = new ApiClient(BASE_URL);
