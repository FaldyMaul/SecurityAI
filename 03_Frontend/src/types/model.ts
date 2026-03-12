/* ── Model Status Enum ── */
export type ModelStatus =
  | 'draft'
  | 'validation_pending'
  | 'validation_failed'
  | 'endpoint_valid'
  | 'run_queued'
  | 'run_in_progress'
  | 'run_failed'
  | 'assessment_completed'
  | 'review_ready'
  | 'pending_review'
  | 'approved'
  | 'approved_with_controls'
  | 'promotion_ready'
  | 'published_to_modelhub'
  | 'restricted'
  | 'reassessment_required'
  | 'published';

export type AuthMethod = 'bearer' | 'api_key' | 'basic' | 'none';

export interface Model {
  id: string;
  name: string;
  provider: string;
  baseModel?: string;
  endpointUrl: string;
  authMethod: AuthMethod;
  apiKey?: string;
  modelVersion?: string;
  intendedUseCase?: string;
  description?: string;
  status: ModelStatus;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
  latestScore?: number;
  latestRunId?: string;
  latestRunDate?: string;
  source: 'manual' | 'apilogy';
}

export interface ModelListParams {
  page?: number;
  limit?: number;
  status?: ModelStatus;
  search?: string;
  owner?: 'me' | 'all';
  sortBy?: 'name' | 'createdAt' | 'latestScore';
  sortOrder?: 'asc' | 'desc';
}
