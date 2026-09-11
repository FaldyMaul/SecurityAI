# AI Sandbox Master Backlog Plan 2026

Last updated: 2026-04-13

This document is the master delivery backlog for `AI Sandbox` after the Q1 2026 baseline.

It is the main execution reference for:

- scope
- priorities
- quarter sequencing
- dependencies
- agent ownership

## 1. Planning Baseline

Already completed or materially advanced in Q1:

- product split clarified
- `LiteLLM` and `Moonshot` established as the current technical baseline
- internal review UX improved with table-first result inspection
- prompt and response detail modal implemented in frontend
- Cloudflare Pages publishing path validated
- Indonesia-specific benchmark and security direction documented
- roadmap and architecture language aligned toward internal assurance, not automatic certification

This backlog starts after that baseline.

## 1A. Backend Alignment Update on 2026-04-10

New implementation reality from `BE Agent`:

- Phase 1 backend foundation is complete on `Python 3.11` with async SQLAlchemy enabled
- core model and run endpoints are working as the active integration baseline
- a mock benchmark executor now exists in `06_Backend/app/api/runs.py`
- the current mock lifecycle is:
  - create run as `run_queued`
  - set model status to `run_queued`
  - transition to `run_in_progress`
  - seed a mock `BenchmarkResult`
  - finish as `completed_success`
  - set model status to `assessment_completed`

This changes the near-term delivery priority:

- `FE Agent` must now implement API-backed polling for queued and running states
- `AI Engineer Agent` must now replace mock delay execution with a real worker and benchmark executor
- `PM Agent` must treat the mock-to-real execution bridge as an explicit Q2 blocker-management track

## 1B. Frontend Alignment Update on 2026-04-10

New implementation reality from `FE Agent`:

- API-backed lifecycle polling is now implemented
- model detail page has been migrated from fixture-first to API-first lifecycle handling
- run detail page now uses the same lifecycle mapping as model detail
- fixture data is now fallback-only when backend is unavailable, with explicit notice
- existing review UX baseline was preserved:
  - table-first review
  - category filters
  - `Fail Only`
  - prompt and response modal
  - findings accordion

This changes the next priority:

- `FE Agent` no longer needs core polling implementation as the main blocker
- `AI Engineer Agent` queue-backed real benchmark execution is now the primary technical blocker
- `QA Agent` can now validate lifecycle UX as soon as backend is reachable in test environment
- `PM Agent` should communicate that frontend lifecycle integration is ahead of real executor integration

## 1C. Execution Progress Update on 2026-04-13

Validated agent progress since the original bridge plan:

- `[x]` FE lifecycle polling implemented
- `[x]` model detail migrated to API-first lifecycle handling
- `[x]` run detail aligned to the same lifecycle mapping
- `[x]` queued-to-running wizard desync fixed
- `[x]` unrealistic local MVP duration estimate fixed
- `[x]` backend native `BackgroundTasks` execution stabilized for local MVP
- `[x]` SQLite `WAL` enabled to reduce local lock contention
- `[x]` backend score contract aligned to the 4-key FE module score shape
- `[x]` AI Engine zero-score collapse bug fixed for the current simulated scoring path
- `[x]` QA rerun after score and metadata fixes passed
- `[x]` date persistence is now aligned between backend metadata and frontend rendering
- `[x]` `/models/new` now saves through backend API from the frontend
- `[x]` `/models` now reads live backend data with explicit fixture fallback only when API is unavailable
- `[x]` QA Phase 2 validation confirms manual model creation, fallback warning behavior, and backend recovery behavior
- `[ ]` real LiteLLM-backed inference is still not part of the current MVP execution path
- `[ ]` `ARQ` + `Redis` remains the intended hardening architecture, not the current local execution requirement

## 2. Current Delivery Principle

The delivery principle for `AI Sandbox` is:

- build our own sandbox workflow and review UI
- integrate benchmark and control tools behind the product
- avoid replacing the product surface with tool-native UI

That means:

- `LiteLLM` is the control layer
- `Moonshot` is the benchmark engine
- `AI Sandbox` is our own product workflow and review layer

## 3. Main Goal by Quarter

## Q2 2026 Main Goal

Complete the internal MVP workflow from model intake to review gate using our own sandbox UI and backend orchestration.

## Q3 2026 Main Goal

Deepen trust coverage with stronger evidence, localized benchmark packs, and first-wave adversarial expansion.

## Q4 2026 Main Goal

Harden the sandbox into a more reliable internal assurance platform with stronger reporting, reassessment, and downstream-ready outputs.

## Q1 2027 Main Goal

Mature the sandbox into a localization-aware and policy-grounded assurance platform with broader advanced-testing readiness.

## 4. Quarterly Time Plan

## Q2 2026

Theme:

- complete the `AI Sandbox` MVP workflow

Primary outcomes:

- stable model registration and endpoint validation
- background benchmark execution, first with mock lifecycle and then with real queued execution
- recipe-level result review
- benchmark history and version comparison
- review gate and promotion eligibility
- reduced fixture dependence through clearer backend contracts
- visible `LiteLLM` guardrail context in run evidence
- FE polling across queued, running, and completed states without hard refresh
- shared lifecycle mapping across model detail and run detail pages
- live model create and model-list behavior validated with fallback and recovery handling

## Q3 2026

Theme:

- deepen trust workflow and localized evidence

Primary outcomes:

- stronger backend integration for benchmark results
- richer findings and internal reporting
- first-wave adversarial expansion through `Garak`
- stronger reviewer workflow and standards mapping
- Indonesian benchmark library expansion

## Q4 2026

Theme:

- harden operations and downstream-ready assurance output

Primary outcomes:

- stable trusted summary output
- cleaner handoff to downstream systems
- stronger reassessment cadence
- artifact retention and audit support
- operational hardening and cost visibility

## Q1 2027

Theme:

- mature localization and advanced assurance depth

Primary outcomes:

- deeper local assessment coverage
- broader advanced red-team readiness
- stronger long-term analytics and workflow resilience

## 5. Monthly Time Plan for Q2 2026

## April 2026

Focus:

- stabilize planning, architecture, and execution ownership

Must-have outcomes:

- updated roadmap and backlog package
- category split clarified:
  - `Governance`
  - `Reporting & Certification`
  - `Advanced Red Team`
  - `AI Sandbox Development`
  - `Test Modules`
- current FE baseline folded into execution planning

## May 2026

Focus:

- finish the internal workflow backbone

Must-have outcomes:

- model registration and endpoint validation flow hardened
- benchmark execution flow stable across mock lifecycle and queue-ready architecture
- review queue and decision flow stable
- first operational modules defined and testable
- FE polling and progress-state rendering integrated against backend APIs
- ARQ plus Redis scoping ready for AI executor replacement of mock delay logic
- model detail lifecycle migrated to API-first with fixture fallback only

## June 2026

Focus:

- reduce prototype gaps

Must-have outcomes:

- benchmark result data model aligned between frontend and backend
- fixture dependence reduced
- reviewer evidence flow improved
- run history and comparison baseline working
- Q2 readiness review completed

## 6. Program Epics

## Epic A - AI Sandbox Core Workflow

Goal:

- complete the internal model-owner journey from registration to review gate

Primary agents:

- `FE Agent`
- `BE Agent`
- `UIUX Agent`
- `QA Agent`

## Epic B - Benchmark Execution and Test Modules

Goal:

- make benchmark execution and module coverage reliable and extensible

Primary agents:

- `BE Agent`
- `AI Engineer Agent`
- `QA Agent`

Q2 execution note:

- keep the current BE mock executor as the bridge baseline until `AI Engineer Agent` replaces it with ARQ plus Redis and real Moonshot execution

## Epic C - Governance and Reporting

Goal:

- make sandbox decisions traceable, reviewable, and internally defensible

Primary agents:

- `Product Manager Agent`
- `BE Agent`
- `QA Agent`
- `UIUX Agent`

## Epic D - Advanced Red Team Expansion

Goal:

- add adversarial expansion without destabilizing the MVP

Primary agents:

- `AI Engineer Agent`
- `BE Agent`
- `QA Agent`

## Epic E - Frontend Delivery and Runtime Stability

Goal:

- keep the internal frontend stable, reviewable, and deployable

Primary agents:

- `FE Agent`
- `UIUX Agent`
- `Publisher Agent`

## 7. Dependency Order

Recommended dependency sequence:

1. planning and state definitions
2. backend contract for runs, results, history, and decisions
3. frontend polling and workflow completion in our own product UI
4. QA validation of API-backed lifecycle UX
5. replace mock benchmark execution with real queued benchmark execution
6. localized benchmark expansion
7. deployability and publishing confidence
8. advanced red-team expansion

## 8. Current Priority Order

Priority 1:

- review gate and promotion eligibility
- benchmark history and comparison
- backend and frontend result contract alignment
- our own intake, validation, and review workflow
- FE polling for `run_queued`, `run_in_progress`, and `assessment_completed`
- keep `/models` and `/models/new` on live API behavior with fixture fallback only as recovery mode

Priority 2:

- reviewer workflow state design
- decision-state persistence and guard rules
- history and comparison API and UI baseline
- promotion-ready summary contract for downstream use
- AI executor bridge from mock delay flow to ARQ plus Redis queue execution
- QA smoke validation of API-first lifecycle against reachable backend
- QA validation of score integrity and FE-safe score rendering after AI and BE fixes

Priority 1 status note:

- the local MVP validation phase is now complete
- the next active priority is choosing and starting the next product phase, not continuing the same defect-fix loop

Priority 2:

- stronger evidence and internal reporting
- reduced fixture-only behavior
- localized benchmark-pack expansion
- operational deployment stability

Priority 3:

- advanced testing tools
- downstream summary APIs
- broader governance workflow depth

## 9. Agent Ownership Summary

| Area | Primary Agent | Supporting Agents |
|---|---|---|
| AI Sandbox Development | `FE Agent`, `BE Agent` | `UIUX Agent`, `QA Agent`, `Publisher Agent` |
| Test Modules | `AI Engineer Agent` | `BE Agent`, `QA Agent` |
| Governance | `Product Manager Agent` | `BE Agent`, `UIUX Agent`, `QA Agent` |
| Reporting & Certification | `Product Manager Agent`, `QA Agent` | `FE Agent`, `BE Agent` |
| Advanced Red Team | `AI Engineer Agent` | `BE Agent`, `QA Agent` |

## 10. Definition of Success

This backlog should be treated as successful when:

- a model can move from registration to validated benchmark run
- benchmark evidence can be reviewed clearly in our own sandbox
- history and comparison are available for reassessment
- a reviewer can make a structured promotion-eligibility decision
- localized benchmark growth is underway without destabilizing the MVP
- the sandbox is credible as an internal assurance platform, not just a prototype

## 11. Program Checklist

- `[x]` internal sandbox review UX baseline established
- `[x]` backend API foundation established
- `[x]` frontend lifecycle polling established
- `[x]` native local benchmark execution path established
- `[x]` local score contract aligned with FE expectations
- `[x]` score integrity retest passed
- `[x]` date persistence retest passed
- `[ ]` benchmark history and comparison maturity still pending
- `[ ]` reviewer decision workflow maturity still pending
- `[ ]` localized benchmark expansion still pending
- `[ ]` downstream-safe trusted summary still pending
