# Backend Alignment Update 2026-04-10

This note aligns planning with the latest `BE Agent` delivery so the next FE and AI Engineer handoffs start from the same implementation reality.

## 1. What Is Now True

- backend foundation is running on `Python 3.11` with async SQLAlchemy
- model and run APIs are active as the current integration baseline
- benchmark execution is currently mocked inside backend
- current run lifecycle is already stateful and API-backed

Current backend state sequence:

1. `POST /api/models/:id/runs` creates a run in `run_queued`
2. model status becomes `run_queued`
3. backend background task moves run to `run_in_progress`
4. backend seeds a mock `BenchmarkResult`
5. run becomes `completed_success`
6. model becomes `assessment_completed`

This means the system is past pure fixture-only planning. The product is now in a bridge phase between mock integrated execution and real benchmark execution.

## 2. What FE Must Do Next

Immediate FE requirement:

- poll the backend after `Run Benchmark`

Required behavior:

- set the UI to queued immediately after submission
- poll:
  - `GET /api/models/:model_id`
  - `GET /api/models/:model_id/runs`
- poll every `2 seconds` while the run is active
- update visible progress and status without hard refresh
- stop polling at terminal state
- show completed benchmark review UI when model reaches `assessment_completed`

Why it matters:

- without polling, the product appears visually stuck in `Draft`
- this blocks end-to-end UX validation even though backend state transitions already work

## 3. What AI Engineer Must Do Next

Immediate AI Engineer requirement:

- replace the mock executor with real queued benchmark execution

Required direction:

- use `ARQ` plus `Redis`
- execute the real `Moonshot` benchmark flow in background
- persist progress updates into the database for FE polling
- map Moonshot output into `BenchmarkResult`
- preserve current run and model lifecycle semantics where possible

Why it matters:

- current executor is useful for lifecycle validation but not for real benchmark evidence
- the next reliability step is queue-backed benchmark execution, not more mock-delay refinement

## 4. Planning Interpretation

For `Q2 2026`, the delivery sequence should now be interpreted as:

1. keep the current backend lifecycle stable
2. let FE finish polling and state rendering against real backend APIs
3. let AI Engineer replace mock execution with `ARQ` plus `Redis` plus `Moonshot`
4. keep BE focused on lifecycle contract stability, result schema, and review-state persistence

This ordering reduces thrash:

- FE can validate lifecycle UX immediately against the current backend
- AI Engineer can replace the execution layer without forcing a total frontend redesign
- PM and QA can evaluate progress against a known transition path

## 5. Backlog Impact

Planning and backlog were updated to reflect:

- FE polling is now a `Q2` must-have task
- mock-to-real executor replacement is now an explicit `Q2` bridge task
- backend mock execution is treated as a valid temporary baseline, not the intended final architecture

## 6. Current Recommendation

Before assigning more UI polish or broader AI module expansion, finish these two bridge items first:

1. `FE Agent`: lifecycle polling and progress rendering
2. `AI Engineer Agent`: queued Moonshot execution with `ARQ` and `Redis`

That is the cleanest path to move from simulated workflow validation into real benchmark-backed product execution.
