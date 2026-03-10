# AI Sandbox – Frontend Build Plan

> Derived from: `Product_UI_Specification.md`, `Screen_Specs.md`, `Design_System_Guide.md`, `UI_Copy.md`, `User_Flow.md`
> Stack: **React / Next.js (App Router)** · **TypeScript** · **Legion UI Kit** (`@legion-ui-kit/react-core`) · **Lucide React** · **recharts** · **next-intl** · **TanStack Query**
> Design System: [Legion UI Kit - React Core](https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/?path=/docs/welcome--docs) (Chromatic Storybook)

---

## 1. Page Structure & Routing

### 1.1 Route Groups

| Group | Prefix | Auth | Sidebar |
|-------|--------|------|---------|
| `(auth)` | `/login`, `/forgot-password` | None | No |
| `(internal)` | `/dashboard`, `/models/*`, `/reviews/*`, `/settings` | Required (cookie/JWT) | Yes |
| `(public)` | `/`, `/ranking`, `/models/[id]/public` | Optional | No (public nav) |

### 1.2 Route Map (13 screens)

| # | Page | Route | Priority | Group |
|---|------|-------|----------|-------|
| 1 | Login | `/login` | P0 | `(auth)` |
| 2 | Dashboard | `/dashboard` | P0 | `(internal)` |
| 3 | My Models | `/models` | P0 | `(internal)` |
| 4 | Add Model | `/models/new` | P0 | `(internal)` |
| 5 | Model Detail | `/models/[id]` | P0 | `(internal)` |
| 6 | Benchmark Run | `/models/[id]/runs/[runId]` | P0 | `(internal)` |
| 7 | Review Queue | `/reviews` | P0 | `(internal)` |
| 8 | Review Detail | `/reviews/[id]` | P0 | `(internal)` |
| 9 | Settings | `/settings` | P1 | `(internal)` |
| 10 | Ranking | `/ranking` | P1 | `(public)` |
| 11 | Model Comparison | `/ranking/compare` | P1 | `(public)` |
| 12 | Public Model Profile | `/models/[id]/public` | P1 | `(public)` |
| 13 | Landing / Home | `/` | P1 | `(public)` |

### 1.3 Middleware

- **Auth middleware** on `(internal)` group: validate session cookie/JWT on every request.
- **Role guard**: check user role against Permission Matrix. Redirect unauthorized to Access Denied.
- **Post-login redirect**: Model Owner → `/models`, Admin → `/dashboard`, Builder → `/ranking`, Public → `/`.

---

## 2. Component Breakdown

### 2.1 Layout Components

| Component | Description | Legion Base |
|-----------|-------------|-------------|
| `AppShell` | Overall layout wrapper: sidebar + main content area | Custom (uses Legion `Navbar` for public) |
| `Sidebar` | Collapsible nav (240px / 64px). Persist in localStorage. Logo, nav groups, user menu. | Custom (uses Legion `Avatar`, `Dropdown`, `Tooltip`) |
| `NavItem` | Sidebar link with icon, label, optional badge | Custom (uses Legion `Badge` for count) |
| `PublicNavbar` | Top nav for public pages: logo, nav links, language switcher | Wraps Legion `Navbar` |
| `NavbarMinimal` | Login page: logo + language switcher only | Wraps Legion `Navbar` |
| `PageHeader` | `<h1>` + optional subtitle / breadcrumb | Uses Legion `Text` (H1) + `Breadcrumb` |

### 2.2 Legion UI Kit Components (Reuse Directly)

> **Install:** `npm install @legion-ui-kit/react-core`
> **Storybook:** [Chromatic](https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/?path=/docs/welcome--docs)

| Legion Component | Variants | Usage in AI Sandbox |
|------------------|----------|---------------------|
| `Accordion` | AccordionGroup | Findings accordion base, settings sections |
| `Alert` | Success, Warning, Error, Information | Inline banners (restricted model, error states), permission denied messages |
| `Anchor` | — | Text links throughout the app |
| `Avatar` | — | User menu in sidebar, reviewer identity in audit trail |
| `Badge` | — | Base for `StatusBadge`, severity tags, suitability labels |
| `Breadcrumb` | — | Page hierarchy (Models > Model Detail > Run) |
| `Button` | Primary, Secondary, Ghost, Loading | Action bars, CTAs, confirm dialogs, filter controls |
| `Card` | Header, Body, Footer, Media | Dashboard tiles, model cards, score blocks, endpoint card, ranking cards |
| `Checkbox` | — | Ranking compare selection, login "Remember me" |
| `Chip` | Outline, Soft, Solid | Compare bar selected model chips, approval labels |
| `Divider` | — | Section separators, login form divider ("atau" / "or") |
| `Dropdown` | — | User menu, filter dropdowns |
| `Icon` | — | Used alongside Lucide React for Legion-specific icon patterns |
| `Modal` | — | Confirmation dialogs (submit, approve, publish, rerun, restrict) |
| `Navbar` | — | Public pages top navigation |
| `Pagination` | — | My Models, Review Queue, any list > 10 items |
| `ProgressBar` | — | `RunProgressTracker` base, endpoint validation loading |
| `Radio` | — | Decision drawer options (5 review decisions) |
| `Rating` | — | Score display alternative (if applicable) |
| `Select` | Block, Inline | Filter bars (status, severity, provider), form dropdowns (auth method) |
| `Spinner` | — | Inline loading (endpoint validation, form submission) |
| `Stepper` | Horizontal, Vertical | `WorkflowStepper` base (Draft → Validated → Assessed → Reviewed → Published) |
| `Switch` | — | `PublicationToggle`, notification toggles, theme toggle, maintenance mode |
| `Tabs` | — | Source selector (Manual/Apilogy), scorecard categories, settings tabs, mobile comparison |
| `Text` | H1–H6, Body, Caption | All typography — page titles, section headings, body text, metadata |
| `TextArea` | Outline, Inline | Reviewer notes, model description |
| `TextField` | Outline, Inline | All form inputs (model name, endpoint URL, API key, email, password, search) |
| `Tooltip` | TooltipDialogue | Field help text, score explanation hover, status badge explanation |

> **Not available in Legion (must build custom or use third-party):**
> `Table` (build with HTML `<table>` + Legion styling) · `Skeleton` (build custom loading placeholders) · `Toast/Snackbar` (Legion has `Snackbar` — use for toast notifications) · `Combobox` (build on top of Legion `Select` + `TextField`)

### 2.3 Extended Components (Legion Base + Custom Logic)

| Component | Legion Base | Extension |
|-----------|-------------|-----------|
| `StatusBadge` | `Badge` | Reads from `statusConfig` map. Renders Lucide icon + label with color. Animated pulse for `run_in_progress`. |
| `WorkflowStepper` | `Stepper` (Horizontal) | Wrap Legion Stepper with sandbox-specific steps: Draft → Validated → Assessed → Reviewed → Published. Active/done/future states driven by `model.status`. |
| `FindingsAccordion` | `Accordion` / `AccordionGroup` | Custom per-category headers (name + count + severity icon) → expandable finding rows with evidence links. |
| `PublicationToggle` | `Switch` | Switch + Legion `Modal` confirmation dialog. Disabled until decision is set. Forced OFF for Restrict / Reassess / Not Approved. |
| `RunProgressTracker` | `ProgressBar` | Animated progress + step counter + elapsed time. `aria-live="polite"`. Polling-driven. |
| `EndpointValidationCard` | `Card` + `Button` + `Spinner` | URL preview (masked) + test button + result `Badge` + retry. States: untested / loading / success / failure. |
| `LoginCard` | `Card` | Centered card shell: brand mark + SSO `Button` + `Divider` + `TextField` form. |
| `ToggleRow` | `Switch` | Label + description text + `Switch` toggle. Full-width row layout. |

### 2.4 Custom (Sandbox-Specific) Components — No Legion Base

| Component | Used On | Build Notes |
|-----------|---------|-------------|
| `ScoreBlock` | Model Detail, Benchmark Run, Review Detail, Public Profile | Single score tile: Lucide icon + label + value + SVG color ring. Use Legion `Card` as outer shell. Ring color from score-to-color scale. |
| `ScoreCardGrid` | Multiple pages | CSS grid of 5 `ScoreBlock` items. 5-col desktop, 2-col + 1 mobile. |
| `SeverityIndicator` | Dashboard, Review Queue, Findings | Inline colored dot + label. Tiny component. |
| `EvidencePanel` | Benchmark Run, Review Detail | Slide-out panel (desktop) / inline expand (mobile). Prompt + response in monospace + verdict + raw link. **Lazy-loaded**. |
| `DecisionDrawer` | Review Detail | Side drawer (desktop) / bottom sheet (mobile). Uses Legion `Radio` (5 options) + `TextArea` (reason) + `Button` (confirm). Focus trap. |
| `CompareBar` | Ranking | Sticky bottom bar. Selected model Legion `Chip` items + "Compare" `Button`. Appears when ≥ 2 selected. Max 3. Animate slide-up (250ms). |
| `CompareTable` | Model Comparison | Side-by-side attribute rows for 2–3 models. Desktop: columns. Mobile: Legion `Tabs` switch. |
| `RadarChart` | Model Comparison | `recharts` `<RadarChart>`. **Lazy-loaded**. |
| `RankBadge` | Ranking, Public Profile, Landing | Circular rank number (#1 gold, #2 silver, #3 bronze, rest neutral). |
| `EmptyStateBlock` | Multiple pages | Illustration + Legion `Text` (title + description) + optional `Button` CTA. Reusable shell. |
| `SummaryTile` | Dashboard | Wraps Legion `Card`. Large number + label + Lucide icon. Clickable. Pulse highlight if value > 0. |
| `SystemHealthStrip` | Dashboard | Horizontal metric bar: job queue length, last failure. |
| `AuditTrailTimeline` | Review Detail | Vertical timeline: decision events with Legion `Avatar` + `Text` timestamp. |
| `LanguageSwitcher` | Login, Settings, Public Nav | ID / EN toggle. Can use Legion `Select` (Inline) or `Button` group. |
| `AvatarUpload` | Settings | Click to upload (JPG/PNG, max 2 MB) + preview. Uses Legion `Avatar` + `Button`. |
| `DangerZone` | Settings | Red-bordered section for admin destructive actions. `Alert` (Error variant) styling. |

---

## 3. Shared UI Elements

### 3.1 Shared Across All Internal Pages
- `AppShell` + `Sidebar` (same instance, not re-rendered)
- Legion `Snackbar` system (global toast/notification layer)
- `StatusBadge` (extends Legion `Badge` — used on 10+ screens)
- `Skeleton` loading patterns (custom-built, per-page variants)
- `EmptyStateBlock` (per-page content swap)
- Legion `Alert` for inline error/warning banners
- Access Denied page (shared component)
- 404 Not Found page

### 3.2 Shared Across Specific Pages
- `ScoreCardGrid` → Model Detail, Benchmark Run, Review Detail, Public Profile
- `FindingsAccordion` → Model Detail, Review Detail
- `EvidencePanel` → Benchmark Run, Review Detail
- `RankBadge` → Ranking, Public Profile, Landing, Comparison

---

## 4. State Handling

### 4.1 Server State (TanStack Query)

| Category | Strategy |
|----------|----------|
| All API data | TanStack Query with `queryKey` per resource |
| Pagination | `keepPreviousData: true` for smooth transitions |
| Invalidation | Invalidate related queries after mutations (e.g., after decision → invalidate `reviews`, `models`) |
| Polling — endpoint validation | `refetchInterval: 3000` while status is `validation_pending` |
| Polling — benchmark run | `refetchInterval: 5000` while status is `run_in_progress` |
| Polling — review badge count | `refetchInterval: 30000` for sidebar badge |
| Error retry | Default 3 retries with exponential backoff |
| Caching | `staleTime: 30000` for lists, `staleTime: 10000` for detail pages |

### 4.2 Client State

| State | Location | Notes |
|-------|----------|-------|
| Auth session | HttpOnly cookie (server-managed) | Frontend reads via `GET /api/auth/me` |
| User role & profile | TanStack Query cache | Fetched on app init, used in middleware + guards |
| Sidebar collapsed | `localStorage` | Boolean toggle |
| Active settings tab | URL hash (`#profile`, `#preferences`, etc.) | Persisted in URL |
| Add Model form state | React state (local) | Survives tab switch (Manual ↔ Apilogy), not URL |
| Compare selection | React state (page-level) | Array of model IDs, max 3 |
| Decision drawer selection | React state (component-level) | Radio selected, reason text |
| Reviewer notes | TanStack mutation + debounce | Auto-save via `PATCH` every 1s after last keystroke |
| Theme preference | `localStorage` + CSS class on `<html>` | Applied immediately on change |
| Locale preference | `next-intl` provider | Applied immediately on change |

### 4.3 Workflow Status

> **Critical rule:** Frontend must **never compute model status locally**. Always read `model.status` from the API.

Use a single shared config:

```
lib/statusConfig.ts → Record<ModelStatus, { color, icon, labelKey, pulse? }>
```

All components (`StatusBadge`, `WorkflowStepper`, conditional rendering) reference this single config.

---

## 5. Form Handling

### 5.1 Forms Inventory

| Form | Page | Fields | Complexity |
|------|------|--------|------------|
| Login form | Login | email*, password*, remember | Simple |
| Add Model (Manual) | Add Model | modelName*, provider*, baseModel, endpointUrl*, authMethod*, apiKey*, modelVersion, intendedUseCase, description | Complex |
| Add Model (Apilogy) | Add Model | Capability search → auto-fill → confirm | Medium |
| Reviewer Notes | Review Detail | Rich text area | Simple (auto-save) |
| Decision form | Review Detail | Decision radio*, reason (conditional required), confirm | Medium |
| Profile form | Settings | avatar, displayName* | Simple |
| Preferences form | Settings | language, dateFormat, theme | Simple |
| Notifications form | Settings | 4 toggles | Simple |

### 5.2 Recommended Approach

- Use **React Hook Form** + **Zod** for form state and validation.
- Validate on blur for all fields.
- Show inline error messages below each field (red outline + error text).
- API Key field: `type="password"` with show/hide toggle.
- Endpoint URL: masked display after save (scheme + host, blur path).

---

## 6. Validation Rules

### 6.1 Field-Level Validation (Add Model)

| Field | Rules |
|-------|-------|
| Model name | Required · min 3 · max 100 chars |
| Provider | Required |
| Endpoint URL | Required · valid URL format (https://) |
| Auth method | Required selection |
| API Key | Required when auth ≠ "None" |
| Base model, version, use case, description | Optional |

### 6.2 Action-Level Validation

| Action | Guard |
|--------|-------|
| `Validate & Continue` | All required fields filled + valid |
| `Start Benchmark` | Model status ≥ `endpoint_valid` |
| `Submit for Review` | Model status = `assessment_completed` |
| `Confirm Decision` | Decision selected + reason filled (if required for that decision type) |
| `Publication Toggle` | Decision must be set. Forced OFF for Restrict / Reassess / Not Approved. |
| `Re-validate` | Not during active run |
| `Compare` | 2–3 models selected |

### 6.3 Role-Level Validation

Refer to the Permission Matrix. Implement as:
1. **Middleware-level** (Next.js middleware): redirect unauthorized routes.
2. **Component-level** guards: hide/disable actions the role cannot perform.

---

## 7. API Placeholder Layer

### 7.1 API Client Setup

Create `lib/api.ts` with:
- Axios/fetch wrapper with base URL config
- Auth token injection (cookie-based)
- Error interceptor (401 → redirect to login, 403 → Access Denied page)
- Response typing with TypeScript interfaces

### 7.2 API Endpoints to Stub

| Method | Endpoint | Used By |
|--------|----------|---------|
| `POST` | `/api/auth/login` | Login |
| `GET` | `/api/auth/me` | App init (session check) |
| `POST` | `/api/auth/logout` | Sidebar user menu |
| `GET` | `/api/models` | My Models, Dashboard |
| `POST` | `/api/models` | Add Model |
| `GET` | `/api/models/:id` | Model Detail |
| `PATCH` | `/api/models/:id` | Model Detail (edit) |
| `POST` | `/api/models/:id/validate` | Add Model, Model Detail |
| `POST` | `/api/models/:id/runs` | Model Detail, Benchmark Run |
| `GET` | `/api/models/:id/runs` | Model Detail |
| `GET` | `/api/models/:id/runs/:runId` | Benchmark Run |
| `GET` | `/api/models/:id/runs/:runId/evidence` | Benchmark Run, Review Detail |
| `POST` | `/api/models/:id/submit-review` | Model Detail, Benchmark Run |
| `GET` | `/api/reviews` | Review Queue, Dashboard |
| `GET` | `/api/reviews/:id` | Review Detail |
| `POST` | `/api/reviews/:id/decision` | Review Detail |
| `PATCH` | `/api/reviews/:id` | Review Detail (auto-save notes) |
| `POST` | `/api/models/:id/publication` | Review Detail |
| `GET` | `/api/ranking` | Ranking, Landing |
| `GET` | `/api/ranking/compare?ids=` | Model Comparison |
| `GET` | `/api/models/:id/public` | Public Model Profile |
| `GET` | `/api/health` | Dashboard |
| `PATCH` | `/api/users/me` | Settings (profile) |
| `PATCH` | `/api/users/me/preferences` | Settings (preferences) |
| `PATCH` | `/api/users/me/notifications` | Settings (notifications) |

### 7.3 Mock Data Strategy

Create `lib/mocks/` with JSON fixtures for each endpoint. Use **MSW (Mock Service Worker)** for development:
- Enable by default in dev mode
- Each fixture aligns with TypeScript interfaces in `types/`
- Include all state variants (empty, loaded, error, edge cases)

---

## 8. Internationalization (i18n)

### 8.1 Setup

- Framework: `next-intl`
- Default locale: `id` (Bahasa Indonesia)
- Fallback locale: `en` (English)
- Locale files: `messages/id.json`, `messages/en.json`

### 8.2 Key Categories

All strings from `UI_Copy.md` organized by namespace:
`nav.*`, `action.*`, `status.*`, `score.*`, `severity.*`, `form.*`, `error.*`, `dialog.*`, `empty.*`, `loading.*`, `micro.*`, `term.*`

### 8.3 Date & Number Formatting

- Dates: `Intl.DateTimeFormat` with active locale
- Numbers/scores: `Intl.NumberFormat` (no decimals)
- Indonesia-specific terms: SARA, UU PDP, Konten Radikal, etc.

---

## 9. Implementation Order

### Phase 1 — Foundation (Sprint 1)

1. **Project scaffold**: Next.js App Router + TypeScript + ESLint + Prettier
2. **Install Legion UI Kit**: `npm install @legion-ui-kit/react-core` + verify Storybook components render
3. **Design tokens**: CSS custom properties from Design System Guide + Legion theme integration
4. **Layout**: `AppShell`, `Sidebar` (custom), `PublicNavbar` (wraps Legion `Navbar`), `NavbarMinimal`
5. **Auth plumbing**: middleware, role guard, `GET /api/auth/me`, login page
6. **API client**: `lib/api.ts` + TanStack Query provider + MSW setup
7. **i18n**: `next-intl` setup + locale files (initial keys)
8. **Shared utilities**: `statusConfig.ts`, date/number formatters
9. **Base components**: `StatusBadge` (extends Legion `Badge`), `EmptyStateBlock`, custom `Skeleton` loader, custom `Table` component

### Phase 2 — Core Workflows P0 (Sprint 2–3)

9. **My Models** page (list + filter + pagination + empty/loading/error states)
10. **Add Model** page (form + tabs + validation + endpoint validation card)
11. **Model Detail** page (stepper + endpoint card + benchmark selector + run history + scorecard)
12. **Benchmark Run** page (progress tracker + scorecard + evidence panel + polling)
13. **Review Queue** page (table + filters + priority highlighting)
14. **Review Detail** page (scorecard + findings + evidence + decision drawer + publication toggle + audit trail)
15. **Dashboard** page (summary tiles + queue preview + recent runs + health strip)

### Phase 3 — Discovery & Public P1 (Sprint 4)

16. **Ranking** page (filter + card grid + compare bar)
17. **Model Comparison** page (radar chart + compare table)
18. **Public Model Profile** page (hero + summary + simplified scorecard + SEO)
19. **Landing / Home** page (hero + top models + how-it-works + trust statement)
20. **Settings** page (profile + preferences + notifications + system admin tab)

### Phase 4 — Polish (Sprint 5)

21. **Responsive refinement**: all breakpoints per Screen_Specs
22. **Accessibility audit**: WCAG 2.1 AA compliance, unique IDs, keyboard nav, aria-live
23. **Performance**: lazy-load evidence panel + radar chart, skeleton CLS prevention
24. **E2E testing**: Playwright tests for P0 flows

---

## 10. Technical Assumptions

1. **Backend is FastAPI** — REST endpoints as listed in §7.2. No GraphQL.
2. **Auth is cookie/JWT** — HttpOnly cookies. Frontend does not store tokens in localStorage.
3. **Single benchmark package for MVP** — "Indonesia Core Trust Package." No package picker complexity.
4. **Single reviewer per model (MVP)** — no multi-approval chain.
5. **Score scale is 0–100** — adjust color ring thresholds if different.
6. **Apilogy import** — may be a static capability list for MVP. TBD on search endpoint.
7. **WebSocket** — not required for MVP. Use polling. WebSocket is MVP+ enhancement.
8. **Legion UI Kit (`@legion-ui-kit/react-core`)** is the company standard. All base components must use Legion. See §2.2 for the full component map. Components not in Legion (Table, Skeleton, Combobox) are custom-built following Legion's design language.
9. **Lucide React** is the icon library — used for all custom icons. Legion's built-in `Icon` component may be used for Legion-specific patterns, but do not mix with other icon sets.
10. **Theme**: light mode is default. Dark mode depends on Legion design system readiness (MVP cosmetic only).
11. **No self-registration** — accounts are admin-provisioned.
12. **Model comparison capped at 3** — design does not scale to N-way for MVP.
13. **Publication is a separate toggle** from approval decision — never combined in one click.
14. **Legion `Snackbar`** should be used for all toast notifications (success, error, info).

---

## 11. Recommended Directory Structure

```
03_Frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (internal)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── models/
│   │   │   │   ├── page.tsx              ← My Models
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx          ← Add Model
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx          ← Model Detail
│   │   │   │       └── runs/
│   │   │   │           └── [runId]/
│   │   │   │               └── page.tsx  ← Benchmark Run
│   │   │   ├── reviews/
│   │   │   │   ├── page.tsx              ← Review Queue
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx          ← Review Detail
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                ← AppShell + Sidebar
│   │   ├── (public)/
│   │   │   ├── page.tsx                  ← Landing / Home
│   │   │   ├── ranking/
│   │   │   │   ├── page.tsx              ← Ranking
│   │   │   │   └── compare/
│   │   │   │       └── page.tsx          ← Model Comparison
│   │   │   ├── models/
│   │   │   │   └── [id]/
│   │   │   │       └── public/
│   │   │   │           └── page.tsx      ← Public Profile
│   │   │   └── layout.tsx                ← PublicNavbar
│   │   ├── layout.tsx                    ← Root layout (providers)
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── NavItem.tsx
│   │   │   ├── PublicNavbar.tsx
│   │   │   └── NavbarMinimal.tsx
│   │   ├── shared/
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── EmptyStateBlock.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── AccessDenied.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── model/
│   │   │   ├── WorkflowStepper.tsx
│   │   │   ├── EndpointValidationCard.tsx
│   │   │   └── ModelForm.tsx
│   │   ├── score/
│   │   │   ├── ScoreBlock.tsx
│   │   │   ├── ScoreCardGrid.tsx
│   │   │   └── SeverityIndicator.tsx
│   │   ├── findings/
│   │   │   ├── FindingsAccordion.tsx
│   │   │   └── EvidencePanel.tsx
│   │   ├── review/
│   │   │   ├── DecisionDrawer.tsx
│   │   │   ├── PublicationToggle.tsx
│   │   │   └── AuditTrailTimeline.tsx
│   │   ├── ranking/
│   │   │   ├── RankBadge.tsx
│   │   │   ├── CompareBar.tsx
│   │   │   ├── CompareTable.tsx
│   │   │   └── RadarChart.tsx
│   │   ├── run/
│   │   │   └── RunProgressTracker.tsx
│   │   ├── dashboard/
│   │   │   ├── SummaryTile.tsx
│   │   │   └── SystemHealthStrip.tsx
│   │   └── settings/
│   │       ├── AvatarUpload.tsx
│   │       ├── ToggleRow.tsx
│   │       └── DangerZone.tsx
│   ├── lib/
│   │   ├── api.ts                        ← API client wrapper
│   │   ├── statusConfig.ts               ← Status → color/icon/label map
│   │   ├── auth.ts                       ← Auth helpers
│   │   ├── formatters.ts                 ← Date/number formatting
│   │   └── hooks/
│   │       ├── useAuth.ts
│   │       ├── useModels.ts
│   │       ├── useReviews.ts
│   │       ├── useRanking.ts
│   │       └── usePolling.ts
│   ├── types/
│   │   ├── model.ts
│   │   ├── review.ts
│   │   ├── run.ts
│   │   ├── ranking.ts
│   │   ├── user.ts
│   │   └── api.ts
│   ├── mocks/
│   │   ├── handlers.ts                   ← MSW request handlers
│   │   ├── browser.ts                    ← MSW browser setup
│   │   └── fixtures/
│   │       ├── models.json
│   │       ├── reviews.json
│   │       ├── runs.json
│   │       ├── ranking.json
│   │       └── users.json
│   ├── messages/
│   │   ├── id.json                       ← Bahasa Indonesia strings
│   │   └── en.json                       ← English strings
│   └── styles/
│       ├── globals.css                   ← Design tokens + resets
│       ├── variables.css                 ← CSS custom properties
│       └── components/                   ← Per-component CSS modules
├── public/
│   └── assets/
│       ├── logo.svg
│       └── illustrations/               ← Empty state illustrations
├── Frontend_Build_Plan.md                ← This file
├── Frontend_Tasks.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── middleware.ts                         ← Auth + role guard
└── .env.local                            ← API base URL, MSW toggle
```
