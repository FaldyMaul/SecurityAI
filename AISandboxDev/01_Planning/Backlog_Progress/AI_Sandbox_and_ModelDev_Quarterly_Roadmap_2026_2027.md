# AI Sandbox and Model Development Quarterly Roadmap 2026-2027

Last updated: 2026-04-07

Related documents:

- [AI_Sandbox_Architecture_Taxonomy_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Architecture_Taxonomy_2026.md)
- [AI_Sandbox_Taxonomy_Current_and_Future_Execution_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Taxonomy_Current_and_Future_Execution_2026.md)
- [AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md](D:\Work\PAM\SecurityAI\AIModelDev\AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md)
- [AI_Sandbox_Detailed_Architecture_Delivery_Matrix_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Detailed_Architecture_Delivery_Matrix_2026.md)

---

## 1. Purpose

This document provides a single execution roadmap by quarter for:

- `AI Model Development`
- `AI Sandbox`
- guardrail rollout
- benchmark expansion
- review and evidence workflow

It is intended to answer four execution questions:

- what is already done now
- what is the goal for each quarter
- what backlog should be prioritized in each sub-category
- how `LiteLLM`, `Moonshot`, `Presidio`, and future guardrail tools fit into the roadmap

---

## 2. Current Baseline

## 2.1 Current State Summary

The current baseline as of `2026-04-07` is:

- `LiteLLM` is already deployed
- `LiteLLM` is already being used as the active gateway layer
- current practical step for `LiteLLM` is request and token tracking
- `Moonshot` is the active benchmark and scoring foundation
- `AI Sandbox` direction already includes model registration, run execution, result review, history, and promotion gating
- `Presidio` is the preferred low-cost privacy tool, but still needs integration work
- model-development remediation logic is now clearer:
  - `5.1` prompt injection and jailbreak: block first
  - `5.2` PII leakage: detect, redact, and block first
  - `5.3` hallucination and unsupported claims: improve first, block selectively
  - `5.4` toxicity, hate, unsafe specialized advice: block first, then improve localization

## 2.2 Current Step for LiteLLM

`LiteLLM` should be treated as the currently deployed `Done / In Use` component, with this current operational step:

- track request metadata
- track token usage
- track model endpoint usage
- track response status and errors
- provide gateway-level normalization for multiple models

This means the current roadmap should not describe `LiteLLM` as future-only. It should be described as:

- `already deployed`
- `already useful for observability and control`
- `current focus: request tracking and token tracking`
- `next focus: policy metadata, guardrail profile tagging, and evidence linkage`

---

## 3. Roadmap Goals by Quarter

## Q1 2026 Goals

- establish the internal `AI Sandbox` concept and workflow baseline
- deploy `LiteLLM` as gateway and usage-tracking layer
- establish `Moonshot` as the benchmark scoring foundation
- define the review-oriented sandbox UX and evidence flow
- align architecture to low-cost OSS-first delivery

## Q2 2026 Goals

- stabilize the MVP baseline
- make review, logging, and guardrail evidence operational
- integrate privacy controls and grounding checks
- turn ad hoc review into explicit release states and retest loop
- connect current `LiteLLM` tracking to benchmark runs and model versions

## Q3 2026 Goals

- expand benchmark breadth and realism
- add localized Indonesia-specific benchmark packs
- operationalize standards mapping and internal assurance reporting
- add adversarial expansion beyond the `Moonshot` baseline
- improve moderation and truthfulness handling with stronger runtime controls where needed

## Q4 2026 Goals

- harden retrieval-aware truthfulness controls
- improve cost visibility and audit traceability
- formalize promotion eligibility and trusted internal reuse
- selectively introduce runtime guard models only where evidence shows the app-layer stack is insufficient

## Q1 2027 Goals

- add heavier advanced red-team capability
- cover long-tail harmful-content and complex multi-turn attack scenarios
- mature the sandbox from baseline assurance workspace into a more complete internal AI risk platform

---

## 4. Roadmap by Quarter

## 4.1 Q1 2026

### Goal

Build the initial foundation and prove the architecture direction.

### Main Outcomes

- `LiteLLM` deployed as active gateway
- request and token tracking operational
- `Moonshot` chosen as benchmark scoring engine
- core sandbox workflow defined
- architecture validated around `FastAPI`, `PostgreSQL`, `Next.js`, and OSS-first components

### Status

`Mostly Done`

### Backlog Recap by Sub-category

| Sub-category | Q1 2026 Backlog Recap | Status |
|---|---|---|
| Observability and Monitoring | deploy `LiteLLM` for request and token tracking | `Done` |
| Adversarial Attacks Guardrails | baseline `LiteLLM` prompt filtering and attack-aware gateway posture | `Done / Partial` |
| Data Privacy Guardrails | choose `Presidio` as preferred privacy tool | `Planned` |
| Hallucination / Truthfulness | use `Moonshot` unsupported-claims baseline | `Done` |
| Undesirable Content | baseline harmful-content filtering direction via `LiteLLM` | `Done / Partial` |
| Governance | define reviewer-oriented sandbox workflow | `Done / Partial` |
| Reporting and Assurance | define score and evidence review concept | `Done / Partial` |
| Advanced Red Team | keep as future expansion, not first-wave delivery | `Deferred` |
| Local Factuality | localization direction documented, not yet operational | `Planned` |

---

## 4.2 Q2 2026

### Goal

Turn the current foundation into a stable MVP with traceable evidence, clear release states, and first-wave guardrail integrations.

### Main Outcomes Target

- `LiteLLM` tracking linked to run metadata and model version
- guardrail profile metadata visible per run
- `Presidio` integrated for privacy checks and redaction
- answer-grounding workflow introduced
- review gate and reassessment flow made explicit in the sandbox
- health and error monitoring formalized

### Backlog by Sub-category

| Sub-category | Q2 2026 Priority Backlog | Target Outcome |
|---|---|---|
| Observability and Monitoring | add guardrail event logging | know which filters and profiles were active per run |
| Observability and Monitoring | add error logging and health checks | improve operational reliability |
| Observability and Monitoring | connect request and token tracking to run IDs and benchmark versions | make `LiteLLM` telemetry useful for audit |
| Adversarial Attacks Guardrails | add system prompt extraction blocking | reduce prompt leakage risk |
| Adversarial Attacks Guardrails | add data exfiltration pattern blocking | reduce prompt-based exfiltration risk |
| Adversarial Attacks Guardrails | add SQL or command pattern blocking | improve baseline hardening |
| Adversarial Attacks Guardrails | start prompt-risk evidence tagging | make attack findings reviewable |
| Data Privacy Guardrails | integrate `Presidio` entity detection | operational privacy baseline |
| Data Privacy Guardrails | add input and output masking or redaction | reduce PII exposure in model flow |
| Data Privacy Guardrails | add privacy-aware log redaction | avoid sensitive data in logs |
| Hallucination / Truthfulness | add answer grounding checks | move beyond pure scoring |
| Hallucination / Truthfulness | add factuality review workflow | reviewer can inspect unsupported claims with evidence |
| Undesirable Content | improve hate or toxic-content restriction using rules and benchmark linkage | stronger harmful-content control |
| Governance | define policy categories by risk domain | standardize review basis |
| Governance | store active guardrail profile per run | connect controls to review outcomes |
| Governance | make reviewer decision rationale mandatory | improve traceability |
| Governance | tie review to model version and benchmark version | strengthen release discipline |
| Reporting and Assurance | implement assessment rating view | clear run-level summary |
| Reporting and Assurance | implement review gate states | approve, approve with controls, restricted, reassessment required |
| Advanced Red Team | implement retest loop for failed categories | create mitigation verification cycle |
| Test Modules - Adversarial | complete system prompt extraction and exfiltration tests | expand baseline coverage |
| Test Modules - Data Privacy | add PII leakage, masking validation, and privacy log checks | operational privacy test coverage |
| Test Modules - Hallucination | add rubric-driven or retrieval-aware grounding checks | better truthfulness evidence |

---

## 4.3 Q3 2026

### Goal

Expand the MVP into a richer internal assurance platform with localized coverage, adversarial realism, and stronger runtime controls where needed.

### Main Outcomes Target

- `Garak` added as structured adversarial expansion
- local Indonesia benchmark packs operational
- standards mapping tied to findings
- stronger moderation stack for localized harmful-content handling
- stronger hallucination handling through grounding tools and retest discipline

### Backlog by Sub-category

| Sub-category | Q3 2026 Priority Backlog | Target Outcome |
|---|---|---|
| Observability and Monitoring | add audit traceability across model version, benchmark version, and review decision | stronger audit chain |
| Adversarial Attacks Guardrails | complete code-execution blocking and evidence visibility | better response-side protection |
| Data Privacy Guardrails | map privacy findings to `UU PDP` workflow | regulation-linked review |
| Hallucination / Truthfulness | add confidence and uncertainty policy | stronger abstention behavior |
| Hallucination / Truthfulness | add mitigation retest and repeated factual consistency tracking | measure improvement over time |
| Hallucination / Truthfulness | operationalize `NeMo Guardrails` or `Guardrails AI` provenance flow where needed | runtime grounding control |
| Undesirable Content | add localized hate and toxic-content benchmark packs | Indonesia-aware harmful-content coverage |
| Undesirable Content | add stronger runtime moderation for difficult cases | reduce false negatives |
| Guard Model | evaluate `Llama Guard 3 1B` for selected high-risk flows | conditional runtime moderation |
| Governance | operationalize standards mapping to `OWASP`, `NIST AI RMF`, `ISO 42001`, `UU PDP` | better internal assurance |
| Reporting and Assurance | create findings register and internal compliance report package | better evidence packaging |
| Advanced Red Team | add `Garak` attack packs | deeper adversarial coverage |
| Advanced Red Team | create local threat scenarios | improve enterprise and Indonesia relevance |
| Test Modules - Hallucination | compare repeated factual consistency across runs | detect unstable behavior |
| Test Modules - Undesirable Content | add hate speech and toxic-language localized tests | improve moderation realism |
| Test Modules - Local Factuality | add `SARA`, Indonesian facts, local ethics, local regulation prompts | local benchmark maturity |

---

## 4.4 Q4 2026

### Goal

Strengthen trust, traceability, and retrieval-aware quality controls for models that are close to production use.

### Main Outcomes Target

- retrieval-aware truthfulness becomes operational where retrieval exists
- cost visibility and run-cost estimation become available
- promotion eligibility logic becomes more explicit
- runtime guard model usage is introduced only where data proves it is necessary

### Backlog by Sub-category

| Sub-category | Q4 2026 Priority Backlog | Target Outcome |
|---|---|---|
| Observability and Monitoring | add cost visibility and run-cost estimates | support planning and efficiency analysis |
| Hallucination / Truthfulness | implement retrieval-aligned truthfulness controls | stronger grounded-answer behavior |
| Guard Model | pilot optional second-pass moderation only on selected high-risk paths | low-cost targeted guard-model usage |
| Reporting and Assurance | implement promotion eligibility outputs for trusted reuse | downstream control readiness |
| Architecture Hardening | review whether app-layer controls are still sufficient | decide whether to stay wrapper-first or add more model-side controls |

---

## 4.5 Q1 2027

### Goal

Add heavier advanced red-team and long-tail safety coverage after the core platform is stable.

### Main Outcomes Target

- multi-turn adversarial simulation available
- long-tail harmful-content categories covered
- more mature reassessment and internal assurance capability

### Backlog by Sub-category

| Sub-category | Q1 2027 Priority Backlog | Target Outcome |
|---|---|---|
| Advanced Red Team | add `PyRIT` for multi-turn conversational attacks | deeper red-team realism |
| Undesirable Content | add sexual and other restricted unsafe-content packs | broader harmful-content taxonomy |
| Governance and Assurance | expand reviewer playbooks and severity guidance | more consistent internal decisions |

---

## 5. Quarterly Recap by Sub-category

## 5.1 Observability and Monitoring

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | deploy `LiteLLM`; track requests and tokens |
| `Q2 2026` | add guardrail event logging, error logging, health checks, run linkage |
| `Q3 2026` | add audit traceability across versions and decisions |
| `Q4 2026` | add cost visibility and run-cost estimates |

## 5.2 Adversarial Attacks Guardrails

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | establish baseline `LiteLLM` protection posture |
| `Q2 2026` | add prompt extraction, exfiltration, and malicious-command blocking |
| `Q3 2026` | improve response-side protection and evidence visibility |
| `Q4 2026` | review whether a semantic guard model is needed for remaining gaps |

## 5.3 Data Privacy Guardrails

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | select `Presidio` as preferred OSS direction |
| `Q2 2026` | implement PII detection, masking, redaction, and privacy log controls |
| `Q3 2026` | map privacy findings to `UU PDP` workflow |
| `Q4 2026` | refine false positives and local recognizers where needed |

## 5.4 Hallucination / Truthfulness

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | baseline unsupported-claims scoring via `Moonshot` |
| `Q2 2026` | add answer grounding checks and reviewer evidence workflow |
| `Q3 2026` | add confidence policy, mitigation retest, repeated consistency tracking, and runtime grounding tools |
| `Q4 2026` | add retrieval-aligned truthfulness controls for retrieval-backed systems |

## 5.5 Undesirable Content

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | baseline harmful-content direction via `LiteLLM` filters |
| `Q2 2026` | improve harmful-content controls and benchmark linkage |
| `Q3 2026` | localize hate, toxic, and abuse detection for Indonesian traffic |
| `Q4 2026` | review whether selected runtime guard-model usage is justified |
| `Q1 2027` | add broader restricted-content coverage |

## 5.6 Guard Model

| Quarter | Backlog Recap |
|---|---|
| `Q1-Q2 2026` | do not make guard model the default posture |
| `Q3 2026` | evaluate `Llama Guard 3 1B` for selected high-risk flows |
| `Q4 2026` | pilot optional second-pass moderation only if evidence shows wrapper stack is insufficient |

## 5.7 Governance

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | define reviewer-oriented sandbox workflow |
| `Q2 2026` | define risk categories, review states, reviewer rationale, version-aware review |
| `Q3 2026` | operationalize standards mapping and severity guidance |
| `Q4 2026` | strengthen promotion eligibility and trusted reuse criteria |

## 5.8 Reporting and Assurance

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | define score and evidence review concept |
| `Q2 2026` | implement assessment rating and review gate |
| `Q3 2026` | add findings register and internal assurance report package |
| `Q4 2026` | expose promotion eligibility outputs |

## 5.9 Advanced Red Team

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | defer heavy red-team tools |
| `Q2 2026` | add reassessment and retest loop |
| `Q3 2026` | add `Garak` and local threat scenarios |
| `Q1 2027` | add `PyRIT` for multi-turn attack chains |

## 5.10 Local Factuality

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | document localization direction |
| `Q2 2026` | prepare rubric and dataset structure |
| `Q3 2026` | operationalize `SARA`, Indonesian facts, local ethics, and regulation-linked test packs |
| `Q4 2026` | refine and maintain localized benchmark quality |

---

## 6. LiteLLM-Specific Tracking Roadmap

Because `LiteLLM` is already deployed, its roadmap should be tracked separately from future-only items.

| Quarter | LiteLLM Step | Notes |
|---|---|---|
| `Q1 2026` | deployed as gateway and tracking layer | current baseline |
| `Q1 2026` | request tracking and token tracking active | current operational step |
| `Q2 2026` | attach run ID, benchmark version, and model version to gateway metadata | improve audit usefulness |
| `Q2 2026` | log guardrail profile or active rules per run | improve review visibility |
| `Q3 2026` | support stronger review evidence linkage and policy reporting | improve governance integration |
| `Q4 2026` | add cost visibility and support targeted second-pass moderation routing if needed | support optimization and selective controls |

Recommended wording for current status:

- `LiteLLM` is already deployed and operational
- current use includes request tracking and token tracking
- next work is to connect `LiteLLM` telemetry to sandbox evidence, review, and policy metadata

---

## 7. Final Recommendation

The practical delivery posture should be:

1. treat `LiteLLM` as current production-like infrastructure, not a future backlog item
2. stabilize `Q2 2026` around evidence, review, privacy, and run traceability
3. use `Q3 2026` for benchmark expansion, localization, and stronger runtime controls
4. reserve `Q4 2026` for retrieval-aware hardening, cost visibility, and selective guard-model trials
5. keep `Q1 2027` for heavier advanced red-team work such as `PyRIT`

If reduced to one sentence:

- `2026` should focus on making the sandbox and guardrail stack operational, traceable, and localized before adding heavier model-side complexity.

