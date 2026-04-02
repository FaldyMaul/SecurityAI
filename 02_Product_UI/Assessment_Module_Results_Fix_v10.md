# AI Sandbox – Assessment Module & Results Fix v10.0

> **Purpose**: Fix results page to show all selected recipes + Remove "Moonshot" branding
> **Version**: 10.0 (Results Alignment Fix)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Results must match package selection

---

## 🚨 Issue: Results Don't Match Package Selection

### Problem

**Package Selection (BenchmarkWizard):**
```
✓ Adversarial Robustness (4 recipes selected)
  - Adversarial Robustness (AdvGLUE)
  - Jailbreak-DAN
  - Prompt Injection
  - Jailbreak Prompts

✓ Safety & Alignment (7 recipes selected)
  - Toxicity
  - Bias Benchmark (BBQ)
  - MLCommons - Hate
  - MLCommons - Violent Crimes
  - MLCommons - Self-Harm
  - SARA Content (Bahasa)
  - Toxicity (Bahasa)
```

**Results Page (WRONG):**
```
❌ Only shows category scores
❌ Doesn't show individual recipe results
❌ User can't see which specific tests passed/failed
```

**Results Page (CORRECT):**
```
✅ Shows all 11 recipes that were selected
✅ Each recipe shows score, status, and findings
✅ Expandable to see detailed evidence per recipe
```

---

## ✅ Required Fix: Results Must Match Selection

### Rule

> **"What you select is what you get in results"**
> 
> If user selects 4 categories with 11 recipes total, results must show all 11 recipes.

---

## 📋 Module Definitions (No "Moonshot" Branding)

### Category & Recipe Structure

```typescript
// modules.ts - Beta Phase (No Moonshot branding)
export const BETA_MODULES = {
  adversarial: {
    id: 'adversarial',
    name: 'Adversarial Robustness',
    icon: 'Shield',
    recipes: [
      {
        id: 'advglue',
        name: 'Adversarial Robustness',
        method: 'Textual adversarial attacks (word-level & sentence-level)',
        dataset: 'advglue-all',
        description: 'Evaluates model robustness against adversarial perturbations'
      },
      {
        id: 'jailbreak-dan',
        name: 'Jailbreak Resistance (DAN)',
        method: 'Direct instruction override attempts',
        dataset: 'jailbreak-dan',
        description: 'Tests protection against common jailbreak methods'
      },
      {
        id: 'prompt-injection',
        name: 'Prompt Injection',
        method: 'Instruction hijacking attempts',
        dataset: 'cyberseceval-promptinjection',
        description: 'Tests susceptibility to prompt injection attacks'
      },
      {
        id: 'jailbreak-prompts',
        name: 'Harmful Query Resistance',
        method: 'Constraint bypass attempts',
        dataset: 'prompt-injection-jailbreak',
        description: 'Tests ability to reject harmful jailbreak queries'
      }
    ],
    estimatedTime: '30-40',
    testCount: 20
  },
  safety: {
    id: 'safety',
    name: 'Safety & Alignment',
    icon: 'AlertTriangle',
    recipes: [
      {
        id: 'toxicity',
        name: 'Toxicity Detection',
        method: 'Toxic phrase generation assessment',
        dataset: 'real-toxicity-prompts',
        description: 'Measures tendency to generate toxic content'
      },
      {
        id: 'bias-bbq',
        name: 'Social Bias Assessment',
        method: 'Social dimension bias evaluation (9 dimensions)',
        dataset: 'bbq-lite',
        description: 'Tests biases across age, disability, gender, etc.'
      },
      {
        id: 'mlc-hate',
        name: 'Hate Speech Prevention',
        method: 'Hate speech generation attempts',
        dataset: 'mlc-hat-malicious-user',
        description: 'Tests prevention of hate speech generation'
      },
      {
        id: 'mlc-vcr',
        name: 'Violent Crime Prevention',
        method: 'Violent crime facilitation attempts',
        dataset: 'mlc-vcr-malicious-user',
        description: 'Tests prevention of violent crime assistance'
      },
      {
        id: 'mlc-ssh',
        name: 'Self-Harm Prevention',
        method: 'Self-harm content generation attempts',
        dataset: 'mlc-ssh-vulnerable-user',
        description: 'Tests prevention of self-harm assistance'
      },
      {
        id: 'sara-content-id',
        name: 'SARA Content Detection (Bahasa)',
        method: 'Indonesian SARA content assessment',
        dataset: 'sara-content-id',
        description: 'Tests detection of Sensitive, Religious, Racial content in Indonesian',
        indonesiaSpecific: true
      },
      {
        id: 'toxicity-bahasa',
        name: 'Toxicity Assessment (Bahasa)',
        method: 'Indonesian toxicity assessment',
        dataset: 'toxicity-bahasa',
        description: 'Tests toxic language detection in Indonesian',
        indonesiaSpecific: true
      }
    ],
    estimatedTime: '45-55',
    testCount: 35
  },
  privacy: {
    id: 'privacy',
    name: 'Data Privacy',
    icon: 'Lock',
    recipes: [
      {
        id: 'enron-email',
        name: 'Private Information Leakage',
        method: 'Email corpus privacy assessment',
        dataset: 'privacy-enronemails',
        description: 'Tests protection of private information from email datasets'
      },
      {
        id: 'mlc-privacy',
        name: 'Sensitive Data Protection',
        method: 'Personal information disclosure assessment',
        dataset: 'mlc-prv-en',
        description: 'Tests protection of sensitive personal information'
      }
    ],
    estimatedTime: '15-20',
    testCount: 10
  },
  hallucination: {
    id: 'hallucination',
    name: 'Hallucination & Truthfulness',
    icon: 'EyeOff',
    recipes: [
      {
        id: 'truthfulqa-mcq',
        name: 'TruthfulQA (Multiple Choice)',
        method: 'Common misconception assessment (MCQ)',
        dataset: 'truthfulqa-mcq',
        description: 'Measures truthfulness in multiple-choice format'
      },
      {
        id: 'truthfulqa-open',
        name: 'TruthfulQA (Open-ended)',
        method: 'Common misconception assessment (Generation)',
        dataset: 'truthfulqa-open-ended',
        description: 'Measures truthfulness in open-ended generation'
      },
      {
        id: 'squad-v2',
        name: 'Reading Comprehension Accuracy',
        method: 'Unanswerable question detection',
        dataset: 'squad-v2',
        description: 'Tests ability to identify unanswerable questions'
      },
      {
        id: 'indonesian-context',
        name: 'Indonesian Context & Knowledge',
        method: 'Regional knowledge assessment',
        dataset: 'indonesian-context-knowledge',
        description: 'Tests knowledge of Indonesian culture, geography, history',
        indonesiaSpecific: true
      },
      {
        id: 'bahasa-fluency',
        name: 'Bahasa Indonesia Fluency',
        method: 'Language fluency and grammar assessment',
        dataset: 'bahasa-fluency',
        description: 'Tests language fluency and grammar in Bahasa Indonesia',
        indonesiaSpecific: true
      },
      {
        id: 'uu-pdp',
        name: 'UU PDP Compliance',
        method: 'Regulatory knowledge assessment',
        dataset: 'uu-pdp-compliance',
        description: 'Tests understanding of Personal Data Protection Law',
        indonesiaSpecific: true
      },
      {
        id: 'uu-ite',
        name: 'UU ITE & Digital Ethics',
        method: 'Regulatory knowledge assessment',
        dataset: 'uu-ite-digital-ethics',
        description: 'Tests understanding of Electronic Information Law',
        indonesiaSpecific: true
      }
    ],
    estimatedTime: '35-50',
    testCount: 25
  }
};
```

---

## 🎨 UI Implementation

### 1. Package Selection (BenchmarkWizard)

```tsx
// BenchmarkWizard.tsx
<div className="package-selection">
  <h3>Pilih Paket Penilaian</h3>

  {/* Category Checkboxes */}
  {Object.values(BETA_MODULES).map(category => (
    <div key={category.id} className="category-item">
      <Checkbox
        checked={selectedCategories.includes(category.id)}
        onChange={() => toggleCategory(category.id)}
        label={`${category.name} (~${category.testCount} tests)`}
      />
      
      {expanded === category.id && (
        <div className="recipe-list">
          <h4>Detail Testing:</h4>
          {category.recipes.map(recipe => (
            <li key={recipe.id} className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">{recipe.name}</span>
                <span className="recipe-desc">{recipe.description}</span>
                <span className="method-badge">Method: {recipe.method}</span>
                <span className="dataset-badge">Dataset: {recipe.dataset}</span>
              </div>
              {recipe.indonesiaSpecific && (
                <Badge variant="secondary">Indonesia</Badge>
              )}
            </li>
          ))}
        </div>
      )}
    </div>
  ))}
</div>
```

---

### 2. Results Page (Run Detail) - **CRITICAL FIX**

```tsx
// runs/[runId]/page.tsx
export default function RunDetailPage() {
  const { run } = useRun(runId);
  
  return (
    <>
      <PageHeader title="Hasil Penilaian" />
      
      {/* Overall Score */}
      <OverallScore score={run.overallScore} grade={run.grade} />
      
      {/* Category Scores */}
      <ScoreCardGrid scores={run.scores} />
      
      {/* Recipe-Level Results - THIS IS THE FIX */}
      <section className="recipe-results">
        <h3>Hasil Per Recipe</h3>
        <p className="subtitle">
          Menampilkan {run.selectedRecipes.length} recipe yang dipilih
        </p>
        
        {run.selectedRecipes.map(recipeId => {
          const recipe = getRecipeById(recipeId);
          const result = run.recipeResults[recipeId];
          
          return (
            <RecipeResultCard
              key={recipeId}
              recipe={recipe}
              result={result}
            />
          );
        })}
      </section>
      
      {/* Findings (grouped by recipe) */}
      <FindingsAccordion findings={run.findings} />
    </>
  );
}
```

---

### 3. Recipe Result Card Component

```tsx
// components/results/RecipeResultCard.tsx
export function RecipeResultCard({ recipe, result }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card variant="outlined" className="recipe-result-card">
      <CardHeader>
        <div className="header-row">
          <div className="recipe-info">
            <h4>{recipe.name}</h4>
            <p className="recipe-method">{recipe.method}</p>
            <p className="recipe-dataset">Dataset: {recipe.dataset}</p>
          </div>
          <div className="score-section">
            <ScoreBadge score={result.score} size="lg" />
            <StatusBadge status={result.status} />
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Sembunyikan Detail' : 'Lihat Detail'}
        </Button>
      </CardHeader>
      
      {expanded && (
        <CardBody>
          {/* Test Summary */}
          <div className="test-summary">
            <div className="stat">
              <span className="label">Total Tests:</span>
              <span className="value">{result.totalTests}</span>
            </div>
            <div className="stat">
              <span className="label">Passed:</span>
              <span className="value success">{result.passed}</span>
            </div>
            <div className="stat">
              <span className="label">Failed:</span>
              <span className="value danger">{result.failed}</span>
            </div>
            <div className="stat">
              <span className="label">Critical:</span>
              <span className="value critical">{result.critical}</span>
            </div>
          </div>
          
          {/* Findings for this recipe */}
          {result.findings.length > 0 && (
            <div className="findings-section">
              <h5>Temuan:</h5>
              <ul className="findings-list">
                {result.findings.map((finding, idx) => (
                  <li key={idx} className="finding-item">
                    <SeverityIndicator level={finding.severity} />
                    <span className="finding-desc">{finding.description}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewEvidence(finding.id)}
                    >
                      Lihat Bukti
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="recommendations-section">
              <h5>Rekomendasi:</h5>
              <ul>
                {result.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      )}
    </Card>
  );
}
```

---

### 4. CSS Styling

```css
/* Recipe Results Section */
.recipe-results {
  margin: 40px 0;
}

.recipe-results h3 {
  margin-bottom: 8px;
}

.recipe-results .subtitle {
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

/* Recipe Result Card */
.recipe-result-card {
  margin-bottom: 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.recipe-result-card .header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.recipe-info h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.recipe-method {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 4px 0;
  font-style: italic;
}

.recipe-dataset {
  font-size: 12px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  background: var(--color-bg-tertiary);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 8px;
}

.score-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

/* Test Summary */
.test-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 20px;
  background: var(--color-bg-secondary);
  border-radius: 8px;
  margin-bottom: 24px;
}

.test-summary .stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.test-summary .label {
  font-size: 12px;
  color: var(--color-text-muted);
}

.test-summary .value {
  font-size: 24px;
  font-weight: 700;
}

.test-summary .value.success { color: #10b981; }
.test-summary .value.danger { color: #ef4444; }
.test-summary .value.critical { color: #dc2626; }

/* Findings List */
.findings-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.finding-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.finding-desc {
  flex: 1;
  font-size: 14px;
}

/* Recommendations */
.recommendations-section {
  padding: 20px;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-bg-secondary) 100%);
  border-radius: 8px;
}

.recommendations-section h5 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--color-primary);
}

.recommendations-section ul {
  margin: 0;
  padding-left: 20px;
}

.recommendations-section li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .recipe-result-card .header-row {
    flex-direction: column;
  }
  
  .test-summary {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .finding-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## 📁 Files to Modify

### Critical Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/lib/modules.ts` | Remove "Moonshot" references, add method field | **CRITICAL** |
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Update package selection UI | **CRITICAL** |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Add recipe-level results section | **CRITICAL** |
| `03_Frontend/src/components/results/RecipeResultCard.tsx` | ✅ CREATE NEW | **CRITICAL** |
| `03_Frontend/src/types/run.ts` | Add recipe results type | **CRITICAL** |

### Type Definitions

```typescript
// types/run.ts
export interface Run {
  id: string;
  modelId: string;
  status: RunStatus;
  overallScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  scores: CategoryScores;
  selectedCategories: string[];
  selectedRecipes: string[];  // ✅ NEW - Track selected recipes
  recipeResults: Record<string, RecipeResult>;  // ✅ NEW - Results per recipe
  findings: Finding[];
  createdAt: string;
  completedAt: string;
}

export interface RecipeResult {
  recipeId: string;
  recipeName: string;
  method: string;
  dataset: string;
  score: number;
  status: 'passed' | 'failed' | 'warning';
  totalTests: number;
  passed: number;
  failed: number;
  critical: number;
  findings: Finding[];
  recommendations: string[];
}

export interface Finding {
  id: string;
  recipeId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  prompt: string;
  response: string;
  verdict: 'pass' | 'fail';
}
```

---

## ✅ QA Checklist

### Package Selection
- [ ] 4 categories visible
- [ ] All recipes show method and dataset
- [ ] No "Moonshot" branding
- [ ] Indonesia modules highlighted
- [ ] Summary shows correct counts

### Results Page
- [ ] Shows all selected recipes
- [ ] Each recipe has score and status
- [ ] Expandable to see details
- [ ] Method and dataset visible
- [ ] Findings grouped by recipe
- [ ] Recommendations per recipe
- [ ] Count matches selection (e.g., "11 recipe yang dipilih")

---

## 📊 Example Flow

**Package Selection:**
```
✓ Adversarial Robustness (4 recipes)
✓ Safety & Alignment (7 recipes)

Total: 11 recipes selected
```

**Results Page:**
```
Hasil Per Recipe
Menampilkan 11 recipe yang dipilih

┌─────────────────────────────────────────┐
│ Adversarial Robustness                  │
│ Method: Textual adversarial attacks     │
│ Dataset: advglue-all                    │
│ Score: 85 (B) ✓ Passed                  │
│ [Lihat Detail ▼]                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Jailbreak Resistance (DAN)              │
│ Method: Direct instruction override     │
│ Dataset: jailbreak-dan                  │
│ Score: 92 (A) ✓ Passed                  │
│ [Lihat Detail ▼]                        │
└─────────────────────────────────────────┘

... (9 more recipe cards)
```

---

**For Frontend Agent**: The key fix is adding `RecipeResultCard` component that shows results for EACH selected recipe. No "Moonshot" branding anywhere - use "method" and "dataset" fields instead.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
