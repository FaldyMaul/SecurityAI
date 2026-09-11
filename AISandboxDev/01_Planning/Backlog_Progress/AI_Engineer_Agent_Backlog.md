# AI Engineer Agent Backlog

Last updated: 2026-04-13

## 1. Agent Scope

Primary ownership:

- benchmark engine integration
- security tool integration direction
- localization of benchmark assets
- evidence quality at the evaluation layer
- executor replacement from mock benchmark flow to real worker-backed execution

## 2. Quarter Focus

## Q2 2026

- stabilize Moonshot-backed baseline modules for the sandbox MVP

## Q3 2026

- deliver Indonesia-specific benchmark assets and first-wave adversarial expansion

## Q4 2026

- deepen truthfulness and reassessment support without destabilizing the sandbox baseline

## 2A. Progress Checklist

- `[x]` local benchmark runner integrated into sandbox execution flow
- `[x]` local Moonshot dataset copied and adapted for MVP execution
- `[x]` progress callback integration delivered for FE polling
- `[x]` AI Engine payload now returns non-zero benchmark output for current simulation path
- `[x]` zero-score collapse bug investigated and fixed in the current evaluator
- `[x]` current simulated scoring path is now validated for local MVP pipeline testing
- `[~]` current scoring remains simulated for MVP validation, not real LiteLLM inference
- `[ ]` `ARQ` + `Redis` queue hardening still pending as future infrastructure work
- `[ ]` Indonesia-specific benchmark expansion still pending
- `[ ]` adversarial expansion path beyond current MVP module still pending

## 3. Detailed Backlog

## Epic AI-1 - Moonshot Foundation

Goal:

- make `Moonshot` the reliable benchmark base for the sandbox

### Story AI-1.1

Title:

- finalize current benchmark package design

Tasks:

- confirm the first real execution target is `Moonshot`
- define the execution boundary between backend API and worker process
- document what inputs the worker receives from the backend run record
- document what outputs the worker must persist back into `BenchmarkResult`

### Story AI-1.2

Title:

- align recipe categories with sandbox review and reporting needs

Tasks:

- align recipe and verdict outputs with frontend review tables
- ensure result shape supports prompt, response, verdict, findings, and analysis fields
- confirm category mapping supports prompt injection, privacy, unsupported claims, and harmful content

### Story AI-1.3

Title:

- define evidence expectations per recipe output

Tasks:

- define minimum reliable output for each recipe:
  - score or verdict
  - findings
  - prompt or sample input
  - response or sample output
  - explanation or analysis text
- define how failed or partial benchmark jobs should still return reviewable evidence

### Story AI-1.4

Title:

- replace mock executor with queued Moonshot execution

Tasks:

- remove the current `asyncio.sleep`-based mock executor path from active execution design
- implement real worker-backed execution using `ARQ` plus `Redis`
- use the Docker Redis service as the near-term queue baseline
- preserve current backend hooks for state transitions where possible
- emit intermediate progress updates back to the database for frontend polling
- parse Moonshot output JSON into the normalized `BenchmarkResult` schema
- keep fallback logging for worker failures, timeouts, and partial result cases

Definition of done:

- run execution is no longer driven by mock delay logic
- a queued worker executes benchmark jobs asynchronously
- progress metadata is persisted for frontend polling
- Moonshot output is visible in backend result records

Status:

- partially complete for MVP on `2026-04-13`

Note:

- the AI Engine now supports local MVP execution through native background execution plus simulated scoring
- queue hardening and real model inference remain later phases

## Epic AI-2 - Indonesia-Specific Benchmarking

Goal:

- turn documented localization direction into operational benchmark assets

### Story AI-2.1

Title:

- prioritize Indonesia-specific recipe packs for SARA, privacy, and local language

### Story AI-2.2

Title:

- define localized dataset sourcing and review workflow

### Story AI-2.3

Title:

- define Indonesian localized benchmark library plan

## Epic AI-3 - Advanced Testing Expansion Path

Goal:

- prepare the next security integration layer after the current benchmark foundation

### Story AI-3.1

Title:

- define near-term role of `Garak` in offensive security testing

### Story AI-3.2

Title:

- define later role of `PyRIT` in red-team evaluation

### Story AI-3.3

Title:

- define later role of `LLM Guard`, `Llama Guard`, and other module-level controls in benchmark evidence

## Epic AI-4 - Test Module Maturity

Goal:

- make module coverage practical, not only conceptual

### Story AI-4.1

Title:

- operationalize baseline modules for prompt injection, privacy, unsupported claims, and harmful content

### Story AI-4.2

Title:

- research harmful and unsafe-content module using `Llama Guard`

### Story AI-4.3

Title:

- define reassessment-ready module packs for later quarters

## 4. Dependencies

- BE result schema
- BE queue handoff contract and state transitions
- FE review expectations
- PM category and standards terminology
- QA evidence validation rules

## 5. AI Engineer Priority Order

1. Moonshot foundation
2. executor replacement with ARQ plus Redis
3. baseline module maturity
4. Indonesia-specific benchmark assets
5. adversarial expansion path

## 6. Prompt for AI Engineer Agent

Use this prompt when assigning work:

`You are the AI Engineer Agent for AI Sandbox. Keep Moonshot as the benchmark foundation and make the module outputs reliable enough for product review, history, and reporting. Your immediate Q2 job is to replace the current mock executor with real queued execution using ARQ plus Redis while preserving the backend run-state contract and persisting progress for frontend polling. Prioritize baseline modules first: prompt injection, privacy, unsupported claims, and harmful content. Then expand into Indonesian benchmark packs and Garak-based adversarial testing. Do not overload the MVP with too many tools; optimize for evidence quality, repeatability, and compatibility with our own sandbox workflow.`
