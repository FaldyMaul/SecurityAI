import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { SummaryTile } from '@/components/dashboard/SummaryTile';
import { SystemHealthStrip } from '@/components/dashboard/SystemHealthStrip';
import { TableSkeleton } from '@/components/shared/Skeleton';
import { Box, ClipboardList, Play, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  /* Mock data — will be replaced with TanStack Query hooks */
  const tiles = [
    { icon: Box, label: 'Total Model', value: 5, href: '/models' },
    { icon: ClipboardList, label: 'Pending Review', value: 1, href: '/reviews', highlight: true },
    { icon: Play, label: 'Benchmark Berjalan', value: 0, href: '/models' },
    { icon: Globe, label: 'Model Dipublikasikan', value: 2, href: '/ranking' },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Ringkasan aktivitas AI Sandbox Anda" />

      {/* Summary Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {tiles.map((t) => (
          <SummaryTile key={t.label} {...t} />
        ))}
      </div>

      {/* Two-column: Review Queue Preview + Recent Runs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <section>
          <h3 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-lg)' }}>Antrean Review</h3>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>1 model menunggu review →{' '}
              <Link href="/reviews" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Lihat Semua</Link>
            </p>
          </div>
        </section>
        <section>
          <h3 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-lg)' }}>Benchmark Terbaru</h3>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>2 benchmark selesai →{' '}
              <Link href="/models" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Lihat Model</Link>
            </p>
          </div>
        </section>
      </div>

      {/* System Health */}
      <div style={{ marginTop: 'var(--space-6)' }}>
        <SystemHealthStrip />
      </div>
    </>
  );
}
