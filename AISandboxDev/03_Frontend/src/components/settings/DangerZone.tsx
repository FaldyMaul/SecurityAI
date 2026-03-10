/** DangerZone — red-bordered section for admin destructive actions */
export function DangerZone({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid var(--color-severity-critical)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
      <h4 style={{ color: 'var(--color-severity-critical)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>⚠️ Danger Zone</h4>
      {children}
    </div>
  );
}
