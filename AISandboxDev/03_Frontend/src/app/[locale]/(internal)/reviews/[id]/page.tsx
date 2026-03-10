'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/shared/Button';
import { ScoreCardGrid } from '@/components/score/ScoreCardGrid';
import { FindingsAccordion } from '@/components/findings/FindingsAccordion';
import { EvidencePanel } from '@/components/findings/EvidencePanel';
import { DecisionDrawer } from '@/components/review/DecisionDrawer';
import { PublicationToggle } from '@/components/review/PublicationToggle';
import { AuditTrailTimeline } from '@/components/review/AuditTrailTimeline';
import { EmptyStateBlock } from '@/components/shared/EmptyStateBlock';
import type { Review } from '@/types/api';

import mockReviews from '@/mocks/fixtures/reviews.json';
import mockRuns from '@/mocks/fixtures/runs.json';

export default function ReviewDetailPage() {
  const params = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const review = (mockReviews as unknown as Review[]).find((r) => r.id === params.id);
  const run = review ? mockRuns.find((r) => r.id === review.runId) : null;

  if (!review) return <EmptyStateBlock title="Review tidak ditemukan" />;

  return (
    <>
      <PageHeader title={`Review: ${review.modelName}`} subtitle={`Provider: ${review.modelProvider} | Skor: ${review.overallScore}`} />

      {run?.scores && <ScoreCardGrid scores={run.scores} />}

      {run?.findings && run.findings.length > 0 && (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Temuan</h3>
          <FindingsAccordion categories={run.findings} />
        </div>
      )}

      <div style={{ marginTop: 'var(--space-6)' }}>
        <EvidencePanel />
      </div>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <h3 style={{ marginBottom: 'var(--space-3)' }}>Catatan Reviewer</h3>
        <textarea
          defaultValue={review.reviewerNotes || ''}
          placeholder="Tambahkan catatan..."
          style={{
            width: '100%',
            minHeight: 120,
            padding: 'var(--space-3)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            resize: 'vertical',
          }}
        />
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <PublicationToggle isPublished={review.isPublished} onChange={() => {}} />
      </div>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <h3 style={{ marginBottom: 'var(--space-3)' }}>Riwayat Audit</h3>
        <AuditTrailTimeline entries={review.auditTrail} />
      </div>

      <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={() => setDrawerOpen(true)}>Tetapkan Keputusan</Button>
      </div>

      <DecisionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}