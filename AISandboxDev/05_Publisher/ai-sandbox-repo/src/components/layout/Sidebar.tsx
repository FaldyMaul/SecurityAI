'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Box,
  ClipboardList,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { NavItem } from './NavItem';
import styles from './Sidebar.module.css';
import {
  getBenchmarkEtaMinutes,
  getBenchmarkProgress,
  readActiveBenchmark,
  type ActiveBenchmark,
} from '@/lib/benchmarkActivity';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin'] },
  { href: '/models', icon: Box, label: 'Model Saya', roles: ['model_owner', 'admin'] },
  { href: '/ranking', icon: Trophy, label: 'Peringkat (ModelHub)', roles: ['model_owner', 'admin'] },
  // Keep review route in codebase, hidden in MVP by default.
  ...(process.env.NEXT_PUBLIC_ENABLE_REVIEW_QUEUE === 'true'
    ? [{ href: '/reviews', icon: ClipboardList, label: 'Riwayat', roles: ['admin'] }]
    : []),
  { href: '/settings', icon: Settings, label: 'Pengaturan', roles: ['model_owner', 'admin', 'builder'] },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [activeBenchmark, setActiveBenchmark] = useState<ActiveBenchmark | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      const benchmark = readActiveBenchmark();
      setActiveBenchmark(benchmark);
      setProgress(benchmark ? getBenchmarkProgress(benchmark) : 0);
    };

    tick();
    const interval = setInterval(tick, 3000);
    window.addEventListener('storage', tick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', tick);
    };
  }, []);

  const etaMinutes = useMemo(() => (activeBenchmark ? getBenchmarkEtaMinutes(activeBenchmark) : 0), [activeBenchmark]);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <Link href="/dashboard">
          <ShieldCheck size={20} className={styles.logoIcon} />
          {!collapsed && <span className={styles.logoText}>AI Sandbox</span>}
        </Link>
      </div>

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

      {activeBenchmark && (
        <div className={styles.globalProgress}>
          <div className={styles.progressHeader}>
            <Loader2 size={14} className={styles.progressSpinner} />
            {!collapsed && <span>Benchmark Berjalan</span>}
          </div>
          {!collapsed && (
            <>
              <div className={styles.progressMeta}>
                {activeBenchmark.modelName} | {progress}%
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <div className={styles.progressMeta}>Estimasi sisa {etaMinutes} menit</div>
            </>
          )}
        </div>
      )}

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
