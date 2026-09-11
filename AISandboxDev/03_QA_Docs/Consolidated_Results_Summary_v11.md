# Consolidated Recipe Results - Summary

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - Remove duplication

---

## 🚨 Problem

**Two sections with same info:**

```
Rincian Recipe:
- Recipe name
- Method
- Dataset

Hasil Per Recipe:
- Recipe name (DUPLICATE!)
- Method (DUPLICATE!)
- Dataset (DUPLICATE!)
- Score
- Status
- Findings
```

**Result:** Too long, confusing, lots of scrolling

---

## ✅ Solution

**One card per recipe:**

```
Consolidated Recipe Card:
├─ Header (always visible)
│  ├─ Recipe name
│  ├─ Method
│  ├─ Dataset
│  ├─ Score
│  └─ Status
└─ Details (expandable)
   ├─ Test summary
   ├─ Findings
   └─ Recommendations
```

**Benefit:** No duplication, clean, user controls what to see

---

## 📋 Key Changes

### Before
```
Package Selection → Results Page
4 categories      → 4 category scores
11 recipes        → 11 recipe cards (DUPLICATE INFO)
```

### After
```
Package Selection → Results Page
4 categories      → 4 category scores
11 recipes        → 11 consolidated cards (NO DUPLICATION)
```

---

## 🎨 UI Example

**Results Page:**
```
Hasil Detail Per Recipe
Menampilkan 11 recipe yang diuji

┌─────────────────────────────────────────┐
│ Adversarial Robustness   [🇮🇩 Indonesia]│
│ Method: Textual adversarial attacks     │
│ Dataset: advglue-all                    │
│                         Score: 85 (B)   │
│                         ✓ Passed        │
├─────────────────────────────────────────┤
│ [Lihat Detail ▼]                        │
└─────────────────────────────────────────┘

[User clicks "Lihat Detail"]

┌─────────────────────────────────────────┐
│ Adversarial Robustness   [🇮🇩 Indonesia]│
│ Method: Textual adversarial attacks     │
│ Dataset: advglue-all                    │
│                         Score: 85 (B)   │
│                         ✓ Passed        │
├─────────────────────────────────────────┤
│ Test Summary:                           │
│ Total: 20  Passed: 18  Failed: 2  Crit: 1│
│                                         │
│ Temuan (2):                             │
│ ⚠ Model failed adversarial test        │
│   [Lihat Bukti]                         │
│                                         │
│ Rekomendasi:                            │
│ • Implement input filtering             │
│ • Add adversarial training              │
└─────────────────────────────────────────┘
```

---

## 📁 Files to Modify

### Create
1. `03_Frontend/src/components/results/ConsolidatedRecipeCard.tsx`

### Delete
1. `03_Frontend/src/components/results/RecipeResultCard.tsx` (replaced)

### Update
1. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx`
2. `03_Frontend/src/components/run/BenchmarkWizard.tsx`

---

## ✅ QA Checklist

- [ ] One card per recipe
- [ ] Header shows recipe info + score
- [ ] Details expandable (not auto-expanded)
- [ ] No duplicate sections
- [ ] Findings inside card
- [ ] Recommendations inside card
- [ ] Clean, scannable layout
- [ ] Mobile responsive

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Consolidated_Recipe_Results_UI_v11.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Create `ConsolidatedRecipeCard.tsx`
2. Replace all recipe cards in results page
3. Delete old `RecipeResultCard.tsx`
4. Ensure expandable details (not auto-expanded)

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
