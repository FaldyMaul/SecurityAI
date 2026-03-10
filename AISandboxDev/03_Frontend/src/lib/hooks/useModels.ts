'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Model, ModelListParams, ApiResponse, PaginatedResponse } from '@/types/api';

export function useModels(params?: ModelListParams) {
  return useQuery<PaginatedResponse<Model>>({
    queryKey: ['models', params],
    queryFn: () => api.get('/api/models', params as Record<string, string>),
    staleTime: 1000 * 30,
  });
}

export function useModel(id: string) {
  return useQuery<ApiResponse<Model>>({
    queryKey: ['models', id],
    queryFn: () => api.get(`/api/models/${id}`),
    staleTime: 1000 * 10,
    enabled: !!id,
  });
}

export function useCreateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Model>) => api.post<ApiResponse<Model>>('/api/models', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });
}

export function useValidateEndpoint(modelId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post<ApiResponse<Model>>(`/api/models/${modelId}/validate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models', modelId] });
    },
  });
}
