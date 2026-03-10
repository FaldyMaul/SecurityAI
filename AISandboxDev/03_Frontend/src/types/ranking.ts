export interface RankingEntry {
  id: string;
  modelId: string;
  modelName: string;
  provider: string;
  rank: number;
  overallScore: number;
  scores: {
    trust: number;
    security: number;
    privacy: number;
    readiness: number;
    compliance: number;
  };
  approvalLabel: string;
  suitabilityTags: string[];
  strengths: string[];
  weaknesses: string[];
  restrictions?: string[];
  recommendedUseCases?: string[];
  isPublished: boolean;
  lastAssessedAt: string;
}

export interface RankingListParams {
  provider?: string;
  modelType?: string;
  approvalStatus?: string;
  useCase?: string;
  scoreMin?: number;
  scoreMax?: number;
  sortBy?: 'rank' | 'score' | 'name';
}

export interface ComparisonData {
  models: RankingEntry[];
}
