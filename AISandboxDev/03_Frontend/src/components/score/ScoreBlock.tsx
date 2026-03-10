import { getScoreColor } from '@/lib/statusConfig';
import styles from './ScoreBlock.module.css';
import type { LucideIcon } from 'lucide-react';

interface ScoreBlockProps {
  icon: LucideIcon;
  label: string;
  value: number;
}

export function ScoreBlock({ icon: Icon, label, value }: ScoreBlockProps) {
  const color = getScoreColor(value);

  return (
    <div className={styles.block}>
      <div className={styles.ring} style={{ borderColor: color }}>
        <span className={styles.value} style={{ color }}>{value}</span>
      </div>
      <div className={styles.info}>
        <Icon size={16} className={styles.icon} />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
