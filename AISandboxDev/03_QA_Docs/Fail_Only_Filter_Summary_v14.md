# Fail Only Filter - Quick Summary

> **Created**: March 11, 2026
> **Priority**: **HIGH** - Missing filter feature

---

## ✅ Existing Features (Already Working)

**Category Filter Tabs:**
- ✅ Semua Recipe
- ✅ Adversarial Robustness
- ✅ Safety & Alignment
- ✅ Privacy
- ✅ Hallucination & Truthfulness

**Other Features:**
- ✅ "Lihat Prompt" button
- ✅ Expanded row with findings
- ✅ `PromptDetailModal` integrated

---

## 🚨 Missing: "Fail Only" Filter

**Add checkbox to show only failed recipes:**
```
┌──────────────────────────────────────────────────┐
│ [Semua] [Adversarial] [Safety] [Privacy] [...]  │
│                                  ☑ Fail Only (5)│
├──────────────────────────────────────────────────┤
│ Recipe │ Method │ Dataset │ Score │ Status │ ⚙️ │
├────────┼────────┼─────────┼───────┼────────┼───┤
│ Adv.   │ Text.  │ advglue │ 45(D) │ ✗ Fail │ 👁 │
│ Rob.   │        │ -all    │       │        │   │
├────────┼────────┼─────────┼───────┼────────┼───┤
│ Toxicity│ Bah.  │ tox-id  │ 62(C) │ ⚠ Warn │ 👁 │
└──────────────────────────────────────────────────┘

Only showing 5 failed/warning recipes
```

---

## 🔧 Implementation

### Add to RecipeResultsTable.tsx

```tsx
const [showFailOnly, setShowFailOnly] = useState(false);

const filteredRows = useMemo(() => {
  let result = rows;
  
  // Filter by category
  if (filter !== 'all') {
    result = result.filter((row) => row.categoryId === filter);
  }
  
  // Filter by fail only
  if (showFailOnly) {
    result = result.filter((row) => 
      row.status === 'failed' || row.status === 'warning'
    );
  }
  
  return result;
}, [filter, showFailOnly, rows]);
```

### Add Toggle UI

```tsx
<label className="fail-only-toggle">
  <input
    type="checkbox"
    checked={showFailOnly}
    onChange={(e) => setShowFailOnly(e.target.checked)}
  />
  <span>Fail Only</span>
  <span>({failCount})</span>
</label>
```

---

## 📁 Files to Modify

### Update
1. `03_Frontend/src/components/results/RecipeResultsTable.tsx` - Add fail only logic
2. `03_Frontend/src/components/results/RecipeResultsTable.module.css` - Add toggle styles

---

## ✅ QA Checklist

- [ ] "Fail Only" checkbox visible
- [ ] Shows correct fail count
- [ ] Filters by failed/warning status
- [ ] Can combine with category filter
- [ ] Empty state when no failures
- [ ] Mobile responsive

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Fail_Only_Filter_Addition_v14.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Add `showFailOnly` state
2. Add checkbox toggle UI
3. Filter by `status === 'failed' || status === 'warning'`
4. Show fail count
5. Add empty state

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
