# FE Work Note - API Polling Lifecycle (2026-04-10)

## Summary
Implemented API-backed benchmark lifecycle handling for queued -> running -> completed states, while preserving existing review UX baseline.

## Files Changed
- `src/components/run/BenchmarkWizard.tsx`
- `src/app/[locale]/(internal)/models/[id]/runs/[runId]/page.tsx`

## Polling Strategy
- Trigger point: user clicks `Jalankan Benchmark` in `BenchmarkWizard`.
- Immediate local update:
  - UI switches to running step.
  - local progress shows queued state immediately (`10%`, label antrean).
- API submission:
  - `POST /api/models/:model_id/runs`
- Polling endpoints every `2s`:
  - `GET /api/models/:model_id`
  - `GET /api/models/:model_id/runs`
- Active tracking source:
  - run status from run list for the created `runId`.
  - model status from model endpoint.

## Stop Conditions
Polling is stopped when either condition is true:
1. run reaches terminal state:
   - `completed_success`
   - `completed_failed`
   - `failed`
2. model reaches terminal state:
   - `assessment_completed`
   - `run_failed`

Additionally:
- interval cleanup on component unmount.
- interval cleanup on rerun/reset action.
- no duplicate polling loops (existing interval cleared before new one starts).

## Completed-State Result Rendering
After terminal success:
- fetch result via `GET /api/models/:model_id/runs/:run_id/results`
- normalize payload to FE `BenchmarkResult` shape
- render completed summary and grade in wizard step 4
- route to run detail remains intact (`onComplete(runId)`).

Run detail page (`runs/[runId]/page.tsx`) now:
- attempts API-backed fetch for model + runs
- polls every 2s while active
- supports backend statuses (`completed_success`, `completed_failed`)
- normalizes backend progress payload (`completed/total/current_task`) into existing progress UI
- loads backend result when terminal, with fixture fallback for resilience

## Existing UX Preserved
Kept intact:
- table-first review baseline
- category filter tabs
- `Fail Only` filter
- prompt/response modal
- findings accordion
- route behavior

## Testing Performed
- `npm run lint` passed after changes.
- Backend API integration test from this environment was blocked because backend at `localhost:8000` was unreachable during execution.

## Blockers / Assumptions
- Assumes backend contract from `06_Backend`:
  - run statuses include `queued`, `in_progress`, `completed_success`, `completed_failed`
  - model statuses include `run_queued`, `run_in_progress`, `assessment_completed`, `run_failed`
  - run result endpoint returns benchmark payload compatible with normalization fallback.
- Runtime verification against real backend requires backend process running on port `8000`.
