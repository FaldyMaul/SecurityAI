# Table UI Restoration - Quick Guide

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - User prefers table UI

---

## ✅ What to Restore

**Keep existing table UI because:**
1. ✅ Category filter tabs (can filter by category)
2. ✅ All recipes visible in one table
3. ✅ "Lihat Prompt" button works
4. ✅ Familiar, clean layout

**Add improvements:**
1. ✅ Add "Method" column
2. ✅ Add "Dataset" column  
3. ✅ Remove "Moonshot" branding
4. ✅ Expandable row with brief findings & recommendations

---

## 🎨 UI Layout

**Results Page:**
```
┌──────────────────────────────────────────────────┐
│ Hasil Penilaian                                  │
│ Overall Score: 85 (B)                            │
├──────────────────────────────────────────────────┤
│ [Semua] [Adversarial] [Safety] [Privacy] [...]  │
├──────────────────────────────────────────────────┤
│ Recipe │ Method │ Dataset │ Score │ Status │ ⚙️ │
├────────┼────────┼─────────┼───────┼────────┼───┤
│ Recipe1│ Method1│ Data1   │ 85(B) │ ✓ Pass │👁▼│
│ Recipe2│ Method2│ Data2   │ 92(A) │ ✓ Pass │👁▼│
└──────────────────────────────────────────────────┘

[Click ▼ to expand]
┌──────────────────────────────────────────────────┐
│ ▼ Temuan (2)                                     │
│   ⚠ Model failed adversarial test                │
│   ℹ Low severity issue                           │
│   Lihat semua 2 temuan →                         │
│                                                  │
│ Rekomendasi                                      │
│   • Implement input filtering                    │
│   • Add adversarial training                     │
│   Lihat semua 3 rekomendasi →                    │
└──────────────────────────────────────────────────┘
```

---

## 📁 Files to Modify

### Create/Restore
1. `03_Frontend/src/components/results/RecipeResultsTable.tsx` - Restore table UI

### Delete
1. `03_Frontend/src/components/results/ConsolidatedRecipeCard.tsx` - Card UI not needed

### Update
1. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` - Use table UI
2. Add category filter tabs
3. Add method & dataset columns

---

## 🔧 Key Features

### Category Filter Tabs
```tsx
<Tabs>
  <Tab value={null} label="Semua Recipe" />
  <Tab value="adversarial" label="Adversarial Robustness" />
  <Tab value="safety" label="Safety & Alignment" />
  <Tab value="privacy" label="Data Privacy" />
  <Tab value="hallucination" label="Hallucination & Truthfulness" />
</Tabs>
```

### Table Columns
| Column | Content |
|--------|---------|
| Recipe | Recipe name + Indonesia badge |
| Method | Test method (e.g., "Textual adversarial attacks") |
| Dataset | Dataset name (e.g., "advglue-all") |
| Score | Score badge (0-100 + grade) |
| Status | Status badge (Passed/Failed/Warning) |
| Aksi | "Lihat Prompt" button + Expand arrow |

### Expandable Row
Shows:
- Brief findings (first 3)
- "Lihat semua" link if more
- Brief recommendations (first 2)
- "Lihat semua" link if more

---

## ✅ QA Checklist

- [ ] Table shows all recipes
- [ ] Category filter tabs work
- [ ] Can filter by category
- [ ] Recipe name, method, dataset visible
- [ ] Score and status in columns
- [ ] "Lihat Prompt" button works
- [ ] Expand/collapse works
- [ ] Brief findings shown
- [ ] Brief recommendations shown
- [ ] No card UI anywhere

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Recipe_Results_Table_UI_Restore_v12.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Restore table-based UI (check git history if needed)
2. Add category filter tabs
3. Add method & dataset columns
4. Add expandable row with brief findings
5. Delete card UI components

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
