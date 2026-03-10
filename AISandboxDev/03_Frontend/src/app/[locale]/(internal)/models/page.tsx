'use client';

import { useState } from 'react';
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
import type { Metadata } from 'next';

/* Mock data */
import mockModels from '@/mocks/fixtures/models.json';

export default function ModelsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const isLoading = false;
  const models = mockModels as unknown as Model[];

  const filtered = models.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'name', header: 'Nama Model', render: (m: Model) => <span style={{ fontWeight: 600 }}>{m.name}</span>, width: '30%' },
    { key: 'provider', header: 'Provider', render: (m: Model) => m.provider },
    { key: 'status', header: 'Status', render: (m: Model) => <StatusBadge status={m.status} /> },
    { key: 'score', header: 'Skor', render: (m: Model) => m.latestScore !== undefined ? m.latestScore : '—' },
    { key: 'date', header: 'Update Terakhir', render: (m: Model) => formatDate(m.updatedAt) },
  ];

  return (
    <>
      <PageHeader
        title="Model Saya"
        actions={
          <Link href="/models/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>
            <Plus size={16} /> Tambah Model
          </Link>
        }
      />

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <input
          type="text"
          placeholder="Cari model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', width: 300 }}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : filtered.length === 0 ? (
        <EmptyStateBlock
          title="Belum ada model yang terdaftar"
          description="Tambah model pertama Anda untuk memulai evaluasi"
          action={<Link href="/models/new" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>+ Tambah Model</Link>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          onRowClick={(m) => router.push(`/models/${m.id}`)}
        />
      )}
    </>
  );
}
