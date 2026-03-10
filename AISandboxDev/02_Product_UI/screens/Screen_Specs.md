# AI Sandbox – Screen-by-Screen Design Specs

> Sources: `Product_UI_Specification.md`, `User_Flow.md`, `Wireframe_Notes.md`, `Design_System_Guide.md`, `UI_Copy.md`
> Total MVP screens: 11

---

## Screen 01 · Dashboard

**Route:** `/dashboard`
**Audience:** Admin / Reviewer
**Priority:** P0

### Purpose

Give the Admin / Reviewer an operational overview: how many models exist, what needs review, which runs are active, and whether the system is healthy.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Summary tiles (4-col grid) | Total Models · Pending Reviews · Active Runs · Published Count |
| 2 | Review queue preview | Top 5 pending items — model name, score, critical count, status badge, "Review →" link |
| 3 | Recent runs | Last 10 runs — run ID, model name, status badge, score |
| 4 | System health strip | Job queue length · last failure timestamp |

**Desktop:** 2-column layout — tiles span full width; queue left, runs right; health strip full width.
**Mobile:** Stack vertically. Tiles become 2×2 grid.

### Key Components

`Card` · `Table` · `StatusBadge` · `SeverityIndicator` · `Skeleton`

### User Actions

| Action | Trigger | Destination |
|--------|---------|-------------|
| Click pending review row | Row click or "Review →" | `/reviews/[id]` |
| Click recent run row | Row click | `/models/[id]/runs/[runId]` |
| Refresh | Pull-to-refresh (mobile) or auto-poll | Re-fetch all tiles |

### Validation Rules

None — read-only page.

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | 4 skeleton tiles + skeleton table rows (5 queue + 10 runs) |
| **Empty (new install)** | Tiles show `0`. Queue: "Tidak ada review yang tertunda" / "No pending reviews.". Runs: "Belum ada eksekusi" / "No runs yet." |
| **Error** | Full-width error banner: "Gagal memuat dasbor" + Retry CTA |
| **Permission denied** | Redirect non-admin roles → Access Denied page |

### Notes for Frontend Developer

- Poll `GET /api/reviews?status=pending&count_only=true` every **30 s** for the pending badge count.
- Tiles should use the design system `Card` with large number + label + subtle icon.
- Priority rows in the queue preview: if `critical_count > 0`, apply `--color-severity-critical` left border.
- Route group: `(internal)/dashboard`.

---

## Screen 02 · My Models

**Route:** `/models`
**Audience:** Model Owner (own models) · Admin / Reviewer (all models)
**Priority:** P0

### Purpose

List models belonging to the current user (or all models for admin). Primary CTA to add a new model.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Filter bar | Status dropdown · date range picker · search input · `+ Tambah Model` button (right-aligned) |
| 2 | Model table | Columns: Name · Provider · Status Badge · Latest Score · Last Run Date · Actions (View / Edit) |
| 3 | Pagination | Below table |

**Desktop:** Full-width table.
**Mobile:** Replace table with card list (model name + status badge + score). Filter icon opens bottom-sheet filter panel.

### Key Components

`Table` · `StatusBadge` · `Button` · `Input` (search) · `Select` (status filter) · `Pagination` · `EmptyStateBlock` · `Skeleton`

### User Actions

| Action | Trigger | Destination |
|--------|---------|-------------|
| Click `+ Tambah Model` | Button | `/models/new` |
| Click model row | Row click | `/models/[id]` |
| Filter by status | Select change | Re-fetch with `?status=` |
| Search | Input debounce 300 ms | Re-fetch with `?search=` |
| Change page | Pagination click | Re-fetch with `?page=` |

### Validation Rules

None — read-only list with filters.

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | 5 skeleton rows matching table column widths |
| **Empty** | `EmptyStateBlock`: robot illustration · "Belum ada model" · "Mulai dengan mendaftarkan model AI pertama Anda." · CTA: `+ Tambah Model` |
| **Error** | "Gagal memuat daftar model" · Retry CTA |
| **No filter results** | "Tidak ada model yang cocok" · "Coba ubah filter atau kata kunci pencarian Anda." · `Hapus Filter` CTA |
| **Permission denied** | Non-authenticated → redirect to login |

### Notes for Frontend Developer

- Admin sees all models via `GET /api/models`. Model Owner sees own models via `GET /api/models?owner=me`.
- Debounce search input at **300 ms** before firing API call.
- Table rows should show hover state and be fully clickable (not just the name cell).
- Use `SWR` / `TanStack Query` with `keepPreviousData` for smooth pagination transitions.

---

## Screen 03 · Add Model

**Route:** `/models/new`
**Audience:** Model Owner · Admin / Reviewer
**Priority:** P0

### Purpose

Create a new model draft by entering metadata and endpoint details, or by importing from Apilogy. Validate the endpoint before continuing.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Breadcrumb | Models > Add Model |
| 2 | Source selector | `Tabs`: Manual / Import from Apilogy |
| 3 | Form (Manual tab) | Fields: Model name*, Provider*, Base model, Endpoint URL*, Auth method*, API Key*, Model version, Intended use case, Description |
| 4 | Form (Apilogy tab) | Capability search `Combobox` → auto-fill fields → user confirms |
| 5 | Endpoint validation card | URL preview (masked) · test button · result badge · retry |
| 6 | Action bar | `Save Draft` (secondary) · `Validate & Continue` (primary, disabled until required fields filled) |

**Desktop:** Centered form, `max-width: 720px`.
**Mobile:** Full-width stacked form. Action bar becomes sticky bottom bar.

### Key Components

`Tabs` · `Input` · `TextArea` · `Select` · `Combobox` · `Button` · `Breadcrumb` · `EndpointValidationCard` · `Toast`

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Switch source tab | Tab click | Toggle between Manual / Apilogy form |
| Fill form | Input change | Inline validation on blur |
| Save Draft | Secondary button | `POST /api/models` → Toast: "Draf berhasil disimpan" → stay on page |
| Validate & Continue | Primary button | `POST /api/models` (if new) → `POST /api/models/:id/validate` → loading → success/failure |
| Retry validation | Retry in validation card | Re-trigger `POST /api/models/:id/validate` |
| Import from Apilogy | Select capability → Confirm | Auto-fill fields → user reviews → Save Draft |

### Validation Rules

| Field | Rule | Error Key |
|-------|------|-----------|
| Model name | Required · 3–100 chars | `error.required.modelName` / `error.minLength` |
| Provider | Required | `error.required.provider` |
| Endpoint URL | Required · valid URL format | `error.required.endpointUrl` / `error.invalid.endpointUrl` |
| Auth method | Required selection | `error.required.authMethod` |
| API Key | Required when auth ≠ None · masked input | `error.required.apiKey` |
| Base model | Optional | — |
| Model version | Optional | — |
| Intended use case | Optional | — |
| Description | Optional | — |

Validate **on blur** for each field. Show red outline + error message below field.

### State Variants

| State | Behavior |
|-------|----------|
| **Initial** | Empty form · Validation card shows "Belum diuji" / "Not tested yet" |
| **Validation loading** | Spinner inside `EndpointValidationCard` · "Memvalidasi endpoint…" · buttons disabled |
| **Validation success** | ✓ teal badge · "Endpoint tervalidasi" · `Validate & Continue` navigates to `/models/[id]` |
| **Validation failure** | ✕ red badge · "Validasi gagal" · error code behind "Lihat Detail" toggle · Retry CTA |
| **Draft saved** | Toast: "Draf berhasil disimpan" |
| **Form errors** | Red outline on invalid fields · error messages below |
| **API error** | Toast: "Terjadi kesalahan. Coba lagi nanti." |

### Notes for Frontend Developer

- API Key field must use `type="password"` with a show/hide toggle (`eye` / `eye-off` icon).
- On Apilogy tab, the `Combobox` calls a search API (TBD — Apilogy integration endpoint). For MVP, this may be a static list. Use a loading state for the combobox dropdown.
- Save Draft and Validate are **two separate API calls**: `POST /api/models` creates the record, `POST /api/models/:id/validate` tests the endpoint.
- After successful validation, redirect to `/models/[id]` so the user sees the Model Detail with stepper at step 2.
- Form state should persist in local state (not URL) to survive tab switches.

---

## Screen 04 · Model Detail

**Route:** `/models/[id]`
**Audience:** Model Owner (own) · Admin / Reviewer (all)
**Priority:** P0

### Purpose

Single source of truth for a model's lifecycle. Shows current status, endpoint info, benchmark options, run history, scorecard, and findings. Content adapts to the model's current workflow state.

### Layout Sections

| # | Section | Content | Visible When |
|---|---------|---------|--------------|
| 1 | Header | Model name · provider · `StatusBadge` · created date | Always |
| 2 | Restriction banner | ⚠ "Model ini dibatasi" | Status = `restricted` |
| 3 | `WorkflowStepper` | Draft → Validated → Assessed → Reviewed → Published | Always |
| 4 | Endpoint card | URL (masked) · auth type · validation status · Re-validate button | Always |
| 5 | Benchmark selector | Package card: name, description · `Start Benchmark` button | Status ≥ `endpoint_valid` |
| 6 | Run history table | Run ID · date · status badge · overall score · View action | Any runs exist |
| 7 | `ScoreCardGrid` | Trust · Security · Privacy · Readiness · Compliance | Status ≥ `assessment_completed` |
| 8 | `FindingsAccordion` | Per-category: severity icon, count → expandable finding rows | Status ≥ `assessment_completed` |

**Desktop:** Left column: stepper + endpoint card + benchmark selector. Right column: scorecard + findings. Run history spans full width.
**Mobile:** Single column. Stepper scrolls horizontally.

### Key Components

`WorkflowStepper` · `StatusBadge` · `EndpointValidationCard` · `Card` · `Table` · `ScoreBlock` · `ScoreCardGrid` · `FindingsAccordion` · `Button` · `Skeleton`

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Re-validate endpoint | Button in endpoint card | `POST /api/models/:id/validate` → loading → success/failure |
| Start Benchmark | Button in selector | Confirm dialog → `POST /api/models/:id/runs` → redirect to `/models/[id]/runs/[runId]` |
| View past run | Row click in run history | Navigate to `/models/[id]/runs/[runId]` |
| Expand finding category | Accordion click | Show finding detail rows |
| Submit for Review | Button (after assessment) | Confirm dialog → `POST /api/models/:id/submit-review` → status → `pending_review` |

### Validation Rules

- `Start Benchmark` disabled when status < `endpoint_valid`.
- `Submit for Review` disabled when status ≠ `assessment_completed`.
- `Re-validate` disabled when a run is currently in progress.

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | Full-page skeleton: stepper + cards + table placeholder |
| **Draft** | Only header + stepper (step 1 active) + endpoint card (untested) visible |
| **Validated** | Endpoint card shows ✓. Benchmark selector becomes visible. |
| **Assessment running** | Run history shows latest run as "Sedang Berjalan" with animated badge |
| **Assessment completed** | Scorecard + findings appear. Submit for Review button visible. |
| **Pending review** | Submit button replaced with label "Menunggu Review". Model Owner sees read-only. |
| **Approved / Published** | Stepper shows final steps highlighted. Publication status shown. |
| **Restricted** | Yellow warning banner at top. No publish controls for Model Owner. |
| **404** | "Model tidak ditemukan" / "Model not found" + Go Back CTA |
| **Permission denied** | Access Denied page for non-owner, non-admin |

### Notes for Frontend Developer

- Conditionally render sections based on `model.status` — use the status order to determine which step is active in the stepper.
- Admin sees an additional "Go to Review" action link when status = `pending_review`.
- Run history table: sort by date descending (latest first).
- `ScoreCardGrid` scores use the color ring scale from `Design_System_Guide.md` §2.3.
- Mask endpoint URL: show scheme + host, blur the path — e.g., `https://api.example.com/•••••`.
- Route group: `(internal)/models/[id]`.

---

## Screen 05 · Benchmark Run

**Route:** `/models/[id]/runs/[runId]`
**Audience:** Model Owner · Admin / Reviewer
**Priority:** P0

### Purpose

Show the status and results of a specific benchmark run. When running, display live progress. When completed, display scorecard and evidence.

### Layout Sections

| # | Section | Content | Visible When |
|---|---------|---------|--------------|
| 1 | Run header | Run ID · package name · `StatusBadge` · duration | Always |
| 2 | `RunProgressTracker` | Animated progress bar · step counter · elapsed time | Status = `run_queued` or `run_in_progress` |
| 3 | `ScoreCardGrid` | Trust · Security · Privacy · Readiness · Compliance | Status = `assessment_completed` |
| 4 | `EvidencePanel` | Per-finding: prompt text · model response · verdict · severity · raw artifact link | Status = `assessment_completed` |
| 5 | Action bar | Model Owner: `Submit for Review` / `Rerun` · Admin: `Go to Review` | Status = `assessment_completed` |

**Desktop:** Full-width stacked sections.
**Mobile:** Evidence panel renders as accordion list. Action bar sticky bottom.

### Key Components

`RunProgressTracker` · `StatusBadge` · `ScoreBlock` · `ScoreCardGrid` · `EvidencePanel` · `SeverityIndicator` · `Button` · `Skeleton`

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| (automatic) Live progress | Polling every 5 s | Progress bar updates |
| View evidence for finding | Click/expand finding row | Show prompt + response + verdict |
| View raw artifact | Link click | Open raw artifact in new tab |
| Submit for Review | Primary button | Confirm dialog → `POST /api/models/:id/submit-review` |
| Rerun | Secondary button | Confirm dialog → `POST /api/models/:id/runs` → navigate to new run |
| Go to Review | Admin link | Navigate to `/reviews/[id]` |

### Validation Rules

- `Submit for Review` only visible when status = `assessment_completed` and model status ≠ `pending_review`.
- `Rerun` always available after completion or failure.

### State Variants

| State | Behavior |
|-------|----------|
| **Queued** | Clock icon · "Dalam antrean · Posisi: #N" · no scorecard |
| **Running** | Animated progress bar · polling every 5 s · elapsed time counter |
| **Completed** | Full scorecard + evidence panel + action bar |
| **Failed** | ⚠ red · "Benchmark gagal" · error summary + expandable technical log · `Jalankan Ulang` CTA |
| **Loading** | Full-page skeleton |
| **Evidence unavailable** | Per-finding: "Bukti tidak tersedia" message |

### Notes for Frontend Developer

- **Polling:** `GET /api/models/:id/runs/:runId` every **5 s** while `run_in_progress`. Stop polling on terminal states (`assessment_completed`, `run_failed`).
- Evidence panel should be **lazy-loaded** — don't fetch evidence until the user scrolls to or expands findings.
- Evidence API: `GET /api/models/:id/runs/:runId/evidence`.
- The `RunProgressTracker` component should use `aria-live="polite"` so screen readers announce progress changes.
- Prompt/response text should be displayed in monospace font blocks.

---

## Screen 06 · Review Queue

**Route:** `/reviews`
**Audience:** Admin / Reviewer only
**Priority:** P0

### Purpose

Show all models awaiting review decision. Let the reviewer prioritize by severity and quickly jump to the review detail.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Filter bar | Severity dropdown · date range · status dropdown |
| 2 | Queue table | Columns: Model Name · Run Date · Overall Score · Critical Count · Status Badge · "Review →" CTA |
| 3 | Priority indicator | Rows with `critical_count > 0` get a `--color-severity-critical` left border / highlight |

**Desktop:** Full-width table.
**Mobile:** Card list sorted by severity descending. Each card shows model name, score, critical count badge. Tap to open.

### Key Components

`Table` · `StatusBadge` · `SeverityIndicator` · `Button` · `Select` · `EmptyStateBlock` · `Skeleton`

### User Actions

| Action | Trigger | Destination |
|--------|---------|-------------|
| Click review row / "Review →" | Row click | `/reviews/[id]` |
| Filter by severity | Select change | Re-fetch with params |
| Filter by date | Date picker | Re-fetch |

### Validation Rules

None — read-only list.

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | 5 skeleton rows |
| **Empty** | `EmptyStateBlock`: clipboard + checkmark illustration · "Tidak ada review yang tertunda" · "Semua model telah ditinjau." |
| **Error** | "Gagal memuat antrean review" · Retry CTA |
| **Permission denied** | Non-admin → Access Denied page |

### Notes for Frontend Developer

- API: `GET /api/reviews` with filter params.
- Default sort: critical count descending, then date ascending (oldest first to encourage timely review).
- The sidebar "Review Queue" nav item should show a **count badge** (polled every 30 s).
- High-risk rows: apply a 4px left border with `--color-severity-critical` and a subtle red background tint.

---

## Screen 07 · Review Detail

**Route:** `/reviews/[id]`
**Audience:** Admin / Reviewer only
**Priority:** P0

### Purpose

Let the reviewer inspect the full assessment, drill into evidence, record notes, set a decision, and control publication.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Score summary | `ScoreCardGrid` — same 5 blocks |
| 2 | Category findings | `FindingsAccordion` — severity icons + counts → expandable finding rows with evidence links |
| 3 | Evidence panel | `EvidencePanel` — slide-out (desktop) / inline expand (mobile) — prompt, response, verdict, raw link |
| 4 | Reviewer notes | Rich text `TextArea` |
| 5 | Decision drawer | Side drawer (desktop) / bottom sheet (mobile): 5 radio options + mandatory reason field + Confirm |
| 6 | Publication toggle | `PublicationToggle`: Publish / Hide switch with confirmation dialog. Disabled until a decision is set. |
| 7 | Audit trail | `AuditTrailTimeline` — chronological list of decision events with actor + timestamp |

**Desktop:** Left: score summary + findings + evidence. Right: sticky decision drawer.
**Mobile:** Drawer becomes full-screen bottom sheet triggered by floating "Set Decision" button.

### Key Components

`ScoreCardGrid` · `FindingsAccordion` · `EvidencePanel` · `TextArea` · `DecisionDrawer` · `PublicationToggle` · `AuditTrailTimeline` · `Modal` (confirmation) · `Toast`

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Expand finding | Accordion click | Show finding rows with evidence links |
| Open evidence | Finding row link | Slide-out panel (desktop) or inline expand |
| Write notes | TextArea input | Auto-save draft notes (debounce 1 s) |
| Select decision | Radio button in drawer | Enable reason field + confirm button |
| Confirm decision | Confirm button | `POST /api/reviews/:id/decision` → Toast: "Keputusan berhasil ditetapkan" → status updates in UI |
| Toggle publication | Switch toggle | Confirmation dialog → `POST /api/models/:id/publication` → Toast |

### Validation Rules

| Field / Action | Rule |
|----------------|------|
| Decision selection | Required before confirm is enabled |
| Reason field | **Mandatory** for: Approved with Controls, Restrict, Reassessment Required, Not Approved. **Optional** for: Approve. |
| Publication toggle | Disabled until a decision is set. Forced OFF for Restrict / Reassessment / Not Approved. |

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | Skeleton scorecard + skeleton findings list |
| **No decision yet** | Decision drawer open with all options unselected. Publication toggle disabled. |
| **Decision set** | Decision drawer shows selected option as confirmed. Publication toggle enabled (if applicable). |
| **Already decided** | Show read-only decision summary + audit trail. Allow override with new decision (recorded in trail). |
| **Evidence unavailable** | "Bukti tidak tersedia" message per finding |
| **Error** | "Gagal memuat detail review" · Retry CTA |
| **Permission denied** | Non-admin → Access Denied page |

### Notes for Frontend Developer

- Decision API: `POST /api/reviews/:id/decision` with body `{ decision, reason, notes }`.
- Publication API: `POST /api/models/:id/publication` with body `{ visible: true/false }`.
- The decision drawer should trap focus when open (accessibility).
- Auto-save reviewer notes via debounced `PATCH /api/reviews/:id` every **1 s** after last keystroke.
- Audit trail: `GET /api/reviews/:id` includes `decision_history[]` with `{ actor, action, timestamp, reason }`.
- When a reviewer overrides a previous decision, add a new entry to the audit trail — never delete old entries.

---

## Screen 08 · Ranking

**Route:** `/ranking`
**Audience:** Builder · Admin / Reviewer · Public Viewer
**Priority:** P1

### Purpose

Showcase published models ranked by overall trust score. Let Builders filter, compare, and choose a model for their use case.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Filter bar | Provider · Model type · Approval status · Use case · Score range slider |
| 2 | Ranked model cards | 3-col grid (desktop) · each card: `RankBadge` · model name · provider · overall score · approval label · suitability tag · compare checkbox |
| 3 | `CompareBar` (sticky bottom) | Appears when ≥ 2 models have compare checkbox checked. Shows selected chips + "Bandingkan Model" CTA. Max 3. |

**Desktop:** 3-column card grid.
**Mobile:** 1-column card list. Compare bar sticky bottom.

### Key Components

`Card` · `RankBadge` · `StatusBadge` · `Badge` (suitability tag) · `Select` (filters) · `CompareBar` · `EmptyStateBlock` · `Skeleton`

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Filter | Any filter change | Re-fetch with params |
| Open model detail | Card click (non-checkbox area) | Navigate to `/models/[id]/public` (public) or `/models/[id]` (admin/builder) |
| Check compare box | Checkbox toggle | Add/remove from compare bar. Cap at 3. |
| Click "Compare" | CompareBar CTA | Navigate to `/ranking/compare?ids=a,b,c` |
| Clear filters | CTA in no-results state | Reset all filters |

### Validation Rules

- Compare limited to **max 3** models. On 4th check → toast: "Maksimal 3 model untuk perbandingan."
- Only `published` models appear. `hidden`, `restricted`, `not_approved` never shown.

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | 6 skeleton cards in grid |
| **Empty** | Trophy illustration · "Belum ada model yang dipublikasikan" · "Model yang disetujui akan muncul di sini." |
| **No filter results** | "Tidak ada model yang cocok" · `Hapus Filter` CTA |
| **Error** | "Gagal memuat peringkat" · Retry CTA |
| **Compare active** | Sticky bottom bar slides up with selected model chips |

### Notes for Frontend Developer

- API: `GET /api/ranking` with filter query params.
- `RankBadge`: top 3 models get accent-colored circles (#1 gold, #2 silver, #3 bronze). Rest get neutral gray.
- Cards should have a hover shadow elevation transition (150 ms ease).
- CompareBar: animate slide-up (250 ms ease-out) when checkboxes reach ≥ 2. Slide-down when < 2.
- Public Viewer sees this page **without** the compare checkbox (no compare feature for public).
- Route group: `(public)/ranking` — accessible to all roles.

---

## Screen 09 · Model Comparison

**Route:** `/ranking/compare?ids=a,b,c`
**Audience:** Builder · Admin / Reviewer
**Priority:** P1

### Purpose

Side-by-side comparison of 2–3 models to help Builders evaluate tradeoffs and pick the best fit.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Comparison header | Model names side-by-side with `RankBadge` + overall score |
| 2 | `RadarChart` | Overlaid radar showing 5 category scores per model |
| 3 | `CompareTable` | Rows: Trust · Security · Privacy · Readiness · Compliance · Strengths · Weaknesses · Restrictions · Recommended use cases |
| 4 | Action bar | `Select Model A` · `Select Model B` · `← Back to Ranking` |

**Desktop:** Side-by-side columns (2 or 3).
**Mobile:** Tab-switch per model (Model A | Model B | Model C). Radar chart below tabs. Action bar sticky bottom.

### Key Components

`RankBadge` · `RadarChart` · `CompareTable` · `Tabs` (mobile) · `Button` · `Skeleton`

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Switch model tab (mobile) | Tab click | Show that model's column |
| Select model | Action bar button | _(future)_ sends model choice to AgentLab or records selection. MVP: navigates to model detail. |
| Back to Ranking | Link | Navigate to `/ranking` |

### Validation Rules

- Requires ≥ 2 model IDs in query params. If < 2, redirect to `/ranking`.
- Max 3. If > 3 IDs provided, use first 3 only.

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | Skeleton columns + placeholder chart |
| **Error** | "Gagal memuat perbandingan" · Retry CTA |
| **Model not found** | If one of the IDs is invalid, show 2 remaining. If all invalid, redirect to `/ranking`. |

### Notes for Frontend Developer

- API: `GET /api/ranking/compare?ids=a,b,c` returns comparison payload.
- `RadarChart`: use `recharts` `<RadarChart>`. Lazy-load the chart bundle.
- Highlight the **winning score** in each category row (bold + `--color-status-success` text).
- Table cells for Restrictions: if model has restrictions, use `--color-status-warning` background tint.
- Mobile tab-switch preserves the radar chart below — chart always shows all models overlaid.

---

## Screen 10 · Public Model Profile

**Route:** `/models/[id]/public`
**Audience:** Public Viewer · Builder
**Priority:** P1

### Purpose

Clean, article-style public page for a published model. Shows rating, suitability, and limitations without exposing internal evidence.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Hero card | Model name · provider logo (or placeholder) · overall rating `RankBadge` · approval label |
| 2 | Summary | What the model is · what it's good for · main limitations — paragraph text |
| 3 | Score overview | Simplified `ScoreCardGrid` — 5 blocks with scores, no click-through to findings |
| 4 | Approval label | "Disetujui" / "Disetujui dengan Kontrol" badge — prominent |
| 5 | Footer | "Penilaian dilakukan oleh AI Sandbox · Hasil terakhir diperbarui {date}" |

**Desktop:** Centered article layout, `max-width: 800px`.
**Mobile:** Full-width article. Hero card stacks vertically.

### Key Components

`Card` · `RankBadge` · `StatusBadge` · `ScoreBlock` · `ScoreCardGrid`

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Scroll / read | — | Read-only page |
| Share URL | Browser share | Standard URL sharing |

### Validation Rules

None — read-only.

### Content Guardrails

| Must NEVER show | Reason |
|-----------------|--------|
| Raw evidence (prompts, responses) | Security / trust |
| Reviewer notes | Internal data |
| Endpoint URL, API key, auth method | Credential exposure |
| Restriction reasons | Internal operations |
| Hidden / restricted models | Not published |

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | Skeleton hero + skeleton paragraphs + skeleton score blocks |
| **Model published** | Full content as described |
| **Model unpublished / not found** | "Profil model ini tidak lagi tersedia" / "This model profile is no longer available." + Go Back CTA |
| **Model never published** | 404 — same as above |

### Notes for Frontend Developer

- API: `GET /api/models/:id/public` — backend must **sanitize** and strip all evidence, reviewer data, and credentials.
- Route group: `(public)/models/[id]/public`.
- SEO: generate `<title>` as "{Model Name} — AI Sandbox Rating". Add `<meta description>` from summary text.
- Footer date: use `Intl.DateTimeFormat` with active locale.
- If `approved_with_controls`, show a subtle info banner: "Model ini disetujui dengan kontrol tertentu" / "This model is approved with certain controls."

---

## Screen 11 · Landing / Home

**Route:** `/`
**Audience:** Public Viewer
**Priority:** P1

### Purpose

Public entry point. Communicate the product value, show top-ranked models, and drive users to the ranking page.

### Layout Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Tagline: "Temukan Model AI Terpercaya" · Subtext · CTA: `Lihat Peringkat →` |
| 2 | Top models | Top 5 published models as cards with `RankBadge` + name + score + approval label |
| 3 | How it works | 3-step visual: ① Submit → ② Assess → ③ Publish — with icons and short descriptions |
| 4 | Trust statement | Brief paragraph about methodology and Indonesian compliance context |

**Desktop:** Full-width hero → card grid → horizontal 3-step → text section.
**Mobile:** Stacked vertically. Top models as horizontal scroll or vertical stack.

### Key Components

`Button` · `Card` · `RankBadge` · `StatusBadge`

### User Actions

| Action | Trigger | Destination |
|--------|---------|-------------|
| Click "Lihat Peringkat →" | Hero CTA | `/ranking` |
| Click top model card | Card click | `/models/[id]/public` |

### Validation Rules

None — read-only.

### State Variants

| State | Behavior |
|-------|----------|
| **Loading** | Skeleton hero text + 5 skeleton cards |
| **No published models** | Top models section hidden. Hero remains with CTA disabled or hidden. |
| **Error** | Generic error banner with Retry |

### Notes for Frontend Developer

- Top models: `GET /api/ranking?limit=5&sort=score_desc`.
- Hero section should have a subtle gradient background or illustration to feel premium.
- "How it works" icons: use Lucide `Upload`, `ShieldCheck`, `Globe` (or similar).
- SEO: `<title>` = "AI Sandbox — Temukan Model AI Terpercaya" · `<meta description>` = trust statement text.
- Lazy-load the "How it works" and trust statement sections.
- Page should feel **editorial and trustworthy** — not like a developer tool.

---

## Cross-Screen Reference: Permission Matrix

| Page | Model Owner | Admin / Reviewer | Builder | Public |
|------|:-----------:|:----------------:|:-------:|:------:|
| Dashboard | — | ✓ | — | — |
| My Models | ✓ (own) | ✓ (all) | — | — |
| Add Model | ✓ | ✓ | — | — |
| Model Detail | ✓ R (own) | ✓ RW | — | — |
| Benchmark Run | ✓ (own) | ✓ | — | — |
| Review Queue | — | ✓ | — | — |
| Review Detail | — | ✓ | — | — |
| Ranking | — | ✓ | ✓ | ✓ |
| Model Comparison | — | ✓ | ✓ | — |
| Public Profile | — | — | ✓ | ✓ |
| Landing / Home | — | — | — | ✓ |

`R` = read · `RW` = read + write · `✓` = full access · `—` = no access (show Access Denied)

---

## Cross-Screen Reference: API Dependency Summary

| Screen | Primary API | Polling |
|--------|-------------|---------|
| Dashboard | `GET /api/models`, `GET /api/reviews`, `GET /api/health` | Reviews count: 30 s |
| My Models | `GET /api/models` | — |
| Add Model | `POST /api/models`, `POST /api/models/:id/validate` | Validation: 3 s |
| Model Detail | `GET /api/models/:id`, `GET /api/models/:id/runs` | — |
| Benchmark Run | `GET /api/models/:id/runs/:runId`, `GET …/evidence` | Run status: 5 s |
| Review Queue | `GET /api/reviews` | — |
| Review Detail | `GET /api/reviews/:id`, `POST …/decision`, `POST …/publication` | — |
| Ranking | `GET /api/ranking` | — |
| Comparison | `GET /api/ranking/compare?ids=` | — |
| Public Profile | `GET /api/models/:id/public` | — |
| Landing | `GET /api/ranking?limit=5` | — |
