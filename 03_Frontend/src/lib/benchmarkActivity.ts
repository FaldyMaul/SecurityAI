export interface ActiveBenchmark {
  runId: string;
  modelId: string;
  modelName: string;
  packageName: string;
  startedAt: number;
  estimatedMinutes: number;
}

export const ACTIVE_BENCHMARK_KEY = 'ai_sandbox_active_benchmark';

export function readActiveBenchmark(): ActiveBenchmark | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(ACTIVE_BENCHMARK_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as ActiveBenchmark;
    if (!parsed.runId || !parsed.modelId || !parsed.startedAt || !parsed.estimatedMinutes) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeActiveBenchmark(payload: ActiveBenchmark): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_BENCHMARK_KEY, JSON.stringify(payload));
}

export function clearActiveBenchmark(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACTIVE_BENCHMARK_KEY);
}

export function getBenchmarkProgress(benchmark: ActiveBenchmark): number {
  const totalMs = benchmark.estimatedMinutes * 60 * 1000;
  const elapsed = Date.now() - benchmark.startedAt;
  const progress = Math.round((elapsed / totalMs) * 100);
  return Math.max(0, Math.min(100, progress));
}

export function getBenchmarkEtaMinutes(benchmark: ActiveBenchmark): number {
  const progress = getBenchmarkProgress(benchmark);
  const remaining = Math.round((benchmark.estimatedMinutes * (100 - progress)) / 100);
  return Math.max(0, remaining);
}