import type {
  AssessmentModuleDefinition,
  AssessmentModuleId,
  BenchmarkResult,
  CategoryResult,
  Grade,
  LegacyScoreBreakdown,
  ModuleScoreBreakdown,
  ScoreBreakdown,
} from '@/types/run';

export const ASSESSMENT_MODULES: AssessmentModuleDefinition[] = [
  {
    id: 'adversarial',
    name: 'Adversarial Robustness',
    description: 'Uji ketahanan model terhadap serangan adversarial dan manipulasi prompt.',
    estimatedTests: 20,
    estimatedMinutes: [30, 40],
    colorVar: 'var(--color-score-adversarial)',
    methodology: 'Pengujian jailbreak dan prompt injection menggunakan metode adversarial tekstual.',
    recipes: [
      {
        id: 'advglue',
        name: 'Adversarial Robustness (AdvGLUE)',
        description: 'Word-level dan sentence-level adversarial attacks.',
        method: 'Textual adversarial attacks (word-level & sentence-level)',
        dataset: 'advglue-all',
        source: 'Standard',
      },
      {
        id: 'jailbreak-dan',
        name: 'Jailbreak-DAN',
        description: 'Metode jailbreak umum (DAN, dan sejenisnya).',
        method: 'Direct instruction override attempts',
        dataset: 'jailbreak-dan',
        source: 'Standard',
      },
      {
        id: 'prompt-injection',
        name: 'Prompt Injection',
        description: 'Serangan injeksi prompt terhadap system behavior.',
        method: 'Instruction hijacking attempts',
        dataset: 'cyberseceval_promptinjection',
        source: 'Standard',
      },
      {
        id: 'jailbreak-prompts',
        name: 'Jailbreak Prompts',
        description: 'Query jailbreak berbahaya untuk bypass guardrails.',
        method: 'Constraint bypass attempts',
        dataset: 'prompt_injection_jailbreak',
        source: 'Standard',
      },
    ],
  },
  {
    id: 'safety',
    name: 'Safety & Alignment',
    description: 'Uji safety model terhadap toxicity, bias, dan harmful content.',
    estimatedTests: 35,
    estimatedMinutes: [45, 55],
    colorVar: 'var(--color-score-safety)',
    methodology: 'Evaluasi safety berbasis benchmark standar ditambah modul konteks Indonesia.',
    recipes: [
      {
        id: 'toxicity',
        name: 'Toxicity',
        description: 'Uji toxic phrase generation.',
        method: 'Toxic phrase generation assessment',
        dataset: 'real-toxicity-prompts',
        source: 'Standard',
      },
      {
        id: 'bias-bbq',
        name: 'Bias Benchmark (BBQ)',
        description: 'Uji social bias lintas atribut demografis.',
        method: 'Social dimension bias evaluation',
        dataset: 'bbq-lite',
        source: 'Standard',
      },
      {
        id: 'mlcommons-hate',
        name: 'MLCommons - Hate',
        description: 'Uji generation ujaran kebencian.',
        method: 'Hate speech generation attempts',
        dataset: 'mlc-hat-malicious-user',
        source: 'Standard',
      },
      {
        id: 'mlcommons-violent',
        name: 'MLCommons - Violent Crimes',
        description: 'Uji fasilitasi kekerasan/kejahatan berat.',
        method: 'Violent crime facilitation attempts',
        dataset: 'mlc-vcr-malicious-user',
        source: 'Standard',
      },
      {
        id: 'mlcommons-self-harm',
        name: 'MLCommons - Self-Harm',
        description: 'Uji konten self-harm terhadap pengguna rentan.',
        method: 'Self-harm content generation attempts',
        dataset: 'mlc-ssh-vulnerable-user',
        source: 'Standard',
      },
      {
        id: 'sara-content-id',
        name: 'SARA Content (Bahasa)',
        description: 'Konten SARA dalam Bahasa Indonesia.',
        method: 'Indonesian SARA content assessment',
        dataset: 'sara-content-id',
        source: 'Indonesia',
        isIndonesiaSpecific: true,
      },
      {
        id: 'toxicity-bahasa',
        name: 'Toxicity (Bahasa)',
        description: 'Toxic language dalam Bahasa Indonesia.',
        method: 'Indonesian toxicity assessment',
        dataset: 'toxicity-bahasa',
        source: 'Indonesia',
        isIndonesiaSpecific: true,
      },
    ],
  },
  {
    id: 'privacy',
    name: 'Privacy',
    description: 'Uji kebocoran data pribadi dan perlindungan informasi sensitif.',
    estimatedTests: 10,
    estimatedMinutes: [15, 20],
    colorVar: 'var(--color-score-privacy)',
    methodology: 'Evaluasi privasi dengan assessment kebocoran data email dan informasi sensitif.',
    recipes: [
      {
        id: 'privacy-enron',
        name: 'Privacy - EnronEmail',
        description: 'Uji kebocoran private information.',
        method: 'Email corpus privacy assessment',
        dataset: 'privacy-enronemails',
        source: 'Standard',
      },
      {
        id: 'privacy-mlcommons',
        name: 'Privacy - MLCommons',
        description: 'Uji sensitif personal information leakage.',
        method: 'Sensitive personal information disclosure assessment',
        dataset: 'mlc-prv-en',
        source: 'Standard',
      },
    ],
  },
  {
    id: 'hallucination',
    name: 'Hallucination & Truthfulness',
    description: 'Uji tingkat kebenaran jawaban, konsistensi, dan akurasi konteks lokal.',
    estimatedTests: 25,
    estimatedMinutes: [35, 50],
    colorVar: 'var(--color-score-hallucination)',
    methodology: 'Evaluasi truthfulness berbasis benchmark QA plus konteks/regulasi Indonesia.',
    recipes: [
      {
        id: 'truthfulqa-mcq',
        name: 'TruthfulQA (MCQ)',
        description: 'Truthfulness pada format multiple-choice.',
        method: 'Common misconception assessment (MCQ)',
        dataset: 'truthfulqa-mcq',
        source: 'Standard',
      },
      {
        id: 'truthfulqa-open',
        name: 'TruthfulQA (Open-ended)',
        description: 'Truthfulness pada jawaban generatif.',
        method: 'Common misconception assessment (generation)',
        dataset: 'truthfulqa-open-ended',
        source: 'Standard',
      },
      {
        id: 'squad-v2',
        name: 'SQuAD-V2',
        description: 'Uji hallucination pada skenario QA.',
        method: 'Unanswerable question detection',
        dataset: 'squad-v2',
        source: 'Standard',
      },
      {
        id: 'indonesian-context',
        name: 'Indonesian Context & Knowledge',
        description: 'Akurasi pengetahuan budaya, sejarah, dan geografi Indonesia.',
        method: 'Regional knowledge assessment',
        dataset: 'indonesian-context-knowledge',
        source: 'Indonesia',
        isIndonesiaSpecific: true,
      },
      {
        id: 'bahasa-fluency',
        name: 'Bahasa Indonesia Fluency',
        description: 'Kualitas grammar dan kelancaran Bahasa Indonesia.',
        method: 'Language fluency and grammar assessment',
        dataset: 'bahasa-fluency',
        source: 'Indonesia',
        isIndonesiaSpecific: true,
      },
      {
        id: 'uu-pdp',
        name: 'UU PDP Compliance',
        description: 'Pemahaman UU Pelindungan Data Pribadi.',
        method: 'Regulatory knowledge assessment',
        dataset: 'uu-pdp-compliance',
        source: 'Indonesia',
        isIndonesiaSpecific: true,
      },
      {
        id: 'uu-ite',
        name: 'UU ITE & Digital Ethics',
        description: 'Pemahaman UU ITE dan etika digital.',
        method: 'Regulatory knowledge assessment',
        dataset: 'uu-ite-digital-ethics',
        source: 'Indonesia',
        isIndonesiaSpecific: true,
      },
    ],
  },
];

export const ASSESSMENT_MODULE_MAP: Record<AssessmentModuleId, AssessmentModuleDefinition> = ASSESSMENT_MODULES.reduce(
  (acc, item) => ({ ...acc, [item.id]: item }),
  {} as Record<AssessmentModuleId, AssessmentModuleDefinition>
);

const LEGACY_TO_MODULE: Record<string, AssessmentModuleId> = {
  trust: 'safety',
  'trust-safety': 'safety',
  security: 'adversarial',
  privacy: 'privacy',
  readiness: 'hallucination',
  compliance: 'hallucination',
  undesirable: 'safety',
  safety: 'safety',
};

function gradeFromScore(score: number): Grade {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
}

function round(value: number): number {
  return Math.round(value);
}

export function isLegacyScoreBreakdown(scores: ScoreBreakdown): scores is LegacyScoreBreakdown {
  return 'trust' in scores || 'security' in scores || 'readiness' in scores || 'compliance' in scores;
}

export function normalizeScoreBreakdown(scores: ScoreBreakdown): ModuleScoreBreakdown {
  if (!isLegacyScoreBreakdown(scores)) {
    const typed = scores as ModuleScoreBreakdown & { undesirable?: number };
    return {
      adversarial: typed.adversarial,
      safety: typed.safety ?? typed.undesirable ?? 0,
      privacy: typed.privacy,
      hallucination: typed.hallucination,
    };
  }

  return {
    adversarial: scores.security,
    safety: scores.trust,
    privacy: scores.privacy,
    hallucination: round((scores.readiness + scores.compliance) / 2),
  };
}

function normalizeCategoryId(rawId: string): AssessmentModuleId {
  return LEGACY_TO_MODULE[rawId] || 'hallucination';
}

export function normalizeCategoryResults(categories: CategoryResult[]): CategoryResult[] {
  const hasNewStructure = categories.every((category) => ASSESSMENT_MODULES.some((moduleDef) => moduleDef.id === category.id));
  if (hasNewStructure) {
    return categories;
  }

  const grouped = new Map<AssessmentModuleId, CategoryResult[]>();
  for (const category of categories) {
    const normalizedId = normalizeCategoryId(category.id);
    const current = grouped.get(normalizedId) || [];
    current.push(category);
    grouped.set(normalizedId, current);
  }

  return ASSESSMENT_MODULES.map((moduleDef) => {
    const group = grouped.get(moduleDef.id) || [];
    if (group.length === 0) {
      return {
        id: moduleDef.id,
        name: moduleDef.name,
        score: 0,
        grade: 'E',
        description: moduleDef.description,
        recipes: [],
      };
    }

    const totalScore = group.reduce((sum, item) => sum + item.score, 0);
    const score = round(totalScore / group.length);
    const recipes = group.flatMap((item) => item.recipes);
    const description = group.map((item) => item.description).join(' ');

    return {
      id: moduleDef.id,
      name: moduleDef.name,
      score,
      grade: gradeFromScore(score),
      description,
      recipes,
    };
  });
}

export function normalizeBenchmarkResult(result: BenchmarkResult): BenchmarkResult {
  const categoryResults = normalizeCategoryResults(result.categoryResults);
  const overallScore =
    categoryResults.length > 0
      ? round(categoryResults.reduce((sum, category) => sum + category.score, 0) / categoryResults.length)
      : result.overallScore;

  return {
    ...result,
    overallScore,
    overallGrade: gradeFromScore(overallScore),
    categoryResults,
  };
}

export function calculateSelectionSummary(selectedModules: AssessmentModuleId[]) {
  const selected = ASSESSMENT_MODULES.filter((moduleDef) => selectedModules.includes(moduleDef.id));
  const totalRecipes = selected.reduce((sum, moduleDef) => sum + moduleDef.recipes.length, 0);
  const totalTests = selected.reduce((sum, moduleDef) => sum + moduleDef.estimatedTests, 0);
  const minMinutes = selected.reduce((sum, moduleDef) => sum + moduleDef.estimatedMinutes[0], 0);
  const maxMinutes = selected.reduce((sum, moduleDef) => sum + moduleDef.estimatedMinutes[1], 0);
  const standardModules = selected.reduce(
    (sum, moduleDef) => sum + moduleDef.recipes.filter((recipe) => recipe.source === 'Standard').length,
    0
  );
  const indonesiaModules = selected.reduce(
    (sum, moduleDef) => sum + moduleDef.recipes.filter((recipe) => recipe.source === 'Indonesia').length,
    0
  );

  return {
    selectedCount: selected.length,
    totalRecipes,
    totalTests,
    minMinutes,
    maxMinutes,
    standardModules,
    indonesiaModules,
  };
}
