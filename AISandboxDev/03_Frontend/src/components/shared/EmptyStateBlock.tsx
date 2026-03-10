import { Inbox } from 'lucide-react';
import styles from './EmptyStateBlock.module.css';

interface EmptyStateBlockProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyStateBlock({ icon, title, description, action }: EmptyStateBlockProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrap}>
        {icon || <Inbox size={48} strokeWidth={1.5} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
