'use client';

import { Button } from '@/components/shared/Button';
import type { AuditTrailEntry } from '@/types/api';

function toCsv(entries: AuditTrailEntry[]) {
  const header = ['id', 'actor', 'actorName', 'action', 'oldValue', 'newValue', 'reason', 'timestamp'];
  const rows = entries.map((entry) => [
    entry.id,
    entry.actor,
    entry.actorName,
    entry.action,
    entry.oldValue || '',
    entry.newValue || '',
    entry.reason || '',
    entry.timestamp,
  ]);

  const escaped = [header, ...rows].map((row) =>
    row
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(',')
  );

  return escaped.join('\n');
}

export function AuditTrailTimeline({ entries }: { entries: AuditTrailEntry[] }) {
  const handleExport = () => {
    const csv = toCsv(entries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-trail-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (entries.length === 0) {
    return <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Belum ada riwayat audit.</p>;
  }

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{entries.length} event terekam</p>
        <Button size="sm" variant="outline" onClick={handleExport}>
          Export CSV
        </Button>
      </div>
      <div style={{ paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--color-border)' }}>
        {entries.map((entry) => (
          <div key={entry.id} style={{ padding: 'var(--space-3) 0', fontSize: 'var(--text-sm)' }}>
            <div style={{ fontWeight: 600 }}>{entry.actorName}</div>
            <div style={{ color: 'var(--color-text-secondary)' }}>
              {entry.action.replace(/_/g, ' ')} {entry.newValue ? `- ${entry.newValue}` : ''}
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
              {new Date(entry.timestamp).toLocaleString('id-ID')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
