'use client';

import Link from 'next/link';
import { RankBadge } from '@/components/ranking/RankBadge';
import { ArrowRight, ShieldCheck, Upload, Globe } from 'lucide-react';
import styles from './home.module.css';

import mockRanking from '@/mocks/fixtures/ranking.json';

export default function HomePage() {
  const topModels = mockRanking.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Temukan Model AI Terpercaya</h1>
        <p className={styles.heroSubtitle}>Platform evaluasi keamanan dan kepercayaan model AI untuk Indonesia</p>
        <Link href="/ranking" className={styles.heroCta}>
          Buka ModelHub <ArrowRight size={18} />
        </Link>
      </section>

      {/* Top Models */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Model Teratas</h2>
        <div className={styles.modelGrid}>
          {topModels.map((m) => (
            <Link key={m.id} href={`/models/${m.modelId}/public`} className={styles.modelCard}>
              <RankBadge rank={m.rank} />
              <h3 className={styles.modelName}>{m.modelName}</h3>
              <p className={styles.modelProvider}>{m.provider}</p>
              <div className={styles.modelScore}>Skor: {m.overallScore}</div>
              <span className={styles.approvalLabel}>{m.approvalLabel}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Bagaimana Cara Kerjanya</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <Upload size={32} className={styles.stepIcon} />
            <h3>1. Kirim Model</h3>
            <p>Daftarkan endpoint model AI Anda untuk dievaluasi</p>
          </div>
          <div className={styles.stepCard}>
            <ShieldCheck size={32} className={styles.stepIcon} />
            <h3>2. Jalankan Penilaian</h3>
            <p>Benchmark otomatis menguji keamanan, privasi, dan kepercayaan</p>
          </div>
          <div className={styles.stepCard}>
            <Globe size={32} className={styles.stepIcon} />
            <h3>3. Promosi ke ModelHub</h3>
            <p>Model yang lolos gate ditampilkan di permukaan discovery ModelHub</p>
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className={styles.trustSection}>
        <p>Penilaian dilakukan oleh AI Sandbox menggunakan benchmark yang disesuaikan untuk konteks Indonesia, termasuk kepatuhan terhadap UU PDP dan evaluasi konten SARA.</p>
      </section>
    </>
  );
}
