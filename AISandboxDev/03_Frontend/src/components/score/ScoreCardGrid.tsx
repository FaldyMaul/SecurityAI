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

function getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'E' {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

export function ScoreCardGrid({ scores }: ScoreCardGridProps) {
  const total = scores.trust + scores.security + scores.privacy + scores.readiness + scores.compliance;
  const avg = Math.round(total / 5);
  const grade = getGrade(avg);

  return (
    <div className={styles.container}>
      <div className={styles.classRating}>
        <span className={styles.classLabel}>Class Rating</span>
        <span className={styles.classValue}>{grade}</span>
        <span className={styles.classScore}>({avg}/100)</span>
      </div>
      <div className={styles.grid}>
        {SCORE_CONFIG.map((cfg) => (
          <ScoreBlock key={cfg.key} icon={cfg.icon} label={cfg.label} value={scores[cfg.key]} />
        ))}
      </div>
    </div>
  );
}
