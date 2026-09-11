# BE Agent Backlog

Last updated: 2026-04-13

## 1. Agent Scope

Primary ownership:

- model and run backend contracts
- benchmark orchestration
- reviewer state persistence
- promotion-eligibility state
- artifact and history data model

## 2. Quarter Focus

## Q2 2026

- stabilize core entities, run lifecycle, evidence storage, and decision state
- keep the current mock executor usable as the integration bridge until real queue execution replaces it

## Q3 2026

- deepen findings, reporting, standards mapping support, and adversarial evidence capture

## Q4 2026

- strengthen trusted-summary output and operational hardening

## 2A. Progress Checklist

- `[x]` backend foundation established on `Python 3.11` async stack
- `[x]` model and run APIs active for FE integration
- `[x]` native local `BackgroundTasks` execution path stabilized
- `[x]` early run-creation commit added before background execution
- `[x]` SQLite `WAL` enabled for local read or write stability
- `[x]` worker logging improved for QA visibility
- `[x]` FE-safe 4-key score contract added
- `[x]` complete category result shape added for FE consumption
- `[x]` benchmark metadata now includes completion date fields required by FE
- `[x]` latest QA rerun confirms BE-side bridge defects are resolved for local MVP
- `[x]` model-list and model-create contract now support FE migration off fixtures for current scope
- `[ ]` history and comparison APIs still pending
- `[ ]` review gate and promotion-state maturity still pending

## 3. Detailed Backlog

## Epic BE-1 - Model and Endpoint Core

Goal:

- stabilize the backend contract for sandbox core entities

### Story BE-1.1

Title:

- finalize model registration schema

Status:

- completed for current scope on `2026-04-13`

Note:

- FE is now integrated to live model creation and live model listing
- QA Phase 2 validation confirmed manual-entry persistence and recovery from backend outage without BE follow-up for this scope

### Story BE-1.2

Title:

- finalize endpoint validation status contract

### Story BE-1.3

Title:

- clarify `Apilogy` metadata reference fields versus core endpoint fields

### Story BE-1.4

Title:

- support FE migration of model creation and model listing to live API

Tasks:

- verify `POST /api/models` returns the exact fields FE needs after save
- verify `GET /api/models` returns live `status`, `latestScore`, `latestRunId`, and timestamps consistently
- confirm model list payload is sufficient for `/models` page without fixture-only assumptions
- make small contract adjustments only if FE integration exposes gaps

Definition of done:

- FE can move `/models/new` and `/models` to live API usage without needing fixture-only workarounds
- model list and model detail can rely on the same backend truth

## Epic BE-2 - Benchmark Execution and Results

Goal:

- make benchmark execution and result storage reliable

### Story BE-2.1

Title:

- implement or stabilize background benchmark job orchestration

Tasks:

- define job states
- define worker lifecycle
- define retry and failure behavior
- keep current mock lifecycle explicit:
  - `run_queued`
  - `run_in_progress`
  - `completed_success` or failure state
  - model `assessment_completed`
- keep polling-friendly API behavior stable for FE integration
- prepare the backend handoff contract for AI Engineer replacement with `ARQ` plus `Redis`

Definition of done:

- FE can observe stable lifecycle states through APIs
- AI Engineer has a clear replacement boundary for worker execution

Follow-up note from QA:

- re-check whether `in_progress` is committed early enough for FE to reflect running state cleanly
- investigate intermittent backend instability during native background execution

Status:

- materially advanced and stabilized on `2026-04-13`

Note:

- the original QA lifecycle-stability findings were addressed through `WAL`, explicit commit timing, and improved logs
- latest BE pass also fixed the partial score-contract bug that caused FE `NaN`

### Story BE-2.2

Title:

- define run-result schema for recipe-level outputs

### Story BE-2.3

Title:

- persist prompt, response, verdict, findings, and analysis fields consistently

### Story BE-2.4

Title:

- persist active `LiteLLM` guardrail profile with each run

## Epic BE-3 - History and Comparison

Goal:

- support repeated-run review and comparison

### Story BE-3.1

Title:

- define benchmark history model and retrieval API

### Story BE-3.2

Title:

- define run-to-run comparison response shape

### Story BE-3.3

Title:

- ensure immutable artifact references per run version

## Epic BE-4 - Review Gate and Promotion Eligibility

Goal:

- make reviewer decision and promotion logic explicit

### Story BE-4.1

Title:

- define review-ready and reviewer decision states

### Story BE-4.2

Title:

- define promotion eligibility state and guard rules

### Story BE-4.3

Title:

- expose safe summary shape for downstream consumption

## Epic BE-5 - Reporting and Standards Support

Goal:

- support internal assurance reporting and mapping without overclaiming compliance

### Story BE-5.1

Title:

- support findings register across runs

### Story BE-5.2

Title:

- support standards-tag metadata on findings and reports

### Story BE-5.3

Title:

- support internal report export shape

## 4. Dependencies

- AI Engineer recipe and module expectations
- FE state and rendering needs
- PM decision-state definitions
- QA validation rules

## 5. BE Priority Order

1. benchmark execution and result schema
2. review gate and promotion state
3. history and comparison APIs
4. reporting and standards support
5. downstream-safe summary contract

## 6. Prompt for BE Agent

Use this prompt when assigning work:

`You are the BE Agent for AI Sandbox. Own the backend contract for models, runs, results, history, review decisions, and promotion eligibility. Keep Moonshot as the benchmark engine and LiteLLM as the control-layer metadata source. Prioritize stable run states, normalized result schema, guardrail-profile persistence, history and comparison APIs, and explicit reviewer decision logic. Do not optimize for public consumption first; optimize for internal evidence correctness and reviewability.`
