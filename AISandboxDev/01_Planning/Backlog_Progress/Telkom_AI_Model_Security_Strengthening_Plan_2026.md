# Telkom AI Model Security Strengthening Plan 2026

Last updated: 2026-04-06

This document focuses on the first major workstream shown in the architecture direction:

- strengthen the `Telkom AI` model and serving posture

It is separate from the platform-building workstream for `AI Sandbox`.

Related document:

- [AI_Sandbox_Master_Backlog_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Master_Backlog_Plan_2026.md)

---

## 1. Purpose

The purpose of this workstream is to improve the security, safety, and operational trustworthiness of `Telkom AI` before broader downstream use.

The intended outcome is not only a better benchmark score, but a stronger model posture across:

- adversarial robustness
- hallucination control
- privacy and data leakage protection
- localized Indonesian harmful-content handling
- serving-time control through guardrails and gateway layers

---

## 2. Current Progress Baseline

The following progress has already been completed or materially advanced.

## 2.1 Research, Benchmark, and Regulatory Contribution

Completed or advanced:

- research on AI Sandbox ecosystem implementation
- benchmarking direction using `AI Verify Singapore`, `ISO` security standards, and `NIST AI RMF`
- review and feedback contribution to the draft `Perpres Etika AI` for `Komdigi`
- initial gap-analysis formulation covering Telkom AI security posture, current system condition, and AI governance posture against global and local frameworks

Why it matters:

- this gives the model-hardening work a policy and governance basis, not only a technical testing basis

## 2.2 Deployment Baseline and Initial Assessment

Completed or advanced:

- initial Telkom AI model run and baseline setup
- deployment of `AI Verify Moonshot` as the initial benchmark platform
- initial assessment of the Telkom AI LLM, including early red-team style testing
- specific evaluation against:
  - adversarial attacks
  - hallucination
- root-cause framing for baseline weaknesses

Monitoring already recognized as important:

- model logging
- API connectivity stability
- periodic and structured reporting output

## 2.3 Indonesia AI Sandbox and Guardrails Mitigation Research

Completed or advanced:

- draft planning for an `Indonesia AI Sandbox`
- local benchmark investigation using Indonesian content and local regulatory context
- mitigation planning based on initial assessment findings
- research on extra security guardrail layers using `LiteLLM` architecture to filter high-risk inputs and outputs
- weekly sync and sprint-review reporting around localization scope, Indonesian data governance, and guardrail proxy integration progress

## 2.4 LiteLLM Guardrail Capability Baseline

Now available in the current environment:

- `LiteLLM` has already been deployed
- built-in `LiteLLM Content Filter` capabilities are available for direct planning consideration
- `LiteLLM` partner guardrail integrations are available for selective enterprise or advanced-policy use

Current built-in filter capabilities relevant to Telkom AI planning include:

- denied financial advice
- denied legal advice
- denied medical advice
- harmful violence
- harmful self-harm
- harmful child safety
- harmful illegal weapons
- gender, racial, religious, and sexual-orientation bias
- prompt injection for jailbreak, data exfiltration, SQL, malicious code, and system-prompt extraction
- toxic and abusive language
- pattern matching
- keyword blocking
- block code execution
- competitor name blocking

Current partner guardrail options visible in scope include:

- `Presidio PII`
- `Bedrock Guardrail`
- `Lakera`
- `OpenAI Moderation`
- `Google Cloud Model Armor`
- `Guardrails AI`
- `Zscaler AI Guard`
- `PANW Prisma AIRS`
- `Noma Security`
- `Aporia AI`
- `AIM Guardrail`
- `Prompt Security`
- `Lasso Guardrail`
- `Pangea Guardrail`
- `EnkryptAI`
- `Javelin Guardrails`
- `Pillar Guardrail`
- `Akto Guardrail`

---

## 3. Problem Statement

The current Telkom AI baseline still has trust gaps that prevent it from being treated as a low-risk model for broader internal or downstream use.

The main risk areas are:

- adversarial prompt handling is not yet sufficiently hardened
- hallucination risk still needs deeper control and evidence
- localized Indonesian harmful-content handling is not yet deeply validated
- privacy and PII leakage controls are not yet fully operationalized
- model serving controls and runtime guardrails are still in planning or early implementation

---

## 4. Strategic Goal

Target goal for 2026:

- move Telkom AI from baseline assessed risk toward a more stable `Low Risk / A` posture across the priority dimensions that matter for internal assurance

Priority dimensions:

- adversarial
- hallucination
- data disclosure and privacy
- undesirable or unsafe content
- Indonesian local-context reliability

---

## 5. Scope

In scope:

- benchmark-based security and safety assessment of `Telkom AI`
- root-cause analysis of model weaknesses
- guardrail and gateway mitigation design
- prompt constraint and serving-policy hardening
- Indonesian localized benchmark and content pack preparation
- runtime observability and structured reporting support
- retesting and reassessment cadence

Out of scope:

- full platform build of `AI Sandbox`
- downstream public discovery experience
- formal external certification claim
- broad enterprise AI platform modernization outside the Telkom AI assessment path

---

## 6. Target Security Architecture for the Model Workstream

The model hardening workstream should progressively align to these layers:

1. model baseline and serving endpoint
2. `LiteLLM` routing and control layer
3. input and output guardrails
4. benchmark and red-team evidence generation
5. logging, observability, and reporting
6. mitigation loop and controlled retest

Priority security integration themes:

- `LiteLLM` as the main proxy or control layer
- built-in `LiteLLM` guardrails for prompt and response filtering
- privacy masking and sensitive-content handling
- structured logs for evidence and debugging
- selective use of partner guardrails where there is a clear coverage gap
- future support for offensive testing layers

Recommended planning posture:

- use built-in `LiteLLM` controls first for fast baseline protection
- use partner guardrails only where there is a concrete privacy, policy, or enterprise control gap
- avoid introducing multiple external providers before baseline measurements stabilize

---

## 7. Work Breakdown

## Epic M1 - Security Baseline and Root-Cause Analysis

Goal:

- establish a reliable baseline of current Telkom AI weaknesses

Stories:

- confirm the active Telkom AI model version, serving route, and benchmark target profile
- document the initial `Moonshot` run coverage and benchmark recipe scope
- capture baseline results for adversarial and hallucination risk
- classify root causes into prompt, model, retrieval, data, and serving-policy categories
- create a repeatable baseline reporting template

Primary agents:

- `AI Engineer Agent`
- `Product Manager Agent`
- `QA Agent`

## Epic M2 - Guardrails and Gateway Mitigation

Goal:

- reduce moderate and low-risk issues through serving-layer controls

Stories:

- design the `LiteLLM` routing policy for Telkom AI assessment traffic
- define high-risk input and output filtering rules
- map built-in `LiteLLM` content-filter categories to Telkom AI risk dimensions
- identify which built-in filters can be enabled immediately for:
  - prompt injection
  - harmful content
  - bias-sensitive content
  - unsafe advice requests
  - code execution and data exfiltration
- evaluate whether any partner guardrail is needed beyond built-in `LiteLLM` controls
- add prompt engineering constraints for common adversarial failure patterns
- define fallback, refusal, and escalation behavior for unsafe prompts

Primary agents:

- `AI Engineer Agent`
- `BE Agent`

## Epic M3 - Privacy and Data Protection Hardening

Goal:

- reduce privacy leakage and sensitive-data exposure risk

Stories:

- define privacy-sensitive test cases for Indonesian and enterprise contexts
- design PII masking and sensitive-output review rules
- evaluate `Presidio PII` and similar partner options only if built-in or lightweight controls are not enough
- define logging redaction policy
- map the privacy posture to `UU PDP` expectations
- add privacy evidence fields to structured reports

Primary agents:

- `AI Engineer Agent`
- `BE Agent`
- `QA Agent`

## Epic M4 - Indonesian Localized Risk Coverage

Goal:

- make security and safety evaluation locally relevant

Stories:

- define benchmark packs for `SARA`-sensitive content
- define localized undesirable-content categories
- expand Indonesian fact and context evaluation
- document judge and rubric expectations for Bahasa Indonesia
- prepare localized retest datasets for recurring failure patterns

Primary agents:

- `AI Engineer Agent`
- `Product Manager Agent`
- `QA Agent`

## Epic M5 - Observability, Reporting, and Retest Governance

Goal:

- turn testing into a repeatable assurance loop

Stories:

- define the minimum required logging for prompts, outputs, errors, and benchmark events
- record which `LiteLLM` guardrail policy or partner integration was active during each test run
- define reporting cadence and report template for weekly or sprint review
- define model reassessment triggers after mitigation changes
- define status labels such as `Baseline`, `Mitigation In Progress`, `Retest Ready`, and `Reassessed`
- define evidence handoff into `AI Sandbox`

Primary agents:

- `BE Agent`
- `AI Engineer Agent`
- `QA Agent`
- `Product Manager Agent`

---

## 8. Time Plan

## Q1 2026

Delivered baseline:

- initial assessment completed
- baseline red-team style testing completed
- adversarial and hallucination findings documented
- `Moonshot` deployed as initial benchmark platform
- root-cause formulation started
- regulatory and standards-alignment groundwork completed

## Q2 2026

Primary objective:

- implement practical serving-layer mitigations

Planned focus:

- input and output guardrail layer
- `LiteLLM`-based routing and policy controls
- fast adoption of built-in `LiteLLM` content-filter categories where relevant
- prompt engineering constraints for moderate and low-risk adversarial patterns
- stronger logging and reporting discipline

Success indicators:

- adversarial failure rate reduced against the current baseline
- basic privacy and unsafe-output rules consistently applied
- repeatable retest process established

## Q3 2026

Primary objective:

- expand localized and deeper mitigation coverage

Planned focus:

- deeper Indonesian fact and undesirable-content evaluation
- hallucination mitigation using stronger `RAG` controls where relevant
- retest of previously weak benchmark areas
- tighter benchmark packs for local regulatory and cultural risk

Success indicators:

- Indonesian localized benchmark coverage materially expanded
- hallucination mitigation approach defined and tested
- retest evidence available for key weak areas

## Q4 2026

Primary objective:

- execute final comprehensive reassessment for release-candidate posture

Planned focus:

- full reassessment on data disclosure, adversarial, hallucination, and Indonesian context
- confirm mitigations are stable, not one-off patches
- produce final internal assurance summary for the Telkom AI release candidate

Success indicators:

- model reaches target low-risk posture on priority dimensions
- evidence is strong enough to support downstream internal trust decisions

---

## 9. Monthly Working Plan for Q2 2026

## April 2026

Focus:

- consolidate baseline findings and convert them into mitigation backlog

Outputs:

- root-cause register
- risk-by-dimension matrix
- guardrail candidate short list
- logging and reporting checklist

## May 2026

Focus:

- implement first serving-layer mitigations

Outputs:

- `LiteLLM` control-path definition
- initial input and output filtering rules
- built-in `LiteLLM` guardrail category mapping
- partner-guardrail evaluation notes with clear go or no-go recommendation
- privacy and masking requirements
- retest plan for adversarial and unsafe content

## June 2026

Focus:

- validate early mitigation effectiveness

Outputs:

- comparative retest report against baseline
- unresolved gap list
- Q3 localization and hallucination-hardening entry criteria

---

## 10. Dependencies

Key dependencies:

- stable Telkom AI endpoint and model versioning
- benchmark execution support through `Moonshot`
- backend or script support for storing evidence and reports
- alignment between security findings and `AI Sandbox` evidence model
- stakeholder agreement on target risk posture and review criteria

---

## 11. Risks

Main risks:

- mitigation work may improve benchmark scores without improving real trust posture
- localized Indonesian benchmark packs may take longer than expected to mature
- privacy controls may be partially implemented in logs but not at serving time
- benchmark drift may make baseline-to-retest comparisons inconsistent
- model changes without version discipline may invalidate evidence

---

## 12. Definition of Success

This workstream should be treated as successful when:

- Telkom AI has a repeatable security baseline and retest cadence
- adversarial and hallucination issues have concrete mitigation actions
- `LiteLLM` built-in content filters are intentionally configured or intentionally ruled out per category
- partner guardrail usage is justified by a real gap, not by feature sprawl
- `LiteLLM` and guardrail strategy are operationally defined
- localized Indonesian risk coverage is materially improved
- evidence can be handed into `AI Sandbox` for review and promotion decisions
