'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) setCollapsed(JSON.parse(saved));
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <div className={styles.shell}>
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <main
        className={styles.main}
        style={{
          marginLeft: collapsed
            ? 'var(--sidebar-width-collapsed)'
            : 'var(--sidebar-width-expanded)',
        }}
      >
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
