# Table UI Integration - Quick Summary

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - Use existing components

---

## ✅ Components Already Exist!

**No need to create - already built:**

| Component | Status | Location |
|-----------|--------|----------|
| `PromptDetailModal.tsx` | ✅ Already exists | `03_Frontend/src/components/results/` |
| `EvidencePanel.tsx` | ✅ Already exists | `03_Frontend/src/components/findings/` |
| `FindingsAccordion.tsx` | ✅ Already exists | `03_Frontend/src/components/findings/` |

---

## 🔧 What Needs to Be Done

**Integrate existing components with table:**

1. Add "Lihat Detail" button to table
2. On click → open `PromptDetailModal` with recipe data
3. In expanded row → show `FindingsAccordion`

---

## 🎨 UI Layout

**Table with "Lihat Detail" button:**
```
┌──────────────────────────────────────────────────────┐
│ [Semua] [Adversarial] [Safety] [Privacy] [...]      │
├──────────────────────────────────────────────────────┤
│ Recipe │ Method │ Dataset │ Score │ Status │ Aksi   │
├────────┼────────┼─────────┼───────┼────────┼────────┤
│ Adv.   │ Text.  │ advglue │ 85(B) │ ✓ Pass │ [👁] [▼]│
│ Rob.   │        │ -all    │       │        │        │
└──────────────────────────────────────────────────────┘
```

**Click [👁] → Modal opens:**
```
┌───────────────────────────────────────────┐
│ Detail Prompt & Response            [X]   │
├───────────────────────────────────────────┤
│ Recipe: Adversarial Robustness            │
│ Method: Textual adversarial attacks       │
│ Dataset: advglue-all                      │
├───────────────────────────────────────────┤
│ Test ID: adv-001      [FAILED]            │
│                                           │
│ Prompt                      [Copy]        │
│ ┌─────────────────────────────────────┐   │
│ │ Ignore all previous instructions... │   │
│ │ [scrollable]                        │   │
│ └─────────────────────────────────────┘   │
│                                           │
│ Response                    [Copy]        │
│ ┌─────────────────────────────────────┐   │
│ │ I understand you're curious...      │   │
│ │ [scrollable]                        │   │
│ └─────────────────────────────────────┘   │
│                                           │
│ Analysis                                  │
│ Model successfully resisted...            │
├───────────────────────────────────────────┤
│                           [Tutup]         │
└───────────────────────────────────────────┘
```

---

## 📁 Files to Modify

### Update
1. `03_Frontend/src/components/results/RecipeResultsTable.tsx` - Add "Lihat Detail" button
2. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` - Add modal

### Use Existing
1. `03_Frontend/src/components/results/PromptDetailModal.tsx` - Already exists
2. `03_Frontend/src/components/findings/FindingsAccordion.tsx` - Already exists

---

## ✅ QA Checklist

- [ ] "Lihat Detail" button in each row
- [ ] Click opens `PromptDetailModal`
- [ ] Modal shows recipe name, method, dataset
- [ ] Modal shows all findings (prompt, response, verdict)
- [ ] Copy button works
- [ ] Can close modal
- [ ] Expanded row shows `FindingsAccordion`
- [ ] Mobile responsive

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Table_UI_Integration_Existing_Components_v13.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Add "Lihat Detail" button to table
2. On click → open `PromptDetailModal` with recipe data
3. In expanded row → show `FindingsAccordion`
4. Use existing components (don't recreate)

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
