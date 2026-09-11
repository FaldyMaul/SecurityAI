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
import { RecipeResultsTable } from '@/components/results/RecipeResultsTable';
import {
  clearActiveBenchmark,
  getBenchmarkEtaMinutes,
  getBenchmarkProgress,
  readActiveBenchmark,
  type ActiveBenchmark,
} from '@/lib/benchmarkActivity';
import { publishToLeaderboard, validatePublish } from '@/lib/publishValidation';
import { ASSESSMENT_MODULES, normalizeBenchmarkResult, normalizeScoreBreakdown } from '@/lib/modules';
import type { SelectedRecipeResult, SeverityLevel } from '@/types/run';
import { api } from '@/lib/api';
import type { ApiResponse, Model, PaginatedResponse } from '@/types/api';
import { isRunFailedStatus, isRunInProgressStatus, isRunSuccessStatus, isRunTerminalStatus, mapRunStatusToModelStatus } from '@/lib/runLifecycle';

import mockRuns from '@/mocks/fixtures/runs.json';
import benchmarkResults from '@/mocks/fixtures/benchmark-results.json';

function getGradeFromScore(score: number): Grade {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

function toStatus(score: number): SelectedRecipeResult['status'] {
  if (score >= 80) return 'passed';
  if (score >= 60) return 'warning';
  return 'failed';
}

function toRecommendations(score: number): string[] {
  if (score >= 80) {
    return ['Pertahankan konfigurasi guardrail saat ini.', 'Lakukan monitoring berkala untuk menjaga konsistensi.'];
  }
  if (score >= 60) {
    return ['Perkuat validasi input untuk skenario borderline.', 'Tambahkan evaluasi ulang setelah tuning prompt keamanan.'];
  }
  return ['Terapkan kontrol keamanan tambahan sebelum rilis.', 'Lakukan perbaikan model lalu jalankan benchmark ulang.'];
}

function toRecipeResults(result: BenchmarkResult): SelectedRecipeResult[] {
  const categoryMap = new Map(result.categoryResults.map((category) => [category.id, category]));

  return ASSESSMENT_MODULES.filter((moduleDef) => categoryMap.has(moduleDef.id)).flatMap((moduleDef) => {
    const category = categoryMap.get(moduleDef.id);
    const recipeResultMap = new Map((category?.recipes || []).map((recipe) => [recipe.id, recipe]));
    const fallbackPerRecipeTotal = Math.max(4, Math.round(moduleDef.estimatedTests / Math.max(moduleDef.recipes.length, 1)));

    return moduleDef.recipes.map((recipeMeta) => {
      const recipe = recipeResultMap.get(recipeMeta.id);
      const score = recipe?.avgScore ?? category?.score ?? 0;
      const totalTests = recipe?.totalPrompts ?? fallbackPerRecipeTotal;
      const passed = recipe?.metrics.safe ?? Math.max(0, Math.round((score / 100) * totalTests));
      const failed = recipe?.metrics.unsafe ?? Math.max(0, totalTests - passed);
      const critical =
        recipe?.sampleResults.filter((sample) => sample.verdict === 'fail').length ??
        (score < 60 ? Math.max(1, Math.round(failed / 2)) : 0);

      const findings =
        recipe?.sampleResults
          .map((sample, idx) => ({
            id: `${recipeMeta.id}-finding-${idx + 1}`,
            severity: (sample.verdict === 'fail' ? 'high' : sample.verdict === 'warning' ? 'medium' : 'info') as SeverityLevel,
            description: sample.evaluation,
            verdict: sample.verdict,
            testId: `${recipeMeta.id}-${String(idx + 1).padStart(3, '0')}`,
            analysis: sample.evaluation,
            prompt: sample.prompt,
            response: sample.response,
          })) ||
        [];

      return {
        recipeId: recipeMeta.id,
        categoryId: moduleDef.id,
        categoryName: moduleDef.name,
        recipeName: recipeMeta.name,
        method: recipeMeta.method,
        dataset: recipeMeta.dataset,
        score,
        grade: recipe?.grade ?? getGradeFromScore(score),
        status: toStatus(score),
        totalTests,
        passed,
        failed,
        critical,
        findings,
        recommendations: toRecommendations(score),
      };
    });
  });
}

function normalizeApiBenchmarkResult(payload: unknown, runId: string, modelId: string): BenchmarkResult {
  const fallback = normalizeBenchmarkResult((benchmarkResults as unknown as Record<string, BenchmarkResult>)['run-001']);
  const data = payload as Partial<BenchmarkResult> & { categoryResults?: Array<Record<string, unknown>> };
  const rawCategories = (data.categoryResults as Array<Record<string, unknown>> | undefined) ?? [];
  const categoryResults = rawCategories.map((category, idx) => {
    const categoryId = String(category.categoryId || category.id || `category-${idx + 1}`);
    const score = Number(category.score || 0);
    return {
      id: categoryId,
      name: String(category.name || categoryId),
      score,
      grade: String(category.grade || getGradeFromScore(score)) as Grade,
      description: String(category.description || ''),
      recipes: Array.isArray(category.recipes) ? (category.recipes as BenchmarkResult['categoryResults'][number]['recipes']) : [],
    };
  });

  return {
    ...fallback,
    metadata: {
      ...fallback.metadata,
      ...(data.metadata || {}),
      id: runId,
      modelId,
    },
    overallScore: Number(data.overallScore || fallback.overallScore),
    overallGrade: String(data.overallGrade || fallback.overallGrade) as Grade,
    gradingScale: data.gradingScale || fallback.gradingScale,
    categoryResults: categoryResults.length > 0 ? categoryResults : fallback.categoryResults,
  };
}

function toTrackerProgress(progress: unknown) {
  const data = progress as
    | { percentComplete?: number; currentStepLabel?: string; currentStep?: number; totalSteps?: number }
    | { completed?: number; total?: number; current_task?: string }
    | undefined;
  if (!data) {
    return { percentComplete: 0, currentStepLabel: 'Waiting in queue...', currentStep: 0, totalSteps: 10 };
  }

  if (typeof (data as { percentComplete?: number }).percentComplete === 'number') {
    return {
      percentComplete: Number((data as { percentComplete: number }).percentComplete || 0),
      currentStepLabel: String((data as { currentStepLabel?: string }).currentStepLabel || 'Sedang berjalan'),
      currentStep: Number((data as { currentStep?: number }).currentStep || 1),
      totalSteps: Number((data as { totalSteps?: number }).totalSteps || 10),
    };
  }

  const completed = Number((data as { completed?: number }).completed || 0);
  const total = Number((data as { total?: number }).total || 100) || 100;
  const percent = Math.max(0, Math.min(100, Math.round((completed / total) * 100)));
  return {
    percentComplete: percent,
    currentStepLabel: String((data as { current_task?: string }).current_task || 'Menjalankan benchmark'),
    currentStep: Math.max(1, Math.round((percent / 100) * 10)),
    totalSteps: 10,
  };
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
  const [apiModel, setApiModel] = useState<Model | null>(null);
  const [apiRun, setApiRun] = useState<((typeof mockRuns)[number] & { status: string }) | null>(null);
  const [apiRuns, setApiRuns] = useState<Array<(typeof mockRuns)[number] & { status: string }>>([]);
  const [apiResult, setApiResult] = useState<BenchmarkResult | null>(null);
  const [pollingActive, setPollingActive] = useState(false);

  const mockRun = mockRuns.find((item) => item.id === params.runId);
  const run = apiRun || mockRun;

  const historyRuns = useMemo(() => {
    const sourceRuns =
      apiRuns.length > 0
        ? apiRuns
        : [...mockRuns].filter((item) => item.modelId === params.id);
    return [...sourceRuns].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [apiRuns, params.id]);

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    const fetchRunState = async () => {
      try {
        const [modelRes, runsRes] = await Promise.all([
          api.get<ApiResponse<Model>>(`/api/models/${params.id}`),
          api.get<PaginatedResponse<Array<(typeof mockRuns)[number] & { status: string }>[number]>>(`/api/models/${params.id}/runs`),
        ]);
        if (cancelled) return;

        setApiModel(modelRes.data);
        setApiRuns(runsRes.data as Array<(typeof mockRuns)[number] & { status: string }>);
        const targetRun = (runsRes.data as Array<(typeof mockRuns)[number] & { status: string }>).find((item) => item.id === params.runId) || null;
        setApiRun(targetRun);

        if (!targetRun) {
          setPollingActive(false);
          return;
        }

        const runTerminal = isRunTerminalStatus(targetRun.status);
        const modelTerminal = modelRes.data.status === 'assessment_completed' || modelRes.data.status === 'run_failed';
        const shouldPoll = !runTerminal && !modelTerminal;
        setPollingActive(shouldPoll);
        if (!shouldPoll && interval) {
          clearInterval(interval);
          interval = null;
        }

        if (runTerminal || modelTerminal) {
          try {
            const resultRes = await api.get<ApiResponse<unknown>>(`/api/models/${params.id}/runs/${targetRun.id}/results`);
            if (!cancelled) {
              setApiResult(normalizeApiBenchmarkResult(resultRes.data, targetRun.id, params.id));
            }
          } catch {
            // Keep UI alive with fallback result mapping.
          }
        }
      } catch {
        if (!cancelled) {
          setPollingActive(false);
        }
      }
    };

    fetchRunState();
    interval = setInterval(() => {
      fetchRunState();
    }, 2000);

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [params.id, params.runId]);

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

  const rawBenchmarkResult = (benchmarkResults as unknown as Record<string, BenchmarkResult>)[run.id] || null;
  const benchmarkResult = apiResult || (rawBenchmarkResult ? normalizeBenchmarkResult(rawBenchmarkResult) : null);
  const recipeResults = benchmarkResult ? toRecipeResults(benchmarkResult) : [];
  const isRunning = isRunInProgressStatus(run.status) || run.status === 'queued' || run.status === 'run_queued';
  const score = run.overallScore ?? benchmarkResult?.overallScore ?? 0;
  const grade = getGradeFromScore(score);
  const canPublish = grade !== 'D' && grade !== 'E';
  const hasResumedActivity = activeBenchmark?.runId === params.runId && activeBenchmark.modelId === params.id;
  const previousCompletedRun = historyRuns.find(
    (item) => item.id !== run.id && (item.status === 'completed' || item.status === 'completed_success') && item.scores
  );
  const baselineVersionScores = previousCompletedRun?.scores ? normalizeScoreBreakdown(previousCompletedRun.scores) : null;
  const candidateVersionScores = run.scores ? normalizeScoreBreakdown(run.scores) : null;

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
        actions={<StatusBadge status={mapRunStatusToModelStatus(run.status)} />}
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
                    mapRunStatusToModelStatus(historyRun.status)
                  }
                />
              </span>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'latest' && isRunning && (
        <RunProgressTracker
          progress={toTrackerProgress(run.progress)}
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

      {activeTab === 'latest' && isRunSuccessStatus(run.status) && benchmarkResult && (
        <div style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.65rem' }}>
            <Button variant="secondary" size="sm" onClick={() => setReviewModalOpen(true)}>
              Tinjau dengan AI
            </Button>
          </div>
          <AssessmentReport result={benchmarkResult} />

          <section style={{ marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.35rem' }}>Hasil Detail Per Recipe</h3>
            <p style={{ marginTop: 0, marginBottom: '0.9rem', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
              Menampilkan {recipeResults.length} recipe yang diuji
            </p>
            <RecipeResultsTable rows={recipeResults} />
          </section>
        </div>
      )}

      {activeTab === 'latest' && isRunSuccessStatus(run.status) && previousCompletedRun?.scores && run.scores && (
        <div style={{ marginTop: '1rem' }}>
          <VersionComparisonView
            baselineVersion={previousCompletedRun.id}
            candidateVersion={run.id}
            baseline={{
              adversarial: baselineVersionScores?.adversarial ?? 0,
              safety: baselineVersionScores?.safety ?? 0,
              privacy: baselineVersionScores?.privacy ?? 0,
              hallucination: baselineVersionScores?.hallucination ?? 0,
            }}
            candidate={{
              adversarial: candidateVersionScores?.adversarial ?? 0,
              safety: candidateVersionScores?.safety ?? 0,
              privacy: candidateVersionScores?.privacy ?? 0,
              hallucination: candidateVersionScores?.hallucination ?? 0,
            }}
          />
        </div>
      )}

      {activeTab === 'latest' && isRunSuccessStatus(run.status) && !benchmarkResult && run.findings && run.findings.length > 0 && (
        <div style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
          <h3 style={{ marginBottom: 'var(--space-3, 0.75rem)' }}>Temuan</h3>
          <FindingsAccordion categories={run.findings as unknown as FindingCategory[]} />
        </div>
      )}

      {activeTab === 'latest' && isRunFailedStatus(run.status) && (
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

      {activeTab === 'latest' && isRunSuccessStatus(run.status) && (
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

