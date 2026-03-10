/** Placeholder: Findings accordion — will wrap Legion Accordion with per-category headers */
import type { FindingCategory } from '@/types/api';
import { SeverityIndicator } from '@/components/score/SeverityIndicator';

export function FindingsAccordion({ categories }: { categories: FindingCategory[] }) {
  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
      {categories.map((cat) => (
        <details key={cat.category} style={{ borderBottom: '1px solid var(--color-border)' }}>
          <summary style={{ padding: 'var(--space-3) var(--space-4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontWeight: 600 }}>{cat.category}</span>
            <SeverityIndicator severity={cat.maxSeverity} />
            <span style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{cat.count} findings</span>
          </summary>
          <div style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
            {cat.findings.map((f) => (
              <div key={f.id} style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-bg-tertiary)' }}>
                <SeverityIndicator severity={f.severity} /> {f.title}
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
