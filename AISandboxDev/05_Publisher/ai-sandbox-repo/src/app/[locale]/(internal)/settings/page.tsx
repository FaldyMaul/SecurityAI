'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AvatarUpload } from '@/components/settings/AvatarUpload';
import { ToggleRow } from '@/components/settings/ToggleRow';
import { DangerZone } from '@/components/settings/DangerZone';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = ['profile', 'preferences', 'notifications', 'system'];

  return (
    <>
      <PageHeader title="Pengaturan" />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--color-border)', marginBottom: 'var(--space-6)', overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ padding: 'var(--space-3) var(--space-5)', border: 'none', background: 'none', fontWeight: activeTab === tab ? 600 : 400, fontSize: 'var(--text-sm)', color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)', borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent', cursor: 'pointer', textTransform: 'capitalize', marginBottom: -2, whiteSpace: 'nowrap' }}
          >
            {tab === 'profile' ? 'Profil' : tab === 'preferences' ? 'Preferensi' : tab === 'notifications' ? 'Notifikasi' : 'Sistem'}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div style={{ maxWidth: 'var(--form-max-width)' }}>
          <AvatarUpload />
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Nama Tampilan</label>
              <input defaultValue="Budi Santoso" style={{ display: 'block', width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-1)' }} />
            </div>
            <div>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Email</label>
              <input defaultValue="budi.santoso@telkom.co.id" disabled style={{ display: 'block', width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-1)', background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }} />
            </div>
          </div>
          <button style={{ marginTop: 'var(--space-6)', padding: 'var(--space-2) var(--space-5)', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer' }}>Simpan</button>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div style={{ maxWidth: 'var(--form-max-width)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, display: 'block', marginBottom: 'var(--space-2)' }}>Bahasa</label>
            <LanguageSwitcher locale="id" />
          </div>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, display: 'block', marginBottom: 'var(--space-2)' }}>Tema</label>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {['Light', 'Dark', 'System'].map((t) => (
                <button key={t} style={{ padding: 'var(--space-2) var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: t === 'Light' ? 'var(--color-primary-light)' : 'none', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>
          <button style={{ marginTop: 'var(--space-4)', padding: 'var(--space-2) var(--space-5)', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer' }}>Simpan</button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div style={{ maxWidth: 'var(--form-max-width)' }}>
          <ToggleRow label="Review Ditugaskan" description="Notifikasi saat review baru ditugaskan kepada Anda" checked={true} onChange={() => {}} />
          <ToggleRow label="Benchmark Selesai" description="Notifikasi saat benchmark selesai dijalankan" checked={true} onChange={() => {}} />
          <ToggleRow label="Benchmark Gagal" description="Notifikasi saat benchmark gagal" checked={true} onChange={() => {}} />
          <ToggleRow label="Model Dipublikasikan" description="Notifikasi saat model Anda dipublikasikan ke peringkat" checked={true} onChange={() => {}} />
          <button style={{ marginTop: 'var(--space-6)', padding: 'var(--space-2) var(--space-5)', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer' }}>Simpan</button>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>Admin-only system settings.</p>
          <DangerZone>
            <ToggleRow label="Maintenance Mode" description="Semua pengguna akan melihat halaman maintenance" checked={false} onChange={() => {}} />
          </DangerZone>
        </div>
      )}
    </>
  );
}
