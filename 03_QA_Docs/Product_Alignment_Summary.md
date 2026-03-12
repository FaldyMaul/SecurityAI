# Product Alignment Update - Summary for Frontend Agent

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - Product architecture change

---

## 🎯 Major Product Split

### Two Distinct Surfaces

| Surface | Audience | Purpose | Routes |
|---------|----------|---------|--------|
| **AI Sandbox** | Model Owner, Admin/Reviewer | Internal testing & review | `/dashboard`, `/models`, `/reviews` |
| **ModelHub** | Developer, Use Case Owner | Leaderboard & discovery | `/`, `/ranking`, `/models/[id]/public` |

---

## 🔄 Key Changes

### 1. Navigation Split
**Before**: One app with blended navigation
**After**: 
- AI Sandbox has internal nav (Dashboard, Model Saya, Pengujian, Review)
- ModelHub has public nav (Beranda, Peringkat)

### 2. "Publish" → "Promote to ModelHub"
**Before**: Simple toggle
**After**: Gate with score guard (≥ 60 required)

### 3. Status Labels
**Before**: Generic "published"
**After**: `promotion_ready`, `published_to_modelhub`

### 4. Builder Journey
**Before**: Part of Sandbox
**After**: Moved to ModelHub

### 5. Required Features
- ✅ LiteLLM integration
- ✅ Background runs (with persistence)
- ✅ Version history
- ✅ Version comparison

---

## 📋 What Frontend Agent Must Do

### Critical (Week 1)
1. **Separate navigation** - Sandbox vs ModelHub
2. **Update state machine** - Add `promotion_ready`, `published_to_modelhub`
3. **Populate status column** - No empty cells
4. **Add promotion gate** - Score guard (≥ 60)
5. **Standardize buttons** - Consistent colors

### High (Week 2)
1. **Background runs** - Persist in localStorage
2. **Version history** - Show all runs
3. **Version comparison** - Side-by-side delta
4. **Package detail modal** - Make "?" clickable
5. **Hamburger menu** - Mobile nav

### Medium (Week 3)
1. **Global progress** - Sidebar indicator
2. **LLM review modal** - Category detail
3. **Expand all** - Recipe breakdown
4. **Mobile polish** - UX improvements

---

## 🗣️ Language Standard

**Use Indonesian exclusively:**

| Category | Required Labels |
|----------|----------------|
| **Navigation** | Dashboard, Model Saya, Pengujian, Riwayat, Review, Peringkat, Beranda |
| **Metrics** | Total Model, Testing Berjalan, Testing Selesai, Siap Review, Dipromosikan ke ModelHub |
| **Actions** | Tambah Model, Jalankan Benchmark, Promosikan ke ModelHub, Jalankan Ulang, Bandingkan |
| **Status** | Draf, Validasi Endpoint, Sedang Berjalan, Selesai, Siap Review, Disetujui, Siap Promosi, Dipublikasikan ke ModelHub |

---

## 📁 Files to Read

| Document | Location |
|----------|----------|
| **`Frontend_Implementation_Guide_v5_Product_Alignment.md`** | `02_Product_UI/` |
| `Product_Alignment_Update_2026-03-11.md` | `01_Planning/` |
| `Product_UI_Specification_Aligned_2026-03-11.md` | `02_Product_UI/` |
| `Frontend_Build_Plan_Aligned_2026-03-11.md` | `03_Frontend/` |
| `agent_context_summary.md` | `03_QA_Docs/` |

---

## ✅ QA Checklist

Before marking complete:
- [ ] Sandbox navigation separate from ModelHub
- [ ] "Peringkat" only in ModelHub, not Sandbox
- [ ] "Promosikan ke ModelHub" button (not "Publish")
- [ ] Score guard blocks D/E promotion
- [ ] Status column populated (no empty cells)
- [ ] All labels in Indonesian
- [ ] Background runs persist after navigation
- [ ] Version comparison works
- [ ] Hamburger menu on mobile

---

## 🚀 Start Here

**Read first**: `Frontend_Implementation_Guide_v5_Product_Alignment.md` in `02_Product_UI/`

**Start with**: Phase 1 Critical Architecture (navigation split, state machine, promotion gate)

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
