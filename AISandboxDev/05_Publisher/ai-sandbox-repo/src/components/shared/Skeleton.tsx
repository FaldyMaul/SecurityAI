import React from 'react';
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
  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100px'),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: variant === 'circle' ? '50%' : variant === 'rounded' ? '8px' : '4px',
    display: 'inline-block',
    animation: 'pulse-bg 1.5s infinite ease-in-out',
  };

  return (
    <>
      <style>{`
        @keyframes pulse-bg {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={style} className={styles.skeleton} />
      ))}
    </>
  );
}

/** Pre-built skeleton for table rows */
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className={styles.tableSkeletonWrap}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className={styles.tableRow}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} variant="text" height="16px" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Pre-built skeleton for cards */
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="rounded" width="100%" height="200px" />
      ))}
    </div>
  );
}
