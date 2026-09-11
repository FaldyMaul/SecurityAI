# AI Sandbox Build Plan 2026

Last updated: 2026-04-06

This document focuses on the second major workstream shown in the architecture direction:

- build the `AI Sandbox` platform

This document should stay aligned with:

- [AI_Sandbox_Master_Backlog_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Master_Backlog_Plan_2026.md)

It breaks the master backlog into a platform-specific delivery view.

---

## 1. Purpose

The purpose of `AI Sandbox` is to provide an internal workspace where `Model Owner` or `Model Vendor` teams can:

- register models
- validate endpoints
- run benchmark assessments
- inspect evidence and benchmark history
- submit results for internal review
- receive promotion-eligibility decisions

`AI Sandbox` is an internal assurance and evidence system. It is not the public or developer-facing discovery surface.

---

## 2. Product Boundary

In scope for this plan:

- internal sandbox UI and backend workflow
- benchmark execution orchestration
- run history and evidence storage
- review gate and promotion-eligibility workflow
- `LiteLLM` guardrail-policy visibility and evidence capture
- Indonesian localization for benchmark content where needed
- security and assurance support features

Out of scope for this plan:

- full `ModelHub` experience
- public leaderboard and full pricing catalog
- broader `AgentLab` workflows
- enterprise-wide AI platform architecture outside sandbox needs

---

## 3. Current Baseline

Already completed or materially advanced:

- product split clarified between `AI Sandbox` and downstream systems
- `LiteLLM` positioned as the primary endpoint abstraction
- `Moonshot` positioned as the current benchmark foundation
- `LiteLLM` has been deployed and provides built-in content-filter plus partner-guardrail options that can be incorporated into sandbox planning
- planning aligned around history, comparison, and review gate
- frontend review flow improved for table-first results, category filtering, and prompt/response modal inspection
- Cloudflare Pages publishing path validated for the frontend prototype
- Indonesian benchmark and security direction documented

This build plan starts from that baseline.

---

## 4. Product Goal

The 2026 goal is to deliver a credible `AI Sandbox` MVP that supports:

- internal model intake
- benchmark execution
- serving-layer guardrail enforcement visibility
- evidence review
- benchmark history and comparison
- controlled review decision
- promotion eligibility for downstream use

---

## 5. Core User Journey

The intended current-state journey is:

1. model owner registers a model
2. sandbox validates endpoint and metadata
3. sandbox routes traffic through `LiteLLM` with active guardrail policy context
4. benchmark run is submitted in background
5. system stores results, artifacts, findings, and active guardrail metadata
6. model owner reviews benchmark output
7. reviewer inspects evidence and comparison history
8. reviewer marks reassessment required, restricted, or promotion eligible

This journey should remain the anchor for platform delivery.

---

## 6. Platform Work Breakdown

## Epic S1 - Model Intake and Validation

Goal:

- make model registration and endpoint validation reliable

Stories:

- create model registration form and metadata schema
- validate model endpoint connectivity before benchmark execution
- define supported provider and endpoint contract through `LiteLLM`
- capture source metadata and version information
- capture intended guardrail-policy profile for the model or run
- define status states for `Draft`, `Validated`, `Run Pending`, and `Run Failed`

Primary agents:

- `FE Agent`
- `BE Agent`
- `UIUX Agent`
- `QA Agent`

## Epic S2 - Benchmark Execution and Job Orchestration

Goal:

- make benchmark execution stable and traceable

Stories:

- define benchmark job lifecycle and job states
- connect benchmark execution to the `Moonshot` run path
- support background execution and result polling
- store machine-readable benchmark outputs
- attach active `LiteLLM` guardrail policy metadata to each run
- define failure and retry behavior for incomplete runs

Primary agents:

- `BE Agent`
- `AI Engineer Agent`
- `QA Agent`

## Epic S3 - Result Review, Findings, and Evidence UX

Goal:

- make benchmark evidence review practical for internal teams

Stories:

- finalize the table-first results page
- support category filtering and fail-oriented review
- support prompt and response detail inspection
- show findings, recommendations, and score summary in a stable structure
- show which `LiteLLM` built-in filters or partner guardrails were active for the run
- define evidence export or report view requirements

Primary agents:

- `FE Agent`
- `UIUX Agent`
- `QA Agent`

## Epic S4 - History and Version Comparison

Goal:

- support comparison across model versions and retest cycles

Stories:

- define run history data model
- show prior runs for a model version lineage
- provide comparison view across selected runs
- track benchmark recipe version and model version together
- define diff logic for score and findings changes

Primary agents:

- `BE Agent`
- `FE Agent`
- `QA Agent`

## Epic S5 - Review Gate and Promotion Eligibility

Goal:

- create the internal assurance checkpoint before downstream use

Stories:

- define reviewer workflow and decision states
- define `Approved`, `Approved with Controls`, `Restricted`, and `Reassessment Required`
- capture reviewer notes and evidence references
- support reviewer acknowledgement of the active guardrail profile as part of the decision context
- define promotion-eligibility payload for downstream handoff
- prevent ambiguous `publish` language and use `promotion eligibility` consistently

Primary agents:

- `BE Agent`
- `FE Agent`
- `UIUX Agent`
- `QA Agent`
- `Product Manager Agent`

## Epic S6 - Security and Localization Support

Goal:

- make the sandbox evidence locally relevant and security-aware

Stories:

- support Indonesian localized benchmark packs
- define privacy and sensitive-content evidence fields
- define sandbox support for current built-in `LiteLLM` content-filter categories such as:
  - prompt injection and jailbreak
  - harmful violence and self-harm
  - bias-sensitive categories
  - legal, medical, and financial advice restrictions
  - keyword and pattern-based blocking
  - code-execution blocking
- define when partner guardrails should be considered beyond built-in `LiteLLM` controls
- prepare future compatibility with `Garak`, `PyRIT`, and `LLM Guard`
- define storage and review requirements for security findings
- align evidence with the internal security and governance posture

Primary agents:

- `AI Engineer Agent`
- `BE Agent`
- `QA Agent`
- `Product Manager Agent`

## Epic S7 - Deployment, Runtime Stability, and Operations

Goal:

- keep the platform deployable and supportable

Stories:

- maintain stable frontend build and Cloudflare Pages deployment
- document runtime and edge constraints
- define backend deployment assumptions separately from frontend publishing
- define operational logging and audit-support requirements
- create release readiness checklist for sandbox MVP

Primary agents:

- `Publisher Agent`
- `FE Agent`
- `BE Agent`
- `QA Agent`

---

## 7. Quarterly Plan

## Q2 2026

Theme:

- complete the `AI Sandbox` MVP workflow

Target outcomes:

- stable registration and validation flow
- stable background benchmark execution
- usable result review and findings flow
- benchmark history and comparison baseline
- review gate and promotion-eligibility states defined

## Q3 2026

Theme:

- deepen trust and evidence quality

Target outcomes:

- stronger history and audit evidence
- stronger security and privacy finding support
- Indonesian localized benchmark integration improved
- reviewer workflow and policy checkpoints hardened

## Q4 2026

Theme:

- operational hardening and downstream readiness

Target outcomes:

- stable trusted summary output
- clearer downstream handoff contract
- stronger reassessment cadence
- better operational monitoring and governance reporting

---

## 8. Monthly Plan for Q2 2026

## April 2026

Focus:

- stabilize planning and state definitions

Outputs:

- aligned planning baseline
- refined current-state architecture description
- clarified review gate terminology
- clearer epic and story ownership by agent

## May 2026

Focus:

- complete internal workflow reliability

Outputs:

- hardened registration and validation flow
- stable benchmark-run lifecycle
- improved frontend review behavior
- defined reviewer decision states

## June 2026

Focus:

- reduce prototype gaps and prepare Q2 checkpoint

Outputs:

- improved backend and frontend result-contract alignment
- reduced fixture dependence
- benchmark history and comparison baseline working
- Q2 readiness review completed

---

## 9. Agent Ownership Summary

## `UIUX Agent`

Primary responsibility:

- information architecture
- workflow clarity
- review UX
- role and state design

## `FE Agent`

Primary responsibility:

- registration UI
- result review UI
- history and comparison UI
- review gate interaction

## `BE Agent`

Primary responsibility:

- data model
- run orchestration
- result storage
- review decision persistence
- promotion-eligibility API contract

## `AI Engineer Agent`

Primary responsibility:

- benchmark execution integration
- benchmark pack evolution
- localized security and Indonesian evaluation coverage

## `QA Agent`

Primary responsibility:

- acceptance criteria
- evidence validation
- regression coverage
- review-state correctness

## `Publisher Agent`

Primary responsibility:

- frontend deployment path
- runtime publishing issues
- release-readiness support

## `Product Manager Agent`

Primary responsibility:

- scope control
- terminology consistency
- roadmap alignment
- cross-agent handoff clarity

---

## 10. Dependencies

Key dependencies:

- stable backend contract for models, runs, results, and decisions
- `Moonshot` integration path for benchmark execution
- `LiteLLM` endpoint and provider normalization
- stable representation of active `LiteLLM` guardrail policy and partner-guardrail metadata
- result schema alignment between backend and frontend
- reviewer workflow and policy definitions

---

## 11. Risks

Main risks:

- frontend and backend may drift on result schema and state labels
- benchmark integration may remain too fixture-dependent for too long
- review gate may be implemented as UI only without enough evidence structure
- `LiteLLM` guardrails may be enabled operationally but not represented clearly in sandbox evidence and review flows
- too many partner-guardrail options may create planning sprawl before the MVP is stable
- terminology may drift back to `leaderboard` or `publish` language
- localized Indonesian coverage may remain documented but not operational
- security-tool expansion may overload MVP scope if introduced too early

---

## 12. Definition of Success

This workstream should be treated as successful when:

- a model can move from registration to validated benchmark run
- evidence can be reviewed clearly in the sandbox
- active `LiteLLM` guardrail policy is visible as part of run evidence
- benchmark history and comparison are available for reassessment
- a reviewer can make a structured promotion-eligibility decision
- the platform is stable enough for controlled internal use as the Telkom AI assessment workspace
