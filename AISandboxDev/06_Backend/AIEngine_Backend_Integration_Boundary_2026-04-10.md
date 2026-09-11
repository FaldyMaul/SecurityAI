# AI Engineer / Backend Integration Boundary 2026-04-10

This document defines the current boundary for `AI Engineer Agent` work inside `06_Backend`.

Purpose:

- let `AI Engineer Agent` move the benchmark executor forward
- protect `BE Agent` ownership of the wider backend contract
- reduce accidental overlap during the mock-to-real executor transition

## 1. Why This Exists

The frontend is already polling live backend lifecycle states.

That means backend behavior is no longer isolated. Changes to run state semantics, result shape, or route behavior will directly affect:

- `FE Agent`
- `QA Agent`
- `Product Manager Agent`

So the AI Engineer should work inside backend only within a clear integration boundary.

## 2. Current Backend Contract to Preserve

Current implementation entrypoint:

- `app/api/runs.py`

Current lifecycle pattern:

1. run is created
2. run enters queued state
3. model enters `run_queued`
4. run enters in-progress state
5. progress JSON is updated
6. benchmark result is persisted
7. run reaches terminal state
8. model enters `assessment_completed` or failure equivalent

The exact status strings may evolve, but the AI Engineer should preserve the lifecycle meaning and keep FE compatibility in mind.

## 3. AI Engineer Is Allowed To Change

Inside `06_Backend`, the AI Engineer may change:

- benchmark executor implementation
- queue submission wiring
- worker entrypoint wiring
- Redis integration for queued jobs
- run-progress persistence logic
- benchmark-result parsing and persistence logic
- minimal configuration needed for Moonshot execution

## 4. AI Engineer Should Avoid Changing

Avoid broad changes to:

- unrelated API routes
- authentication flow
- review decision model
- promotion eligibility logic
- unrelated schema redesign
- FE-facing response-shape churn beyond what execution requires

If such changes become necessary, document them clearly for the `BE Agent`.

## 5. Preferred Technical Direction

Near-term target:

- `ARQ`
- `Redis`
- `Moonshot`

Current local verification path:

- FastAPI `BackgroundTasks`
- direct call into `app.worker.run_benchmark_task`

Interpretation:

- local MVP execution should stay runnable without Docker or Poetry
- queue isolation through `ARQ` + `Redis` remains the intended hardening path, not the current local requirement

Execution principle:

- enqueue from API
- execute in worker
- persist progress periodically
- persist final normalized result

MVP principle:

- use minimum useful benchmark modules first
- adapt or copy from local Moonshot install where practical
- do not try to mirror the entire Moonshot platform in backend

## 6. Required Coordination Points

If the AI Engineer changes any of the following, document it explicitly:

- run status values
- model status values
- progress JSON shape
- `BenchmarkResult` shape
- worker startup requirements
- backend environment variables

These items directly affect:

- frontend polling and rendering
- QA validation
- planning and backlog tracking

## 7. Recommended File Review Order

1. `app/api/runs.py`
2. `docker-compose.yml`
3. backend database models related to `Run` and `BenchmarkResult`
4. local Moonshot references under:
   - `D:\Work\PAM\SecurityAI\moonshot-install\moonshot`
   - `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-data`

## 8. Success Condition

This integration boundary is successful when:

- AI Engineer can replace mock execution without colliding with BE ownership
- backend route contract remains stable enough for FE polling
- result persistence becomes real and reviewable
- BE can continue owning backend contract quality after the executor is in place
