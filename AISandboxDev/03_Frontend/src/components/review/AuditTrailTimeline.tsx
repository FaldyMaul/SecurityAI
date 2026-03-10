/** Placeholder: Audit trail timeline — vertical timeline with actor + timestamp */
import type { AuditTrailEntry } from '@/types/api';

export function AuditTrailTimeline({ entries }: { entries: AuditTrailEntry[] }) {
  if (entries.length === 0) return <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Belum ada riwayat audit.</p>;

  return (
    <div style={{ paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--color-border)' }}>
      {entries.map((entry) => (
        <div key={entry.id} style={{ padding: 'var(--space-3) 0', fontSize: 'var(--text-sm)' }}>
          <div style={{ fontWeight: 600 }}>{entry.actorName}</div>
          <div style={{ color: 'var(--color-text-secondary)' }}>
            {entry.action.replace(/_/g, ' ')} — {entry.newValue || ''}
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
            {new Date(entry.timestamp).toLocaleString('id-ID')}
          </div>
        </div>
      ))}
    </div>
  );
}
