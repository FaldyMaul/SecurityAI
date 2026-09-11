# AI Sandbox – Recipe Results Table UI v12.0 (Restored with Improvements)

> **Purpose**: Restore table-based UI with category filter + Add recipe details + Fix duplication
> **Version**: 12.0 (Table UI Restored)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - User prefers table UI with filtering

---

## ✅ What User Wants

**Keep existing table UI because:**
1. ✅ Can filter by category
2. ✅ Can see all recipes at once
3. ✅ Can click to see prompt details
4. ✅ Familiar, clean layout

**Add improvements:**
1. ✅ Show method and dataset (no "Moonshot" branding)
2. ✅ Add brief findings & recommendations in expandable row
3. ✅ Remove duplication between sections
4. ✅ Keep prompt detail view accessible

---

## 🎨 UI Design (Table-Based with Improvements)

### 1. Results Page Layout

```tsx
// runs/[runId]/page.tsx
export default function RunDetailPage() {
  const { run } = useRun(runId);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  
  // Filter recipes by category
  const filteredRecipes = selectedCategory
    ? run.selectedRecipes.filter(id => {
        const recipe = getRecipeById(id);
        return getCategoryByRecipe(id) === selectedCategory;
      })
    : run.selectedRecipes;
  
  return (
    <>
      <PageHeader title="Hasil Penilaian" />
      
      {/* Overall Score */}
      <OverallScore score={run.overallScore} grade={run.grade} />
      
      {/* Category Scores */}
      <ScoreCardGrid scores={run.scores} />
      
      {/* Category Filter Tabs */}
      <div className="category-filter">
        <Tabs value={selectedCategory} onChange={setSelectedCategory}>
          <Tab value={null} label="Semua Recipe" />
          <Tab value="adversarial" label="Adversarial Robustness" />
          <Tab value="safety" label="Safety & Alignment" />
          <Tab value="privacy" label="Data Privacy" />
          <Tab value="hallucination" label="Hallucination & Truthfulness" />
        </Tabs>
      </div>
      
      {/* Recipe Results Table */}
      <div className="recipe-table-container">
        <table className="recipe-table">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Recipe</th>
              <th style={{ width: '15%' }}>Method</th>
              <th style={{ width: '15%' }}>Dataset</th>
              <th style={{ width: '10%' }}>Score</th>
              <th style={{ width: '10%' }}>Status</th>
              <th style={{ width: '10%' }}>Aksi</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map(recipeId => {
              const recipe = getRecipeById(recipeId);
              const result = run.recipeResults[recipeId];
              const isExpanded = expandedRecipe === recipeId;
              
              return (
                <Fragment key={recipeId}>
                  {/* Main Row */}
                  <tr className={`recipe-row ${isExpanded ? 'expanded' : ''}`}>
                    <td>
                      <div className="recipe-info">
                        <span className="recipe-name">{recipe.name}</span>
                        {recipe.indonesiaSpecific && (
                          <Badge variant="secondary">🇮🇩 Indonesia</Badge>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="recipe-method">{recipe.method}</span>
                    </td>
                    <td>
                      <span className="recipe-dataset">{recipe.dataset}</span>
                    </td>
                    <td>
                      <ScoreBadge score={result.score} size="sm" />
                    </td>
                    <td>
                      <StatusBadge status={result.status} />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewPromptDetail(recipeId)}
                        >
                          Lihat Prompt
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(recipeId)}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row - Findings & Recommendations */}
                  {isExpanded && (
                    <tr className="expanded-content">
                      <td colSpan={7}>
                        <div className="expanded-details">
                          {/* Brief Findings */}
                          {result.findings.length > 0 && (
                            <div className="findings-brief">
                              <h5>Temuan ({result.findings.length})</h5>
                              <ul className="findings-brief-list">
                                {result.findings.slice(0, 3).map((finding, idx) => (
                                  <li key={idx} className="finding-brief-item">
                                    <SeverityIndicator level={finding.severity} />
                                    <span className="finding-brief-desc">
                                      {finding.description}
                                    </span>
                                  </li>
                                ))}
                                {result.findings.length > 3 && (
                                  <li className="view-all-link">
                                    <Button
                                      variant="link"
                                      size="sm"
                                      onClick={() => viewAllFindings(recipeId)}
                                    >
                                      Lihat semua {result.findings.length} temuan →
                                    </Button>
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                          
                          {/* Brief Recommendations */}
                          {result.recommendations.length > 0 && (
                            <div className="recommendations-brief">
                              <h5>Rekomendasi</h5>
                              <ul className="recommendations-brief-list">
                                {result.recommendations.slice(0, 2).map((rec, idx) => (
                                  <li key={idx}>{rec}</li>
                                ))}
                                {result.recommendations.length > 2 && (
                                  <li className="view-all-link">
                                    <Button
                                      variant="link"
                                      size="sm"
                                      onClick={() => viewAllRecommendations(recipeId)}
                                    >
                                      Lihat semua {result.recommendations.length} rekomendasi →
                                    </Button>
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Prompt Detail Modal (Separate - Already exists) */}
      <PromptDetailModal
        isOpen={promptModalOpen}
        onClose={() => setPromptModalOpen(false)}
        recipeId={selectedPromptRecipe}
      />
    </>
  );
}
```

---

### 2. CSS Styling (Table-Based)

```css
/* Category Filter */
.category-filter {
  margin: 32px 0 24px 0;
}

/* Recipe Table */
.recipe-table-container {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: white;
}

.recipe-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.recipe-table thead {
  background: var(--color-bg-secondary);
  border-bottom: 2px solid var(--color-border);
}

.recipe-table th {
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  color: var(--color-text-primary);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.recipe-table tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: all var(--transition-fast);
}

.recipe-table tbody tr:hover {
  background: var(--color-bg-tertiary);
}

.recipe-table tbody tr.expanded {
  background: var(--color-bg-tertiary);
  border-bottom: none;
}

.recipe-table td {
  padding: 16px 12px;
  vertical-align: middle;
}

/* Recipe Info */
.recipe-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.recipe-name {
  font-weight: 600;
  color: var(--color-text-primary);
}

.recipe-method,
.recipe-dataset {
  font-size: 13px;
  color: var(--color-text-secondary);
  font-style: italic;
}

.recipe-dataset {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--color-bg-tertiary);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* Expanded Content */
.expanded-content {
  background: white;
  border-bottom: 1px solid var(--color-border);
}

.expanded-details {
  padding: 20px;
  display: grid;
  gap: 20px;
}

/* Brief Findings */
.findings-brief h5,
.recommendations-brief h5 {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 600;
  text-transform: uppercase;
}

.findings-brief-list,
.recommendations-brief-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.finding-brief-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.6;
}

.finding-brief-desc {
  flex: 1;
  color: var(--color-text-secondary);
}

.view-all-link {
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 500;
}

.view-all-link button {
  padding: 0;
  font-size: 13px;
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .recipe-table {
    font-size: 13px;
  }
  
  .recipe-table th,
  .recipe-table td {
    padding: 12px 8px;
  }
  
  .recipe-method {
    display: none; /* Hide method column on tablet */
  }
}

@media (max-width: 768px) {
  .recipe-table-container {
    overflow-x: scroll;
  }
  
  .recipe-table {
    min-width: 800px; /* Enable horizontal scroll */
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
```

---

### 3. Key Differences from v11

| Aspect | v11 (Card UI) | v12 (Table UI - Restored) |
|--------|---------------|---------------------------|
| **Layout** | Individual cards | Table with rows |
| **Filtering** | No category filter | ✅ Category filter tabs |
| **Overview** | One card at a time | ✅ All recipes visible |
| **Prompt Detail** | Inside card | ✅ Separate modal (existing) |
| **Findings** | All in card | ✅ Brief in row, link to all |
| **Recommendations** | All in card | ✅ Brief in row, link to all |
| **Scrolling** | Vertical scroll | ✅ Horizontal scroll on mobile |

---

## 📊 Example Flow

**Results Page:**
```
┌──────────────────────────────────────────────────────────────────┐
│ Hasil Penilaian                                                  │
│ Overall Score: 85 (B)                                            │
├──────────────────────────────────────────────────────────────────┤
│ [Semua] [Adversarial] [Safety] [Privacy] [Hallucination]        │
├──────────────────────────────────────────────────────────────────┤
│ Recipe         │ Method        │ Dataset │ Score │ Status │ ⚙️  │
├────────────────┼───────────────┼─────────┼───────┼────────┼─────┤
│ Adversarial    │ Textual       │ advglue │ 85(B) │ ✓ Pass │ 👁 ▼│
│ Robustness     │ adversarial   │ -all    │       │        │     │
│ [🇮🇩 Indonesia]│               │         │       │        │     │
├────────────────┴───────────────┴─────────┴───────┴────────┴─────┤
│ ▼ Temuan (2)                                                     │
│   ⚠ Model failed adversarial test                               │
│   ℹ Low severity issue                                           │
│   Lihat semua 2 temuan →                                         │
│                                                                  │
│ Rekomendasi                                                      │
│   • Implement input filtering                                    │
│   • Add adversarial training                                     │
│   Lihat semua 3 rekomendasi →                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Files to Modify

### Critical Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Restore table UI with category filter | **CRITICAL** |
| `03_Frontend/src/components/results/RecipeResultsTable.tsx` | ✅ CREATE NEW (or restore from backup) | **CRITICAL** |
| `03_Frontend/src/styles/variables.css` | Add table-specific styles | **HIGH** |
| `03_Frontend/src/lib/modules.ts` | Keep recipe definitions | **HIGH** |

### What to Keep from v11

| Component | Keep? | Reason |
|-----------|-------|--------|
| `ConsolidatedRecipeCard.tsx` | ❌ Delete | Card UI not needed |
| Recipe data structure | ✅ Keep | Same data, different UI |
| Method & dataset fields | ✅ Keep | Show in table columns |
| Prompt detail modal | ✅ Keep | Already exists, works well |

---

## ✅ QA Checklist

### Table UI
- [ ] Table shows all recipes
- [ ] Category filter tabs work
- [ ] Can filter by category
- [ ] "Semua Recipe" shows all
- [ ] Recipe name, method, dataset visible
- [ ] Score and status in columns
- [ ] "Lihat Prompt" button works
- [ ] Expand/collapse arrow works

### Expanded Row
- [ ] Brief findings shown (first 3)
- [ ] "Lihat semua" link if more
- [ ] Brief recommendations (first 2)
- [ ] "Lihat semua" link if more
- [ ] No duplication with other sections

### Prompt Detail
- [ ] Modal opens on click
- [ ] Shows full prompt/response
- [ ] Shows verdict
- [ ] Can close modal
- [ ] Works on mobile

---

## 🎨 Visual Comparison

### v11 (Card UI - Rejected)
```
┌─────────────────────────────┐
│ Recipe Name                 │
│ Method                      │
│ Dataset                     │
│ Score: 85 (B)               │
│ [Lihat Detail ▼]            │
└─────────────────────────────┘
┌─────────────────────────────┐
│ Recipe Name                 │
│ Method                      │
│ Dataset                     │
│ Score: 92 (A)               │
│ [Lihat Detail ▼]            │
└─────────────────────────────┘
... (scroll, scroll, scroll)
```

### v12 (Table UI - Restored) ✅
```
┌────────────────────────────────────────────────┐
│ [Semua] [Adversarial] [Safety] [Privacy] [...]│
├────────────────────────────────────────────────┤
│ Recipe │ Method │ Dataset │ Score │ Status │ ⚙️│
├────────┼────────┼─────────┼───────┼────────┼──┤
│ Recipe1│ Method1│ Data1   │ 85(B) │ ✓ Pass │👁▼│
│ Recipe2│ Method2│ Data2   │ 92(A) │ ✓ Pass │👁▼│
│ Recipe3│ Method3│ Data3   │ 78(C) │ ⚠ Warn │👁▼│
└────────────────────────────────────────────────┘
✅ All visible at once
✅ Can filter by category
✅ Clean, familiar layout
```

---

**For Frontend Agent**: Restore table-based UI from previous version. Add category filter tabs. Add method and dataset columns. Keep "Lihat Prompt" button. Add expandable row with brief findings & recommendations. NO card UI.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
