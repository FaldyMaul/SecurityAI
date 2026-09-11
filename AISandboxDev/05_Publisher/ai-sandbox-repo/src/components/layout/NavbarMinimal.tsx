'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck, X } from 'lucide-react';
import styles from './NavbarMinimal.module.css';

export function NavbarMinimal() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <ShieldCheck size={18} className={styles.logoIcon} />
          <span className={styles.logoText}>AI Sandbox</span>
        </Link>

        <button className={styles.mobileMenuBtn} onClick={() => setMenuOpen((v) => !v)} aria-label="Buka menu">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <Link href="/" className={styles.link} onClick={() => setMenuOpen(false)}>
            Beranda
          </Link>
          <Link href="/login" className={styles.link} onClick={() => setMenuOpen(false)}>
            Masuk
          </Link>
        </nav>
      </div>
    </header>
  );
}
