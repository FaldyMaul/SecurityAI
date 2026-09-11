# Prompt For AI Engineer Agent 2026-04-10

Use this prompt when assigning the next AI Engineer task.

```md
CRITICAL: Before you begin planning or using any tools, you MUST reply with exactly:
Scope acknowledged.

Do not write code yet. Do not use tools yet.

You are the AI Engineer Agent for AI Sandbox.

Read these docs first after you acknowledge scope:
- `D:\Work\PAM\SecurityAI\AISandboxDev\07_AIEngine\AI_Engineer_Execution_Brief_2026-04-10.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\07_AIEngine\FollowUp_For_AIEngine_from_BE.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\06_Backend\AIEngine_Backend_Integration_Boundary_2026-04-10.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Integration_Status_Update_2026-04-10.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Engineer_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\BE_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\AGENT_BRIDGE_GUIDE_2026-03-11.md`

Code areas you may work in:
- `D:\Work\PAM\SecurityAI\AISandboxDev\07_AIEngine`
- `D:\Work\PAM\SecurityAI\AISandboxDev\06_Backend`

Local benchmark reference source:
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot`
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-data`
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-ui`

Context:
- We are building `AI Sandbox` as our own internal product.
- `LiteLLM` is the control layer.
- `Moonshot` is the benchmark foundation.
- FE polling is already implemented and API-first.
- The current backend benchmark executor is still mock-driven inside `06_Backend/app/api/runs.py`.
- The next critical task is to replace mock execution with real queued execution.
- For local MVP verification, backend may currently run the executor through FastAPI `BackgroundTasks` instead of active `ARQ` worker runtime.

Your mission:
Replace the current mock executor with real queued benchmark execution using:
- `ARQ`
- `Redis`
- `Moonshot`

Implementation expectations:
1. Preserve the current backend lifecycle meaning as much as possible.
2. Use a worker queue instead of long-running benchmark logic inside the API request path.
3. Periodically persist progress updates into the run record so FE polling can observe real progress.
4. Parse real Moonshot output into the backend `BenchmarkResult` schema.
5. For MVP, copy or adapt only the minimum useful benchmark modules first from the local Moonshot install.
6. Do not attempt full Moonshot platform parity.
7. Keep the local runnable `BackgroundTasks` path working unless you replace it with an equally runnable local alternative.
8. Avoid unrelated backend refactors outside the executor boundary unless clearly necessary and documented.

Immediate file to inspect first:
- `D:\Work\PAM\SecurityAI\AISandboxDev\06_Backend\app\api\runs.py`

Do not code yet. Do not use tools yet. Only acknowledge scope first.
```

After the agent replies `Scope acknowledged.`, send this:

```md
Proceed.

Start by reading:
- `D:\Work\PAM\SecurityAI\AISandboxDev\06_Backend\app\api\runs.py`
- `D:\Work\PAM\SecurityAI\AISandboxDev\06_Backend\docker-compose.yml`

Then inspect the local Moonshot benchmarking references in:
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot`
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-data`

Implement the smallest reliable MVP path:
- enqueue benchmark jobs through `ARQ`
- use `Redis` as the queue backend
- execute real Moonshot-backed benchmark logic in the worker
- persist progress updates for FE polling
- persist normalized final output into `BenchmarkResult`

Keep the scope focused on executor replacement and result persistence.

When done, report:
- files changed in `07_AIEngine`
- files changed in `06_Backend`
- how queue execution works
- what Moonshot code or modules were copied or adapted
- what progress shape is persisted
- what final result shape is persisted
- what is still mocked, if anything
- what must be running locally for end-to-end validation
```
