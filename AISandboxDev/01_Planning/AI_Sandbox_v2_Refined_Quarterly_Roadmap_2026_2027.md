# AI Sandbox v2 Refined Quarterly Roadmap 2026-2027

Last updated: 2026-04-10

Related documents:

- [AI_Sandbox_Q1_2026_Progress_Report.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\AI_Sandbox_Q1_2026_Progress_Report.md)
- [AI_Sandbox_Build_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Build_Plan_2026.md)
- [AI_Sandbox_Taxonomy_Current_and_Future_Execution_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Taxonomy_Current_and_Future_Execution_2026.md)
- [AI_Model_Development_v3_Refined_Quarterly_Roadmap_2026_2027.md](D:\Work\PAM\SecurityAI\AIModelDev\AI_Model_Development_v3_Refined_Quarterly_Roadmap_2026_2027.md)
- [FE_Agent_Work_Documentation_2026-04-02.md](D:\Work\PAM\SecurityAI\AISandboxDev\03_Frontend\FE_Agent_Work_Documentation_2026-04-02.md)

---

## 1. Purpose

This document updates the quarterly roadmap for developing `AI Sandbox` from `Q1 2026` to `Q1 2027`.

It is aligned to:

- the current Q1 progress baseline
- the existing sandbox build plan
- the current sandbox taxonomy and tool choices
- the refined `AI Model Development` roadmap
- the latest frontend delivery progress
- the final slide-based plan

This roadmap separates the sandbox backlog into five execution categories:

- `Governance`
- `Reporting & Certification`
- `Advanced Red Team`
- `AI Sandbox Development`
- `Test Modules`

Important product positioning:

- `AI Sandbox` remains the internal trust and evaluation workspace
- `LiteLLM` remains the active access and runtime control layer
- `Moonshot` remains the MVP benchmark engine
- we are building `AI Sandbox` as our own product
- the sandbox UI remains our own workflow, review, and decision layer
- this roadmap does not turn `Moonshot Web UI` or `LiteLLM UI` into the main product surface

---

## 2. Main Goal by Quarter

## Q1 2026 Main Goal

Establish the `AI Sandbox` product baseline, benchmark foundation, and internal review direction.

## Q2 2026 Main Goal

Complete the internal MVP workflow from model intake to review gate using our own sandbox UI and backend orchestration.

## Q3 2026 Main Goal

Deepen trust coverage with stronger evidence, localized Indonesia benchmark packs, and first-wave adversarial expansion.

## Q4 2026 Main Goal

Harden the sandbox into a more reliable internal assurance platform with stronger reporting, reassessment, and downstream-ready outputs.

## Q1 2027 Main Goal

Mature the sandbox into a localization-aware and policy-grounded assurance platform with deeper advanced testing support.

---

## 3. Roadmap by Quarter

## 3.1 Q1 2026 (`Done`)

### Focus

Foundation, scope clarification, benchmark baseline, and our own UI review baseline.

### Governance

- clarify `AI Sandbox` as an internal evidence and assurance workspace
- define the intended users:
  - `Model Owner`
  - `Model Vendor`
  - `Admin / Reviewer`
- refine the workflow toward:
  - registration
  - endpoint validation
  - benchmark execution
  - result inspection
  - history and comparison
  - review gate
  - promotion eligibility

### Reporting & Certification

- define the sandbox as an evidence and assurance system
- avoid positioning the sandbox as an automatic certification engine
- frame outputs as:
  - technical evidence
  - scorecards
  - findings
  - review records
- create the first risk-register direction for Telkom AI security assessment

### Advanced Red Team

- establish future direction for:
  - `Garak`
  - `PyRIT`
  - related advanced attack layers
- keep `Moonshot` as the current benchmark foundation

### AI Sandbox Development

- deploy `AI Verify Moonshot` as the benchmark application baseline
- deploy an AI sandbox prototype for security test simulation
- establish `LiteLLM` as the primary endpoint abstraction
- establish `Moonshot` as the primary benchmark foundation
- restore table-first results UX
- add category filter tabs
- add `Fail Only` filter
- add prompt and response detail modal
- add copy actions for prompt and response
- add verdict and analysis display per test item
- add expandable result details and findings accordion usage
- validate fixture-backed completed-run review with `run-009`
- validate frontend publishing path through Cloudflare Pages
- mitigate Windows-local Next cache issue using custom dist directory

### Test Modules

- assess Telkom AI using `AI Verify Moonshot` for:
  - adversarial
  - privacy
  - hallucination
- align benchmark direction to `Moonshot` recipe and module structure
- document Indonesian benchmark direction for:
  - `SARA`
  - Bahasa-localized safety
  - `UU PDP`
  - `UU ITE`

### Expected Outcome

- the sandbox has a clear product definition, active stack foundation, a working prototype, and a usable review baseline in our own UI

---

## 3.2 Q2 2026

### Focus

Complete the internal MVP workflow from intake to review gate in our own product.

### Governance

- define the intended users in product terms:
  - `Model Owner`
  - `Reviewer`
- refine the workflow and responsibility boundaries for internal use
- finalize policy categories for the sandbox:
  - adversarial
  - data privacy
  - hallucination or truthfulness
  - undesirable content
  - local assessment
- define reviewer workflow and required decision states:
  - `Approved`
  - `Approved with Controls`
  - `Restricted`
  - `Reassessment Required`
- tie decisions to:
  - model version
  - benchmark version
  - active `LiteLLM` guardrail profile

### Reporting & Certification

- implement assessment-rating structure in the sandbox
- implement findings summary structure
- define review gate behavior and display
- enforce non-claim discipline so outputs are not presented as full formal compliance

### Advanced Red Team

- define how future `Garak` outputs will map into sandbox runs and findings
- keep full advanced red-team scope limited in this quarter
- prepare retest loop design so failed runs can be rerun after mitigation

### AI Sandbox Development

- deploy full `AI Sandbox` MVP with baseline modules
- complete model registration flow
- complete endpoint validation flow
- complete benchmark job orchestration through `Moonshot`
- store run metadata and benchmark artifacts
- show active `LiteLLM` built-in filters or guardrail profile in run evidence
- complete result review flow:
  - findings
  - score summary
  - prompt and response inspection
- complete run history and version comparison baseline
- reduce fixture dependence by aligning frontend and backend contracts
- preserve table-first review UX as the internal review baseline
- add fallback handling for missing or partial sample data

### Test Modules

- complete the first operational modules for:
  - prompt injection
  - privacy and PII leakage
  - unsupported claims baseline
- keep the initial benchmark set lean and operationally stable

### Expected Outcome

- the sandbox supports a full internal MVP path from model intake to structured review decision using our own UI and backend workflow

---

## 3.3 Q3 2026

### Focus

Deepen trust quality, localized evidence, and first-wave adversarial expansion.

### Governance

- add standards mapping into reviewer workflow
- link findings to:
  - `OWASP LLM Top 10`
  - `NIST AI RMF`
  - `ISO/IEC 42001`
  - `UU PDP`
  - local ethics context
- strengthen release discipline through reassessment triggers and model lineage tracking

### Reporting & Certification

- implement structured findings register across runs
- add standards mapping to each process
- improve evidence traceability between:
  - run
  - model version
  - review decision
  - standards mapping

### Advanced Red Team

- add `Garak` as the first open-source adversarial expansion layer
- add local threat scenario packs for Indonesian or enterprise contexts
- start capturing attack-pack evidence inside the sandbox review flow

### AI Sandbox Development

- strengthen API-backed evidence handling
- improve reviewer workflow and report readiness
- build the RBAC and reviewer or red-team procedures needed for internal use
- strengthen API-backed run details to replace fixture-only assumptions

### Test Modules

- build module of harmful and unsafe content using `Llama Guard`
- research and design the Indonesian-localized benchmark library

### Expected Outcome

- the sandbox moves from MVP workflow completion into stronger localized evidence and adversarial depth

---

## 3.4 Q4 2026

### Focus

Operational hardening, reassessment discipline, and downstream-ready evidence outputs.

### Governance

- harden review workflow into a dependable internal assurance checkpoint
- make reassessment cadence explicit for release-candidate models
- strengthen policy handling for approved-with-controls outcomes
- set up the connection to `ModelHub` as the top-layer platform for approved summaries

### Reporting & Certification

- add trusted summary outputs
- improve internal report quality
- separate:
  - internal evidence detail
  - trusted summary output

### Advanced Red Team

- stabilize adversarial retest evidence for promotion decisions
- broaden adversarial retest discipline after mitigation work

### AI Sandbox Development

- improve operational reliability of benchmark runs
- improve artifact handling
- improve cost visibility
- improve internal release readiness

### Test Modules

- expand Indonesian localized benchmark packs for:
  - `SARA`
  - toxic Indonesian content
  - Indonesian facts
  - Indonesia regulation compliance

### Expected Outcome

- the sandbox becomes a more reliable internal assurance platform with stronger reporting, operational discipline, and localized benchmark depth

---

## 3.5 Q1 2027

### Focus

Localization maturity, deeper policy grounding, and broader advanced-testing readiness.

### Governance

- mature long-term analytics, governance workflow quality, and workflow resilience
- improve use-case and intended-use alignment for more mature internal governance

### Reporting & Certification

- harden the review workflow into a dependable internal assurance checkpoint
- improve repeatable standards-aligned evidence packaging

### Advanced Red Team

- evaluate whether `PyRIT` should be introduced for more complex multi-turn red-team workflows
- expand local threat scenarios and localized attack packs

### AI Sandbox Development

- mature workflow resilience
- improve role-aware governance and review workflow quality
- prepare the platform for longer-term internal scaling

### Test Modules

- add recommendation and set up guardrails auto-implementation where feasible
- extend higher-risk truthfulness and reassessment coverage

### Expected Outcome

- the sandbox matures into a more localization-aware and policy-grounded assurance platform with stronger long-term resilience

---

## 4. Quarterly Recap by Category

## 4.1 Goals

| Quarter | Main Goal |
|---|---|
| `Q1 2026` | Establish the `AI Sandbox` product baseline, benchmark foundation, and internal review direction |
| `Q2 2026` | Complete the internal MVP workflow from model intake to review gate using our own sandbox UI and backend orchestration |
| `Q3 2026` | Deepen trust coverage with stronger evidence, localized Indonesia benchmark packs, and first-wave adversarial expansion |
| `Q4 2026` | Harden the sandbox into a more reliable internal assurance platform with stronger reporting, reassessment, and downstream-ready outputs |
| `Q1 2027` | Mature the sandbox into a localization-aware and policy-grounded assurance platform with deeper advanced testing support |

## 4.2 Governance

| Quarter | Plan |
|---|---|
| `Q1 2026` | clarify sandbox scope, personas, and review-oriented workflow |
| `Q2 2026` | define intended users, policy categories, reviewer decisions, and version-aware review discipline |
| `Q3 2026` | add standards mapping and stronger reassessment triggers |
| `Q4 2026` | harden the review workflow and connect approved summaries toward `ModelHub` |
| `Q1 2027` | mature local policy handling, governance workflow quality, and resilience |

## 4.3 Reporting & Certification

| Quarter | Plan |
|---|---|
| `Q1 2026` | define the sandbox as an evidence and assurance system and start risk-register direction |
| `Q2 2026` | implement assessment rating, findings structure, and review gate display |
| `Q3 2026` | add standards mapping to each process and improve evidence traceability |
| `Q4 2026` | add trusted summary outputs and stronger internal report quality |
| `Q1 2027` | harden the review workflow and improve repeatable evidence packaging |

## 4.4 Advanced Red Team

| Quarter | Plan |
|---|---|
| `Q1 2026` | establish future direction for `Garak`, `PyRIT`, and related testing layers |
| `Q2 2026` | define retest loop and future adversarial evidence mapping |
| `Q3 2026` | add `Garak` and local threat scenario packs as first-wave adversarial expansion |
| `Q4 2026` | stabilize adversarial retest evidence for promotion decisions |
| `Q1 2027` | evaluate `PyRIT` and expand localized advanced red-team coverage |

## 4.5 AI Sandbox Development

| Quarter | Plan |
|---|---|
| `Q1 2026` | deploy Moonshot baseline, establish our own review UX, and validate the frontend prototype |
| `Q2 2026` | deploy the full sandbox MVP with intake, validation, orchestration, result review, history, and comparison |
| `Q3 2026` | strengthen API-backed evidence handling, reviewer workflow, RBAC, and report readiness |
| `Q4 2026` | improve operational reliability, artifact handling, cost visibility, and internal release readiness |
| `Q1 2027` | mature workflow resilience and longer-term internal platform readiness |

## 4.6 Test Modules

| Quarter | Plan |
|---|---|
| `Q1 2026` | assess Telkom AI with Moonshot and define Indonesian benchmark direction |
| `Q2 2026` | operationalize the first baseline modules through `Moonshot` and `LiteLLM` evidence context |
| `Q3 2026` | build harmful and unsafe-content modules and research localized benchmark library |
| `Q4 2026` | expand Indonesian localized benchmark packs and improve local benchmark depth |
| `Q1 2027` | add recommendations, guardrail auto-implementation direction, and higher-risk truthfulness coverage |

---

## 5. Final Recommendation

The best execution order for the sandbox roadmap is:

1. complete the internal evidence workflow first
2. make review gate and promotion eligibility trustworthy
3. keep `Moonshot` as the benchmark foundation
4. show `LiteLLM` guardrail context as part of run evidence
5. keep building our own sandbox UI and backend workflow instead of adopting benchmark-tool UI as the product surface
6. expand with `Garak` before `PyRIT`
7. deepen localized Indonesia benchmark packs after the result schema and review flow are stable

If reduced to one sentence:

- the sandbox roadmap should move from `building our own workflow first` to `localized evidence depth second`, then into `internal assurance hardening and advanced-testing maturity`.

