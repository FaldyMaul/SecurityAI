'use client';

import { Fragment, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { AssessmentModuleId, FindingCategory, SeverityLevel, SelectedRecipeResult } from '@/types/run';
import { Button } from '@/components/shared/Button';
import { PromptDetailModal } from '@/components/results/PromptDetailModal';
import { FindingsAccordion } from '@/components/findings/FindingsAccordion';
import styles from './RecipeResultsTable.module.css';

interface RecipeResultsTableProps {
  rows: SelectedRecipeResult[];
}

const FILTERS: Array<{ key: 'all' | AssessmentModuleId; label: string }> = [
  { key: 'all', label: 'Semua Recipe' },
  { key: 'adversarial', label: 'Adversarial Robustness' },
  { key: 'safety', label: 'Safety & Alignment' },
  { key: 'privacy', label: 'Privacy' },
  { key: 'hallucination', label: 'Hallucination & Truthfulness' },
];

export function RecipeResultsTable({ rows }: RecipeResultsTableProps) {
  const [filter, setFilter] = useState<'all' | AssessmentModuleId>('all');
  const [showFailOnly, setShowFailOnly] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [promptRecipe, setPromptRecipe] = useState<SelectedRecipeResult | null>(null);

  const categoryFilteredRows = useMemo(() => {
    if (filter === 'all') return rows;
    return rows.filter((row) => row.categoryId === filter);
  }, [filter, rows]);

  const failedCount = useMemo(
    () => categoryFilteredRows.filter((row) => row.status === 'failed' || row.status === 'warning').length,
    [categoryFilteredRows]
  );

  const filteredRows = useMemo(() => {
    if (!showFailOnly) return categoryFilteredRows;
    return categoryFilteredRows.filter((row) => row.status === 'failed' || row.status === 'warning');
  }, [categoryFilteredRows, showFailOnly]);

  const toCategoryFindings = (row: SelectedRecipeResult): FindingCategory[] => {
    const order: SeverityLevel[] = ['info', 'low', 'medium', 'high', 'critical'];
    const maxSeverity = row.findings.reduce<SeverityLevel>((current, finding) => {
      return order.indexOf(finding.severity) > order.indexOf(current) ? finding.severity : current;
    }, 'info');

    return [
      {
        category: row.categoryId,
        count: row.findings.length,
        maxSeverity,
        findings: row.findings.map((finding) => ({
          id: finding.id,
          title: finding.description,
          severity: finding.severity,
          category: row.categoryId,
          description: finding.description,
          hasEvidence: Boolean(finding.prompt || finding.response),
        })),
      },
    ];
  };

  return (
    <>
      <div className={styles.filterRow}>
        <div className={styles.filterTabs}>
          {FILTERS.map((item) => (
            <Button
              key={item.key}
              size="sm"
              variant={filter === item.key ? 'primary' : 'outline'}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <label className={styles.failOnly}>
          <input type="checkbox" checked={showFailOnly} onChange={(event) => setShowFailOnly(event.target.checked)} />
          <span>Fail Only ({failedCount})</span>
        </label>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Method</th>
              <th>Dataset</th>
              <th>Score</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => {
              const isExpanded = expanded === row.recipeId;
              const statusClass =
                row.status === 'passed'
                  ? styles.statusPassed
                  : row.status === 'failed'
                    ? styles.statusFailed
                    : styles.statusWarning;

              return (
                <Fragment key={`${row.categoryId}-${row.recipeId}`}>
                  <tr className={styles.rowHover}>
                    <td>
                      <div className={styles.recipeName}>{row.recipeName}</div>
                      <div className={styles.recipeMeta}>{row.categoryName}</div>
                    </td>
                    <td>{row.method}</td>
                    <td>
                      <span className={styles.datasetBadge}>{row.dataset}</span>
                    </td>
                    <td className={styles.scoreCell}>{row.score} ({row.grade})</td>
                    <td className={statusClass}>
                      {row.status === 'passed' ? 'Passed' : row.status === 'failed' ? 'Failed' : 'Warning'}
                    </td>
                    <td>
                      <div className={styles.actionCell}>
                        <Button size="sm" variant="outline" onClick={() => setPromptRecipe(row)}>
                          Lihat Detail
                        </Button>
                        <button
                          className={styles.expandBtn}
                          type="button"
                          onClick={() => setExpanded((prev) => (prev === row.recipeId ? null : row.recipeId))}
                          aria-label="Expand row"
                        >
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={6} className={styles.expandedBody}>
                        <section className={styles.briefSection}>
                          <h5 className={styles.briefTitle}>Ringkasan Temuan ({row.findings.length})</h5>
                          {row.findings.length === 0 ? (
                            <div className={styles.briefList}>Tidak ada temuan pada recipe ini.</div>
                          ) : (
                            <FindingsAccordion categories={toCategoryFindings(row)} />
                          )}
                        </section>

                        <section className={styles.briefSection}>
                          <h5 className={styles.briefTitle}>Rekomendasi Singkat</h5>
                          <ul className={styles.briefList}>
                            {row.recommendations.slice(0, 2).map((recommendation, idx) => (
                              <li key={`${row.recipeId}-rec-${idx}`}>{recommendation}</li>
                            ))}
                            {row.recommendations.length > 2 && <li>Gunakan Lihat Detail untuk konteks prompt/response lengkap.</li>}
                          </ul>
                        </section>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyStateCell}>
                  <p className={styles.emptyStateText}>Tidak ada recipe sesuai filter ini.</p>
                  {showFailOnly && (
                    <Button size="sm" variant="outline" onClick={() => setShowFailOnly(false)}>
                      Lihat Semua Recipe
                    </Button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PromptDetailModal open={Boolean(promptRecipe)} recipe={promptRecipe} onClose={() => setPromptRecipe(null)} />
    </>
  );
}
