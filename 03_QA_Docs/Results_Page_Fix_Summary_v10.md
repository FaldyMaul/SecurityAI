# Results Page Fix - Summary

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - Results must match selection

---

## 🚨 Problem

**Package Selection:** User selects 4 categories with 11 recipes
**Results Page:** Only shows 4 category scores, not individual recipe results

**Fix Required:** Results must show ALL selected recipes

---

## ✅ Solution

### Rule
> **"What you select is what you get in results"**

If user selects 11 recipes, results must show 11 recipe result cards.

---

## 📋 Key Changes

### 1. Remove "Moonshot" Branding

**Before:**
```
❌ "Modul berbasis AI Verify Moonshot Beta"
❌ "Source: Moonshot"
```

**After:**
```
✅ "Method: Textual adversarial attacks"
✅ "Dataset: advglue-all"
```

### 2. Add Recipe-Level Results

**Results Page Structure:**
```
1. Overall Score (Grade A-E)
2. Category Scores (4 categories)
3. Recipe Results (ALL selected recipes) ← NEW
4. Findings (grouped by recipe)
```

### 3. Recipe Result Card

Each recipe shows:
- Recipe name
- Method (e.g., "Textual adversarial attacks")
- Dataset (e.g., "Dataset: advglue-all")
- Score (0-100)
- Status (Passed/Failed/Warning)
- Test summary (Total, Passed, Failed, Critical)
- Findings list
- Recommendations

---

## 📁 Files to Modify

### Create
1. `03_Frontend/src/components/results/RecipeResultCard.tsx`

### Update
1. `03_Frontend/src/lib/modules.ts` - Remove "Moonshot", add "method" field
2. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` - Add recipe results section
3. `03_Frontend/src/types/run.ts` - Add `recipeResults` type
4. `03_Frontend/src/components/run/BenchmarkWizard.tsx` - Show method and dataset

---

## 🎨 UI Example

**Results Page:**
```
Hasil Per Recipe
Menampilkan 11 recipe yang dipilih

┌─────────────────────────────────────────────┐
│ Adversarial Robustness                      │
│ Method: Textual adversarial attacks         │
│ Dataset: advglue-all                        │
│ Score: 85 (B) ✓ Passed                      │
│ [Lihat Detail ▼]                            │
├─────────────────────────────────────────────┤
│ Test Summary:                               │
│ Total: 20  Passed: 18  Failed: 2  Critical: 1│
│                                             │
│ Temuan:                                     │
│ ⚠ Model failed to resist DAN jailbreak     │
│   [Lihat Bukti]                             │
│                                             │
│ Rekomendasi:                                │
│ • Implement input filtering                 │
│ • Add system prompt for constraint          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Jailbreak Resistance (DAN)                  │
│ Method: Direct instruction override         │
│ Dataset: jailbreak-dan                      │
│ Score: 92 (A) ✓ Passed                      │
│ [Lihat Detail ▼]                            │
└─────────────────────────────────────────────┘

... (9 more recipe cards)
```

---

## ✅ QA Checklist

- [ ] Results show ALL selected recipes
- [ ] Each recipe has method and dataset
- [ ] No "Moonshot" branding anywhere
- [ ] Recipe count matches selection
- [ ] Expandable to see details
- [ ] Findings grouped by recipe
- [ ] Recommendations per recipe

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Assessment_Module_Results_Fix_v10.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Create `RecipeResultCard.tsx` component
2. Add recipe results section to run detail page
3. Remove all "Moonshot" references
4. Show method and dataset for each recipe

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
