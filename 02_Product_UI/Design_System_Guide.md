# AI Sandbox – Design System Guide

> Source: `Product_UI_Specification.md` §3, §4.1, §6.5, §6.7
> Base Library: [Legion UI Design System](https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/?path=/docs/welcome--docs)
> Package: `@legion-ui-kit/react-core`

---

## 1. Component Integration Strategy

### 1.1 Using Legion UI Components (Priority)

The AI Sandbox frontend uses **Legion UI** as the base component library. All components should use Legion UI unless there's a specific business requirement.

| Legion UI Component | Usage | AI Sandbox Wrapper |
|---------------------|-------|-------------------|
| `Button` | All button actions | `@/components/shared/Button` |
| `Input` | Form inputs | `@/components/shared/Input` |
| `Card` | Cards, tiles, containers | `@/components/dashboard/SummaryTile` (uses Card) |
| `Badge` | Status badges, labels | `@/components/shared/StatusBadge` (uses Badge) |
| `Skeleton` | Loading states | `@/components/shared/Skeleton` (uses Skeleton) |
| `Modal` | Dialogs, confirmations | Direct usage |
| `Alert` | Notifications, warnings | Direct usage |
| `Tooltip` | Help text | Direct usage |
| `Tabs` | Tabbed interfaces | Direct usage |
| `Select` | Dropdown selects | Direct usage |
| `Checkbox` | Checkboxes | Direct usage |
| `Radio` | Radio buttons | Direct usage |
| `Switch` | Toggle switches | Direct usage |
| `Avatar` | User avatars | Direct usage |
| `Breadcrumb` | Navigation breadcrumbs | Direct usage |
| `Pagination` | List pagination | Direct usage |
| `Progress` | Progress indicators | Direct usage |
| `Spinner` | Loading spinners | Direct usage |
| `Divider` | Section dividers | Direct usage |
| `Dropdown` | Dropdown menus | Direct usage |

### 1.2 AI Sandbox Custom Components

These components extend Legion UI with AI Sandbox-specific functionality:

| Component | Base | Extension |
|-----------|------|-----------|
| `StatusBadge` | `Badge` | Adds `statusConfig`-driven colors, icons, and workflow states |
| `ScoreBlock` | Custom | Trust score tile with icon, label, value, and color ring |
| `ScoreCardGrid` | Custom | Grid of 5 `ScoreBlock` items |
| `WorkflowStepper` | Custom | Horizontal stepper for model lifecycle |
| `FindingsAccordion` | Custom | Collapsible findings list with severity indicators |
| `EvidencePanel` | Custom | Slide-out panel for evidence display |
| `DecisionDrawer` | Custom | Reviewer decision controls |
| `CompareBar` | Custom | Model comparison sticky bar |
| `CompareTable` | Custom | Side-by-side model comparison |
| `RadarChart` | `recharts` | Category score visualization |
| `RunProgressTracker` | Custom | Benchmark progress indicator |
| `EndpointValidationCard` | Custom | Endpoint validation UI |
| `PublicationToggle` | Custom | Publication control switch |
| `AuditTrailTimeline` | Custom | Decision history timeline |
| `RankBadge` | Custom | Ranking badge for top models |
| `EmptyStateBlock` | Custom | Empty state illustrations |

### 1.3 Component Import Guidelines

**Always import from Legion UI first:**

```tsx
// ✅ Correct - Use Legion UI
import { Button, Input, Card, Badge } from '@legion-ui-kit/react-core';

// ✅ Correct - Use AI Sandbox wrappers
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { StatusBadge } from '@/components/shared/StatusBadge';

// ❌ Avoid - Don't create duplicate components
import { Button } from '@/components/ui/Button'; // Don't do this
```

---

## 2. Color Tokens

### 2.1 Accessibility Guidelines (WCAG 2.1 AA)

All color combinations in AI Sandbox must meet **WCAG 2.1 AA** contrast requirements:

| Requirement | Minimum Ratio | Applied To |
|-------------|---------------|------------|
| Normal text | 4.5:1 | Body text, labels, captions |
| Large text (18px+ or 14px+ bold) | 3:1 | Headings, titles |
| UI components | 3:1 | Icons, borders, input states |
| Non-essential graphics | No requirement | Decorative elements |

### 2.2 Text Color Combinations (Verified)

| Background | Foreground | Ratio | Status |
|------------|------------|-------|--------|
| White (`#ffffff`) | Text Primary (`#0f172a`) | 16.8:1 | ✅ AAA |
| White (`#ffffff`) | Text Secondary (`#334155`) | 10.2:1 | ✅ AAA |
| White (`#ffffff`) | Text Muted (`#64748b`) | 5.2:1 | ✅ AA |
| Primary Light (`#E8EEFC`) | Text Primary (`#0f172a`) | 15.1:1 | ✅ AAA |
| Primary Light (`#E8EEFC`) | Text Secondary (`#334155`) | 9.5:1 | ✅ AAA |
| Primary Dark (`#221C6A`) | Text Inverse (`#f1f5f9`) | 15.3:1 | ✅ AAA |
| Primary (`#1545BC`) | White (`#ffffff`) | 8.2:1 | ✅ AAA |
| Secondary (`#7740B5`) | White (`#ffffff`) | 6.1:1 | ✅ AAA |

### 2.3 Color Combinations to AVOID

❌ **Never use these combinations:**

| Background | Foreground | Issue |
|------------|------------|-------|
| White / Light backgrounds | `#94a3b8` (old muted) | Too light - 2.8:1 ratio |
| Light teal / pastels | White text | Insufficient contrast |
| Primary Light (`#E8EEFC`) | Muted colors | Text becomes unreadable |
| Any light background | Light grey text | Accessibility violation |

### 2.4 Primary Brand Colors (Dashboard Palette)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1545BC` | Primary blue — main actions, links |
| `--color-primary-hover` | `#0f3494` | Darker blue for hover states |
| `--color-primary-light` | `#E8EEFC` | Light blue for backgrounds |
| `--color-primary-dark` | `#221C6A` | Deep navy — headers, sidebar |
| `--color-secondary` | `#7740B5` | Purple — secondary actions, highlights |
| `--color-secondary-hover` | `#5f3391` | Darker purple for hover |
| `--color-secondary-light` | `#F3E8FC` | Light purple for backgrounds |
| `--color-accent` | `#A4E7DE` | Teal — accents, success states |
| `--color-accent-hover` | `#82D4C9` | Darker teal for hover |

### 2.2 Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-status-draft` | `#94a3b8` | Draft, Hidden |
| `--color-status-pending` | `#F59E0B` | Validation Pending, Pending Review, Reassessment Required |
| `--color-status-valid` | `#10b981` | Endpoint Valid |
| `--color-status-active` | `#1545BC` | Run Queued, Run In Progress (uses primary blue) |
| `--color-status-success` | `#22C55E` | Approved, Published, Completed |
| `--color-status-conditional` | `#14b8a6` | Approved with Controls |
| `--color-status-warning` | `#F97316` | Restricted |
| `--color-status-danger` | `#EF4444` | Validation Failed, Run Failed, Not Approved |
| `--color-status-assessment` | `#7740B5` | Assessment Completed (uses secondary purple) |

### 2.3 Severity Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-severity-critical` | `#dc2626` | Critical findings |
| `--color-severity-high` | `#ea580c` | High findings |
| `--color-severity-medium` | `#f59e0b` | Medium findings |
| `--color-severity-low` | `#3b82f6` | Low findings |
| `--color-severity-info` | `#6b7280` | Informational findings |

### 2.4 Score Ring Color Scale (Updated)

| Range | Color | Hex | Token |
|-------|-------|-----|-------|
| 80–100 | Green | `#059669` | `--color-score-excellent` |
| 60–79 | Primary Blue | `#1545BC` | `--color-score-good` |
| 40–59 | Secondary Purple | `#7740B5` | `--color-score-moderate` |
| 20–39 | Amber | `#f59e0b` | `--color-score-poor` |
| 0–19 | Red | `#dc2626` | `--color-score-critical` |

---

## 3. Status Badge Configuration

Implement as a single shared config file:

```ts
// lib/statusConfig.ts
export type ModelStatus =
  | 'draft'
  | 'endpoint_valid'
  | 'validation_failed'
  | 'run_queued'
  | 'run_in_progress'
  | 'run_failed'
  | 'pending_review'
  | 'approved'
  | 'approved_with_controls'
  | 'restricted'
  | 'reassessment_required'
  | 'not_approved'
  | 'published'
  | 'hidden';

export const statusConfig: Record<ModelStatus, {
  color: string;
  icon: string;
  labelKey: string;
  pulse?: boolean;
}> = {
  draft:                   { color: '#6B7280', icon: 'file',         labelKey: 'status.draft' },
  endpoint_valid:          { color: '#14B8A6', icon: 'check',        labelKey: 'status.endpointValid' },
  validation_failed:       { color: '#EF4444', icon: 'x-circle',     labelKey: 'status.validationFailed' },
  run_queued:              { color: '#3B82F6', icon: 'clock',        labelKey: 'status.runQueued' },
  run_in_progress:         { color: '#3B82F6', icon: 'loader',       labelKey: 'status.runInProgress', pulse: true },
  run_failed:              { color: '#EF4444', icon: 'alert-triangle', labelKey: 'status.runFailed' },
  pending_review:          { color: '#F59E0B', icon: 'eye',          labelKey: 'status.pendingReview' },
  approved:                { color: '#22C55E', icon: 'check-circle', labelKey: 'status.approved' },
  approved_with_controls:  { color: '#84CC16', icon: 'shield',       labelKey: 'status.approvedWithControls' },
  restricted:              { color: '#F97316', icon: 'ban',          labelKey: 'status.restricted' },
  reassessment_required:   { color: '#F59E0B', icon: 'refresh-cw',  labelKey: 'status.reassessmentRequired' },
  not_approved:            { color: '#EF4444', icon: 'x-circle',     labelKey: 'status.notApproved' },
  published:               { color: '#22C55E', icon: 'globe',        labelKey: 'status.published' },
  hidden:                  { color: '#6B7280', icon: 'eye-off',      labelKey: 'status.hidden' },
};
```

The `StatusBadge` component reads from this config and renders the icon + label with the correct background/text color. When `pulse` is `true`, apply CSS `@keyframes pulse` animation.

---

## 4. Icon Set

Use **Lucide React** (`lucide-react`) for all icons. Map from `statusConfig.icon` strings:

| Icon String | Lucide Component |
|-------------|-----------------|
| `file` | `<FileText />` |
| `check` | `<Check />` |
| `x-circle` | `<XCircle />` |
| `clock` | `<Clock />` |
| `loader` | `<Loader2 />` (animated spin) |
| `alert-triangle` | `<AlertTriangle />` |
| `eye` | `<Eye />` |
| `check-circle` | `<CheckCircle />` |
| `shield` | `<Shield />` |
| `ban` | `<Ban />` |
| `refresh-cw` | `<RefreshCw />` |
| `globe` | `<Globe />` |
| `eye-off` | `<EyeOff />` |

---

## 5. Typography Guidance

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Page title | System / design system default | 24px | 700 | One `h1` per page |
| Section heading | — | 18px | 600 | `h2` |
| Card title | — | 16px | 600 | Model name, score label |
| Body text | — | 14px | 400 | Default paragraph |
| Caption / metadata | — | 12px | 400 | Timestamps, helper text |
| Score value | Mono / tabular | 28px | 700 | Inside `ScoreBlock` |
| Badge label | — | 12px | 600 | Inside `StatusBadge` |

> Defer to the design system's font stack. The sizes above are starting points.

---

## 6. Spacing & Layout Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-page-padding` | `24px` (desktop) / `16px` (mobile) | Page content padding |
| `--space-section-gap` | `24px` | Gap between page sections |
| `--space-card-padding` | `16px` | Internal card padding |
| `--space-grid-gap` | `16px` | Grid gap in ScoreCardGrid, Ranking |
| `--max-width-form` | `720px` | Add Model form max width |
| `--max-width-article` | `800px` | Public Model Profile max width |
| `--sidebar-width` | `240px` (expanded) / `64px` (collapsed) | Internal navigation sidebar |

---

## 7. Accessibility Requirements

| Requirement | Detail |
|-------------|--------|
| Color contrast | All status badge text must pass WCAG 2.1 AA (4.5:1 for normal text) |
| Interactive IDs | Every button, input, link has a unique `id` for E2E testing |
| Keyboard navigation | All controls focusable and operable via keyboard |
| Screen reader | `aria-live="polite"` on `RunProgressTracker`, `StatusBadge` updates |
| Focus management | Drawer/Modal traps focus; returns focus on close |
| Skeleton loaders | Match final layout dimensions to prevent CLS |

---

## 8. Animation & Motion

| Component | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| `StatusBadge` (pulse) | Opacity pulse 1 → 0.5 → 1 | 1.5 s | `ease-in-out`, infinite |
| `Loader2` icon | Continuous spin | 1 s | `linear`, infinite |
| `Toast` | Slide in from top-right, fade out | 300 ms in / 200 ms out | `ease-out` |
| `Drawer` / `BottomSheet` | Slide in from side/bottom | 250 ms | `ease-out` |
| `Accordion` expand | Height transition | 200 ms | `ease-in-out` |
| Page transitions | None for MVP | — | — |

---

## Assumptions

1. The design system Storybook provides the base components listed in §1.1. If any are missing, build equivalents following the system's design language.
2. `Lucide React` is the icon library — do not mix with other icon sets.
3. Color tokens above complement (not replace) the design system's palette. Use design system neutrals/surfaces as base.
4. Score ring color mapping (§2.3) assumes 0–100 scale. Adjust thresholds if backend uses a different range.
