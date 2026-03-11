'use client';

import { Button } from '@/components/shared/Button';

interface PackageDetailModalProps {
  open: boolean;
  onClose: () => void;
  packageName: string;
  estimatedMinutes: number;
  standardRefs: string[];
  testItems: string[];
  methodology: string;
}

export function PackageDetailModal({
  open,
  onClose,
  packageName,
  estimatedMinutes,
  standardRefs,
  testItems,
  methodology,
}: PackageDetailModalProps) {
  if (!open) return null;

  return (
    <>
      <button
        aria-label="Tutup detail paket"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.35)',
          zIndex: 'var(--z-modal-backdrop)',
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Detail ${packageName}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(660px, calc(100vw - 2rem))',
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
        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{packageName}</h3>
        <p style={{ marginTop: '0.35rem', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
          Referensi standar: {standardRefs.join(', ')}
        </p>
        <div style={{ marginTop: '0.85rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.88rem' }}>Yang akan diuji</h4>
          <ul style={{ margin: '0.5rem 0 0 1rem', color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
            {testItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: '0.85rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.88rem' }}>Metodologi</h4>
          <p style={{ margin: '0.45rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>{methodology}</p>
        </div>
        <div style={{ marginTop: '0.85rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.88rem' }}>Estimasi Waktu</h4>
          <p style={{ margin: '0.45rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>{estimatedMinutes} menit</p>
        </div>
        <div style={{ marginTop: '0.85rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.88rem' }}>Output yang Dihasilkan</h4>
          <ul style={{ margin: '0.45rem 0 0 1rem', color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.45 }}>
            <li>Skor per kategori dan nilai keseluruhan</li>
            <li>Temuan berdasarkan severity</li>
            <li>Bukti prompt dan response untuk setiap temuan</li>
            <li>Ringkasan mitigasi dan rekomendasi tindak lanjut</li>
          </ul>
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
