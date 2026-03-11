# AI Sandbox – UI/UX Refinement v6.0 (QA Agent Feedback)

> **Purpose**: Address all issues from live QA testing (March 11, 2026)
> **Version**: 6.0 (QA Agent Recovery)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Blocking production goals

---

## 🚨 Executive Summary

### Critical Issues from QA Testing

| Issue | Impact | Status | Priority |
|-------|--------|--------|----------|
| **Promote to ModelHub fails** | Blocks entire user journey | ❌ Broken | **P0 - CRITICAL** |
| **Status column empty** | Can't track model state | ❌ Broken | **P0 - CRITICAL** |
| **Prompt defaults to 25%** | Wrong test coverage | ❌ Broken | **P0 - CRITICAL** |
| **Package "?" not clickable** | Missing test details | ❌ Broken | **P1 - HIGH** |
| **Language inconsistency** | Confusing UX | ⚠️ Issue | **P1 - HIGH** |
| **Navbar overflows mobile** | Broken mobile UX | ⚠️ Issue | **P1 - HIGH** |
| **LLM summary not granular** | Missing category detail | ⚠️ Issue | **P2 - MEDIUM** |

---

## 1. Promote to ModelHub - CRITICAL BUG FIX

### 🚨 P0: "Gagal publish" Error

**Problem**: Clicking "Promote to ModelHub" shows error even for valid scores (A/B)

**Root Cause**: Likely backend API endpoint mismatch or missing score validation

**Required Fix:**

```tsx
// In runs/[runId]/page.tsx
const handlePromote = async () => {
  try {
    // Check score eligibility (must be A/B/C = score >= 60)
    if (overallScore < 60) {
      toast.error('Model dengan skor di bawah 60 (nilai D atau E) tidak dapat dipromosikan ke ModelHub');
      return;
    }

    // Call correct API endpoint
    const response = await api.promoteToModelHub(modelId, {
      runId,
      overallScore,
      grade
    });

    if (response.success) {
      toast.success('Model berhasil dipromosikan ke ModelHub');
      // Update model status
      await api.updateModelStatus(modelId, 'published_to_modelhub');
      // Redirect to ModelHub view (NOT landing page)
      router.push('/ranking?view=promoted');
    } else {
      toast.error(response.message || 'Gagal mempromosikan model ke ModelHub');
    }
  } catch (error) {
    console.error('Promotion error:', error);
    toast.error('Terjadi kesalahan saat mempromosikan model. Periksa koneksi dan coba lagi.');
  }
};
```

**API Endpoint Check:**
```typescript
// Ensure this endpoint exists in backend
POST /api/models/:id/promote
Body: {
  runId: string;
  overallScore: number;
  grade: 'A' | 'B' | 'C';
}

Response: {
  success: boolean;
  message: string;
  data: { modelId: string; status: 'published_to_modelhub' };
}
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Fix promote logic | **P0 - CRITICAL** |
| `03_Frontend/src/lib/api.ts` | Add/fix promote endpoint | **P0 - CRITICAL** |
| Backend API | Ensure `/api/models/:id/promote` exists | **P0 - CRITICAL** |

**QA Checklist:**
- [ ] Click "Promote" with score A/B/C → Success
- [ ] Click "Promote" with score D/E → Blocked with message
- [ ] Success toast shows "Model berhasil dipromosikan ke ModelHub"
- [ ] Redirects to `/ranking?view=promoted` (NOT landing page)
- [ ] Model status updates to `published_to_modelhub`

---

## 2. Status Column - Data Population

### 🚨 P0: Empty Status Column

**Problem**: Status column shows nothing in Model Saya list

**Required Fix:**

```tsx
// In models/page.tsx
<Table>
  <thead>
    <tr>
      <th>Nama Model</th>
      <th>Provider</th>
      <th>Status</th>  {/* ✅ Must show data */}
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
          {/* ✅ Render StatusBadge with correct status */}
          <StatusBadge status={model.status} />
        </td>
        <td>
          {model.lastRun ? formatDate(model.lastRun) : '-'}
        </td>
        <td>
          {/* Show action based on status */}
          {model.status === 'assessment_completed' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/models/${model.id}/runs/${model.latestRunId}`)}
            >
              Detail Testing
            </Button>
          )}
          {model.status === 'promotion_ready' && (
            <Badge variant="info">Siap Promosi</Badge>
          )}
          {model.status === 'published_to_modelhub' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`/ranking?model=${model.id}`, '_blank')}
            >
              Lihat di ModelHub
            </Button>
          )}
        </td>
      </TableRow>
    ))}
  </tbody>
</Table>
```

**Status Mapping:**
```typescript
// Ensure backend returns these exact status values
const statusMap = {
  draft: 'Draf',
  validation_pending: 'Validasi Endpoint',
  endpoint_valid: 'Endpoint Valid',
  run_in_progress: 'Sedang Berjalan',
  assessment_completed: 'Selesai',
  review_ready: 'Siap Review',
  approved: 'Disetujui',
  promotion_ready: 'Siap Promosi',
  published_to_modelhub: 'Dipublikasikan ke ModelHub',
  restricted: 'Dibatasi',
  reassessment_required: 'Perlu Rerun'
};
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/page.tsx` | Populate status column | **P0 - CRITICAL** |
| `03_Frontend/src/lib/statusConfig.ts` | Ensure all statuses mapped | **P0 - CRITICAL** |
| Backend API | Return correct status values | **P0 - CRITICAL** |

**QA Checklist:**
- [ ] Every model shows status badge
- [ ] Status labels in Indonesian
- [ ] Correct colors for each status
- [ ] "Detail Testing" button for completed
- [ ] "Lihat di ModelHub" for published

---

## 3. Prompt Default - 100% Not 25%

### 🚨 P0: Wrong Default Value

**Problem**: Prompt selection defaults to 25%, should be 100%

**Required Fix:**

```tsx
// In BenchmarkWizard.tsx
const [promptPercentage, setPromptPercentage] = useState(100); // ✅ Default to 100%

// In the form
<div className="form-group">
  <label>Prompt Coverage</label>
  <Select
    value={promptPercentage}
    onChange={setPromptPercentage}
    options={[
      { value: 25, label: '25% (Cepat)' },
      { value: 50, label: '50% (Sedang)' },
      { value: 75, label: '75% (Lengkap)' },
      { value: 100, label: '100% (Penuh - Direkomendasikan)' }
    ]}
  />
  <p className="helper-text">
    Estimasi waktu: {calculateTime(promptPercentage)} menit
  </p>
</div>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Default to 100% | **P0 - CRITICAL** |

**QA Checklist:**
- [ ] Default value is 100%
- [ ] 100% is marked as "Direkomendasikan"
- [ ] Time estimate updates with percentage
- [ ] User can still select lower percentages

---

## 4. Package Detail Modal - Make Clickable

### 🟠 P1: "?" Icon Not Clickable

**Problem**: Package detail shows tooltip only, not modal

**Required Fix:**

```tsx
// In BenchmarkWizard.tsx
const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

// Package card with clickable info button
<div className="package-card">
  <div className="package-header">
    <div className="package-info">
      <h3>{package.name}</h3>
      <p>{package.description}</p>
      <div className="meta">
        <span>{package.tests} tests</span>
        <span>~{package.estimatedTime} menit</span>
      </div>
    </div>
    
    {/* ✅ Clickable info button */}
    <button 
      className="info-button"
      onClick={() => setSelectedPackage(package.id)}
      style={{ 
        cursor: 'pointer', 
        background: 'none', 
        border: 'none',
        padding: '8px'
      }}
      aria-label="Lihat detail testing"
    >
      <HelpCircle size={20} color="var(--color-text-muted)" />
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
    <h3>{getPackage(selectedPackage)?.name} - Detail Testing</h3>
  </ModalHeader>
  <ModalBody>
    <h4>Akan diuji:</h4>
    <ul>
      <li>Prompt Injection (OWASP LLM01)</li>
      <li>Data Leakage (OWASP LLM06)</li>
      <li>Bias Detection (ISO/IEC 42001 A.5)</li>
      <li>Jailbreak Attempts</li>
      <li>PII Disclosure</li>
      <li>SARA Content Detection</li>
    </ul>
    
    <h4>Metode Testing:</h4>
    <p>{getPackage(selectedPackage)?.methodology}</p>
    
    <h4>Estimasi Waktu:</h4>
    <p>{getPackage(selectedPackage)?.estimatedTime} menit</p>
    
    <h4>Output:</h4>
    <ul>
      <li>Skor per kategori (Trust, Security, Privacy, dll)</li>
      <li>Temuan dengan severity (Critical, High, Medium, Low)</li>
      <li>Bukti (prompt + response untuk setiap temuan)</li>
      <li>Rekomendasi mitigasi</li>
      <li>LLM-generated summary</li>
    </ul>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setSelectedPackage(null)}>Tutup</Button>
  </ModalFooter>
</Modal>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Make "?" clickable | **P1 - HIGH** |
| `03_Frontend/src/components/run/PackageDetailModal.tsx` | Create modal component | **P1 - HIGH** |

**QA Checklist:**
- [ ] "?" has pointer cursor
- [ ] Click opens modal (not tooltip)
- [ ] Modal shows test details
- [ ] Modal shows methodology
- [ ] Modal shows expected output
- [ ] Can close modal

---

## 5. Language Standardization

### 🟠 P1: Indonesian-First Labels

**Problem**: Mix of English and Indonesian throughout UI

**Required Changes:**

### Navigation & Menus
| English | Indonesian (Use This) |
|---------|----------------------|
| Dashboard | Dashboard |
| My Models | Model Saya |
| Runs | Pengujian |
| History | Riwayat |
| Review | Review |
| ModelHub | ModelHub |
| Leaderboard | Peringkat |
| Home | Beranda |
| Login | Masuk |
| Logout | Keluar |

### Actions
| English | Indonesian (Use This) |
|---------|----------------------|
| Add Model | Tambah Model |
| Save | Simpan |
| Cancel | Batal |
| Continue | Lanjutkan |
| Back | Kembali |
| Submit for Review | Ajukan untuk Review |
| **Promote to ModelHub** | **Promosikan ke ModelHub** |
| Rerun | Jalankan Ulang |
| Run Benchmark | Jalankan Benchmark |
| View Details | Lihat Detail |
| Compare | Bandingkan |

### Metrics
| English | Indonesian (Use This) |
|---------|----------------------|
| Total Models | Total Model |
| Testing Running | Testing Berjalan |
| Testing Completed | Testing Selesai |
| Under Review | Sedang di-Review |
| **Promoted to ModelHub** | **Dipromosikan ke ModelHub** |

### Status Labels
| Status | Indonesian (Use This) |
|--------|----------------------|
| `draft` | Draf |
| `validation_pending` | Validasi Endpoint |
| `endpoint_valid` | Endpoint Valid |
| `run_in_progress` | Sedang Berjalan |
| `assessment_completed` | Selesai |
| `review_ready` | Siap Review |
| `approved` | Disetujui |
| `promotion_ready` | Siap Promosi |
| `published_to_modelhub` | Dipublikasikan ke ModelHub |

**Implementation:**
```tsx
// Use i18n consistently
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
      <Tile label={t('dashboard.promoted_to_modelhub')} />
    </>
  );
}
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/messages/id.json` | Update all translations | **P1 - HIGH** |
| All pages | Replace hardcoded strings | **P1 - HIGH** |

**QA Checklist:**
- [ ] All navigation in Indonesian
- [ ] All buttons in Indonesian
- [ ] All status labels in Indonesian
- [ ] All metrics in Indonesian
- [ ] "Promosikan ke ModelHub" not "Publish"

---

## 6. Mobile Navigation

### 🟠 P1: Hamburger Menu

**Problem**: Navbar overflows on small screens (<375px)

**Required Fix:**

```tsx
// In PublicNavbar.tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
  
  {/* Mobile menu overlay */}
  {mobileMenuOpen && (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu">
        <NavLink 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
        >
          Beranda
        </NavLink>
        <NavLink 
          href="/ranking" 
          onClick={() => setMobileMenuOpen(false)}
        >
          Peringkat
        </NavLink>
        <NavLink 
          href="/login" 
          onClick={() => setMobileMenuOpen(false)}
        >
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
    padding: 8px;
  }
  .mobile-menu-overlay {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 100;
    padding: 16px;
  }
  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .mobile-menu a {
    padding: 12px 16px;
    border-radius: 8px;
    text-decoration: none;
  }
  .mobile-menu a:hover {
    background: var(--color-bg-secondary);
  }
}
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/layout/PublicNavbar.tsx` | Add hamburger | **P1 - HIGH** |
| `03_Frontend/src/components/layout/NavbarMinimal.tsx` | Add hamburger | **P1 - HIGH** |
| `03_Frontend/src/styles/globals.css` | Mobile styles | **P1 - HIGH** |

**QA Checklist:**
- [ ] Hamburger visible on mobile (<768px)
- [ ] Click opens menu overlay
- [ ] All links clickable
- [ ] Click outside closes menu
- [ ] No horizontal scroll
- [ ] Works on iPhone SE (375px)

---

## 7. LLM Summary - Category Detail

### 🟡 P2: Granular AI Justification

**Problem**: LLM summary only shows overall, not per-category

**Required Fix:**

```tsx
// In runs/[runId]/page.tsx
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

// For each category
<Card variant="outlined">
  <CardHeader>
    <div className="header-row">
      <h4>Keamanan</h4>
      <Badge variant={securityRating}>{securityRating}</Badge>
    </div>
  </CardHeader>
  <CardBody>
    <p className="summary">{categorySummary}</p>
    
    <Button
      variant="outline"
      size="sm"
      onClick={() => setSelectedCategory('security')}
      leftIcon={<AIIcon />}
    >
      Review dengan AI
    </Button>
  </CardBody>
</Card>

// Category Review Modal
<Modal 
  isOpen={selectedCategory !== null} 
  onClose={() => setSelectedCategory(null)}
  size="lg"
>
  <ModalHeader>
    <h3>AI Review: {getCategoryName(selectedCategory)}</h3>
  </ModalHeader>
  <ModalBody>
    <h4>Justifikasi AI:</h4>
    <p>{getCategoryReview(selectedCategory)?.justification}</p>
    
    <h4>Rekomendasi:</h4>
    <ul>
      {getCategoryReview(selectedCategory)?.recommendations.map((rec, i) => (
        <li key={i}>{rec}</li>
      ))}
    </ul>
    
    <h4>Tindakan:</h4>
    <div className="actions">
      <Button variant="primary">Terapkan Rekomendasi</Button>
      <Button variant="outline">Export Review</Button>
    </div>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setSelectedCategory(null)}>Tutup</Button>
  </ModalFooter>
</Modal>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Add category detail | **P2 - MEDIUM** |
| `03_Frontend/src/components/run/LLMReviewModal.tsx` | Create modal | **P2 - MEDIUM** |

**QA Checklist:**
- [ ] Each category has "Review dengan AI" button
- [ ] Click opens modal with AI justification
- [ ] Recommendations are specific to category
- [ ] Export option available
- [ ] Modal can be closed

---

## 📋 Complete File Change Summary

### P0 - Critical (3 files + Backend)
1. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` - Fix promote logic
2. `03_Frontend/src/app/[locale]/(internal)/models/page.tsx` - Populate status column
3. `03_Frontend/src/components/run/BenchmarkWizard.tsx` - Default prompt to 100%
4. **Backend API** - Fix `/api/models/:id/promote` endpoint

### P1 - High (7 files)
1. `03_Frontend/src/lib/api.ts` - Add promote endpoint
2. `03_Frontend/src/lib/statusConfig.ts` - Ensure all statuses mapped
3. `03_Frontend/src/components/run/BenchmarkWizard.tsx` - Make "?" clickable
4. `03_Frontend/src/components/run/PackageDetailModal.tsx` - Create modal
5. `03_Frontend/src/messages/id.json` - Update translations
6. `03_Frontend/src/components/layout/PublicNavbar.tsx` - Add hamburger
7. `03_Frontend/src/components/layout/NavbarMinimal.tsx` - Add hamburger
8. `03_Frontend/src/styles/globals.css` - Mobile styles

### P2 - Medium (2 files)
1. `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` - Add category detail
2. `03_Frontend/src/components/run/LLMReviewModal.tsx` - Create modal

---

## ✅ Implementation Priority

### Phase 1: P0 Critical Bugs (IMMEDIATE)
1. ✅ Fix "Promote to ModelHub" error
2. ✅ Populate status column
3. ✅ Default prompt to 100%

### Phase 2: P1 High Priority (This Week)
1. ✅ Make "?" clickable with modal
2. ✅ Standardize Indonesian labels
3. ✅ Add hamburger menu
4. ✅ Fix all language inconsistencies

### Phase 3: P2 Medium Priority (Next Week)
1. ✅ Add category-level LLM review
2. ✅ Polish mobile UX
3. ✅ Add expand all to recipe breakdown

---

**For Frontend Agent**: Start with **Phase 1 P0 Critical Bugs** immediately. These are blocking the primary user journey.

All specifications are provided with implementation examples.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
