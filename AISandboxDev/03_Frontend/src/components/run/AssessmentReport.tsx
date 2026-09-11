'use client';

import { useMemo } from 'react';
import {
  AlertTriangle,
  Download,
  Eye,
  EyeOff,
  FileJson,
  Shield,
} from 'lucide-react';
import type { BenchmarkResult, CategoryResult, Grade } from '@/types/run';
import styles from './AssessmentReport.module.css';

const gradeColorMap: Record<Grade, string> = {
  A: 'var(--color-score-excellent)',
  B: 'var(--color-score-good)',
  C: 'var(--color-score-moderate)',
  D: 'var(--color-score-poor)',
  E: 'var(--color-score-critical)',
};

const gradeCssMap: Record<Grade, string> = {
  A: styles.gradeA,
  B: styles.gradeB,
  C: styles.gradeC,
  D: styles.gradeD,
  E: styles.gradeE,
};

const categoryIconMap: Record<string, typeof Shield> = {
  adversarial: Shield,
  safety: AlertTriangle,
  privacy: Eye,
  hallucination: EyeOff,
};

function getGradeLabel(grade: Grade): string {
  const labels: Record<Grade, string> = {
    A: 'Risiko Rendah',
    B: 'Risiko Rendah-Menengah',
    C: 'Risiko Menengah',
    D: 'Risiko Menengah-Tinggi',
    E: 'Risiko Tinggi',
  };
  return labels[grade];
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function getLlmSummary(grade: Grade): { overview: string; actions: string[] } {
  if (grade === 'A' || grade === 'B') {
    return {
      overview:
        'Model menunjukkan kontrol keamanan yang baik di sebagian besar skenario. Risiko tersisa bersifat terisolasi pada beberapa pola prompt tertentu.',
      actions: [
        'Tambahkan guardrail untuk prompt adversarial multi-turn.',
        'Perkuat template system prompt untuk data sensitif.',
        'Monitoring mingguan untuk drift perilaku model.',
      ],
    };
  }

  if (grade === 'C') {
    return {
      overview:
        'Model berada pada risiko moderat. Beberapa recipe masih menghasilkan respons yang tidak konsisten saat berhadapan dengan instruksi berbahaya.',
      actions: [
        'Aktifkan filter input berbasis pola injection sebelum request dikirim.',
        'Tambahkan layer post-processing untuk redaksi data pribadi.',
        'Lakukan rerun benchmark setelah perbaikan konfigurasi.',
      ],
    };
  }

  return {
    overview:
      'Model berisiko tinggi untuk dipublikasikan. Terdapat kegagalan signifikan pada recipe kritikal dan dibutuhkan mitigasi menyeluruh sebelum rilis.',
    actions: [
      'Nonaktifkan publikasi model sampai skor meningkat ke minimal grade C.',
      'Implementasikan guardrail ketat untuk jailbreak dan prompt injection.',
      'Lakukan security hardening dan evaluasi ulang end-to-end.',
    ],
  };
}

export function AssessmentReport({ result }: { result: BenchmarkResult }) {
  const llmSummary = useMemo(() => getLlmSummary(result.overallGrade), [result.overallGrade]);

  return (
    <div className={styles.reportContainer}>
      <div className={styles.overallHero}>
        <div className={`${styles.gradeCircle} ${gradeCssMap[result.overallGrade]}`}>{result.overallGrade}</div>
        <div className={styles.heroInfo}>
          <h2>Penilaian Keseluruhan: {getGradeLabel(result.overallGrade)}</h2>
          <p className={styles.heroSubtitle}>
            Skor: <strong>{result.overallScore}/100</strong> - {result.metadata.packageName}
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}>
              Durasi: <strong>{formatDuration(result.metadata.duration)}</strong>
            </span>
            <span className={styles.metaItem}>
              Cakupan Prompt: <strong>{result.metadata.promptSelectionPercentage}%</strong>
            </span>
            <span className={styles.metaItem}>
              Selesai: <strong>{new Date(result.metadata.endTime).toLocaleDateString('id-ID')}</strong>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button className={styles.btnSecondary} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Download size={14} /> Unduh PDF
            </button>
            <button className={styles.btnSecondary} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileJson size={14} /> Ekspor JSON
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          background: 'var(--color-bg-secondary)',
        }}
      >
        <h3 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>Ringkasan Risiko LLM</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.6rem' }}>{llmSummary.overview}</p>
        <ul style={{ paddingLeft: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
          {llmSummary.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>

      <div className={styles.gradingLegend}>
        {(Object.keys(result.gradingScale) as Grade[]).map((grade) => (
          <div key={grade} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: gradeColorMap[grade] }} />
            <strong>{grade}</strong> ({result.gradingScale[grade][0]}-{result.gradingScale[grade][1]}) - {getGradeLabel(grade)}
          </div>
        ))}
      </div>

      <div className={styles.categoriesGrid}>
        {result.categoryResults.map((category: CategoryResult) => {
          const Icon = categoryIconMap[category.id] || Shield;
          return (
            <div
              key={category.id}
              className={styles.categoryCard}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryName}>
                  <Icon size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  {category.name}
                </span>
                <span className={`${styles.categoryGrade} ${gradeCssMap[category.grade]}`}>{category.grade}</span>
              </div>
              <div className={styles.categoryScore}>{category.score}</div>
              <div className={styles.categoryDesc}>{category.description}</div>
              <div className={styles.scoreBar}>
                <div className={styles.scoreBarFill} style={{ width: `${category.score}%`, background: gradeColorMap[category.grade] }} />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
