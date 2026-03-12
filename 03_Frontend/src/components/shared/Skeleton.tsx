import { Skeleton as LegionSkeleton } from '@legion-ui-kit/react-core';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect' | 'rounded';
  width?: string;
  height?: string;
  count?: number;
}

/**
 * Skeleton - Wrapper around Legion UI Skeleton component
 * Provides AI Sandbox specific variants and pre-built layouts
 */
export function Skeleton({ variant = 'text', width, height, count = 1 }: SkeletonProps) {
  // Map AI Sandbox variants to Legion UI variants
  const legionVariant: 'text' | 'circle' | 'rect' | 'rounded' = variant;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <LegionSkeleton
          key={i}
          variant={legionVariant}
          width={width}
          height={height}
        />
      ))}
    </>
  );
}

/** Pre-built skeleton for table rows using Legion UI */
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className={styles.tableSkeletonWrap}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className={styles.tableRow}>
          {Array.from({ length: cols }).map((_, c) => (
            <LegionSkeleton key={c} variant="text" height="16px" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Pre-built skeleton for cards using Legion UI */
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <LegionSkeleton key={i} variant="rounded" width="100%" height="200px" />
      ))}
    </div>
  );
}
