'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';

import type { RecipeFindingSummary, SelectedRecipeResult } from '@/types/run';
import { Button } from '@/components/shared/Button';

import styles from './PromptDetailModal.module.css';

interface PromptDetailModalProps {
  open: boolean;
  recipe: SelectedRecipeResult | null;
  onClose: () => void;
}

function verdictLabel(verdict?: RecipeFindingSummary['verdict']) {
  if (verdict === 'pass') return 'PASSED';
  if (verdict === 'fail') return 'FAILED';
  return 'WARNING';
}

function verdictClass(verdict?: RecipeFindingSummary['verdict']) {
  if (verdict === 'pass') return styles.verdictPassed;
  if (verdict === 'fail') return styles.verdictFailed;
  return styles.verdictWarning;
}

function toClipboardText(value?: string) {
  return value && value.trim().length > 0 ? value : '-';
}

export function PromptDetailModal({ open, recipe, onClose }: PromptDetailModalProps) {
  const [copied, setCopied] = useState<'prompt' | 'response' | null>(null);

  const findingItems = useMemo(() => recipe?.findings ?? [], [recipe]);

  const copyText = async (value: string, field: 'prompt' | 'response') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  if (!open || !recipe) return null;

  return (
    <>
      <button className={styles.backdrop} onClick={onClose} aria-label="Tutup detail prompt" />
      <aside className={styles.modal} role="dialog" aria-modal="true" aria-label={`Detail prompt ${recipe.recipeName}`}>
        <div className={styles.header}>
          <h4 className={styles.title}>Detail Prompt & Response</h4>
          <button type="button" onClick={onClose} className={styles.closeIconButton} aria-label="Tutup">
            <X size={16} />
          </button>
        </div>

        <div className={styles.metaGrid}>
          <div>
            <span className={styles.metaLabel}>Recipe</span>
            <p className={styles.metaValue}>{recipe.recipeName}</p>
          </div>
          <div>
            <span className={styles.metaLabel}>Dataset</span>
            <p className={styles.metaValue}>{recipe.dataset}</p>
          </div>
          <div>
            <span className={styles.metaLabel}>Method</span>
            <p className={styles.metaValue}>{recipe.method}</p>
          </div>
        </div>

        {findingItems.length === 0 ? (
          <div className={styles.block}>
            <p className={styles.blockTitle}>Tidak ada detail prompt/response untuk recipe ini.</p>
          </div>
        ) : (
          <div className={styles.listWrap}>
            {findingItems.map((finding) => {
              const promptValue = toClipboardText(finding.prompt);
              const responseValue = toClipboardText(finding.response);

              return (
                <section key={finding.id} className={styles.block}>
                  <div className={styles.blockTop}>
                    <p className={styles.blockTitle}>Test ID: {finding.testId || finding.id}</p>
                    <span className={`${styles.verdictBadge} ${verdictClass(finding.verdict)}`}>
                      {verdictLabel(finding.verdict)}
                    </span>
                  </div>

                  <div className={styles.sectionHeader}>
                    <span>Prompt</span>
                    <Button size="sm" variant="outline" onClick={() => copyText(promptValue, 'prompt')}>
                      {copied === 'prompt' ? 'Tersalin' : 'Copy'}
                    </Button>
                  </div>
                  <pre className={styles.codeBlock}>{promptValue}</pre>

                  <div className={styles.sectionHeader}>
                    <span>Response</span>
                    <Button size="sm" variant="outline" onClick={() => copyText(responseValue, 'response')}>
                      {copied === 'response' ? 'Tersalin' : 'Copy'}
                    </Button>
                  </div>
                  <pre className={styles.codeBlock}>{responseValue}</pre>

                  <div className={styles.analysisWrap}>
                    <p className={styles.analysisTitle}>Analysis</p>
                    <p className={styles.analysisText}>{finding.analysis || finding.description || '-'}</p>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose}>Tutup</Button>
        </div>
      </aside>
    </>
  );
}
