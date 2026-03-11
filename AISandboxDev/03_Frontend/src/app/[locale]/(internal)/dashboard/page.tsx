import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { SummaryTile } from '@/components/dashboard/SummaryTile';
import { SystemHealthStrip } from '@/components/dashboard/SystemHealthStrip';
import { Box, CheckCircle2, Eye, Play, Globe, History } from 'lucide-react';
import type { Metadata } from 'next';

import mockModels from '@/mocks/fixtures/models.json';
import mockRuns from '@/mocks/fixtures/runs.json';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  const runningCount = mockRuns.filter((run) => run.status === 'queued' || run.status === 'running' || run.status === 'in_progress').length;
  const completedCount = mockRuns.filter((run) => run.status === 'completed').length;
  const pendingReview = mockModels.filter((model) => model.status === 'pending_review').length;
  const publishedCount = mockModels.filter((model) => model.status === 'published').length;

  const tiles = [
    { icon: Box, label: 'Total Model', value: mockModels.length, href: '/models' },
    { icon: Play, label: 'Testing Berjalan', value: runningCount, href: '/models' },
    { icon: CheckCircle2, label: 'Testing Selesai', value: completedCount, href: '/models' },
    { icon: Eye, label: 'Sedang di-Review', value: pendingReview, href: '/models', highlight: pendingReview > 0 },
    { icon: Globe, label: 'Model dipublikasikan', value: publishedCount, href: '/ranking' },
  ];

  const historyLog = [...mockRuns]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)
    .map((run) => {
      const model = mockModels.find((item) => item.id === run.modelId);
      return {
        id: run.id,
        modelName: model?.name || run.modelId,
        status: run.status,
        score: run.overallScore,
        at: run.createdAt,
      };
    });

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Ringkasan aktivitas AI Sandbox Anda" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {tiles.map((t) => (
          <SummaryTile key={t.label} {...t} />
        ))}
      </div>

      <section>
        <h3 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-lg)' }}>Benchmark Terbaru</h3>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            {historyLog.length} benchmark terbaru {'->'}{' '}
            <Link href="/models" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Lihat Model</Link>
          </p>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-6)' }}>
        <h3 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-lg)', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <History size={18} /> Riwayat Aktivitas
        </h3>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          {historyLog.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: '0.75rem 0.95rem',
                borderTop: index === 0 ? 'none' : '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.8rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{item.modelName}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  Run {item.id} {item.status === 'completed' ? 'selesai' : item.status}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                  {item.score !== undefined ? `Score ${item.score}` : '-'}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>{new Date(item.at).toLocaleString('id-ID')}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <SystemHealthStrip />
      </div>
    </>
  );
}
