'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RadarChartWrapper } from '@/components/ranking/RadarChartWrapper';
import { CompareTable } from '@/components/ranking/CompareTable';
import { RankBadge } from '@/components/ranking/RankBadge';
import { PageHeader } from '@/components/shared/PageHeader';

import mockRanking from '@/mocks/fixtures/ranking.json';

const MAX_COMPARE = 3;

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = (searchParams.get('ids')?.split(',') || []).filter(Boolean).slice(0, MAX_COMPARE);
  const models = mockRanking.filter((r) => ids.includes(r.modelId));

  if (models.length < 2) {
    return (
      <div style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto', padding: 'var(--space-8)', textAlign: 'center' }}>
        <p>Minimal 2 model diperlukan untuk perbandingan.</p>
        <Link href="/ranking" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          Kembali ke Peringkat
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto', padding: 'var(--space-8)' }}>
      <PageHeader title="Perbandingan Model" subtitle="Maksimal 3 model dapat dibandingkan dalam satu tampilan." />

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${models.length}, 1fr)`, gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {models.map((m) => (
          <div key={m.id} style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <RankBadge rank={m.rank} size="lg" />
            <h3 style={{ marginTop: 'var(--space-2)' }}>{m.modelName}</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>{m.provider}</p>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary)', marginTop: 'var(--space-2)' }}>
              {m.overallScore}
            </div>
          </div>
        ))}
      </div>

      <RadarChartWrapper />

      <div style={{ marginTop: 'var(--space-6)' }}>
        <CompareTable />
      </div>
    </div>
  );
}
