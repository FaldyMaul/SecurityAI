'use client';

import { useParams } from 'next/navigation';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RunProgressTracker } from '@/components/run/RunProgressTracker';
import { AssessmentReport } from '@/components/run/AssessmentReport';
import { FindingsAccordion } from '@/components/findings/FindingsAccordion';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import type { BenchmarkResult, FindingCategory } from '@/types/run';

import mockRuns from '@/mocks/fixtures/runs.json';
import benchmarkResults from '@/mocks/fixtures/benchmark-results.json';

export default function BenchmarkRunPage() {
  const params = useParams<{ id: string; runId: string }>();
  const run = mockRuns.find((r) => r.id === params.runId);

  if (!run) {
    return <EmptyStateBlock title="Run tidak ditemukan" description="Benchmark run ini tidak ada." />;
  }

  const statusMap: Record<string, 'draft' | 'run_queued' | 'run_in_progress' | 'assessment_completed' | 'run_failed'> = {
    queued: 'run_queued',
    in_progress: 'run_in_progress',
    running: 'run_in_progress',
    completed: 'assessment_completed',
    failed: 'run_failed',
  };

  const benchmarkResult = (benchmarkResults as Record<string, BenchmarkResult>)[run.id] || null;
  const isRunning = run.status === 'queued' || run.status === 'in_progress' || run.status === 'running';

  return (
    <>
      <PageHeader
        title={`Run: ${run.id}`}
        subtitle={`${run.packageName} | Model ID: ${params.id}`}
        actions={<StatusBadge status={statusMap[run.status] || 'draft'} />}
      />

      {isRunning && (
        <RunProgressTracker
          progress={run.progress || { percentComplete: 0, currentStepLabel: 'Waiting in queue...', currentStep: 0, totalSteps: 10 }}
          elapsed={run.duration}
        />
      )}

      {run.status === 'completed' && benchmarkResult && (
        <div style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
          <AssessmentReport result={benchmarkResult} />
        </div>
      )}

      {run.status === 'completed' && !benchmarkResult && run.findings && run.findings.length > 0 && (
        <div style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
          <h3 style={{ marginBottom: 'var(--space-3, 0.75rem)' }}>Temuan</h3>
          <FindingsAccordion categories={run.findings as unknown as FindingCategory[]} />
        </div>
      )}

      {run.status === 'failed' && (
        <div
          style={{
            marginTop: 'var(--space-6, 1.5rem)',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #1a1020 0%, #2d1525 100%)',
            border: '1px solid #7f1d1d',
            borderRadius: '12px',
            fontSize: '0.9rem',
            color: '#fca5a5',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#ef4444', fontSize: '1rem' }}>
            Benchmark gagal
          </div>
          {'error' in run && run.error && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: '#f87171', fontWeight: 600 }}>{(run.error as { code: string }).code}</div>
              <div style={{ color: '#fca5a5', fontSize: '0.85rem', marginTop: '0.25rem' }}>{(run.error as { message: string }).message}</div>
            </div>
          )}
          {run.progress && (
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              Berhenti pada step {run.progress.currentStep}/{run.progress.totalSteps}: {run.progress.currentStepLabel}
            </div>
          )}
          <button
            style={{
              color: 'white',
              background: '#dc2626',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
            }}
          >
            Jalankan ulang
          </button>
        </div>
      )}

      {run.status === 'completed' && (
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border, #2a2a4a)',
          }}
        >
          <button
            style={{
              padding: '0.5rem 1.5rem',
              background: 'var(--color-primary, #6366f1)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Ajukan untuk review
          </button>
          <button
            style={{
              padding: '0.5rem 1.5rem',
              border: '1px solid var(--color-border, #2a2a4a)',
              borderRadius: '8px',
              background: 'none',
              color: 'var(--color-text, #e2e8f0)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Jalankan ulang
          </button>
        </div>
      )}
    </>
  );
}