# AI Sandbox – UI/UX Refinement v3.0 (Human Review Feedback)

> **Purpose**: Address specific UI/UX issues from human review on 2026-03-10
> **Version**: 3.0 (Human Review Refinement)
> **Last Updated**: March 10, 2026
> **Priority**: **CRITICAL** - Direct user feedback

---

## 🎯 Executive Summary

This document addresses **specific UI/UX issues** identified during human review. All items are **validated problems** that need immediate fixing.

### Key Issues Identified

| Category | Issue Count | Priority |
|----------|-------------|----------|
| Button Design | 8+ buttons | **CRITICAL** |
| Dashboard Metrics | 5 metrics | **CRITICAL** |
| Model List Status | Missing badges | **HIGH** |
| Assessment Packages | 3 packages only | **HIGH** |
| Rating Visibility | White on white | **CRITICAL** |
| Recipe Breakdown | No expand all | **MEDIUM** |
| LLM Summary | Missing detail view | **HIGH** |
| Leaderboard | Wrong redirect | **HIGH** |
| Review Queue | Remove from MVP | **MEDIUM** |

---

## 1. Button Design Standardization

### 🚨 CRITICAL: Inconsistent Button Styles

**Problem**: Buttons have inconsistent designs, colors, and placement

**Current Issues:**
- `Publish to Leaderboard` - Wrong style/color
- `Rerun` - Wrong style/color
- `Mulai Benchmark` - Wrong style/color
- Other buttons - Inconsistent

**Required Standard Buttons:**

| Button | Variant | Color | Usage |
|--------|---------|-------|-------|
| **Batal** | Secondary | Gray (`#6B7280`) | Cancel actions |
| **Lanjutkan** | Primary | Blue (`#1545BC`) | Continue to next step |
| **Kembali** | Outline | Blue border | Go back |
| **Run Benchmark** | Primary | Blue (`#1545BC`) | Start benchmark |
| **Publish to Leaderboard** | Primary | Blue (`#1545BC`) | Publish model |
| **Rerun** | Secondary | Purple (`#7740B5`) | Run again |
| **Mulai Benchmark** | Primary | Blue (`#1545BC`) | Start benchmark |
| **Submit** | Primary | Blue (`#1545BC`) | Submit forms |

**Implementation:**
```tsx
// ✅ CORRECT - Use Legion UI Button with proper variants
import { Button } from '@legion-ui-kit/react-core';

// Primary action
<Button variant="primary" size="md">
  Mulai Benchmark
</Button>

// Secondary action
<Button variant="secondary" size="md">
  Rerun
</Button>

// Cancel action
<Button variant="outline" size="md">
  Batal
</Button>

// Continue action
<Button variant="primary" size="lg">
  Lanjutkan
</Button>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/page.tsx` | Fix "Mulai Benchmark" button | **CRITICAL** |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Fix "Publish", "Rerun" buttons | **CRITICAL** |
| `03_Frontend/src/components/model/BenchmarkWizard.tsx` | Fix all wizard buttons | **CRITICAL** |
| `03_Frontend/src/components/shared/Button.tsx` | Update wrapper with standards | **HIGH** |

**QA Checklist:**
- [ ] All primary buttons use `#1545BC` (Primary Blue)
- [ ] All secondary buttons use `#7740B5` (Secondary Purple) or gray
- [ ] Button sizes are consistent (md for most, lg for primary CTAs)
- [ ] Hover states work correctly
- [ ] Disabled states are visible

---

## 2. Dashboard Metrics

### 🚨 CRITICAL: Wrong Metric Labels

**Current Issue**: Dashboard recap shows wrong metrics

**Required Metrics (Exactly 5):**

| # | Metric | Icon | Color | Data Source |
|---|--------|------|-------|-------------|
| 1 | **Total Model** | Box | Gray (`#6B7280`) | Count all models |
| 2 | **Testing Berjalan** | Play | Blue (`#1545BC`) | Count `run_in_progress` |
| 3 | **Testing Selesai** | Check | Green (`#10b981`) | Count `assessment_completed` |
| 4 | **Sedang di-Review** | Eye | Amber (`#f59e0b`) | Count `pending_review` |
| 5 | **Model dipublikasikan** | Globe | Green (`#059669`) | Count `published` |

**Implementation:**
```tsx
// Dashboard page - Update tiles
const tiles = [
  { 
    icon: Box, 
    label: 'Total Model',  // ✅ Indonesian
    value: totalModels,
    href: '/models'
  },
  { 
    icon: Play, 
    label: 'Testing Berjalan',  // ✅ Indonesian
    value: runningTests,
    href: '/models',
    color: 'blue'
  },
  { 
    icon: Check, 
    label: 'Testing Selesai',  // ✅ Indonesian
    value: completedTests,
    href: '/models',
    color: 'green'
  },
  { 
    icon: Eye, 
    label: 'Sedang di-Review',  // ✅ Indonesian
    value: pendingReviews,
    href: '/reviews',
    color: 'amber'
  },
  { 
    icon: Globe, 
    label: 'Model dipublikasikan',  // ✅ Indonesian
    value: publishedModels,
    href: '/ranking',
    color: 'green'
  },
];
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/dashboard/page.tsx` | Update all 5 metric labels | **CRITICAL** |
| `03_Frontend/src/components/dashboard/SummaryTile.tsx` | Ensure proper colors | **HIGH** |

**QA Checklist:**
- [ ] Exactly 5 tiles displayed
- [ ] All labels in Indonesian
- [ ] Correct icons for each metric
- [ ] Correct colors applied
- [ ] Numbers update in real-time

---

## 3. Model Saya (My Models)

### 🚨 CRITICAL: Status Not Visible

**Problem**: Model list doesn't show status badges

**Required Fix:**

**Current State:**
```
Model Name | Provider | [BLANK] | Last Run | Actions
```

**Expected State:**
```
Model Name | Provider | [StatusBadge] | Last Run | Actions
           |          | e.g., "Testing Berjalan"
           |          | e.g., "Assessment Completed"
           |          | e.g., "Published"
```

**Implementation:**
```tsx
// Models list table
<Table>
  <thead>
    <tr>
      <th>Nama Model</th>
      <th>Provider</th>
      <th>Status</th>  {/* ✅ Add this column */}
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
          <StatusBadge status={model.status} />  {/* ✅ Show status */}
        </td>
        <td>{formatDate(model.lastRun)}</td>
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
        </td>
      </TableRow>
    ))}
  </tbody>
</Table>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/page.tsx` | Add status column, detail button | **CRITICAL** |
| `03_Frontend/src/components/shared/DataTable.tsx` | Support status column | **HIGH** |

**QA Checklist:**
- [ ] Status badge visible for every model
- [ ] Status labels in Indonesian
- [ ] "Detail Testing" button appears for completed models
- [ ] Button navigates to correct run detail page

---

## 4. Assessment Packages

### 🚨 HIGH: Package Standards & Details

#### 4.1 Package Standards Alignment

**Problem**: Only 3 packages - need to verify against Moonshot benchmark standards

**Required Packages (Moonshot-Aligned):**

| Package | Coverage | Standard Alignment |
|---------|----------|-------------------|
| **Core Trust** | Security, Privacy, Bias | ISO/IEC 42001 A.5 |
| **Safety & Robustness** | Adversarial, Jailbreak | OWASP LLM01-04 |
| **Compliance** | PDP, Indonesian Context | Indonesian PDP Law |
| **Application Readiness** | Production readiness | NIST AI RMF Measure |

**Implementation:**
```tsx
// Assessment package selection
const packages = [
  {
    id: 'core-trust',
    name: 'Core Trust',
    description: 'Security, privacy, and bias assessment',
    tests: 45,
    estimatedTime: '60 mins',
    hasDetail: true  // ✅ Show "?" icon
  },
  {
    id: 'safety-robustness',
    name: 'Safety & Robustness',
    description: 'Adversarial testing and jailbreak prevention',
    tests: 38,
    estimatedTime: '50 mins',
    hasDetail: true
  },
  {
    id: 'compliance',
    name: 'Compliance',
    description: 'PDP compliance and Indonesian context',
    tests: 25,
    estimatedTime: '35 mins',
    hasDetail: true
  },
  {
    id: 'app-readiness',
    name: 'Application Readiness',
    description: 'Production readiness assessment',
    tests: 30,
    estimatedTime: '40 mins',
    hasDetail: true
  },
];
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Update packages list | **HIGH** |
| `03_Frontend/src/components/run/PackageDetailModal.tsx` | ✅ CREATE NEW | **HIGH** |

---

#### 4.2 Package Detail Modal ( "?" Icon)

**Problem**: "?" icon visible but not clickable

**Required Fix:**

**Implementation:**
```tsx
// In BenchmarkWizard package selection
<div className="package-header">
  <h3>{package.name}</h3>
  <Tooltip 
    content={
      <PackageDetailModal packageId={package.id} />
    }
    trigger="click"  // ✅ Make clickable
  >
    <HelpCircle 
      size={16} 
      className="info-icon"
      style={{ cursor: 'pointer' }}  // ✅ Show clickable cursor
    />
  </Tooltip>
</div>

// PackageDetailModal component
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <h3>{selectedPackage.name} - Test Details</h3>
  </ModalHeader>
  <ModalBody>
    <h4>What will be tested:</h4>
    <ul>
      <li>Prompt Injection (OWASP LLM01)</li>
      <li>Data Leakage (OWASP LLM06)</li>
      <li>Bias Detection (ISO A.5)</li>
      {/* ... list all tests */}
    </ul>
    <h4>Test Method:</h4>
    <p>{selectedPackage.methodology}</p>
  </ModalBody>
</Modal>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Make "?" clickable | **HIGH** |
| `03_Frontend/src/components/run/PackageDetailModal.tsx` | ✅ CREATE NEW | **HIGH** |

**QA Checklist:**
- [ ] "?" icon has pointer cursor
- [ ] Click opens modal with test details
- [ ] Modal shows what will be tested
- [ ] Modal shows test methodology
- [ ] Modal can be closed

---

## 5. Assessment Completed - Rating Visibility

### 🚨 CRITICAL: White on White

**Problem**: Class rating "B" has white font on white background - invisible

**Current (Broken):**
```css
.class-rating {
  color: #ffffff;  /* ❌ White */
  background: #ffffff;  /* ❌ White background */
}
```

**Required Fix:**

**Implementation:**
```css
/* ✅ CORRECT - Dark text on light background */
.class-rating {
  color: #0f172a;  /* Dark slate - visible */
  background: #f1f5f9;  /* Light gray background */
  border: 2px solid #1545BC;  /* Blue border for emphasis */
  font-weight: 700;  /* Bold for visibility */
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 24px;
}

/* Alternative: White text on dark background */
.class-rating-primary {
  color: #ffffff;  /* White */
  background: #1545BC;  /* Blue background */
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 24px;
}
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/score/ScoreCardGrid.tsx` | Fix rating color | **CRITICAL** |
| `03_Frontend/src/components/score/ClassRating.tsx` | ✅ CREATE NEW with proper colors | **CRITICAL** |

**QA Checklist:**
- [ ] Class rating visible on all backgrounds
- [ ] Contrast ratio ≥ 4.5:1
- [ ] Font size large enough (24px+)
- [ ] Bold weight for emphasis

---

## 6. Recipe Breakdown - Expand All

### 🟡 MEDIUM: Add Expand All Option

**Problem**: User must expand each item individually

**Required Fix:**

**Implementation:**
```tsx
// Recipe Breakdown component
<div className="recipe-breakdown">
  <div className="header">
    <h3>Recipe Breakdown</h3>
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleExpandAll}
      leftIcon={expandedAll ? <ChevronUp /> : <ChevronDown />}
    >
      {expandedAll ? 'Collapse All' : 'Expand All'}
    </Button>
  </div>
  
  {recipes.map(recipe => (
    <Accordion
      key={recipe.id}
      expanded={expandedAll || expandedRecipes.includes(recipe.id)}
      onToggle={() => toggleRecipe(recipe.id)}
    >
      <AccordionHeader>{recipe.name}</AccordionHeader>
      <AccordionBody>
        {/* Recipe details */}
      </AccordionBody>
    </Accordion>
  ))}
</div>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/run/RecipeBreakdown.tsx` | Add Expand All button | **MEDIUM** |
| `03_Frontend/src/components/findings/FindingsAccordion.tsx` | Support bulk expand | **MEDIUM** |

**QA Checklist:**
- [ ] "Expand All" button visible
- [ ] Click expands all items
- [ ] Button changes to "Collapse All" when expanded
- [ ] Click "Collapse All" collapses all

---

## 7. LLM Risk Summary Enhancement

### 🟠 HIGH: Detailed AI Review

**Problem**: LLM summary only shows overall, no category detail or AI justification

**Required Features:**

#### 7.1 Overall LLM Summary (Keep Existing)
```tsx
<Card variant="elevated">
  <CardHeader>
    <h3>LLM Risk Summary</h3>
  </CardHeader>
  <CardBody>
    <p>{overallSummary}</p>
  </CardBody>
</Card>
```

#### 7.2 Category-Level Detail (NEW)

**Implementation:**
```tsx
// For each category
<Card variant="outlined">
  <CardHeader>
    <div className="header-row">
      <h4>Security</h4>
      <Badge variant={securityRating}>{securityRating}</Badge>
    </div>
  </CardHeader>
  <CardBody>
    <p className="summary">{categorySummary}</p>
    
    <Button
      variant="outline"
      size="sm"
      onClick={() => openDetailReview('security')}
      leftIcon={<AIIcon />}
    >
      Review dengan AI
    </Button>
    
    {/* Detail modal */}
    <Modal isOpen={detailOpen} onClose={onClose}>
      <ModalHeader>
        <h3>AI Review: Security</h3>
      </ModalHeader>
      <ModalBody>
        <h4>Justifikasi:</h4>
        <p>{aiJustification}</p>
        
        <h4>Rekomendasi:</h4>
        <ul>
          <li>{recommendation1}</li>
          <li>{recommendation2}</li>
        </ul>
        
        <h4>Tindakan:</h4>
        <div className="actions">
          <Button variant="primary">Terapkan Rekomendasi</Button>
          <Button variant="outline">Export Review</Button>
        </div>
      </ModalBody>
    </Modal>
  </CardBody>
</Card>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Add category detail | **HIGH** |
| `03_Frontend/src/components/run/LLMReviewModal.tsx` | ✅ CREATE NEW | **HIGH** |

**QA Checklist:**
- [ ] Overall summary visible
- [ ] Each category has "Review dengan AI" button
- [ ] Click opens modal with AI justification
- [ ] Recommendations are actionable
- [ ] Export option available

---

## 8. Version Comparison

### 🟡 MEDIUM: Add Version Comparison View

**Problem**: No way to compare different runs

**Implementation:**
```tsx
// Add to run detail page
<Tabs defaultValue="latest">
  <TabList>
    <Tab value="latest">Latest Result</Tab>
    <Tab value="comparison">Version Comparison</Tab>
  </TabList>
  
  <TabPanel value="comparison">
    <VersionComparisonView
      runs={availableRuns}
      onSelect={handleSelectRuns}
    />
  </TabPanel>
</Tabs>

// VersionComparisonView component
<div className="comparison-grid">
  <div className="run-column">
    <h4>Run 1 (Latest)</h4>
    <ScoreCardGrid scores={run1.scores} />
  </div>
  
  <div className="delta-column">
    <h4>Delta</h4>
    <DeltaIndicator value={scoreDelta} trend={trend} />
  </div>
  
  <div className="run-column">
    <h4>Run 2</h4>
    <ScoreCardGrid scores={run2.scores} />
  </div>
</div>
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Add comparison tab | **MEDIUM** |
| `03_Frontend/src/components/score/VersionComparisonView.tsx` | ✅ CREATE NEW | **MEDIUM** |

**QA Checklist:**
- [ ] Comparison tab visible
- [ ] Can select 2 runs to compare
- [ ] Scores displayed side-by-side
- [ ] Delta indicators show changes
- [ ] Trend arrows (↑ ↓ →) visible

---

## 9. Leaderboard & Publishing

### 🟠 HIGH: Wrong Redirect After Publish

**Problem**: After publish, redirects to landing page instead of in-app leaderboard

**Required Flow:**

**Current (Wrong):**
```
Click "Publish" → Redirect to public landing page (http://localhost:3000/)
```

**Expected (Correct):**
```
Click "Publish" → Show success toast → Navigate to in-app leaderboard (/ranking?view=my-models)
```

**Implementation:**
```tsx
// After successful publish
const handlePublishSuccess = () => {
  toast.success('Model berhasil dipublikasikan ke Leaderboard');
  router.push('/ranking?view=my-models');  // ✅ In-app leaderboard
};

// Leaderboard page with filter
const LeaderboardPage = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  
  const filteredModels = view === 'my-models'
    ? models.filter(m => m.ownerId === currentUserId)
    : models;  // Show all for public view
  
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      
      {/* Comparison view */}
      <ModelComparisonGrid 
        models={filteredModels}
        maxCompare={3}
        showPrivateData={view === 'my-models'}
        hidePrivateData={view !== 'my-models'}
      />
    </div>
  );
};
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Fix publish redirect | **HIGH** |
| `03_Frontend/src/app/[locale]/(public)/ranking/page.tsx` | Add comparison features | **HIGH** |
| `03_Frontend/src/components/ranking/ModelComparisonGrid.tsx` | ✅ CREATE NEW | **HIGH** |

**QA Checklist:**
- [ ] Publish success shows toast
- [ ] Redirects to `/ranking?view=my-models`
- [ ] Can compare own models
- [ ] Other users' data hidden (only scores visible)
- [ ] Comparison limited to 3 models

---

## 10. Review Queue Removal

### 🟡 MEDIUM: Remove from MVP

**Problem**: Review queue not needed for MVP

**Action Required:**

1. **Hide Menu Item** (but don't delete code)
```tsx
// Sidebar navigation
<NavGroup label="Operations">
  <NavItem icon="Play" label="Runs" href="/runs" />
  {/* <NavItem icon="ClipboardList" label="Review Queue" href="/reviews" /> */}
  {/* ⚠️ Commented out for MVP - preserve for future regulation features */}
  <NavItem icon="Globe" label="Publication" href="/publication" />
</NavGroup>
```

2. **Preserve Code Concept**
```
⚠️ DO NOT DELETE:
- /reviews route
- ReviewQueue component
- DecisionDrawer component

These will be needed for future regulation-heavy versions.
Comment out or use feature flag: NEXT_PUBLIC_ENABLE_REVIEW_QUEUE=false
```

**Files to Modify:**
| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/components/layout/Sidebar.tsx` | Comment out review queue | **MEDIUM** |
| `03_Frontend/src/app/[locale]/(internal)/reviews/page.tsx` | Add feature flag check | **MEDIUM** |

**QA Checklist:**
- [ ] Review Queue menu hidden
- [ ] Code preserved in repository
- [ ] Feature flag works
- [ ] Can re-enable with flag

---

## 📋 Complete File Change Summary

### 🆕 New Components to Create (7 components)

| Component | Location | Priority |
|-----------|----------|----------|
| `PackageDetailModal.tsx` | `03_Frontend/src/components/run/` | **HIGH** |
| `ClassRating.tsx` | `03_Frontend/src/components/score/` | **CRITICAL** |
| `LLMReviewModal.tsx` | `03_Frontend/src/components/run/` | **HIGH** |
| `VersionComparisonView.tsx` | `03_Frontend/src/components/score/` | **MEDIUM** |
| `ModelComparisonGrid.tsx` | `03_Frontend/src/components/ranking/` | **HIGH** |

### 📝 Files to Modify (11 files)

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(internal)/dashboard/page.tsx` | Update 5 metrics | **CRITICAL** |
| `03_Frontend/src/app/[locale]/(internal)/models/page.tsx` | Add status column | **CRITICAL** |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/page.tsx` | Add detail button | **CRITICAL** |
| `03_Frontend/src/components/run/BenchmarkWizard.tsx` | Fix packages, "?" icon | **HIGH** |
| `03_Frontend/src/components/score/ScoreCardGrid.tsx` | Fix rating colors | **CRITICAL** |
| `03_Frontend/src/components/run/RecipeBreakdown.tsx` | Add Expand All | **MEDIUM** |
| `03_Frontend/src/components/review/DecisionDrawer.tsx` | Remove from MVP nav | **MEDIUM** |
| `03_Frontend/src/components/layout/Sidebar.tsx` | Hide review queue | **MEDIUM** |
| `03_Frontend/src/components/shared/Button.tsx` | Standardize buttons | **CRITICAL** |
| `03_Frontend/src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx` | Fix publish redirect, add LLM review | **HIGH** |
| `03_Frontend/src/app/[locale]/(public)/ranking/page.tsx` | Add comparison features | **HIGH** |

---

## ✅ Implementation Priority

### Phase 1: Critical Visual Fixes (Week 1)
1. ✅ Fix all button styles (8+ buttons)
2. ✅ Fix dashboard metrics (5 tiles)
3. ✅ Fix model status visibility
4. ✅ Fix class rating colors (white on white)

### Phase 2: High Priority Features (Week 2)
1. ✅ Add package detail modal ("?" icon)
2. ✅ Add LLM review modal
3. ✅ Fix leaderboard redirect
4. ✅ Add model comparison grid

### Phase 3: Medium Priority (Week 3)
1. ✅ Add Expand All to recipe breakdown
2. ✅ Add version comparison view
3. ✅ Hide review queue (preserve code)

---

**For Frontend Agent**: Start with **Phase 1: Critical Visual Fixes**. These are the most visible issues affecting user experience.

All specifications are provided above with implementation examples.
