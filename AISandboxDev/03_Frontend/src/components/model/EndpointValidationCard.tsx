'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Loader, Globe, AlertTriangle } from 'lucide-react';
import styles from './EndpointValidationCard.module.css';

type ValidationState = 'untested' | 'loading' | 'success' | 'failure';

interface EndpointValidationCardProps {
  endpointUrl?: string;
  authMethod?: string;
  initialState?: ValidationState;
  onValidate?: () => void;
}

const FAILURE_MESSAGES = [
  { code: 'TIMEOUT', message: 'Endpoint tidak merespons dalam 30 detik. Pastikan URL dan koneksi jaringan benar.' },
  { code: 'AUTH_FAILED', message: 'Autentikasi gagal. Periksa API key atau token Anda.' },
  { code: 'INVALID_RESPONSE', message: 'Endpoint merespons dengan format yang tidak valid. Pastikan endpoint mendukung chat completions API.' },
];

export function EndpointValidationCard({
  endpointUrl = 'https://api.example.com/v1/***',
  authMethod = 'Bearer Token',
  initialState = 'untested',
  onValidate,
}: EndpointValidationCardProps) {
  const [state, setState] = useState<ValidationState>(initialState);
  const [failureDetail, setFailureDetail] = useState<{ code: string; message: string } | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleValidate = () => {
    setState('loading');
    setFailureDetail(null);
    onValidate?.();

    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        setState('success');
      } else {
        const errorIdx = Math.floor(Math.random() * FAILURE_MESSAGES.length);
        setFailureDetail(FAILURE_MESSAGES[errorIdx]);
        setRetryCount((c) => c + 1);
        setState('failure');
      }
    }, 1600);
  };

  return (
    <div className={`${styles.card} ${styles[state]}`}>
      <div className={styles.header}>
        <Globe size={18} />
        <span className={styles.title}>Endpoint Validation</span>
      </div>
      <div className={styles.body}>
        <div className={styles.field}>
          <span className={styles.label}>URL</span>
          <code className={styles.value}>{endpointUrl}</code>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Auth</span>
          <span className={styles.value}>{authMethod}</span>
        </div>
        <div className={styles.status}>
          {state === 'untested' && <span className={styles.muted}>Belum diuji</span>}
          {state === 'loading' && (
            <>
              <Loader size={16} className={styles.spin} /> <span>Memvalidasi endpoint...</span>
            </>
          )}
          {state === 'success' && (
            <>
              <CheckCircle size={16} className={styles.successIcon} /> <span>Endpoint valid</span>
            </>
          )}
          {state === 'failure' && (
            <>
              <XCircle size={16} className={styles.errorIcon} /> <span>Validasi gagal</span>
            </>
          )}
        </div>

        {state === 'failure' && failureDetail && (
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontWeight: 600, marginBottom: '0.25rem' }}>
              <AlertTriangle size={14} /> Error: {failureDetail.code}
            </div>
            <div style={{ color: '#fca5a5', lineHeight: 1.4 }}>{failureDetail.message}</div>
            {retryCount > 1 && (
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.4rem' }}>
                Percobaan ke-{retryCount}. Pastikan endpoint aktif dan API key benar.
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <button className={styles.btn} onClick={handleValidate} disabled={state === 'loading'}>
          {state === 'failure' ? 'Coba Lagi' : 'Validasi'}
        </button>
      </div>
    </div>
  );
}