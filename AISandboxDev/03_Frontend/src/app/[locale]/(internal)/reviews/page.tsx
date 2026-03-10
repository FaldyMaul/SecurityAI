'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { DataTable } from '@/components/shared/DataTable';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import { ClipboardList } from 'lucide-react';
import type { Review } from '@/types/api';

import mockReviews from '@/mocks/fixtures/reviews.json';

export default function ReviewQueuePage() {
  const router = useRouter();
  const reviews = mockReviews as unknown as Review[];

  const columns = [
    { key: 'model', header: 'Model', render: (r: Review) => <span style={{ fontWeight: 600 }}>{r.modelName}</span>, width: '25%' },
    { key: 'provider', header: 'Provider', render: (r: Review) => r.modelProvider },
    { key: 'score', header: 'Skor', render: (r: Review) => r.overallScore },
    { key: 'critical', header: 'Critical', render: (r: Review) => (
      <span style={{ color: r.criticalCount > 0 ? 'var(--color-severity-critical)' : 'var(--color-text-muted)', fontWeight: r.criticalCount > 0 ? 700 : 400 }}>
        {r.criticalCount}
      </span>
    )},
    { key: 'status', header: 'Status', render: (r: Review) => <StatusBadge status={r.status === 'pending' ? 'pending_review' : 'approved'} size="sm" /> },
  ];

  return (
    <>
      <PageHeader title="Antrean Review" />

      {reviews.length === 0 ? (
        <EmptyStateBlock icon={<ClipboardList size={48} strokeWidth={1.5} />} title="Tidak ada review yang menunggu" />
      ) : (
        <DataTable columns={columns} data={reviews} onRowClick={(r) => router.push(`/reviews/${r.id}`)} />
      )}
    </>
  );
}
