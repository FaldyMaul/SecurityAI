export type ReviewDecision =
  | 'approved'
  | 'approved_with_controls'
  | 'restricted'
  | 'reassessment_required'
  | 'not_approved';

export type ReviewStatus = 'pending' | 'decided' | 'overridden';

export interface Review {
  id: string;
  modelId: string;
  modelName: string;
  modelProvider: string;
  runId: string;
  runDate: string;
  overallScore: number;
  criticalCount: number;
  status: ReviewStatus;
  decision?: ReviewDecision;
  decisionReason?: string;
  reviewerNotes?: string;
  reviewerId?: string;
  reviewerName?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  auditTrail: AuditTrailEntry[];
}

export interface AuditTrailEntry {
  id: string;
  action: 'decision_set' | 'decision_overridden' | 'publication_toggled' | 'notes_updated';
  actor: string;
  actorName: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
}
