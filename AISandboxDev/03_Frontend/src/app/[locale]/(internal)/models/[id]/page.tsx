'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { WorkflowStepper } from '@/components/model/WorkflowStepper';
import { EndpointValidationCard } from '@/components/model/EndpointValidationCard';
import { ScoreCardGrid } from '@/components/score/ScoreCardGrid';
import { FindingsAccordion } from '@/components/findings/FindingsAccordion';
import { BenchmarkWizard } from '@/components/run/BenchmarkWizard';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import type { Model } from '@/types/api';

import mockModels from '@/mocks/fixtures/models.json';
import mockRuns from '@/mocks/fixtures/runs.json';

export default function ModelDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const model = (mockModels as unknown as Model[]).find((m) => m.id === params.id);

  const runs = useMemo(
    () =>
      [...mockRuns]
        .filter((r) => r.modelId === params.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [params.id]
  );

  const latestRun = runs[0];
  const [showWizard, setShowWizard] = useState(false);

  if (!model) {
    return <EmptyStateBlock title="Model tidak ditemukan" description="Model dengan ID ini tidak ada atau telah dihapus." />;
  }

  const handleBenchmarkComplete = (runId: string) => {
    router.push(`/models/${params.id}/runs/${runId}`);
  };

  return (
    <>
      <PageHeader
        title={model.name}
        subtitle={`${model.provider} | Dibuat ${new Date(model.createdAt).toLocaleDateString('id-ID')}`}
        actions={<StatusBadge status={model.status} />}
      />

      <WorkflowStepper status={model.status} />

      {model.status === 'restricted' && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, #1a1020 0%, #2d1525 100%)',
            border: '1px solid #7f1d1d',
            borderRadius: '12px',
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#fca5a5',
          }}
        >
          Model ini telah dibatasi karena skor penilaian rendah. Hubungi admin untuk informasi lebih lanjut.
        </div>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <EndpointValidationCard
          endpointUrl={model.endpointUrl}
          authMethod={model.authMethod}
          initialState={model.status === 'draft' || model.status === 'validation_failed' ? 'untested' : 'success'}
        />
      </div>

      {showWizard && (
        <div style={{ marginTop: '1.5rem' }}>
          <BenchmarkWizard
            modelId={model.id}
            modelName={model.name}
            onComplete={handleBenchmarkComplete}
            onCancel={() => setShowWizard(false)}
          />
        </div>
      )}

      {!showWizard && latestRun?.scores && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-text, #e2e8f0)' }}>Hasil Penilaian Terakhir</h3>
          <ScoreCardGrid scores={latestRun.scores} />
        </div>
      )}

      {!showWizard && latestRun?.findings && latestRun.findings.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-text, #e2e8f0)' }}>Temuan</h3>
          <FindingsAccordion categories={latestRun.findings} />
        </div>
      )}

      {!showWizard && runs.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-text, #e2e8f0)' }}>Riwayat Benchmark</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {runs.map((run) => (
              <button
                key={run.id}
                onClick={() => router.push(`/models/${params.id}/runs/${run.id}`)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border, #2a2a4a)',
                  background: 'var(--color-surface, #1a1a2e)',
                  color: 'var(--color-text, #e2e8f0)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span>
                  <strong>{run.id}</strong> | {run.packageName}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {run.overallScore !== undefined && <span style={{ fontWeight: 700 }}>Score: {run.overallScore}</span>}
                  <StatusBadge
                    status={
                      run.status === 'completed'
                        ? 'assessment_completed'
                        : run.status === 'failed'
                          ? 'run_failed'
                          : run.status === 'in_progress' || run.status === 'running'
                            ? 'run_in_progress'
                            : 'run_queued'
                    }
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!showWizard && (
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border, #2a2a4a)',
          }}
        >
          {(model.status === 'endpoint_valid' || model.status === 'assessment_completed' || model.status === 'draft') && (
            <button
              onClick={() => setShowWizard(true)}
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
              Mulai benchmark
            </button>
          )}
          {model.status === 'assessment_completed' && (
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
              Ajukan untuk review
            </button>
          )}
        </div>
      )}
    </>
  );
}