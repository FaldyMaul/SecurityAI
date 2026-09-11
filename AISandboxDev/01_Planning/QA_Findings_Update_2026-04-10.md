# QA Findings Update 2026-04-10

This note summarizes the first end-to-end QA validation after frontend polling and native backend background execution were enabled.

Last updated: 2026-04-13

## 1. Overall Outcome

The local MVP has now passed its bridge-phase validation.

Current interpretation:

- lifecycle polling is working
- local benchmark execution is working
- result persistence is working
- FE-safe score rendering is working
- date persistence is working
- model creation and live model-list behavior are working
- fallback and recovery behavior are working
- the primary MVP defect cluster is resolved

## 2. Historical Findings and Resolution Status

### A. Wait-time estimate is inaccurate

Observed:

- the UI shows approximately `135+ minutes`

Current reality:

- the local MVP simulation completes in seconds

Likely cause:

- hardcoded `estimatedMinutes` values in:
  - `03_Frontend/src/lib/modules.ts`

Impact:

- user confusion
- reduced trust in the benchmark workflow

Resolution status:

- resolved

### B. Lifecycle desync between status and progress

Observed:

- UI can remain on `Step 1/4: Masuk antrean`
- UI can still show `queued`
- backend progress may already be above `0%`

Likely cause:

- frontend step logic still prioritizes `run.status`
- backend progress can update while status transition is not yet reflected in the UI polling cycle

Impact:

- users see the system as stalled even though execution is moving

Resolution status:

- resolved

### C. Backend stability is not fully clean yet

Observed:

- backend is reachable at `http://localhost:8000`
- QA also noted intermittent process instability

Interpretation:

- the local path is usable for MVP validation
- it still needs runtime hardening before we treat it as stable for broader internal use

Resolution status:

- sufficiently resolved for local MVP validation

### D. LiteLLM is not required for current MVP validation

Observed:

- current evaluator still uses simulated model behavior
- local benchmark loop is using dataset iteration plus deterministic scoring logic

Interpretation:

- this is acceptable for the current bridge phase
- we should not tell users they need to configure LiteLLM for current local verification

Resolution status:

- still true; current execution remains simulation-based for scoring, not real LiteLLM inference

### E. Score integrity, NaN rendering, and date persistence

Observed across later reruns:

- `overallScore: 0` was fixed
- `NaN` rendering was fixed
- backend score contract was aligned
- date fallback issue was fixed through metadata completion

Resolution status:

- resolved

## 3. Immediate Owner Mapping

### FE Agent

Next fixes:

- update `estimatedMinutes` in `src/lib/modules.ts` to reflect current MVP reality
- update benchmark wizard step progression so `progress` can move the UI into active-running state even if `status` is still catching up
- keep API-first lifecycle behavior intact

### BE Agent

Next checks:

- confirm `status=\"in_progress\"` is committed as early as possible when task execution starts
- investigate intermittent backend instability during background execution
- confirm terminal failure states are still visible cleanly to FE

### AI Engineer Agent

Current interpretation:

- Moonshot-backed dataset loop is now operational enough for local MVP
- current evaluator still simulates the model response layer

Next concern:

- document clearly that current execution is dataset-real but inference-simulated

### QA Agent

Most recent additional validation:

- manual-entry model creation passed
- backend outage kill test passed
- recovery from fixture mode back to live mode passed

## 4. Priority Recommendation

Priority order after the latest QA pass:

1. mark the local MVP validation phase complete in planning and backlog docs
2. mark the model-management validation phase complete in planning and backlog docs
3. continue deeper product work on history, comparison, review gate, and reporting

## 5. Current Product Truth

The correct product message right now is:

`The AI Sandbox local MVP and model-management phase are now validated end to end for the current simulated execution path. The next phase is no longer bridge defect fixing; it is history, review gate, and promotion-workflow maturity.`
