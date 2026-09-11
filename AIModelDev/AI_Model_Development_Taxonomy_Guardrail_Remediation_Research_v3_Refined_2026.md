# AI Model Development Taxonomy: Guardrail Remediation Research v3 Refined 2026

Last updated: 2026-04-07

## 1. Purpose

This note keeps the original taxonomy-style structure, but updates the content using the newer `v3` research direction.

It answers these practical questions for `AIModelDev`:

- if `Moonshot` or the internal sandbox returns a high-risk result, what should we do next
- what should be the real MVP guardrail posture
- which tools should stay in the baseline stack and which should be second-wave
- how we should handle privacy, hallucination, prompt injection, and undesirable content
- how we should solve the `Bahasa Indonesia` localization gap

This version is more opinionated than the earlier note.

It assumes a strong preference for:

- zero-cost or low-cost deployment
- sovereign local deployment
- local GPU expansion only when needed
- avoiding unnecessary partner or enterprise guardrail dependencies

---

## 2. Executive Conclusion

If a model receives a high-risk result in `Moonshot`, the default action should still be:

1. hold or restrict release for the failed risk category
2. identify the failing layer
3. apply the smallest effective remediation at the right layer
4. rerun the same benchmark or attack pack
5. approve only if the residual risk is acceptable

But the updated `v3` conclusion is stronger on architecture:

- the MVP should rely first on `LiteLLM Content Filter`
- we should not start by deploying heavy ML guard models
- we should only expand to local GPU semantic models after `Moonshot` proves the built-in filters are not enough

This means the preferred deployment strategy is phased:

### Phase 1: MVP Gateway

- rely primarily on `LiteLLM Content Filter`
- turn on built-in categories in the deployed UI
- use this to block standard overt attacks and harmful content with minimal complexity

### Phase 2: Sovereign GPU Expansion

- only after measurement proves Phase 1 is insufficient
- deploy specialized local semantic classifiers behind our own infrastructure
- wire them into the existing `LiteLLM` control path and custom guardrail flow

Important refinement:

- `5.1 Prompt Injection, Jailbreak, Prompt Extraction` should remain `block first`
- `5.2 PII Leakage and Sensitive Data Exposure` should remain `detect, redact, and block first`
- `5.3 Hallucination and Unsupported Claims` should remain `improve first, block selectively`
- `5.4 Toxicity, Hate, Unsafe Specialized Advice` should remain `block first`, then localize and improve

---

## 3. What A High-Risk Rating Should Trigger

`Moonshot` remains an evaluation and red-teaming system, not a runtime guardrail.

A high-risk result therefore still means:

- do not treat the score as informational only
- use it as the trigger for a remediation cycle
- apply the remediation in the serving path, not in the scoring tool itself

Recommended release states:

| Test Outcome | Recommended Release State | Required Action |
|---|---|---|
| Low | `Approve` | normal monitoring |
| Moderate | `Approve with controls` | add targeted mitigation and schedule retest |
| High | `Restricted / Hold` | block promotion until the failing category is fixed and retested |
| Critical privacy or prompt-exfiltration failure | `No-Go` | stop exposure of the flow, apply emergency controls, inspect logs and data handling |

The biggest `v3` change is not in the release logic. It is in the remediation preference:

- start with `LiteLLM Content Filter`
- only add local semantic models when simple built-in controls are measurably insufficient

---

## 4. Root-Cause View: Fix The Right Layer

When a benchmark fails, classify the failure first:

| Failure Layer | Typical Symptoms | Primary Fix Type |
|---|---|---|
| Input layer | jailbreak, prompt injection, prompt extraction | gateway filter, prompt classifier, input firewall |
| Context / retrieval layer | hallucination from wrong or weak evidence, secret leakage from docs | retrieval cleanup, document policy, source grounding |
| Output layer | toxic output, unsafe advice, leaked PII | output moderation, redaction, abstention |
| Model layer | poor refusal behavior, poor multilingual safety, weak instruction fidelity | stronger model, fine-tuning, local guard model |
| Localization layer | Indonesian slang, code-mixed abuse, local sensitivity missed by generic filters | local rules, local datasets, Indonesian benchmark and tuning |
| Logging / storage layer | PII retained in traces or logs | log scrubbing, masking, retention controls |

Another useful distinction:

| Tool Type | What It Actually Does | Examples |
|---|---|---|
| Evaluation | measures risk only | `Moonshot`, later `Garak` |
| Built-in gateway guardrails | simple first-pass filtering at low complexity | `LiteLLM Content Filter` |
| Privacy runtime filter | detects and masks PII | `Presidio` |
| Scanner / orchestration toolkit | chains local scanners in Python pipeline | `Protect AI LLM Guard` |
| Specialized semantic classifier | targeted model for one risk class | `Protect AI DeBERTa-v3 Prompt Injection` |
| General safety model | local moderation model for broad harm classes | `Llama Guard 3` |
| Localization authority | local benchmark and data basis | `Sahabat-AI`, `IndoSafety`-style datasets |

The core architecture decision in `v3` is:

- do not jump from evaluation directly to heavy model deployment
- add semantic models only after the built-in `LiteLLM` baseline has been measured and shown to fail

---

## 5. Recommended Remediation Playbook By Risk Type

## 5.1 Prompt Injection, Jailbreak, Prompt Extraction

Implement first:

- enable the relevant `LiteLLM Content Filter` categories:
  - jailbreak
  - system prompt extraction
  - data exfiltration
  - SQL injection
  - malicious code
- isolate system instructions
- separate retrieved content from trusted instructions
- keep tool invocation tightly controlled

Escalate only when:

- regex or built-in filters are bypassed
- indirect or semantic attacks are still getting through
- local Indonesian prompt patterns are not caught

Best-fit tools:

- `LiteLLM Content Filter`
  - best MVP first-pass layer
- `Protect AI LLM Guard`
  - best Python pipeline toolkit for chaining scanners after the MVP layer
- `Protect AI DeBERTa-v3 Prompt Injection`
  - best specialized local semantic classifier for prompt injection after Phase 1

Recommended order:

1. turn on `LiteLLM` prompt-attack filters
2. retest with `Moonshot`
3. if attacks still bypass the gateway, run prompt text through the local `DeBERTa-v3` classifier
4. wire the classifier through `LiteLLM` custom guardrail flow or webhook path

Decision:

- `block first`
- use a specialized classifier only after the built-in gateway layer is proven insufficient

## 5.2 PII Leakage and Sensitive Data Exposure

Implement first:

- use `LiteLLM` pattern matching and keyword blocking as an MVP baseline
- add simple masking rules where possible
- ensure sensitive outputs are not stored raw in logs

Escalate only when:

- we need entity-aware masking
- built-in regex rules are not enough
- privacy review requires more precise redaction
- Indonesian names, address formats, or local identifiers need better handling

Best-fit tools:

- `LiteLLM Content Filter`
  - useful as baseline pattern and blocking layer
- `Microsoft Presidio`
  - preferred privacy specialist for prompt and response scrubbing
- `Protect AI LLM Guard`
  - optional scanner orchestration if we want privacy scanning in a chained local pipeline

Recommended order:

1. keep basic `LiteLLM` pattern controls on
2. add local `Presidio` for prompt and response redaction
3. expand recognizers only where the default entities miss local data patterns

Decision:

- `detect, redact, and block first`
- prefer `Presidio` over trying to stretch gateway pattern matching too far

Important note:

`Presidio` remains the privacy specialist. `LiteLLM` built-ins are a useful first pass, not the final privacy solution.

## 5.3 Hallucination and Unsupported Claims

Implement first:

- improve retrieval quality before replacing the model
- require source-bounded answers where retrieval exists
- add abstention behavior for missing evidence
- use deterministic checks for critical business fields

The `v3` refinement is important here:

- do not treat hallucination as a content-filter problem
- do not solve it with generic moderation
- use retrieval, evidence, and answer-contract controls first

Best-fit tools:

- `LiteLLM`
  - useful as gateway and routing layer, but not the main hallucination solution
- `Protect AI LLM Guard`
  - useful orchestration layer if we want to run custom scanner logic in a local pipeline
- local retrieval policy and source-bounded prompting
  - still the primary fix

Lower priority in this `v3` framing:

- `NeMo Guardrails`
- `Guardrails AI`

These may still be valid, but `v3` explicitly prefers the simpler local stack first:

- `LiteLLM` plus retrieval policy plus scanner pipeline

Recommended order:

1. improve retrieval and evidence quality
2. restrict answers to trusted sources
3. add abstention when support is weak
4. retest with `Moonshot`
5. only later consider deeper scanner or validator logic if unsupported claims remain high
6. replace or fine-tune the main model only if wrapper and retrieval fixes still fail

Decision:

- `improve first`
- block only when evidence is missing or the answer is unsupported in a high-risk domain

## 5.4 Toxicity, Hate, Unsafe Specialized Advice

Implement first:

- enable `LiteLLM Content Filter` categories for:
  - harmful violence
  - self-harm
  - child safety
  - denied medical advice
  - denied legal advice
  - denied financial advice
  - toxic and abusive language
  - relevant bias categories

Escalate only when:

- the built-in content filter misses semantic abuse
- Indonesian slang or code-mixed toxicity is not caught
- harmful output is still slipping through despite baseline controls

Best-fit tools:

- `LiteLLM Content Filter`
  - MVP baseline for broad harmful-content restriction
- `Llama Guard 3`
  - preferred all-in-one deep semantic safety model for local GPU deployment
- `Protect AI LLM Guard`
  - preferred Python toolkit for adding local scanner logic and Indonesian customization
- `Sahabat-AI` and `IndoSafety`-style local datasets
  - preferred basis for evaluating and improving Indonesian-language safety coverage

Recommended order:

1. turn on the relevant `LiteLLM` content categories
2. retest with `Moonshot`
3. if semantic abuse still bypasses the baseline, run traffic through local `Llama Guard 3`
4. if Indonesian slang and local nuance are still weak, expand `LLM Guard` scanners and local rules using `Sahabat-AI` / `IndoSafety`-style data

Decision:

- `block first`
- then localize and deepen the moderation stack only where measured gaps remain

---

## 6. Should We Deploy A New Guard Model?

Short answer: **not by default**.

Recommended decision rule:

| Situation | Best Action |
|---|---|
| Need fast MVP protection with minimal operational cost | use `LiteLLM Content Filter` only |
| Need stronger privacy controls | add `Presidio` |
| Need chained local scanners across multiple categories | add `Protect AI LLM Guard` |
| Prompt injection still bypasses built-in controls | add `Protect AI DeBERTa-v3 Prompt Injection` |
| Harmful-content moderation still bypasses built-in controls | add local `Llama Guard 3` |
| Indonesian toxicity or slang still bypasses generic models | expand rules and datasets using `Sahabat-AI` / `IndoSafety`-style localization |
| Hallucination persists after retrieval and prompt fixes | improve retrieval or change the main model before adding generic moderation-only tools |

My recommendation for this repo:

- `P0`: `LiteLLM Content Filter` as the baseline
- `P1`: `Presidio` for privacy and `LLM Guard` for pipeline expansion
- `P2`: local semantic classifiers such as `DeBERTa-v3 Prompt Injection` and `Llama Guard 3` only where evidence shows they are needed
- `P3`: main-model replacement or fine-tuning only when wrapper-first remediation is still insufficient

---

## 7. Are LiteLLM And Presidio Really Free?

## 7.1 LiteLLM

`LiteLLM` core remains effectively free and open-source for the baseline use we care about.

What matters for this refined strategy:

- we are using it first as a deployed gateway and content-filter baseline
- we are not assuming every enterprise feature is free
- we are intentionally using the already deployed `LiteLLM` surface before adding extra infrastructure

Decision:

- `LiteLLM` is valid as the MVP first-pass safety layer
- it is not the only layer we will ever need

## 7.2 Presidio

`Presidio` remains a genuinely free and open-source privacy framework.

Decision:

- use it as the specialist privacy layer
- do not try to replace it with generic gateway regex if privacy risk becomes material

---

## 8. Tool Reality Check

This table reflects the refined `v3` stack priority rather than the broader earlier comparison.

| Tool / Model | Main Role | Cost / License Posture | Main Language | Verdict For Us |
|---|---|---|---|---|
| `LiteLLM` | gateway, routing, tracking, built-in content filter | core OSS with some commercial enterprise features | Python + TypeScript | permanent front door and MVP baseline |
| `Microsoft Presidio` | PII detection, anonymization, redaction | `MIT`, free OSS | Python | best privacy specialist |
| `Protect AI LLM Guard` | local scanner toolkit and pipeline orchestrator | OSS Python toolkit | Python | best second-wave scanner framework |
| `Protect AI DeBERTa-v3 Prompt Injection` | prompt-injection classifier | open model on Hugging Face | Python ecosystem | best targeted prompt-injection upgrade after MVP |
| `Llama Guard 3` | general semantic safety model | local model deployment with Meta community license | Python ecosystem | best broad harmful-content upgrade after MVP |
| `Moonshot` | benchmark and scoring engine | `Apache-2.0`, free OSS | Python | benchmark trigger for remediation |
| `Sahabat-AI` / `IndoSafety`-style local data | Indonesian localization authority | open initiative / local benchmark basis | mixed | critical for Indonesian safety quality |

Important nuance:

- `Moonshot` measures
- `LiteLLM` blocks the obvious baseline cases
- `Presidio` handles privacy
- `LLM Guard` coordinates local scanners
- `DeBERTa-v3` handles specialized injection detection
- `Llama Guard 3` handles broader semantic harmful-content moderation
- local Indonesian data is required to make the stack credible in the Telkom context

---

## 9. Architecture Recommendation For AIModelDev

Recommended refined 2026 baseline:

### Layer 1: Runtime Gateway

- `LiteLLM`
- routing
- request tracking
- token tracking
- built-in content filter categories

### Layer 2: Privacy Controls

- `Presidio`
- input scrubbing
- output redaction
- log redaction

### Layer 3: Local Scanner Pipeline

- `Protect AI LLM Guard`
- custom scanner chaining
- local rule extension
- local webhook or custom guardrail integration back into `LiteLLM`

### Layer 4: Specialized Semantic Models

- `Protect AI DeBERTa-v3 Prompt Injection`
- `Llama Guard 3`

These should not be the baseline. They should be activated only when the Phase 1 gateway layer is insufficient.

### Layer 5: Evaluation Loop

- `Moonshot`
- later deeper adversarial or regression tooling if needed

### Layer 6: Localization Controls

- Indonesian rules
- code-mixed Bahasa-English patterns
- `Sahabat-AI` and `IndoSafety`-style benchmarks
- local slang and cultural nuance review

---

## 10. Taxonomy Change Recommendation

I recommend refining the earlier taxonomy wording in these ways:

1. move `LiteLLM Content Filter` to the center of the MVP strategy, not just as one generic gateway feature
2. keep `Presidio` as the explicit privacy specialist
3. reduce emphasis on broad early deployment of `NeMo Guardrails` and `Guardrails AI`
4. emphasize `Protect AI LLM Guard` as the preferred second-wave Python scanner toolkit
5. emphasize `Protect AI DeBERTa-v3 Prompt Injection` as the preferred specialized prompt-injection classifier
6. emphasize `Llama Guard 3` as the preferred broad semantic moderation model after MVP
7. explicitly add `Bahasa Indonesia` localization as a required taxonomy layer, not an optional afterthought

---

## 11. Proposed Priority

| Priority | Recommendation | Why |
|---|---|---|
| `P0` | `LiteLLM Content Filter` + basic routing and telemetry | lowest-friction MVP baseline |
| `P1` | add `Presidio` and `Protect AI LLM Guard` | strongest second-wave privacy and scanner expansion |
| `P2` | add `DeBERTa-v3 Prompt Injection` and `Llama Guard 3` on local GPU only where evidence proves they are needed | targeted semantic expansion without overbuilding |
| `P3` | fine-tuning, provider change, or heavier model-side redesign | only after the wrapper and scanner stack is proven insufficient |

---

## 12. Bottom-Line Answers

### If Moonshot says high risk, what should we do?

Hold or restrict release, identify the failing layer, remediate in the serving path, and rerun the same benchmark.

### What should be the MVP baseline?

`LiteLLM Content Filter`.

### What should be the first specialist add-on?

`Presidio` for privacy.

### What should be the first semantic prompt-attack upgrade?

`Protect AI DeBERTa-v3 Prompt Injection`.

### What should be the first broad semantic safety upgrade?

`Llama Guard 3`.

### What is the preferred Python scanner toolkit after MVP?

`Protect AI LLM Guard`.

### How do we solve the Indonesian localization gap?

Use local rules, local benchmarks, and `Sahabat-AI` / `IndoSafety`-style data. Do not trust generic Western moderation models without local validation.

---

## 13. Sources

- LiteLLM GitHub repo: https://github.com/BerriAI/litellm
- LiteLLM docs: https://docs.litellm.ai/
- Microsoft Presidio GitHub repo: https://github.com/microsoft/presidio
- Microsoft Presidio docs: https://microsoft.github.io/presidio/
- Protect AI LLM Guard GitHub repo: https://github.com/protectai/llm-guard
- Protect AI DeBERTa-v3 Prompt Injection model: https://huggingface.co/protectai/deberta-v3-base-prompt-injection-v2
- Llama Guard 3 model card: https://huggingface.co/meta-llama/Llama-Guard-3-8B
- Sahabat-AI Hugging Face organization: https://huggingface.co/Sahabat-AI
- Moonshot GitHub repo: https://github.com/aiverify-foundation/moonshot

