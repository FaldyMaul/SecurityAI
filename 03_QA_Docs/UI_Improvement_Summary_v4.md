# UI/UX Agent Feedback - Implementation Summary v4.0

> **Created**: March 11, 2026
> **Source**: `UIUX_Agent_Feedback.md` + `AI_Sandbox_Technology_Stack.md`
> **Priority**: **CRITICAL** - Live QA testing issues

---

## 🚨 Critical Issues from Live QA Testing

### 1. Missing Leaderboard Menu
**Problem**: No navigation to leaderboard/comparison view
**Fix**: Add "Peringkat" menu item to sidebar
**File**: `Sidebar.tsx`
**Priority**: CRITICAL

### 2. Status Column Empty
**Problem**: Can't see model status in list
**Fix**: Populate status column with badges
**File**: `models/page.tsx`
**Priority**: CRITICAL

### 3. Language Inconsistency
**Problem**: Mix of English and Indonesian
**Fix**: Standardize to Indonesian (see translation table)
**Files**: All pages + `messages/id.json`
**Priority**: HIGH

### 4. Package Detail Not Modal
**Problem**: "?" icon shows tooltip only
**Fix**: Make clickable, open modal with test details
**Files**: `BenchmarkWizard.tsx` + `PackageDetailModal.tsx`
**Priority**: HIGH

### 5. Version Comparison Missing
**Problem**: Can't compare different runs
**Fix**: Add comparison tab with delta indicators
**Files**: `runs/[runId]/page.tsx` + new components
**Priority**: MEDIUM

### 6. Navbar Overflows Mobile
**Problem**: Broken on small screens (<375px)
**Fix**: Add hamburger menu
**Files**: `PublicNavbar.tsx` + `NavbarMinimal.tsx`
**Priority**: HIGH

---

## 📋 Required Menu Structure

```
Sidebar Navigation:
├── Utama
│   ├── Dashboard
│   ├── Model Saya
│   └── Peringkat ← ADD THIS
├── Operasional
│   ├── Pengujian
│   ├── Riwayat ← Rename from "Review Queue"
│   └── Publikasi
└── Pengaturan
```

---

## 🗣️ Language Standardization

### Use Indonesian EXCLUSively

| Category | Required Labels |
|----------|----------------|
| **Navigation** | Dashboard, Model Saya, Peringkat, Pengujian, Riwayat, Publikasi, Pengaturan, Keluar |
| **Metrics** | Total Model, Testing Berjalan, Testing Selesai, Sedang di-Review, Model dipublikasikan |
| **Actions** | Tambah Model, Edit, Hapus, Simpan, Batal, Lanjutkan, Kembali, Ajukan, Publikasikan, Jalankan Ulang |
| **Status** | Draf, Validasi Endpoint, Endpoint Valid, Dalam Antrean, Sedang Berjalan, Gagal, Selesai, Sedang di-Review, Disetujui, Disetujui dengan Kontrol, Dibatasi, Dipublikasikan |
| **Time** | Dibuat, Terakhir Diperbarui, Durasi, yang lalu, Baru saja |
| **Scores** | Skor, Nilai, Kepercayaan, Keamanan, Privasi, Kesiapan, Kepatuhan, Kritis, Tinggi, Sedang, Rendah |

---

## 🔧 Implementation Checklist

### Phase 1: Critical (Week 1)
- [ ] Add "Peringkat" menu to sidebar
- [ ] Fix dashboard 5 metrics (Indonesian labels)
- [ ] Populate model status column
- [ ] Standardize all button styles
- [ ] Fix language consistency (all Indonesian)

### Phase 2: High (Week 2)
- [ ] Create package detail modal
- [ ] Make "?" icon clickable
- [ ] Add hamburger menu for mobile
- [ ] Create LLM review modal
- [ ] Fix leaderboard redirect

### Phase 3: Medium (Week 3)
- [ ] Add version comparison tab
- [ ] Add "Expand All" to recipe breakdown
- [ ] Polish mobile UX
- [ ] Add delta indicators

---

## 📁 Files to Change

### Critical (4 files)
1. `03_Frontend/src/components/layout/Sidebar.tsx` - Add "Peringkat"
2. `03_Frontend/src/app/[locale]/(internal)/dashboard/page.tsx` - Fix metrics
3. `03_Frontend/src/app/[locale]/(internal)/models/page.tsx` - Add status
4. `03_Frontend/src/components/shared/Button.tsx` - Standardize

### High (7 files)
1. `03_Frontend/src/messages/id.json` - Update translations
2. `03_Frontend/src/components/run/BenchmarkWizard.tsx` - Clickable "?"
3. `03_Frontend/src/components/run/PackageDetailModal.tsx` - NEW
4. `03_Frontend/src/components/layout/PublicNavbar.tsx` - Hamburger
5. `03_Frontend/src/components/layout/NavbarMinimal.tsx` - Hamburger
6. `03_Frontend/src/styles/globals.css` - Mobile styles
7. `03_Frontend/src/components/shared/StatusBadge.tsx` - Fix labels

### Medium (3 files)
1. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` - Comparison tab
2. `03_Frontend/src/components/score/VersionComparisonView.tsx` - NEW
3. `03_Frontend/src/components/score/DeltaIndicator.tsx` - NEW

---

## ✅ QA Sign-Off Criteria

Before marking complete:
- [ ] "Peringkat" menu visible in sidebar
- [ ] Dashboard shows exactly 5 metrics with Indonesian labels
- [ ] Model status visible for every model
- [ ] All buttons use correct colors
- [ ] All UI in Indonesian (no English visible)
- [ ] "?" icon clickable and opens modal
- [ ] Hamburger menu works on mobile
- [ ] Version comparison tab visible
- [ ] No navbar overflow on any screen size

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `Frontend_Implementation_Guide_v4.md` in `02_Product_UI/`

For technology stack alignment:
- **Read**: `AI_Sandbox_Technology_Stack.md` in `01_Planning/`

For original feedback:
- **Read**: `UIUX_Agent_Feedback.md` in `03_QA_Docs/`

---

**For Frontend Agent**: Start with Phase 1 Critical fixes. All 6 critical issues must be resolved before moving to Phase 2.
