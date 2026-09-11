# AI Sandbox Taxonomy: Current and Future Execution 2026

Last updated: 2026-04-07

Related documents:

- [AI_Sandbox_Q1_2026_Progress_Report.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\AI_Sandbox_Q1_2026_Progress_Report.md)
- [AI_Sandbox_Technology_Stack.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\AI_Sandbox_Technology_Stack.md)
- [AI_Sandbox_Standards_Mapping_and_Gap_Analysis.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\AI_Sandbox_Standards_Mapping_and_Gap_Analysis.md)
- [Indonesian_Sandbox_Localization_Guide.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Indonesian_Sandbox_Localization_Guide.md)
- [Indonesia_Verify_Blueprint.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Indonesia_Verify_Blueprint.md)
- [AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md](D:\Work\PAM\SecurityAI\AIModelDev\AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md)
- [AI_Sandbox_Architecture_Taxonomy_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Architecture_Taxonomy_2026.md)

---

## 1. Purpose

This document focuses only on `5. AI Sandbox Taxonomy`.

It translates the sandbox architecture into an execution view that is grounded in:

- what is already done in Q1
- what should be built next
- what tools are reliable enough for MVP
- what remains open-source or zero-cost
- what stack layer and implementation language each item belongs to

This document does not repeat the full `AI Model Development` taxonomy. It assumes that the model-side remediation work already exists and focuses on the sandbox side:

- governance
- reporting and assurance
- advanced red team
- test modules
- reliability and delivery constraints

---

## 2. Current Progress Baseline From Q1

The following items are already materially established from the Q1 report:

- `AI Sandbox` is defined as an internal evidence and assurance workspace
- core workflow scope is clear:
  - model registration
  - endpoint validation
  - benchmark execution
  - result inspection
  - history and comparison
  - review gate
  - promotion eligibility
- `LiteLLM` and `Moonshot` are the active technical foundation
- table-first review UX, filtering, and prompt or response inspection already exist in frontend direction
- Cloudflare Pages deployment path for the frontend is already validated
- Indonesia-specific benchmark direction is already documented
- standards mapping to `OWASP LLM Top 10`, `ISO/IEC 42001`, `NIST AI RMF`, and `UU PDP` is already framed

This means the sandbox taxonomy should not start from zero. It should start from:

- `Moonshot` as the MVP benchmark engine
- `LiteLLM` as the access and control layer
- `FastAPI` and `PostgreSQL` as the application backbone
- `Next.js` plus `TypeScript` as the internal UI surface

---

## 3. Reliability and OSS Positioning

## What is reliable enough for MVP now

These are the strongest sandbox-side choices for an OSS or low-cost MVP:

- `Moonshot`
  - strong as the benchmark engine
  - modular, machine-readable, evidence-oriented
  - good for repeatable recipe-based execution
- `LiteLLM`
  - strong as gateway, normalization, and policy-profile layer
  - not the benchmark engine itself
- `PostgreSQL`
  - strong as source of truth for models, runs, results, review states, and comparison history
- `FastAPI`
  - strong fit because the benchmark ecosystem is Python-heavy
- `Next.js` plus `TypeScript`
  - strong fit for role-aware internal UI and evidence review
- `Presidio`
  - strongest low-cost privacy and PII support for sandbox-side checks and evidence handling

## What is useful but should be second-wave

- `Garak`
  - strong OSS choice for adversarial expansion
  - should follow the core `Moonshot` baseline, not replace it
- localized Indonesia benchmark packs
  - strategically important
  - practical, but require data preparation and human review
- standards mapping workflow
  - important for internal assurance
  - should be added after the result schema is stable

## What should stay lower until the sandbox baseline is stable

- `PyRIT`
  - useful, but higher operational complexity
- `DeepEval`
  - useful later for application or agent evaluation
- partner guardrails
  - not aligned with low-cost MVP-first posture
- large moderation or safety models
  - not aligned with current compute and simplicity goals

---

## 4. Stack Layers and Languages

| Stack Layer | Main Purpose | Current or Planned Tooling | Main Language |
|---|---|---|---|
| UI layer | review UI, role flow, report views, comparison | `Next.js`, `TypeScript` | `TypeScript` |
| API layer | model intake, run orchestration, decision workflow, comparison API | `FastAPI` | `Python` |
| Gateway and control layer | endpoint normalization, policy-profile metadata, future routing controls | `LiteLLM` | `Python` |
| Benchmark layer | baseline benchmark recipes and machine-readable evidence | `Moonshot` | `Python` |
| Privacy layer | PII detection, masking, redaction support | `Presidio` | `Python` |
| Adversarial expansion layer | deeper prompt-attack testing after baseline | `Garak`, later `PyRIT` | `Python` |
| Data layer | models, runs, results, findings, review states, history | `PostgreSQL` | SQL plus backend access in `Python` |
| Artifact layer | benchmark artifacts, raw outputs, versioned evidence | object storage or structured file-based storage | storage layer, not language-specific |
| Standards and assurance layer | standards mapping, evidence tagging, review workflow | internal workflow and report templates | mixed: `TypeScript`, `Python`, Markdown, CSV |

---

## 5. AI Sandbox Taxonomy Execution Matrix

### 5.1 Governance

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Governance | Policy Controls | define policy categories by risk domain | partially defined in planning | internal policy matrix tied to benchmark modules and guardrail profiles | medium to high if kept simple | zero-cost internal workflow | backend plus review workflow | `Python` plus Markdown | `P0` | `Q2 2026` | `Low` |
| Governance | Policy Controls | map controls to active filter or rule profile | planned, not complete | store active `LiteLLM` filters, rules, and benchmark profile per run | high if stored with run metadata | low-cost | gateway plus backend plus database | `Python` | `P1` | `Q2 2026` | `Medium` |
| Governance | Model Review | reviewer inspects evidence and run history | direction established in Q1 | sandbox reviewer flow with scorecards, findings, prompt or response inspection, and history | high for MVP | low-cost | UI plus backend | `TypeScript` plus `Python` | `P0` | `Q2 2026` | `Medium` |
| Governance | Model Review | reviewer records decision rationale | partly planned | reviewer notes linked to model version, run ID, and evidence references | high if schema is explicit | low-cost | UI plus backend plus database | `TypeScript` plus `Python` | `P1` | `Q2 2026` | `Medium` |
| Governance | Release Discipline | tie review to model version and benchmark version | planned, important blocker | version-aware release review policy and decision states | high if enforced in schema | low-cost | backend plus database | `Python` | `P1` | `Q2 2026` | `Medium` |
| Governance | Standards Mapping | map findings to `OWASP LLM Top 10`, `NIST AI RMF`, `ISO/IEC 42001`, `UU PDP`, local ethics | documented in planning, not operationalized | evidence tags plus standards crosswalk worksheet and review checklist | medium | zero-cost internal process with low-cost implementation | backend plus reporting workflow | `Python`, Markdown, CSV | `P2` | `Q3 2026` | `Medium` |

### 5.2 Reporting and Assurance

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reporting and Assurance | Assessment Rating | summarize risk posture by module and run | Q1 foundation exists | score summary in sandbox UI using normalized run results | high | low-cost | UI plus backend | `TypeScript` plus `Python` | `P0` | `Q2 2026` | `Low` |
| Reporting and Assurance | Findings | maintain finding summary and evidence details | partly established in review UX | structured findings register per run and per model version | medium to high | low-cost | backend plus database plus UI | `Python` plus `TypeScript` | `P1` | `Q3 2026` | `Medium` |
| Reporting and Assurance | Internal Compliance Report | create internal assurance package, not external certification | planning exists | report export from normalized results plus reviewer notes and standards tags | medium | low-cost | backend plus report templates | `Python`, Markdown, HTML | `P2` | `Q3 2026` | `Medium` |
| Reporting and Assurance | Review Gate | explicit release states such as approved, approved with controls, restricted, reassessment required | core product need, not finished | decision-state workflow stored in database and shown in UI | high if simple and explicit | low-cost | backend plus UI | `Python` plus `TypeScript` | `P0` | `Q2 2026` | `Medium` |
| Reporting and Assurance | Promotion Eligibility | controlled output for downstream publication or trusted reuse | planned, not final | trusted summary payload after review gate only | medium | low-cost | backend API layer | `Python` | `P2` | `Q4 2026` | `Medium` |

### 5.3 Advanced Red Team

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Advanced Red Team | Adversarial Attack Packs | structured attack packs beyond the baseline benchmark | planned future layer | `Garak` as first OSS expansion after stable `Moonshot` baseline | medium to high if scoped carefully | open-source and low-cost | benchmark extension layer | `Python` | `P1` | `Q3 2026` | `Medium` |
| Advanced Red Team | Multi-turn Conversational Red Team | multi-step adversarial attack conversation chains | not started | `PyRIT` only after result schema, logging, and history are stable | lower for MVP, higher later | open-source but higher ops cost | benchmark extension layer | `Python` | `P3` | `Q1 2027` | `High` |
| Advanced Red Team | Local Threat Scenarios | Indonesia-specific or enterprise-specific attack scenarios | research direction exists | curated local scenario packs linked to benchmark modules and review severity | medium | zero-cost internal data work | benchmark and dataset layer | `Python`, CSV, JSON | `P2` | `Q3 2026` | `Medium` |
| Advanced Red Team | Retest Loop | rerun failed categories after mitigation | core trust pattern already recognized | run comparison, lineage, and reassessment workflow in sandbox | high if built into run history | low-cost | backend plus UI plus database | `Python` plus `TypeScript` | `P1` | `Q2 2026` | `Medium` |

### 5.4 Test Modules

#### 5.4.1 Adversarial Attacks

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Test Modules | Adversarial Attacks | prompt injection | already part of current benchmark direction | `Moonshot` baseline now, linked to `LiteLLM` filter evidence | high | OSS plus already adopted tooling | benchmark plus gateway plus review | `Python` | `P0` | `Done` | `Low` |
| Test Modules | Adversarial Attacks | jailbreak attempts | baseline exists conceptually, expansion needed | `Moonshot` first, `Garak` next | medium to high | open-source and low-cost | benchmark layer | `Python` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Adversarial Attacks | system prompt extraction | planned but not complete | prompt attack cases plus pattern detection and run tagging | medium | low-cost | benchmark plus gateway plus backend | `Python` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Adversarial Attacks | sensitive data exfiltration through prompts | planned but not complete | benchmark cases plus `LiteLLM` policy evidence and later `Presidio` cross-checks | medium | low-cost | benchmark plus privacy plus backend | `Python` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Adversarial Attacks | malicious code or SQL prompt attempts | planned but not complete | benchmark and filter combination with explicit failure reasons | medium | low-cost | benchmark plus gateway | `Python` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Adversarial Attacks | retest comparison | future execution detail | run-history comparison after mitigation | high once history baseline exists | low-cost | backend plus UI | `Python` plus `TypeScript` | `P1` | `Q2 2026` | `Medium` |

#### 5.4.2 Data Privacy

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Test Modules | Data Privacy | PII leakage | strong planned fit, not yet complete | `Presidio` plus benchmark prompts for personal data exposure | high | strong OSS and low-cost fit | privacy plus benchmark plus backend | `Python` | `P0` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | confidential data disclosure | planned | benchmark prompts for secrets, business-sensitive data, and restricted information | medium | low-cost | benchmark plus backend | `Python` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | masking validation | planned | assert that sensitive values are masked before storage or display | medium to high | low-cost | privacy plus backend plus UI | `Python` plus `TypeScript` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | privacy logging checks | planned | verify that logs do not store raw sensitive content | high if structured early | low-cost | observability plus backend | `Python` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Data Privacy | regulation-linked privacy review | research already exists in planning | map privacy results to `UU PDP` review guidance | medium | zero-cost internal process | reporting and governance | `Python`, Markdown | `P2` | `Q3 2026` | `Medium` |

#### 5.4.3 Hallucination / Truthfulness

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Test Modules | Hallucination / Truthfulness | unsupported claims | already part of current benchmark direction | `Moonshot` truthfulness cases as MVP baseline | high | OSS and already aligned | benchmark layer | `Python` | `P0` | `Done` | `Low` |
| Test Modules | Hallucination / Truthfulness | answer grounding checks | planned next step | rubric-driven or retrieval-aware checks with evidence references | medium | low-cost | benchmark plus review workflow | `Python` | `P1` | `Q2 2026` | `Medium` |
| Test Modules | Hallucination / Truthfulness | repeated factual consistency | future enhancement | compare answers across repeated runs and versions | medium | low-cost | backend plus history layer | `Python` | `P2` | `Q3 2026` | `Medium` |
| Test Modules | Hallucination / Truthfulness | mitigation retest | core future work | compare pre- and post-mitigation benchmark output | medium to high | low-cost | benchmark plus history | `Python` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Hallucination / Truthfulness | retrieval-aligned truthfulness | later, after retrieval layer is in scope | keep as future linked work, not current sandbox MVP blocker | lower for current MVP | low-cost but higher complexity | retrieval plus evaluation | `Python` | `P2` | `Q4 2026` | `High` |

#### 5.4.4 Undesirable Content

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Test Modules | Undesirable Content | violence | baseline policy direction exists | `LiteLLM` content filters plus benchmark prompts | high | low-cost and already aligned | gateway plus benchmark | `Python` | `P0` | `Done` | `Low` |
| Test Modules | Undesirable Content | self-harm | baseline policy direction exists | `LiteLLM` filters plus benchmark prompts | high | low-cost and already aligned | gateway plus benchmark | `Python` | `P0` | `Done` | `Low` |
| Test Modules | Undesirable Content | hate speech or toxic language | localized expansion needed | benchmark prompts plus local-language policy rules | medium | low-cost with internal dataset work | benchmark plus local data layer | `Python` | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Undesirable Content | unsafe specialized advice | good current fit through policy filters | benchmark prompts plus denied medical, legal, and financial advice controls | high | low-cost | gateway plus benchmark | `Python` | `P0` | `Done` | `Low` |
| Test Modules | Undesirable Content | sexual or other restricted unsafe content | valid but less mature in current plan | keep after core harmful-content taxonomy is stable | lower for current MVP | low-cost but needs policy refinement | benchmark plus policy workflow | `Python` | `P2` | `Q1 2027` | `High` |

#### 5.4.5 Local Factuality

| Category | Sub-category | Detailed Feature | Current Status | Recommended Tool or Approach | Reliability for MVP | OSS / Cost Posture | Stack Layer | Main Language | Priority | Roadmap | Effort |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Test Modules | Local Factuality | `SARA` Indonesia | research direction established | custom benchmark set and rubric based on Indonesia-specific sensitivity | medium | zero-cost internal dataset work | benchmark dataset layer | `Python`, CSV, JSON | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | toxic Indonesian content | research direction established | localized harmful-language benchmark pack | medium | zero-cost internal dataset work | benchmark dataset layer | `Python`, CSV, JSON | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | Indonesian facts | research direction established | custom factual dataset covering Indonesian public facts and context | medium | zero-cost internal dataset work | benchmark dataset layer | `Python`, CSV, JSON | `P1` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | Indonesia regulation compliance | research direction established | prompts and rubrics linked to local regulation expectations | medium | zero-cost internal dataset work | benchmark and governance layer | `Python`, Markdown | `P2` | `Q3 2026` | `Medium` |
| Test Modules | Local Factuality | local ethics context | research direction established | benchmark set reflecting local norms and ethics context | medium | zero-cost internal dataset work | benchmark and governance layer | `Python`, CSV, Markdown | `P2` | `Q3 2026` | `Medium` |

---

## 6. Reliability View by Tool

| Tool | Sandbox Role | Reliability Judgment for MVP | Why |
|---|---|---|---|
| `Moonshot` | core benchmark engine | `High` | already chosen as MVP benchmark foundation, recipe-based, evidence-oriented, and aligned with current planning |
| `LiteLLM` | gateway and control layer | `High` | already deployed and central to endpoint normalization and policy metadata |
| `Presidio` | privacy and masking support | `Medium to High` | strong OSS privacy tool, but needs careful recognizer setup for Indonesia context |
| `Garak` | adversarial expansion | `Medium` | strong OSS option, but should come after stable baseline runs and evidence schema |
| `PyRIT` | advanced multi-turn red team | `Low for MVP`, `Medium later` | useful, but too heavy for first-wave sandbox delivery |
| `PostgreSQL` | run and evidence store | `High` | stable and proven data backbone for history, comparison, and review states |
| `Next.js` plus `TypeScript` | internal review UI | `High` | already aligned with Q1 frontend progress and role-aware UI patterns |
| `FastAPI` | API and orchestration layer | `High` | Python-native fit for benchmark ecosystem and current stack |

---

## 7. Recommended Ordering for AI Sandbox Delivery

Recommended practical order for `5. AI Sandbox Taxonomy`:

1. governance baseline
2. review gate and assessment rating
3. `Moonshot`-backed test modules
4. privacy support with `Presidio`
5. run history and retest loop
6. adversarial expansion with `Garak`
7. local factuality and Indonesia benchmark packs
8. standards mapping and internal assurance reports
9. `PyRIT` or heavier advanced red-team layers

This order matches:

- current progress
- OSS and low-cost posture
- reliability needs
- backend and frontend readiness

---

## 8. Final Recommendation

For the sandbox side, the strongest near-term execution path is:

- keep `Moonshot` as the MVP benchmark engine
- keep `LiteLLM` as the active gateway and control layer
- build governance, review gate, and history around those two foundations
- use `Presidio` as the first privacy-support layer
- expand with `Garak` before `PyRIT`
- invest in Indonesian benchmark packs as a data and rubric problem, not a large-model problem

This keeps the sandbox:

- open-source first
- low-cost first
- reliable enough for MVP
- aligned with the current Q1 foundation and Q2 roadmap

