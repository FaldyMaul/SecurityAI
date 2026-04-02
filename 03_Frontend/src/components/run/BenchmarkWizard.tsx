'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AlertTriangle, BarChart3, CheckCircle, ChevronDown, ChevronRight, HelpCircle, Package, Play, Settings } from 'lucide-react';
import styles from './BenchmarkWizard.module.css';
import benchmarkResults from '@/mocks/fixtures/benchmark-results.json';
import type {
  AssessmentModuleDefinition,
  AssessmentModuleId,
  BenchmarkResult,
  CategoryResult,
  Grade,
} from '@/types/run';
import { clearActiveBenchmark, writeActiveBenchmark } from '@/lib/benchmarkActivity';
import { Button } from '@/components/shared/Button';
import { PackageDetailModal } from './PackageDetailModal';
import {
  ASSESSMENT_MODULES,
  calculateSelectionSummary,
  normalizeBenchmarkResult,
} from '@/lib/modules';

interface WizardStep {
  id: number;
  label: string;
  icon: typeof Package;
}

interface SimulatedProgress {
  step: number;
  totalSteps: number;
  label: string;
  percent: number;
}

interface SimulatedModuleProgress {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed';
  score?: number;
  grade?: string;
}

const STEPS: WizardStep[] = [
  { id: 1, label: 'Pilih Paket', icon: Package },
  { id: 2, label: 'Konfigurasi', icon: Settings },
  { id: 3, label: 'Menjalankan', icon: Play },
  { id: 4, label: 'Hasil', icon: BarChart3 },
];

interface BenchmarkWizardProps {
  modelId: string;
  modelName: string;
  onComplete?: (runId: string) => void;
  onCancel?: () => void;
}

function getGradeFromScore(score: number): Grade {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

function getSelectedCategoryResults(result: BenchmarkResult, selectedModules: AssessmentModuleId[]): CategoryResult[] {
  return result.categoryResults.filter((category) => selectedModules.includes(category.id as AssessmentModuleId));
}

function estimateMinutesWithCoverage(minMinutes: number, maxMinutes: number, promptPercent: number) {
  const coverageFactor = promptPercent / 100;
  return {
    min: Math.max(5, Math.round(minMinutes * coverageFactor)),
    max: Math.max(8, Math.round(maxMinutes * coverageFactor)),
  };
}

export function BenchmarkWizard({ modelId, modelName, onComplete, onCancel }: BenchmarkWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState<AssessmentModuleId[]>(ASSESSMENT_MODULES.map((item) => item.id));
  const [expandedModules, setExpandedModules] = useState<AssessmentModuleId[]>(['adversarial']);
  const [promptPercent, setPromptPercent] = useState(100);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [showCoverageWarning, setShowCoverageWarning] = useState(false);
  const [coverageReduction, setCoverageReduction] = useState(0);
  const [timeSavedEstimate, setTimeSavedEstimate] = useState(0);

  const [progress, setProgress] = useState<SimulatedProgress>({ step: 0, totalSteps: 0, label: '', percent: 0 });
  const [moduleProgress, setModuleProgress] = useState<SimulatedModuleProgress[]>([]);
  const [finalResult, setFinalResult] = useState<BenchmarkResult | null>(null);
  const [completedRunId, setCompletedRunId] = useState('run-001');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDetailModule, setSelectedDetailModule] = useState<AssessmentModuleDefinition | null>(null);

  const resultByRunId = benchmarkResults as unknown as Record<string, BenchmarkResult>;
  const selectedSummary = useMemo(() => calculateSelectionSummary(selectedModules), [selectedModules]);
  const fullSummary = useMemo(() => calculateSelectionSummary(ASSESSMENT_MODULES.map((item) => item.id)), []);
  const estimatedMinutes = useMemo(
    () => estimateMinutesWithCoverage(selectedSummary.minMinutes, selectedSummary.maxMinutes, promptPercent),
    [selectedSummary.maxMinutes, selectedSummary.minMinutes, promptPercent]
  );

  const allSelected = selectedModules.length === ASSESSMENT_MODULES.length;

  const progressSteps = useMemo(() => {
    const selectedLabels = ASSESSMENT_MODULES.filter((item) => selectedModules.includes(item.id)).map(
      (item) => `Menjalankan modul ${item.name}`
    );

    return [
      'Masuk antrean pengujian',
      ...selectedLabels,
      'Menggabungkan skor kategori',
      'Menyusun nilai keseluruhan',
      'Menyiapkan laporan penilaian',
      'Selesai',
    ];
  }, [selectedModules]);

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setSelectedModules([]);
      setShowCoverageWarning(false);
      return;
    }

    setSelectedModules(ASSESSMENT_MODULES.map((item) => item.id));
    setShowCoverageWarning(false);
  };

  const handleToggleModule = (id: AssessmentModuleId) => {
    setSelectedModules((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      const nextSummary = calculateSelectionSummary(next);
      const fullAverage = Math.round((fullSummary.minMinutes + fullSummary.maxMinutes) / 2);
      const nextAverage = Math.round((nextSummary.minMinutes + nextSummary.maxMinutes) / 2);

      const reduction = fullSummary.totalTests === 0 ? 0 : Math.max(0, Math.round((1 - nextSummary.totalTests / fullSummary.totalTests) * 100));
      setCoverageReduction(reduction);
      setTimeSavedEstimate(Math.max(0, fullAverage - nextAverage));
      setShowCoverageWarning(next.length < ASSESSMENT_MODULES.length && next.length > 0);

      return next;
    });
  };

  const toggleExpanded = (id: AssessmentModuleId) => {
    setExpandedModules((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const simulateRun = useCallback(() => {
    const targetRunId = modelId === 'model-002' ? 'run-002' : 'run-001';
    const result = resultByRunId[targetRunId];
    if (!result) return;

    const normalizedResult = normalizeBenchmarkResult(result);
    const filteredCategoryResults = getSelectedCategoryResults(normalizedResult, selectedModules);
    if (filteredCategoryResults.length === 0) return;

    const overallScore = Math.round(
      filteredCategoryResults.reduce((sum, category) => sum + category.score, 0) / filteredCategoryResults.length
    );

    const composedResult: BenchmarkResult = {
      ...normalizedResult,
      overallScore,
      overallGrade: getGradeFromScore(overallScore),
      metadata: {
        ...normalizedResult.metadata,
        packageName: selectedModules
          .map((id) => ASSESSMENT_MODULES.find((item) => item.id === id)?.name)
          .filter(Boolean)
          .join(', '),
        promptSelectionPercentage: promptPercent,
      },
      categoryResults: filteredCategoryResults,
    };

    setCompletedRunId(targetRunId);
    setFinalResult(null);
    setModuleProgress(
      composedResult.categoryResults.map((category) => ({
        id: category.id,
        name: category.name,
        status: 'pending',
      }))
    );

    writeActiveBenchmark({
      runId: targetRunId,
      modelId,
      modelName,
      packageName: 'Kategori Benchmark',
      startedAt: Date.now(),
      estimatedMinutes: Math.round((estimatedMinutes.min + estimatedMinutes.max) / 2),
    });

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx += 1;
      if (stepIdx > progressSteps.length) {
        clearInterval(interval);
        clearActiveBenchmark();
        setFinalResult(composedResult);
        setCurrentStep(4);
        return;
      }

      if (stepIdx >= 2 && stepIdx <= 1 + composedResult.categoryResults.length) {
        const moduleIdx = stepIdx - 2;
        setModuleProgress((prev) =>
          prev.map((module, idx) => {
            if (idx < moduleIdx) {
              return {
                ...module,
                status: 'completed',
                score: composedResult.categoryResults[idx].score,
                grade: composedResult.categoryResults[idx].grade,
              };
            }
            if (idx === moduleIdx) {
              return {
                ...module,
                status: 'running',
              };
            }
            return module;
          })
        );
      }

      setProgress({
        step: stepIdx,
        totalSteps: progressSteps.length,
        label: progressSteps[stepIdx - 1],
        percent: Math.round((stepIdx / progressSteps.length) * 100),
      });
    }, 1300);

    return () => clearInterval(interval);
  }, [estimatedMinutes.max, estimatedMinutes.min, modelId, modelName, progressSteps, promptPercent, resultByRunId, selectedModules]);

  useEffect(() => {
    if (currentStep === 3) {
      setProgress({
        step: 0,
        totalSteps: progressSteps.length,
        label: progressSteps[0],
        percent: 0,
      });
      const cleanup = simulateRun();
      return cleanup;
    }
  }, [currentStep, progressSteps, simulateRun]);

  const gradeColorMap: Record<string, string> = {
    A: 'var(--color-score-excellent)',
    B: 'var(--color-score-good)',
    C: 'var(--color-score-moderate)',
    D: 'var(--color-score-poor)',
    E: 'var(--color-score-critical)',
  };

  return (
    <div className={styles.wizardContainer}>
      <div className={styles.stepIndicator}>
        {STEPS.map((step, i) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${currentStep > step.id ? styles.completed : ''} ${currentStep === step.id ? styles.active : ''}`}>
                {currentStep > step.id ? <CheckCircle size={16} /> : step.id}
              </div>
              <span className={`${styles.stepLabel} ${currentStep === step.id ? styles.active : ''}`}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`${styles.stepConnector} ${currentStep > step.id ? styles.completed : ''}`} />}
          </div>
        ))}
      </div>

      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <>
            <h3 className={styles.stepTitle}>Pilih Paket Penilaian</h3>
            <p className={styles.stepSubtitle}>
              Pilih kategori penilaian yang ingin dijalankan.
            </p>

            <div className={styles.selectionHeader}>
              <label className={styles.selectAllRow}>
                <input type="checkbox" checked={allSelected} onChange={handleToggleSelectAll} />
                <span>Pilih semua kategori</span>
              </label>
              <div className={styles.estimateCard}>
                Estimasi waktu: <strong>{estimatedMinutes.min}-{estimatedMinutes.max} menit</strong>
              </div>
            </div>

            {showCoverageWarning && (
              <div className={styles.warningBox}>
                <AlertTriangle size={16} />
                <span>
                  Cakupan turun sekitar <strong>{coverageReduction}%</strong>. Estimasi waktu berkurang sekitar <strong>{timeSavedEstimate} menit</strong>.
                </span>
              </div>
            )}

            <div className={styles.categoryList}>
              {ASSESSMENT_MODULES.map((moduleDef) => {
                const expanded = expandedModules.includes(moduleDef.id);
                const selected = selectedModules.includes(moduleDef.id);

                return (
                  <div key={moduleDef.id} className={`${styles.categoryCard} ${selected ? styles.selected : ''}`}>
                    <div className={styles.categoryHeader}>
                      <label className={styles.categoryCheckboxRow}>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleToggleModule(moduleDef.id)}
                        />
                        <div className={styles.categoryLabelWrap}>
                          <span className={styles.categoryName}>{moduleDef.name}</span>
                          <span className={styles.categoryMetaInline}>~{moduleDef.estimatedTests} tests</span>
                        </div>
                      </label>

                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className={styles.infoIcon}
                          title={`Detail ${moduleDef.name}`}
                          onClick={() => {
                            setSelectedDetailModule(moduleDef);
                            setDetailOpen(true);
                          }}
                        >
                          <HelpCircle size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.expandButton}
                          onClick={() => toggleExpanded(moduleDef.id)}
                          aria-label={`Lihat detail ${moduleDef.name}`}
                        >
                          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                      </div>
                    </div>

                    {expanded && (
                      <div className={styles.recipeList}>
                        <h4>Detail Testing:</h4>
                        <ul className={styles.recipeItems}>
                          {moduleDef.recipes.filter((recipe) => recipe.source === 'Standard').map((recipe) => (
                            <li key={recipe.id} className={styles.recipeItem}>
                              <div>
                                <div className={styles.recipeName}>{recipe.name}</div>
                                <div className={styles.recipeDesc}>{recipe.description}</div>
                                <span className={styles.methodBadge}>Method: {recipe.method}</span>
                                <span className={styles.datasetBadge}>Dataset: {recipe.dataset}</span>
                              </div>
                              <span className={styles.recipeStandard}>Standard</span>
                            </li>
                          ))}

                          {moduleDef.recipes.some((recipe) => recipe.source === 'Indonesia') && (
                            <li className={styles.dividerItem}>
                              <div className={styles.dividerLabel}>Indonesia-Specific Modules</div>
                            </li>
                          )}

                          {moduleDef.recipes.filter((recipe) => recipe.source === 'Indonesia').map((recipe) => (
                            <li key={recipe.id} className={`${styles.recipeItem} ${styles.recipeIndonesia}`}>
                              <div>
                                <div className={styles.recipeName}>🇮🇩 {recipe.name}</div>
                                <div className={styles.recipeDesc}>{recipe.description}</div>
                                <span className={styles.methodBadge}>Method: {recipe.method}</span>
                                <span className={styles.datasetBadge}>Dataset: {recipe.dataset}</span>
                              </div>
                              <span className={styles.recipeStandard}>Indonesia</span>
                            </li>
                          ))}
                        </ul>
                        <p className={styles.categoryMeta}>Estimasi: {moduleDef.estimatedMinutes[0]}-{moduleDef.estimatedMinutes[1]} menit</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.summaryBox}>
              <h4>Ringkasan Pilihan</h4>
              <div className={styles.summaryStats}>
                <div>
                  <span className={styles.summaryLabel}>Kategori dipilih</span>
                  <strong>{selectedSummary.selectedCount} dari 4</strong>
                </div>
                <div>
                  <span className={styles.summaryLabel}>Total recipe</span>
                  <strong>{selectedSummary.totalRecipes} recipe</strong>
                </div>
                <div>
                  <span className={styles.summaryLabel}>Estimasi waktu</span>
                  <strong>{selectedSummary.minMinutes}-{selectedSummary.maxMinutes} menit</strong>
                </div>
                <div>
                  <span className={styles.summaryLabel}>Modul standar</span>
                  <strong>{selectedSummary.standardModules}</strong>
                </div>
                <div>
                  <span className={styles.summaryLabel}>Indonesia modules</span>
                  <strong>{selectedSummary.indonesiaModules}</strong>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className={styles.stepTitle}>Konfigurasi Benchmark</h3>
            <p className={styles.stepSubtitle}>Atur cakupan prompt dan parameter run sebelum benchmark dimulai.</p>
            <div className={styles.configForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Kategori yang dipilih</label>
                <input className={styles.formInput} value={selectedModules.length === 0 ? '-' : `${selectedModules.length} kategori`} disabled />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cakupan Prompt</label>
                <select className={styles.formInput} value={promptPercent} onChange={(event) => setPromptPercent(Number(event.target.value))}>
                  <option value={25}>25% (Cepat)</option>
                  <option value={50}>50% (Sedang)</option>
                  <option value={75}>75% (Lengkap)</option>
                  <option value={100}>100% (Penuh - Direkomendasikan)</option>
                </select>
                <span className={styles.formHint}>
                  Default 100% untuk cakupan penuh. Estimasi waktu saat ini: {estimatedMinutes.min}-{estimatedMinutes.max} menit.
                </span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>System Prompt (opsional)</label>
                <textarea
                  className={styles.formInput}
                  rows={3}
                  value={systemPrompt}
                  onChange={(event) => setSystemPrompt(event.target.value)}
                  placeholder="Masukkan system prompt khusus jika diperlukan"
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
                <span className={styles.formHint}>System prompt akan ditambahkan ke setiap permintaan ke model.</span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Model target</label>
                <input className={styles.formInput} value={`${modelName} (${modelId})`} disabled />
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <div className={styles.runningState}>
            <div className={styles.spinnerRing} />
            <div className={styles.runningLabel}>Menjalankan pengujian keamanan secara bertahap</div>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: `${progress.percent}%` }} />
            </div>
            <div className={styles.runningStep}>Step {progress.step}/{progress.totalSteps}: {progress.label}</div>
            <div className={styles.runningStep}>Anda dapat pindah halaman. Progress tetap berjalan di latar belakang.</div>
            <div className={styles.moduleTracker}>
              {moduleProgress.map((module) => (
                <div key={module.id} className={styles.moduleRow}>
                  <span className={styles.moduleName}>{module.name}</span>
                  {module.status === 'pending' && <span className={styles.modulePending}>Menunggu</span>}
                  {module.status === 'running' && <span className={styles.moduleRunning}>Berjalan</span>}
                  {module.status === 'completed' && <span className={styles.moduleCompleted}>{module.score}/100 ({module.grade})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && finalResult && (
          <div className={styles.resultsSummary}>
            <h3 className={styles.stepTitle}>Penilaian selesai</h3>
            <p className={styles.stepSubtitle}>Penilaian keamanan untuk <strong>{modelName}</strong> telah selesai.</p>
            <div
              className={styles.resultGrade}
              style={{
                background: `linear-gradient(135deg, ${gradeColorMap[finalResult.overallGrade] || 'var(--color-primary)'}, ${gradeColorMap[finalResult.overallGrade] || 'var(--color-primary)'}dd)`,
                boxShadow: `0 0 32px ${gradeColorMap[finalResult.overallGrade] || 'var(--color-primary)'}66`,
              }}
            >
              {finalResult.overallGrade}
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
              Skor: {finalResult.overallScore}/100
            </p>
            <div className={styles.summaryGrid}>
              {finalResult.categoryResults.map((category) => (
                <div key={category.id} className={styles.summaryCard}>
                  <span>{category.name}</span>
                  <strong>{category.score} ({category.grade})</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {currentStep !== 3 && (
        <div className={styles.actions}>
          {currentStep > 1 && currentStep < 4 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              Kembali
            </Button>
          )}
          {currentStep === 1 && onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Batal
            </Button>
          )}
          {currentStep === 1 && (
            <Button disabled={selectedModules.length === 0} onClick={() => setCurrentStep(2)}>
              Lanjutkan
            </Button>
          )}
          {currentStep === 2 && <Button onClick={() => setCurrentStep(3)}>Jalankan Benchmark</Button>}
          {currentStep === 4 && finalResult && (
            <>
              <Button variant="outline" onClick={() => onComplete?.(completedRunId)}>Lihat Laporan Lengkap</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedModules(ASSESSMENT_MODULES.map((item) => item.id));
                  setExpandedModules(['adversarial']);
                  setPromptPercent(100);
                  setFinalResult(null);
                }}
              >
                Jalankan Lagi
              </Button>
            </>
          )}
        </div>
      )}

      {selectedDetailModule && (
        <PackageDetailModal
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          packageName={selectedDetailModule.name}
          estimatedMinutes={Math.round((selectedDetailModule.estimatedMinutes[0] + selectedDetailModule.estimatedMinutes[1]) / 2)}
          standardRefs={[...new Set(selectedDetailModule.recipes.map((recipe) => recipe.source))]}
          testItems={selectedDetailModule.recipes.map((recipe) => `${recipe.name} | Method: ${recipe.method} | Dataset: ${recipe.dataset}`)}
          methodology={selectedDetailModule.methodology}
        />
      )}
    </div>
  );
}
