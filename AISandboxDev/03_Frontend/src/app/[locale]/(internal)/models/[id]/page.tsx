'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { WorkflowStepper } from '@/components/model/WorkflowStepper';
import { EndpointValidationCard } from '@/components/model/EndpointValidationCard';
import { ScoreCardGrid } from '@/components/score/ScoreCardGrid';
import { FindingsAccordion } from '@/components/findings/FindingsAccordion';
import { BenchmarkWizard } from '@/components/run/BenchmarkWizard';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import type { ApiResponse, Model, PaginatedResponse } from '@/types/api';
import { Button } from '@/components/shared/Button';
import { DataAccessBadge, type DataAccessLevel } from '@/components/security/DataAccessBadge';
import { LifecycleStageBadge, type LifecycleStage } from '@/components/security/LifecycleStageBadge';
import type { FindingCategory, ScoreBreakdown } from '@/types/run';
import { api } from '@/lib/api';
import {
  clearActiveBenchmark,
  getBenchmarkEtaMinutes,
  getBenchmarkProgress,
  readActiveBenchmark,
  type ActiveBenchmark,
} from '@/lib/benchmarkActivity';
import { publishToLeaderboard, validatePublish } from '@/lib/publishValidation';
import { isRunInProgressStatus, isRunQueuedStatus, isRunSuccessStatus, mapRunStatusToModelStatus } from '@/lib/runLifecycle';

import mockModels from '@/mocks/fixtures/models.json';
import mockRuns from '@/mocks/fixtures/runs.json';

function getGradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'E' {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

function getLifecycleStage(status: Model['status']): LifecycleStage {
  if (status === 'draft' || status === 'validation_pending') return 'design';
  if (status === 'endpoint_valid' || status === 'run_in_progress' || status === 'run_queued') return 'testing';
  if (status === 'assessment_completed' || status === 'pending_review') return 'development';
  if (status === 'published' || status === 'approved' || status === 'approved_with_controls') return 'production';
  return 'retired';
}

function getDataAccessLevel(score: number): DataAccessLevel {
  if (score >= 80) return 'internal';
  if (score >= 60) return 'restricted';
  return 'pdp-sensitive';
}

type BackendRun = {
  id: string;
  modelId: string;
  packageName: string;
  status: string;
  overallScore?: number;
  scores?: ScoreBreakdown;
  findings?: FindingCategory[];
  createdAt: string;
};

export default function ModelDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [apiModel, setApiModel] = useState<Model | null>(null);
  const [apiRuns, setApiRuns] = useState<BackendRun[]>([]);
  const [isApiConnected, setIsApiConnected] = useState(false);
  const fallbackModel = (mockModels as unknown as Model[]).find((item) => item.id === params.id);

  const runs = useMemo(() => {
    const sourceRuns =
      apiRuns.length > 0 ? apiRuns : [...mockRuns].filter((item) => item.modelId === params.id);
    return [...sourceRuns].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [apiRuns, params.id]);
  const model = apiModel || fallbackModel;

  const latestRun = runs[0];
  const [showWizard, setShowWizard] = useState(false);
  const [activeBenchmark, setActiveBenchmark] = useState<ActiveBenchmark | null>(null);
  const [activityProgress, setActivityProgress] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (searchParams.get('rerunFrom')) {
      setShowWizard(true);
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    const fetchLifecycle = async () => {
      try {
        const [modelRes, runsRes] = await Promise.all([
          api.get<ApiResponse<Model>>(`/api/models/${params.id}`),
          api.get<PaginatedResponse<BackendRun>>(`/api/models/${params.id}/runs`),
        ]);
        if (cancelled) return;

        setIsApiConnected(true);
        setApiModel(modelRes.data);
        setApiRuns(runsRes.data || []);

        const latest = (runsRes.data || [])[0];
        const modelActive = modelRes.data.status === 'run_queued' || modelRes.data.status === 'run_in_progress';
        const runActive = latest ? isRunQueuedStatus(latest.status) || isRunInProgressStatus(latest.status) : false;
        const shouldPoll = modelActive || runActive;

        if (shouldPoll && !interval) {
          interval = setInterval(fetchLifecycle, 2000);
        }
        if (!shouldPoll && interval) {
          clearInterval(interval);
          interval = null;
        }
      } catch {
        if (cancelled) return;
        setIsApiConnected(false);
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    };

    fetchLifecycle();

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [params.id]);

  useEffect(() => {
    const activity = readActiveBenchmark();
    if (!activity) return;
    if (activity.modelId !== params.id) return;
    setActiveBenchmark(activity);
    setActivityProgress(getBenchmarkProgress(activity));
  }, [params.id]);

  useEffect(() => {
    if (!activeBenchmark) return;

    const tick = () => {
      const nextProgress = getBenchmarkProgress(activeBenchmark);
      setActivityProgress(nextProgress);
      if (nextProgress >= 100) {
        clearActiveBenchmark();
        setActiveBenchmark(null);
      }
    };

    tick();
    const interval = setInterval(tick, 2500);
    return () => clearInterval(interval);
  }, [activeBenchmark]);

  if (!model) {
    return <EmptyStateBlock title="Model tidak ditemukan" description="Model dengan ID ini tidak ada atau telah dihapus." />;
  }

  const handleBenchmarkComplete = (runId: string) => {
    router.push(`/models/${params.id}/runs/${runId}`);
  };

  const score = latestRun?.overallScore ?? 0;
  const grade = getGradeFromScore(score);
  const canPublish = grade !== 'D' && grade !== 'E';

  const handlePublish = async () => {
    if (publishing || !latestRun) return;
    setPublishMessage(null);
    setPublishing(true);

    const validation = await validatePublish(params.id, { runId: latestRun.id, score });
    if (!validation.canPublish) {
      setPublishMessage({ type: 'error', text: validation.reason });
      setPublishing(false);
      return;
    }

    try {
      const response = await publishToLeaderboard(params.id, { runId: latestRun.id, score });
      setPublishMessage({ type: 'success', text: response.message || 'Model berhasil dipromosikan ke ModelHub.' });
      setTimeout(() => {
        router.push('/ranking?view=promoted');
      }, 900);
    } catch {
      setPublishMessage({ type: 'error', text: 'Gagal promosi ke ModelHub. Silakan coba lagi.' });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      <PageHeader
        title={model.name}
        subtitle={`${model.provider} | Dibuat ${new Date(model.createdAt).toLocaleDateString('id-ID')}`}
        actions={<StatusBadge status={model.status} />}
      />

      {!isApiConnected && (
        <div
          style={{
            marginBottom: '0.8rem',
            padding: '0.65rem 0.8rem',
            borderRadius: '8px',
            border: '1px solid color-mix(in srgb, var(--color-score-poor) 35%, white)',
            background: 'color-mix(in srgb, var(--color-score-poor) 10%, white)',
            fontSize: '0.78rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          Backend tidak terhubung. Halaman memakai fallback fixture lokal sementara.
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <LifecycleStageBadge stage={getLifecycleStage(model.status)} />
        <DataAccessBadge level={getDataAccessLevel(score)} />
      </div>

      <WorkflowStepper status={model.status} />

      {model.status === 'restricted' && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'color-mix(in srgb, var(--color-score-critical) 10%, white)',
            border: '1px solid color-mix(in srgb, var(--color-score-critical) 45%, white)',
            borderRadius: '12px',
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: 'var(--color-score-critical)',
          }}
        >
          Model ini telah dibatasi karena skor penilaian rendah. Hubungi admin untuk informasi lebih lanjut.
        </div>
      )}

      {activeBenchmark && !showWizard && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            border: '1px solid color-mix(in srgb, var(--color-primary) 30%, white)',
            background: 'color-mix(in srgb, var(--color-primary-light) 65%, white)',
          }}
        >
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            Benchmark berjalan di background (dipulihkan setelah refresh)
          </div>
          <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            Progress {activityProgress}% | ETA {getBenchmarkEtaMinutes(activeBenchmark)} menit
          </div>
          <div style={{ marginTop: '0.6rem' }}>
            <Button size="sm" onClick={() => router.push(`/models/${params.id}/runs/${activeBenchmark.runId}`)}>
              Resume Monitoring
            </Button>
          </div>
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
          <BenchmarkWizard modelId={model.id} modelName={model.name} onComplete={handleBenchmarkComplete} onCancel={() => setShowWizard(false)} />
        </div>
      )}

      {!showWizard && latestRun?.scores && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>Hasil Penilaian Terakhir</h3>
          <ScoreCardGrid scores={latestRun.scores} />
        </div>
      )}

      {!showWizard && latestRun?.findings && latestRun.findings.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>Temuan</h3>
          <FindingsAccordion categories={latestRun.findings as unknown as FindingCategory[]} />
        </div>
      )}

      {!showWizard && runs.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>Riwayat Benchmark</h3>
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
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
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
                  {run.overallScore !== undefined && <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Skor: {run.overallScore}</span>}
                  <StatusBadge status={mapRunStatusToModelStatus(run.status)} />
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
            flexDirection: 'column',
            gap: '0.75rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {isRunSuccessStatus(latestRun?.status) && !canPublish && (
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid color-mix(in srgb, var(--color-score-poor) 45%, white)',
                background: 'color-mix(in srgb, var(--color-score-poor) 10%, white)',
                color: 'var(--color-text-primary)',
                fontSize: '0.83rem',
              }}
            >
              Promosi ke ModelHub dinonaktifkan karena grade model saat ini {grade}. Tingkatkan kualitas model lalu jalankan ulang benchmark.
            </div>
          )}

          {publishMessage && (
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border:
                  publishMessage.type === 'success'
                    ? '1px solid color-mix(in srgb, var(--color-score-good) 45%, white)'
                    : '1px solid color-mix(in srgb, var(--color-score-critical) 45%, white)',
                background:
                  publishMessage.type === 'success'
                    ? 'color-mix(in srgb, var(--color-score-good) 12%, white)'
                    : 'color-mix(in srgb, var(--color-score-critical) 12%, white)',
                color: 'var(--color-text-primary)',
                fontSize: '0.83rem',
              }}
            >
              {publishMessage.text}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {(model.status === 'endpoint_valid' || model.status === 'assessment_completed' || model.status === 'draft') && (
              <Button onClick={() => setShowWizard(true)}>Mulai Benchmark</Button>
            )}
            {isRunSuccessStatus(latestRun?.status) && (
              <Button disabled={publishing || !canPublish} onClick={handlePublish}>
                {publishing ? 'Memproses promosi...' : 'Promosikan ke ModelHub'}
              </Button>
            )}
            <Button variant="secondary" onClick={() => setShowWizard(true)}>Rerun</Button>
          </div>
        </div>
      )}
    </>
  );
}
