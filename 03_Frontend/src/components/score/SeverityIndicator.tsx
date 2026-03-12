import type { SeverityLevel } from '@/types/api';
import styles from './SeverityIndicator.module.css';

const SEVERITY_COLORS: Record<SeverityLevel, string> = {
  critical: 'var(--color-severity-critical)',
  high: 'var(--color-severity-high)',
  medium: 'var(--color-severity-medium)',
  low: 'var(--color-severity-low)',
  info: 'var(--color-severity-info)',
};

interface SeverityIndicatorProps {
  severity: SeverityLevel;
  showLabel?: boolean;
}

export function SeverityIndicator({ severity, showLabel = true }: SeverityIndicatorProps) {
  return (
    <span className={styles.indicator}>
      <span className={styles.dot} style={{ backgroundColor: SEVERITY_COLORS[severity] }} />
      {showLabel && <span className={styles.label}>{severity}</span>}
    </span>
  );
}
