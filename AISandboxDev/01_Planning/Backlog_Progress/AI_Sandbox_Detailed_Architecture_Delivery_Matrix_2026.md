# AI Sandbox Detailed Architecture Delivery Matrix 2026

Last updated: 2026-04-07

Related documents:

- [AI_Sandbox_Low_Cost_Reliability_Architecture_Refinement_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Low_Cost_Reliability_Architecture_Refinement_2026.md)
- [Telkom_AI_and_AI_Sandbox_Architecture_Overview_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Telkom_AI_and_AI_Sandbox_Architecture_Overview_2026.md)
- [Telkom_AI_Model_Security_Strengthening_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Telkom_AI_Model_Security_Strengthening_Plan_2026.md)
- [AI_Sandbox_Build_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Build_Plan_2026.md)

---

## 1. Purpose

This document turns the refined architecture into a detailed delivery matrix.

It is intended to answer:

- what exactly should be built or adopted
- which tool or approach is recommended
- why it is recommended
- when it should land

Deadline flag meanings:

- `Q2` = target for Q2 2026
- `Q3` = target for Q3 2026
- `Q4` = target for Q4 2026
- `Future` = keep in architecture view, not in current committed delivery scope

---

## 2. Detailed Delivery Matrix

| Architecture Domain | Capability | Detailed Scope | Recommended Tool or Approach | Cost Posture | Reliability Notes | Deadline |
|---|---|---|---|---|---|---|
| Model foundation | Active model endpoint | Maintain stable `Telkom AI` inference endpoint for benchmark and review workflows | Existing `Telkom AI` serving endpoint with explicit version tagging | low-cost reuse | must capture model version, release label, and endpoint state | `Q2` |
| Model foundation | Model version discipline | Tie all runs to exact model revision or release candidate | version labels plus stored metadata in sandbox | low-cost | no benchmark result should exist without model version binding | `Q2` |
| Endpoint control | Endpoint normalization | Standardize requests, routing, auth, and serving path | `LiteLLM` | already deployed / low-cost | becomes the single control point for evaluation traffic | `Q2` |
| Endpoint control | Guardrail profile management | Define which input and output policies are active per model or run | `LiteLLM` policy profile plus backend metadata | low-cost | profile must be stored with each run for review traceability | `Q2` |
| Guardrails | Unsafe advice restriction | Restrict medical, legal, and financial advice requests where policy requires | `LiteLLM` built-in content filters | zero or low cost | built-in first; no extra model required | `Q2` |
| Guardrails | Harmful content restriction | Restrict violence, self-harm, child safety, weapons, and abusive-content patterns | `LiteLLM` built-in filters plus simple rule-based checks | zero or low cost | rules should remain available if optional layers fail | `Q2` |
| Guardrails | Bias-sensitive checks | Identify or block clearly unsafe bias-sensitive patterns | `LiteLLM` built-in bias categories plus review policy | zero or low cost | log category trigger for evidence review | `Q2` |
| Guardrails | Prompt injection protection | Detect jailbreaks, system prompt extraction, SQL, malicious code, and data exfiltration prompts | `LiteLLM` built-in prompt-injection filters | zero or low cost | must be visible in run evidence and logs | `Q2` |
| Guardrails | Pattern and keyword rules | Block sensitive tokens, patterns, and high-risk string matches | regex, keyword lists, pattern controls | zero or low cost | keep as fallback even if model-based moderation is added later | `Q2` |
| Guardrails | Privacy detection | Detect PII and sensitive entities in input and output flows | `Presidio` plus custom recognizers | open source / low cost | keep recognizers explicit and testable | `Q2` |
| Guardrails | Privacy masking | Mask or redact sensitive output before storage or review exposure when needed | backend redaction pipeline plus `Presidio` support | low cost | redaction should apply to logs and stored artifacts where required | `Q2` |
| Guard model | Small safety classifier | Optional moderation model for second-pass safety classification | `Llama Guard 3 1B` or similar `<= 2B` model | low-cost with resource caution | do not deploy unless built-in controls plus rules are insufficient | `Q3` |
| Guard model | Quantized deployment path | Keep guard model inference cheap if deployed | quantized or INT4 variant where acceptable | low-cost | prefer small footprint over maximum accuracy for always-on moderation | `Q3` |
| Partner security | External guardrail escalation path | Use enterprise or partner tools only when there is a proven gap | selective evaluation of `Lakera`, `Google Cloud Model Armor`, `Prompt Security`, and similar | higher cost / optional | avoid adding multiple vendors before baseline is stable | `Q3` |
| Benchmark engine | Baseline benchmark execution | Run primary benchmark recipes for initial assessment and ongoing reassessment | `Moonshot` | open or already adopted | keep benchmark recipe version tied to each run | `Q2` |
| Benchmark engine | Adversarial baseline | Cover prompt injection, jailbreak, and robustness baseline scenarios | `Moonshot` plus sandbox recipe control | low cost | start with stable repeatable recipes before expanding | `Q2` |
| Benchmark engine | Privacy baseline | Cover leakage and sensitive-disclosure tests | `Moonshot` plus privacy datasets and `Presidio` checks | low cost | benchmark findings should align with masking policy | `Q2` |
| Benchmark engine | Hallucination baseline | Cover unsupported claims and truthfulness checks | `Moonshot` with curated truthfulness test sets | low cost | keep measurement method consistent between runs | `Q2` |
| Benchmark engine | Undesirable content baseline | Cover harmful and unsafe output categories | `Moonshot` plus sandbox module design | low cost | use simple taxonomy first and expand later | `Q2` |
| Benchmark expansion | Adversarial expansion | Add stronger adversarial probes beyond the first benchmark pack | `Garak` | open source / low cost | preferred before more complex red-team orchestration | `Q3` |
| Benchmark expansion | Advanced conversational red team | Simulate multi-turn attack workflows and deeper adversarial chains | `PyRIT` | open source but higher complexity | only adopt after run lifecycle and evidence schema are stable | `Future` |
| Benchmark expansion | App or agent evaluation | Evaluate full app or agent behavior beyond single model responses | `DeepEval` or later equivalent | open source / optional | not needed for current sandbox MVP | `Future` |
| Local evaluation | Local harmful-content pack | Add Indonesia-specific harmful and toxic content evaluation | internal benchmark pack for `SARA`, toxic Indonesian content, and local unsafe patterns | low cost | start with curated internal dataset and rubric | `Q3` |
| Local evaluation | Local factuality pack | Add Indonesia-specific factuality and regulatory checks | internal datasets covering Indonesian facts and regulation-aware prompts | low cost | avoid large local judge-model deployment early | `Q3` |
| Local evaluation | Regulatory mapping pack | Map benchmark questions and findings to `UU PDP`, local ethics, and internal policy | rubric plus standards mapping worksheet | low cost | keep traceable to findings, not just summary claims | `Q3` |
| Sandbox platform | Model registration | Intake form for model metadata, endpoint, owner, and version | existing frontend plus backend schema | low cost | must reject incomplete model records | `Q2` |
| Sandbox platform | Endpoint validation | Validate connectivity, credentials, and supported request shape | backend validation service routed via `LiteLLM` where relevant | low cost | timeout, error state, and retry behavior required | `Q2` |
| Sandbox platform | Benchmark job orchestration | Submit, queue, run, and track benchmark jobs asynchronously | backend job control and worker pattern | low cost | every run needs stable state transitions | `Q2` |
| Sandbox platform | Run states | Standardize run lifecycle labels | `Draft`, `Validated`, `Run Pending`, `Running`, `Completed`, `Failed`, `Needs Review` | low cost | avoid ambiguous states in UI and API | `Q2` |
| Sandbox platform | Results page | Support table-first inspection of benchmark output | existing frontend review page | already built / low cost | retain fast loading and stable filtering | `Q2` |
| Sandbox platform | Result filters | Support category filter and fail-only review | existing frontend filtering workflow | low cost | filtering logic must match result schema exactly | `Q2` |
| Sandbox platform | Prompt and response inspection | Open detailed prompt and response evidence from a run | existing modal-based inspection | low cost | must handle large payloads safely and consistently | `Q2` |
| Sandbox platform | Findings panel | Show score, issue summary, and recommendation block | structured result schema in FE and BE | low cost | do not rely on fixture-only assumptions | `Q2` |
| Sandbox platform | Guardrail evidence display | Show which `LiteLLM` filters, rules, or optional guard models were active | run metadata panel in sandbox UI | low cost | reviewer should never guess which protections were active | `Q2` |
| Sandbox platform | Run history | Show prior runs and model lineage | backend run-history API plus FE timeline or table | low cost | essential for reassessment and release discipline | `Q2` |
| Sandbox platform | Version comparison | Compare score and finding changes between runs | FE comparison view plus backend diff logic | low cost | comparison must include benchmark version and guardrail profile | `Q2` |
| Sandbox platform | Evidence storage | Store benchmark output, reports, and structured metadata | `PostgreSQL` plus artifact storage | low cost | artifacts should remain accessible after run completion | `Q2` |
| Sandbox platform | Trusted summary output | Prepare downstream summary without exposing internal evidence UI | summarized output contract | low cost | keep this after review gate is stable | `Q4` |
| Governance | Policy controls | Define policy categories and required controls per risk area | policy matrix linked to guardrail profiles and benchmark domains | low cost | must be simple enough to operate consistently | `Q2` |
| Governance | Model review | Reviewer inspects evidence and writes decision | reviewer workflow in sandbox UI | low cost | decisions should capture rationale and references | `Q2` |
| Governance | Review states | Standardize release and assurance decisions | `Approved`, `Approved with Controls`, `Restricted`, `Reassessment Required` | low cost | decision states must be persisted and auditable | `Q2` |
| Governance | Release discipline | Tie review gate to version and reassessment discipline | release-candidate review policy | low cost | no promotion without version-aware review | `Q2` |
| Governance | Findings register | Maintain structured finding inventory across runs | backend data model and review notes | low cost | supports repeated mitigation cycles | `Q3` |
| Governance | Standards mapping | Map evidence to `OWASP LLM Top 10`, `ISO/IEC 42001`, `NIST AI RMF`, `UU PDP`, and local ethics | structured mapping document and evidence tags | low cost | keep mapping evidence-based, not marketing-based | `Q3` |
| Governance | Compliance-style reporting | Produce formal internal assurance report package | sandbox report export plus PM or QA templates | low cost | internal report first, not external certification claim | `Q3` |
| Governance | Review gate hardening | Strengthen review gate into a dependable assurance checkpoint | reviewer checklist plus evidence traceability | low cost | must not depend on tribal knowledge | `Q3` |
| Reliability | Run ID discipline | Every run must have a stable unique identifier | backend run ID generation | low cost | required for retries, audit, and comparison | `Q2` |
| Reliability | Timeout handling | Handle slow or hanging endpoint calls safely | backend timeouts and worker-level timeout rules | low cost | must move runs into explicit failure states | `Q2` |
| Reliability | Retry behavior | Allow safe rerun or retry where appropriate | retry policy per run stage | low cost | do not retry blindly on unsafe or invalid states | `Q2` |
| Reliability | Health checks | Track status of sandbox backend, `LiteLLM`, benchmark worker, and database | basic health endpoints and operational dashboard | low cost | required for dependable daily usage | `Q2` |
| Reliability | Failure visibility | Expose failure reason and incomplete-run state in UI | frontend status messaging plus backend error fields | low cost | users must understand whether to rerun or escalate | `Q2` |
| Reliability | Audit traceability | Keep links across model version, benchmark version, guardrail profile, and decision | cross-linked metadata model | low cost | important for governance and Q3 review hardening | `Q3` |
| Reliability | Graceful degradation | Keep core sandbox working if optional modules are offline | fallback rules and optional-module isolation | low cost | do not let optional tools break the primary workflow | `Q3` |
| Observability | Structured logs | Log prompt events, output events, run transitions, and policy activations | structured application logging | low cost | logging schema should be stable across releases | `Q2` |
| Observability | Redacted logs | Avoid sensitive leakage in operational logs | masking or redaction in logging pipeline | low cost | align with privacy rules and `UU PDP` posture | `Q2` |
| Observability | Cost visibility | Track token or run cost where possible | simple token and cost metadata first | low cost | enough for operational awareness before full FinOps tooling | `Q4` |
| Deployment | Frontend delivery | Keep the sandbox UI deployable at low cost | Cloudflare Pages | low cost | deployment path already validated and should remain simple | `Q2` |
| Deployment | Backend runtime | Run APIs and workers using minimal reliable deployment setup | current backend deployment path with explicit environment config | low cost | prefer simple runtime topology before scaling out | `Q2` |
| Deployment | Environment hardening | Improve network path and environment stability | restricted network path, secrets handling, and runtime hardening | medium cost / focused | important after core workflow is stable | `Q3` |

---

## 3. Q2 Must-Have Set

These are the minimum items that should be treated as the operational baseline:

| Capability | Target Outcome | Deadline |
|---|---|---|
| `LiteLLM` routing and policy profile | one stable serving control point | `Q2` |
| built-in `LiteLLM` content filters | active baseline guardrail coverage | `Q2` |
| `Presidio` privacy detection and masking basics | initial PII-sensitive flow protection | `Q2` |
| `Moonshot` benchmark execution | repeatable benchmark baseline | `Q2` |
| model registration and endpoint validation | controlled intake flow | `Q2` |
| benchmark job orchestration | background execution with stable run states | `Q2` |
| result review UI | usable evidence inspection workflow | `Q2` |
| run history and comparison baseline | reassessment support | `Q2` |
| review gate and decision states | internal assurance checkpoint | `Q2` |
| structured logs, timeout, retry, health checks | basic reliability baseline | `Q2` |

---

## 4. Q3 Expansion Set

These items should deepen coverage after the core baseline is stable:

| Capability | Target Outcome | Deadline |
|---|---|---|
| `Garak` adversarial expansion | stronger open-source offensive testing | `Q3` |
| Indonesian local benchmark packs | locally relevant safety and factuality coverage | `Q3` |
| standards mapping and evidence traceability | stronger governance alignment | `Q3` |
| findings register and review-gate hardening | better internal assurance discipline | `Q3` |
| optional `Llama Guard <= 2B` | small additional moderation layer only if needed | `Q3` |
| selective partner guardrail evaluation | targeted gap closure, not default architecture | `Q3` |
| secure network and environment hardening | better operational reliability and security posture | `Q3` |

---

## 5. Q4 Hardening Set

These items should mature the platform after Q2 and Q3 baseline work is stable:

| Capability | Target Outcome | Deadline |
|---|---|---|
| full reassessment cycle | stable release-candidate retest process | `Q4` |
| trusted summary output | cleaner downstream handoff | `Q4` |
| cost and token visibility | operational awareness for sustained usage | `Q4` |
| stronger operational hardening | more reliable internal service posture | `Q4` |

---

## 6. Future Set

These items are valid architecture ideas, but should not overload the near-term plan:

| Capability | Why Deferred | Deadline |
|---|---|---|
| `PyRIT` advanced red team | useful but adds higher operational complexity | `Future` |
| `DeepEval` app or agent evaluation | beyond current sandbox MVP scope | `Future` |
| large multi-vendor guardrail mesh | creates cost and integration sprawl too early | `Future` |
| larger safety guard models | too expensive for the current resource posture | `Future` |

---

## 7. Final Recommendation

Use this matrix as the practical architecture checklist.

If the team needs to prioritize quickly:

1. lock `Q2` baseline first
2. only expand to `Q3` items when reliability and evidence schema are stable
3. keep `Q4` focused on hardening, not major architectural pivots

