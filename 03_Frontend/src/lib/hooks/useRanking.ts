'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { RankingEntry, RankingListParams, ComparisonData, ApiResponse, PaginatedResponse } from '@/types/api';

export function useRanking(params?: RankingListParams) {
  return useQuery<PaginatedResponse<RankingEntry>>({
    queryKey: ['ranking', params],
    queryFn: () => api.get('/api/ranking', params as Record<string, string>),
    staleTime: 1000 * 60,
  });
}

export function useComparison(ids: string[]) {
  return useQuery<ApiResponse<ComparisonData>>({
    queryKey: ['ranking', 'compare', ids],
    queryFn: () => api.get('/api/ranking/compare', { ids: ids.join(',') }),
    enabled: ids.length >= 2,
  });
}
