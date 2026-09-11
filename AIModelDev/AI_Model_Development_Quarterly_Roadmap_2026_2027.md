# AI Model Development Quarterly Roadmap 2026-2027

Last updated: 2026-04-07

Related documents:

- [AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md](D:\Work\PAM\SecurityAI\AIModelDev\AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md)
- [AI_ModelDev_5_3_5_4_Tools_Research_2026.md](D:\Work\PAM\SecurityAI\AIModelDev\AI_ModelDev_5_3_5_4_Tools_Research_2026.md)

---

## 1. Purpose

This document converts the `AI Model Development Taxonomy` into a quarter-by-quarter execution roadmap.

It focuses only on `AIModelDev` work:

- observability and monitoring
- guardrails
- guard model decisions
- remediation ordering after high-risk findings
- quarterly backlog by model-development sub-category

This document does not focus on the broader `AI Sandbox` delivery plan. It only tracks the model-development side of guardrail implementation and runtime remediation.

---

## 2. Current Baseline

## 2.1 Current State

The current baseline from the model-development research is:

- `LiteLLM` is already deployed in the environment
- current practical usage of `LiteLLM` includes request tracking and token tracking
- `Moonshot` is the active scoring and benchmark engine
- `Presidio` is the preferred OSS privacy control for PII detection and redaction
- current architecture posture is wrapper-first, not model-replacement-first
- the current remediation logic is:
  - `5.1` prompt injection and jailbreak: block first
  - `5.2` PII leakage: detect, redact, and block first
  - `5.3` hallucination and unsupported claims: improve first, block selectively
  - `5.4` toxicity, hate, unsafe specialized advice: block first, then improve localization

## 2.2 Current LiteLLM Step

For `AIModelDev`, `LiteLLM` should be treated as a current active component, not a future-only backlog item.

Current step:

- track request metadata
- track token usage
- normalize model access behind one gateway
- capture response status and basic operational telemetry

Next step:

- attach guardrail profile metadata
- attach model version and benchmark linkage
- attach evidence-friendly run metadata for later review and comparison

---

## 3. Quarter Goals

## Q1 2026 Goals

- establish the wrapper-first remediation posture
- deploy and use `LiteLLM` for gateway tracking
- establish `Moonshot` as benchmark scoring baseline
- identify `Presidio` as preferred privacy control
- define the first model-development taxonomy direction

## Q2 2026 Goals

- stabilize the first operational guardrail baseline
- connect `LiteLLM` tracking to model-development evidence
- implement first-wave privacy, adversarial, and truthfulness controls
- make remediation traceable by model version and run

## Q3 2026 Goals

- deepen runtime controls where simple rules are not enough
- add localized safety and factuality coverage for Indonesian traffic
- expand runtime grounding and moderation controls
- evaluate whether selected high-risk flows require a small guard model

## Q4 2026 Goals

- harden retrieval-aware truthfulness for retrieval-backed applications
- improve cost visibility and operational traceability
- use guard models only on selected high-risk paths if evidence justifies it
- decide whether wrapper-first controls are sufficient or whether main-model improvement is required

## Q1 2027 Goals

- support heavier long-tail risk handling
- add more advanced multi-turn and long-tail moderation coverage
- mature model-development guardrails into a more complete operational discipline

---

## 4. Roadmap by Quarter

## 4.1 Q1 2026

### Goal

Set the baseline architecture and choose the first-wave OSS tools.

### Main Outcomes

- `LiteLLM` deployed
- request and token tracking active
- `Moonshot` adopted for scoring and benchmark evidence
- `Presidio` identified as privacy tool choice
- model-development remediation logic clarified

### Status

`Mostly Done`

### Backlog Recap by Sub-category

| Sub-category | Q1 2026 Backlog Recap | Status |
|---|---|---|
| Observability and Monitoring | deploy `LiteLLM` and track requests and tokens | `Done` |
| Adversarial Attacks Guardrails | establish baseline gateway-first blocking posture | `Done / Partial` |
| Data Privacy Guardrails | choose `Presidio` as preferred privacy framework | `Planned / Partial` |
| Hallucination / Truthfulness Guardrails | use `Moonshot` unsupported-claims baseline | `Done` |
| Undesirable Content Guardrails | define harmful-content restriction direction | `Done / Partial` |
| Guard Model | keep non-default posture; avoid heavy always-on moderation model | `Done` |

---

## 4.2 Q2 2026

### Goal

Operationalize first-wave controls and make them traceable.

### Main Outcomes Target

- `LiteLLM` metadata linked to model-development run context
- privacy controls operational
- adversarial baseline controls strengthened
- first answer-grounding checks introduced
- harmful-content restrictions improved with reviewable evidence

### Backlog by Sub-category

| Sub-category | Q2 2026 Priority Backlog | Target Outcome |
|---|---|---|
| Observability and Monitoring | add guardrail event logging | know which filters and policies were active |
| Observability and Monitoring | add error logging and reliability monitoring | improve runtime stability |
| Observability and Monitoring | attach model version and run metadata to gateway telemetry | improve traceability |
| Adversarial Attacks Guardrails | add system prompt extraction blocking | reduce prompt leakage risk |
| Adversarial Attacks Guardrails | add data exfiltration pattern blocking | reduce extraction risk |
| Adversarial Attacks Guardrails | add malicious code and SQL prompt blocking | strengthen baseline protection |
| Adversarial Attacks Guardrails | add prompt-risk scoring and evidence visibility | make attack findings reviewable |
| Data Privacy Guardrails | integrate `Presidio` PII detection | operational privacy baseline |
| Data Privacy Guardrails | add sensitive-entity detection | broader privacy coverage |
| Data Privacy Guardrails | add input and output masking or redaction | reduce model-path exposure |
| Data Privacy Guardrails | add privacy-aware log redaction | reduce log leakage risk |
| Hallucination / Truthfulness Guardrails | add answer grounding checks | move beyond score-only evaluation |
| Hallucination / Truthfulness Guardrails | add factuality review workflow | structured review of unsupported claims |
| Undesirable Content Guardrails | improve hate and toxic-language restriction using local rules | stronger harmful-content controls |

---

## 4.3 Q3 2026

### Goal

Add stronger runtime controls, localization, and selective second-wave moderation.

### Main Outcomes Target

- confidence and abstention policy introduced
- mitigation retest becomes measurable over time
- localized harmful-content handling is strengthened
- runtime grounding tools are introduced where source-backed answering exists
- selected small guard model evaluation begins for high-risk flows

### Backlog by Sub-category

| Sub-category | Q3 2026 Priority Backlog | Target Outcome |
|---|---|---|
| Observability and Monitoring | add audit traceability across model version, benchmark version, and active profile | stronger auditability |
| Hallucination / Truthfulness Guardrails | add confidence and uncertainty policy | better abstention behavior |
| Hallucination / Truthfulness Guardrails | add mitigation retest tracking | measure factuality improvement after changes |
| Hallucination / Truthfulness Guardrails | track repeated factual consistency across runs | detect unstable answers |
| Hallucination / Truthfulness Guardrails | operationalize `NeMo Guardrails` or `Guardrails AI` for runtime grounding where needed | runtime factuality control |
| Undesirable Content Guardrails | add localized hate and toxic-language packs for Bahasa and code-mixed traffic | improve Indonesia coverage |
| Undesirable Content Guardrails | evaluate stronger runtime moderation on difficult cases | reduce false negatives |
| Guard Model | evaluate `Llama Guard 3 1B` for selected high-risk flows | conditional moderation path |
| Data Privacy Guardrails | map privacy findings to `UU PDP` review flow | regulation-aware privacy review |

---

## 4.4 Q4 2026

### Goal

Harden truthfulness and cost controls for near-production model paths.

### Main Outcomes Target

- retrieval-aware truthfulness controls added where retrieval exists
- run-cost visibility added
- optional second-pass moderation piloted only for justified high-risk paths
- architecture decision made on whether app-layer controls remain sufficient

### Backlog by Sub-category

| Sub-category | Q4 2026 Priority Backlog | Target Outcome |
|---|---|---|
| Observability and Monitoring | add cost visibility and run-cost estimates | support efficiency review |
| Hallucination / Truthfulness Guardrails | implement retrieval-aligned truthfulness controls | stronger grounded answers |
| Guard Model | pilot optional second-pass moderation on selected paths only | low-cost selective guard-model use |
| Guard Model | validate quantized `Llama Guard 3 1B` deployment options | practical low-resource moderation |
| Architecture Decision | review whether wrapper-first controls are enough | decide on escalation to model improvement |

---

## 4.5 Q1 2027

### Goal

Expand long-tail and high-complexity model-risk handling after the baseline is stable.

### Main Outcomes Target

- heavier multi-turn attack scenarios influence model-side controls
- broader restricted-content coverage is considered
- more mature model-improvement decisions become possible

### Backlog by Sub-category

| Sub-category | Q1 2027 Priority Backlog | Target Outcome |
|---|---|---|
| Adversarial Attacks Guardrails | learn from heavier multi-turn red-team outputs and reflect them into runtime controls | stronger advanced-attack handling |
| Undesirable Content Guardrails | expand long-tail harmful-content coverage | broader moderation maturity |
| Model Improvement | decide where fine-tuning or provider change is justified | targeted weight-level improvement only where wrapper stack is insufficient |

---

## 5. Quarterly Recap by Sub-category

## 5.1 Observability and Monitoring

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | deploy `LiteLLM`; track requests and tokens |
| `Q2 2026` | add guardrail event logging, reliability monitoring, and run linkage |
| `Q3 2026` | add audit traceability across versions and profiles |
| `Q4 2026` | add cost visibility and run-cost estimates |

## 5.2 Adversarial Attacks Guardrails

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | establish baseline block-first gateway posture |
| `Q2 2026` | add prompt extraction, exfiltration, and malicious-command blocking |
| `Q3 2026` | strengthen evidence visibility and localized hardening |
| `Q1 2027` | adapt advanced multi-turn red-team lessons into runtime controls |

## 5.3 Data Privacy Guardrails

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | choose `Presidio` direction |
| `Q2 2026` | implement PII detection, sensitive-entity detection, masking, redaction, and log privacy |
| `Q3 2026` | connect privacy findings to `UU PDP` review workflow |
| `Q4 2026` | refine recognizers and reduce false positives where needed |

## 5.4 Hallucination / Truthfulness Guardrails

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | baseline unsupported-claims scoring via `Moonshot` |
| `Q2 2026` | add answer grounding checks and factuality review workflow |
| `Q3 2026` | add confidence policy, mitigation retest, repeated consistency tracking, and runtime grounding tools |
| `Q4 2026` | implement retrieval-aligned truthfulness for retrieval-backed apps |

## 5.5 Undesirable Content Guardrails

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | define harmful-content restriction direction |
| `Q2 2026` | improve hate and toxic-language restriction with rules |
| `Q3 2026` | localize moderation for Indonesian and code-mixed traffic |
| `Q4 2026` | review whether targeted runtime moderation model usage is justified |
| `Q1 2027` | broaden long-tail harmful-content handling |

## 5.6 Guard Model

| Quarter | Backlog Recap |
|---|---|
| `Q1 2026` | keep guard model non-default |
| `Q2 2026` | continue wrapper-first posture |
| `Q3 2026` | evaluate `Llama Guard 3 1B` for selected high-risk flows |
| `Q4 2026` | pilot optional second-pass moderation on selected paths only |

---

## 6. Model-Development Decision Rules by Quarter

## Q1-Q2 2026

- stay wrapper-first
- prefer `LiteLLM`, `Presidio`, deterministic rules, and benchmark retest
- do not escalate to guard model or model replacement too early

## Q3 2026

- introduce stronger runtime controls for `5.3` and `5.4` where evidence shows baseline controls are insufficient
- use `NeMo Guardrails` or `Guardrails AI` for grounding-oriented runtime controls in `5.3`
- evaluate `Llama Guard 3 1B` for selected high-risk `5.4` flows

## Q4 2026

- if retrieval-backed truthfulness still fails, review whether the issue is retrieval quality, answer contract design, or main-model quality
- if localized harmful-content moderation still fails, review whether custom tuning or stronger classifier choice is needed

## Q1 2027

- escalate to fine-tuning, provider change, or targeted model replacement only where accumulated evidence shows the wrapper stack is not enough

---

## 7. LiteLLM-Specific Model Development Roadmap

Because `LiteLLM` is already deployed, its roadmap should be tracked as active work.

| Quarter | LiteLLM Step | Why It Matters |
|---|---|---|
| `Q1 2026` | deploy as gateway and request or token tracking layer | baseline observability |
| `Q2 2026` | add model version, run linkage, and guardrail metadata | useful evidence chain |
| `Q3 2026` | improve profile visibility, review linkage, and localized policy handling | stronger operational control |
| `Q4 2026` | support cost visibility and targeted second-pass routing if needed | better optimization and selective moderation |

Recommended current-status wording:

- `LiteLLM` is already deployed
- current usage includes request tracking and token tracking
- next work is metadata enrichment, profile linkage, and evidence integration

---

## 8. Final Recommendation

The practical `AIModelDev` roadmap should be:

1. keep `2026 H1` focused on wrapper-first controls and traceability
2. use `2026 Q3` for runtime grounding, localization, and selected guard-model evaluation
3. use `2026 Q4` to decide whether model-level escalation is actually justified
4. keep `2027` model-improvement work targeted and evidence-driven rather than default

If reduced to one sentence:

- `AIModelDev` should spend most of `2026` making guardrails, privacy, grounding, and moderation operational before changing the main model itself.

