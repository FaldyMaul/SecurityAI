import { PageHeader } from '@/components/shared/PageHeader';
import { ModelForm } from '@/components/model/ModelForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Tambah Model' };

export default function AddModelPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <PageHeader title="Tambah Model" subtitle="Model Saya > Tambah Model" />

      {/* Tab selector: Manual / Import from Apilogy */}
      <div style={{ display: 'flex', gap: 0, marginBottom: '2rem', borderBottom: '1px solid var(--color-border, #2a2a4a)' }}>
        <button style={{ padding: '0.75rem 1.5rem', border: 'none', background: 'none', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary, #6366f1)', borderBottom: '2px solid var(--color-primary, #6366f1)', cursor: 'pointer', marginBottom: -1 }}>Manual</button>
        <button style={{ padding: '0.75rem 1.5rem', border: 'none', background: 'none', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-muted, #94a3b8)', cursor: 'pointer', marginBottom: -1 }}>Import dari Apilogy</button>
      </div>

      <div style={{ background: 'var(--color-surface, #1a1a2e)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border, #2a2a4a)' }}>
        <ModelForm />
      </div>
    </div>
  );
}
