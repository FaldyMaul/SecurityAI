# QA Agent Feedback - Implementation Summary v6.0

> **Created**: March 11, 2026
> **Source**: Live QA Testing Feedback
> **Priority**: **P0 CRITICAL** - Blocking production

---

## 🚨 P0 Critical Bugs (Fix Immediately)

### 1. Promote to ModelHub Fails
**Issue**: Shows "Gagal publish" error even for valid scores (A/B)
**Impact**: Blocks entire user journey to ModelHub
**Fix**: 
- Check API endpoint `/api/models/:id/promote` exists
- Fix frontend promote logic in `runs/[runId]/page.tsx`
- Ensure score validation (≥ 60 for A/B/C)
- Redirect to `/ranking?view=promoted` not landing page

**Files**:
- `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx`
- `03_Frontend/src/lib/api.ts`
- **Backend API**

**QA Test**:
```
GIVEN: Model has score A (85)
WHEN:  Click "Promosikan ke ModelHub"
THEN:  Success toast + redirect to ModelHub ranking
```

---

### 2. Status Column Empty
**Issue**: Status column shows nothing in Model Saya list
**Impact**: Can't track model state
**Fix**: 
- Populate status from backend state
- Use StatusBadge component
- Map all statuses correctly

**Files**:
- `03_Frontend/src/app/[locale]/(internal)/models/page.tsx`
- `03_Frontend/src/lib/statusConfig.ts`

**QA Test**:
```
GIVEN: Model list page loads
WHEN:  View any model row
THEN:  Status badge visible with correct label
```

---

### 3. Prompt Defaults to 25%
**Issue**: Prompt selection defaults to 25%, should be 100%
**Impact**: Wrong test coverage
**Fix**: Change default to 100%

**File**: `03_Frontend/src/components/run/BenchmarkWizard.tsx`

**QA Test**:
```
GIVEN: Open benchmark wizard
WHEN:  View prompt percentage field
THEN:  Default value is 100% (marked as "Direkomendasikan")
```

---

## 🟠 P1 High Priority (This Week)

### 4. Package "?" Not Clickable
**Issue**: Shows tooltip only, not modal
**Fix**: Make clickable, open modal with test details

**Files**:
- `03_Frontend/src/components/run/BenchmarkWizard.tsx`
- `03_Frontend/src/components/run/PackageDetailModal.tsx` (NEW)

---

### 5. Language Inconsistency
**Issue**: Mix of English and Indonesian
**Fix**: Standardize to Indonesian

**Required Labels**:
| Use This | Not This |
|----------|----------|
| Promosikan ke ModelHub | Publish / Publikasikan |
| Model Saya | My Models |
| Pengujian | Testing |
| Riwayat | History |
| Peringkat | Leaderboard |
| Sedang Berjalan | Running |
| Selesai | Completed |
| Siap Promosi | Promotion Ready |
| Dipromosikan ke ModelHub | Published |

**File**: `03_Frontend/src/messages/id.json`

---

### 6. Mobile Navbar Overflows
**Issue**: Broken on small screens (<375px)
**Fix**: Add hamburger menu

**Files**:
- `03_Frontend/src/components/layout/PublicNavbar.tsx`
- `03_Frontend/src/components/layout/NavbarMinimal.tsx`
- `03_Frontend/src/styles/globals.css`

---

## 🟡 P2 Medium Priority (Next Week)

### 7. LLM Summary Not Granular
**Issue**: Only shows overall, not per-category
**Fix**: Add "Review dengan AI" button for each category

**Files**:
- `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx`
- `03_Frontend/src/components/run/LLMReviewModal.tsx` (NEW)

---

## 📋 Complete Checklist

### P0 Critical
- [ ] Promote to ModelHub works for A/B/C scores
- [ ] Promote blocked for D/E scores with message
- [ ] Status column populated for all models
- [ ] Prompt defaults to 100%

### P1 High
- [ ] "?" icon clickable, opens modal
- [ ] All navigation in Indonesian
- [ ] All buttons in Indonesian
- [ ] All status labels in Indonesian
- [ ] All metrics in Indonesian
- [ ] Hamburger menu works on mobile
- [ ] No navbar overflow on any screen

### P2 Medium
- [ ] Each category has "Review dengan AI" button
- [ ] Modal shows AI justification per category
- [ ] Recommendations are actionable
- [ ] Expand all works in recipe breakdown

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `UI_Improvement_QA_Agent_Feedback_v6.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Start with **P0 Critical Bugs** (Promote, Status, Prompt)
2. Then fix **P1 High** (Language, Mobile, Modal)
3. Finally **P2 Medium** (LLM detail)

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
