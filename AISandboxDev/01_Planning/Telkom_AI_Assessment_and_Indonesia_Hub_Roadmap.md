# Telkom AI Assessment and Indonesia ModelHub Roadmap

Last updated: 2026-04-02

Important roadmap note:

- the implementation updates reflected on April 2, 2026 are treated as part of the Q1 closeout baseline
- Q2 roadmap priorities begin after this baseline, not before it

This document defines the current roadmap for the connected product surfaces around:

- `AI Sandbox`
- `ModelHub`
- `AgentLab`
- `Apilogy`

The immediate objective is still to assess internal company models, starting with `Telkom AI`.

The roadmap is now refined so the product surfaces are clearer:

- `AI Sandbox` handles internal testing and trust preparation
- `ModelHub` handles discovery and model selection
- `AgentLab` consumes approved guidance later
- `Apilogy` remains the capability marketplace and source inventory

---

## 1. Product Vision

The long-term platform is not only a benchmark runner. It is a connected trust and decision platform for AI models and later AI-enabled applications.

At a high level, the platform should allow:

- model providers to register and test model endpoints
- internal reviewers to inspect evidence and determine promotion eligibility
- developers and use case owners to discover approved models in `ModelHub`
- downstream platforms such as `AgentLab` to reuse approved guidance

The immediate platform vision should be read as:

- `AI Sandbox` = internal trust preparation layer
- `ModelHub` = developer-facing model selection layer

---

## 2. Current Product Outcome

The current product should answer four practical questions:

1. Is this model safe enough to move forward?
2. What are the main strengths and risks of the model?
3. What findings or controls must be considered before broader use?
4. Is this model eligible to be promoted into `ModelHub`?

For downstream consumers such as developers, the platform should later answer:

1. Which model should I choose?
2. What risks or restrictions should I know?
3. How do models compare by trust, readiness, and business context?

---

## 3. Product Surface Definition

## AI Sandbox

Primary users:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

Main capabilities:

- model registration
- endpoint validation
- benchmark execution
- score generation
- review and rerun
- history and version comparison
- promotion eligibility

## ModelHub

Primary users:

- `Developer`
- `Use Case Owner`
- `Product Owner`

Main capabilities:

- leaderboard
- model profile
- comparison
- pricing and docs context
- real use case examples
- trust and security summaries

## AgentLab

Primary role:

- downstream consumer of approved model guidance

## Apilogy

Primary role:

- capability marketplace and metadata source

---

## 4. Roadmap Phases

## Phase A: Telkom AI Sandbox MVP

Goal:

- deliver the first reliable end-to-end internal assessment workflow

Key outcomes:

- register `Telkom AI`
- validate endpoint path
- run `Moonshot` package
- store artifacts and history
- review results

Current signals of progress:

- frontend result detail experience has materially improved
- UIUX structure has been aligned with the sandbox versus `ModelHub` split
- deployment path for the frontend prototype has been validated via Cloudflare Pages

## Phase B: Review Gate and Promotion Logic

Goal:

- move from raw benchmark completion to review-governed promotion eligibility

Key outcomes:

- reviewer decision workflow
- promotion guard logic
- history and comparison support
- restricted model handling

## Phase C: ModelHub MVP

Goal:

- expose approved model summaries to developers and use case owners

Key outcomes:

- leaderboard
- profile page
- comparison
- pricing and documentation placeholders
- trusted summary fields fed from sandbox outputs

## Phase D: AgentLab and Apilogy Consumption

Goal:

- reuse approved guidance downstream

Key outcomes:

- model selection guidance in `AgentLab`
- API surfaces for approved summaries
- possible `Apilogy` enrichment

## Phase E: Expanded Evaluation Coverage

Goal:

- expand beyond baseline model benchmarking once the trust workflow is stable

Key outcomes:

- app and RAG evaluation
- deeper red teaming
- runtime control guidance

---

## 5. Tool Positioning

The current recommended tool positioning is:

- `LiteLLM`: endpoint adapter and access layer
- `Moonshot`: current benchmark foundation
- `FastAPI`: orchestration and API layer
- `PostgreSQL`: metadata and results store
- `Next.js`: internal and public UI platform
- `DeepEval`: later app and agent evaluation
- `PyRIT` and `Garak`: later security expansion
- `LLM Guard`: runtime control support

Important product refinement:

- `Apilogy` is not the benchmark engine
- `ModelHub` is not the review workspace
- `AI Sandbox` is not the developer-facing discovery surface

---

## 6. Q1 2026 Progress Context

The roadmap should now account for work already completed in Q1, including the early-April closeout updates:

- research and benchmark framing around Indonesia-specific evaluation
- product clarification separating `AI Sandbox` and `ModelHub`
- frontend improvements to result inspection and detailed recipe review
- Cloudflare deployment and publishing fixes
- stronger guidance for future FE, UIUX, QA, and publisher agents

This means the roadmap is no longer greenfield. It is moving from early foundation into structured MVP completion.

---

## 7. Current Risks

- older docs and route labels may still blur `AI Sandbox` and `ModelHub`
- fixture-backed frontend progress may outpace finalized backend schema
- promotion logic may still be described too loosely in some materials
- `ModelHub` content model is not yet complete for pricing, docs, and examples
- benchmark breadth can still expand too quickly unless the MVP remains narrow

---

## 8. Q2 2026 Recommended Next Steps

These priorities assume the current April 2 state is already part of completed Q1 progress.

1. complete the internal assessment-to-promotion workflow
2. stabilize benchmark history and version comparison across frontend and backend
3. define the minimum `ModelHub` content schema
4. complete guarded promotion into `ModelHub`
5. prepare `AgentLab`-ready summary APIs after `ModelHub` is stable

---

## 9. Final Recommendation

Treat the current roadmap as a staged product transition:

- complete `AI Sandbox` as the internal trust preparation layer
- expose only approved and curated summaries into `ModelHub`
- delay broader platform expansion until the trust workflow, deployment path, and documentation are stable
