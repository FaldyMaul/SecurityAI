'use client';

import Link from 'next/link';
import { RankBadge } from './RankBadge';
import type { RankingEntry } from '@/types/api';
import styles from '@/app/[locale]/(public)/ranking/ranking.module.css';

interface ModelComparisonGridProps {
  models: RankingEntry[];
  selectedIds: string[];
  ownModelIds: string[];
  onToggle: (id: string) => void;
}

export function ModelComparisonGrid({ models, selectedIds, ownModelIds, onToggle }: ModelComparisonGridProps) {
  return (
    <div className={styles.grid}>
      {models.map((model) => {
        const isOwned = ownModelIds.includes(model.modelId);

        return (
          <div key={model.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <RankBadge rank={model.rank} />
              <input
                type="checkbox"
                checked={selectedIds.includes(model.modelId)}
                onChange={() => onToggle(model.modelId)}
                title="Pilih untuk perbandingan"
              />
            </div>
            <Link href={`/models/${model.modelId}/public`} className={styles.cardBody}>
              <h3 className={styles.modelName}>{model.modelName}</h3>
              <p className={styles.provider}>{model.provider}</p>
              <div className={styles.score}>{model.overallScore}</div>
              <span className={styles.approval}>{model.approvalLabel}</span>
              <div className={styles.tags}>
                {model.suitabilityTags.slice(0, 3).map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              {!isOwned && (
                <p style={{ marginTop: '0.6rem', fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                  Detail private model lain disembunyikan. Hanya skor ringkas yang ditampilkan.
                </p>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
