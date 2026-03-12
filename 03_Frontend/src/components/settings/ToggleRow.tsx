/** ToggleRow — label + description + switch toggle */
export function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border)' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{label}</div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{ width: 44, height: 24, borderRadius: 'var(--radius-full)', border: 'none', background: checked ? 'var(--color-primary)' : 'var(--color-bg-tertiary)', cursor: 'pointer', position: 'relative', transition: 'background var(--transition-fast)' }}
      >
        <span style={{ position: 'absolute', top: 2, left: checked ? 22 : 2, width: 20, height: 20, borderRadius: 'var(--radius-full)', background: 'white', boxShadow: 'var(--shadow-sm)', transition: 'left var(--transition-fast)' }} />
      </button>
    </div>
  );
}
