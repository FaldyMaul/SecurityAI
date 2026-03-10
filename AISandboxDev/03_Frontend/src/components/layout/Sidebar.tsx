'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Box,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { NavItem } from './NavItem';
import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin'] },
  { href: '/models', icon: Box, label: 'Model Saya', roles: ['model_owner', 'admin'] },
  { href: '/reviews', icon: ClipboardList, label: 'Antrean Review', roles: ['admin'] },
  { href: '/settings', icon: Settings, label: 'Pengaturan', roles: ['model_owner', 'admin', 'builder'] },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/dashboard">
          <span className={styles.logoIcon}>🛡️</span>
          {!collapsed && <span className={styles.logoText}>AI Sandbox</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname.startsWith(item.href)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.logoutBtn} title="Keluar">
          <LogOut size={20} />
          {!collapsed && <span>Keluar</span>}
        </button>
        <button className={styles.toggleBtn} onClick={onToggle} title="Toggle sidebar">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
}
