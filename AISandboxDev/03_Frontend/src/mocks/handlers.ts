import { http, HttpResponse } from 'msw';
import models from './fixtures/models.json';
import reviews from './fixtures/reviews.json';
import runs from './fixtures/runs.json';
import ranking from './fixtures/ranking.json';
import users from './fixtures/users.json';
import benchmarkResults from './fixtures/benchmark-results.json';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getGradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'E' {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

export const handlers = [
  /* ── Auth ── */
  http.get(`${BASE}/api/auth/me`, () => {
    return HttpResponse.json({
      success: true,
      data: users[0], // default: model_owner
    });
  }),

  http.post(`${BASE}/api/auth/login`, () => {
    return HttpResponse.json({
      success: true,
      data: users[0],
      message: 'Login successful',
    });
  }),

  http.post(`${BASE}/api/auth/logout`, () => {
    return HttpResponse.json({ success: true });
  }),

  /* ── Models ── */
  http.get(`${BASE}/api/models`, () => {
    return HttpResponse.json({
      data: models,
      total: models.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
  }),

  http.get(`${BASE}/api/models/:id`, ({ params }) => {
    const model = models.find((m) => m.id === params.id);
    if (!model) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ success: true, data: model });
  }),

  http.post(`${BASE}/api/models`, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return HttpResponse.json({
      success: true,
      data: { id: 'model-new', ...body, status: 'draft', createdAt: new Date().toISOString() },
      message: 'Draf berhasil disimpan',
    });
  }),

  http.post(`${BASE}/api/models/:id/validate`, () => {
    return HttpResponse.json({
      success: true,
      data: { status: 'endpoint_valid' },
    });
  }),

  /* ── Runs ── */
  http.get(`${BASE}/api/models/:id/runs`, ({ params }) => {
    const modelRuns = runs.filter((r) => r.modelId === params.id);
    return HttpResponse.json({ data: modelRuns, total: modelRuns.length, page: 1, limit: 10, totalPages: 1 });
  }),

  http.get(`${BASE}/api/models/:id/runs/:runId`, ({ params }) => {
    const run = runs.find((r) => r.id === params.runId);
    if (!run) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ success: true, data: run });
  }),

  http.post(`${BASE}/api/models/:id/runs`, () => {
    return HttpResponse.json({
      success: true,
      data: { id: 'run-new', status: 'queued', createdAt: new Date().toISOString() },
    });
  }),

  http.post(`${BASE}/api/models/:id/publish/validate`, async ({ params, request }) => {
    const body = (await request.json().catch(() => ({}))) as { runId?: string; score?: number };
    const modelRuns = runs
      .filter((run) => run.modelId === params.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const latestRun = body.runId ? modelRuns.find((run) => run.id === body.runId) : modelRuns[0];

    if (!latestRun) {
      return HttpResponse.json(
        {
          success: false,
          code: 'NO_RUN_AVAILABLE',
          message: 'Model belum memiliki hasil benchmark untuk dipublikasikan.',
        },
        { status: 400 }
      );
    }

    const fallbackScore = (benchmarkResults as unknown as Record<string, { overallScore: number }>)[latestRun.id]?.overallScore ?? 0;
    const score = body.score ?? latestRun.overallScore ?? fallbackScore;
    const grade = getGradeFromScore(score);
    const canPublish = grade !== 'D' && grade !== 'E';

    return HttpResponse.json({
      success: true,
      data: {
        canPublish,
        grade,
        score,
        runId: latestRun.id,
        reason: canPublish
          ? 'Model memenuhi syarat minimum promosi ke ModelHub.'
          : `Model grade ${grade} tidak memenuhi minimum promosi. Perlu rerun setelah perbaikan.`,
        minimumGrade: 'C',
      },
    });
  }),

  http.post(`${BASE}/api/models/:id/publish`, async ({ params, request }) => {
    const body = (await request.json().catch(() => ({}))) as { runId?: string; score?: number };
    const modelRuns = runs
      .filter((run) => run.modelId === params.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const latestRun = body.runId ? modelRuns.find((run) => run.id === body.runId) : modelRuns[0];

    if (!latestRun) {
      return HttpResponse.json({ success: false, message: 'Run tidak ditemukan.' }, { status: 404 });
    }

    const fallbackScore = (benchmarkResults as unknown as Record<string, { overallScore: number }>)[latestRun.id]?.overallScore ?? 0;
    const score = body.score ?? latestRun.overallScore ?? fallbackScore;
    const grade = getGradeFromScore(score);
    if (grade === 'D' || grade === 'E') {
      return HttpResponse.json(
        {
          success: false,
          code: 'PUBLISH_BLOCKED_LOW_GRADE',
          message: `Publikasi ditolak. Grade ${grade} berada di bawah standar minimum C.`,
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        modelId: params.id,
        runId: latestRun.id,
        publishedAt: new Date().toISOString(),
        grade,
      },
      message: 'Model berhasil dipromosikan ke ModelHub.',
    });
  }),

  http.post(`${BASE}/api/models/:id/promote/validate`, async ({ params, request }) => {
    const body = (await request.json().catch(() => ({}))) as { runId?: string; score?: number };
    const modelRuns = runs
      .filter((run) => run.modelId === params.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const latestRun = body.runId ? modelRuns.find((run) => run.id === body.runId) : modelRuns[0];

    if (!latestRun) {
      return HttpResponse.json(
        {
          success: false,
          code: 'NO_RUN_AVAILABLE',
          message: 'Model belum memiliki hasil benchmark untuk dipromosikan.',
        },
        { status: 400 }
      );
    }

    const fallbackScore = (benchmarkResults as unknown as Record<string, { overallScore: number }>)[latestRun.id]?.overallScore ?? 0;
    const score = body.score ?? latestRun.overallScore ?? fallbackScore;
    const grade = getGradeFromScore(score);
    const canPublish = grade !== 'D' && grade !== 'E';

    return HttpResponse.json({
      success: true,
      data: {
        canPublish,
        grade,
        score,
        runId: latestRun.id,
        reason: canPublish
          ? 'Model memenuhi syarat minimum promosi ke ModelHub.'
          : `Model grade ${grade} tidak memenuhi minimum promosi. Perlu rerun setelah perbaikan.`,
        minimumGrade: 'C',
      },
    });
  }),

  http.post(`${BASE}/api/models/:id/promote`, async ({ params, request }) => {
    const body = (await request.json().catch(() => ({}))) as { runId?: string; score?: number; overallScore?: number };
    const modelRuns = runs
      .filter((run) => run.modelId === params.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const latestRun = body.runId ? modelRuns.find((run) => run.id === body.runId) : modelRuns[0];

    if (!latestRun) {
      return HttpResponse.json({ success: false, message: 'Run tidak ditemukan.' }, { status: 404 });
    }

    const fallbackScore = (benchmarkResults as unknown as Record<string, { overallScore: number }>)[latestRun.id]?.overallScore ?? 0;
    const score = body.overallScore ?? body.score ?? latestRun.overallScore ?? fallbackScore;
    const grade = getGradeFromScore(score);
    if (grade === 'D' || grade === 'E') {
      return HttpResponse.json(
        {
          success: false,
          code: 'PROMOTION_BLOCKED_LOW_GRADE',
          message: `Promosi ditolak. Grade ${grade} berada di bawah standar minimum C.`,
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        modelId: params.id,
        status: 'published_to_modelhub',
        runId: latestRun.id,
        promotedAt: new Date().toISOString(),
        grade,
      },
      message: 'Model berhasil dipromosikan ke ModelHub.',
    });
  }),

  /* ── Reviews ── */
  http.get(`${BASE}/api/reviews`, () => {
    return HttpResponse.json({
      data: reviews,
      total: reviews.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
  }),

  http.get(`${BASE}/api/reviews/:id`, ({ params }) => {
    const review = reviews.find((r) => r.id === params.id);
    if (!review) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ success: true, data: review });
  }),

  http.post(`${BASE}/api/reviews/:id/decision`, () => {
    return HttpResponse.json({ success: true, message: 'Keputusan berhasil direkam' });
  }),

  /* ── Ranking ── */
  http.get(`${BASE}/api/ranking`, () => {
    return HttpResponse.json({
      data: ranking,
      total: ranking.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
  }),

  http.get(`${BASE}/api/ranking/compare`, ({ request }) => {
    const url = new URL(request.url);
    const ids = url.searchParams.get('ids')?.split(',') || [];
    const matched = ranking.filter((r) => ids.includes(r.modelId));
    return HttpResponse.json({ success: true, data: { models: matched } });
  }),

  /* ── Users / Settings ── */
  http.patch(`${BASE}/api/users/me`, () => {
    return HttpResponse.json({ success: true, message: 'Pengaturan berhasil disimpan' });
  }),

  http.patch(`${BASE}/api/users/me/preferences`, () => {
    return HttpResponse.json({ success: true, message: 'Pengaturan berhasil disimpan' });
  }),

  http.patch(`${BASE}/api/users/me/notifications`, () => {
    return HttpResponse.json({ success: true, message: 'Pengaturan berhasil disimpan' });
  }),

  /* ── Health ── */
  http.get(`${BASE}/api/health`, () => {
    return HttpResponse.json({
      success: true,
      data: { api: 'healthy', litellm: 'healthy', moonshot: 'healthy', jobQueue: 0, lastFailure: null },
    });
  }),
];
