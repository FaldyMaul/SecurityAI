# AI Sandbox – Frontend Tasks

> Derived from: `Frontend_Build_Plan.md`
> UI Library: **Legion UI Kit** (`@legion-ui-kit/react-core`) — [Storybook](https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/?path=/docs/welcome--docs)
> Format: Checklist grouped by sprint phase. Each task includes scope, dependencies, and acceptance criteria.

---

## Phase 1 — Foundation (Sprint 1)

### 1.1 Project Scaffold
- [ ] Initialize Next.js App Router project with TypeScript
- [ ] Configure ESLint + Prettier
- [ ] Install **Legion UI Kit**: `npm install @legion-ui-kit/react-core`
- [ ] Install core dependencies: `lucide-react`, `@tanstack/react-query`, `next-intl`, `react-hook-form`, `zod`, `recharts`
- [ ] Install dev dependencies: `msw`, `@types/*`
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_MSW_ENABLED`
- [ ] Verify Legion components render correctly in a test page (import `Button`, `Card`, `Badge`)

**Acceptance:** `npm run dev` starts successfully. Lint passes. Legion components render.

---

### 1.2 Design Tokens & Global Styles
- [ ] Create `src/styles/variables.css` — all color tokens from Design System Guide §2 (status, severity, score ring, spacing)
- [ ] Create `src/styles/globals.css` — CSS reset, font stack, base typography scale
- [ ] Integrate Legion UI Kit theme tokens alongside sandbox custom tokens
- [ ] Use Legion `Text` component (H1–H6, Body, Caption) as standard for all typography
- [ ] Verify WCAG 2.1 AA color contrast for all status badge colors against backgrounds

**Acceptance:** CSS variables available globally. Legion theme loads correctly. No contrast violations.

---

### 1.3 Layout Components
- [ ] Build `AppShell` — sidebar + main content wrapper
- [ ] Build `Sidebar` — collapsible (240px / 64px), logo, nav groups, user menu, collapse toggle
  - Use Legion `Avatar` + `Dropdown` for user menu
  - Use Legion `Badge` for nav item count badges
  - Use Legion `Tooltip` for collapsed icon labels
  - Persist collapse state in `localStorage`
  - Mobile: hamburger-triggered drawer overlay
- [ ] Build `NavItem` — Lucide icon + label + optional Legion `Badge` (count)
- [ ] Build `PublicNavbar` — wraps Legion `Navbar` for public pages (logo, nav links, language switcher)
- [ ] Build `NavbarMinimal` — wraps Legion `Navbar` for login page (logo + language switcher only)
- [ ] Build `PageHeader` — Legion `Text` (H1) + optional Legion `Breadcrumb`
- [ ] Set up route groups: `(auth)/layout.tsx`, `(internal)/layout.tsx`, `(public)/layout.tsx`

**Acceptance:** Internal layout renders sidebar + content. Public layout renders Legion Navbar. Login layout is minimal. All responsive breakpoints work.

**Dependencies:** 1.2 (tokens)

---

### 1.4 Auth Plumbing
- [ ] Create `middleware.ts` — validate session on `(internal)` routes, redirect to `/login` if unauthenticated
- [ ] Create `lib/auth.ts` — session helpers, role check utilities
- [ ] Create `lib/hooks/useAuth.ts` — `GET /api/auth/me`, provide user + role context
- [ ] Build role-based guard — redirect unauthorized roles per Permission Matrix
- [ ] Build `AccessDenied` page component (lock icon, message, Go Back CTA)
- [ ] Implement post-login role-based redirect (Model Owner → `/models`, Admin → `/dashboard`, Builder → `/ranking`)

**Acceptance:** Unauthenticated user redirected to login. Wrong-role user sees Access Denied. Login redirects to correct landing.

**Dependencies:** 1.3 (layouts)

---

### 1.5 API Client & Mock Layer
- [ ] Create `lib/api.ts` — fetch/axios wrapper, base URL, auth injection, error interceptor
- [ ] Create `types/` — TypeScript interfaces: `Model`, `Review`, `Run`, `RunEvidence`, `RankingEntry`, `User`, `ApiResponse`
- [ ] Create `mocks/fixtures/` — JSON mock data for all endpoints (models, reviews, runs, ranking, users)
- [ ] Create `mocks/handlers.ts` — MSW request handlers matching all API endpoints
- [ ] Create `mocks/browser.ts` — MSW browser setup, conditional enable via env var
- [ ] Set up TanStack Query provider in root layout

**Acceptance:** MSW intercepts all API calls in dev. TanStack Query provider wraps the app. All types compile.

**Dependencies:** 1.4 (auth)

---

### 1.6 i18n Setup
- [ ] Configure `next-intl` — provider, middleware, locale detection
- [ ] Create `messages/id.json` — all keys from `UI_Copy.md` (nav, actions, status, scores, severity, forms, errors, dialogs, empty states, microcopy, Indonesia-specific terms)
- [ ] Create `messages/en.json` — English translations
- [ ] Build `LanguageSwitcher` component
- [ ] Create `lib/formatters.ts` — date/number formatting with `Intl.DateTimeFormat` / `Intl.NumberFormat`

**Acceptance:** App renders in ID by default. Switching to EN updates all strings. Dates/numbers format correctly per locale.

**Dependencies:** 1.1 (scaffold)

---

### 1.7 Shared Utilities & Base Components
- [ ] Create `lib/statusConfig.ts` — full status-to-color/icon/label map (14 statuses)
- [ ] Build `StatusBadge` — extends **Legion `Badge`** with `statusConfig`. Renders Lucide icon + label with color. Animated CSS pulse for `run_in_progress`.
- [ ] Build `EmptyStateBlock` — illustration slot + Legion `Text` (title + description) + optional Legion `Button` CTA
- [ ] Build custom `Skeleton` variants — table rows, cards, full-page (Legion does not have Skeleton)
- [ ] Build custom `Table` component — HTML `<table>` styled to match Legion design language (Legion does not have Table)
- [ ] Build custom `Combobox` — combine Legion `Select` + `TextField` for searchable dropdown (Apilogy picker)
- [ ] Build 404 Not Found page using Legion `Alert` + `Button`

**Acceptance:** `StatusBadge` renders all 14 statuses correctly using Legion Badge base. Custom Table and Skeleton match Legion design language. EmptyStateBlock is reusable.

**Dependencies:** 1.2 (tokens), 1.6 (i18n)

---

### 1.8 Login Page
- [ ] Build `LoginCard` component — wraps Legion `Card` shell with brand mark + SSO button + `Divider` + form
- [ ] Build login page at `(auth)/login/page.tsx`
- [ ] Use Legion `TextField` (Outline) for email and password inputs
- [ ] Use Legion `Button` (Primary) for submit, (Outline) for SSO
- [ ] Use Legion `Checkbox` for "Remember me"
- [ ] Use Legion `Divider` for "atau" / "or" separator
- [ ] Use Legion `Alert` (Error) for login error messages
- [ ] Implement form validation (email required, password required) via React Hook Form + Zod
- [ ] Implement SSO button (redirect flow — placeholder for MVP)
- [ ] Implement password visibility toggle (Lucide eye/eye-off icons)
- [ ] Implement error states: invalid creds, SSO failed, account locked, network error (all via Legion `Alert`)
- [ ] Post-login role-based redirect
- [ ] Responsive: centered card (420px desktop), full-width (mobile)

**Acceptance:** Login form uses Legion components consistently. Validates, submits, redirects. Error states display in Legion Alert. Responsive.

**Dependencies:** 1.4 (auth), 1.6 (i18n), 1.7 (shared components)

---

## Phase 2 — Core Workflows P0 (Sprint 2–3)

### 2.1 My Models Page
- [ ] Build page at `(internal)/models/page.tsx`
- [ ] Filter bar: Legion `Select` (status), date range, Legion `TextField` (search, debounce 300ms)
- [ ] Model table: custom `Table` + `StatusBadge`, latest score, last run date, Legion `Button` (Ghost) for actions
- [ ] Full-row clickable → navigate to `/models/[id]`
- [ ] Legion `Button` (Primary) `+ Tambah Model` → `/models/new`
- [ ] Legion `Pagination` with `keepPreviousData`
- [ ] Admin sees all models; Model Owner sees own via `?owner=me`
- [ ] States: loading (5 custom Skeleton rows), empty (`EmptyStateBlock` + CTA), error (Legion `Alert` + retry), no filter results
- [ ] Mobile: replace table with Legion `Card` list

**Acceptance:** Lists models with Legion components. Pagination works smoothly. All 4 state variants render correctly.

**Dependencies:** Phase 1 complete

---

### 2.2 Add Model Page
- [ ] Build page at `(internal)/models/new/page.tsx`
- [ ] Legion `Breadcrumb`: Models > Add Model
- [ ] Source selector: Legion `Tabs` (Manual / Import from Apilogy)
- [ ] Manual form: Legion `TextField` (Outline) for all text inputs, Legion `Select` for dropdowns, Legion `TextArea` for description. Validate on blur (React Hook Form + Zod).
- [ ] Apilogy tab: custom `Combobox` (Legion `Select` + `TextField`) with search → auto-fill → user confirms
- [ ] Build `EndpointValidationCard`: wraps Legion `Card` + `Button` + `Spinner`. States: untested → loading (Legion `Spinner` + "Memvalidasi endpoint…") → success (Legion `Badge` teal) → failure (Legion `Alert` Error + error code + "Lihat Detail" toggle + retry)
- [ ] Save Draft: `POST /api/models` → Legion `Snackbar` "Draf berhasil disimpan"
- [ ] Validate & Continue: save → validate → redirect to `/models/[id]`
- [ ] API Key field: Legion `TextField` `type="password"` + show/hide toggle (Lucide eye/eye-off)
- [ ] Form state persists across tab switches (Manual ↔ Apilogy)
- [ ] Centered form (max 720px). Mobile: full-width, sticky bottom Legion `Button` action bar.

**Acceptance:** Form uses Legion TextField/Select/TextArea consistently. Endpoint validation shows all 4 states. Draft saves. Validation redirects on success.

**Dependencies:** 2.1 (model types + API hooks)

---

### 2.3 Model Detail Page
- [ ] Build page at `(internal)/models/[id]/page.tsx`
- [ ] Header: model name, provider, `StatusBadge`, created date (Legion `Text`)
- [ ] Restriction banner: Legion `Alert` (Warning) if status = `restricted`
- [ ] Build `WorkflowStepper`: wraps **Legion `Stepper` (Horizontal)** with sandbox steps: Draft → Validated → Assessed → Reviewed → Published. Mobile: horizontally scrollable.
- [ ] `EndpointValidationCard` (reuse from 2.2): masked URL, auth type, validation status, Re-validate `Button`
- [ ] Benchmark selector: Legion `Card` + `Button` (Primary) "Start Benchmark" (disabled until `endpoint_valid`)
- [ ] Run history: custom `Table` with `StatusBadge`, sort latest first
- [ ] Build `ScoreBlock`: Lucide icon + Legion `Text` label + value + SVG color ring. Wraps Legion `Card` as outer shell.
- [ ] Build `ScoreCardGrid`: CSS grid of 5 `ScoreBlock`. 5-col desktop, 2+1 mobile.
- [ ] Build `FindingsAccordion`: wraps **Legion `Accordion` / `AccordionGroup`** with custom per-category headers (name + count + `SeverityIndicator`) → expandable finding rows
- [ ] Conditional rendering based on `model.status`
- [ ] Submit for Review: Legion `Button` (disabled unless `assessment_completed`) + Legion `Modal` confirmation
- [ ] Admin: Legion `Anchor` "Go to Review" link when status = `pending_review`
- [ ] All state variants: loading, draft, validated, running, completed, pending review, approved, restricted, 404, permission denied

**Acceptance:** Page uses Legion Stepper, Accordion, Card, Alert. Adapts to all model statuses. Scorecard and findings render correctly.

**Dependencies:** 2.2 (Add Model creates models)

---

### 2.4 Benchmark Run Page
- [ ] Build page at `(internal)/models/[id]/runs/[runId]/page.tsx`
- [ ] Run header: run ID, package name, `StatusBadge`, duration (Legion `Text`)
- [ ] Build `RunProgressTracker`: wraps **Legion `ProgressBar`** + step counter + elapsed time + `aria-live="polite"`
- [ ] Polling: `GET /api/models/:id/runs/:runId` every 5s while `run_in_progress`. Stop on terminal states.
- [ ] `ScoreCardGrid` (reuse from 2.3)
- [ ] Build `EvidencePanel`: per-finding slide-out (desktop) / inline expand (mobile). Prompt/response in monospace. Verdict + `SeverityIndicator` + Legion `Anchor` (raw artifact link). **Lazy-loaded** — fetch evidence only on expand.
- [ ] Action bar: Legion `Button` — Submit for Review (Model Owner) / Rerun (both) / Go to Review (Admin)
- [ ] Rerun: Legion `Modal` confirmation → `POST /api/models/:id/runs` → navigate to new run
- [ ] States: queued (clock + position), running (Legion ProgressBar), completed (scorecard + evidence), failed (Legion `Alert` Error + log + rerun CTA), loading (skeleton), evidence unavailable

**Acceptance:** Progress tracker uses Legion ProgressBar. Evidence lazy-loads on expand. All run states render. Actions use Legion Modal for confirmation.

**Dependencies:** 2.3 (score components, findings)

---

### 2.5 Review Queue Page
- [ ] Build page at `(internal)/reviews/page.tsx`
- [ ] Filter bar: severity, date range, status
- [ ] Queue table: model name, run date, overall score, critical count, status badge, "Review →" CTA
- [ ] Priority: rows with `critical_count > 0` get `--color-severity-critical` 4px left border + subtle red tint
- [ ] Default sort: critical count desc, then date asc
- [ ] Full-row clickable → `/reviews/[id]`
- [ ] States: loading (5 skeleton rows), empty (clipboard illustration), error (retry), permission denied
- [ ] Mobile: card list sorted by severity

**Acceptance:** Queue displays with priority highlighting. Filters work. All states render. Only admins can access.

**Dependencies:** Phase 1 complete

---

### 2.6 Review Detail Page
- [ ] Build page at `(internal)/reviews/[id]/page.tsx`
- [ ] `ScoreCardGrid` (reuse)
- [ ] `FindingsAccordion` (reuse — Legion `Accordion` base)
- [ ] `EvidencePanel` slide-out (reuse)
- [ ] Reviewer notes: Legion `TextArea` (Outline), auto-save draft via `PATCH /api/reviews/:id` debounce 1s
- [ ] Build `DecisionDrawer`: side drawer (desktop) / bottom sheet (mobile). **Legion `Radio`** (5 options) + Legion `TextArea` (reason) + Legion `Button` (confirm). Mandatory reason for: Approved with Controls, Restrict, Reassessment Required, Not Approved. Focus trap.
- [ ] Build `PublicationToggle`: **Legion `Switch`** Publish / Hide + Legion `Modal` confirmation. Disabled until decision set. Forced OFF for Restrict / Reassessment / Not Approved.
- [ ] Build `AuditTrailTimeline`: vertical timeline, decision events with Legion `Avatar` + `Text` timestamp. Never delete entries on override.
- [ ] States: loading, no decision yet, decision set, already decided (read-only + override allowed), evidence unavailable, error, permission denied

**Acceptance:** Decision drawer uses Legion Radio, TextArea, Button. Publication uses Legion Switch + Modal. Audit trail shows history with Avatar. Notes auto-save.

**Dependencies:** 2.4 (evidence panel), 2.5 (review queue)

---

### 2.7 Dashboard Page
- [ ] Build page at `(internal)/dashboard/page.tsx`
- [ ] Build `SummaryTile`: large number + label + icon + click navigation. Pending Reviews tile: amber pulse if count > 0.
- [ ] Tile grid: 4-col desktop, 2×2 tablet/mobile
- [ ] Review queue preview: top 5 pending items table. High-risk rows: critical left border.
- [ ] Recent runs: last 10 runs table with status badges
- [ ] Build `SystemHealthStrip`: job queue length + last failure timestamp
- [ ] Polling: review badge count every 30s
- [ ] States: loading (skeleton tiles + skeleton tables), empty (zeros + messages), error (banner + retry), permission denied
- [ ] Desktop: tiles full-width, queue left + runs right. Mobile: all stacked.

**Acceptance:** Dashboard shows real-time overview. Tiles link to relevant pages. Polling updates badge count. All states render.

**Dependencies:** 2.5 (review data hooks), 2.4 (run data hooks)

---

## Phase 3 — Discovery & Public P1 (Sprint 4)

### 3.1 Ranking Page
- [ ] Build page at `(public)/ranking/page.tsx`
- [ ] Filter bar: Legion `Select` (provider, model type, status, use case), score range slider
- [ ] Build `RankBadge`: #1 gold, #2 silver, #3 bronze, rest neutral gray
- [ ] Model cards (3-col grid desktop, 1-col mobile): Legion `Card` + `RankBadge` + name + score + approval `Badge` + suitability Legion `Chip` + Legion `Checkbox` (compare)
- [ ] Card hover: shadow elevation transition (150ms ease)
- [ ] Build `CompareBar`: sticky bottom, selected model Legion `Chip` items + "Bandingkan Model" Legion `Button`. Slide-up animation (250ms) when ≥ 2 selected. Max 3 — Legion `Snackbar` on 4th attempt.
- [ ] Only `published` models appear
- [ ] Public Viewer: no compare `Checkbox`
- [ ] States: loading (6 skeleton cards), empty (trophy illustration), no filter results (clear filter CTA), error, compare active

**Acceptance:** Ranking uses Legion Card, Chip, Checkbox, Select consistently. Compare bar animates correctly. Max 3 enforced with Snackbar.

**Dependencies:** Phase 1 complete

---

### 3.2 Model Comparison Page
- [ ] Build page at `(public)/ranking/compare/page.tsx`
- [ ] Read `?ids=a,b,c` from query params. Require ≥ 2. If < 2, redirect to `/ranking`. If > 3, use first 3.
- [ ] Comparison header: model names side-by-side with `RankBadge` + overall score (Legion `Text`)
- [ ] Build `RadarChart` wrapper: `recharts <RadarChart>`, lazy-loaded. Overlaid radar for 5 categories per model.
- [ ] Build `CompareTable`: custom `Table` — side-by-side rows for Trust, Security, Privacy, Readiness, Compliance, Strengths, Weaknesses, Restrictions, Recommended use cases
  - Highlight winning score (bold + green text)
  - Restriction cells: warning background tint
- [ ] Mobile: Legion `Tabs` to switch per model. Radar chart always shows all models overlaid.
- [ ] Action bar: Legion `Button` — Select Model A / B + Back to Ranking
- [ ] States: loading (skeleton columns + placeholder chart), error, model not found (show remaining)

**Acceptance:** Comparison uses Legion Tabs (mobile), Button. Radar chart overlays correctly. Winning scores highlighted. Invalid IDs handled gracefully.

**Dependencies:** 3.1 (ranking data + RankBadge)

---

### 3.3 Public Model Profile Page
- [ ] Build page at `(public)/models/[id]/public/page.tsx`
- [ ] Hero card: model name, provider logo (or placeholder), overall rating `RankBadge`, approval label
- [ ] Summary: paragraph text (what it is, what it's good for, limitations)
- [ ] Simplified `ScoreCardGrid` (5 blocks, no click-through to findings)
- [ ] Approval label badge (prominent)
- [ ] "Approved with Controls" info banner if applicable
- [ ] Footer: "Penilaian dilakukan oleh AI Sandbox · Hasil terakhir diperbarui {date}"
- [ ] SEO: `<title>` = "{Model Name} — AI Sandbox Rating", `<meta description>` from summary
- [ ] Content guardrails: NEVER show raw evidence, reviewer notes, endpoint URL/key, restriction reasons
- [ ] Centered article (max 800px). Mobile: full-width.
- [ ] States: loading (skeleton), published (full content), unpublished/not found ("Profil model ini tidak lagi tersedia" + Go Back CTA)

**Acceptance:** Clean public page renders. No internal data leaks. SEO tags present. Responsive.

**Dependencies:** 3.1 (RankBadge, score components)

---

### 3.4 Landing / Home Page
- [ ] Build page at `(public)/page.tsx`
- [ ] Hero section: tagline "Temukan Model AI Terpercaya" + subtext + CTA "Lihat Peringkat →" → `/ranking`
  - Subtle gradient background or illustration (premium feel)
- [ ] Top models: top 5 published models as cards with `RankBadge` + name + score + approval label
  - Model card click → `/models/[id]/public`
- [ ] How it works: 3-step visual (Submit → Assess → Publish) with Lucide icons (Upload, ShieldCheck, Globe)
- [ ] Trust statement: brief paragraph about methodology and Indonesian compliance
- [ ] SEO: `<title>` = "AI Sandbox — Temukan Model AI Terpercaya"
- [ ] Lazy-load "How it works" and trust statement sections
- [ ] States: loading (skeleton hero + 5 skeleton cards), no published models (hide top models, disable CTA), error
- [ ] Page should feel **editorial and trustworthy**, not like a dev tool

**Acceptance:** Landing page is visually premium. Top models load from API. CTAs navigate correctly. Editorial tone.

**Dependencies:** 3.1 (ranking API hooks, RankBadge)

---

### 3.5 Settings Page
- [ ] Build page at `(internal)/settings/page.tsx`
- [ ] Legion `Tabs` (persisted in URL hash): Profile, Preferences, Notifications, System (admin only)
- [ ] Profile tab: `AvatarUpload` (Legion `Avatar` + `Button`) + Legion `TextField` (display name, required) + Legion `TextField` (email, disabled/read-only) + `StatusBadge` (role, read-only) + Legion `Button` save
- [ ] Preferences tab: Legion `Select` (language ID/EN, apply immediately) + Legion `Select` (date format) + Legion `Radio` group (theme light/dark/system, apply immediately) + Legion `Button` save
- [ ] Notifications tab: 4 `ToggleRow` components using **Legion `Switch`** (review assigned, benchmark completed, benchmark failed, model published) + Legion `Button` save
- [ ] System tab (admin only): custom `Table` for benchmark packages (read-only MVP) + Legion `Anchor` (user management link) + API health metrics using Legion `Badge` for status dots + `DangerZone` with Legion `Switch` for maintenance mode + Legion `Modal` confirmation
- [ ] Non-admin navigating to `#system` redirected to `#profile`
- [ ] Responsive: tabs as horizontal scroll pills on mobile, sticky Legion `Button` save per tab
- [ ] Legion `Snackbar` feedback on save success/failure

**Acceptance:** Settings page uses Legion Tabs, TextField, Select, Switch, Button consistently. All tabs render correctly. System tab admin-only. Theme and language preview immediately.

**Dependencies:** Phase 1 complete

---

## Phase 4 — Polish (Sprint 5)

### 4.1 Responsive Refinement
- [ ] Audit all 13 screens against breakpoints: Desktop (> 1024px), Tablet (768–1024px), Mobile (< 768px)
- [ ] Sidebar → drawer on mobile with hamburger toggle
- [ ] Tables → card lists on mobile where specified
- [ ] `WorkflowStepper` → horizontal scroll on mobile
- [ ] `DecisionDrawer` → bottom sheet on mobile
- [ ] `EvidencePanel` → inline expand on mobile
- [ ] `CompareTable` → tab-switch per model on mobile
- [ ] Action bars → sticky bottom on mobile
- [ ] `SummaryTile` grid: 4-col → 2×2

**Acceptance:** Every screen renders correctly at all 3 breakpoints. No horizontal overflow. Touch targets ≥ 44px.

---

### 4.2 Accessibility Audit
- [ ] All interactive elements have unique `id` attributes
- [ ] Keyboard navigation: all controls focusable and operable
- [ ] `DecisionDrawer` + `Modal`: focus trap, return focus on close
- [ ] `aria-live="polite"` on `RunProgressTracker`, `StatusBadge` (status updates)
- [ ] Color contrast: verify WCAG 2.1 AA (4.5:1) for all status badges and severity indicators
- [ ] `Skeleton` loaders match final layout dimensions (CLS ≈ 0)
- [ ] Screen reader test: landmark regions, heading hierarchy, form labels

**Acceptance:** aXe audit returns 0 critical/serious violations. Keyboard-only navigation works for all P0 flows.

---

### 4.3 Performance Optimization
- [ ] Lazy-load: `EvidencePanel`, `RadarChart`, "How it works" section, trust statement
- [ ] Code split chart components (recharts) into separate bundle
- [ ] Verify skeleton loaders prevent layout shift
- [ ] Audit bundle size — target < 200 KB first load JS
- [ ] Image optimization for illustrations and logos

**Acceptance:** Lighthouse Performance score ≥ 90. No layout shifts. Chart bundle lazy-loaded.

---

### 4.4 E2E Testing
- [ ] Set up Playwright
- [ ] **P0 test: Add Model flow** — fill form → validate → draft created
- [ ] **P0 test: Endpoint validation** — success and failure states render
- [ ] **P0 test: Benchmark run** — status transitions (queued → running → completed)
- [ ] **P0 test: Review decision** — set decision → status update → audit trail entry
- [ ] **P0 test: Permission guard** — unauthorized role cannot access restricted pages
- [ ] **P1 test: Ranking filters** — produce correct results
- [ ] **P1 test: Model comparison** — 2–3 models render correctly
- [ ] **P1 test: Empty/loading/error states** — render for key pages
- [ ] **P2 test: Locale switch** — all strings render in both languages
- [ ] **P2 test: Mobile responsiveness** — ranking and public profile at < 768px

**Acceptance:** All P0 tests pass. P1 tests pass. P2 tests documented and passing.

---

## Summary

| Phase | Tasks | Priority | Sprint |
|-------|-------|----------|--------|
| 1 — Foundation | 8 tasks (1.1–1.8) | P0 | Sprint 1 |
| 2 — Core Workflows | 7 tasks (2.1–2.7) | P0 | Sprint 2–3 |
| 3 — Discovery & Public | 5 tasks (3.1–3.5) | P1 | Sprint 4 |
| 4 — Polish | 4 tasks (4.1–4.4) | P1–P2 | Sprint 5 |
| **Total** | **24 tasks** | | **~5 sprints** |

---

## Legion UI Kit Component Usage Summary

| Legion Component | Used In Tasks |
|------------------|---------------|
| `Accordion` | 2.3 (FindingsAccordion), 2.6 (FindingsAccordion) |
| `Alert` | 1.7, 1.8 (Login errors), 2.1-2.7 (error states), 2.3 (restriction banner) |
| `Anchor` | 2.3 (Go to Review), 2.4 (artifact links), 3.5 (admin links) |
| `Avatar` | 1.3 (Sidebar user menu), 2.6 (AuditTrailTimeline), 3.5 (AvatarUpload) |
| `Badge` | 1.3 (NavItem count), 1.7 (StatusBadge base), all pages |
| `Breadcrumb` | 1.3 (PageHeader), 2.2 (Add Model), 2.3 (Model Detail) |
| `Button` | All pages (Primary/Secondary/Ghost actions, CTAs) |
| `Card` | 1.8 (LoginCard), 2.2 (EndpointValidationCard), 2.3 (ScoreBlock, benchmark selector), 2.7 (SummaryTile), 3.1 (ranking cards) |
| `Checkbox` | 1.8 (Remember me), 3.1 (Compare selection) |
| `Chip` | 3.1 (CompareBar model chips), 3.1 (suitability tags) |
| `Divider` | 1.8 (Login "atau" separator) |
| `Dropdown` | 1.3 (User menu) |
| `Modal` | 2.2-2.7 (confirmation dialogs), 2.6 (PublicationToggle), 3.5 (maintenance mode) |
| `Navbar` | 1.3 (PublicNavbar, NavbarMinimal) |
| `Pagination` | 2.1 (My Models), 2.5 (Review Queue) |
| `ProgressBar` | 2.4 (RunProgressTracker) |
| `Radio` | 2.6 (DecisionDrawer 5 options), 3.5 (theme toggle) |
| `Select` | 2.1 (filters), 2.2 (form dropdowns), 3.1 (filters), 3.5 (language/date format) |
| `Snackbar` | 2.2 (draft saved), 2.6 (decision set), 3.1 (max compare), 3.5 (settings saved) |
| `Spinner` | 2.2 (EndpointValidationCard loading) |
| `Stepper` | 2.3 (WorkflowStepper) |
| `Switch` | 2.6 (PublicationToggle), 3.5 (notification toggles, maintenance mode) |
| `Tabs` | 2.2 (Manual/Apilogy), 3.2 (mobile comparison), 3.5 (settings tabs) |
| `Text` | All pages (typography: H1-H6, Body, Caption) |
| `TextArea` | 2.2 (description), 2.6 (reviewer notes, decision reason) |
| `TextField` | 1.8 (login form), 2.1 (search), 2.2 (all form inputs), 3.5 (profile fields) |
| `Tooltip` | 1.3 (collapsed sidebar icon labels) |
