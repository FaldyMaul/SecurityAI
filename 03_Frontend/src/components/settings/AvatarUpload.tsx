/** Placeholder: AvatarUpload — click to upload JPG/PNG, max 2MB, preview */
export function AvatarUpload() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', background: 'var(--color-bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-2xl)' }}>👤</div>
      <button style={{ padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'none', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>Ganti Avatar</button>
    </div>
  );
}
