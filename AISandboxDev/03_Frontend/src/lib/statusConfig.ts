import type { ModelStatus } from '@/types/api';
import {
  FileText,
  Clock,
  XCircle,
  CheckCircle,
  Loader,
  Play,
  AlertTriangle,
  ClipboardCheck,
  Eye,
  ShieldCheck,
  Shield,
  Ban,
  RotateCcw,
  Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StatusConfig {
  color: string;
  bgColor: string;
  icon: LucideIcon;
  labelKey: string; // i18n key
  pulse?: boolean;
}

export const statusConfig: Record<ModelStatus, StatusConfig> = {
  draft: {
    color: 'var(--color-status-draft)',
    bgColor: '#f1f5f9',
    icon: FileText,
    labelKey: 'status.draft',
  },
  validation_pending: {
    color: 'var(--color-status-validation-pending)',
    bgColor: '#fef3c7',
    icon: Clock,
    labelKey: 'status.validation_pending',
  },
  validation_failed: {
    color: 'var(--color-status-validation-failed)',
    bgColor: '#fee2e2',
    icon: XCircle,
    labelKey: 'status.validation_failed',
  },
  endpoint_valid: {
    color: 'var(--color-status-endpoint-valid)',
    bgColor: '#d1fae5',
    icon: CheckCircle,
    labelKey: 'status.endpoint_valid',
  },
  run_queued: {
    color: 'var(--color-status-run-queued)',
    bgColor: 'var(--color-primary-light)',
    icon: Loader,
    labelKey: 'status.run_queued',
  },
  run_in_progress: {
    color: 'var(--color-status-run-in-progress)',
    bgColor: 'var(--color-primary-light)',
    icon: Play,
    labelKey: 'status.run_in_progress',
    pulse: true,
  },
  run_failed: {
    color: 'var(--color-status-run-failed)',
    bgColor: '#fee2e2',
    icon: AlertTriangle,
    labelKey: 'status.run_failed',
  },
  assessment_completed: {
    color: 'var(--color-status-assessment-completed)',
    bgColor: 'var(--color-secondary-light)',
    icon: ClipboardCheck,
    labelKey: 'status.assessment_completed',
  },
  pending_review: {
    color: 'var(--color-status-pending-review)',
    bgColor: '#fef3c7',
    icon: Eye,
    labelKey: 'status.pending_review',
  },
  approved: {
    color: 'var(--color-status-approved)',
    bgColor: '#d1fae5',
    icon: ShieldCheck,
    labelKey: 'status.approved',
  },
  approved_with_controls: {
    color: 'var(--color-status-approved-controls)',
    bgColor: '#ccfbf1',
    icon: Shield,
    labelKey: 'status.approved_with_controls',
  },
  restricted: {
    color: 'var(--color-status-restricted)',
    bgColor: '#fee2e2',
    icon: Ban,
    labelKey: 'status.restricted',
  },
  reassessment_required: {
    color: 'var(--color-status-reassessment)',
    bgColor: '#ffedd5',
    icon: RotateCcw,
    labelKey: 'status.reassessment_required',
  },
  published: {
    color: 'var(--color-status-published)',
    bgColor: '#d1fae5',
    icon: Globe,
    labelKey: 'status.published',
  },
};

/** Get score ring color based on 0–100 scale */
export function getScoreColor(score: number): string {
  if (score >= 80) return 'var(--color-score-excellent)';
  if (score >= 60) return 'var(--color-score-good)';
  if (score >= 40) return 'var(--color-score-moderate)';
  if (score >= 20) return 'var(--color-score-poor)';
  return 'var(--color-score-critical)';
}
