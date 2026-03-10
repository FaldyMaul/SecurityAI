'use client';

import styles from './WorkflowStepper.module.css';
import { CheckCircle } from 'lucide-react';
import type { ModelStatus } from '@/types/api';

const STEPS = [
  { key: 'draft', label: 'Draf' },
  { key: 'validated', label: 'Tervalidasi' },
  { key: 'assessed', label: 'Dinilai' },
  { key: 'reviewed', label: 'Direview' },
  { key: 'published', label: 'Dipublikasikan' },
] as const;

const STATUS_TO_STEP: Record<string, number> = {
  draft: 0,
  validation_pending: 0,
  validation_failed: 0,
  endpoint_valid: 1,
  run_queued: 1,
  run_in_progress: 1,
  run_failed: 1,
  assessment_completed: 2,
  pending_review: 3,
  approved: 3,
  approved_with_controls: 3,
  restricted: 3,
  reassessment_required: 2,
  published: 4,
};

interface WorkflowStepperProps {
  status: ModelStatus;
}

export function WorkflowStepper({ status }: WorkflowStepperProps) {
  const currentStep = STATUS_TO_STEP[status] ?? 0;

  return (
    <div className={styles.stepper}>
      {STEPS.map((step, index) => (
        <div
          key={step.key}
          className={`${styles.step} ${index < currentStep ? styles.done : ''} ${index === currentStep ? styles.active : ''}`}
        >
          <div className={styles.circle}>
            {index < currentStep ? <CheckCircle size={20} /> : <span>{index + 1}</span>}
          </div>
          <span className={styles.label}>{step.label}</span>
          {index < STEPS.length - 1 && <div className={styles.connector} />}
        </div>
      ))}
    </div>
  );
}
