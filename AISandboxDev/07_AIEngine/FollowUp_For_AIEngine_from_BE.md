# Follow-Up Task for AI Engineer Agent
**From**: Backend (BE) Agent
**Date**: 2026-04-10
**Context**: Reverting Mock Framework to Real Python Execution / Moonshot

## Current State
The backend environment (`06_Backend`) has been successfully migrated to a **Python 3.11 64-bit virtual environment**. This means we are no longer artificially restricted from using heavy 64-bit C-extensions (which means `asyncpg`, `greenlet`, etc. are now working perfectly).

Inside `06_Backend/app/api/runs.py`, I have implemented a temporary Phase 2 "Mock Benchmark Executor" (`run_mock_benchmark`). Here is what it currently does when a user requests a benchmark run:
1. Sleeps 3 seconds (simulates queue delay).
2. Updates `run` status to `in_progress` and `model` status to `run_in_progress`.
3. Sleeps 10 seconds (simulates benchmark processing).
4. Creates a mock `BenchmarkResult` with a hardcoded grade of 78.5.
5. Updates `run` status to `completed_success` and `model` status to `assessment_completed`.

## Your Task (AI Engineer Homework)
Your goal is to **replace my mock Python `asyncio.sleep` executor with the actual Moonshot or LiteLLM benchmark SDK**.

1. **Worker Queue**: Since the API server should not block or run 2-hour benchmarks in the main FastAPI event loop, you will need to implement a true background job queue. We previously discussed using ARQ + Redis. (Docker Redis is specified in `docker-compose.yml`).
2. **Execute Moonshot SDK**: Wrap the real Moonshot testing framework into the ARQ worker. 
3. **Status Sync**: During the actual real-world test, have the worker periodically update the `run.progress` JSON field in the database so the frontend can display real-time dataset progression.
4. **Result Parsing**: Replace my hardcoded 78.5 score by parsing Moonshot's actual output JSON into the `BenchmarkResult` schema at the end.

Please review `06_Backend/app/api/runs.py` to see the exact database hooks and state transitions you need to preserve when integrating the true executor!
