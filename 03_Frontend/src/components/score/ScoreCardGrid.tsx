import { AlertTriangle, Eye, EyeOff, Shield } from 'lucide-react';
import { ScoreBlock } from './ScoreBlock';
import type { ScoreBreakdown } from '@/types/api';
import styles from './ScoreCardGrid.module.css';
import { normalizeScoreBreakdown } from '@/lib/modules';

interface ScoreCardGridProps {
  scores: ScoreBreakdown;
}

const SCORE_CONFIG = [
  { key: 'adversarial' as const, label: 'Adversarial Robustness', icon: Shield },
  { key: 'safety' as const, label: 'Safety & Alignment', icon: AlertTriangle },
  { key: 'privacy' as const, label: 'Privasi', icon: Eye },
  { key: 'hallucination' as const, label: 'Hallucination & Truthfulness', icon: EyeOff },
];

function getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'E' {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

export function ScoreCardGrid({ scores }: ScoreCardGridProps) {
  const normalizedScores = normalizeScoreBreakdown(scores);
  const total =
    normalizedScores.adversarial +
    normalizedScores.safety +
    normalizedScores.privacy +
    normalizedScores.hallucination;
  const avg = Math.round(total / 4);
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
          <ScoreBlock key={cfg.key} icon={cfg.icon} label={cfg.label} value={normalizedScores[cfg.key]} />
        ))}
      </div>
    </div>
  );
}
