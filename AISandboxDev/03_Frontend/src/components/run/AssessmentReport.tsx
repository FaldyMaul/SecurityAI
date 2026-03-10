'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, Globe, Scale, ChevronDown, ChevronRight, CheckCircle, XCircle, AlertTriangle, Download, FileJson } from 'lucide-react';
import type { BenchmarkResult, CategoryResult, RecipeResult, PromptResult, Grade } from '@/types/run';
import styles from './AssessmentReport.module.css';

/* ── Grade color helpers ── */
const gradeColorMap: Record<Grade, string> = {
  A: '#10b981', B: '#3b82f6', C: '#f59e0b', D: '#f97316', E: '#ef4444',
};

const gradeCssMap: Record<Grade, string> = {
  A: styles.gradeA, B: styles.gradeB, C: styles.gradeC, D: styles.gradeD, E: styles.gradeE,
};

const categoryIconMap: Record<string, typeof Shield> = {
  'trust-safety': Shield,
  security: Lock,
  privacy: Eye,
  readiness: Globe,
  compliance: Scale,
};

function getGradeLabel(grade: Grade): string {
  const labels: Record<Grade, string> = {
    A: 'Low Risk', B: 'Moderate-Low', C: 'Moderate', D: 'Moderate-High', E: 'High Risk',
  };
  return labels[grade];
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

/* ── Verdict Badge ── */
function VerdictBadge({ verdict }: { verdict: string }) {
  const cls = verdict === 'pass' ? styles.verdictPass : verdict === 'fail' ? styles.verdictFail : styles.verdictWarning;
  const Icon = verdict === 'pass' ? CheckCircle : verdict === 'fail' ? XCircle : AlertTriangle;
  return (
    <span className={`${styles.verdictBadge} ${cls}`}>
      <Icon size={12} /> {verdict.toUpperCase()}
    </span>
  );
}

/* ── Recipe Row with expandable evidence ── */
function RecipeRow({ recipe }: { recipe: RecipeResult }) {
  const [expanded, setExpanded] = useState(false);
  const color = gradeColorMap[recipe.grade];

  return (
    <>
      <tr className={`${styles.recipeRow} ${expanded ? styles.expanded : ''}`} onClick={() => setExpanded(!expanded)}>
        <td>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {' '}{recipe.name}
        </td>
        <td>
          <span className={styles.recipeBadge} style={{ background: color }}>{recipe.grade}</span>
        </td>
        <td>
          <div className={styles.rateBar}>
            <div className={styles.rateBarTrack}>
              <div className={styles.rateBarFill} style={{ width: `${recipe.metrics.acceptableRate}%`, background: color }} />
            </div>
            <span className={styles.rateValue} style={{ color }}>{recipe.metrics.acceptableRate}%</span>
          </div>
        </td>
        <td>
          <div className={styles.rateBar}>
            <div className={styles.rateBarTrack}>
              <div className={styles.rateBarFill} style={{ width: `${recipe.metrics.refusedRate}%`, background: '#94a3b8' }} />
            </div>
            <span className={styles.rateValue}>{recipe.metrics.refusedRate}%</span>
          </div>
        </td>
        <td>{recipe.totalPrompts}</td>
        <td>
          <span style={{ color: '#10b981' }}>{recipe.metrics.safe}</span>
          {' / '}
          <span style={{ color: '#ef4444' }}>{recipe.metrics.unsafe}</span>
        </td>
      </tr>
      {expanded && recipe.sampleResults.length > 0 && (
        <tr>
          <td colSpan={6} style={{ padding: '0.5rem 1rem' }}>
            <div className={styles.evidencePanel}>
              <div className={styles.evidenceGrid}>
                {recipe.sampleResults.map((p: PromptResult, i: number) => (
                  <EvidenceItem key={i} result={p} />
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ── Single Evidence Item ── */
function EvidenceItem({ result }: { result: PromptResult }) {
  return (
    <div className={styles.evidenceItem}>
      <div>
        <div className={styles.evidenceLabel}>Prompt</div>
        <div className={styles.evidenceText}>{result.prompt}</div>
      </div>
      <div>
        <div className={styles.evidenceLabel}>Response</div>
        <div className={styles.evidenceText}>{result.response}</div>
      </div>
      <div className={styles.fullWidthCell}>
        <VerdictBadge verdict={result.verdict} />
        <span className={styles.evaluationText}> — {result.evaluation}</span>
      </div>
    </div>
  );
}

/* ── Main Assessment Report ── */
export function AssessmentReport({ result }: { result: BenchmarkResult }) {
  const [activeCategory, setActiveCategory] = useState<string>(result.categoryResults[0]?.id || '');

  const selectedCategory = result.categoryResults.find((c: CategoryResult) => c.id === activeCategory);

  return (
    <div className={styles.reportContainer}>
      {/* Overall Grade Hero */}
      <div className={styles.overallHero}>
        <div className={`${styles.gradeCircle} ${gradeCssMap[result.overallGrade]}`}>
          {result.overallGrade}
        </div>
        <div className={styles.heroInfo}>
          <h2>Overall Assessment: {getGradeLabel(result.overallGrade)}</h2>
          <p className={styles.heroSubtitle}>
            Score: <strong>{result.overallScore}/100</strong> — {result.metadata.packageName}
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}>
              Duration: <strong>{formatDuration(result.metadata.duration)}</strong>
            </span>
            <span className={styles.metaItem}>
              Prompt Selection: <strong>{result.metadata.promptSelectionPercentage}%</strong>
            </span>
            <span className={styles.metaItem}>
              Completed: <strong>{new Date(result.metadata.endTime).toLocaleDateString('id-ID')}</strong>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button className={styles.btnSecondary} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Download size={14} /> Download PDF
            </button>
            <button className={styles.btnSecondary} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileJson size={14} /> Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* Grading Scale Legend */}
      <div className={styles.gradingLegend}>
        {(Object.keys(result.gradingScale) as Grade[]).map((g) => (
          <div key={g} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: gradeColorMap[g] }} />
            <strong>{g}</strong> ({result.gradingScale[g][0]}–{result.gradingScale[g][1]}) — {getGradeLabel(g)}
          </div>
        ))}
      </div>

      {/* Category Score Cards */}
      <div className={styles.categoriesGrid}>
        {result.categoryResults.map((cat: CategoryResult) => {
          const Icon = categoryIconMap[cat.id] || Shield;
          return (
            <div
              key={cat.id}
              className={`${styles.categoryCard} ${cat.id === activeCategory ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryName}>
                  <Icon size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  {cat.name}
                </span>
                <span className={`${styles.categoryGrade} ${gradeCssMap[cat.grade]}`}>{cat.grade}</span>
              </div>
              <div className={styles.categoryScore}>{cat.score}</div>
              <div className={styles.categoryDesc}>{cat.description}</div>
              <div className={styles.scoreBar}>
                <div
                  className={styles.scoreBarFill}
                  style={{ width: `${cat.score}%`, background: gradeColorMap[cat.grade] }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Detail Table */}
      {selectedCategory && (
        <div className={styles.recipeSection}>
          <h3 className={styles.recipeSectionTitle}>
            {selectedCategory.name} — Recipe Breakdown
          </h3>

          {/* Metrics Summary */}
          <div className={styles.metricsRow}>
            <div className={styles.metricBox}>
              <div className={styles.metricValue}>{selectedCategory.score}</div>
              <div className={styles.metricLabel}>Category Score</div>
            </div>
            <div className={styles.metricBox}>
              <div className={styles.metricValue}>{selectedCategory.grade}</div>
              <div className={styles.metricLabel}>Grade</div>
            </div>
            <div className={styles.metricBox}>
              <div className={styles.metricValue}>{selectedCategory.recipes.length}</div>
              <div className={styles.metricLabel}>Recipes</div>
            </div>
            <div className={styles.metricBox}>
              <div className={styles.metricValue}>
                {selectedCategory.recipes.reduce((sum: number, r: RecipeResult) => sum + r.totalPrompts, 0)}
              </div>
              <div className={styles.metricLabel}>Total Prompts</div>
            </div>
          </div>

          {/* Recipe Table */}
          <table className={styles.recipeTable}>
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Grade</th>
                <th>Acceptable Rate</th>
                <th>Refusal Rate</th>
                <th>Prompts</th>
                <th>Safe / Unsafe</th>
              </tr>
            </thead>
            <tbody>
              {selectedCategory.recipes.map((recipe: RecipeResult) => (
                <RecipeRow key={recipe.id} recipe={recipe} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
