'use client';

import type { BenchmarkResult, Grade } from '@/types/run';
import { Button } from '@/components/shared/Button';

interface LLMReviewModalProps {
  open: boolean;
  onClose: () => void;
  result: BenchmarkResult;
}

function recommendationByGrade(grade: Grade): string {
  if (grade === 'A') return 'Pertahankan kontrol yang ada dan lakukan monitoring drift bulanan.';
  if (grade === 'B') return 'Perkuat guardrail prompt injection dan validasi output sensitif.';
  if (grade === 'C') return 'Lakukan mitigasi lintas modul dan rerun sebelum publikasi.';
  if (grade === 'D') return 'Tunda publish, lakukan hardening kontrol dan retest menyeluruh.';
  return 'Blokir rilis produksi sampai risiko kritikal ditutup.';
}

function recommendationByCategory(categoryId: string): string {
  if (categoryId === 'trust-safety') return 'Tambahkan filter SARA/toxicity dan evaluasi multi-turn untuk menekan unsafe generation.';
  if (categoryId === 'security') return 'Perkuat guardrail prompt injection dan validasi output sebelum ditampilkan ke pengguna.';
  if (categoryId === 'privacy') return 'Aktifkan masking PII, redaction policy, dan audit akses data sensitif secara berkala.';
  if (categoryId === 'compliance') return 'Lengkapi bukti kontrol kebijakan dan lakukan review kepatuhan terhadap UU PDP.';
  if (categoryId === 'readiness') return 'Tingkatkan observability, fallback, dan incident response readiness untuk produksi.';
  return 'Perkuat kontrol sesuai temuan kategori dan lakukan rerun setelah mitigasi diterapkan.';
}

export function LLMReviewModal({ open, onClose, result }: LLMReviewModalProps) {
  if (!open) return null;

  return (
    <>
      <button
        onClick={onClose}
        aria-label="Tutup review AI"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.42)',
          zIndex: 'var(--z-modal-backdrop)',
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Review AI"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(760px, calc(100vw - 2rem))',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '1rem',
          zIndex: 'var(--z-modal)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Review LLM - Justifikasi Detail</h3>
        <p style={{ marginTop: '0.35rem', color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>
          Ringkasan keseluruhan grade {result.overallGrade} ({result.overallScore}/100) dengan rekomendasi per kategori.
        </p>

        <div
          style={{
            marginTop: '0.8rem',
            padding: '0.75rem',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            background: 'var(--color-bg-secondary)',
          }}
        >
          <strong style={{ fontSize: '0.84rem', color: 'var(--color-text-primary)' }}>Rekomendasi Keseluruhan</strong>
          <p style={{ margin: '0.4rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>
            {recommendationByGrade(result.overallGrade)}
          </p>
        </div>

        <div style={{ marginTop: '0.8rem', display: 'grid', gap: '0.65rem' }}>
          {result.categoryResults.map((category) => (
            <div
              key={category.id}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '0.7rem',
                background: 'var(--color-surface)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.84rem' }}>{category.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                  {category.grade} ({category.score})
                </span>
              </div>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                {category.description}
              </p>
              <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Rekomendasi: {recommendationByCategory(category.id)}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </aside>
    </>
  );
}
