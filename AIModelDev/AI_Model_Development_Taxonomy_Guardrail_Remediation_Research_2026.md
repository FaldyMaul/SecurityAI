# AI Model Development Taxonomy: Guardrail Remediation Research 2026

Last updated: 2026-04-07

## 1. Purpose

This note answers four practical questions for `AIModelDev`:

- if `AI Sandbox`, `Moonshot`, or `AI Verify` returns a high-risk result, what should we do next
- which controls can be implemented as free or open-source layers today
- whether `LiteLLM` and `Presidio` are truly free to use
- when we should keep fixing the application stack versus deploy a separate guard model or replace the main model
- what tools are actually useful for `5.3 Hallucination and Unsupported Claims` and `5.4 Toxicity, Hate, Unsafe Specialized Advice`

This document is intentionally decision-oriented, not marketing-oriented.

---

## 2. Executive Conclusion

If a model receives a high-risk rating in `Moonshot` or the internal sandbox, the default action should **not** be "deploy and monitor." The correct posture is:

1. freeze release for the failed risk category
2. identify the failing layer
3. apply the smallest effective mitigation at the right layer
4. rerun the same benchmark or attack pack
5. approve only if residual risk is within a documented threshold

For our current architecture, the right baseline is usually a **layered application control stack** first:

- gateway controls
- input and output filtering
- PII detection and redaction
- retrieval and grounding fixes
- policy-driven abstention
- retesting and evidence logging

We should **not** assume that a new guard model is always required.

A separate guard model becomes justified when:

- rule-based controls are repeatedly bypassed
- we need on-prem or cross-provider moderation independence
- we need consistent classification for both prompts and responses across many models
- the provider-native moderation is unavailable, weak, or not acceptable for sovereign deployment

A full main-model replacement is justified when:

- the primary failure is truthfulness, instruction-following, or multilingual safety quality
- repeated app-layer fixes still leave the model above risk tolerance
- the model fails on core business-domain behavior rather than only surface filtering

Important refinement:

- `5.3 Hallucination and Unsupported Claims` should usually be treated as an `improve first, block selectively` problem
- `5.4 Toxicity, Hate, Unsafe Specialized Advice` should usually be treated as a `block first, then improve` problem

---

## 3. What A High-Risk Rating Should Trigger

`Moonshot` is an evaluation and red-teaming tool, not a runtime guardrail. Its official positioning is benchmarking, red-teaming, recipes, and reporting for LLM systems. `AI Verify` is a governance testing toolkit, also not a runtime safety gateway. A high-risk result therefore means we need a remediation workflow outside the test tool itself.

Recommended operating rule:

- `High` risk in adversarial attack, privacy, harmful content, or hallucination categories should block promotion to production until the failed category is retested.
- If a model is already live, high-risk findings should trigger compensating controls immediately on the serving path while remediation is underway.

This aligns with `NIST AI RMF` guidance that prioritized risks should be responded to and managed, and that risk responses can include mitigating, avoiding, transferring, or accepting only within defined tolerances.

Practical release states:

| Test Outcome | Recommended Release State | Required Action |
|---|---|---|
| Low | `Approve` | Normal monitoring |
| Moderate | `Approve with controls` | Add targeted mitigations and schedule retest |
| High | `Restricted / Hold` | Block release or constrain scope until retest passes |
| Critical privacy or prompt-exfiltration failure | `No-Go` | Disable exposed flow, apply emergency guardrails, investigate logs and data exposure |

---

## 4. Root-Cause View: Fix The Right Layer

When a benchmark fails, we should first classify the failure into one of these layers:

| Failure Layer | Typical Symptoms | Primary Fix Type |
|---|---|---|
| Input layer | jailbreak, prompt injection, prompt extraction attempts | deny rules, prompt classifier, input firewall, context separation |
| Context / retrieval layer | hallucination from wrong facts, secret leakage from docs | chunking fix, access control, retrieval filtering, source grounding |
| Output layer | toxic output, unsafe advice, PII leakage in response | output moderation, redaction, abstention templates |
| Model layer | repeated unsafe reasoning, bad multilingual safety, weak refusal behavior | stronger model, fine-tuning, guard model, provider change |
| Workflow layer | risky tool invocation, agent overreach, sensitive function use | tool permission gating, HITL review, action allowlists |
| Logging / storage layer | PII retained in traces and logs | log scrubbing, masking, data minimization, retention controls |

This matters because a bad result in `Moonshot` does not automatically mean "swap the model." Many failures are wrapper or data-pipeline failures.

Another useful distinction:

| Tool Type | What It Actually Does | Examples |
|---|---|---|
| Evaluation | measures risk only | `Moonshot`, `Ragas`, `DeepEval` |
| Runtime guardrails | intercepts inputs, retrieval, or outputs | `NeMo Guardrails`, `Guardrails AI`, `LiteLLM` policies |
| Runtime safety model | classifies prompts or responses inline | `Llama Guard 3 1B`, `ShieldGemma` |
| Privacy runtime filter | detects and masks PII | `Presidio` |
| Weight-level improvement | changes main-model behavior | fine-tuning, preference tuning, model replacement |

In practice, most teams should improve the **system** first and only improve the **weights** later.

---

## 5. Recommended Remediation Playbook By Risk Type

## 5.1 Prompt Injection, Jailbreak, Prompt Extraction

Implement first:

- gateway-level allow and deny rules for known exploit patterns
- strict separation of `system`, `developer`, user, and retrieved content
- tool calling allowlists and parameter validation
- no hidden secrets in prompt templates
- retrieval isolation so untrusted documents are not treated as instruction sources
- attack-pack retesting using `Moonshot`, `Garak`, or later `PyRIT`

Escalate to a guard model when:

- attacks still bypass regex and policy filters
- multi-turn attacks remain successful
- we need broader semantic classification than rules can provide

Good candidates:

- `LiteLLM` as gateway and policy layer
- `Garak` or `PyRIT` for adversarial retesting
- `Prompt Guard` or `Llama Guard` class models if runtime semantic filtering is needed

## 5.2 PII Leakage and Sensitive Data Exposure

Implement first:

- `Presidio` on inbound prompts
- `Presidio` on outbound responses
- log redaction before storage
- retrieval corpus scanning for secrets and regulated identifiers
- policy to reject or mask sensitive entities before model invocation where possible

Escalate to stronger controls when:

- leakage comes from retrieved enterprise content rather than user text alone
- secrets are appearing from tools, logs, or memory
- multilingual or Indonesia-specific entities are missed by default recognizers

Important note:

`Presidio` is strong for PII detection and anonymization, but it is not a full harmful-content or jailbreak firewall.

## 5.3 Hallucination and Unsupported Claims

Implement first:

- retrieval quality fixes before model replacement
- answer templates that require citation, source mention, or abstention
- confidence policy for "unknown / insufficient evidence"
- deterministic domain QA or rule checks for critical fields
- smaller response scope and structured outputs
- runtime grounding rails for source-backed answers
- provenance or fact-check validators before unsupported output reaches the user

Best-fit tools:

- `NeMo Guardrails`
  - strongest runtime option found in this research for fact-checking and hallucination control
  - NVIDIA documents `self check facts` and `self check hallucination` output rails
  - practical when the application already uses `RAG`
- `Guardrails AI`
  - strong validator-style runtime option using source-backed checks such as `ProvenanceLLM` and `ProvenanceEmbeddings`
  - useful if we want lighter Python-level validators rather than a larger rail framework
- `Ragas`
  - strong offline evaluation choice for `RAG` faithfulness, retrieval quality, and grounding measurement
- `DeepEval`
  - strong offline regression and CI-style evaluation framework for hallucination, faithfulness, and answer relevancy

Escalate to model change when:

- failures persist even after retrieval cleanup and grounding policy
- the model cannot follow evidence-bounded answer rules reliably
- multilingual factuality or domain fidelity is fundamentally weak

Important note:

No gateway product alone solves hallucination. This is usually a `retrieval + prompt contract + evaluation + model quality` problem.

Recommended order for `5.3`:

1. improve retrieval quality
2. require source-bounded answers
3. add output fact-check or provenance rail
4. add abstention when evidence is missing
5. rerun `Ragas`, `DeepEval`, and `Moonshot`
6. only then consider changing the main model

Decision:

- default posture is `improve first`
- blocking should happen selectively when evidence is missing, support is weak, or the domain is high-risk such as tariff, SLA, legal, finance, health, or privacy

## 5.4 Toxicity, Hate, Unsafe Specialized Advice

Implement first:

- provider or gateway moderation
- localized test packs in Bahasa Indonesia and mixed-language prompts
- refusal and de-escalation response templates
- output moderation before response delivery
- unified content-safety rails for both input and output checks
- small runtime safety classifier if policy rules and provider moderation are not enough

Best-fit tools:

- `NeMo Guardrails`
  - strongest orchestration layer found in this research for content-safety flows
  - NVIDIA documents content-safety rails and support for integrating safety models such as `Llama Guard 3` and `ShieldGemma`
- `Llama Guard 3 1B`
  - strongest practical small safety model found in this pass for prompt and response moderation
  - good fit for local or sovereign deployment
  - caution: officially listed supported languages do not explicitly include Bahasa Indonesia, although the model card reports Indonesian evaluation results, so local validation is still required
- `Guardrails AI ToxicLanguage`
  - useful application-layer validator for toxic output filtering or sentence removal
- `Detoxify`
  - lightweight OSS toxicity classifier and useful low-cost baseline
  - caution: documented multilingual support is not Indonesia-first
- `ShieldGemma`
  - valid alternative safety classifier, but currently a weaker fit for Indonesia-first text moderation than `Llama Guard 3 1B`

Escalate to guard model or model swap when:

- false negatives remain high on localized abuse or paraphrases
- the base model itself produces unstable refusal behavior

Recommended order for `5.4`:

1. add input and output moderation first
2. block or rewrite toxic and unsafe-specialized-advice output
3. add localized policy rules and test packs in Bahasa Indonesia
4. rerun adversarial safety tests
5. only if bypasses stay high, add a dedicated safety model or fine-tune

Decision:

- default posture is `block first`
- improvement work should then reduce false positives, reduce false negatives, and increase Indonesian and code-mixed safety coverage

---

## 6. Should We Deploy A New Guard Model?

Short answer: **not by default**.

Recommended decision rule:

| Situation | Best Action |
|---|---|
| Basic gateway logging, routing, spend tracking, simple filtering needed | use `LiteLLM` plus rules |
| PII masking and redaction needed | use `Presidio` |
| We need evaluation or red-team evidence | use `Moonshot`, `Garak`, optionally `PyRIT` |
| Provider moderation is enough and risk is low | do not add another model yet |
| Repeated jailbreak or harmful-output bypass despite app controls | add a runtime guard model |
| Hallucination persists despite retrieval and prompt fixes | improve retrieval or replace primary model before adding a moderation-only model |
| We need runtime grounding for hallucination control | add `NeMo Guardrails` or `Guardrails AI` validators before changing the base model |
| We need stronger moderation for toxicity or unsafe advice | add a small safety model like `Llama Guard 3 1B` plus localized rules |

My recommendation for this repo:

- `P0`: keep runtime controls in the app layer first
- `P1`: add a small guard model only for high-risk flows or failed categories
- `P2`: replace the main model only if truthfulness, multilingual safety, or instruction fidelity is still poor after wrapper fixes

---

## 7. Are LiteLLM And Presidio Really Free?

## 7.1 LiteLLM

`LiteLLM` is **partly free and open-source, but not entirely unrestricted across all features**.

What is confirmed:

- the public repository license states that content outside the `enterprise/` directory is under `MIT`
- the official site lists an `Open Source` tier as `$0`
- the official docs position it as a Python SDK and proxy or AI gateway

What this means operationally:

- core proxying, routing, logging hooks, and many gateway features are free to self-host
- some enterprise capabilities are commercial
- `LiteLLM` is not itself a standalone safety model; it is an orchestration and gateway layer

Decision:

- it is valid to classify `LiteLLM` core as `free / OSS`
- it is **not** correct to imply that every advanced operational feature is fully free

## 7.2 Presidio

`Presidio` is genuinely free and open-source under `MIT`.

What is confirmed:

- Microsoft's repository is `MIT`
- docs show analyzer plus anonymizer flow
- it supports recognizers, regex, deny lists, context rules, and custom extensions

Decision:

- it is valid to classify `Presidio` as `free / OSS`
- but it should be described narrowly as a privacy and redaction framework, not a complete LLM guardrail suite

---

## 8. Tool Reality Check

Stars below are point-in-time snapshots checked on 2026-04-07.

| Tool / Model | Main Role | License / Cost Posture | GitHub Stars | Main Language | Verdict For Us |
|---|---|---|---:|---|---|
| `LiteLLM` | gateway, proxy, routing, logging, budgets, guardrail hooks | Core repo mostly `MIT`; `enterprise/` directory separately licensed; repo also references commercial-license-covered features; official OSS tier listed as `$0` | 42.3k | Python + TypeScript | Strong `P0` platform layer, but not enough alone for safety |
| `Presidio` | PII detection, masking, anonymization | `MIT`, free OSS | 7.5k | Python | Strong `P0` privacy layer |
| `Moonshot` | LLM benchmarking and red-teaming | `Apache-2.0`, free OSS | 318 | Python | Strong `P0` evaluation layer |
| `AI Verify` | governance and testing toolkit | `Apache-2.0`, free OSS | 61 | TypeScript-heavy repo with Python test engine modules | Useful for governance, not a runtime guardrail |
| `Garak` | LLM vulnerability scanner | `Apache-2.0`, free OSS | 7.5k | Python | Strong `P1` adversarial expansion |
| `PyRIT` | advanced red teaming and risk identification | `MIT`, free OSS | 3.7k | Python | Strong but heavier than `Garak`; use later |
| `NeMo Guardrails` | runtime guardrail orchestration for input, retrieval, and output | `Apache-2.0`, free OSS toolkit | 5.2k | Python | Strong `P1` runtime layer for `5.3` and `5.4` |
| `Guardrails AI` | Python validator framework for input or output guards | open-source framework with validator ecosystem; some validators may depend on external LLM calls | not re-verified directly in this pass | Python | Strong `P1` runtime validator layer, especially for provenance and toxicity |
| `Ragas` | `RAG` faithfulness and retrieval evaluation | `Apache-2.0`, free OSS | 13.2k | Python | Strong `P1` evaluation layer for `5.3` |
| `DeepEval` | LLM evaluation and testing framework | `Apache-2.0`, OSS framework with optional hosted platform | 14.5k | Python | Useful later for app and RAG evals, not first guardrail priority |
| `Llama Guard 3 1B` | runtime moderation model | Meta `Llama 3.2 Community License`, not classic OSS; weights require access agreement | model hosted on Hugging Face, not treated as a GitHub tool | Python ecosystem for serving | Viable `P1/P2` runtime safeguard when app-layer controls are insufficient |
| `Detoxify` | lightweight toxicity classifier | OSS Python package / model family | not re-verified directly in this pass | Python | Useful low-cost baseline for `5.4`, but weak as an Indonesia-first final solution |
| `ShieldGemma` | safety classifier family | open-weight Google safety model family; language fit is more limited for our text use case | not treated here as a GitHub-primary tool | Python ecosystem for serving | Valid alternative, but weaker fit than `Llama Guard 3 1B` for our current needs |

Important nuance:

- `Moonshot`, `AI Verify`, `Garak`, `PyRIT`, and `DeepEval` mainly **measure** or **attack** systems
- `LiteLLM`, `Presidio`, `NeMo Guardrails`, `Guardrails AI`, and a guard model mainly **control** runtime behavior
- testing tools alone do not reduce production risk unless connected to a remediation loop
- `PyRIT` should be referenced using the active `microsoft/PyRIT` repository, not the older archived `Azure/PyRIT` location
- language coverage remains a real constraint for Indonesia-first moderation, so off-the-shelf safety models must be validated on Bahasa Indonesia and code-mixed traffic

---

## 9. Architecture Recommendation For AIModelDev

Recommended 2026 baseline:

### Layer 1: Runtime Gateway

- `LiteLLM`
- provider routing
- retry and fallback
- request metadata
- budgets and usage telemetry

### Layer 2: Privacy Controls

- `Presidio`
- input masking
- output redaction
- trace and log scrubbing

### Layer 3: Policy Controls

- deterministic rules
- allowlists for tools
- deny lists for prompt injection and exfiltration patterns
- response abstention templates

### Layer 4: Retrieval and Evidence Controls

- source whitelisting
- secret scanning on indexed documents
- answer-grounding policy
- high-risk domain citation requirement
- `NeMo Guardrails` or `Guardrails AI` provenance or fact-check validators for `5.3`

### Layer 5: Evaluation Loop

- `Moonshot` for recurring benchmark runs
- `Ragas` for `RAG` faithfulness and retrieval evaluation
- `Garak` for broader adversarial attack coverage
- `DeepEval` for app regression and offline evaluation
- later `PyRIT` for complex multi-turn red teaming

### Layer 6: Optional Runtime Guard Model

- only for high-risk flows
- use when rules plus provider moderation are still insufficient
- candidate: `Llama Guard 3 1B` or equivalent lightweight moderation model
- use most naturally for `5.4`, not as the primary answer to `5.3`

### Layer 7: Localization Controls

- Bahasa Indonesia lexicon and policy rules
- code-mixed Bahasa-English safety tests
- local safety benchmark pack for hate, abuse, and unsafe specialized advice

---

## 10. Taxonomy Change Recommendation

I recommend changing the architecture taxonomy wording in the main planning document as follows:

1. keep `LiteLLM` under `gateway / routing / logging / policy hooks`, not as the primary truthfulness or privacy solution
2. keep `Presidio` under `privacy guardrails`, not general safety guardrails
3. treat `Moonshot` and `AI Verify` as `evaluation and governance`, not runtime mitigation
4. make `guard model` explicitly conditional, not default
5. add a separate category for `retrieval hardening and evidence-bound answering`, because hallucination is not solved by moderation tooling
6. treat `5.3` and `5.4` differently in the taxonomy:
   - `5.3` should emphasize grounding tools such as `NeMo Guardrails`, `Guardrails AI`, and `Ragas`
   - `5.4` should emphasize moderation tools such as `NeMo Guardrails`, `Llama Guard 3 1B`, and localized policy rules

---

## 11. Proposed Priority

| Priority | Recommendation | Why |
|---|---|---|
| `P0` | `LiteLLM` + `Presidio` + deterministic policy rules + benchmark retest loop | cheapest useful baseline |
| `P1` | add `NeMo Guardrails`, `Ragas`, `Garak`, retrieval hardening, and localized toxic-content tests | strengthens both runtime and evaluation coverage |
| `P2` | add runtime guard model for selected flows only | justified only if measured gaps remain |
| `P3` | add `PyRIT` and heavier multi-turn red teaming | valuable, but more operationally expensive |

---

## 12. Bottom-Line Answers

### If AI Sandbox or Moonshot says high risk, what should we do?

Do not treat it as a dashboard-only result. Hold or restrict release, fix the failing layer, and rerun the same test pack.

### Is LiteLLM really free?

Core `LiteLLM` is free and open-source, but not every enterprise capability is. It is a gateway platform, not a complete safety system.

### Is Presidio really free?

Yes. `Presidio` is `MIT`-licensed OSS. It is strong for PII detection and anonymization, but it does not replace broader moderation or hallucination controls.

### Do we need to deploy a new guard model?

Not always. Start with application-layer controls. Add a guard model only when benchmark evidence shows the wrapper stack is still insufficient.

### Do we ever need a different main model?

Yes, especially when the real problem is poor reasoning quality, poor refusal behavior, weak multilingual safety, or weak grounded answering that wrapper controls cannot reliably fix.

### What should we use for `5.3`?

Use grounding-oriented tools first: `NeMo Guardrails`, `Guardrails AI` provenance checks, `Ragas`, and `DeepEval`. Improve first, block selectively when unsupported.

### What should we use for `5.4`?

Use moderation-oriented tools first: `NeMo Guardrails`, `Llama Guard 3 1B`, `Guardrails AI ToxicLanguage`, and localized Indonesian policy rules. Block first, then improve localization and classifier quality.

---

## 13. Sources

- LiteLLM docs: https://docs.litellm.ai/
- LiteLLM pricing / OSS tier: https://www.litellm.ai/
- LiteLLM GitHub repo: https://github.com/BerriAI/litellm
- LiteLLM license file: https://github.com/BerriAI/litellm/blob/main/LICENSE
- Microsoft Presidio docs: https://microsoft.github.io/presidio/
- Microsoft Presidio GitHub repo: https://github.com/microsoft/presidio
- Moonshot GitHub repo: https://github.com/aiverify-foundation/moonshot
- Moonshot docs site: https://aiverify-foundation.github.io/moonshot/
- AI Verify GitHub repo: https://github.com/aiverify-foundation/aiverify
- AI Verify user guide: https://aiverify-foundation.github.io/aiverify/
- AI Verify source setup guide: https://aiverify-foundation.github.io/aiverify/getting-started/source-code-setup/
- NVIDIA Garak GitHub repo: https://github.com/NVIDIA/garak
- Microsoft PyRIT GitHub repo: https://github.com/microsoft/PyRIT
- NVIDIA NeMo Guardrails docs: https://docs.nvidia.com/nemo/guardrails/latest/
- NVIDIA NeMo Guardrails fact-checking rails: https://docs.nvidia.com/nemo/guardrails/latest/configure-rails/guardrail-catalog/fact-checking.html
- NVIDIA NeMo Guardrails content safety: https://docs.nvidia.com/nemo/guardrails/latest/configure-rails/guardrail-catalog/content-safety.html
- NVIDIA NeMo Guardrails GitHub repo: https://github.com/NVIDIA-NeMo/Guardrails
- Guardrails AI docs: https://www.guardrailsai.com/docs/
- Guardrails AI hub: https://guardrailsai.com/hub
- Guardrails AI ProvenanceLLM validator: https://guardrailsai.com/hub/validator/guardrails/provenance_llm
- Guardrails AI ToxicLanguage validator: https://guardrailsai.com/hub/validator/guardrails/toxic_language
- Ragas docs: https://docs.ragas.io/
- Ragas faithfulness docs: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/
- Ragas GitHub repo: https://github.com/vibrantlabsai/ragas
- DeepEval GitHub repo: https://github.com/confident-ai/deepeval
- Meta Purple Llama repo: https://github.com/meta-llama/PurpleLlama
- Llama Guard 3 1B model card: https://huggingface.co/meta-llama/Llama-Guard-3-1B
- Google ShieldGemma safeguard docs: https://ai.google.dev/responsible/docs/safeguards/shieldgemma
- Google ShieldGemma model card: https://ai.google.dev/gemma/docs/shieldgemma/model_card
- Detoxify GitHub repo: https://github.com/unitaryai/detoxify
- NIST AI RMF overview: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI RMF Playbook `Manage`: https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Manage
