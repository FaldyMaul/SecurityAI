'use client';

import { useMemo, useState } from 'react';
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
import { OWASPBadge } from '@/components/security/OWASPBadge';
import { NISTRMFMapping, type NISTRMFMappingItem } from '@/components/security/NISTRMFMapping';
import { ExploitChainDiagram, type ExploitNode } from '@/components/security/ExploitChainDiagram';
import { VersionComparisonView } from '@/components/security/VersionComparisonView';
import { PIIMaskedText } from '@/components/security/PIIMaskedText';
import type { Review } from '@/types/api';
import type { FindingCategory } from '@/types/run';
import { normalizeScoreBreakdown } from '@/lib/modules';

import mockReviews from '@/mocks/fixtures/reviews.json';
import mockRuns from '@/mocks/fixtures/runs.json';

export default function ReviewDetailPage() {
  const params = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const review = (mockReviews as unknown as Review[]).find((r) => r.id === params.id);
  const run = review ? mockRuns.find((r) => r.id === review.runId) : null;

  const nistMappings: NISTRMFMappingItem[] = [
    { module: 'Trust & Safety', nistFunction: 'Measure', controlRef: 'AI RMF 2.0 ME-2', status: 'implemented' },
    { module: 'Security', nistFunction: 'Manage', controlRef: 'AI RMF 2.0 MA-1', status: 'implemented' },
    { module: 'Privacy', nistFunction: 'Map', controlRef: 'AI RMF 2.0 MP-3', status: 'partial' },
    { module: 'Compliance', nistFunction: 'Govern', controlRef: 'AI RMF 2.0 GV-4', status: 'planned' },
  ];

  const exploitNodes: ExploitNode[] = [
    { id: 'n1', label: 'Prompt Injection Payload', severity: 'high' },
    { id: 'n2', label: 'System Prompt Leakage', severity: 'critical' },
    { id: 'n3', label: 'Unsafe Tool Invocation', severity: 'high' },
  ];

  const sampleMaskedText = 'Kontak user: budi.santoso@contoh.id, telp +62 812-3456-7890, NIK 3175091209876543';

  const baselineScores = useMemo(() => {
    const previous = mockRuns.find((item) => item.modelId === review?.modelId && item.id !== review?.runId && item.scores);
    return normalizeScoreBreakdown(previous?.scores || { trust: 70, security: 66, privacy: 72, compliance: 74, readiness: 68 });
  }, [review?.modelId, review?.runId]);

  const candidateScores = run?.scores ? normalizeScoreBreakdown(run.scores) : null;

  if (!review) return <EmptyStateBlock title="Review tidak ditemukan" />;

  return (
    <>
      <PageHeader title={`Review: ${review.modelName}`} subtitle={`Provider: ${review.modelProvider} | Skor: ${review.overallScore}`} />

      {run?.scores && <ScoreCardGrid scores={run.scores} />}

      {run?.findings && run.findings.length > 0 && (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Temuan</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <OWASPBadge category="llm01_prompt_injection" />
            <OWASPBadge category="llm06_sensitive_information_disclosure" />
          </div>
          <FindingsAccordion categories={run.findings as unknown as FindingCategory[]} />
        </div>
      )}

      <div style={{ marginTop: 'var(--space-6)' }}>
        <h3 style={{ marginBottom: 'var(--space-3)' }}>Evidence (PII Masking)</h3>
        <div style={{ marginBottom: '0.8rem' }}>
          <PIIMaskedText text={sampleMaskedText} />
        </div>
        <EvidencePanel />
      </div>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <ExploitChainDiagram nodes={exploitNodes} />
      </div>

      {run?.scores && (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <VersionComparisonView
            baselineVersion="v1.9"
            candidateVersion="v2.0"
            baseline={{
              adversarial: baselineScores.adversarial,
              safety: baselineScores.safety,
              privacy: baselineScores.privacy,
              hallucination: baselineScores.hallucination,
            }}
            candidate={{
              adversarial: candidateScores?.adversarial ?? 0,
              safety: candidateScores?.safety ?? 0,
              privacy: candidateScores?.privacy ?? 0,
              hallucination: candidateScores?.hallucination ?? 0,
            }}
          />
        </div>
      )}

      <div style={{ marginTop: 'var(--space-6)' }}>
        <NISTRMFMapping items={nistMappings} />
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
