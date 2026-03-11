'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AlertTriangle, BarChart3, CheckCircle, HelpCircle, Package, Play, Settings } from 'lucide-react';
import styles from './BenchmarkWizard.module.css';
import benchmarkResults from '@/mocks/fixtures/benchmark-results.json';
import type { BenchmarkResult } from '@/types/run';
import { clearActiveBenchmark, writeActiveBenchmark } from '@/lib/benchmarkActivity';
import { Button } from '@/components/shared/Button';
import { PackageDetailModal } from './PackageDetailModal';

interface WizardStep {
  id: number;
  label: string;
  icon: typeof Package;
}

interface TestPackage {
  id: string;
  name: string;
  description: string;
  help: string;
  tags: string[];
  recipeCount: number;
  estimatedMinutes: number;
  standardRefs: string[];
  testItems: string[];
  methodology: string;
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
    id: 'core-trust',
    name: 'Core Trust',
    description: 'Paket dasar keamanan dan keandalan model mencakup trust, security, privacy, dan bias handling.',
    help: 'Coverage fondasi untuk baseline trust.',
    tags: ['Trust & Safety', 'Security', 'Privacy'],
    recipeCount: 12,
    estimatedMinutes: 60,
    standardRefs: ['ISO/IEC 42001 A.5', 'OWASP LLM01', 'OWASP LLM06'],
    testItems: ['Prompt injection baseline', 'Data leakage pattern', 'Bias prompt probing', 'Unsafe response gating'],
    methodology: 'Stratified adversarial prompts dengan sampling lintas kategori dan scoring berbasis verdict pass/fail.',
  },
  {
    id: 'safety-robustness',
    name: 'Safety & Robustness',
    description: 'Pengujian jailbreak, role manipulation, dan ketahanan model dalam skenario adversarial multi-turn.',
    help: 'Fokus robustness dan jailbreak.',
    tags: ['Jailbreak', 'Adversarial', 'Safety'],
    recipeCount: 9,
    estimatedMinutes: 50,
    standardRefs: ['OWASP LLM01-LLM04', 'NIST AI RMF Measure'],
    testItems: ['Jailbreak attempts', 'Role-play override', 'Encoded attack prompts', 'Multi-turn escalation'],
    methodology: 'Iterative attack chain dengan step-based stress prompt dan evaluasi resistansi model.',
  },
  {
    id: 'compliance',
    name: 'Compliance',
    description: 'Audit kepatuhan regulasi Indonesia untuk data personal dan tata kelola model.',
    help: 'Validasi keselarasan compliance lokal.',
    tags: ['UU PDP', 'Governance', 'Regulation'],
    recipeCount: 8,
    estimatedMinutes: 35,
    standardRefs: ['UU PDP', 'ISO/IEC 42001 A.5-A.6', 'NIST AI RMF Govern'],
    testItems: ['PII masking check', 'Consent handling prompt', 'Regulatory disclosure consistency', 'Auditability readiness'],
    methodology: 'Policy-driven evaluation terhadap prompt/respons dan validasi dokumen evidence compliance.',
  },
  {
    id: 'app-readiness',
    name: 'Application Readiness',
    description: 'Kesiapan operasional model untuk produksi: observability, fallback, dan incident readiness.',
    help: 'Menilai readiness menuju production.',
    tags: ['Operational', 'Readiness', 'Monitoring'],
    recipeCount: 7,
    estimatedMinutes: 40,
    standardRefs: ['NIST AI RMF Manage', 'ISO/IEC 42001 A.9'],
    testItems: ['Error handling behavior', 'Safe fallback behavior', 'Rate-limit resilience', 'Ops logging completeness'],
    methodology: 'Simulation skenario production dengan target reliability dan kontrol keselamatan minimum.',
  },
];

const PROGRESS_STEPS = [
  'Masuk antrean pengujian',
  'Menjalankan modul Trust and Safety',
  'Menjalankan modul Security',
  'Menjalankan modul Data Privacy',
  'Menjalankan modul Indonesia Readiness',
  'Menjalankan modul Compliance',
  'Menggabungkan skor modul',
  'Menyusun nilai keseluruhan',
  'Menyiapkan laporan penilaian',
  'Selesai',
];

interface BenchmarkWizardProps {
  modelId: string;
  modelName: string;
  onComplete?: (runId: string) => void;
  onCancel?: () => void;
}

function calculateEstimatedMinutes(selectedPackageIds: string[], promptPercent: number): number {
  const recipeCount = TEST_PACKAGES.filter((pkg) => selectedPackageIds.includes(pkg.id)).reduce((sum, pkg) => sum + pkg.recipeCount, 0);
  const maxRecipes = TEST_PACKAGES.reduce((sum, pkg) => sum + pkg.recipeCount, 0);
  const recipeFactor = maxRecipes === 0 ? 1 : recipeCount / maxRecipes;
  const promptFactor = promptPercent / 100;
  return Math.max(8, Math.round(120 * recipeFactor * promptFactor));
}

export function BenchmarkWizard({ modelId, modelName, onComplete, onCancel }: BenchmarkWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(TEST_PACKAGES.map((pkg) => pkg.id));
  const [promptPercent, setPromptPercent] = useState(100);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [showCoverageWarning, setShowCoverageWarning] = useState(false);
  const [coverageReduction, setCoverageReduction] = useState(0);
  const [timeSavedEstimate, setTimeSavedEstimate] = useState(0);

  const [progress, setProgress] = useState<SimulatedProgress>({ step: 0, totalSteps: 10, label: '', percent: 0 });
  const [moduleProgress, setModuleProgress] = useState<SimulatedModuleProgress[]>([]);
  const [finalResult, setFinalResult] = useState<BenchmarkResult | null>(null);
  const [completedRunId, setCompletedRunId] = useState('run-001');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<TestPackage | null>(null);

  const resultByRunId = benchmarkResults as unknown as Record<string, BenchmarkResult>;

  const estimatedMinutes = useMemo(() => calculateEstimatedMinutes(selectedPackages, promptPercent), [selectedPackages, promptPercent]);
  const allSelected = selectedPackages.length === TEST_PACKAGES.length;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setSelectedPackages([]);
      setShowCoverageWarning(false);
      return;
    }

    setSelectedPackages(TEST_PACKAGES.map((pkg) => pkg.id));
    setShowCoverageWarning(false);
  };

  const handleTogglePackage = (id: string) => {
    setSelectedPackages((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      const fullMinutes = calculateEstimatedMinutes(TEST_PACKAGES.map((pkg) => pkg.id), promptPercent);
      const nextMinutes = calculateEstimatedMinutes(next, promptPercent);

      const reduction = Math.max(0, Math.round(((TEST_PACKAGES.length - next.length) / TEST_PACKAGES.length) * 100));
      setCoverageReduction(reduction);
      setTimeSavedEstimate(Math.max(0, fullMinutes - nextMinutes));
      setShowCoverageWarning(next.length < TEST_PACKAGES.length && next.length > 0);

      return next;
    });
  };

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

    writeActiveBenchmark({
      runId: targetRunId,
      modelId,
      modelName,
      packageName: 'Custom Benchmark Selection',
      startedAt: Date.now(),
      estimatedMinutes,
    });

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx += 1;
      if (stepIdx > PROGRESS_STEPS.length) {
        clearInterval(interval);
        clearActiveBenchmark();
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
  }, [estimatedMinutes, modelId, modelName, resultByRunId]);

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
              Semua paket dipilih secara default untuk cakupan penuh. Anda bisa menyesuaikan sesuai kebutuhan benchmark.
            </p>

            <div className={styles.selectionHeader}>
              <label className={styles.selectAllRow}>
                <input type="checkbox" checked={allSelected} onChange={handleToggleSelectAll} />
                <span>Select All Packages</span>
              </label>
              <div className={styles.estimateCard}>Estimasi waktu: <strong>{estimatedMinutes} menit</strong></div>
            </div>

            {showCoverageWarning && (
              <div className={styles.warningBox}>
                <AlertTriangle size={16} />
                <span>
                  Coverage turun sekitar <strong>{coverageReduction}%</strong>. Estimasi waktu berkurang sekitar <strong>{timeSavedEstimate} menit</strong>.
                </span>
              </div>
            )}

            <div className={styles.packageGrid}>
              {TEST_PACKAGES.map((pkg) => (
                <label key={pkg.id} className={`${styles.packageCard} ${selectedPackages.includes(pkg.id) ? styles.selected : ''}`}>
                  <div className={styles.packageHeader}>
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg.id)}
                      onChange={() => handleTogglePackage(pkg.id)}
                    />
                    <div className={styles.packageName}>{pkg.name}</div>
                    <button
                      type="button"
                      className={styles.infoIcon}
                      title={pkg.help}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setSelectedDetailPackage(pkg);
                        setDetailOpen(true);
                      }}
                    >
                      <HelpCircle size={14} />
                    </button>
                  </div>
                  <div className={styles.packageDesc}>{pkg.description}</div>
                  <div className={styles.packageMeta}>
                    {pkg.tags.map((tag) => (
                      <span key={tag} className={styles.packageTag}>{tag}</span>
                    ))}
                    <span className={styles.packageTag}>{pkg.recipeCount} Recipes</span>
                  </div>
                </label>
              ))}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className={styles.stepTitle}>Konfigurasi Benchmark</h3>
            <p className={styles.stepSubtitle}>Atur persentase prompt dan parameter run sebelum benchmark dimulai.</p>
            <div className={styles.configForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Paket yang Dipilih</label>
                <input className={styles.formInput} value={selectedPackages.length === 0 ? '-' : `${selectedPackages.length} package(s)`} disabled />
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
                <span className={styles.formHint}>Default 100% (Direkomendasikan) untuk cakupan penuh. Estimasi waktu saat ini: {estimatedMinutes} menit.</span>
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
            <div className={styles.runningLabel}>Menjalankan pengujian keamanan di latar belakang</div>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: `${progress.percent}%` }} />
            </div>
            <div className={styles.runningStep}>Step {progress.step}/{progress.totalSteps}: {progress.label}</div>
            <div className={styles.runningStep}>Anda dapat pindah halaman. Progress tetap berjalan di background.</div>
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
            <Button disabled={selectedPackages.length === 0} onClick={() => setCurrentStep(2)}>
              Lanjutkan
            </Button>
          )}
          {currentStep === 2 && <Button onClick={() => setCurrentStep(3)}>Run Benchmark</Button>}
          {currentStep === 4 && finalResult && (
            <>
              <Button variant="outline" onClick={() => onComplete?.(completedRunId)}>Lihat Laporan Lengkap</Button>
              <Button variant="secondary" onClick={() => { setCurrentStep(1); setSelectedPackages(TEST_PACKAGES.map((pkg) => pkg.id)); setFinalResult(null); }}>Jalankan Lagi</Button>
            </>
          )}
        </div>
      )}

      {selectedDetailPackage && (
        <PackageDetailModal
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          packageName={selectedDetailPackage.name}
          estimatedMinutes={selectedDetailPackage.estimatedMinutes}
          standardRefs={selectedDetailPackage.standardRefs}
          testItems={selectedDetailPackage.testItems}
          methodology={selectedDetailPackage.methodology}
        />
      )}
    </div>
  );
}
