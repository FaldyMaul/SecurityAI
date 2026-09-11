import type { ModelStatus } from '@/types/api';

export function isRunQueuedStatus(status?: string) {
  return status === 'queued' || status === 'run_queued';
}

export function isRunInProgressStatus(status?: string) {
  return status === 'in_progress' || status === 'running' || status === 'run_in_progress';
}

export function isRunSuccessStatus(status?: string) {
  return status === 'completed' || status === 'completed_success' || status === 'assessment_completed';
}

export function isRunFailedStatus(status?: string) {
  return status === 'failed' || status === 'completed_failed' || status === 'run_failed';
}

export function isRunTerminalStatus(status?: string) {
  return isRunSuccessStatus(status) || isRunFailedStatus(status);
}

export function mapRunStatusToModelStatus(status?: string): ModelStatus {
  if (isRunSuccessStatus(status)) return 'assessment_completed';
  if (isRunFailedStatus(status)) return 'run_failed';
  if (isRunInProgressStatus(status)) return 'run_in_progress';
  if (isRunQueuedStatus(status)) return 'run_queued';
  return 'draft';
}
