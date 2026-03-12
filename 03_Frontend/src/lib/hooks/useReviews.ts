'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Review, ReviewDecision, ApiResponse, PaginatedResponse } from '@/types/api';

export function useReviews(params?: Record<string, string>) {
  return useQuery<PaginatedResponse<Review>>({
    queryKey: ['reviews', params],
    queryFn: () => api.get('/api/reviews', params),
    staleTime: 1000 * 30,
  });
}

export function useReview(id: string) {
  return useQuery<ApiResponse<Review>>({
    queryKey: ['reviews', id],
    queryFn: () => api.get(`/api/reviews/${id}`),
    staleTime: 1000 * 10,
    enabled: !!id,
  });
}

export function useReviewDecision(reviewId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { decision: ReviewDecision; reason?: string }) =>
      api.post<ApiResponse<Review>>(`/api/reviews/${reviewId}/decision`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', reviewId] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });
}

export function usePendingReviewCount() {
  return useQuery<ApiResponse<{ count: number }>>({
    queryKey: ['reviews', 'pending-count'],
    queryFn: () => api.get('/api/reviews', { status: 'pending' }),
    refetchInterval: 1000 * 30, // poll every 30s
  });
}
