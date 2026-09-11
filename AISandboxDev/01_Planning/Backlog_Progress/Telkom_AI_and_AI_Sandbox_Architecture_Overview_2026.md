# Telkom AI and AI Sandbox Architecture Overview 2026

Last updated: 2026-04-06

This document combines the two delivery plans into one architecture-oriented Markdown view:

- [Telkom_AI_Model_Security_Strengthening_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Telkom_AI_Model_Security_Strengthening_Plan_2026.md)
- [AI_Sandbox_Build_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Build_Plan_2026.md)

It is intended to work like the reference architecture image, but in planning-document form.

---

## 1. Purpose

This architecture view shows how the two related workstreams fit together:

- `Telkom AI Model Security Strengthening`
- `AI Sandbox Platform Build`

The design principle is:

- the `Telkom AI` workstream hardens the model, serving path, and guardrails
- the `AI Sandbox` workstream provides the controlled workspace to assess, review, compare, and approve that model

---

## 2. Time Flags

Use these flags when reading the architecture:

- `Q2` = planned for Q2 2026 execution
- `Q3` = planned for Q3 2026 execution
- `Q4` = planned for Q4 2026 execution
- `Future` = not part of the near-term MVP, but intentionally kept in the target architecture

---

## 3. Architecture Summary

The combined architecture can be read left to right and top to bottom:

1. model and serving foundation
2. control and guardrail layer
3. benchmark and evaluation layer
4. sandbox workflow and evidence layer
5. governance and review layer
6. downstream readiness

---

## 4. Combined Architecture Map

| Architecture Area | Layer | Capability / Component | Purpose | Main Workstream | Time Flag |
|---|---|---|---|---|---|
| Consumption and downstream use | Internal stakeholders | Model owners, model vendors, reviewers | Use the sandbox to register, test, inspect, and review models | AI Sandbox | `Q2` |
| Consumption and downstream use | Controlled downstream use | Promotion eligibility output for downstream trusted use | Produce approved summary for later publication or controlled reuse | AI Sandbox | `Q3` |
| Model foundation | Serving model | `Telkom AI` active model endpoint | The core LLM being tested and hardened | Telkom AI Security | `Q2` |
| Model foundation | Model version control | Model version and release-candidate discipline | Keep benchmark evidence tied to the correct model version | Telkom AI Security | `Q2` |
| Engineering and orchestration | Endpoint adapter | `LiteLLM` routing and normalization | Standardize access path to the model | Both | `Q2` |
| Engineering and orchestration | Policy control | `LiteLLM` policy and guardrail profile | Apply serving-time control before or during evaluation | Telkom AI Security | `Q2` |
| Engineering and orchestration | Background job control | Benchmark job lifecycle and orchestration | Run assessments asynchronously and reliably | AI Sandbox | `Q2` |
| Engineering and orchestration | Retry and rerun support | Reassessment and retry flow | Support mitigation loop and controlled retesting | Both | `Q2` |
| AI safety guardrails | Built-in content controls | LiteLLM content filters for unsafe advice, harmful content, bias, prompt injection, keyword and pattern blocking, code execution blocking | Provide fast baseline protection using already deployed features | Telkom AI Security | `Q2` |
| AI safety guardrails | Partner guardrails | `Presidio PII`, `Lakera`, `OpenAI Moderation`, `Google Cloud Model Armor`, `Guardrails AI`, `Prompt Security`, and similar | Fill specific gaps where built-in LiteLLM controls are insufficient | Telkom AI Security | `Q3` |
| AI safety guardrails | Policy tuning | Risk-category mapping and control selection | Map filters to adversarial, privacy, harmful-content, and bias dimensions | Telkom AI Security | `Q2` |
| AI safety guardrails | Privacy controls | PII masking, redaction, and sensitive-output rules | Reduce privacy and data disclosure risk | Telkom AI Security | `Q2` |
| Benchmark and evaluation | Benchmark engine | `Moonshot` | Execute the current baseline benchmark package | Both | `Q2` |
| Benchmark and evaluation | Security baseline | Adversarial and hallucination baseline runs | Establish current risk posture and root causes | Telkom AI Security | `Q2` |
| Benchmark and evaluation | Localized evaluation | Indonesian local benchmark pack for SARA, undesirable content, and local factuality | Make evaluation relevant to Indonesia context | Both | `Q3` |
| Benchmark and evaluation | Offensive testing expansion | `Garak`, `PyRIT`, and similar deeper offensive testing layers | Expand beyond the initial benchmark foundation | Telkom AI Security | `Q3` |
| Benchmark and evaluation | App and agent eval expansion | `DeepEval` and later app-level or agent-level evaluation layers | Broaden evaluation scope beyond model-only testing | Future | `Future` |
| Sandbox platform | Model intake | Registration form and metadata capture | Register the model and testing context | AI Sandbox | `Q2` |
| Sandbox platform | Endpoint validation | Connectivity and configuration checks | Verify the endpoint before benchmark execution | AI Sandbox | `Q2` |
| Sandbox platform | Run management | Job submission, progress tracking, and failure states | Manage benchmark execution lifecycle | AI Sandbox | `Q2` |
| Sandbox platform | Result review | Table-first result inspection, filtering, and prompt/response modal | Support practical internal review of benchmark evidence | AI Sandbox | `Q2` |
| Sandbox platform | Findings and recommendations | Structured score, finding, and recommendation views | Make evidence actionable | AI Sandbox | `Q2` |
| Sandbox platform | History and comparison | Run history, model-version lineage, and comparison diff | Support retest governance and reassessment | AI Sandbox | `Q2` |
| Sandbox platform | Guardrail evidence capture | Record active LiteLLM filter or partner guardrail profile per run | Make security controls visible in review decisions | AI Sandbox | `Q2` |
| Sandbox platform | Evidence storage | Structured benchmark outputs, artifacts, and reports | Preserve traceability and review context | AI Sandbox | `Q2` |
| Sandbox platform | Trusted summary output | Downstream-facing approved summary payload | Prepare later handoff without exposing the whole sandbox UI | AI Sandbox | `Q4` |
| Data and storage | Operational store | `PostgreSQL` for models, runs, results, states, and decisions | Persist sandbox workflow and review data | AI Sandbox | `Q2` |
| Data and storage | Artifact storage | File or object storage for benchmark artifacts and reports | Retain evidence beyond score summaries | AI Sandbox | `Q2` |
| Data and storage | Benchmark data packs | Indonesian localized benchmark content and retest datasets | Support repeated localized evaluation | Both | `Q3` |
| Governance and review | Review gate | Reviewer workflow and decision states | Apply structured assurance before downstream use | AI Sandbox | `Q2` |
| Governance and review | Decision states | Approved, approved with controls, restricted, reassessment required | Standardize review outcomes | AI Sandbox | `Q2` |
| Governance and review | Evidence traceability | Reviewer notes, evidence references, run-to-policy trace | Make decisions auditable | AI Sandbox | `Q3` |
| Governance and review | Standards alignment | `NIST AI RMF`, `ISO/IEC 42001`, `OWASP LLM Top 10`, `UU PDP`, local ethics context | Keep testing and review aligned with policy and governance expectations | Both | `Q3` |
| Governance and review | Reporting cadence | Weekly or sprint reporting, risk matrix, reassessment checkpoints | Turn testing into a managed assurance loop | Telkom AI Security | `Q2` |
| Observability and operations | Logging | Prompt, output, error, run, and policy logs | Support debugging, evidence, and operations | Both | `Q2` |
| Observability and operations | Redaction-aware logging | Logging with masking and privacy discipline | Reduce leakage risk in telemetry | Telkom AI Security | `Q2` |
| Observability and operations | Audit support | Traceability across model version, policy profile, and benchmark run | Support governance review and future audits | AI Sandbox | `Q3` |
| Observability and operations | FinOps and token monitoring | Token and run-cost visibility | Support cost and usage awareness | AI Sandbox | `Q4` |
| Infrastructure | Frontend publishing | Cloudflare Pages for frontend prototype delivery | Deploy the sandbox interface reliably | AI Sandbox | `Q2` |
| Infrastructure | Backend runtime | API and orchestration runtime for runs, evidence, and decisions | Support sandbox backend behavior | AI Sandbox | `Q2` |
| Infrastructure | Secure network path | Controlled network path between sandbox, LiteLLM, and benchmark services | Keep the serving and testing path stable and secure | Both | `Q3` |
| Infrastructure | Enterprise-grade security stack | WAF/CDN, IAM, and deeper enterprise security controls | Expand the architecture beyond MVP hardening | Future | `Future` |

---

## 5. Architecture by Domain

## A. Telkom AI Security Strengthening Domain

This domain covers the model-side hardening path.

Primary components:

- `Telkom AI` model endpoint
- `LiteLLM` routing and guardrail policy
- built-in `LiteLLM` content filters
- selected partner guardrails where needed
- `Moonshot` baseline benchmark execution
- adversarial and hallucination assessment
- privacy masking and redaction controls
- localized Indonesian benchmark packs
- mitigation and reassessment loop

Planned emphasis:

- `Q2`: baseline controls and built-in LiteLLM filters
- `Q3`: localized expansion and selected partner guardrails
- `Q4`: final comprehensive reassessment

## B. AI Sandbox Platform Domain

This domain covers the platform that receives, runs, stores, and reviews evidence.

Primary components:

- model registration
- endpoint validation
- benchmark job orchestration
- result and finding review UX
- history and version comparison
- reviewer decision flow
- guardrail metadata visibility
- evidence storage and trusted summary output

Planned emphasis:

- `Q2`: complete MVP workflow
- `Q3`: strengthen audit, traceability, and localized evidence handling
- `Q4`: prepare downstream-ready trusted summary and operational hardening

---

## 6. Combined Flow

Use this sequence as the practical architecture flow:

1. `Model Owner` submits `Telkom AI` model and endpoint metadata
2. `AI Sandbox` validates endpoint connectivity and supported configuration
3. requests are routed through `LiteLLM`
4. active built-in `LiteLLM` filters and selected guardrail policies are applied
5. `Moonshot` executes baseline or localized benchmark recipes
6. results, findings, artifacts, and active guardrail metadata are stored
7. model owner reviews run output in the sandbox UI
8. reviewer compares current and previous runs, inspects evidence, and records a decision
9. failed or restricted models enter mitigation and retest loop
10. approved models become eligible for controlled downstream use

---

## 7. Architecture Period Flags by Priority

## Q2 2026 Priority Build

Must be treated as the active architecture baseline:

- Telkom AI endpoint and version discipline
- `LiteLLM` routing
- built-in `LiteLLM` guardrail categories
- privacy masking basics
- `Moonshot` benchmark execution
- model registration and endpoint validation
- result review UX
- run history baseline
- review gate and decision states
- evidence storage
- logging and structured reporting

## Q3 2026 Expansion

Should deepen the trust and governance layer:

- Indonesian localized benchmark packs
- deeper harmful-content and local-factuality coverage
- selected partner guardrails
- stronger audit traceability
- secure network and environment hardening
- expanded offensive testing

## Q4 2026 Hardening

Should turn the system into a more mature internal assurance platform:

- final comprehensive reassessment path
- stable trusted-summary output
- cost and token monitoring
- stronger downstream handoff contract
- operational hardening and reassessment cadence

## Future

Keep in architecture awareness, but do not overload the MVP:

- app and agent evaluation layers
- broad enterprise AI platform components unrelated to sandbox needs
- full public or developer-facing discovery surface
- large multi-vendor security mesh without clear control gaps

---

## 8. Recommended Visual Redraw Guidance

If this document is redrawn into a slide or diagram, use this structure:

### Top band

- `Model and Serving`
- `Control and Guardrails`
- `Benchmark and Evaluation`
- `Sandbox Workflow and Evidence`
- `Governance and Review`
- `Downstream Readiness`

### Right-side vertical band

- `Security and Governance`
- `AI Sandbox`

### Bottom band

- `Data and Storage`
- `Observability and Operations`
- `Infrastructure`

### Flag style

Add a small tag beside each box:

- `[Q2]`
- `[Q3]`
- `[Q4]`
- `[Future]`

---

## 9. Final Recommendation

Use this document as the combined architecture reference for planning discussions.

It is useful when the team needs one view that explains:

- how `Telkom AI` hardening and `AI Sandbox` platform build relate
- what is in scope now versus later
- which capabilities belong to `Q2`, `Q3`, `Q4`, or `Future`

It should be treated as the backlog-aligned architecture view, not as a generic enterprise AI target-state slide.

