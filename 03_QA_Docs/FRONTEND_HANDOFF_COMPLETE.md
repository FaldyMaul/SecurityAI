# AI Sandbox – Frontend Handoff Document (March 2026)

> **Purpose**: Complete UI/UX specification for frontend implementation
> **Version**: 2.0 (Human Review v2 + Accessibility Optimized)
> **Last Updated**: March 10, 2026
> **Design System**: Legion UI + AI Sandbox Custom Components

---

## 🎯 Executive Summary

This document provides the complete UI/UX specification for the AI Sandbox platform after comprehensive refinements including:

1. ✅ **Legion UI Integration** - Base component library
2. ✅ **Color Palette Refresh** - Premium dashboard theme (#221C6A, #1545BC, #7740B5, #A4E7DE)
3. ✅ **Accessibility Optimization** - All text meets WCAG 2.1 AA standards
4. ✅ **Human Review v2 Features** - New benchmark workflow, background processing, publishing guards

---

## 📁 Project Structure

```
AISandboxDev/
├── 01_Planning/                    # UX journeys, personas
├── 02_Product_UI/                  # UI specs, design system
│   ├── Design_System_Guide.md      # Component usage
│   ├── Color_Contrast_Guide.md     # Accessibility guide
│   └── UI_Refinement_Summary_March2026.md
├── 03_Frontend/                    # Next.js application
│   └── src/
│       ├── app/[locale]/           # Locale-first routing
│       │   ├── (public)/           # Home, Ranking (public access)
│       │   ├── (internal)/         # Dashboard, Models, Reviews (auth required)
│       │   └── (auth)/             # Login (minimal navbar)
│       ├── components/
│       │   ├── shared/             # Legion UI wrappers (Button, Input, StatusBadge)
│       │   ├── dashboard/          # Dashboard-specific components
│       │   ├── model/              # Model management components
│       │   ├── score/              # Score visualization
│       │   └── layout/             # Navigation, sidebar
│       ├── lib/
│       │   ├── statusConfig.ts     # Status badge configuration
│       │   └── api.ts              # API client
│       └── styles/
│           ├── variables.css       # Design tokens (LEGION UI + custom)
│           └── globals.css         # Global styles
└── 03_QA_Docs/                     # QA documentation
    ├── UIUX_QA_Documentation.md    # Visual acceptance criteria
    └── Frontend_QA_Documentation.md # Technical acceptance criteria
```

---

## 🎨 Design System

### 1. Color Palette (Premium Dashboard Theme)

#### Primary Brand Colors

| Token | Hex | Usage | Contrast Ratio |
|-------|-----|-------|----------------|
| `--color-primary-dark` | `#221C6A` | Headers, sidebar, dark backgrounds | 15.3:1 with white |
| `--color-primary` | `#1545BC` | Main actions, links, buttons | 8.2:1 with white |
| `--color-primary-hover` | `#0f3494` | Hover states | 10.1:1 with white |
| `--color-primary-light` | `#E8EEFC` | Light backgrounds | 15.1:1 with dark text |

#### Secondary & Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary` | `#7740B5` | Secondary actions, highlights |
| `--color-secondary-hover` | `#5f3391` | Secondary hover states |
| `--color-secondary-light` | `#F3E8FC` | Light purple backgrounds |
| `--color-accent` | `#A4E7DE` | Success states, decorative |
| `--color-accent-hover` | `#82D4C9` | Accent hover |

#### Text Colors (Accessibility Optimized)

| Token | Hex | Ratio on White | WCAG Level | Usage |
|-------|-----|----------------|------------|-------|
| `--color-text-primary` | `#0f172a` | 16.8:1 | AAA | Main content, headings |
| `--color-text-secondary` | `#334155` | 10.2:1 | AAA | Supporting text |
| `--color-text-muted` | `#64748b` | 5.2:1 | AA | Metadata, timestamps |
| `--color-text-inverse` | `#ffffff` | N/A | N/A | Text on dark backgrounds |
| `--color-text-on-dark` | `#f1f5f9` | 15.3:1 on navy | AAA | Alternative for dark bg |

#### ⚠️ FORBIDDEN Color Combinations

**NEVER use these:**

| Background | Text | Issue |
|------------|------|-------|
| White | `#94a3b8` (old muted) | 2.8:1 - FAILS |
| Light teal `#A4E7DE` | White | 1.5:1 - Completely unreadable |
| Primary Light `#E8EEFC` | Muted colors | Text invisible |
| Any pastel | White | Insufficient contrast |

### 2. Legion UI Components

**Package**: `@legion-ui-kit/react-core`

| Component | Import | Usage |
|-----------|--------|-------|
| Button | `import { Button } from '@legion-ui-kit/react-core'` | All actions |
| Input | `import { Input } from '@legion-ui-kit/react-core'` | Form inputs |
| Card | `import { Card } from '@legion-ui-kit/react-core'` | Containers |
| Badge | `import { Badge } from '@legion-ui-kit/react-core'` | Status labels |
| Skeleton | `import { Skeleton } from '@legion-ui-kit/react-core'` | Loading states |
| Modal | `import { Modal } from '@legion-ui-kit/react-core'` | Dialogs |
| Alert | `import { Alert } from '@legion-ui-kit/react-core'` | Notifications |

**AI Sandbox Wrappers:**

```tsx
// ✅ Use these wrappers
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Skeleton } from '@/components/shared/Skeleton';
```

### 3. Custom Components

| Component | Location | Description |
|-----------|----------|-------------|
| `StatusBadge` | `@/components/shared/StatusBadge` | Extends Legion Badge with workflow states |
| `ScoreBlock` | `@/components/score/ScoreBlock` | Trust score tile with ring |
| `ScoreCardGrid` | `@/components/score/ScoreCardGrid` | 5-column score grid |
| `WorkflowStepper` | `@/components/model/WorkflowStepper` | Model lifecycle stepper |
| `SummaryTile` | `@/components/dashboard/SummaryTile` | Dashboard metric cards |
| `RankBadge` | `@/components/ranking/RankBadge` | Ranking position badge |
| `CompareBar` | `@/components/ranking/CompareBar` | Model comparison sticky bar |
| `DecisionDrawer` | `@/components/review/DecisionDrawer` | Reviewer decision panel |

---

## 🏠 Page Specifications

### 1. Home Page (`/`)

**Route**: `src/app/[locale]/(public)/page.tsx`

#### Hero Section
```css
/* ✅ CORRECT Implementation */
.hero {
  background: linear-gradient(135deg, 
    #221C6A 0%,    /* Deep Navy */
    #1545BC 50%,   /* Primary Blue */
    #0f3494 100%   /* Dark Blue - NOT light teal */
  );
  color: #ffffff;  /* White text - always readable */
}

.heroTitle {
  color: #ffffff;
  font-weight: 700;
}

.heroSubtitle {
  color: #ffffff;
  font-weight: 500;  /* Medium for readability */
  opacity: 1.0;      /* No transparency */
}
```

#### Top Models Grid
- **Layout**: 3-column grid (desktop), 1-column (mobile)
- **Card Hover**: Bottom accent bar animation (blue → purple gradient)
- **Approval Label**: Gradient background with white text

#### How It Works (Step Cards)
```css
.stepCard {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
}

.stepCard h3 {
  color: #0f172a;  /* Dark text - readable */
  font-weight: 600;
}

.stepCard p {
  color: #334155;  /* Secondary text */
}

.stepCard:hover {
  background: #E8EEFC;  /* Light blue */
  border-color: #1545BC;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

#### Trust Statement
```css
.trustSection {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #0f172a;  /* Primary text - readable */
  border-radius: 0.75rem;
}
```

### 2. Dashboard (`/dashboard`)

**Route**: `src/app/[locale]/(internal)/dashboard/page.tsx`

**Audience**: Admin / Reviewer only

#### Summary Tiles
```tsx
// Implementation with Legion UI Card
<Card variant="elevated" hoverable>
  <div className="iconWrapper">
    <Icon size={24} />
  </div>
  <span className="value">{value}</span>
  <span className="label">{label}</span>
</Card>
```

**Hover Effect**: Top gradient accent bar appears

**Highlight Variant** (for pending reviews):
- Purple gradient accent bar
- Pulse animation using `rgba(119, 64, 181, 0.3)`

#### Review Queue Preview
- **Priority Rows**: 4px left border with `--color-severity-critical` (#dc2626)
- **Link**: "Review →" navigates to `/reviews/[id]`

#### Recent Runs
- **Status Badges**: Use `StatusBadge` component with proper colors
- **Link**: Navigates to `/models/[id]/runs/[runId]`

### 3. My Models (`/models`)

**Route**: `src/app/[locale]/(internal)/models/page.tsx`

**Features**:
- Filter bar: Status dropdown, date range, search
- Table with hover states
- Empty state: Illustration + CTA

**Mobile**: Convert table to card list

### 4. Model Detail (`/models/[id]`)

**Route**: `src/app/[locale]/(internal)/models/[id]/page.tsx`

#### Workflow Stepper
```
Draft → Validated → Assessed → Reviewed → Published
```

**Colors**:
- Active step: Primary blue (#1545BC)
- Completed step: Primary blue with checkmark
- Future step: Grey (#94a3b8)

#### Score Card Grid
5-column grid showing:
1. Trust Score (ring color by score range)
2. Security Score
3. Privacy Score
4. Application Readiness
5. Compliance Coverage

**Score Ring Colors**:
| Score | Color | Hex |
|-------|-------|-----|
| 80-100 | Green | #059669 |
| 60-79 | Blue | #1545BC |
| 40-59 | Purple | #7740B5 |
| 20-39 | Amber | #f59e0b |
| 0-19 | Red | #dc2626 |

### 5. Ranking (`/ranking`)

**Route**: `src/app/[locale]/(public)/ranking/page.tsx`

**Features**:
- Filter bar: Provider, type, status, use case, score range
- Ranked cards with RankBadge (#1 gold, #2 silver, #3 bronze)
- Compare checkbox (max 3)
- Sticky CompareBar when ≥2 selected

---

## 🔧 Human Review v2 Features

### 1. Assessment Setup Workflow

#### Package Selection (Default State)
```tsx
// ✅ "Select All" checked by default
const [selectedPackages, setSelectedPackages] = useState(['all']);

// Show time estimate
<TimeEstimate promptCount={100} estimatedMinutes={120} />
```

#### Warning on Deselect
```tsx
// Show warning when user deselects a package
<Alert variant="warning">
  <AlertTitle>Reduced Coverage</AlertTitle>
  <AlertDescription>
    Deselecting this package will reduce assessment coverage by 15%.
    Estimated time saved: 18 minutes.
  </AlertDescription>
</Alert>
```

#### Info Tooltips
```tsx
// (?) icon with tooltip for each package
<Tooltip content="Tests for prompt injection, jailbreaking, and adversarial robustness">
  <HelpCircle size={16} />
</Tooltip>
```

### 2. Background Benchmark Processing

#### Key Requirements
1. **Persistent State**: Store running benchmark in localStorage/database
2. **Continue on Navigate**: User can leave page without breaking run
3. **Global Progress Indicator**: Show in sidebar/header during run
4. **Auto-Resume**: If user returns to page, resume polling

#### Implementation Pattern
```tsx
// Store benchmark state
useEffect(() => {
  if (runStatus === 'running') {
    localStorage.setItem('activeBenchmark', JSON.stringify({
      runId,
      modelId,
      startTime: Date.now()
    }));
  }
}, [runStatus]);

// Poll in background
useEffect(() => {
  const interval = setInterval(async () => {
    const status = await fetchRunStatus(runId);
    if (status === 'completed') {
      clearInterval(interval);
      localStorage.removeItem('activeBenchmark');
    }
  }, 5000);
  return () => clearInterval(interval);
}, [runId]);
```

### 3. Results & Recommendations

#### LLM-Generated Summary
```tsx
// Display AI summary of risks
<Card variant="elevated">
  <CardHeader>
    <h3>Assessment Summary</h3>
  </CardHeader>
  <CardBody>
    <p>{llmSummary.riskOverview}</p>
    <ul>
      {llmSummary.topRisks.map(risk => (
        <li key={risk}>{risk}</li>
      ))}
    </ul>
  </CardBody>
</Card>
```

#### Mitigation Guide
```tsx
// Actionable recommendations
<Alert variant="info">
  <AlertTitle>Recommended Actions</AlertTitle>
  <AlertDescription>
    <ul>
      <li>Implement input validation guardrails</li>
      <li>Add system prompt for content filtering</li>
      <li>Enable audit logging for all requests</li>
    </ul>
  </AlertDescription>
</Alert>
```

#### Fail-Only Filter
```tsx
// Toggle to show only failed tests
const [showFailOnly, setShowFailOnly] = useState(false);

const filteredResults = showFailOnly 
  ? results.filter(r => r.verdict === 'fail')
  : results;

// UI Toggle
<Switch 
  label="Show Failed Only" 
  checked={showFailOnly}
  onChange={setShowFailOnly}
/>
```

### 4. Publishing Guards

#### Business Logic
```tsx
// Publish button disabled if score is D or E
const canPublish = overallScore >= 60; // A, B, or C only

<Button 
  variant="primary"
  disabled={!canPublish}
  onClick={handlePublish}
>
  {canPublish ? 'Publish to Leaderboard' : 'Cannot Publish (Low Score)'}
</Button>

{!canPublish && (
  <Alert variant="warning">
    Models with scores below 60 (D or E) cannot be published
    due to high compliance risk.
  </Alert>
)}
```

#### Score to Grade Mapping
| Score Range | Grade | Can Publish? |
|-------------|-------|--------------|
| 80-100 | A | ✅ Yes |
| 60-79 | B | ✅ Yes |
| 40-59 | C | ✅ Yes |
| 20-39 | D | ❌ No |
| 0-19 | E | ❌ No |

### 5. Benchmark History

#### Tab Navigation
```tsx
<Tabs defaultValue="latest">
  <TabList>
    <Tab value="latest">Latest Result</Tab>
    <Tab value="history">History ({history.length})</Tab>
  </TabList>
  
  <TabPanel value="latest">
    <CurrentReport />
  </TabPanel>
  
  <TabPanel value="history">
    <HistoryList items={history} />
  </TabPanel>
</Tabs>
```

#### History List Item
```tsx
<Link href={`/models/${modelId}/runs/${runId}`}>
  <Card hoverable>
    <div className="historyItem">
      <div className="meta">
        <span className="date">{formatDate(run.date)}</span>
        <StatusBadge status={run.status} />
      </div>
      <div className="scores">
        <ScoreBlock value={run.overallScore} size="sm" />
        <span className="version">v{run.version}</span>
      </div>
    </div>
  </Card>
</Link>
```

### 6. LiteLLM Integration

#### Add Model Form
```tsx
// Primary source: Import via LiteLLM
<Tabs defaultValue="litellm">
  <TabList>
    <Tab value="litellm">Import via LiteLLM</Tab>
    <Tab value="manual">Manual Entry</Tab>
  </TabList>
  
  <TabPanel value="litellm">
    <LiteLLMConfigSelector />
  </TabPanel>
  
  <TabPanel value="manual">
    <ManualEndpointForm />
  </TabPanel>
</Tabs>
```

---

## 📱 Responsive Behavior

### Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768-1024px | 2-column grids, collapsible sidebar |
| Desktop | > 1024px | Full layouts as specified |

### Mobile Adaptations

| Component | Desktop | Mobile |
|-----------|---------|--------|
| Navigation | Fixed sidebar (240px) | Hamburger drawer |
| Summary Tiles | 4-col grid | 2×2 grid |
| Model Cards | 3-col grid | 1-col card list |
| Tables | Full table | Card list with key info |
| Drawers | Side drawer | Bottom sheet |
| CompareBar | Sticky bottom | Sticky bottom (smaller) |

---

## ✅ QA Checkpoints

### Visual Acceptance (UI/UX)

- [ ] Hero gradient uses dark colors only (no light teal)
- [ ] All text meets WCAG 2.1 AA contrast ratios
- [ ] Summary tiles have gradient accent bars on hover
- [ ] Status badges use correct Legion UI variants
- [ ] Model cards have bottom accent bar animation
- [ ] Step cards have border and shadow on hover
- [ ] Trust section uses neutral background with dark text

### Functional Acceptance (Human Review v2)

- [ ] Package selection defaults to "Select All"
- [ ] Warning shows when deselecting packages
- [ ] Time estimates display correctly
- [ ] Benchmark continues in background
- [ ] Global progress indicator shows during runs
- [ ] LLM summary displays on results page
- [ ] Fail-only filter works correctly
- [ ] Publish button disabled for D/E scores
- [ ] Benchmark history shows previous versions
- [ ] LiteLLM import is primary option

### Technical Acceptance

- [ ] All components use Legion UI or approved wrappers
- [ ] CSS variables used instead of hardcoded colors
- [ ] Responsive layouts work at all breakpoints
- [ ] Polling persists across navigation
- [ ] LocalStorage used for background state
- [ ] API endpoints match specification
- [ ] Error boundaries in place
- [ ] Accessibility attributes present

---

## 🚀 Implementation Priority

### Phase 1 (Critical - Week 1)
1. Color palette implementation
2. Accessibility fixes (text contrast)
3. Legion UI component integration
4. Hero section gradient fix

### Phase 2 (High - Week 2)
1. Summary tiles with hover effects
2. Model cards with animations
3. StatusBadge with Legion UI
4. Dashboard layout

### Phase 3 (Human Review v2 - Week 3-4)
1. Assessment setup workflow
2. Background benchmark processing
3. Results page with LLM summary
4. Publishing guards
5. Benchmark history

### Phase 4 (Polish - Week 5)
1. Mobile hamburger menu
2. Animation performance
3. Error boundaries
4. Full accessibility audit

---

## 📚 Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Design System Guide | `02_Product_UI/Design_System_Guide.md` | Component usage |
| Color Contrast Guide | `02_Product_UI/Color_Contrast_Guide.md` | Accessibility |
| UI Refinement Summary | `02_Product_UI/UI_Refinement_Summary_March2026.md` | Changes overview |
| UI/UX QA Documentation | `03_QA_Docs/UIUX_QA_Documentation.md` | Visual checkpoints |
| Frontend QA Documentation | `03_QA_Docs/Frontend_QA_Documentation.md` | Technical checkpoints |
| Context Changes | `03_QA_Docs/Context_Changes_Summary.md` | Architecture changes |

---

## 🆘 Support & Questions

For implementation questions:
1. Check `Design_System_Guide.md` for component specs
2. Check `Color_Contrast_Guide.md` for accessibility requirements
3. Review `UIUX_QA_Documentation.md` for visual acceptance criteria
4. Reference `Frontend_QA_Documentation.md` for technical requirements

**Last Updated**: March 10, 2026
**Version**: 2.0
