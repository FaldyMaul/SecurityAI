'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { User, ApiResponse } from '@/types/api';

export function useAuth() {
  const query = useQuery<ApiResponse<User>>({
    queryKey: ['auth', 'me'],
    queryFn: () => api.get('/api/auth/me'),
    staleTime: 1000 * 60 * 5, // 5 min
    retry: false,
  });

  return {
    user: query.data?.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    isAuthenticated: !!query.data?.data,
    role: query.data?.data?.role ?? null,
  };
}
