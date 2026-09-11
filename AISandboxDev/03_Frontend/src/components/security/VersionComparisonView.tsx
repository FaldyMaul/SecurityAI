import type { ModuleScoreBreakdown } from '@/types/run';

interface VersionScore extends ModuleScoreBreakdown {
  adversarial: number;
  safety: number;
  privacy: number;
  hallucination: number;
}

interface VersionComparisonViewProps {
  baselineVersion: string;
  candidateVersion: string;
  baseline: VersionScore;
  candidate: VersionScore;
}

function delta(current: number, previous: number): number {
  return current - previous;
}

export function VersionComparisonView({ baselineVersion, candidateVersion, baseline, candidate }: VersionComparisonViewProps) {
  const rows: Array<{ label: keyof VersionScore; current: number; prev: number }> = [
    { label: 'adversarial', current: candidate.adversarial, prev: baseline.adversarial },
    { label: 'safety', current: candidate.safety, prev: baseline.safety },
    { label: 'privacy', current: candidate.privacy, prev: baseline.privacy },
    { label: 'hallucination', current: candidate.hallucination, prev: baseline.hallucination },
  ];

  const labelMap: Record<keyof VersionScore, string> = {
    adversarial: 'Adversarial Robustness',
    safety: 'Safety & Alignment',
    privacy: 'Privacy',
    hallucination: 'Hallucination & Truthfulness',
  };

  return (
    <section style={{ border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-surface)' }}>
      <header style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem' }}>Version Comparison</h3>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
          {baselineVersion} vs {candidateVersion}
        </p>
      </header>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr style={{ background: 'var(--color-bg-secondary)', textAlign: 'left' }}>
            <th style={{ padding: '0.6rem 0.8rem' }}>Category</th>
            <th style={{ padding: '0.6rem 0.8rem' }}>{baselineVersion}</th>
            <th style={{ padding: '0.6rem 0.8rem' }}>{candidateVersion}</th>
            <th style={{ padding: '0.6rem 0.8rem' }}>Delta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const diff = delta(row.current, row.prev);
            const color = diff >= 0 ? 'var(--color-score-good)' : 'var(--color-score-critical)';
            return (
              <tr key={row.label} style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.6rem 0.8rem' }}>{labelMap[row.label]}</td>
                <td style={{ padding: '0.6rem 0.8rem' }}>{row.prev}</td>
                <td style={{ padding: '0.6rem 0.8rem' }}>{row.current}</td>
                <td style={{ padding: '0.6rem 0.8rem', color, fontWeight: 700 }}>{diff >= 0 ? `+${diff}` : diff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export type { VersionScore };
