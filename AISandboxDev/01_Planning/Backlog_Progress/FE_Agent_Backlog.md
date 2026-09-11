# FE Agent Backlog

Last updated: 2026-04-13

## 1. Agent Scope

Primary ownership:

- internal sandbox frontend behavior
- result review UX
- state rendering
- route and component stability
- our own product workflow UI for registration, review, history, and decision support

Already delivered baseline:

- table-first recipe result review
- category filters
- `Fail Only` filter
- prompt and response modal
- findings accordion integration
- copy actions
- `run-009` fixture support for review validation
- API-backed polling for queued and running benchmark lifecycles
- API-first lifecycle handling on model detail page
- shared lifecycle mapping across model detail and run detail pages
- fixture fallback only when backend is unavailable

## 2. Quarter Focus

## Q2 2026

- turn the current review prototype into a complete internal product workflow

## Q3 2026

- strengthen API-backed evidence handling, comparison, and reviewer workflow depth

## Q4 2026

- harden operational states, report views, and trusted-summary readiness

## 2A. Progress Checklist

- `[x]` table-first recipe review baseline preserved
- `[x]` category filters and `Fail Only` filter delivered
- `[x]` prompt and response modal delivered
- `[x]` findings accordion integrated
- `[x]` API-backed polling for lifecycle delivered
- `[x]` model detail page moved to API-first lifecycle handling
- `[x]` run detail page aligned to shared lifecycle mapping
- `[x]` queued-to-running wizard desync fixed
- `[x]` local MVP duration estimate revised
- `[x]` BE and AI score payloads now render cleanly in the validated local MVP flow
- `[x]` `/models` list page migrated to live API data with explicit fallback banner when backend is unavailable
- `[x]` `/models/new` save integrated to backend `POST /api/models`
- `[ ]` run history and comparison depth still pending
- `[ ]` review gate UI maturity still pending

## 3. Detailed Backlog

## Epic FE-1 - Results Review Experience

Goal:

- make recipe-level review fast, understandable, and stable

### Story FE-1.1

Title:

- finalize table-first recipe results workflow

Tasks:

- preserve table-first recipe results as the default review pattern
- preserve category filters and fail-oriented filtering
- confirm empty states are explicit and useful
- confirm row expansion and findings behavior remain stable

Definition of done:

- category filters work
- fail-only state works
- no regression on table-first review behavior

### Story FE-1.2

Title:

- harden prompt and response detail modal

Tasks:

- ensure modal works consistently for completed runs
- handle missing sample data gracefully
- preserve copy actions
- preserve metadata visibility for recipe, method, and dataset

Definition of done:

- modal opens reliably
- partial-data states do not break the page
- prompt and response content remain accessible

### Story FE-1.3

Title:

- improve findings and recommendations readability

Tasks:

- keep findings accordion integration stable
- improve short recommendation readability
- improve loading, empty, and error states for recipe-level views

## Epic FE-2 - AI Sandbox Workflow UI

Goal:

- build our own sandbox workflow UI beyond review-only prototype behavior

### Story FE-2.1

Title:

- implement model registration pages

Tasks:

- create registration form layout
- support model metadata entry
- support endpoint and version fields
- support guardrail-profile display or selection state where required

Status:

- completed for current registration scope on `2026-04-13`

Note:

- UI flow and backend save are now connected for current MVP scope
- future FE work for registration should focus on endpoint validation polish and reviewer-state continuity, not basic save behavior

### Story FE-2.2

Title:

- implement endpoint validation and run submission states

Tasks:

- render endpoint validation states
- render background run states
- distinguish `validated`, `pending`, `running`, `completed`, and `failed`
- align visible states with backend statuses:
  - `run_queued`
  - `run_in_progress`
  - `completed_success`
  - `completed_failed`
  - model-level `assessment_completed`

Definition of done:

- queued and running states render distinctly
- completed state reflects backend response without manual browser refresh

### Story FE-2.3

Title:

- implement polling for run and model lifecycle

Tasks:

- after user clicks `Run Benchmark`, update local UI immediately to reflect queued submission
- poll `GET /api/models/:model_id`
- poll `GET /api/models/:model_id/runs`
- use `setInterval`, React Query `refetchInterval`, or equivalent controlled polling
- poll every `2 seconds` while run state is queued or in progress
- update progress UI and model status from backend responses
- stop polling cleanly once model status becomes `assessment_completed` or run reaches terminal state
- avoid duplicate intervals and memory leaks on route changes or repeated submissions
- confirm polling works against backend on port `8000`, not only fixtures

Definition of done:

- user sees queued state immediately after submission
- progress changes without hard refresh
- polling stops on terminal state
- completed review UI renders the seeded or real benchmark grade returned by backend

Status:

- completed on `2026-04-10`

Follow-up note from QA:

- lifecycle polling works
- wizard step progression still needs refinement when backend progress advances before visible status transition catches up

### Story FE-2.4

Title:

- implement review gate UI states

Tasks:

- render review-ready versus benchmark-complete separately
- render reviewer decision states
- prevent ambiguous `publish` or certification language

### Story FE-2.5

Title:

- fix queued-to-running wizard desync and MVP duration messaging

Tasks:

- update benchmark wizard step logic so active progress can move the UI into running state even if `run.status` briefly still shows `queued`
- review whether `progress.completed > 0` should promote the active step from queue to running
- update `estimatedMinutes` in `src/lib/modules.ts` to reflect realistic local MVP timing
- keep current API-first lifecycle and existing review UX intact

Definition of done:

- UI does not appear stuck in `Masuk antrean` once backend progress is active
- estimated duration is credible for the current local MVP path
- no regression to polling or completed-state rendering

Status:

- completed on `2026-04-13`

Note:

- latest FE work resolved the first QA UX findings
- FE is now mostly in support mode for score-display cleanup only if QA still finds edge cases

### Story FE-2.6

Title:

- connect model creation and model list to live backend data

Tasks:

- wire `/models/new` final `Simpan Model` action to backend `POST /api/models`
- use the existing model-creation hook instead of leaving the button passive
- redirect or refresh predictably after successful save
- migrate `/models` list page from fixture JSON to live API data
- ensure saved models appear in `/models`
- ensure model status and latest run fields reflect backend state, not fixture defaults
- keep fixture fallback only where explicitly intended and clearly labeled

Definition of done:

- user can save a new model from UI
- new model appears in `/models`
- `/models` list reflects live backend status and latest run data
- model list and model detail no longer contradict each other because of fixture-first behavior

Status:

- completed on `2026-04-13`

Note:

- QA Phase 2 validation passed for:
  - manual-entry model creation
  - fallback warning behavior when backend is down
  - automatic recovery back to live mode when backend returns

## Epic FE-3 - Run History and Comparison

Goal:

- make repeated benchmark runs reviewable over time

### Story FE-3.1

Title:

- expose run history clearly in internal model views

### Story FE-3.2

Title:

- implement version comparison UI for run-to-run review

### Story FE-3.3

Title:

- align status rendering across list, detail, and review pages

Tasks:

- keep model detail and run detail using the same lifecycle rules
- keep run badge and history status mapping consistent
- surface fallback-to-fixture state explicitly when backend is unavailable

Status:

- materially advanced on `2026-04-10`

## Epic FE-4 - Runtime and Deployment Stability

Goal:

- reduce local and deployment friction

### Story FE-4.1

Title:

- keep Next.js build and dev-cache handling stable on Windows

### Story FE-4.2

Title:

- preserve Cloudflare-compatible frontend behavior

### Story FE-4.3

Title:

- add smoke-test-ready frontend states for critical routes

## 4. Dependencies

- backend run and result schema
- backend polling endpoints for model and runs
- reviewer state definitions
- promotion-eligibility labels
- Cloudflare deployment constraints

## 5. FE Priority Order

1. AI Sandbox workflow UI
2. run history and comparison
3. queued-to-running lifecycle UX refinement
4. API-first cleanup and data-source transparency
5. result detail hardening
6. runtime and deployment stability

## 6. Prompt for FE Agent

Use this prompt when assigning work:

`You are the FE Agent for AI Sandbox. Work only on the internal sandbox product UI, not tool-native UI. Preserve the existing table-first review baseline. Prioritize registration, validation, benchmark review, history, comparison, reviewer decision states, and API-backed polling for queued and running benchmark lifecycles. After Run Benchmark, update UI locally, then poll /api/models/:model_id and /api/models/:model_id/runs every 2 seconds until the model reaches assessment_completed or the run reaches a terminal state. Keep labels explicit, avoid certification-like wording, and align to the current backend contract. Before changing UI patterns, preserve the existing result review strengths: category filters, fail-only filtering, prompt/response modal, findings accordion, and stable route behavior.`
