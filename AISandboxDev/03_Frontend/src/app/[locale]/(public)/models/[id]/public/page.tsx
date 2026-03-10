'use client';

import Link from 'next/link';
import { RankBadge } from '@/components/ranking/RankBadge';
import { ScoreCardGrid } from '@/components/score/ScoreCardGrid';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import { useParams } from 'next/navigation';

import mockRanking from '@/mocks/fixtures/ranking.json';

export default function PublicModelProfilePage() {
  const params = useParams<{ id: string }>();
  const model = mockRanking.find((r) => r.modelId === params.id);

  if (!model) {
    return (
      <div style={{ maxWidth: 'var(--article-max-width)', margin: '0 auto', padding: 'var(--space-8)' }}>
        <EmptyStateBlock title="Profil model ini tidak lagi tersedia" action={<Link href="/ranking" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>← Kembali ke Peringkat</Link>} />
      </div>
    );
  }

  return (
    <article style={{ maxWidth: 'var(--article-max-width)', margin: '0 auto', padding: 'var(--space-8)' }}>
      {/* Hero card */}
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-8)' }}>
        <RankBadge rank={model.rank} size="lg" />
        <h1 style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-3xl)' }}>{model.modelName}</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>{model.provider}</p>
        <span style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-1) var(--space-3)', background: 'var(--color-status-approved)', color: 'white', borderRadius: 'var(--radius-full)' }}>{model.approvalLabel}</span>
      </div>

      {/* Score cards */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Skor Penilaian</h2>
        <ScoreCardGrid scores={model.scores} />
      </section>

      {/* Strengths & Weaknesses */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        <div>
          <h3>Kekuatan</h3>
          <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', paddingLeft: 'var(--space-5)', marginTop: 'var(--space-2)' }}>
            {model.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div>
          <h3>Kelemahan</h3>
          <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', paddingLeft: 'var(--space-5)', marginTop: 'var(--space-2)' }}>
            {model.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
        Penilaian dilakukan oleh AI Sandbox · Hasil terakhir diperbarui {new Date(model.lastAssessedAt).toLocaleDateString('id-ID')}
      </footer>
    </article>
  );
}
