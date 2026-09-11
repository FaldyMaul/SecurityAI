# AI Sandbox – Fail Only Filter Addition v14.0

> **Purpose**: Add "Fail Only" filter to RecipeResultsTable
> **Version**: 14.0 (Fail Only Filter)
> **Last Updated**: March 11, 2026
> **Priority**: **HIGH** - Missing filter feature

---

## ✅ Existing Features (Already Working)

**Category Filter Tabs - Already Implemented:**
```tsx
// In RecipeResultsTable.tsx
const FILTERS: Array<{ key: 'all' | AssessmentModuleId; label: string }> = [
  { key: 'all', label: 'Semua Recipe' },
  { key: 'adversarial', label: 'Adversarial Robustness' },
  { key: 'safety', label: 'Safety & Alignment' },
  { key: 'privacy', label: 'Privacy' },
  { key: 'hallucination', label: 'Hallucination & Truthfulness' },
];
```

**Status:**
- ✅ Filter tabs already exist
- ✅ Can filter by category
- ✅ "Lihat Prompt" button works
- ✅ Expanded row shows findings & recommendations
- ✅ `PromptDetailModal` integrated

---

## 🚨 Missing Feature: "Fail Only" Filter

**Problem:**
- ❌ No filter to see only failed recipes
- ❌ User must manually scan all recipes to find failures
- ❌ Hard to focus on issues that need attention

**Solution:**
- ✅ Add "Fail Only" checkbox/toggle
- ✅ Filter recipes with status 'failed' or 'warning'
- ✅ Show only recipes that need attention

---

## 🎨 UI Implementation

### 1. Add Fail Only Toggle

```tsx
// RecipeResultsTable.tsx - Update
export function RecipeResultsTable({ rows }: RecipeResultsTableProps) {
  const [filter, setFilter] = useState<'all' | AssessmentModuleId>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [promptRecipe, setPromptRecipe] = useState<SelectedRecipeResult | null>(null);
  const [showFailOnly, setShowFailOnly] = useState(false);  // ✅ NEW

  const filteredRows = useMemo(() => {
    let result = rows;
    
    // Filter by category
    if (filter !== 'all') {
      result = result.filter((row) => row.categoryId === filter);
    }
    
    // ✅ NEW: Filter by fail only
    if (showFailOnly) {
      result = result.filter((row) => row.status === 'failed' || row.status === 'warning');
    }
    
    return result;
  }, [filter, showFailOnly, rows]);

  return (
    <>
      <div className={styles.filterHeader}>
        <div className={styles.filterTabs}>
          {FILTERS.map((item) => (
            <Button
              key={item.key}
              size="sm"
              variant={filter === item.key ? 'primary' : 'outline'}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        
        {/* ✅ NEW: Fail Only Toggle */}
        <label className={styles.failOnlyToggle}>
          <input
            type="checkbox"
            checked={showFailOnly}
            onChange={(e) => setShowFailOnly(e.target.checked)}
          />
          <span className={styles.toggleLabel}>Fail Only</span>
          <span className={styles.failCount}>
            ({rows.filter(r => r.status === 'failed' || r.status === 'warning').length})
          </span>
        </label>
      </div>

      {/* Table remains the same */}
      <div className={styles.tableWrap}>
        {/* ... existing table code ... */}
      </div>
    </>
  );
}
```

---

### 2. CSS Styling

```css
/* RecipeResultsTable.module.css - Add */

/* Filter Header */
.filterHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
}

.filterTabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Fail Only Toggle */
.failOnlyToggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-bg-secondary);
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  font-weight: 500;
}

.failOnlyToggle:hover {
  background: var(--color-bg-tertiary);
}

.failOnlyToggle input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--color-score-critical);
}

.toggleLabel {
  color: var(--color-text-primary);
}

.failCount {
  color: var(--color-score-critical);
  font-weight: 600;
  font-size: 13px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .filterHeader {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .failOnlyToggle {
    width: 100%;
    justify-content: center;
  }
}
```

---

### 3. Updated Table with Fail Only

**Example UI:**
```
┌──────────────────────────────────────────────────────────────┐
│ [Semua] [Adversarial] [Safety] [Privacy] [Hallucination]    │
│                                              ☑ Fail Only (5) │
├──────────────────────────────────────────────────────────────┤
│ Recipe │ Method │ Dataset │ Score │ Status │ Aksi           │
├────────┼────────┼─────────┼───────┼────────┼────────────────┤
│ Adv.   │ Text.  │ advglue │ 45(D) │ ✗ Fail │ [Lihat Prompt] │
│ Rob.   │        │ -all    │       │        │ [▼]            │
├────────┼────────┼─────────┼───────┼────────┼────────────────┤
│ Toxicity│ Bah.  │ tox-id  │ 62(C) │ ⚠ Warn │ [Lihat Prompt] │
│ (Bahasa)│       │         │       │        │ [▼]            │
└──────────────────────────────────────────────────────────────┘

Only showing 5 failed/warning recipes out of 20 total
```

---

### 4. Empty State for Fail Only

```tsx
// Add empty state when no failures
{filteredRows.length === 0 && showFailOnly && (
  <div className={styles.emptyState}>
    <div className={styles.emptyIcon}>✅</div>
    <h4>Tidak ada recipe yang gagal!</h4>
    <p>Semua recipe lulus dengan baik. Tidak ada yang perlu diperbaiki.</p>
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowFailOnly(false)}
    >
      Lihat Semua Recipe
    </Button>
  </div>
)}
```

```css
/* CSS for Empty State */
.emptyState {
  padding: 48px 24px;
  text-align: center;
  background: var(--color-bg-secondary);
  border-radius: 12px;
  border: 2px dashed var(--color-border);
}

.emptyIcon {
  font-size: 48px;
  margin-bottom: 16px;
}

.emptyState h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: var(--color-text-primary);
}

.emptyState p {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}
```

---

## 📊 Filter Combinations

**Possible Filter States:**

| Category Filter | Fail Only | Shows |
|-----------------|-----------|-------|
| Semua Recipe | ❌ Unchecked | All recipes (20) |
| Semua Recipe | ✅ Checked | Only failed/warning (5) |
| Adversarial | ❌ Unchecked | All adversarial recipes (5) |
| Adversarial | ✅ Checked | Failed adversarial recipes (2) |
| Safety | ✅ Checked | Failed safety recipes (2) |
| Privacy | ✅ Checked | Failed privacy recipes (0) → Empty state |
| Hallucination | ✅ Checked | Failed hallucination recipes (1) |

---

## 📁 Files to Modify

### Update
1. `03_Frontend/src/components/results/RecipeResultsTable.tsx` - Add fail only filter
2. `03_Frontend/src/components/results/RecipeResultsTable.module.css` - Add toggle styles

---

## ✅ QA Checklist

### Filter Functionality
- [ ] Category filter tabs work
- [ ] "Fail Only" checkbox visible
- [ ] "Fail Only" shows correct count
- [ ] Checkbox filters correctly
- [ ] Can combine category + fail only filters
- [ ] Empty state shows when no failures

### UI/UX
- [ ] Toggle styled correctly
- [ ] Count updates dynamically
- [ ] Empty state friendly message
- [ ] "Lihat Semua Recipe" button works
- [ ] Mobile responsive
- [ ] No visual glitches

### Integration
- [ ] Works with existing table
- [ ] Works with "Lihat Prompt" button
- [ ] Works with expanded rows
- [ ] Works with `PromptDetailModal`

---

## 🎨 Example Flow

**User Story:**
```
1. User opens results page
2. Sees 20 recipes total
3. Clicks "Fail Only (5)" checkbox
4. Table shows only 5 failed/warning recipes
5. User can focus on fixing issues
6. Clicks category filter "Adversarial"
7. Shows only 2 failed adversarial recipes
8. Clicks "Lihat Prompt" to see details
9. Fixes issues, reruns benchmark
10. "Fail Only" now shows 0 items → Success!
```

---

**For Frontend Agent**: Add "Fail Only" checkbox toggle to `RecipeResultsTable`. Filter by `status === 'failed' || status === 'warning'`. Show count of failures. Add empty state when no failures.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
