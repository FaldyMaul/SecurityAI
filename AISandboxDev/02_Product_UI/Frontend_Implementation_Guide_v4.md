# AI Sandbox – Frontend Implementation Guide v4.0

> **Purpose**: Complete frontend implementation guide aligned with technology stack and latest UX feedback
> **Version**: 4.0 (Technology Stack + UX Recovery)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Live QA testing feedback

---

## 🎯 Executive Summary

This document combines:
1. **Technology Stack Requirements** from `AI_Sandbox_Technology_Stack.md`
2. **Live QA Testing Feedback** from `UIUX_Agent_Feedback.md`
3. **Human Review Requirements** from previous refinements

### Critical Issues from Live QA Testing

| Issue | Impact | Priority |
|-------|--------|----------|
| Missing Leaderboard menu | Can't navigate to comparison | **CRITICAL** |
| Status column empty | Can't track model state | **CRITICAL** |
| Language inconsistency | Confusing UX | **HIGH** |
| Package detail not modal | Missing test details | **HIGH** |
| Version comparison missing | Can't compare runs | **MEDIUM** |
| Navbar overflows mobile | Broken mobile UX | **HIGH** |

---

## 📋 Technology Stack Alignment

### Frontend Stack (Confirmed)

| Layer | Technology | Status |
|-------|------------|--------|
| **Framework** | Next.js 15+ | ✅ In Use |
| **Language** | TypeScript | ✅ In Use |
| **UI System** | Legion UI (`@legion-ui-kit/react-core`) | ✅ In Use |
| **Routing** | Next.js App Router with `[locale]` | ✅ In Use |
| **State** | TanStack Query | ✅ In Use |
| **i18n** | next-intl | ✅ In Use |
| **Charts** | Recharts | ✅ In Use |

### Backend Integration Points

| Service | Purpose | Frontend Integration |
|---------|---------|---------------------|
| **LiteLLM** | Model access gateway | Model import, endpoint config |
| **Moonshot** | Core benchmark engine | Assessment execution |
| **FastAPI** | Backend API | All data fetching |
| **PostgreSQL** | Data storage | Via API endpoints |

---

## 1. Navigation & Menu Structure

### 🚨 CRITICAL: Missing Leaderboard Menu

**Problem**: No direct navigation to leaderboard/comparison view

**Required Fix:**

**Sidebar Menu Structure:**
```tsx
// Sidebar navigation
<NavGroup label="Utama">
  <NavItem icon="LayoutDashboard" label="Dashboard" href="/dashboard" />
  <NavItem icon="Layers" label="Model Saya" href="/models" />
  <NavItem icon="Trophy" label="Peringkat" href="/ranking" />  {/* ✅ ADD THIS */}
</NavGroup>

<NavGroup label="Operasional">
  <NavItem icon="Play" label="Pengujian" href="/runs" />
  <NavItem icon="ClipboardList" label="Riwayat" href="/history" />  {/* ✅ Rename from Review */}
  <NavItem icon="Globe" label="Publikasi" href="/publication" />
</NavGroup>
```

**Menu Items (Exact Names in Indonesian):**

| Menu | Icon | Route | Priority |
|------|------|-------|----------|
| **Dashboard** | LayoutDashboard | `/dashboard` | Primary |
| **Model Saya** | Layers | `/models` | Primary |
| **Peringkat** | Trophy | `/ranking` | **NEW - CRITICAL** |
| **Pengujian** | Play | `/runs` | Primary |
| **Riwayat** | ClipboardList | `/history` | Rename from "Review" |
| **Publikasi** | Globe | `/publication` | Secondary |

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/layout/Sidebar.tsx` | Add "Peringkat" menu | **CRITICAL** |
| `03_Frontend/src/components/layout/NavItem.tsx` | Update menu labels | **HIGH** |

**QA Checklist:**
- [ ] "Peringkat" menu visible in sidebar
- [ ] Click navigates to `/ranking`
- [ ] Menu uses Trophy icon
- [ ] "Review Queue" renamed to "Riwayat"
- [ ] All labels in Indonesian

---

## 2. Language Standardization

### 🟠 HIGH: Indonesian Language Consistency

**Problem**: Mix of English and Indonesian throughout UI

**Required Standard:**

### Navigation & Menus
| English | Indonesian (Use This) |
|---------|----------------------|
| Dashboard | Dashboard |
| My Models | Model Saya |
| Ranking | Peringkat |
| Runs | Pengujian |
| History | Riwayat |
| Publication | Publikasi |
| Settings | Pengaturan |
| Logout | Keluar |

### Dashboard Metrics
| English | Indonesian (Use This) |
|---------|----------------------|
| Total Models | Total Model |
| Testing Running | Testing Berjalan |
| Testing Completed | Testing Selesai |
| Under Review | Sedang di-Review |
| Published Models | Model dipublikasikan |

### Common Actions
| English | Indonesian (Use This) |
|---------|----------------------|
| Add Model | Tambah Model |
| Edit | Edit |
| Delete | Hapus |
| Save | Simpan |
| Cancel | Batal |
| Continue | Lanjutkan |
| Back | Kembali |
| Submit | Ajukan |
| Publish | Publikasikan |
| Rerun | Jalankan Ulang |
| Run Benchmark | Jalankan Benchmark |
| View Details | Lihat Detail |
| Compare | Bandingkan |

### Status Labels
| English | Indonesian (Use This) |
|---------|----------------------|
| Draft | Draf |
| Validation Pending | Validasi Endpoint |
| Validation Failed | Validasi Gagal |
| Endpoint Valid | Endpoint Valid |
| Run Queued | Dalam Antrean |
| Run In Progress | Sedang Berjalan |
| Run Failed | Gagal |
| Assessment Completed | Selesai |
| Pending Review | Sedang di-Review |
| Approved | Disetujui |
| Approved with Controls | Disetujui dengan Kontrol |
| Restricted | Dibatasi |
| Published | Dipublikasikan |

### Time & Dates
| English | Indonesian (Use This) |
|---------|----------------------|
| Created | Dibuat |
| Last Updated | Terakhir Diperbarui |
| Duration | Durasi |
| Ago | yang lalu |
| Just now | Baru saja |

### Score & Results
| English | Indonesian (Use This) |
|---------|----------------------|
| Score | Skor |
| Grade | Nilai |
| Trust | Kepercayaan |
| Security | Keamanan |
| Privacy | Privasi |
| Readiness | Kesiapan |
| Compliance | Kepatuhan |
| Critical | Kritis |
| High | Tinggi |
| Medium | Sedang |
| Low | Rendah |

**Implementation:**
```tsx
// Use i18n keys consistently
import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations();
  
  return (
    <>
      <h1>{t('nav.dashboard')}</h1>
      <Tile label={t('dashboard.total_models')} />
      <Tile label={t('dashboard.testing_running')} />
      <Tile label={t('dashboard.testing_completed')} />
      <Tile label={t('dashboard.pending_review')} />
      <Tile label={t('dashboard.published_models')} />
    </>
  );
}
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/messages/id.json` | Update all translations | **HIGH** |
| `03_Frontend/src/messages/en.json` | Add Indonesian equivalents | **MEDIUM** |
| All pages | Replace hardcoded strings | **HIGH** |

**QA Checklist:**
- [ ] All navigation in Indonesian
- [ ] All buttons in Indonesian
- [ ] All status labels in Indonesian
- [ ] All metrics in Indonesian
- [ ] No English visible in ID locale

---

## 3. Model List Status Display

### 🚨 CRITICAL: Empty Status Column

**Problem**: Status column shows nothing

**Required Fix:**

**Implementation:**
```tsx
// Model list table with proper status
<Table>
  <thead>
    <tr>
      <th>Nama Model</th>
      <th>Provider</th>
      <th>Status</th>  {/* ✅ Must show status */}
      <th>Terakhir Run</th>
      <th>Aksi</th>
    </tr>
  </thead>
  <tbody>
    {models.map(model => (
      <TableRow key={model.id}>
        <td>{model.name}</td>
        <td>{model.provider}</td>
        <td>
          <StatusBadge status={model.status} />  {/* ✅ Show badge */}
        </td>
        <td>
          {model.lastRun ? formatDate(model.lastRun) : '-'}
        </td>
        <td>
          {model.status === 'assessment_completed' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/models/${model.id}/runs/${model.latestRunId}`)}
            >
              Detail Testing
            </Button>
          )}
          {model.status === 'published' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/ranking?view=my-models`)}
            >
              Lihat Peringkat
            </Button>
          )}
        </td>
      </TableRow>
    ))}
  </tbody>
</Table>
```

**Status Badge Mapping:**
| Status | Badge Label | Color |
|--------|-------------|-------|
| `draft` | Draf | Gray |
| `validation_pending` | Validasi Endpoint | Amber |
| `endpoint_valid` | Endpoint Valid | Teal |
| `run_in_progress` | Sedang Berjalan | Blue (pulse) |
| `assessment_completed` | Selesai | Green |
| `pending_review` | Sedang di-Review | Amber |
| `published` | Dipublikasikan | Green |

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/page.tsx` | Populate status column | **CRITICAL** |
| `03_Frontend/src/components/shared/StatusBadge.tsx` | Ensure proper labels | **HIGH** |

**QA Checklist:**
- [ ] Status visible for every model
- [ ] Correct badge colors
- [ ] Indonesian labels
- [ ] "Detail Testing" button for completed
- [ ] "Lihat Peringkat" for published

---

## 4. Package Detail Modal

### 🟠 HIGH: Make "?" Icon Clickable

**Problem**: Package detail only shows tooltip, not modal

**Required Implementation:**

```tsx
// In BenchmarkWizard package selection
<div className="package-item">
  <div className="package-header">
    <div className="package-info">
      <h3>{package.name}</h3>
      <p>{package.description}</p>
      <div className="meta">
        <span>{package.tests} tests</span>
        <span>~{package.estimatedTime}</span>
      </div>
    </div>
    
    {/* ✅ Clickable info icon */}
    <button 
      className="info-button"
      onClick={() => openPackageDetail(package.id)}
      style={{ cursor: 'pointer', background: 'none', border: 'none' }}
    >
      <HelpCircle size={20} />
    </button>
  </div>
</div>

{/* Package Detail Modal */}
<Modal 
  isOpen={selectedPackage !== null} 
  onClose={() => setSelectedPackage(null)}
  size="lg"
>
  <ModalHeader>
    <h3>{selectedPackage?.name} - Detail Testing</h3>
  </ModalHeader>
  <ModalBody>
    <h4>Akan diuji:</h4>
    <ul>
      <li>Prompt Injection (OWASP LLM01)</li>
      <li>Data Leakage (OWASP LLM06)</li>
      <li>Bias Detection (ISO/IEC 42001 A.5)</li>
      <li>Jailbreak Attempts</li>
      <li>PII Disclosure</li>
      {/* ... list all tests from Moonshot */}
    </ul>
    
    <h4>Metode Testing:</h4>
    <p>{selectedPackage?.methodology}</p>
    
    <h4>Estimasi Waktu:</h4>
    <p>{selectedPackage?.estimatedTime}</p>
    
    <h4>Output:</h4>
    <ul>
      <li>Skor per kategori</li>
      <li>Temuan dengan severity</li>
      <li>Bukti (prompt + response)</li>
      <li>Rekomendasi mitigasi</li>
    </ul>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setSelectedPackage(null)}>
      Tutup
    </Button>
  </ModalFooter>
</Modal>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Make "?" clickable | **HIGH** |
| `03_Frontend/src/components/run/PackageDetailModal.tsx` | Create modal component | **HIGH** |

**QA Checklist:**
- [ ] "?" icon has pointer cursor
- [ ] Click opens modal (not tooltip)
- [ ] Modal shows test details
- [ ] Modal shows methodology
- [ ] Modal shows estimated time
- [ ] Modal shows expected output
- [ ] Can close modal

---

## 5. Version Comparison UI

### 🟡 MEDIUM: Add Version Comparison

**Problem**: Can't compare different runs of same model

**Implementation:**

```tsx
// Add tab to run detail page
<Tabs defaultValue="latest">
  <TabList>
    <Tab value="latest">Hasil Terbaru</Tab>
    <Tab value="comparison">Bandingkan Versi</Tab>
  </TabList>
  
  <TabPanel value="comparison">
    <div className="comparison-controls">
      <Select
        label="Versi 1"
        options={availableRuns.map(r => ({ 
          value: r.id, 
          label: `Run ${r.version} - ${formatDate(r.date)}` 
        }))}
        value={selectedRun1}
        onChange={setSelectedRun1}
      />
      
      <Select
        label="Versi 2"
        options={availableRuns.map(r => ({ 
          value: r.id, 
          label: `Run ${r.version} - ${formatDate(r.date)}` 
        }))}
        value={selectedRun2}
        onChange={setSelectedRun2}
      />
    </div>
    
    <VersionComparisonView
      run1={runs.find(r => r.id === selectedRun1)}
      run2={runs.find(r => r.id === selectedRun2)}
    />
  </TabPanel>
</Tabs>

// VersionComparisonView component
<div className="comparison-grid">
  {/* Run 1 */}
  <div className="run-column">
    <h4>Run {run1.version}</h4>
    <p className="date">{formatDate(run1.date)}</p>
    <ScoreCardGrid scores={run1.scores} />
  </div>
  
  {/* Delta */}
  <div className="delta-column">
    <h4>Perubahan</h4>
    {categories.map(cat => (
      <DeltaIndicator
        key={cat}
        label={cat}
        value1={run1.scores[cat]}
        value2={run2.scores[cat]}
      />
    ))}
  </div>
  
  {/* Run 2 */}
  <div className="run-column">
    <h4>Run {run2.version}</h4>
    <p className="date">{formatDate(run2.date)}</p>
    <ScoreCardGrid scores={run2.scores} />
  </div>
</div>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Add comparison tab | **MEDIUM** |
| `03_Frontend/src/components/score/VersionComparisonView.tsx` | Create component | **MEDIUM** |
| `03_Frontend/src/components/score/DeltaIndicator.tsx` | Create component | **MEDIUM** |

**QA Checklist:**
- [ ] "Bandingkan Versi" tab visible
- [ ] Can select 2 runs
- [ ] Scores displayed side-by-side
- [ ] Delta indicators show changes
- [ ] Trend arrows (↑ ↓ →) visible
- [ ] All labels in Indonesian

---

## 6. Mobile Navigation

### 🟠 HIGH: Hamburger Menu for Mobile

**Problem**: Navbar overflows on small screens (<375px)

**Implementation:**

```tsx
// PublicNavbar with hamburger
<div className="navbar">
  <div className="navbar-brand">
    <Logo />
    <span className="product-name">AI Sandbox</span>
  </div>
  
  {/* Desktop nav */}
  <div className="navbar-links desktop-only">
    <NavLink href="/">Beranda</NavLink>
    <NavLink href="/ranking">Peringkat</NavLink>
    <NavLink href="/login">Masuk</NavLink>
  </div>
  
  {/* Mobile hamburger */}
  <button 
    className="hamburger mobile-only"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    aria-label="Toggle menu"
  >
    {mobileMenuOpen ? <X /> : <Menu />}
  </button>
  
  {/* Mobile menu overlay */}
  {mobileMenuOpen && (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu">
        <NavLink href="/" onClick={() => setMobileMenuOpen(false)}>
          Beranda
        </NavLink>
        <NavLink href="/ranking" onClick={() => setMobileMenuOpen(false)}>
          Peringkat
        </NavLink>
        <NavLink href="/login" onClick={() => setMobileMenuOpen(false)}>
          Masuk
        </NavLink>
      </div>
    </div>
  )}
</div>

// CSS
@media (max-width: 768px) {
  .desktop-only { display: none; }
  .mobile-only { display: block; }
  .hamburger { 
    background: none; 
    border: none; 
    cursor: pointer;
  }
  .mobile-menu-overlay {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 100;
  }
  .mobile-menu {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }
}
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/layout/PublicNavbar.tsx` | Add hamburger menu | **HIGH** |
| `03_Frontend/src/components/layout/NavbarMinimal.tsx` | Add hamburger menu | **HIGH** |
| `03_Frontend/src/styles/globals.css` | Add mobile styles | **HIGH** |

**QA Checklist:**
- [ ] Hamburger visible on mobile (<768px)
- [ ] Click opens menu overlay
- [ ] Menu items clickable
- [ ] Click outside closes menu
- [ ] No horizontal scroll
- [ ] All links work in mobile menu

---

## 7. Button Standardization (Recap)

### 🚨 CRITICAL: Consistent Button Styles

**Required Standard:**

| Button | Variant | Color | Size | Usage |
|--------|---------|-------|------|-------|
| **Batal** | Secondary | Gray | md | Cancel actions |
| **Lanjutkan** | Primary | Blue `#1545BC` | lg | Continue to next step |
| **Kembali** | Outline | Blue border | md | Go back |
| **Jalankan Benchmark** | Primary | Blue `#1545BC` | lg | Start benchmark |
| **Publikasikan ke Peringkat** | Primary | Blue `#1545BC` | md | Publish model |
| **Jalankan Ulang** | Secondary | Purple `#7740B5` | md | Run again |
| **Detail Testing** | Outline | Blue border | sm | View run details |
| **Lihat Peringkat** | Outline | Blue border | sm | View leaderboard |
| **Review dengan AI** | Outline | Purple border | sm | AI review trigger |
| **Expand All** | Ghost | Gray | sm | Expand all items |

**Implementation:**
```tsx
import { Button } from '@legion-ui-kit/react-core';

// Primary action
<Button variant="primary" size="lg">
  Lanjutkan
</Button>

// Secondary action
<Button variant="secondary" size="md">
  Jalankan Ulang
</Button>

// Outline action
<Button variant="outline" size="sm">
  Detail Testing
</Button>

// Ghost action
<Button variant="ghost" size="sm">
  Expand All
</Button>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/shared/Button.tsx` | Update standards | **CRITICAL** |
| All pages using buttons | Standardize | **HIGH** |

**QA Checklist:**
- [ ] All primary buttons use `#1545BC`
- [ ] All secondary buttons use `#7740B5` or gray
- [ ] Consistent sizes (lg for CTAs, md for normal, sm for compact)
- [ ] Hover states work
- [ ] Disabled states visible

---

## 8. Dashboard Recap (Recap)

### 🚨 CRITICAL: Correct 5 Metrics

**Required Metrics:**

```tsx
const tiles = [
  { 
    icon: Box, 
    label: 'Total Model',
    value: totalModels,
    color: 'gray'
  },
  { 
    icon: Play, 
    label: 'Testing Berjalan',
    value: runningTests,
    color: 'blue',
    pulse: true  // Animate if > 0
  },
  { 
    icon: Check, 
    label: 'Testing Selesai',
    value: completedTests,
    color: 'green'
  },
  { 
    icon: Eye, 
    label: 'Sedang di-Review',
    value: pendingReviews,
    color: 'amber'
  },
  { 
    icon: Globe, 
    label: 'Model dipublikasikan',
    value: publishedModels,
    color: 'green'
  },
];
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/dashboard/page.tsx` | Update 5 metrics | **CRITICAL** |

**QA Checklist:**
- [ ] Exactly 5 tiles
- [ ] Correct Indonesian labels
- [ ] Correct icons
- [ ] Correct colors
- [ ] "Testing Berjalan" pulses if > 0

---

## 📋 Complete File Change Summary

### Critical Priority (4 files)
1. `03_Frontend/src/app/[locale]/(internal)/dashboard/page.tsx` - Fix 5 metrics
2. `03_Frontend/src/app/[locale]/(internal)/models/page.tsx` - Add status column
3. `03_Frontend/src/components/shared/Button.tsx` - Standardize buttons
4. `03_Frontend/src/components/layout/Sidebar.tsx` - Add "Peringkat" menu

### High Priority (7 files)
1. `03_Frontend/src/messages/id.json` - Standardize Indonesian
2. `03_Frontend/src/components/run/BenchmarkWizard.tsx` - Make "?" clickable
3. `03_Frontend/src/components/run/PackageDetailModal.tsx` - Create modal
4. `03_Frontend/src/components/layout/PublicNavbar.tsx` - Add hamburger
5. `03_Frontend/src/components/layout/NavbarMinimal.tsx` - Add hamburger
6. `03_Frontend/src/styles/globals.css` - Mobile styles
7. `03_Frontend/src/components/shared/StatusBadge.tsx` - Fix labels

### Medium Priority (3 files)
1. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` - Add comparison tab
2. `03_Frontend/src/components/score/VersionComparisonView.tsx` - Create component
3. `03_Frontend/src/components/score/DeltaIndicator.tsx` - Create component

---

## ✅ Implementation Priority

### Phase 1: Critical Fixes (Week 1)
1. ✅ Add "Peringkat" menu
2. ✅ Fix dashboard 5 metrics
3. ✅ Add model status column
4. ✅ Standardize all buttons
5. ✅ Fix language consistency

### Phase 2: High Priority (Week 2)
1. ✅ Add package detail modal
2. ✅ Add hamburger menu
3. ✅ Create LLM review modal
4. ✅ Fix leaderboard redirect

### Phase 3: Medium Priority (Week 3)
1. ✅ Add version comparison
2. ✅ Add expand all
3. ✅ Polish mobile UX

---

**For Frontend Agent**: Start with **Phase 1 Critical Fixes**. These are blocking issues from live QA testing.

All specifications are provided with implementation examples.
