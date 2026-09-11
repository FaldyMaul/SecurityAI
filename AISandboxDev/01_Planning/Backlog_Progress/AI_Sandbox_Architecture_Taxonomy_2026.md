# AI Sandbox Architecture Taxonomy 2026

Last updated: 2026-04-07

Related documents:

- [AI_Sandbox_Detailed_Architecture_Delivery_Matrix_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Detailed_Architecture_Delivery_Matrix_2026.md)
- [AI_Sandbox_Low_Cost_Reliability_Architecture_Refinement_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Low_Cost_Reliability_Architecture_Refinement_2026.md)
- [Telkom_AI_and_AI_Sandbox_Architecture_Overview_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Telkom_AI_and_AI_Sandbox_Architecture_Overview_2026.md)

---

## 1. Purpose

This document rewrites the baseline architecture image into a validated implementation taxonomy.

It now answers five practical questions:

- is this feature realistically implementable for our MVP
- can we do it with open-source or already deployed tooling
- what should be placed at the top of each category
- what still needs further research
- what is the roadmap timing and effort

This version prioritizes:

- already deployed components
- open-source and no-cost tools
- low-cost implementation paths
- reliable MVP-first sequencing

---

## 2. Validation Rules

Items are now organized using these rules:

- `Implementable Now`
  - already deployed, already adopted, or straightforward to integrate for MVP
- `Implementable with Integration`
  - practical, but needs moderate engineering work or controlled rollout
- `Need Further Research`
  - valid idea, but requires more testing, benchmarking, licensing, or operational design before committing

Priority levels:

- `P0`
  - must-have baseline
- `P1`
  - important next step after baseline
- `P2`
  - useful expansion after core stability
- `P3`
  - long-tail or future option

Roadmap values:

- `Done`
- `Q2 2026`
- `Q3 2026`
- `Q4 2026`
- `Q1 2027`
- `Future`

Effort levels:

- `Low`
- `Medium`
- `High`

---

## 3. Multi-Check Summary

The following options are validated as practical and open-source or already deployed:

- `LiteLLM`
  - already deployed in our environment
  - official docs and GitHub confirm it is an API gateway with logging, routing, retry or fallback support, and per-project customization
- `Moonshot`
  - open-source from AI Verify Foundation
  - modular benchmark and red-team platform with datasets, metrics, and reports
- `Presidio`
  - open-source from Microsoft
  - supports built-in entities, custom recognizers, regex, deny lists, YAML, and ad-hoc recognizers
- `Garak`
  - open-source from NVIDIA
  - focused on LLM vulnerability scanning and supports prompt injection, hallucination, data leakage, toxicity, and jailbreak-oriented probing
- `Llama Guard 3 1B`
  - practical small guard-model option
  - 1B family is more realistic than larger moderation models for limited infrastructure

The following remain valid but should stay lower in the taxonomy for now:

- `PyRIT`
  - open-source, but more complex and operationally heavier than `Garak`
- partner or enterprise guardrails
  - useful for specific gaps, but not the right baseline for a low-cost MVP
- large guard models
  - not aligned with current compute constraints
- `DeepEval`
  - valid for later app or agent evaluation, but not required for current sandbox MVP

---

## 4. AI Model Development Taxonomy

## 4.1 Observability and Monitoring

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Observability and Monitoring | Request logging | log prompt requests, output responses, token usage, and response status | structured application logs and `LiteLLM` request logging | `Implementable Now` | `P0` | `Done` | `Low` |
| Observability and Monitoring | Guardrail event logging | log which filters, policy rules, or guard models were active | `LiteLLM` policy metadata plus backend run metadata | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Observability and Monitoring | Error logging | log timeout, invalid endpoint, worker failure, and benchmark failure states | backend error capture with stable run IDs | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Observability and Monitoring | Reliability monitoring | track health of frontend, backend, `LiteLLM`, workers, and database | health-check endpoints and lightweight operational dashboard | `Implementable Now` | `P0` | `Q2 2026` | `Medium` |
| Observability and Monitoring | Audit traceability | tie model version, benchmark version, guardrail profile, and review decision together | structured metadata in sandbox database | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Observability and Monitoring | Cost visibility | capture token counts and run-cost estimates where possible | lightweight token and run-cost metadata | `Implementable with Integration` | `P2` | `Q4 2026` | `Medium` |

## 4.2 Guardrails

### 4.2.1 Adversarial Attacks Guardrails

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Guardrails | Adversarial Attacks | jailbreak and prompt-injection filtering | `LiteLLM` built-in prompt protection as already deployed baseline | `Implementable Now` | `P0` | `Done` | `Low` |
| Guardrails | Adversarial Attacks | system prompt extraction blocking | `LiteLLM` plus internal regex and prompt-pattern controls | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Guardrails | Adversarial Attacks | data exfiltration pattern blocking | `LiteLLM` plus keyword and regex rules | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Guardrails | Adversarial Attacks | SQL or malicious command prompt blocking | `LiteLLM` plus deny-list and pattern rules | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Guardrails | Adversarial Attacks | code execution blocking | `LiteLLM` policy plus response-side rule checks | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Guardrails | Adversarial Attacks | prompt-risk scoring and evidence visibility | guardrail profile state stored per run for review and comparison | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |

### 4.2.2 Data Privacy Guardrails

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Guardrails | Data Privacy | personally identifiable information detection | `Presidio` with built-in entities and custom recognizers | `Implementable Now` | `P0` | `Q2 2026` | `Medium` |
| Guardrails | Data Privacy | sensitive entity detection | `Presidio` entities plus internal regex rules | `Implementable Now` | `P0` | `Q2 2026` | `Medium` |
| Guardrails | Data Privacy | input masking or redaction | backend masking and pre-storage redaction | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Guardrails | Data Privacy | output masking or redaction | response redaction before review storage when needed | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Guardrails | Data Privacy | privacy-aware log redaction | remove or mask sensitive content in operational logs | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Guardrails | Data Privacy | policy mapping to `UU PDP` | benchmark finding and review mapping to privacy rules | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |

### 4.2.3 Hallucination / Truthfulness Guardrails

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Guardrails | Hallucination / Truthfulness | unsupported claim detection | benchmark-based truthfulness recipes in `Moonshot` | `Implementable Now` | `P0` | `Done` | `Low` |
| Guardrails | Hallucination / Truthfulness | answer grounding checks | curated rubric and retrieval-aware truthfulness checks | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Guardrails | Hallucination / Truthfulness | confidence and uncertainty policy | response templates or policy rules for low-confidence answers | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |
| Guardrails | Hallucination / Truthfulness | factuality review workflow | reviewer evidence check on failed truthfulness cases | `Implementable Now` | `P1` | `Q2 2026` | `Low` |
| Guardrails | Hallucination / Truthfulness | later `RAG` hardening path | retrieval-backed mitigation and retest discipline | `Need Further Research` | `P2` | `Q4 2026` | `High` |

### 4.2.4 Undesirable Content Guardrails

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Guardrails | Undesirable Content | violence content restriction | `LiteLLM` harmful-violence filters | `Implementable Now` | `P0` | `Done` | `Low` |
| Guardrails | Undesirable Content | self-harm content restriction | `LiteLLM` harmful self-harm filters | `Implementable Now` | `P0` | `Done` | `Low` |
| Guardrails | Undesirable Content | child safety protection | `LiteLLM` harmful child-safety filters | `Implementable Now` | `P0` | `Done` | `Low` |
| Guardrails | Undesirable Content | illegal weapons restriction | `LiteLLM` illegal-weapons filters | `Implementable Now` | `P0` | `Done` | `Low` |
| Guardrails | Undesirable Content | hate, toxic, and abusive language restriction | `LiteLLM` plus local rules and later localized test pack | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Guardrails | Undesirable Content | unsafe specialized advice restriction | `LiteLLM` denied medical, legal, and financial advice filters | `Implementable Now` | `P0` | `Done` | `Low` |
| Guardrails | Undesirable Content | competitor or policy-sensitive blocking | keyword blocking and competitor-name blocking where policy requires | `Implementable with Integration` | `P2` | `Q3 2026` | `Low` |

## 4.3 Guard Model

| Category | Sub-category | Detailed Feature | Recommended Tool or Model | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Guard Model | Small guard model | prompt and response safety classification | `Llama Guard 3 1B` family | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Guard Model | Quantized deployment | low-resource moderation inference | INT4 or quantized `Llama Guard 3 1B` | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Guard Model | Optional second-pass moderation | only run on high-risk flows or failed built-in filter cases | deploy only if built-in `LiteLLM` filters plus rules are insufficient | `Need Further Research` | `P2` | `Q4 2026` | `Medium` |
| Guard Model | Non-default posture | avoid heavy always-on moderation stack | do not use 7B or larger guard model as baseline | `Implementable Now` | `P0` | `Done` | `Low` |

---

## 5. AI Sandbox Taxonomy

## 5.1 Governance

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Governance | Policy Controls | define policy categories by risk domain | internal policy matrix tied to benchmark domains | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Governance | Policy Controls | map controls to active guardrail profile | store active filter or rule profile per run | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Governance | Model Review | reviewer inspects evidence and run history | sandbox review workflow | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Governance | Model Review | reviewer records decision rationale | reviewer notes linked to run and model version | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Governance | Release Discipline | tie review to model version and benchmark version | release-candidate review discipline | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Governance | Standards Mapping | map findings to standards and regulation | standards-mapping worksheet and evidence tags | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |

## 5.2 Reporting and Certification

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Reporting and Certification | Assessment Rating | summarize risk posture by module and run | score summary and assessment rating in sandbox UI | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Reporting and Certification | Findings | maintain finding summary and evidence details | structured findings register | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Reporting and Certification | Compliance Report | create internal assurance report package | sandbox report export plus QA or PM template | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |
| Reporting and Certification | Review Gate | reviewer marks approved, approved with controls, restricted, or reassessment required | decision-state workflow in sandbox | `Implementable Now` | `P0` | `Q2 2026` | `Low` |
| Reporting and Certification | Non-claim discipline | avoid overclaiming certification | use internal assurance language, not formal certification language | `Implementable Now` | `P0` | `Done` | `Low` |

## 5.3 Advanced Red Team

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Advanced Red Team | Adversarial attack packs | structured adversarial probes and detectors | `Garak` attack packs | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Advanced Red Team | Multi-turn conversational attack simulation | more realistic attack conversation chains | `PyRIT` | `Need Further Research` | `P3` | `Q1 2027` | `High` |
| Advanced Red Team | Local threat scenarios | Indonesia-specific or enterprise-specific attack cases | internal local threat scenario packs | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |
| Advanced Red Team | Retest loop | rerun failed categories after mitigation | sandbox reassessment workflow | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |

## 5.4 Test Modules

### 5.4.1 Adversarial Attacks

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Test Modules | Adversarial Attacks | prompt injection | `Moonshot` recipes plus `LiteLLM` prompt filters | `Implementable Now` | `P0` | `Done` | `Low` |
| Test Modules | Adversarial Attacks | jailbreak attempts | `Moonshot` baseline now, `Garak` expansion next | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Adversarial Attacks | system prompt extraction | prompt attack tests plus rule-based detection | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Adversarial Attacks | sensitive data exfiltration through prompts | benchmark cases plus `LiteLLM` exfiltration filters | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Adversarial Attacks | malicious code or SQL prompt attempts | benchmark and filter combination | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Adversarial Attacks | attack-pack retest workflow | compare run history before and after mitigation | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |

### 5.4.2 Data Privacy

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Test Modules | Data Privacy | PII leakage | `Presidio` plus benchmark prompts for personal data exposure | `Implementable Now` | `P0` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | confidential data disclosure | benchmark cases covering secrets, business-sensitive data, and restricted information | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | masking validation | ensure sensitive fields are masked or redacted correctly | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | privacy logging checks | verify logs do not expose sensitive values | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | regulation-linked privacy review | map privacy findings to `UU PDP` expectations | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |

### 5.4.3 Hallucination / Truthfulness

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Test Modules | Hallucination / Truthfulness | unsupported claims | `Moonshot` truthfulness benchmark cases | `Implementable Now` | `P0` | `Done` | `Low` |
| Test Modules | Hallucination / Truthfulness | answer grounding checks | verify answer support against trusted source or rubric | `Implementable with Integration` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Hallucination / Truthfulness | retrieval-aligned truthfulness | later `RAG`-aligned evaluation where retrieval exists | `Need Further Research` | `P2` | `Q4 2026` | `High` |
| Test Modules | Hallucination / Truthfulness | factual consistency across runs | compare repeated answers over reassessment cycles | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |
| Test Modules | Hallucination / Truthfulness | mitigation retest | verify whether changes reduce hallucination rates | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |

### 5.4.4 Undesirable Content

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Test Modules | Undesirable Content | violence | harmful-content benchmark cases plus `LiteLLM` filters | `Implementable Now` | `P0` | `Done` | `Low` |
| Test Modules | Undesirable Content | self-harm | harmful self-harm cases plus filter checks | `Implementable Now` | `P0` | `Done` | `Low` |
| Test Modules | Undesirable Content | hate speech or toxic language | local and global toxic-content benchmark prompts | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Undesirable Content | sexual or unsafe restricted content | safety benchmark pack and review policy | `Need Further Research` | `P2` | `Q1 2027` | `High` |
| Test Modules | Undesirable Content | unsafe specialized advice | medical, legal, and financial advice restriction tests | `Implementable Now` | `P0` | `Done` | `Low` |

### 5.4.5 Local Factuality

| Category | Sub-category | Detailed Feature | Recommended Tool or Approach | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Test Modules | Local Factuality | `SARA` Indonesia | benchmark set for ethnicity, religion, race, and inter-group sensitivity | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | toxic Indonesian content | localized harmful-language and harmful-content prompts | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | Indonesian facts | factual benchmark covering Indonesian public facts and context | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | Indonesia regulation compliance | prompts linked to Indonesia regulatory and policy expectations | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | local ethics context | benchmark set reflecting local norms and ethical sensitivities | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |

---

## 6. Standards and Regulatory Reference Taxonomy

| Category | Sub-category | Detailed Feature | Role in Sandbox | Validation Status | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|
| Standards and Regulation | `OWASP LLM Top 10` | prompt injection, insecure output handling, data leakage, excessive agency, and related risk themes | security risk mapping reference | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Standards and Regulation | `ISO/IEC 42001` | AI management system, governance, control, and evidence discipline | governance and assurance reference | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |
| Standards and Regulation | `NIST AI RMF` | govern, map, measure, and manage risk framing | risk management reference | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |
| Standards and Regulation | `UU PDP` | personal-data protection obligations | privacy and data-handling reference | `Implementable with Integration` | `P1` | `Q3 2026` | `Medium` |
| Standards and Regulation | Local Ethics Context | Indonesia-specific ethical, cultural, and social sensitivity | local risk and review reference | `Implementable with Integration` | `P2` | `Q3 2026` | `Medium` |

---

## 7. Suggested Full Box Labels for the Diagram

If this is redrawn visually, these are the recommended full labels.

## AI Model Development

- `Observability and Monitoring`
- `Guardrails`
- `Small Guard Model (<= 2B, optional)`

## Guardrails inner columns

- `Adversarial Attacks`
- `Data Privacy`
- `Hallucination / Truthfulness`
- `Undesirable Content`

## AI Sandbox

- `Governance`
- `Reporting and Certification`
- `Advanced Red Team`
- `Test Modules`

## Governance inner labels

- `Policy Controls`
- `Model Review`
- `Release Discipline`
- `Standards Mapping`

## Reporting and Certification inner labels

- `Assessment Rating`
- `Findings`
- `Compliance Report`
- `Review Gate`

## Advanced Red Team inner labels

- `Garak Attack Packs`
- `PyRIT`
- `Local Threat Scenarios`

## Test Module inner labels

- `Adversarial Attacks`
- `Data Privacy`
- `Hallucination / Truthfulness`
- `Undesirable Content`
- `Local Factuality`

---

## 8. Recommended Ordering by Practicality

Top of each category should favor:

1. already deployed and open-source
2. easy integration with low operational burden
3. low-cost reliability baseline

Current preferred order:

- `LiteLLM`
- `Moonshot`
- `Presidio`
- internal rule-based controls
- `Garak`
- `Llama Guard 3 1B`
- `PyRIT`
- partner guardrails

---

## 9. Source Validation Notes

Validation used for this refinement:

- `LiteLLM` official docs and GitHub indicate API gateway support, consistent interface, retry or fallback logic, logging, cost tracking, and per-project customization
- `Moonshot` official GitHub indicates open-source modular benchmarking, red-teaming, datasets, metrics, web UI, CLI, APIs, HTML reports, and JSON results
- `moonshot-data` official GitHub indicates centralized connectors, datasets, metrics, prompt templates, and attack modules
- `Presidio` official docs and GitHub indicate open-source PII detection, masking, anonymization, supported entities, custom recognizers, regex, deny lists, YAML, and ad-hoc recognizers
- `Garak` official GitHub indicates open-source LLM vulnerability scanning with prompt injection, hallucination, data leakage, toxicity, jailbreak, and REST or `LiteLLM` target support
- `PyRIT` official GitHub indicates open-source generative-AI risk identification and red-teaming, but with higher operational complexity
- `Llama Guard 3 1B` official model card indicates 1B safety-classification model designed for prompt and response moderation with lower deployment cost than larger predecessors

---

## 10. Final Recommendation

Use this version of the taxonomy for implementation planning, not the older placeholder version.

The main planning rule is:

- if it is already deployed or clearly open-source and practical, keep it near the top
- if it is valid but heavier or less proven for our environment, keep it lower and mark it as `Need Further Research`

This makes the taxonomy usable as both:

- an architecture description
- a practical MVP prioritization tool

