# AI Sandbox Low-Cost and Reliability Architecture Refinement 2026

Last updated: 2026-04-07

Related documents:

- [Telkom_AI_Model_Security_Strengthening_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Telkom_AI_Model_Security_Strengthening_Plan_2026.md)
- [AI_Sandbox_Build_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Build_Plan_2026.md)
- [Telkom_AI_and_AI_Sandbox_Architecture_Overview_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Telkom_AI_and_AI_Sandbox_Architecture_Overview_2026.md)

---

## 1. Why This Refinement Exists

The latest baseline architecture is directionally correct, but it needs refinement in three areas:

- reliability under limited infrastructure
- preference for free or open-source components
- realistic model and guardrail sizing for constrained compute

This document turns the architecture into a more practical `AI Sandbox` delivery view for the current resource situation.

---

## 2. Review of the Current Baseline

## What is already strong in the baseline image

- the split between `AI Model Development` and `AI Sandbox` is correct
- the benchmark domains are correct:
  - adversarial attacks
  - data privacy
  - hallucination / truthfulness
  - undesirable content
  - local factuality
- the governance and review layer is correctly separated from the raw test modules
- the standards side bar is useful and should stay:
  - `OWASP LLM Top 10`
  - `ISO/IEC 42001`
  - `NIST AI RMF`
  - `UU PDP`
  - local ethics context

## What needs refinement

- the baseline is still too abstract on operational reliability
- it does not clearly distinguish what should be:
  - low-cost default
  - optional enhancement
  - future expansion
- the `Guardrails` and `Guard Model` areas need concrete tool selection guidance
- some modules should prefer rule-based or lightweight controls before additional model deployments
- the architecture should explicitly favor open-source and zero-cost tooling unless there is a hard gap

---

## 3. Core Refinement Principles

The architecture should now follow these principles.

## Principle A - Open Source First

Default preference:

- open-source tools
- self-hosted where practical
- no-cost features already available in deployed components

Use paid or external services only when:

- there is a clear control gap
- the open-source option is not reliable enough
- the operational burden becomes too high

## Principle B - Reliability Before Tool Sprawl

We should prefer fewer components that are stable and explainable.

Avoid:

- stacking too many guardrail providers at once
- adding multiple small tools before evidence schemas are stable
- introducing heavy safety models before baseline logging and retry behavior are reliable

## Principle C - Small Model Footprint

For any new guard model deployment:

- prefer `<= 2B` parameters
- prefer quantized or pruned variants where performance is acceptable
- avoid introducing 7B or 8B-class guard models unless there is a proven need

This is especially important for:

- local moderation
- low-cost always-on input and output checks
- test or sandbox environments with limited GPU resources

## Principle D - Reliable Degradation

The sandbox should keep working even when optional tools are unavailable.

That means:

- benchmark execution should not fail just because one optional security layer is down
- rule-based checks should exist as fallback for some categories
- guardrail failures should be logged and flagged, not silently ignored

---

## 4. Recommended Architecture Refinement

## A. AI Model Development Side

Recommended stack:

- core model endpoint: `Telkom AI`
- endpoint adapter and policy control: `LiteLLM`
- baseline benchmark engine: `Moonshot`
- optional lightweight guard model: `Llama Guard` family with `<= 2B` ceiling
- privacy and PII support: `Presidio`

Refinement notes:

- use `LiteLLM` built-in content filters first for fast and low-cost baseline control
- only add a separate guard model where rule-based or built-in filtering is not enough
- if a separate guard model is deployed, keep it small and dedicated to moderation or classification

## B. AI Sandbox Side

Recommended stack:

- frontend: existing sandbox UI
- backend orchestration: existing backend plus benchmark job control
- evidence storage: `PostgreSQL` plus file or object storage
- benchmark engine: `Moonshot`
- adversarial expansion: `Garak`
- advanced conversational red team: `PyRIT` only after core modules are stable
- privacy checks: `Presidio` plus pattern-based detectors
- local benchmark packs: internal Indonesia-specific datasets and rules

Refinement notes:

- the sandbox should focus on orchestrating evidence, not becoming a giant multi-tool platform too early
- `PyRIT` should stay behind `Garak` in priority because it adds more complexity
- local factuality should stay lightweight at first, with benchmark packs and curated evaluation rather than large new judge models

---

## 5. Recommended Tooling by Module

| Module | Low-Cost Default | Optional Upgrade | Recommendation |
|---|---|---|---|
| Observability and monitoring | application logs, structured run logs, `LiteLLM` logging hooks | Langfuse or MLflow later | start with logs and run metadata first |
| Adversarial attacks | `Moonshot` + `Garak` | `PyRIT` later | use `Garak` first because it is open source and focused |
| Data privacy | `Presidio` + regex/pattern rules | external guardrail partner only if needed | prefer `Presidio` and custom recognizers |
| Hallucination / truthfulness | `Moonshot` benchmark packs + curated local eval sets | later judge-model expansion | keep this benchmark-driven first |
| Undesirable content | `LiteLLM` built-in filters + rule-based policy | lightweight guard model if needed | avoid heavier moderation stack unless needed |
| Local factuality | internal Indonesian benchmark packs | later specialized retrieval or judge layer | keep this dataset- and rubric-led first |
| Policy controls | `LiteLLM` built-in controls | partner guardrails only when a specific gap is proven | built-in first |
| Model review | sandbox review UI + reviewer notes | richer workflow later | current MVP is enough |
| Release discipline | version labels + run history + review gate | policy engine later | do this in sandbox first |
| Standards mapping | internal documentation mapping | later automated evidence package | manual and structured is enough now |

---

## 6. Guardrails Refinement

## Keep

- the `Guardrails` block in the baseline architecture should stay

## Refine

Instead of treating `Guardrails` as one abstract area, split it into:

1. built-in `LiteLLM` controls
2. lightweight privacy and pattern checks
3. optional external or model-based guardrails

Recommended low-cost order:

1. `LiteLLM` content filters
2. keyword and pattern blocking
3. `Presidio` for PII-sensitive flows
4. `Llama Guard`-class small guard model only when needed
5. partner or enterprise guardrails only when justified

Practical interpretation:

- do not deploy a new guard model if the failure can be handled by `LiteLLM` plus rules
- do not use partner guardrails as the default architecture
- keep guardrail decisions visible in run metadata inside the sandbox

---

## 7. Guard Model Refinement

## Keep

- the `Guard Model` row is still useful

## Refine

The row should explicitly say:

- `Small Guard Model (<= 2B, optional)`

Recommended use:

- prompt and response safety classification
- second-pass moderation on high-risk flows
- use only when built-in filters are not enough

Recommended sizing rule:

- hard ceiling: `2B`
- preferred baseline: `1B` to `2B`

Recommended practical choice:

- if the team deploys `Llama Guard 3`, prefer the `1B` family or a quantized form of the `1B` family rather than any larger guard model

Why:

- easier to host
- lower inference cost
- more realistic for always-on moderation in the current environment

Do not use as default:

- 7B or 8B guard models for baseline moderation in the current sandbox

---

## 8. Reliability Refinement

The current architecture should add an explicit reliability view.

## Reliability requirements that should be added

- retry logic for benchmark jobs
- timeout handling for model endpoint calls
- explicit failure states for each run
- guardrail-policy logging for each execution
- health checks for:
  - `LiteLLM`
  - benchmark worker
  - sandbox backend
  - primary database
- run resumption or rerun support
- minimal offline review capability for already completed results

## Reliability design rules

- every benchmark run should have a stable run ID
- every run should capture:
  - model version
  - benchmark recipe version
  - active guardrail profile
  - timestamps
  - failure reason if incomplete
- optional tools must fail gracefully
- core workflow must still work with only:
  - `LiteLLM`
  - `Moonshot`
  - sandbox backend
  - database

## Reliability priority by period

- `Q2`: basic retry, timeout, run state, and health visibility
- `Q3`: stronger audit traceability and environment hardening
- `Q4`: stronger operational hardening and periodic reassessment discipline

---

## 9. Cost-Control Refinement

Recommended low-cost operating posture:

- use already deployed `LiteLLM` features first
- keep `Moonshot` as the primary benchmark engine
- prefer `Garak` over commercial red-team tools for initial adversarial expansion
- prefer `Presidio` over paid privacy tooling for baseline privacy detection
- keep `PyRIT` optional until adversarial and governance basics are stable
- use small or quantized safety classifiers only when rule-based and built-in filters are not enough

Avoid in MVP:

- broad commercial guardrail mesh
- heavy always-on secondary LLM moderation unless proven necessary
- expensive observability stack before evidence schema is stable

---

## 10. Refined Architecture Recommendation by Period

## Q2 2026

Recommended architecture baseline:

- `Telkom AI`
- `LiteLLM`
- built-in `LiteLLM` content filters
- `Moonshot`
- `Presidio`
- sandbox registration, review, history, and review gate
- structured logs and benchmark artifacts

This should be the minimum reliable and low-cost baseline.

## Q3 2026

Recommended expansion:

- `Garak`
- Indonesian local benchmark packs
- stronger review traceability
- optional `Llama Guard <= 2B` only if built-in filters plus rules are insufficient
- optional selected partner guardrail only if a specific enterprise gap remains

## Q4 2026

Recommended hardening:

- full reassessment path
- stronger release discipline
- stronger trusted-summary output
- improved operational reliability and periodic reassessment workflow

## Future

Only after the above is stable:

- `PyRIT` as broader advanced red-team layer
- app and agent-level evaluation expansion
- larger enterprise security mesh

---

## 11. What I Recommend Changing in the Diagram

The baseline diagram should be refined as follows.

## Change 1

Rename `Guard Model` to:

- `Small Guard Model (<= 2B, optional)`

## Change 2

Under `Guardrails`, explicitly list:

- `LiteLLM built-in filters`
- `Presidio / privacy masking`
- `rule-based keyword and pattern controls`
- `partner guardrails only if required`

## Change 3

Add a reliability callout box with:

- retry
- timeout
- run states
- health checks
- audit logs

## Change 4

Under `Test Modules`, refine the blanks:

- `Adversarial Attacks`
  - prompt injection
  - jailbreak
  - system prompt extraction
  - data exfiltration patterns
- `Data Privacy`
  - PII leakage
  - sensitive entity exposure
  - masking or redaction validation
- `Hallucination / Truthfulness`
  - unsupported claims
  - answer grounding checks
  - retrieval-aligned truthfulness checks
- `Undesirable Content`
  - violence
  - self-harm
  - hate and toxic language
  - unsafe specialized advice
- `Local Factuality`
  - `SARA` Indonesia
  - toxic Indonesian content
  - Indonesian facts
  - Indonesia regulatory compliance

## Change 5

Add a note that the default architecture is:

- open source first
- zero or low cost first
- enterprise tools only for proven gaps

---

## 12. Final Recommendation

The baseline architecture is still usable, but it should be refined toward a more practical operating model:

- reliable before complex
- open source before paid
- built-in `LiteLLM` controls before external guardrails
- small guard model before large safety model
- benchmark and evidence discipline before tool expansion

This refinement keeps the architecture aligned with the latest planning while making it more realistic for the current resource limits.

