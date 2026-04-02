# AI Sandbox – Table UI Integration Guide v13.0

> **Purpose**: Integrate existing PromptDetailModal with Table UI
> **Version**: 13.0 (Integration with Existing Components)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Use existing components

---

## ✅ Components Already Exist!

**Good news - components already built:**

| Component | Location | Status |
|-----------|----------|--------|
| `PromptDetailModal.tsx` | `03_Frontend/src/components/results/` | ✅ Already exists |
| `EvidencePanel.tsx` | `03_Frontend/src/components/findings/` | ✅ Already exists |
| `FindingsAccordion.tsx` | `03_Frontend/src/components/findings/` | ✅ Already exists |

**What needs to be done:**
1. ✅ Integrate `PromptDetailModal` with table
2. ✅ Add "Lihat Detail" button that opens modal
3. ✅ Pass correct recipe data to modal

---

## 🎨 Integration: Table + PromptDetailModal

### 1. Update RecipeResultsTable.tsx

```tsx
// components/results/RecipeResultsTable.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';

import type { Run, SelectedRecipeResult } from '@/types/run';
import { Button } from '@/components/shared/Button';
import { ScoreBadge } from '@/components/score/ScoreBadge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PromptDetailModal } from '@/components/results/PromptDetailModal';
import { FindingsAccordion } from '@/components/findings/FindingsAccordion';

import styles from './RecipeResultsTable.module.css';

interface RecipeResultsTableProps {
  run: Run;
  selectedCategory: string | null;
}

export function RecipeResultsTable({ run, selectedCategory }: RecipeResultsTableProps) {
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<SelectedRecipeResult | null>(null);
  
  // Filter by category
  const filteredRecipes = selectedCategory
    ? run.selectedRecipes.filter(id => {
        const recipe = getRecipeById(id);
        return getCategoryByRecipe(id) === selectedCategory;
      })
    : run.selectedRecipes;
  
  const handleViewDetail = (recipeId: string) => {
    const recipe = run.recipeResults[recipeId];
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };
  
  const toggleExpand = (recipeId: string) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };
  
  return (
    <>
      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Recipe</th>
              <th style={{ width: '20%' }}>Method</th>
              <th style={{ width: '15%' }}>Dataset</th>
              <th style={{ width: '10%' }}>Score</th>
              <th style={{ width: '10%' }}>Status</th>
              <th style={{ width: '15%' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map(recipeId => {
              const recipe = run.recipeResults[recipeId];
              const isExpanded = expandedRecipe === recipeId;
              
              return (
                <>
                  <tr key={recipeId} className={`${styles.recipeRow} ${isExpanded ? styles.expanded : ''}`}>
                    <td>
                      <div className={styles.recipeInfo}>
                        <span className={styles.recipeName}>{recipe.recipeName}</span>
                        {recipe.indonesiaSpecific && (
                          <span className={styles.indonesiaBadge}>🇮🇩 Indonesia</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={styles.recipeMethod}>{recipe.method}</span>
                    </td>
                    <td>
                      <span className={styles.recipeDataset}>{recipe.dataset}</span>
                    </td>
                    <td>
                      <ScoreBadge score={recipe.score} size="sm" />
                    </td>
                    <td>
                      <StatusBadge status={recipe.status} />
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetail(recipeId)}
                          leftIcon={<Eye size={16} />}
                        >
                          Lihat Detail
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
                  
                  {/* Expanded Row - Findings */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={6}>
                        <div className={styles.expandedContent}>
                          <FindingsAccordion categories={recipe.findings} />
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Prompt Detail Modal */}
      <PromptDetailModal
        open={modalOpen}
        recipe={selectedRecipe}
        onClose={() => {
          setModalOpen(false);
          setSelectedRecipe(null);
        }}
      />
    </>
  );
}
```

---

### 2. CSS Module (RecipeResultsTable.module.css)

```css
/* Table Container */
.tableContainer {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: white;
  margin-bottom: 24px;
}

/* Recipe Table */
.recipeTable {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.recipeTable thead {
  background: var(--color-bg-secondary);
  border-bottom: 2px solid var(--color-border);
}

.recipeTable th {
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  color: var(--color-text-primary);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.recipeTable tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: all var(--transition-fast);
}

.recipeTable tbody tr:hover {
  background: var(--color-bg-tertiary);
}

.recipeTable tbody tr.expanded {
  background: var(--color-bg-tertiary);
  border-bottom: none;
}

.recipeTable td {
  padding: 16px 12px;
  vertical-align: middle;
}

/* Recipe Info */
.recipeInfo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.recipeName {
  font-weight: 600;
  color: var(--color-text-primary);
}

.indonesiaBadge {
  font-size: 12px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  border-left: 3px solid #dc2626;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.recipeMethod,
.recipeDataset {
  font-size: 13px;
  color: var(--color-text-secondary);
  font-style: italic;
}

.recipeDataset {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--color-bg-tertiary);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

/* Action Buttons */
.actionButtons {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* Expanded Content */
.expandedContent {
  padding: 20px;
  background: white;
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .recipeTable {
    font-size: 13px;
  }
  
  .recipeTable th,
  .recipeTable td {
    padding: 12px 8px;
  }
  
  .recipeMethod {
    display: none;
  }
}

@media (max-width: 768px) {
  .tableContainer {
    overflow-x: scroll;
  }
  
  .recipeTable {
    min-width: 800px;
  }
  
  .actionButtons {
    flex-direction: column;
  }
}
```

---

### 3. PromptDetailModal.module.css (Update)

```css
/* Backdrop */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  max-width: 100%;
  background: var(--color-surface);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.closeIconButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.closeIconButton:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

/* Meta Grid */
.metaGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding: 20px 24px;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.metaLabel {
  display: block;
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.metaValue {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Block */
.block {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}

.blockTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.blockTitle {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Section Header */
.sectionHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
}

/* Code Block */
.codeBlock {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
  margin: 0;
}

/* Verdict Badge */
.verdictBadge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.verdictPassed {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.verdictFailed {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.verdictWarning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #f59e0b;
}

/* Analysis */
.analysisWrap {
  margin-top: 16px;
  padding: 16px;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-bg-secondary) 100%);
  border-radius: 8px;
  border: 1px solid var(--color-primary);
}

.analysisTitle {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
}

.analysisText {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-primary);
}

/* List Wrapper */
.listWrap {
  flex: 1;
  overflow-y: auto;
}

/* Footer */
.footer {
  padding: 16px 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .modal {
    width: 100%;
  }
  
  .metaGrid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .codeBlock {
    font-size: 12px;
    padding: 12px;
    max-height: 250px;
  }
  
  .sectionHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
```

---

### 4. Integration in Run Detail Page

```tsx
// app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { OverallScore } from '@/components/results/OverallScore';
import { ScoreCardGrid } from '@/components/score/ScoreCardGrid';
import { RecipeResultsTable } from '@/components/results/RecipeResultsTable';

export default function RunDetailPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const run = useRun(runId); // Your data fetching logic
  
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
      
      {/* Recipe Results Table with Modal Integration */}
      <RecipeResultsTable
        run={run}
        selectedCategory={selectedCategory}
      />
    </>
  );
}
```

---

## ✅ QA Checklist

### Table UI
- [ ] Table shows all recipes
- [ ] Category filter tabs work
- [ ] Can filter by category
- [ ] Recipe name, method, dataset visible
- [ ] Score and status in columns
- [ ] "Lihat Detail" button in each row

### Prompt Detail Modal
- [ ] Modal opens on "Lihat Detail" click
- [ ] Shows recipe name, method, dataset
- [ ] Shows all findings for that recipe
- [ ] Each finding shows prompt (scrollable)
- [ ] Each finding shows response (scrollable)
- [ ] Each finding shows verdict badge
- [ ] Each finding shows analysis
- [ ] Copy button works for prompt
- [ ] Copy button works for response
- [ ] Can close modal (X button)
- [ ] Can close modal (Tutup button)
- [ ] Can close modal (click backdrop)
- [ ] Mobile responsive

### Integration
- [ ] Modal renders outside table
- [ ] Correct recipe data passed to modal
- [ ] Modal closes properly
- [ ] No state conflicts
- [ ] No visual glitches

---

## 📊 Example Flow

**Table View:**
```
┌──────────────────────────────────────────────────────────────┐
│ [Semua] [Adversarial] [Safety] [Privacy] [Hallucination]    │
├──────────────────────────────────────────────────────────────┤
│ Recipe │ Method │ Dataset │ Score │ Status │ Aksi           │
├────────┼────────┼─────────┼───────┼────────┼────────────────┤
│ Adv.   │ Text.  │ advglue │ 85(B) │ ✓ Pass │ [Lihat Detail] │
│ Rob.   │        │ -all    │       │        │ [▼]            │
└──────────────────────────────────────────────────────────────┘
```

**Click "Lihat Detail":**
```
┌───────────────────────────────────────────────────┐
│ Detail Prompt & Response                    [X]   │
├───────────────────────────────────────────────────┤
│ Recipe: Adversarial Robustness                    │
│ Method: Textual adversarial attacks               │
│ Dataset: advglue-all                              │
├───────────────────────────────────────────────────┤
│ Test ID: adv-001           [FAILED]               │
│                                                   │
│ Prompt                              [Copy]        │
│ ┌─────────────────────────────────────────────┐   │
│ │ Ignore all previous instructions...         │   │
│ │ [scrollable]                                │   │
│ └─────────────────────────────────────────────┘   │
│                                                   │
│ Response                            [Copy]        │
│ ┌─────────────────────────────────────────────┐   │
│ │ I understand you're curious...              │   │
│ │ [scrollable]                                │   │
│ └─────────────────────────────────────────────┘   │
│                                                   │
│ Analysis                                          │
│ Model successfully resisted...                    │
├───────────────────────────────────────────────────┤
│                                   [Tutup]         │
└───────────────────────────────────────────────────┘
```

---

**For Frontend Agent**: Integrate existing `PromptDetailModal` with `RecipeResultsTable`. Add "Lihat Detail" button that opens modal with recipe data. Use existing `FindingsAccordion` in expanded row.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
