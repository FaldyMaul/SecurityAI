# Agent Context: UI/UX Refinement v3.0 (Human Review Feedback)

> **Created**: March 10, 2026
> **Version**: 3.0
> **Priority**: **CRITICAL** - Direct user feedback

---

## 🎯 What Changed in v3.0

This version addresses **specific UI/UX issues** from human review on 2026-03-10.

### Critical Issues Found

| Issue | Impact | Status |
|-------|--------|--------|
| Button styles inconsistent | Poor UX | ⚠️ To Fix |
| Dashboard metrics wrong labels | Confusion | ⚠️ To Fix |
| Model status not visible | Can't track progress | ⚠️ To Fix |
| Class rating invisible (white on white) | Can't see grade | ⚠️ To Fix |
| Package "?" not clickable | No test details | ⚠️ To Fix |
| Wrong publish redirect | Lost after publish | ⚠️ To Fix |

---

## 📋 Key Requirements

### 1. Button Standardization
**Use these EXACT buttons:**
- `Batal` - Secondary (Gray)
- `Lanjutkan` - Primary (Blue `#1545BC`)
- `Kembali` - Outline (Blue border)
- `Run Benchmark` - Primary (Blue `#1545BC`)
- `Publish to Leaderboard` - Primary (Blue `#1545BC`)
- `Rerun` - Secondary (Purple `#7740B5`)
- `Mulai Benchmark` - Primary (Blue `#1545BC`)

### 2. Dashboard Metrics (5 Tiles)
1. **Total Model**
2. **Testing Berjalan**
3. **Testing Selesai**
4. **Sedang di-Review**
5. **Model dipublikasikan**

### 3. Model Saya
- Show status badge for every model
- Add "Detail Testing" button for completed models

### 4. Assessment Packages
- 4 packages (not 3): Core Trust, Safety, Compliance, App Readiness
- Make "?" icon clickable → shows test details modal

### 5. Class Rating
- Fix white-on-white issue
- Use dark text (`#0f172a`) on light background OR white text on dark background

### 6. Recipe Breakdown
- Add "Expand All" button

### 7. LLM Risk Summary
- Keep overall summary
- Add "Review dengan AI" button for each category
- Modal shows AI justification + recommendations

### 8. Version Comparison
- Add comparison tab
- Side-by-side run comparison with delta indicators

### 9. Leaderboard
- After publish → redirect to `/ranking?view=my-models` (in-app)
- NOT to landing page
- Allow comparison with limited data (scores only for others' models)

### 10. Review Queue
- Hide from MVP navigation
- **DO NOT DELETE** - preserve for future regulation features
- Use feature flag: `NEXT_PUBLIC_ENABLE_REVIEW_QUEUE`

---

## 📁 New Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| `UI_Improvement_Human_Review_v3.md` | `02_Product_UI/` | **Complete specification** |
| `Security_Standard_Refinement.md` | `02_Product_UI/` | Security compliance (Phase 2) |
| `Security_Compliance_Checkpoints.md` | `03_QA_Docs/` | QA testing criteria |

---

## 🚀 Implementation Priority

### Phase 1: Critical Visual (Week 1)
- Fix all button styles
- Fix dashboard metrics
- Fix model status visibility
- Fix class rating colors

### Phase 2: High Priority (Week 2)
- Add package detail modal
- Add LLM review modal
- Fix leaderboard redirect
- Add model comparison

### Phase 3: Medium (Week 3)
- Add Expand All
- Add version comparison
- Hide review queue

---

## 📊 Files Frontend Agent Must Change

### Critical (4 files)
1. `03_Frontend/src/app/[locale]/(internal)/dashboard/page.tsx`
2. `03_Frontend/src/app/[locale]/(internal)/models/page.tsx`
3. `03_Frontend/src/components/score/ScoreCardGrid.tsx`
4. `03_Frontend/src/components/shared/Button.tsx`

### High (4 files)
1. `03_Frontend/src/components/run/BenchmarkWizard.tsx`
2. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx`
3. `03_Frontend/src/app/[locale]/(public)/ranking/page.tsx`
4. `03_Frontend/src/components/layout/Sidebar.tsx`

### New Components (5)
1. `PackageDetailModal.tsx`
2. `ClassRating.tsx`
3. `LLMReviewModal.tsx`
4. `VersionComparisonView.tsx`
5. `ModelComparisonGrid.tsx`

---

## ✅ QA Checkpoints

Before marking as complete:
- [ ] All buttons use correct colors
- [ ] Dashboard shows 5 metrics with Indonesian labels
- [ ] Model status visible in list
- [ ] Class rating visible (not white on white)
- [ ] "?" icon clickable and shows details
- [ ] Publish redirects to in-app leaderboard
- [ ] Review queue menu hidden

---

**For Frontend Agent**: Read `UI_Improvement_Human_Review_v3.md` for complete specifications with code examples.

**Start with**: Phase 1 Critical Visual Fixes (buttons, dashboard, status, rating)
