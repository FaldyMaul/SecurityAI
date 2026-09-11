export type RunStatus =
  | 'queued'
  | 'in_progress'
  | 'running'
  | 'completed'
  | 'failed';

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type Grade = 'A' | 'B' | 'C' | 'D' | 'E';
export type Verdict = 'pass' | 'fail' | 'warning';
export type AssessmentModuleId = 'adversarial' | 'safety' | 'privacy' | 'hallucination';

export interface Run {
  id: string;
  modelId: string;
  packageName: string;
  status: RunStatus;
  overallScore?: number;
  scores?: ScoreBreakdown;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  progress?: RunProgress;
  findings?: FindingCategory[];
  selectedCategories?: AssessmentModuleId[];
  selectedRecipes?: string[];
  recipeResults?: Record<string, SelectedRecipeResult>;
  error?: RunError;
  createdAt: string;
}

export interface RunError {
  code: string;
  message: string;
}

export interface RunProgress {
  currentStep: number;
  totalSteps: number;
  currentStepLabel: string;
  percentComplete: number;
}

export interface ModuleScoreBreakdown {
  adversarial: number;
  safety: number;
  privacy: number;
  hallucination: number;
}

export interface LegacyScoreBreakdown {
  trust: number;
  security: number;
  privacy: number;
  readiness: number;
  compliance: number;
}

export type ScoreBreakdown = ModuleScoreBreakdown | LegacyScoreBreakdown;

export interface FindingCategory {
  category: string;
  count: number;
  maxSeverity: SeverityLevel;
  findings: Finding[];
}

export interface Finding {
  id: string;
  title: string;
  severity: SeverityLevel;
  category: string;
  description: string;
  hasEvidence: boolean;
}

export interface RunEvidence {
  findingId: string;
  prompt: string;
  response: string;
  verdict: Verdict;
  severity: SeverityLevel;
  rawArtifactUrl?: string;
}

export interface GradingScale {
  A: [number, number];
  B: [number, number];
  C: [number, number];
  D: [number, number];
  E: [number, number];
}

export interface BenchmarkResult {
  metadata: BenchmarkMetadata;
  overallGrade: Grade;
  overallScore: number;
  gradingScale: GradingScale;
  categoryResults: CategoryResult[];
}

export interface BenchmarkMetadata {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: string;
  packageName: string;
  modelId: string;
  promptSelectionPercentage: number;
  systemPrompt: string;
}

export interface CategoryResult {
  id: string;
  name: string;
  score: number;
  grade: Grade;
  description: string;
  recipes: RecipeResult[];
}

export interface RecipeResult {
  id: string;
  name: string;
  description: string;
  grade: Grade;
  avgScore: number;
  totalPrompts: number;
  metrics: RecipeMetrics;
  sampleResults: PromptResult[];
}

export interface RecipeMetrics {
  acceptableRate: number;
  refusedRate: number;
  safe: number;
  unsafe: number;
  refused: number;
  nonRefused: number;
}

export interface PromptResult {
  prompt: string;
  response: string;
  verdict: Verdict;
  evaluation: string;
  refusal: boolean;
}

export interface AssessmentRecipeDefinition {
  id: string;
  name: string;
  description: string;
  method: string;
  dataset: string;
  source: 'Standard' | 'Indonesia';
  isIndonesiaSpecific?: boolean;
}

export interface AssessmentModuleDefinition {
  id: AssessmentModuleId;
  name: string;
  description: string;
  estimatedTests: number;
  estimatedMinutes: [number, number];
  colorVar: string;
  methodology: string;
  recipes: AssessmentRecipeDefinition[];
}

export interface RecipeFindingSummary {
  id: string;
  severity: SeverityLevel;
  description: string;
  verdict?: Verdict;
  testId?: string;
  analysis?: string;
  prompt?: string;
  response?: string;
}

export interface SelectedRecipeResult {
  recipeId: string;
  categoryId: AssessmentModuleId;
  categoryName: string;
  recipeName: string;
  method: string;
  dataset: string;
  score: number;
  grade: Grade;
  status: 'passed' | 'failed' | 'warning';
  totalTests: number;
  passed: number;
  failed: number;
  critical: number;
  findings: RecipeFindingSummary[];
  recommendations: string[];
}
