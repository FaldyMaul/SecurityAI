import { Shield, Lock, Eye, Zap, Scale } from 'lucide-react';
import { ScoreBlock } from './ScoreBlock';
import type { ScoreBreakdown } from '@/types/api';
import styles from './ScoreCardGrid.module.css';

interface ScoreCardGridProps {
  scores: ScoreBreakdown;
}

const SCORE_CONFIG = [
  { key: 'trust' as const, label: 'Kepercayaan', icon: Shield },
  { key: 'security' as const, label: 'Keamanan', icon: Lock },
  { key: 'privacy' as const, label: 'Privasi', icon: Eye },
  { key: 'readiness' as const, label: 'Kesiapan', icon: Zap },
  { key: 'compliance' as const, label: 'Kepatuhan', icon: Scale },
];

export function ScoreCardGrid({ scores }: ScoreCardGridProps) {
  return (
    <div className={styles.grid}>
      {SCORE_CONFIG.map((cfg) => (
        <ScoreBlock key={cfg.key} icon={cfg.icon} label={cfg.label} value={scores[cfg.key]} />
      ))}
    </div>
  );
}
