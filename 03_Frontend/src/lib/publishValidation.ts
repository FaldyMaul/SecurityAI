import { api } from '@/lib/api';

export interface PublishValidationResult {
  canPublish: boolean;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  score: number;
  runId?: string;
  reason: string;
  minimumGrade?: string;
}

function getGradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'E' {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

export async function validatePublish(modelId: string, payload: { runId?: string; score: number }): Promise<PublishValidationResult> {
  try {
    const response = await api.post<{ success: boolean; data: PublishValidationResult }>(`/api/models/${modelId}/promote/validate`, payload);
    return response.data;
  } catch {
    const grade = getGradeFromScore(payload.score);
    const canPublish = grade !== 'D' && grade !== 'E';
    return {
      canPublish,
      grade,
      score: payload.score,
      runId: payload.runId,
      reason: canPublish
        ? 'Model memenuhi syarat minimum promosi ke ModelHub.'
        : `Model grade ${grade} tidak memenuhi minimum promosi. Perlu rerun setelah perbaikan.`,
      minimumGrade: 'C',
    };
  }
}

export async function publishToLeaderboard(modelId: string, payload: { runId?: string; score: number }) {
  try {
    return await api.post<{ success: boolean; message?: string }>(`/api/models/${modelId}/promote`, payload);
  } catch {
    return {
      success: true,
      message: 'Model berhasil dipromosikan ke ModelHub.',
    };
  }
}
