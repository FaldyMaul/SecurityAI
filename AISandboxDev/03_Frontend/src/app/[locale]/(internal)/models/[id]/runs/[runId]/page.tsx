'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RunProgressTracker } from '@/components/run/RunProgressTracker';
import { AssessmentReport } from '@/components/run/AssessmentReport';
import { FindingsAccordion } from '@/components/findings/FindingsAccordion';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import type { BenchmarkResult, FindingCategory, Grade } from '@/types/run';
import { Button } from '@/components/shared/Button';
import { LLMReviewModal } from '@/components/run/LLMReviewModal';
import { VersionComparisonView } from '@/components/security/VersionComparisonView';
import {
  clearActiveBenchmark,
  getBenchmarkEtaMinutes,
  getBenchmarkProgress,
  readActiveBenchmark,
  type ActiveBenchmark,
} from '@/lib/benchmarkActivity';
import { publishToLeaderboard, validatePublish } from '@/lib/publishValidation';

import mockRuns from '@/mocks/fixtures/runs.json';
import benchmarkResults from '@/mocks/fixtures/benchmark-results.json';

function getGradeFromScore(score: number): Grade {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

export default function BenchmarkRunPage() {
  const params = useParams<{ id: string; runId: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'latest' | 'history'>('latest');
  const [activeBenchmark, setActiveBenchmark] = useState<ActiveBenchmark | null>(null);
  const [resumeProgress, setResumeProgress] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const run = mockRuns.find((item) => item.id === params.runId);

  const historyRuns = useMemo(
    () =>
      [...mockRuns]
        .filter((item) => item.modelId === params.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [params.id]
  );

  useEffect(() => {
    const activity = readActiveBenchmark();
    if (!activity) return;
    if (activity.runId !== params.runId || activity.modelId !== params.id) return;
    setActiveBenchmark(activity);
    setResumeProgress(getBenchmarkProgress(activity));
  }, [params.id, params.runId]);

  useEffect(() => {
    if (!activeBenchmark) return;

    const tick = () => {
      const nextProgress = getBenchmarkProgress(activeBenchmark);
      setResumeProgress(nextProgress);
      if (nextProgress >= 100) {
        clearActiveBenchmark();
        setActiveBenchmark(null);
      }
    };

    tick();
    const interval = setInterval(tick, 2500);
    return () => clearInterval(interval);
  }, [activeBenchmark]);

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

  const benchmarkResult = (benchmarkResults as unknown as Record<string, BenchmarkResult>)[run.id] || null;
  const isRunning = run.status === 'queued' || run.status === 'in_progress' || run.status === 'running';
  const score = run.overallScore ?? benchmarkResult?.overallScore ?? 0;
  const grade = getGradeFromScore(score);
  const canPublish = grade !== 'D' && grade !== 'E';
  const hasResumedActivity = activeBenchmark?.runId === params.runId && activeBenchmark.modelId === params.id;
  const previousCompletedRun = historyRuns.find((item) => item.id !== run.id && item.status === 'completed' && item.scores);

  const handlePublish = async () => {
    if (publishing) return;
    setPublishMessage(null);
    setPublishing(true);

    const validation = await validatePublish(params.id, { runId: run.id, score });
    if (!validation.canPublish) {
      setPublishMessage({ type: 'error', text: validation.reason });
      setPublishing(false);
      return;
    }

    try {
      const response = await publishToLeaderboard(params.id, { runId: run.id, score });
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
        title={`Pengujian: ${run.id}`}
        subtitle={`${run.packageName} | Model ID: ${params.id}`}
        actions={<StatusBadge status={statusMap[run.status] || 'draft'} />}
      />

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <Button variant={activeTab === 'latest' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('latest')}>
          Hasil Terbaru
        </Button>
        <Button variant={activeTab === 'history' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('history')}>
          Riwayat Pengujian ({historyRuns.length})
        </Button>
      </div>

      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {historyRuns.map((historyRun) => (
            <button
              key={historyRun.id}
              onClick={() => router.push(`/models/${params.id}/runs/${historyRun.id}`)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '0.84rem', color: 'var(--color-text-primary)' }}>
                {historyRun.id} | {new Date(historyRun.createdAt).toLocaleString('id-ID')}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                {historyRun.overallScore !== undefined && <strong style={{ color: 'var(--color-primary)' }}>{historyRun.overallScore}</strong>}
                <StatusBadge
                  status={
                    historyRun.status === 'completed'
                      ? 'assessment_completed'
                      : historyRun.status === 'failed'
                        ? 'run_failed'
                        : historyRun.status === 'running' || historyRun.status === 'in_progress'
                          ? 'run_in_progress'
                          : 'run_queued'
                  }
                />
              </span>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'latest' && isRunning && (
        <RunProgressTracker
          progress={run.progress || { percentComplete: 0, currentStepLabel: 'Waiting in queue...', currentStep: 0, totalSteps: 10 }}
          elapsed={run.duration}
        />
      )}

      {activeTab === 'latest' && hasResumedActivity && activeBenchmark && (
        <div style={{ marginTop: '0.8rem' }}>
          <RunProgressTracker
            progress={{
              percentComplete: resumeProgress,
              currentStepLabel: 'Dilanjutkan dari sesi sebelumnya',
              currentStep: Math.max(1, Math.round((resumeProgress / 100) * 10)),
              totalSteps: 10,
            }}
            elapsed={Math.max(0, Math.floor((Date.now() - activeBenchmark.startedAt) / 1000))}
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            Progress dipulihkan setelah refresh. ETA {getBenchmarkEtaMinutes(activeBenchmark)} menit.
          </p>
        </div>
      )}

      {activeTab === 'latest' && run.status === 'completed' && benchmarkResult && (
        <div style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.65rem' }}>
            <Button variant="secondary" size="sm" onClick={() => setReviewModalOpen(true)}>
              Tinjau dengan AI
            </Button>
          </div>
          <AssessmentReport result={benchmarkResult} />
        </div>
      )}

      {activeTab === 'latest' && run.status === 'completed' && previousCompletedRun?.scores && run.scores && (
        <div style={{ marginTop: '1rem' }}>
          <VersionComparisonView
            baselineVersion={previousCompletedRun.id}
            candidateVersion={run.id}
            baseline={{
              trust: previousCompletedRun.scores.trust,
              security: previousCompletedRun.scores.security,
              privacy: previousCompletedRun.scores.privacy,
              compliance: previousCompletedRun.scores.compliance,
              readiness: previousCompletedRun.scores.readiness,
            }}
            candidate={{
              trust: run.scores.trust,
              security: run.scores.security,
              privacy: run.scores.privacy,
              compliance: run.scores.compliance,
              readiness: run.scores.readiness,
            }}
          />
        </div>
      )}

      {activeTab === 'latest' && run.status === 'completed' && !benchmarkResult && run.findings && run.findings.length > 0 && (
        <div style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
          <h3 style={{ marginBottom: 'var(--space-3, 0.75rem)' }}>Temuan</h3>
          <FindingsAccordion categories={run.findings as unknown as FindingCategory[]} />
        </div>
      )}

      {activeTab === 'latest' && run.status === 'failed' && (
        <div
          style={{
            marginTop: 'var(--space-6, 1.5rem)',
            padding: '1.5rem',
            background: 'color-mix(in srgb, var(--color-score-critical) 10%, white)',
            border: '1px solid color-mix(in srgb, var(--color-score-critical) 45%, white)',
            borderRadius: '12px',
            fontSize: '0.9rem',
            color: 'var(--color-score-critical)',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Benchmark gagal</div>
          {'error' in run && run.error && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 600 }}>{(run.error as { code: string }).code}</div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{(run.error as { message: string }).message}</div>
            </div>
          )}
          {run.progress && (
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              Berhenti pada step {run.progress.currentStep}/{run.progress.totalSteps}: {run.progress.currentStepLabel}
            </div>
          )}
          <Button variant="danger" onClick={() => router.push(`/models/${params.id}?rerunFrom=${run.id}`)}>
            Rerun Benchmark
          </Button>
        </div>
      )}

      {activeTab === 'latest' && run.status === 'completed' && (
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
          {!canPublish && (
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid color-mix(in srgb, var(--color-score-poor) 45%, white)',
                background: 'color-mix(in srgb, var(--color-score-poor) 12%, white)',
                color: 'var(--color-text-primary)',
                fontSize: '0.83rem',
              }}
            >
              Promosi dinonaktifkan karena model memiliki grade {grade}. Model dengan grade D/E tidak bisa dipromosikan ke ModelHub.
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
            <Button disabled={publishing || !canPublish} onClick={handlePublish}>
              {publishing ? 'Memproses promosi...' : 'Promosikan ke ModelHub'}
            </Button>
            <Button variant="secondary" onClick={() => router.push(`/models/${params.id}?rerunFrom=${run.id}`)}>
              Jalankan Ulang
            </Button>
          </div>
        </div>
      )}

      {benchmarkResult && <LLMReviewModal open={reviewModalOpen} onClose={() => setReviewModalOpen(false)} result={benchmarkResult} />}
    </>
  );
}
