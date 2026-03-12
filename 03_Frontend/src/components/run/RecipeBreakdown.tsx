'use client';

import { Fragment, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronRight, XCircle } from 'lucide-react';
import type { Grade, PromptResult, RecipeResult } from '@/types/run';
import styles from './AssessmentReport.module.css';
import { Button } from '@/components/shared/Button';

const gradeColorMap: Record<Grade, string> = {
  A: 'var(--color-score-excellent)',
  B: 'var(--color-score-good)',
  C: 'var(--color-score-moderate)',
  D: 'var(--color-score-poor)',
  E: 'var(--color-score-critical)',
};

function VerdictBadge({ verdict }: { verdict: string }) {
  const cls = verdict === 'pass' ? styles.verdictPass : verdict === 'fail' ? styles.verdictFail : styles.verdictWarning;
  const Icon = verdict === 'pass' ? CheckCircle : verdict === 'fail' ? XCircle : AlertTriangle;
  return (
    <span className={`${styles.verdictBadge} ${cls}`}>
      <Icon size={12} /> {verdict.toUpperCase()}
    </span>
  );
}

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
        <span className={styles.evaluationText}> - {result.evaluation}</span>
      </div>
    </div>
  );
}

interface RecipeBreakdownProps {
  recipes: RecipeResult[];
  showFailOnly: boolean;
}

export function RecipeBreakdown({ recipes, showFailOnly }: RecipeBreakdownProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const allExpanded = recipes.length > 0 && expandedIds.length === recipes.length;

  const visibleRecipes = useMemo(
    () =>
      showFailOnly
        ? recipes.filter((recipe) => recipe.sampleResults.some((sample) => sample.verdict === 'fail'))
        : recipes,
    [recipes, showFailOnly]
  );

  const toggleExpand = (recipeId: string) => {
    setExpandedIds((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]));
  };

  const handleExpandAll = () => {
    if (allExpanded) {
      setExpandedIds([]);
      return;
    }
    setExpandedIds(recipes.map((recipe) => recipe.id));
  };

  if (visibleRecipes.length === 0) {
    return (
      <div style={{ padding: '1rem', border: '1px dashed var(--color-border)', borderRadius: '8px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
        Tidak ada recipe gagal untuk kategori ini.
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.65rem' }}>
        <Button size="sm" variant="outline" onClick={handleExpandAll}>
          {allExpanded ? 'Tutup Semua' : 'Buka Semua'}
        </Button>
      </div>
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
          {visibleRecipes.map((recipe) => {
            const expanded = expandedIds.includes(recipe.id);
            const color = gradeColorMap[recipe.grade];
            const filteredSamples = showFailOnly
              ? recipe.sampleResults.filter((sample) => sample.verdict === 'fail')
              : recipe.sampleResults;

            return (
              <Fragment key={recipe.id}>
                <tr className={`${styles.recipeRow} ${expanded ? styles.expanded : ''}`} onClick={() => toggleExpand(recipe.id)}>
                  <td>
                    {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {recipe.name}
                  </td>
                  <td>
                    <span className={styles.recipeBadge} style={{ background: color }}>
                      {recipe.grade}
                    </span>
                  </td>
                  <td>
                    <div className={styles.rateBar}>
                      <div className={styles.rateBarTrack}>
                        <div className={styles.rateBarFill} style={{ width: `${recipe.metrics.acceptableRate}%`, background: color }} />
                      </div>
                      <span className={styles.rateValue} style={{ color }}>
                        {recipe.metrics.acceptableRate}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.rateBar}>
                      <div className={styles.rateBarTrack}>
                        <div className={styles.rateBarFill} style={{ width: `${recipe.metrics.refusedRate}%`, background: 'var(--color-text-muted)' }} />
                      </div>
                      <span className={styles.rateValue}>{recipe.metrics.refusedRate}%</span>
                    </div>
                  </td>
                  <td>{recipe.totalPrompts}</td>
                  <td>
                    <span style={{ color: 'var(--color-score-excellent)' }}>{recipe.metrics.safe}</span> /{' '}
                    <span style={{ color: 'var(--color-score-critical)' }}>{recipe.metrics.unsafe}</span>
                  </td>
                </tr>
                {expanded && filteredSamples.length > 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '0.5rem 1rem' }}>
                      <div className={styles.evidencePanel}>
                        <div className={styles.evidenceGrid}>
                          {filteredSamples.map((result, idx) => (
                            <EvidenceItem key={`${recipe.id}-${idx}`} result={result} />
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
