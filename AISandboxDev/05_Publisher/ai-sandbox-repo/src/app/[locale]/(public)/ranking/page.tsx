'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CompareBar } from '@/components/ranking/CompareBar';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import { Trophy } from 'lucide-react';
import { ModelComparisonGrid } from '@/components/ranking/ModelComparisonGrid';

import mockRanking from '@/mocks/fixtures/ranking.json';
import mockModels from '@/mocks/fixtures/models.json';

export default function RankingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [limitHitSignal, setLimitHitSignal] = useState(0);

  const view = searchParams.get('view');
  const categories = ['all', 'Trust & Safety', 'Security', 'Privacy', 'Compliance', 'Ready for ID'];

  const ownModelIds = useMemo(
    () => (mockModels as Array<{ id: string; ownerId: string }>).filter((model) => model.ownerId === 'user-001').map((model) => model.id),
    []
  );

  const filteredRanking = useMemo(() => {
    const byTag =
      filter === 'all'
        ? mockRanking
        : mockRanking.filter((m) => m.suitabilityTags.includes(filter));

    if (view === 'my-models' || view === 'promoted') {
      return byTag.filter((item) => ownModelIds.includes(item.modelId));
    }

    return byTag;
  }, [filter, ownModelIds, view]);

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
      <PageHeader
        title="ModelHub"
        subtitle={
          view === 'my-models' || view === 'promoted'
            ? 'Model yang sudah dipromosikan dari AI Sandbox. Bandingkan secara ringkas dengan model lain.'
            : 'Permukaan discovery ModelHub untuk model yang sudah lolos gate promosi.'
        }
      />

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
        <ModelComparisonGrid
          models={filteredRanking}
          selectedIds={selected}
          ownModelIds={ownModelIds}
          onToggle={toggleSelect}
        />
      )}

      <CompareBar
        selectedIds={selected}
        limitHitSignal={limitHitSignal}
        onCompare={() => router.push(`/ranking/compare?ids=${selected.join(',')}`)}
        onRemove={(id) => setSelected((p) => p.filter((s) => s !== id))}
      />
    </div>
  );
}
