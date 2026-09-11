# Next Phase Assignment Pack - Benchmark Review and Promotion Workflow 2026-04-13

This document defines the next assignment sequence after model-management validation passed.

## 1. Why This Is The Next Phase

The current local MVP now has three completed layers:

- benchmark lifecycle works end to end
- score and metadata rendering work end to end
- model management works end to end, including fallback and recovery behavior

What is still incomplete from the product point of view:

- repeated benchmark runs are not yet clearly comparable
- reviewer decision states are not yet explicit enough in product behavior
- benchmark completion is still too close to review approval in some planning and UI assumptions
- promotion eligibility is still a backlog concept more than a finished workflow

This makes `Benchmark Review and Promotion Workflow` the next practical product phase.

## 2. Phase Goal

Make completed assessments reviewable, comparable, and decision-ready.

By the end of this phase:

- a reviewer can clearly distinguish `benchmark completed` from `reviewed`
- a model can expose run history in a reliable internal workflow
- comparison-ready baseline behavior exists for repeated runs
- reviewer decisions are stored and displayed explicitly
- promotion eligibility is treated as a guarded internal outcome, not automatic publication

## 3. Assignment Order

1. `BE Agent`
2. `UIUX Agent`
3. `FE Agent`
4. `QA Agent`

Reason:

- backend decision and history contracts are the first hard dependency
- UIUX should define the reviewer-state model and language before FE finalizes screens
- frontend should then build against the clarified contract and state vocabulary
- QA should validate only after contract and UI are aligned

## 4. Scope By Agent

### BE Agent

Primary mission:

- define the first stable reviewer workflow contract
- expose history and comparison-ready data
- persist reviewer decision and promotion-eligibility state

Expected result:

- FE has stable APIs and state fields for history and review-gate rendering

### UIUX Agent

Primary mission:

- define the reviewer journey and internal state language
- separate `assessment completed`, `review ready`, `reviewed`, `restricted`, and `promotion ready`

Expected result:

- FE has a state-and-copy guide that avoids certification-like wording and avoids confusing sandbox with `ModelHub`

### FE Agent

Primary mission:

- surface run history and reviewer decision states
- add first review-gate UI behavior using the new BE contract and UIUX language

Expected result:

- reviewers can see history, current decision state, and next action without route confusion

### QA Agent

Primary mission:

- validate that history, review state, and promotion labels behave correctly

Expected result:

- no confusion between completed benchmark, reviewed state, and downstream eligibility

## 5. First-Step Deliverables

### BE first deliverable

- document or implement the minimal contract for:
  - run history list
  - comparison-ready identifiers or version references
  - reviewer decision state
  - promotion eligibility state
  - reviewer notes or rationale field

### UIUX first deliverable

- produce a reviewer-state matrix covering:
  - benchmark completed
  - review ready
  - approved with controls
  - restricted
  - reassessment required
  - promotion ready

### FE first deliverable

- implement or prepare:
  - history section in model detail
  - explicit reviewer-state badge or panel
  - clear separation between assessment evidence and downstream promotion intent

### QA first deliverable

- validate:
  - history list correctness
  - decision-state correctness
  - promotion language correctness
  - no fallback confusion between sandbox internal review and `ModelHub`

## 6. Success Criteria

This phase is complete when:

- history is visible and useful for repeated runs
- reviewer state is explicit and not overloaded
- promotion eligibility is guarded and understandable
- QA confirms that internal review workflow is understandable and stable
