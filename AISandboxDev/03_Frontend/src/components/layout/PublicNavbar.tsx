'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck, X } from 'lucide-react';
import styles from './PublicNavbar.module.css';

export function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <ShieldCheck size={20} className={styles.logoIcon} />
          <span className={styles.logoText}>ModelHub</span>
        </Link>

        <button className={styles.mobileMenuBtn} onClick={() => setMenuOpen((v) => !v)} aria-label="Buka menu navigasi">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <Link href="/" className={styles.link} onClick={() => setMenuOpen(false)}>
            Beranda
          </Link>
          <Link href="/ranking" className={styles.link} onClick={() => setMenuOpen(false)}>
            Peringkat
          </Link>
          <Link href="/#for-publishers" className={styles.publisherBtn} onClick={() => setMenuOpen(false)}>
            Untuk Publishers
          </Link>
          <Link href="/login" className={styles.loginBtn} onClick={() => setMenuOpen(false)}>
            Masuk
          </Link>
        </nav>
      </div>
    </header>
  );
}
