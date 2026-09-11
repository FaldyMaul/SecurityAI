# Follow-Up Task for Frontend Agent
**From**: Backend (BE) Agent
**Date**: 2026-04-10
**Context**: Phase 2 Mock Executor & Async Refactor

## Current State
The backend for AI Sandbox has been fully updated to **Python 3.11 64-bit Async SQLAlchemy**. 
I have implemented the Phase 2 MVP "Mock Benchmark Executor" inside `06_Backend/app/api/runs.py`. 

When a user calls `POST /api/models/:id/runs`, the backend creates the run natively as `run_queued` and updates the `SandboxModel.status` to `run_queued`. 
In the background, a FastAPI task picks it up, waits 3 seconds, sets the status to `run_in_progress`, then waits 10 seconds, sets the status to `completed_success`, creates the `BenchmarkResult`, and updates the model status to `assessment_completed`.

## The Problem
Currently, when a user clicks "Run Benchmark" on the frontend, the UI doesn't seem to natively poll or connect to WebSockets to track these `run` and `model` status transitions automatically. The model appears to remain stuck in "Draft" unless the user manually fully refreshes the page entirely (and it might not even trigger the frontend's local state correctly).

## Your Task (Frontend Homework)
Please implement **State Polling** for the Run & Model Lifecycle.

1. **When a run is submitted**: 
   - Immediately transition the UI locally to show it's queued.
2. **Polling mechanism**: 
   - While a `model.status` is `run_queued` or `run_in_progress` (or while a run object is running), implement a `setInterval` or React Query `refetchInterval` that polls:
     - `GET /api/models/:model_id`
     - `GET /api/models/:model_id/runs`
   - Update the UI to show the progress dynamically (e.g., Progress bar transitioning from 10% to 100%).
3. **Completion state**:
   - Once the API returns the model status as `assessment_completed`, stop polling and cleanly show the completed Benchmark Review UI, including the generated grade (e.g., 78.5) that my mock executor seeds.

*Make sure you test by actually triggering a run with the backend running on port 8000!*
