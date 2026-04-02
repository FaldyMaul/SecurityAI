import Link from 'next/link';
import { Card } from '@legion-ui-kit/react-core';
import styles from './SummaryTile.module.css';
import type { LucideIcon } from 'lucide-react';

interface SummaryTileProps {
  icon: LucideIcon;
  label: string;
  value: number;
  href: string;
  highlight?: boolean;
}

/**
 * SummaryTile - Dashboard summary tile using Legion UI Card
 * Displays metrics with icons and supports highlight state for urgent items
 */
export function SummaryTile({ icon: Icon, label, value, href, highlight }: SummaryTileProps) {
  return (
    <Link href={href} className={`${styles.tile} ${highlight && value > 0 ? styles.highlight : ''}`}>
      <Card
        elevation={highlight ? 'elevation-2' : 'elevation-1'}
        className={styles.card}
      >
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <Icon size={24} className={styles.icon} />
          </div>
          <span className={styles.value}>{value}</span>
          <span className={styles.label}>{label}</span>
        </div>
      </Card>
    </Link>
  );
}
