# QA Agent Backlog

Last updated: 2026-04-13

## 1. Agent Scope

Primary ownership:

- acceptance criteria
- workflow validation
- evidence and security checks
- documentation quality gates

## 2. Quarter Focus

## Q2 2026

- validate the internal workflow end to end and remove ambiguity in state behavior

## Q3 2026

- validate stronger evidence, findings traceability, and localized benchmark expansion

## Q4 2026

- validate operational readiness and trusted-summary correctness

## 2A. Progress Checklist

- `[x]` first end-to-end smoke validation completed
- `[x]` lifecycle polling behavior validated
- `[x]` queued-to-running UX bug identified and handed off
- `[x]` unrealistic duration estimate bug identified and handed off
- `[x]` backend stability and score-contract defects identified and handed off
- `[x]` second rerun completed and exposed score persistence, `NaN`, and fallback-desync issues
- `[x]` latest QA rerun after AI and BE score fixes passed
- `[x]` focused rerun for date rendering passed
- `[x]` model registration and model-list live-data validation passed
- `[x]` fallback and recovery validation for model management passed
- `[ ]` history and comparison validation still pending
- `[ ]` review gate and promotion workflow validation still pending

## 3. Detailed Backlog

## Epic QA-1 - Core Workflow Validation

Goal:

- validate the internal sandbox workflow end to end

### Story QA-1.1

Title:

- test model registration and endpoint validation flow

Status:

- completed on `2026-04-13`

Note:

- QA Phase 2 confirmed:
  - manual-entry model creation persists correctly
  - custom provider and endpoint values render correctly on detail page
  - fixture fallback activates only when backend is intentionally unavailable
  - recovery back to live mode works without manual refresh

### Story QA-1.2

Title:

- test background benchmark execution and status transitions

### Story QA-1.3

Title:

- test review gate decision paths and state transitions

## Epic QA-2 - Results and Evidence Quality

Goal:

- verify recipe-level results are trustworthy and reviewable

### Story QA-2.1

Title:

- validate prompt and response modal behavior with completed runs

### Story QA-2.2

Title:

- validate category filter and fail-only behavior

### Story QA-2.3

Title:

- validate history and version comparison behavior

### Story QA-2.4

Title:

- validate `LiteLLM` guardrail visibility in run evidence

## Epic QA-3 - Security and Assurance Validation

Goal:

- validate security and assurance positioning of the sandbox

### Story QA-3.1

Title:

- verify evidence traceability and audit-trail expectations

### Story QA-3.2

Title:

- verify current benchmark, privacy, and localized-security framing is reflected correctly

### Story QA-3.3

Title:

- verify no current documentation or UI overclaims certification or production approval

## Epic QA-4 - Deployment and Runtime Readiness

Goal:

- validate deployable frontend behavior and environment assumptions

### Story QA-4.1

Title:

- validate Cloudflare Pages build assumptions and documented recovery steps

### Story QA-4.2

Title:

- add smoke-test scenarios for critical internal routes

### Story QA-4.3

Title:

- validate Windows-local development recovery guidance where applicable

## 4. Dependencies

- FE route and component behavior
- BE state and result schema
- PM language and state definitions
- Publisher deployment guidance

## 5. QA Priority Order

1. workflow and state-transition validation
2. results and evidence quality
3. security and assurance checks
4. deployment and runtime validation

## 5A. Note

QA has already been valuable in this phase as the main integration truth source.

Current expectation:

- the bridge-phase QA work is complete
- model-management QA is also complete
- next QA work should move to history, comparison, review gate, and later real-model validation

## 6. Prompt for QA Agent

Use this prompt when assigning work:

`You are the QA Agent for AI Sandbox. Validate the internal workflow end to end: registration, validation, benchmark execution, result review, history, comparison, review gate, and promotion eligibility. Treat evidence quality and state correctness as first-class concerns. Explicitly check that LiteLLM guardrail context is visible in run evidence, that benchmark-complete is not confused with review-approved, and that no UI or docs overclaim certification or production approval.`
