'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RankBadge } from '@/components/ranking/RankBadge';
import { CompareBar } from '@/components/ranking/CompareBar';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import { Trophy } from 'lucide-react';
import styles from './ranking.module.css';

import mockRanking from '@/mocks/fixtures/ranking.json';

export default function RankingPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [limitHitSignal, setLimitHitSignal] = useState(0);

  const categories = ['all', 'Trust & Safety', 'Security', 'Privacy', 'Compliance', 'Ready for ID'];

  const filteredRanking =
    filter === 'all'
      ? mockRanking
      : mockRanking.filter((m) => m.suitabilityTags.includes(filter));

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 3) {
        setLimitHitSignal((tick) => tick + 1);
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <PageHeader title="Peringkat AI" subtitle="Model AI yang telah dipublikasikan, diurutkan berdasarkan skor" />

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${filter === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
              background: filter === cat ? 'var(--color-primary-light)' : 'transparent',
              color: filter === cat ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat === 'all' ? 'Semua' : cat}
          </button>
        ))}
      </div>

      {filteredRanking.length === 0 ? (
        <EmptyStateBlock
          icon={<Trophy size={48} strokeWidth={1.5} />}
          title="Tidak ada model ditemukan"
          description={`Belum ada model yang dipublikasikan untuk kategori "${filter === 'all' ? 'Semua' : filter}".`}
        />
      ) : (
        <div className={styles.grid}>
          {filteredRanking.map((model) => (
            <div key={model.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <RankBadge rank={model.rank} />
                <input
                  type="checkbox"
                  checked={selected.includes(model.modelId)}
                  onChange={() => toggleSelect(model.modelId)}
                  title="Pilih untuk perbandingan"
                />
              </div>
              <Link href={`/models/${model.modelId}/public`} className={styles.cardBody}>
                <h3 className={styles.modelName}>{model.modelName}</h3>
                <p className={styles.provider}>{model.provider}</p>
                <div className={styles.score}>{model.overallScore}</div>
                <span className={styles.approval}>{model.approvalLabel}</span>
                <div className={styles.tags}>
                  {model.suitabilityTags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <CompareBar
        selectedIds={selected}
        limitHitSignal={limitHitSignal}
        onCompare={() => {
          window.location.href = `/ranking/compare?ids=${selected.join(',')}`;
        }}
        onRemove={(id) => setSelected((p) => p.filter((s) => s !== id))}
      />
    </div>
  );
}
