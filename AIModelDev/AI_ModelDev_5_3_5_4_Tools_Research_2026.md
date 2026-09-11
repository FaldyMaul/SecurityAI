# Deep Research: Tools for 5.3 Hallucination and 5.4 Toxicity / Hate / Unsafe Specialized Advice

Last updated: 2026-04-07

## 1. Scope

This note re-checks which tools are suitable for:

- `5.3 Hallucination and Unsupported Claims`
- `5.4 Toxicity, Hate, Unsafe Specialized Advice`

The goal here is narrower than general architecture research:

- identify tools that can actually improve runtime behavior or mitigation
- separate `evaluation-only` tools from `runtime control` tools
- check whether the tool is open-source, free, or model-license restricted
- determine whether we should `improve`, `block`, or `replace model`

---

## 2. Short Answer

The two categories need different treatment.

### 5.3 Hallucination and Unsupported Claims

Best default posture:

- `improve first`
- `block only when confidence / grounding is weak`

Why:

- hallucination is mainly a `grounding`, `retrieval`, `answer-contract`, and sometimes `base-model quality` problem
- moderation-only tools do not really fix factuality

Best tool types:

- runtime grounding rails
- provenance or fact-check validators
- retrieval hardening
- factuality evaluation tools
- optional fine-tuning or stronger base model if wrapper fixes fail

### 5.4 Toxicity, Hate, Unsafe Specialized Advice

Best default posture:

- `block first`
- then improve localization and false-positive / false-negative behavior

Why:

- harmful content is well suited to input and output moderation
- runtime classifiers and moderation rails are usually the right first intervention

Best tool types:

- content safety rails
- moderation validators
- small safety classifier model
- localized policy rules
- later fine-tuning only if the moderation layer is still too weak

---

## 3. Important Distinction: Improve The Model vs Improve The System

Many tools improve the **system behavior** without changing the main model weights.

| Type | What It Changes | Examples |
|---|---|---|
| Evaluation | measures risk only | `Moonshot`, `Ragas`, `DeepEval` |
| Runtime guardrails | intercepts inputs / outputs / retrieval | `NeMo Guardrails`, `Guardrails AI`, `LiteLLM` policies |
| Runtime safety model | separate moderation / classification model | `Llama Guard 3`, `ShieldGemma` |
| Privacy-specific runtime filter | PII detection / masking | `Presidio` |
| Weight-level improvement | changes the main model behavior itself | fine-tuning, preference tuning, model replacement |

So if you ask "what tools improve the model?", the practical answer is:

- most teams should first improve the **system**
- only later improve the **weights**

---

## 4. Deep Research for 5.3 Hallucination and Unsupported Claims

## 4.1 What Actually Helps

For `5.3`, the most useful tools are the ones that enforce grounding or detect unsupported claims before the answer reaches the user.

The strongest current OSS-style options I found are:

1. `NeMo Guardrails`
2. `Guardrails AI`
3. `Ragas`
4. `DeepEval`

But they do different jobs.

## 4.2 Best Runtime Tool: NeMo Guardrails

Why it matters:

- NVIDIA documents both `self check facts` and `self check hallucination` rails
- these are runtime output rails, not just dashboards
- they can be configured to `block` or `warn`
- fact-checking works with `RAG` evidence via `relevant_chunks`

What the official docs confirm:

- fact-checking rails ensure the answer is grounded in evidence
- hallucination rails can operate even when there are no supporting docs
- output rails can refuse to respond if factuality score is too low
- guardrails can run at input, retrieval, and output stages

Practical fit:

- very good for `5.3`
- especially strong if your application already has `RAG`
- more useful than a toxicity classifier for hallucination problems

Caution:

- this is still a wrapper / rail approach
- it improves production behavior, but it does not retrain the main model
- some NVIDIA-managed deployment patterns may require NVIDIA infrastructure or API usage, even though the toolkit itself is OSS

Verdict:

- `P0/P1` candidate for `5.3`

## 4.3 Strong Runtime Validator Option: Guardrails AI

Why it matters:

- Guardrails AI is a Python framework for input and output guards
- its hub includes factuality validators such as `ProvenanceLLM` and `ProvenanceEmbeddings`
- these validators are meant to stop unsupported output from reaching the user

What the official docs confirm:

- `ProvenanceLLM` checks generated text against provided sources and embeddings
- it is intended for `RAG` applications to reduce hallucination
- Guardrails can intercept outputs in the application critical path

Practical fit:

- strong option for `5.3` when you have source documents
- especially useful if you want lighter-weight validation than a full NeMo rail stack
- easier to use as validator modules around a Python application

Caution:

- some validators still rely on another LLM call or embeddings
- that means extra latency and possibly extra inference cost
- it is strongest for source-grounded apps, not general parametric QA

Verdict:

- `P1` candidate for `5.3`

## 4.4 Best Evaluation Tools for 5.3: Ragas and DeepEval

`Ragas`:

- official docs define `Faithfulness` as factual consistency between response and retrieved context
- useful for measuring whether your retrieval and answer grounding improved
- good for offline evaluation, regression testing, and testset generation

`DeepEval`:

- OSS framework with metrics for hallucination, faithfulness, answer relevancy, and multi-turn behavior
- very useful for CI-style evaluation and app quality tracking

Important limitation:

- both are primarily **evaluation frameworks**
- they do not directly block unsafe or unsupported output in production unless you wire them into your serving path

Verdict:

- use them to measure and iterate
- do not mistake them for production guardrails

## 4.5 What To Actually Do For 5.3

Recommended order:

1. improve retrieval quality
2. require source-bounded answers
3. add output fact-check or provenance rail
4. add abstention when evidence is missing
5. run `Ragas` or `DeepEval` and `Moonshot` again
6. only then consider changing the main model

Best tool stack for `5.3`:

| Role | Best Option | Why |
|---|---|---|
| Runtime grounding | `NeMo Guardrails` | built-in fact-check and hallucination output rails |
| Runtime source validation | `Guardrails AI ProvenanceLLM` / `ProvenanceEmbeddings` | checks whether output is supported by sources |
| Retrieval faithfulness evaluation | `Ragas` | good for RAG faithfulness and retrieval metrics |
| App regression evaluation | `DeepEval` | good for iterative test automation |

## 4.6 Should We Block Or Improve For 5.3?

Answer:

- `improve first`
- `block selectively`

Blocking should happen when:

- evidence is missing
- the answer is unsupported
- the domain is high-risk, e.g. product tariff, SLA, legal, financial, privacy, health

But the primary solution is:

- retrieval cleanup
- source validation
- answer contract design
- abstention behavior

If repeated runs still fail after that, then:

- upgrade the base model, or
- fine-tune / preference-tune for citation and abstention behavior

---

## 5. Deep Research for 5.4 Toxicity, Hate, Unsafe Specialized Advice

## 5.1 What Actually Helps

For `5.4`, the best tools are runtime moderation tools and safety classifiers.

The strongest candidates I found are:

1. `NeMo Guardrails` content safety
2. `Llama Guard 3`
3. `Guardrails AI ToxicLanguage`
4. `ShieldGemma`
5. `Detoxify`

These are much more naturally aligned to `block first`.

## 5.2 Best Orchestration Layer: NeMo Guardrails Content Safety

Why it matters:

- NVIDIA documents content safety rails for both input and output checks
- it explicitly supports content safety models such as `Llama Guard 3` and `ShieldGemma`
- it can sit between the application and the LLM

What the official docs confirm:

- content safety guardrails protect against violence, criminal activity, hate speech, explicit content, and similar risks
- input and output checks are both supported
- multiple models and third-party services can be combined

Practical fit:

- strong orchestration layer for `5.4`
- especially useful if you want one unified runtime rail system instead of ad hoc validators

Verdict:

- `P0/P1` for moderation orchestration

## 5.3 Best Small Safety Model: Llama Guard 3 1B

Why it matters:

- it is designed specifically for content safety classification
- it can classify both prompts and responses
- the 1B version is much more practical than larger moderation models for low-cost deployment

What the official model card confirms:

- it supports both prompt and response classification
- it is aligned to the MLCommons hazards taxonomy
- it covers hazard categories including `Specialized Advice`, `Privacy`, `Hate`, `Suicide & Self-Harm`, and `Sexual Content`
- supported languages are `English, French, German, Hindi, Italian, Portuguese, Spanish, Thai`

Important caveat:

- `Bahasa Indonesia` is **not** listed in the official supported-language list
- however, the model card does report an Indonesian evaluation score
- therefore it is promising for Indonesian traffic, but still should not be trusted without local validation
- the model license is `Llama 3.2 Community License`, not MIT or Apache OSS

Practical fit:

- strong runtime moderation model for `5.4`
- especially good if you need a local safety model rather than a cloud API

Verdict:

- `P1` for runtime moderation, with language-gap caution

## 5.4 Alternative Safety Model: ShieldGemma

Why it matters:

- Google positions ShieldGemma as ready-made open-weight safety classifiers
- targeted harm categories include dangerous content, hate, harassment, and sexual content

Important caveat:

- the official model card says the text model is available in `English`
- that makes it weaker for Indonesia-first deployment unless you add translation or custom tuning

Practical fit:

- useful if your moderation workload is mostly English
- not my first recommendation for Telkom Indonesia traffic

Verdict:

- `P2` for this repo, mainly because of language fit

## 5.5 Practical Validator Layer: Guardrails AI ToxicLanguage

Why it matters:

- Guardrails AI provides a `ToxicLanguage` validator
- it can remove toxic sentences or fail the response
- there is also a newer `ToxicLanguageLLM` variant using an LLM backbone via `LiteLLM`

What the docs confirm:

- the model-backed `ToxicLanguage` validator uses `Detoxify` / `toxic-bert`
- the validator can operate on sentence level and strip toxic spans
- the LLM-based version can use an external LLM instead of a local classifier

Practical fit:

- useful as a fast application-layer moderation step
- easier to integrate than a larger guardrail framework if you only need one or two validators

Caution:

- the default validator lineage is heavily English-centric
- the LLM-based version adds dependency on another model and extra cost

Verdict:

- `P1` as a simple validator layer

## 5.6 Lightweight OSS Toxicity Model: Detoxify

Why it matters:

- simple OSS toxicity classifier
- Guardrails AI itself uses Detoxify in its ToxicLanguage validator

What the repo confirms:

- it has `original`, `unbiased`, and `multilingual` models
- the multilingual benchmark breakdown shown in the repo covers `it`, `fr`, `ru`, `pt`, `es`, and `tr`

Important caveat:

- `Bahasa Indonesia` is not listed in its documented multilingual breakdown
- so it should not be treated as a reliable Indonesia-first moderation model without local validation

Verdict:

- useful as low-cost baseline
- not enough alone for Indonesian production traffic

## 5.7 What To Actually Do For 5.4

Recommended order:

1. add input and output moderation first
2. block or rewrite toxic / unsafe advice output
3. add localized policy rules and test packs in Bahasa Indonesia
4. run adversarial safety tests again
5. only if bypasses stay high, add a dedicated safety model or fine-tune

Best tool stack for `5.4`:

| Role | Best Option | Why |
|---|---|---|
| Guardrail orchestrator | `NeMo Guardrails` | unified input/output moderation rails |
| Small runtime safety model | `Llama Guard 3 1B` | practical size, covers specialized advice and hate |
| App-layer validator | `Guardrails AI ToxicLanguage` | easy validator integration |
| Low-cost local toxicity baseline | `Detoxify` | simple OSS classifier |
| English-only alternative | `ShieldGemma` | valid, but weaker language fit for Indonesian |

## 5.8 Should We Block Or Improve For 5.4?

Answer:

- `block first`
- `improve second`

Blocking should be the default for:

- hate speech
- abusive content
- self-harm encouragement
- unsafe medical / legal / financial advice
- explicit violent or criminal guidance

Improvement after blocking means:

- reduce false positives
- reduce false negatives
- add localized coverage for Indonesian and code-mixed Bahasa-English traffic
- optionally fine-tune a classifier or the main model if refusal quality is unstable

---

## 6. Recommended Tool Decision

## 6.1 For 5.3 Hallucination

Use:

- `NeMo Guardrails` for runtime fact-checking / hallucination rails
- `Guardrails AI ProvenanceLLM` for source-backed output validation
- `Ragas` or `DeepEval` for offline measurement

Do not rely on:

- pure moderation models
- toxicity filters
- `Moonshot` alone

Best posture:

- improve first
- block only when unsupported

## 6.2 For 5.4 Toxicity / Hate / Unsafe Advice

Use:

- `NeMo Guardrails` as orchestration layer
- `Llama Guard 3 1B` as the best practical small safety model
- `Guardrails AI ToxicLanguage` as simpler validator layer
- `Detoxify` only as low-cost baseline or component

Do not rely on:

- factuality tools
- retrieval metrics alone
- English-only safety assumptions for Indonesian traffic

Best posture:

- block first
- then improve localization and safety coverage

---

## 7. Recommendation For Telkom / Indonesia Context

This is the most important practical finding from the research:

- many strong open tools are good technically
- but language coverage is often not ideal for Indonesian

Implication:

- for `5.3`, this is less severe because grounding is source-based and can still work well with Indonesian content if retrieval is strong
- for `5.4`, this is more severe because toxicity, hate, and unsafe advice detection are often language-specific

Recommended Indonesia-aware approach:

1. use `NeMo Guardrails` or `Guardrails AI` as the orchestration layer
2. use `Llama Guard 3 1B` as a first moderation model if needed
3. add Bahasa Indonesia lexicon and policy rules immediately
4. build an internal Indonesian safety benchmark pack
5. validate all candidate classifiers on Indonesian and code-mixed traffic before trusting them
6. if performance is weak, fine-tune a multilingual or Indonesian classifier rather than trusting an English-first model

Inference:

- for this repo, `5.3` can likely be improved with wrappers and RAG hardening
- for `5.4`, a localized moderation dataset and custom tuning may become necessary faster

---

## 8. Final Recommendation

If you want the smallest credible stack:

### 5.3

- `NeMo Guardrails`
- `Ragas`
- optional `Guardrails AI ProvenanceLLM`

### 5.4

- `NeMo Guardrails`
- `Llama Guard 3 1B`
- `Guardrails AI ToxicLanguage`
- localized Indonesian rules

If you want one sentence:

- `5.3` needs grounding tools
- `5.4` needs moderation tools

---

## 9. Sources

- NeMo Guardrails official overview: https://docs.nvidia.com/nemo/guardrails/latest/about/rail-types.html
- NeMo Guardrails fact-checking and hallucination rails: https://docs.nvidia.com/nemo/guardrails/latest/configure-rails/guardrail-catalog/fact-checking.html
- NeMo Guardrails content safety: https://docs.nvidia.com/nemo/guardrails/latest/configure-rails/guardrail-catalog/content-safety.html
- NeMo Guardrails GitHub: https://github.com/NVIDIA-NeMo/Guardrails
- Guardrails AI docs: https://www.guardrailsai.com/docs/
- Guardrails AI validators docs: https://guardrailsai.com/guardrails/docs/concepts/validators
- Guardrails AI ProvenanceLLM validator: https://guardrailsai.com/hub/validator/guardrails/provenance_llm
- Guardrails AI ProvenanceEmbeddings validator: https://guardrailsai.com/hub/validator/guardrails/provenance_embeddings
- Guardrails AI ToxicLanguage validator: https://guardrailsai.com/hub/validator/guardrails/toxic_language
- Guardrails AI ToxicLanguageLLM validator: https://guardrailsai.com/hub/validator/guardrails/toxic_language_llm
- Guardrails AI GitHub: https://github.com/guardrails-ai/guardrails
- Ragas faithfulness docs: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/
- Ragas GitHub: https://github.com/vibrantlabsai/ragas
- DeepEval GitHub: https://github.com/confident-ai/deepeval
- Meta Purple Llama GitHub: https://github.com/meta-llama/PurpleLlama
- Llama Guard 3 1B model card: https://huggingface.co/meta-llama/Llama-Guard-3-1B
- Google ShieldGemma safeguards page: https://ai.google.dev/responsible/docs/safeguards/shieldgemma
- Google ShieldGemma model card: https://ai.google.dev/gemma/docs/shieldgemma/model_card
- Detoxify GitHub: https://github.com/unitaryai/detoxify
