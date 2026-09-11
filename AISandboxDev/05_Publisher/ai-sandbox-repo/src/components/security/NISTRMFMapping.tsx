interface NISTRMFMappingItem {
  module: string;
  nistFunction: 'Govern' | 'Map' | 'Measure' | 'Manage';
  controlRef: string;
  status: 'implemented' | 'partial' | 'planned';
}

interface NISTRMFMappingProps {
  items: NISTRMFMappingItem[];
}

const STATUS_COLOR: Record<NISTRMFMappingItem['status'], string> = {
  implemented: 'var(--color-score-good)',
  partial: 'var(--color-score-moderate)',
  planned: 'var(--color-score-poor)',
};

export function NISTRMFMapping({ items }: NISTRMFMappingProps) {
  return (
    <section style={{ border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-surface)' }}>
      <header style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>NIST RMF Mapping</h3>
      </header>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-secondary)', textAlign: 'left' }}>
              <th style={{ padding: '0.6rem 0.8rem' }}>Module</th>
              <th style={{ padding: '0.6rem 0.8rem' }}>RMF Function</th>
              <th style={{ padding: '0.6rem 0.8rem' }}>Control Ref</th>
              <th style={{ padding: '0.6rem 0.8rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={`${item.module}-${item.controlRef}`} style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.6rem 0.8rem', color: 'var(--color-text-primary)' }}>{item.module}</td>
                <td style={{ padding: '0.6rem 0.8rem', color: 'var(--color-text-secondary)' }}>{item.nistFunction}</td>
                <td style={{ padding: '0.6rem 0.8rem', color: 'var(--color-text-secondary)' }}>{item.controlRef}</td>
                <td style={{ padding: '0.6rem 0.8rem' }}>
                  <span style={{ color: STATUS_COLOR[item.status], fontWeight: 700, textTransform: 'capitalize' }}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export type { NISTRMFMappingItem };
