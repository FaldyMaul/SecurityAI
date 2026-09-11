'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { DataTable } from '@/components/shared/DataTable';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import { TableSkeleton } from '@/components/shared/Skeleton';
import { formatDate } from '@/lib/formatters';
import type { Model } from '@/types/api';
import { Button } from '@/components/shared/Button';
import { useModels } from '@/lib/hooks/useModels';
import mockModels from '@/mocks/fixtures/models.json';

export default function ModelsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useModels({ page: 1, limit: 100, owner: 'all' });
  const backendModels = data?.data || [];
  const fixtureModels = mockModels as unknown as Model[];
  const usingFallback = !!error;
  const models = usingFallback ? fixtureModels : backendModels;

  const filtered = useMemo(
    () => models.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())),
    [models, search]
  );

  const columns = [
    { key: 'name', header: 'Nama Model', render: (m: Model) => <span style={{ fontWeight: 600 }}>{m.name}</span>, width: '26%' },
    { key: 'provider', header: 'Provider', render: (m: Model) => m.provider },
    { key: 'status', header: 'Status', render: (m: Model) => <StatusBadge status={m.status} /> },
    { key: 'score', header: 'Skor', render: (m: Model) => (m.latestScore !== undefined ? m.latestScore : '-') },
    { key: 'date', header: 'Update Terakhir', render: (m: Model) => formatDate(m.updatedAt) },
    {
      key: 'action',
      header: 'Aksi',
      render: (m: Model) => {
        const isPublishedToModelHub = m.status === 'published_to_modelhub' || m.status === 'published';
        const canOpenTestingDetail =
          !!m.latestRunId &&
          (m.status === 'assessment_completed' ||
            m.status === 'pending_review' ||
            m.status === 'review_ready' ||
            m.status === 'approved' ||
            m.status === 'approved_with_controls' ||
            m.status === 'promotion_ready' ||
            m.status === 'restricted' ||
            isPublishedToModelHub);

        if (isPublishedToModelHub) {
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/ranking?view=promoted&model=${m.id}`)}
            >
              Lihat di ModelHub
            </Button>
          );
        }

        if (!canOpenTestingDetail || !m.latestRunId) {
          return <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>-</span>;
        }

        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/models/${m.id}/runs/${m.latestRunId}`)}
          >
            Detail Testing
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Model Saya"
        actions={
          <Link href="/models/new" style={{ textDecoration: 'none' }}>
            <Button leftIcon={<Plus size={16} />}>Tambah Model</Button>
          </Link>
        }
      />

      {usingFallback && (
        <div
          style={{
            marginBottom: '0.75rem',
            padding: '0.6rem 0.75rem',
            borderRadius: '8px',
            border: '1px solid color-mix(in srgb, var(--color-score-poor) 35%, white)',
            background: 'color-mix(in srgb, var(--color-score-poor) 10%, white)',
            fontSize: '0.78rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          Backend tidak terhubung. Menampilkan data fixture lokal sementara.
        </div>
      )}

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <input
          type="text"
          placeholder="Cari model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', width: 300 }}
        />
      </div>

      {isLoading && models.length === 0 ? (
        <TableSkeleton rows={5} cols={6} />
      ) : filtered.length === 0 ? (
        <EmptyStateBlock
          title="Belum ada model yang terdaftar"
          description="Tambah model pertama Anda untuk memulai evaluasi"
          action={<Link href="/models/new" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>+ Tambah Model</Link>}
        />
      ) : (
        <DataTable columns={columns} data={filtered} onRowClick={(m) => router.push(`/models/${m.id}`)} />
      )}
    </>
  );
}
