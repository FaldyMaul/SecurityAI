import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import styles from './NavItem.module.css';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  badge?: number;
}

export function NavItem({ href, icon: Icon, label, active, collapsed, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`${styles.item} ${active ? styles.active : ''}`}
      title={collapsed ? label : undefined}
    >
      <Icon size={20} className={styles.icon} />
      {!collapsed && (
        <>
          <span className={styles.label}>{label}</span>
          {badge !== undefined && badge > 0 && (
            <span className={styles.badge}>{badge}</span>
          )}
        </>
      )}
    </Link>
  );
}
