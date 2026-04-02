/** Placeholder: System health strip - horizontal metric bar */
export function SystemHealthStrip() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
      <span>API: Healthy</span>
      <span>LiteLLM: Healthy</span>
      <span>Benchmark Engine: Healthy</span>
      <span>Job Queue: 0</span>
    </div>
  );
}
