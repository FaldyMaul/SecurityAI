# AI Sandbox – Consolidated Recipe Results UI v11.0

> **Purpose**: Consolidate "Rincian Recipe" and "Hasil Per Recipe" into single unified view
> **Version**: 11.0 (UI Consolidation)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Remove duplication, streamline UX

---

## 🚨 Problem: Duplicate Information

### Current Issue

**Two separate sections showing same data:**

```
Section 1: Rincian Recipe (Package Selection)
├─ Recipe name
├─ Method
├─ Dataset
└─ Test count

Section 2: Hasil Per Recipe (Results)
├─ Recipe name
├─ Method
├─ Dataset
├─ Score
├─ Status
├─ Test summary
├─ Findings
└─ Recommendations
```

**Problem:**
- ❌ Information is duplicated
- ❌ Too long, users scroll too much
- ❌ Confusing - which section to look at?
- ❌ Same recipe info shown twice

---

## ✅ Solution: Single Unified View

### Design Principle

> **"One recipe, one card, all information"**

Each recipe gets ONE card that shows:
- **Before run**: Selection info (name, method, dataset, test count)
- **After run**: Results info (score, status, findings, recommendations)

No duplication. Clean. Scannable.

---

## 🎨 Unified UI Design

### 1. Package Selection (Before Run)

```tsx
// BenchmarkWizard.tsx
<div className="package-selection">
  <h3>Pilih Paket Penilaian</h3>
  
  {/* Category Checkboxes */}
  {Object.values(BETA_MODULES).map(category => (
    <div key={category.id} className="category-card">
      <div className="category-header">
        <Checkbox
          checked={selectedCategories.includes(category.id)}
          onChange={() => toggleCategory(category.id)}
          label={
            <div className="category-label">
              {category.icon}
              <span>{category.name}</span>
              <Badge variant="info">~{category.testCount} tests</Badge>
            </div>
          }
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleExpand(category.id)}
        >
          <ChevronDown className={expanded === category.id ? 'rotate-180' : ''} />
        </Button>
      </div>

      {expanded === category.id && (
        <div className="recipe-list">
          <h4>Detail Testing:</h4>
          {category.recipes.map(recipe => (
            <div key={recipe.id} className="recipe-item">
              <div className="recipe-info">
                <span className="recipe-name">{recipe.name}</span>
                <span className="recipe-method">{recipe.method}</span>
                <span className="recipe-dataset">Dataset: {recipe.dataset}</span>
              </div>
              {recipe.indonesiaSpecific && (
                <Badge variant="secondary">Indonesia</Badge>
              )}
            </div>
          ))}
          <p className="category-meta">Estimasi: {category.estimatedTime} menit</p>
        </div>
      )}
    </div>
  ))}

  {/* Summary */}
  <div className="selection-summary">
    <h4>Ringkasan Pilihan:</h4>
    <div className="summary-stats">
      <div className="stat">
        <span className="label">Kategori:</span>
        <span className="value">{selectedCategories.length} dari 4</span>
      </div>
      <div className="stat">
        <span className="label">Total recipe:</span>
        <span className="value">{calculateTotalRecipes()} recipe</span>
      </div>
      <div className="stat">
        <span className="label">Estimasi waktu:</span>
        <span className="value">{calculateTotalTime()} menit</span>
      </div>
    </div>
  </div>

  {/* Actions */}
  <div className="actions">
    <Button variant="outline" onClick={onCancel}>Batal</Button>
    <Button variant="primary" onClick={handleStart}>Jalankan Benchmark</Button>
  </div>
</div>
```

---

### 2. Results Page (After Run) - CONSOLIDATED

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
      
      {/* CONSOLIDATED: Recipe Results with Details */}
      <section className="recipe-results">
        <h3>Hasil Detail Per Recipe</h3>
        <p className="subtitle">
          Menampilkan {run.selectedRecipes.length} recipe yang diuji
        </p>
        
        {run.selectedRecipes.map(recipeId => {
          const recipe = getRecipeById(recipeId);
          const result = run.recipeResults[recipeId];
          
          return (
            <ConsolidatedRecipeCard
              key={recipeId}
              recipe={recipe}
              result={result}
            />
          );
        })}
      </section>
      
      {/* Summary Findings (Optional - only if user wants to see all) */}
      {showAllFindings && (
        <AllFindingsAccordion findings={run.findings} />
      )}
    </>
  );
}
```

---

### 3. Consolidated Recipe Card Component

```tsx
// components/results/ConsolidatedRecipeCard.tsx
export function ConsolidatedRecipeCard({ recipe, result }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card variant="outlined" className="consolidated-card">
      {/* Card Header - Always Visible */}
      <CardHeader>
        <div className="header-grid">
          {/* Left: Recipe Info */}
          <div className="recipe-info">
            <div className="title-row">
              <h4>{recipe.name}</h4>
              {recipe.indonesiaSpecific && (
                <Badge variant="secondary">🇮🇩 Indonesia</Badge>
              )}
            </div>
            <p className="recipe-method">{recipe.method}</p>
            <p className="recipe-dataset">Dataset: {recipe.dataset}</p>
          </div>
          
          {/* Right: Score & Status */}
          <div className="score-section">
            <ScoreBadge score={result.score} size="lg" />
            <StatusBadge status={result.status} />
          </div>
        </div>
        
        {/* Expand Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="expand-toggle"
        >
          {expanded ? 'Sembunyikan Detail' : 'Lihat Detail'}
          <ChevronDown className={expanded ? 'rotate-180' : ''} />
        </Button>
      </CardHeader>
      
      {/* Card Body - Expandable */}
      {expanded && (
        <CardBody>
          {/* Test Summary */}
          <div className="test-summary">
            <div className="stat">
              <span className="label">Total Tests</span>
              <span className="value">{result.totalTests}</span>
            </div>
            <div className="stat">
              <span className="label">Passed</span>
              <span className="value success">{result.passed}</span>
            </div>
            <div className="stat">
              <span className="label">Failed</span>
              <span className="value danger">{result.failed}</span>
            </div>
            <div className="stat">
              <span className="label">Critical</span>
              <span className="value critical">{result.critical}</span>
            </div>
          </div>
          
          {/* Findings */}
          {result.findings.length > 0 && (
            <div className="findings-section">
              <h5>Temuan ({result.findings.length})</h5>
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
              <h5>Rekomendasi</h5>
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

## 🎨 CSS Styling

```css
/* Consolidated Card */
.consolidated-card {
  margin-bottom: 20px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all var(--transition-fast);
}

.consolidated-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(21, 69, 188, 0.1);
}

/* Header Grid */
.header-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: flex-start;
}

.recipe-info .title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.recipe-info h4 {
  margin: 0;
  font-size: 18px;
  flex: 1;
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

/* Score Section */
.score-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 120px;
}

/* Expand Toggle */
.expand-toggle {
  margin-top: 16px;
  width: 100%;
  justify-content: center;
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  border-radius: 0 0 12px 12px;
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
  text-align: center;
}

.test-summary .label {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 500;
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
  margin: 0 0 24px 0;
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
  font-weight: 600;
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

/* Mobile Responsive */
@media (max-width: 768px) {
  .header-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .score-section {
    align-items: flex-start;
  }
  
  .test-summary {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .finding-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .finding-item .btn {
    width: 100%;
    justify-content: center;
  }
}
```

---

## 📊 Before vs After Comparison

### Before (Duplicate)

```
Page 1: Package Selection
├─ Recipe name
├─ Method
├─ Dataset
└─ Test count

Page 2: Results
├─ Recipe name (DUPLICATE)
├─ Method (DUPLICATE)
├─ Dataset (DUPLICATE)
├─ Score
├─ Status
├─ Test summary
├─ Findings
└─ Recommendations

Total: 2 sections, lots of scrolling, duplicate info
```

### After (Consolidated)

```
Page 1: Package Selection
├─ Recipe name
├─ Method
├─ Dataset
└─ Test count

Page 2: Results (CONSOLIDATED)
└─ Recipe Card (expandable)
   ├─ Recipe name, method, dataset (header)
   ├─ Score & Status (header)
   └─ Details (expandable)
      ├─ Test summary
      ├─ Findings
      └─ Recommendations

Total: 1 section per recipe, clean, scannable, no duplication
```

---

## 📁 Files to Modify

### Critical Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/results/ConsolidatedRecipeCard.tsx` | ✅ CREATE NEW | **CRITICAL** |
| `03_Frontend/src/components/results/RecipeResultCard.tsx` | ❌ DELETE (replaced) | **CRITICAL** |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Use consolidated card | **CRITICAL** |
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Simplify package selection | **HIGH** |

---

## ✅ UX Benefits

### Before
- ❌ Two separate sections
- ❌ Duplicate information
- ❌ Too much scrolling
- ❌ Confusing navigation
- ❌ Information overload

### After
- ✅ One card per recipe
- ✅ No duplication
- ✅ Clean, scannable layout
- ✅ Expandable details (user controls what to see)
- ✅ Consistent between selection and results

---

## ✅ QA Checklist

### Package Selection
- [ ] Recipe info visible (name, method, dataset)
- [ ] No "Moonshot" branding
- [ ] Indonesia modules highlighted
- [ ] Summary shows correct counts

### Results Page
- [ ] One card per recipe
- [ ] Header shows recipe info + score
- [ ] Details expandable
- [ ] No duplicate sections
- [ ] Findings grouped in card
- [ ] Recommendations in card
- [ ] Clean, scannable layout

---

## 📊 Example Flow

**Package Selection:**
```
✓ Adversarial Robustness (4 recipe)
  Detail Testing:
  • Adversarial Robustness
    Method: Textual adversarial attacks
    Dataset: advglue-all
  • Jailbreak Resistance (DAN)
    Method: Direct instruction override
    Dataset: jailbreak-dan
  ... (2 more)
```

**Results (CONSOLIDATED):**
```
Hasil Detail Per Recipe
Menampilkan 4 recipe yang diuji

┌───────────────────────────────────────────┐
│ Adversarial Robustness    [🇮🇩 Indonesia] │
│ Method: Textual adversarial attacks       │
│ Dataset: advglue-all                      │
│                           Score: 85 (B)   │
│                           ✓ Passed        │
├───────────────────────────────────────────┤
│ [Lihat Detail ▼]                          │
└───────────────────────────────────────────┘

[User clicks "Lihat Detail"]

┌───────────────────────────────────────────┐
│ Adversarial Robustness    [🇮🇩 Indonesia] │
│ Method: Textual adversarial attacks       │
│ Dataset: advglue-all                      │
│                           Score: 85 (B)   │
│                           ✓ Passed        │
├───────────────────────────────────────────┤
│ Test Summary:                             │
│ Total: 20  Passed: 18  Failed: 2  Crit: 1│
│                                           │
│ Temuan (2):                               │
│ ⚠ Model failed adversarial test          │
│   [Lihat Bukti]                           │
│                                           │
│ Rekomendasi:                              │
│ • Implement input filtering               │
│ • Add adversarial training                │
└───────────────────────────────────────────┘
```

---

**For Frontend Agent**: Create `ConsolidatedRecipeCard.tsx` that combines recipe info + results in one expandable card. Delete old `RecipeResultCard.tsx`. No duplication between sections.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
