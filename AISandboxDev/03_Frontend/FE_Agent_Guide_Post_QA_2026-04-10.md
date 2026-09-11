# FE Agent Guide Post-QA 2026-04-10

This guide is the current handoff for the next `FE Agent` pass after the first end-to-end QA validation.

Use this guide together with:

- `D:\Work\PAM\SecurityAI\AISandboxDev\03_Frontend\FE_Work_Note_Polling_Lifecycle_2026-04-10.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\03_Frontend\FE_Agent_Work_Documentation_2026-04-02.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\QA_Findings_Update_2026-04-10.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Integration_Status_Update_2026-04-10.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\FE_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\AGENT_BRIDGE_GUIDE_2026-03-11.md`

## 1. Current Product Truth

The current `AI Sandbox` frontend is no longer fixture-first for lifecycle.

What is already working:

- benchmark wizard submits backend run requests
- optimistic queued state is shown immediately
- polling runs every `2 seconds`
- model detail page is API-first for lifecycle
- run detail page uses the same lifecycle source
- fixture data is fallback-only when backend is unavailable
- existing result-review UX remains intact:
  - table-first review
  - category filters
  - `Fail Only`
  - prompt and response modal
  - findings accordion

What this means:

- do not redesign the sandbox flow from scratch
- do not replace current lifecycle polling
- do not disturb the working result-review baseline

## 2. What QA Found

QA validated the local MVP and found two FE-facing issues:

### Issue A - Unrealistic duration estimate

Observed:

- UI shows approximately `135+ minutes`

Actual local MVP behavior:

- current local benchmark simulation finishes in seconds

Likely source:

- hardcoded values in:
  - `src/lib/modules.ts`

### Issue B - Queued-to-running UI desync

Observed:

- wizard can stay visually on `Step 1/4: Masuk antrean`
- UI can still show `queued`
- backend progress may already be advancing

Likely source:

- wizard step logic still relies too heavily on `run.status`
- current progress object is not being used strongly enough to move the visible state into running mode

## 3. Immediate FE Mission

Refine the frontend so the benchmark experience feels trustworthy during the current local MVP.

The next FE pass should focus on:

1. fix the queued-to-running step progression
2. fix unrealistic duration messaging
3. preserve everything else that is already working

## 4. Working Boundaries

You should work primarily in:

- `D:\Work\PAM\SecurityAI\AISandboxDev\03_Frontend`

Likely focus files:

- `src/components/run/BenchmarkWizard.tsx`
- `src/lib/modules.ts`
- `src/app/[locale]/(internal)/models/[id]/page.tsx` only if consistency adjustments are required

Avoid broad changes to:

- result table UX
- prompt and response modal
- category filter behavior
- route structure
- unrelated styling refactors

## 5. Detailed Tasks

### Task 1 - Fix queued-to-running progression in the wizard

Goal:

- once backend progress is meaningfully active, the wizard should no longer look stuck in queue

Implementation direction:

- inspect step computation in `BenchmarkWizard.tsx`
- review how `run.status`, `model.status`, and `progress.completed` interact
- allow active progress to move the wizard into running state even if `run.status` briefly still shows `queued`

Suggested approach:

- if `progress.completed > 0` or `current_task` is active, treat the run as visually running
- preserve terminal-state handling exactly as it works today

Acceptance criteria:

- UI does not remain visually stuck on `Masuk antrean` while progress is already increasing
- no regression to polling logic
- no regression to completed-state rendering

### Task 2 - Update duration estimates for local MVP reality

Goal:

- the user-facing estimate should be credible for the current environment

Implementation direction:

- inspect `src/lib/modules.ts`
- reduce `estimatedMinutes` values to match current bridge-phase local execution
- use local MVP-safe estimates, not future production worst-case assumptions

Acceptance criteria:

- duration shown to the user is no longer misleading
- estimates remain consistent across module selection summary views

### Task 3 - Preserve current API-first behavior

Goal:

- do not regress the integration work already completed

Checks:

- model detail remains API-first
- run detail remains API-first
- fixture fallback remains explicit only when backend is unavailable
- polling still stops correctly on terminal state

## 6. Suggested Testing Checklist

After changes, validate:

1. submit a benchmark run
2. see optimistic queued state
3. see transition into running state without manual refresh
4. see progress increase while the wizard is on a running step, not queue step
5. see completed state render correctly
6. confirm result-review page still behaves correctly
7. confirm displayed duration is credible for local MVP

## 7. Definition of Done

This FE pass is done when:

- the queued-to-running visual desync is resolved
- duration estimates are updated to current MVP reality
- lifecycle polling still works
- API-first lifecycle handling stays intact
- existing result-review UX does not regress

## 8. Output Required From FE Agent

When finished, report:

- files changed
- exact logic used to decide queue vs running visual state
- how `estimatedMinutes` was revised
- how you tested the wizard and lifecycle
- any backend mismatch still observed

## 9. Recommended Short Prompt

Use this if you want a compact assignment:

`You are the FE Agent for AI Sandbox. Keep the current API-first lifecycle flow and existing review UX intact. Your next job is to fix the benchmark wizard so it does not remain visually stuck in queued state when backend progress is already active, and update the hardcoded duration estimates in src/lib/modules.ts so they reflect current local MVP reality instead of future worst-case timings. Focus on BenchmarkWizard.tsx and modules.ts. Do not broad-refactor the frontend.`
