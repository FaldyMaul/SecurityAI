/** Placeholder: Evidence panel — lazy-loaded slide-out panel for individual findings */
export function EvidencePanel({ findingId }: { findingId?: string }) {
  return (
    <aside style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
      <h4>Evidence Panel</h4>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        {findingId ? `Evidence for finding: ${findingId}` : 'Select a finding to view evidence.'}
      </p>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
        🔧 Placeholder — will show prompt/response in monospace, verdict, severity, raw artifact link. Lazy-loaded.
      </p>
    </aside>
  );
}
