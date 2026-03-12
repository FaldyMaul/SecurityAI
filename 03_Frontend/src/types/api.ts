/* ── Generic API Response Wrappers ── */

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

/* ── Re-export all domain types ── */
export type { Model, ModelStatus, AuthMethod, ModelListParams } from './model';
export type { Review, ReviewDecision, ReviewStatus, AuditTrailEntry } from './review';
export type { Run, RunStatus, RunProgress, ScoreBreakdown, FindingCategory, Finding, RunEvidence, SeverityLevel, RunError, Grade, Verdict, GradingScale, BenchmarkResult, BenchmarkMetadata, CategoryResult, RecipeResult, RecipeMetrics, PromptResult } from './run';
export type { RankingEntry, RankingListParams, ComparisonData } from './ranking';
export type { User, UserRole, UserPreferences, NotificationSettings } from './user';
