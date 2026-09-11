# AI Engineer Execution Brief 2026-04-10

This is the active execution brief for the `AI Engineer Agent`.

Use this brief together with:

- `FollowUp_For_AIEngine_from_BE.md`
- `../01_Planning/Integration_Status_Update_2026-04-10.md`
- `../01_Planning/Backlog_Progress/AI_Engineer_Agent_Backlog.md`
- `../06_Backend/AIEngine_Backend_Integration_Boundary_2026-04-10.md`

## 1. Mission

Replace the current mock benchmark executor with real queued benchmark execution for `AI Sandbox`.

The MVP principle is:

- keep our own `AI Sandbox` product workflow
- keep `LiteLLM` as the control layer
- keep `Moonshot` as the benchmark foundation
- copy or adapt only the minimum useful Moonshot modules first

Do not attempt full Moonshot platform parity.

## 2. Working Directories

Primary working directory:

- `D:\Work\PAM\SecurityAI\AISandboxDev\07_AIEngine`

Allowed backend integration directory:

- `D:\Work\PAM\SecurityAI\AISandboxDev\06_Backend`

Local Moonshot reference source:

- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot`
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-data`
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-ui`

## 3. Current System State

What is already true:

- backend APIs are active
- frontend polling is already implemented
- model detail page is API-first
- run detail page uses the same lifecycle mapping
- backend currently creates mock run progress and mock results inside:
  - `06_Backend/app/api/runs.py`

Current backend mock lifecycle:

1. run created as `queued`
2. model status becomes `run_queued`
3. background task sets run to `in_progress`
4. mock progress JSON is updated
5. mock `BenchmarkResult` is created
6. run becomes `completed_success`
7. model becomes `assessment_completed`

This means the frontend is ready for real executor progress as soon as it is persisted into the same lifecycle contract.

## 4. Your Immediate Goal

Replace the mock delay executor with a real worker-backed benchmark executor.

Target stack:

- `ARQ`
- `Redis`
- `Moonshot`

Current local MVP bypass:

- local runnable execution now uses FastAPI `BackgroundTasks`
- the backend directly calls `run_benchmark_task` from `app.worker`
- this bypass exists because Docker and Poetry are not active locally for `Redis` + `ARQ`

Interpretation:

- treat `BackgroundTasks` as the current local verification path
- treat `ARQ` + `Redis` as the intended queue architecture to keep in the design

## 5. Implementation Scope

### In `07_AIEngine`

Own:

- benchmark package definition for MVP
- wrapper around Moonshot execution
- progress interpretation from benchmark run into sandbox-friendly progress updates
- result-to-schema mapping logic
- minimal benchmark module selection for MVP

### In `06_Backend`

Allowed changes:

- queue submission wiring from API to worker
- worker bootstrap or queue entrypoint
- progress persistence updates into run record
- result persistence into `BenchmarkResult`
- minimal contract changes needed to support real execution
- local fallback wiring that keeps execution runnable without Redis when necessary

Avoid unless necessary:

- broad route redesign
- auth changes
- unrelated schema churn
- frontend-oriented status renaming without coordination

## 6. MVP Tooling Direction

For MVP, prefer the smallest reliable execution path:

- use local Moonshot installation as the reference
- start with copied or adapted benchmarking modules only
- keep the first real module set narrow:
  - prompt injection or adversarial baseline
  - privacy baseline
  - unsupported claims or truthfulness baseline
  - harmful content baseline if practical

Do not start with:

- full Moonshot UI integration
- all red-team modules at once
- PyRIT-first architecture
- large multi-tool orchestration before the basic queue works

## 7. Concrete Tasks

### Task A - Inspect and preserve the current lifecycle contract

Read:

- `06_Backend/app/api/runs.py`

Preserve or intentionally document:

- run status transitions
- model status transitions
- progress JSON structure
- final result persistence shape

### Task B - Define queue execution boundary

Implement or document:

- what payload is enqueued from API
- what worker needs to load from DB
- how progress updates are written back
- how worker success and failure states map back into run and model statuses

### Task C - Add `ARQ` + `Redis` worker path

Implement:

- queue enqueue from API path
- worker process entrypoint
- Redis-backed asynchronous execution
- retry or failure-safe behavior appropriate for MVP

Current status:

- partially implemented in code structure
- not currently the local runnable path
- do not break the native `BackgroundTasks` verification path without replacing it with a working runnable alternative

### Task D - Run real Moonshot benchmark logic

Use local reference:

- `moonshot-install`

Approach:

- copy or adapt the minimum module flow needed for MVP
- prefer code paths from Moonshot benchmarking modules over inventing a brand-new evaluator
- keep implementation small enough to maintain

### Task E - Persist real progress and final result

Persist:

- `run.progress`
- current task label
- terminal run status
- normalized benchmark result record

At minimum, final result should support:

- overall score
- grade
- metadata
- category-level summaries

If possible, also preserve review-useful evidence fields that align with existing sandbox UI expectations.

## 8. Definition of Done

This task is done when:

- API no longer depends on mock `asyncio.sleep` flow for benchmark execution
- local runnable execution uses real Moonshot-backed logic
- progress updates are persisted during execution
- final output is parsed into `BenchmarkResult`
- frontend polling can observe real progress and final completion without further contract changes

Queue-hardening completion target:

- benchmark jobs execute through `ARQ` + `Redis` once infrastructure support is available
- progress updates are persisted during execution
- final output is parsed into `BenchmarkResult`
- frontend polling can observe real progress and final completion without further contract changes

## 9. Delivery Notes Required From You

When finished, report:

- files changed in `07_AIEngine`
- files changed in `06_Backend`
- how queue execution works
- what Moonshot code or modules were copied or adapted
- what result shape is now persisted
- what is still mocked, if anything
- what runtime dependencies must be started for end-to-end validation

## 10. Suggested Start Order

1. inspect `06_Backend/app/api/runs.py`
2. inspect `06_Backend/docker-compose.yml`
3. inspect local Moonshot benchmarking modules in `moonshot-install`
4. design the minimal worker payload and result mapping
5. implement queue + worker
6. replace mock executor path
7. validate persistence and progress
