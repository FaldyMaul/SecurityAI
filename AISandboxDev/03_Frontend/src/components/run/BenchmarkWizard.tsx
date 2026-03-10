'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Package, Settings, Play, BarChart3 } from 'lucide-react';
import styles from './BenchmarkWizard.module.css';
import benchmarkResults from '@/mocks/fixtures/benchmark-results.json';
import type { BenchmarkResult } from '@/types/run';

interface WizardStep {
  id: number;
  label: string;
  icon: typeof Package;
}

interface TestPackage {
  id: string;
  name: string;
  description: string;
  tags: string[];
  recipeCount: number;
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

const TEST_PACKAGES: TestPackage[] = [
  {
    id: 'indonesia-core-trust',
    name: 'Indonesia Core Trust Package',
    description:
      'Paket penilaian komprehensif untuk model AI di Indonesia. Mencakup uji keamanan, privasi, kepatuhan regulasi (UU PDP, UU ITE), serta kesiapan konteks Indonesia.',
    tags: ['Trust & Safety', 'Security', 'Privacy', 'Compliance', 'Indonesia Readiness'],
    recipeCount: 10,
  },
  {
    id: 'quick-safety',
    name: 'Quick Safety Scan',
    description:
      'Penilaian cepat untuk menguji keamanan dasar model. Mencakup prompt injection, toxicity, dan bias detection.',
    tags: ['Trust & Safety', 'Security'],
    recipeCount: 4,
  },
  {
    id: 'regulatory-compliance',
    name: 'Indonesian Regulatory Suite',
    description:
      'Fokus pada kepatuhan regulasi Indonesia termasuk UU PDP, UU ITE, pedoman OJK, dan standar BRTI.',
    tags: ['Compliance', 'UU PDP', 'UU ITE'],
    recipeCount: 5,
  },
];

const PROGRESS_STEPS = [
  'Queue benchmark run',
  'Run Trust and Safety module',
  'Run Security module',
  'Run Data Privacy module',
  'Run Indonesia Readiness module',
  'Run Compliance module',
  'Aggregate module scores',
  'Generate overall rating',
  'Prepare assessment report',
  'Completed',
];

interface BenchmarkWizardProps {
  modelId: string;
  modelName: string;
  onComplete?: (runId: string) => void;
  onCancel?: () => void;
}

export function BenchmarkWizard({ modelId, modelName, onComplete, onCancel }: BenchmarkWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [promptPercent, setPromptPercent] = useState(25);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [progress, setProgress] = useState<SimulatedProgress>({ step: 0, totalSteps: 10, label: '', percent: 0 });
  const [moduleProgress, setModuleProgress] = useState<SimulatedModuleProgress[]>([]);
  const [finalResult, setFinalResult] = useState<BenchmarkResult | null>(null);
  const [completedRunId, setCompletedRunId] = useState('run-001');

  const resultByRunId = benchmarkResults as Record<string, BenchmarkResult>;

  const simulateRun = useCallback(() => {
    const targetRunId = modelId === 'model-002' ? 'run-002' : 'run-001';
    const result = resultByRunId[targetRunId];
    if (!result) return;

    setCompletedRunId(targetRunId);
    setFinalResult(null);
    setModuleProgress(
      result.categoryResults.map((category) => ({
        id: category.id,
        name: category.name,
        status: 'pending',
      }))
    );

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx += 1;
      if (stepIdx > PROGRESS_STEPS.length) {
        clearInterval(interval);
        setFinalResult(result);
        setCurrentStep(4);
        return;
      }

      if (stepIdx >= 2 && stepIdx <= 6) {
        const moduleIdx = stepIdx - 2;
        setModuleProgress((prev) =>
          prev.map((module, idx) => {
            if (idx < moduleIdx) {
              return {
                ...module,
                status: 'completed',
                score: result.categoryResults[idx].score,
                grade: result.categoryResults[idx].grade,
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
        totalSteps: PROGRESS_STEPS.length,
        label: PROGRESS_STEPS[stepIdx - 1],
        percent: Math.round((stepIdx / PROGRESS_STEPS.length) * 100),
      });
    }, 1300);

    return () => clearInterval(interval);
  }, [modelId, resultByRunId]);

  useEffect(() => {
    if (currentStep === 3) {
      setProgress({
        step: 0,
        totalSteps: PROGRESS_STEPS.length,
        label: PROGRESS_STEPS[0],
        percent: 0,
      });
      const cleanup = simulateRun();
      return cleanup;
    }
  }, [currentStep, simulateRun]);

  const gradeColorMap: Record<string, string> = {
    A: '#10b981',
    B: '#3b82f6',
    C: '#f59e0b',
    D: '#f97316',
    E: '#ef4444',
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
              <span className={`${styles.stepLabel} ${currentStep === step.id ? styles.active : ''}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`${styles.stepConnector} ${currentStep > step.id ? styles.completed : ''}`} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <>
            <h3 className={styles.stepTitle}>Pilih Paket Penilaian</h3>
            <p className={styles.stepSubtitle}>Pilih paket benchmark yang akan dijalankan untuk menilai <strong>{modelName}</strong></p>
            <div className={styles.packageGrid}>
              {TEST_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  className={`${styles.packageCard} ${selectedPackage === pkg.id ? styles.selected : ''}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className={styles.packageName}>{pkg.name}</div>
                  <div className={styles.packageDesc}>{pkg.description}</div>
                  <div className={styles.packageMeta}>
                    {pkg.tags.map((tag) => (
                      <span key={tag} className={styles.packageTag}>{tag}</span>
                    ))}
                    <span className={styles.packageTag}>{pkg.recipeCount} Recipes</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className={styles.stepTitle}>Konfigurasi Benchmark</h3>
            <p className={styles.stepSubtitle}>Sesuaikan pengaturan sebelum menjalankan benchmark</p>
            <div className={styles.configForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Paket Terpilih</label>
                <input
                  className={styles.formInput}
                  value={TEST_PACKAGES.find((p) => p.id === selectedPackage)?.name || ''}
                  disabled
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Persentase Prompt ({promptPercent}%)</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={promptPercent}
                  onChange={(e) => setPromptPercent(Number(e.target.value))}
                  className={styles.formInput}
                  style={{ cursor: 'pointer' }}
                />
                <span className={styles.formHint}>Persentase prompt yang akan digunakan dari setiap recipe. Nilai lebih tinggi berarti hasil lebih akurat namun proses lebih lama.</span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>System Prompt (opsional)</label>
                <textarea
                  className={styles.formInput}
                  rows={3}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Masukkan system prompt khusus jika diperlukan"
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
                <span className={styles.formHint}>System prompt akan ditambahkan ke setiap permintaan ke model.</span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Model Target</label>
                <input className={styles.formInput} value={`${modelName} (${modelId})`} disabled />
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <div className={styles.runningState}>
            <div className={styles.spinnerRing} />
            <div className={styles.runningLabel}>Running security assessment</div>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: `${progress.percent}%` }} />
            </div>
            <div className={styles.runningStep}>
              Step {progress.step}/{progress.totalSteps}: {progress.label}
            </div>
            <div className={styles.moduleTracker}>
              {moduleProgress.map((module) => (
                <div key={module.id} className={styles.moduleRow}>
                  <span className={styles.moduleName}>{module.name}</span>
                  {module.status === 'pending' && <span className={styles.modulePending}>Pending</span>}
                  {module.status === 'running' && <span className={styles.moduleRunning}>Running</span>}
                  {module.status === 'completed' && (
                    <span className={styles.moduleCompleted}>
                      {module.score}/100 ({module.grade})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && finalResult && (
          <div className={styles.resultsSummary}>
            <h3 className={styles.stepTitle}>Assessment completed</h3>
            <p className={styles.stepSubtitle}>Penilaian keamanan untuk <strong>{modelName}</strong> telah selesai.</p>
            <div
              className={styles.resultGrade}
              style={{
                background: `linear-gradient(135deg, ${gradeColorMap[finalResult.overallGrade] || '#6366f1'}, ${gradeColorMap[finalResult.overallGrade] || '#6366f1'}dd)`,
                boxShadow: `0 0 32px ${gradeColorMap[finalResult.overallGrade] || '#6366f1'}66`,
              }}
            >
              {finalResult.overallGrade}
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text, #e2e8f0)', marginBottom: '0.75rem' }}>
              Score: {finalResult.overallScore}/100
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
            <button className={styles.btnSecondary} onClick={() => setCurrentStep(currentStep - 1)}>
              Kembali
            </button>
          )}
          {currentStep === 1 && onCancel && (
            <button className={styles.btnSecondary} onClick={onCancel}>
              Batal
            </button>
          )}
          {currentStep === 1 && (
            <button className={styles.btnPrimary} disabled={!selectedPackage} onClick={() => setCurrentStep(2)}>
              Lanjutkan
            </button>
          )}
          {currentStep === 2 && (
            <button className={styles.btnPrimary} onClick={() => setCurrentStep(3)}>
              Run Benchmark
            </button>
          )}
          {currentStep === 4 && finalResult && (
            <>
              <button className={styles.btnSecondary} onClick={() => onComplete?.(completedRunId)}>
                View Full Report
              </button>
              <button className={styles.btnPrimary} onClick={() => { setCurrentStep(1); setSelectedPackage(''); setFinalResult(null); }}>
                Run Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}