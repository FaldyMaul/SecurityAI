# AI Sandbox Implementation Plan

Last updated: 2026-04-02

Important planning note:

- the current April 2 implementation state is treated as part of Q1 2026 closeout progress
- future-quarter planning should use this document as the post-Q1 baseline

This document is the canonical implementation plan for the current phase of the product.

It reflects the April 2026 product reality:

- `AI Sandbox` is the internal workspace for `Model Owner`, `Model Vendor`, and `Admin / Reviewer`
- `ModelHub` is the discovery and leaderboard surface for `Developer` and `Use Case Owner`
- `AgentLab` is a downstream consumer of approved model guidance
- `Apilogy` remains the capability marketplace and metadata source

The current implementation focus is:

- deliver a reliable end-to-end `AI Sandbox` workflow
- prepare trusted outputs for promotion into `ModelHub`
- keep the stack narrow and operationally stable before broader expansion

---

## 1. Implementation Objective

The implementation goal is to deliver a usable internal trust workflow before expanding into full platform breadth.

The first practical outcome should be:

- one working model registration and endpoint validation workflow
- one working benchmark execution workflow
- one working review and promotion-eligibility workflow
- one structured output that can later feed `ModelHub`

This means the implementation order is now:

1. establish model access, guardrail path, and observability
2. establish background benchmark execution with stored artifacts
3. establish scorecard, history, and version comparison
4. establish review gate and promotion eligibility
5. expose approved summaries into `ModelHub`
6. later integrate approved guidance into `AgentLab` and `Apilogy`-linked flows

---

## 2. Current Product Split

## AI Sandbox

Purpose:

- internal intake, validation, testing, scoring, rerun, and review preparation

Primary users:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

Core outputs:

- run history
- raw artifacts
- scorecards
- findings
- reviewer decision
- promotion eligibility

## ModelHub

Purpose:

- developer-facing discovery, comparison, and model selection

Primary users:

- `Developer`
- `Use Case Owner`
- `Product Owner`

Core outputs:

- leaderboard
- model profile
- pricing and documentation context
- trust summary
- security summary
- use case examples

Important rule:

- `ModelHub` consumes approved outputs from the sandbox, but it is not the sandbox itself

---

## 3. Current Starting Point

The current known starting point is:

- internal model target: `Telkom AI`
- base model reference: `Qwen 30B`
- endpoint access layer: `LiteLLM`
- benchmark foundation: `Moonshot`
- frontend prototype with internal routes, result table UX, prompt detail modal, and benchmark fixture coverage
- publisher flow validated through Cloudflare Pages native Git deployment

The current implementation reality also includes:

- benchmark runs are expected to be background-safe
- benchmark history is required
- version comparison is required
- promotion into `ModelHub` must be guarded, not automatic

---

## 4. Delivery Principles

The implementation should follow these principles:

- keep MVP narrow
- keep `AI Sandbox` and `ModelHub` conceptually separate
- use OSS-first components where practical
- preserve raw evidence from the start
- make benchmark execution resilient before making it broad
- make review and promotion gating explicit
- avoid integrating too many benchmark engines too early
- reflect deployment reality, not idealized local-only assumptions

---

## 5. Delivery Phases

## Phase 0: Access, Guardrail, and Observability Foundation

### Goal

Create the technical path required to access models consistently and observe runtime behavior.

### Main deliverables

- working `LiteLLM` deployment or equivalent access path
- endpoint validation path through the standard adapter layer
- basic guardrail and observability alignment
- initial backend and storage setup

### Exit criteria

- target model can be reached through the standard access path
- validation and access logs are visible
- backend can persist model and endpoint metadata

## Phase 1: Sandbox Assessment MVP

### Goal

Deliver the first end-to-end `AI Sandbox` assessment workflow for `Telkom AI`.

### Main deliverables

- model registration flow
- endpoint validation flow
- benchmark package execution flow
- background benchmark handling
- raw artifact storage
- normalized scorecard
- internal run history

### Current evidence of progress

- FE work has already restored the recipe result table
- prompt detail modal is implemented
- category filtering and fail-oriented review support are implemented in the frontend prototype
- fixture-backed completed runs exist for testing result views

### Exit criteria

- a model can be registered and validated
- a background benchmark run completes
- scorecard and detailed recipe results can be reviewed
- history is stored for repeated runs

## Phase 2: Review Gate and Promotion Eligibility

### Goal

Convert benchmark outputs into a reliable internal trust decision.

### Main deliverables

- review queue
- reviewer decision workflow
- promotion eligibility state
- restriction and reassessment handling
- version comparison and audit trail support

### Exit criteria

- reviewers can inspect evidence and history
- high-risk or incomplete results are blocked from promotion
- approved outputs are explicitly marked as eligible for `ModelHub`

## Phase 3: ModelHub MVP

### Goal

Expose approved model summaries to builders without giving them access to sandbox internals.

### Main deliverables

- leaderboard
- model profile
- comparison view
- pricing and documentation placeholders or initial integrations
- trust and security summary from sandbox outputs

### Exit criteria

- builders can discover promoted models
- internal evidence is not leaked to `ModelHub`
- promotion and hiding rules work as intended

## Phase 4: AgentLab and Apilogy Consumption

### Goal

Reuse approved trust signals in downstream product flows.

### Main deliverables

- `AgentLab` model selection guidance
- API shape for trusted model consumption
- optional `Apilogy` enrichment or linkage

### Exit criteria

- downstream products can consume approved model guidance without reading sandbox internals directly

## Phase 5: Expanded Evaluation Layers

### Goal

Expand beyond baseline model benchmarking after the MVP flow is stable.

### Candidate expansions

- `DeepEval` for app, RAG, and agent evaluation
- `PyRIT` for deeper conversational red teaming
- `Garak` for offensive security scanning
- `LLM Guard` for runtime control guidance

---

## 6. Current Progress Summary

## Completed or materially advanced

- March product split clarification between `AI Sandbox` and `ModelHub`
- frontend result review experience improvements
- prompt detail modal and table-based recipe results
- fixture-backed completed run for QA and FE validation
- Cloudflare Pages deployment pivot and successful build-path resolution
- initial aligned documentation for agents and planning

## In progress

- canonical planning refresh
- promotion terminology and workflow consistency across docs
- stronger API and schema alignment beyond fixtures

## Pending

- full API-backed data flow replacing fixture-only views
- stable promotion flow from sandbox into `ModelHub`
- deeper reviewer workflow hardening
- stakeholder-ready `ModelHub` metadata completeness

---

## 7. Immediate Next Steps

These are next-quarter starting priorities from the current Q1 closeout baseline.

1. Finish canonical planning and roadmap refresh.
2. Stabilize benchmark run, history, and comparison behavior in the frontend and API contract.
3. Make promotion-to-`ModelHub` behavior explicit and reliable.
4. Define the minimum `ModelHub` MVP content model: score summary, restrictions, pricing, docs, and use case examples.
5. Keep deployment guidance aligned with Cloudflare Pages native Git flow.
