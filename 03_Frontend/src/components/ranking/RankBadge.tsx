import styles from './RankBadge.module.css';

interface RankBadgeProps {
  rank: number;
  size?: 'sm' | 'md' | 'lg';
}

export function RankBadge({ rank, size = 'md' }: RankBadgeProps) {
  const colorClass = rank === 1 ? styles.gold : rank === 2 ? styles.silver : rank === 3 ? styles.bronze : styles.neutral;

  return (
    <span className={`${styles.badge} ${styles[size]} ${colorClass}`}>
      #{rank}
    </span>
  );
}
