'use client';

import { useRouter } from 'next/navigation';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function AccessDeniedPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg, #0f172a)',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        padding: '3rem 2rem',
        borderRadius: '24px',
        background: 'var(--color-surface, #1e293b)',
        border: '1px solid var(--color-border, #334155)',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          color: '#ef4444',
        }}>
          <ShieldAlert size={48} />
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--color-text, #f1f5f9)',
          marginBottom: '1rem',
          letterSpacing: '-0.025em',
        }}>
          Akses Ditolak
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted, #94a3b8)',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
        }}>
          Maaf, Anda tidak memiliki izin yang cukup untuk mengakses halaman ini.
          Silakan hubungi administrator sistem untuk mendapatkan akses.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '0.875rem 1.5rem',
              background: 'var(--color-primary, #6366f1)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Home size={20} /> Kembali ke Beranda
          </button>

          <button
            onClick={() => router.back()}
            style={{
              padding: '0.875rem 1.5rem',
              background: 'transparent',
              color: 'var(--color-text, #f1f5f9)',
              border: '1px solid var(--color-border, #334155)',
              borderRadius: '12px',
              fontWeight: 500,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <ArrowLeft size={20} /> Kembali ke Halaman Sebelumnya
          </button>
        </div>

        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border, #334155)',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted, #64748b)',
        }}>
          Security Code: 403_FORBIDDEN_ACCESS
        </div>
      </div>
    </div>
  );
}
