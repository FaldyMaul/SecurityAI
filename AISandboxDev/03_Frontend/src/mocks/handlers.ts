import { http, HttpResponse } from 'msw';
import models from './fixtures/models.json';
import reviews from './fixtures/reviews.json';
import runs from './fixtures/runs.json';
import ranking from './fixtures/ranking.json';
import users from './fixtures/users.json';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
    const body = await request.json();
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
