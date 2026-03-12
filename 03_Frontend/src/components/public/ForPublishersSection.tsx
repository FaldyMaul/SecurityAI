'use client';

import Link from 'next/link';
import { CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import styles from './ForPublishersSection.module.css';

export function ForPublishersSection() {
  return (
    <section id="for-publishers" className={styles.section}>
      <h2 className={styles.title}>Untuk Publishers</h2>
      <p className={styles.subtitle}>Punya model AI? Lakukan assessment di AI Sandbox sebelum dipromosikan ke ModelHub.</p>

      <div className={styles.contentGrid}>
        <div>
          <h3 className={styles.infoTitle}>Workspace Internal untuk Publisher Model</h3>
          <p className={styles.infoDesc}>
            AI Sandbox dipakai oleh Model Owner, Model Vendor, dan Admin untuk validasi endpoint, pengujian keamanan, review, dan promosi ke ModelHub.
          </p>

          <ul className={styles.benefits}>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={16} className={styles.benefitIcon} />
              <span className={styles.benefitText}>Benchmark otomatis dengan standar keamanan dan kepatuhan.</span>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={16} className={styles.benefitIcon} />
              <span className={styles.benefitText}>Riwayat run dan perbandingan versi model.</span>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={16} className={styles.benefitIcon} />
              <span className={styles.benefitText}>Guard promosi ke ModelHub untuk mencegah model berisiko tinggi.</span>
            </li>
          </ul>

          <div className={styles.actions}>
            <Link href="/login?redirect=/models" style={{ textDecoration: 'none' }}>
              <Button leftIcon={<Lock size={14} />}>Login ke AI Sandbox</Button>
            </Link>
            <Link href="/ranking" style={{ textDecoration: 'none' }}>
              <Button variant="outline">Lihat ModelHub</Button>
            </Link>
          </div>

          <p className={styles.note}>Membutuhkan akun dengan role Model Owner / Admin.</p>
        </div>

        <aside className={styles.preview} aria-label="Preview AI Sandbox">
          <div className={styles.previewHeader}>
            <span className={styles.previewTitle}>AI Sandbox Workspace</span>
            <div className={styles.dots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.mockRow}>
              <span className={styles.mockLabel}>Status Model</span>
              <span className={styles.mockValue}>Selesai</span>
            </div>
            <div className={styles.mockRow}>
              <span className={styles.mockLabel}>Skor Terakhir</span>
              <span className={styles.mockValue}>A (85)</span>
            </div>
            <div className={styles.mockRow}>
              <span className={styles.mockLabel}>Aksi</span>
              <span className={styles.mockValue}>Promosikan ke ModelHub</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
