# Apilogy AI Capability and Sandbox Integration

This document captures the role of `Apilogy` in the `AI Sandbox` initiative and explains how it should be positioned in the product and technical architecture.

It is based on:

- local capability list file: `D:\Work\PAM\SecurityAI\AI Capability List PAM 2026(Capability PAM 19 2 26).csv`
- the provided `Telkom LLM` endpoint example from `Apilogy`

---

## 1. What Apilogy Is

`Apilogy` is an internal API marketplace used in Telkom that stores and exposes many AI endpoints.

From the capability list, Apilogy already contains endpoints across multiple AI capability types, including:

- `LLM`
- `LMM` or multimodal services
- `STT`
- `TTS`
- `Embedding`
- OCR and document AI
- classification and extraction APIs
- computer vision APIs

This means `Apilogy` should be treated as a major internal ecosystem system for the AI Sandbox, but not the only possible source of model endpoints.

---

## 2. Why Apilogy Matters for the Sandbox

Apilogy changes the sandbox design in an important way.

Instead of assuming that every model owner manually types all endpoint details from zero, the sandbox can treat Apilogy as:

- a source of model and endpoint inventory
- a source of metadata about capabilities and deployment style
- a source of documentation for input/output format and usage pattern
- a source of candidate models to assess and rank
- a place where use case builders can later store or publish specific use cases around those capabilities

This is especially important because the long-term product is not only a testing tool. It is also a `model discovery and trust layer`.

If the company already has a marketplace of AI endpoints, the sandbox should eventually sit alongside it and enrich it with:

- trust scores
- approval status
- security findings
- privacy notes
- use case guidance

The sandbox should also support endpoints outside `Apilogy`, such as external providers like `Azure`, as long as they are standardized through `LiteLLM`.

---

## 3. Current Focus

Even though Apilogy contains many AI capability types, the current main focus should remain:

- `LLM assessment first`

That means the first integration target from Apilogy should be the `LLM` endpoints, especially:

- `Telkom LLM`

Other AI categories such as `STT`, `TTS`, `Embedding`, `OCR`, or multimodal services are relevant for the future, but should not expand the MVP scope yet.

The recommended scope progression is:

1. `LLM`
2. later `LMM` and agent-related services
3. later other AI API categories where the benchmark model and evaluation approach is clear

---

## 4. What the Capability CSV Tells Us

From the local CSV, Apilogy already contains a broad list of internal AI capabilities with useful metadata fields such as:

- `Name`
- `Desc`
- `Model used`
- `Model Deployment`
- `Input Data`
- `Input Format`
- `Input PII Flag`
- `Input Data Retention`
- `Output Data`
- `Output Format`
- `Output PII Flag`
- `Output Data Retention`
- `Trial for Public Flag`
- `Whitelist Flag`
- `Link`

This metadata is valuable because the sandbox can reuse it to pre-populate model or capability records.

Examples of useful data for sandbox integration:

- model family and deployment model
- input and output modality
- PII exposure clues
- retention behavior
- whether the endpoint is publicly trialable
- endpoint documentation link

These fields are relevant for risk context even before technical benchmark execution starts.

---

## 5. Key Example: Telkom LLM

One important Apilogy capability is:

- `Telkom LLM`

Based on the provided example, the documented characteristics include:

- category: `AI / Machine Learning`
- publisher: `telkom_ai_dag`
- version: `0.0.4`
- endpoint style: chat completions
- request header: `x-api-key`
- endpoint path:
  - `https://telkom-ai-dag.api.apilogy.id/Telkom-LLM/0.0.4/llm/chat/completions`

The example request format is already close to a standard chat-completions interface:

- `model`
- `messages`
- `max_tokens`
- `temperature`
- `stream`

This is useful because it means the sandbox can likely integrate Apilogy-hosted LLM endpoints without inventing a completely custom payload model.

---

## 6. Strategic Positioning of Apilogy

For architecture planning, `Apilogy` should be positioned as:

- the `internal AI capability marketplace`
- a platform where internal users can subscribe to capabilities and manage specific use cases

The `AI Sandbox` should be positioned as:

- the `trust, assessment, review, and ranking layer`

This distinction matters.

Apilogy is where many capabilities exist, are discovered, and can later be subscribed to by internal users.

The sandbox is where those capabilities are evaluated and given:

- benchmark scores
- risk labels
- approval status
- publication status
- usage guidance

In the long term, the strongest user experience is:

1. A model provider adds an endpoint into the sandbox.
2. The sandbox assesses it and produces trust results.
3. Internal builders subscribe to capabilities in `Apilogy` or use them in `AgentLab`.
4. The sandbox trust score is shown wherever model selection happens.

---

## 7. Recommended Integration Model

The recommended integration approach is progressive.

## Stage 1: Support endpoint intake with Apilogy reference

For MVP, the sandbox can:

- allow manual endpoint registration in the sandbox
- optionally import selected endpoint details from Apilogy
- store the Apilogy link as source reference
- treat Apilogy metadata as the initial capability record

This avoids forcing users to duplicate metadata when the endpoint already exists in Apilogy, while still allowing endpoints that come from outside Apilogy.

## Stage 2: Sandbox-managed assessment record

The sandbox should create its own internal record for:

- assessment runs
- trust scores
- review decisions
- publication status

Apilogy should not be overloaded to become the benchmark execution system itself.

## Stage 3: Surface trust status back into discovery flows

Later, the trust result can be surfaced:

- on a sandbox ranking page
- on a published model profile
- inside `AgentLab`
- in Apilogy-linked discovery and subscription flows later

---

## 8. What Should Be Imported from Apilogy

For LLM-first integration, the sandbox should import at least:

- capability name
- description
- publisher
- version
- endpoint URL
- authentication header name
- input format
- output format
- model family or base model
- deployment type
- PII-related fields
- retention-related fields
- Apilogy detail link

If available later, the sandbox should also import:

- category tags
- environment information
- ownership information
- support contact

---

## 9. What Should Stay Owned by the Sandbox

The sandbox should own:

- benchmark package selection
- benchmark runs
- raw benchmark artifacts
- normalized scorecards
- review decisions
- publication decisions
- model ranking
- use case guidance

This keeps the trust workflow separate from the marketplace inventory workflow.

---

## 10. Risk and Governance Implications

The Apilogy CSV includes fields that are useful for governance context before testing starts.

For example:

- `Input PII Flag`
- `Output PII Flag`
- `Input Data Retention`
- `Output Data Retention`

These do not replace benchmark testing, but they are strong signals for:

- privacy review priority
- data handling classification
- likely need for runtime controls
- risk tagging in the sandbox

This means the sandbox should eventually combine:

- declared metadata from Apilogy
- measured technical results from benchmark execution

That combination will be much more useful than benchmark scores alone.

---

## 11. Recommended MVP Use of Apilogy

For the MVP, Apilogy should be used in a controlled and simple way.

Recommended MVP usage:

1. register one or a few LLM endpoints in the sandbox
2. where relevant, link them to Apilogy metadata and detail pages
3. run baseline benchmark on those LLM endpoints
4. review and publish the results
5. expose the published score to internal builders

The first candidate should be:

- `Telkom LLM`

This is the cleanest path because:

- the endpoint is already documented
- the request format is clear
- it aligns with the LLM-first strategy

---

## 12. Future Expansion Beyond LLM

Once the LLM workflow is stable, Apilogy enables broader expansion.

Potential later expansion areas:

- multimodal endpoint assessment
- embedding service readiness scoring
- OCR and document intelligence risk review
- speech model assessment
- capability-specific policy overlays

However, these should only be added after the LLM scoring workflow is proven.

---

## 13. Final Recommendation

Apilogy should be treated as a major ecosystem dependency for the AI Sandbox, but not as the only system boundary.

In practical terms:

- `Apilogy` is the internal capability marketplace and use case platform
- `AI Sandbox` is the trust, review, and ranking layer
- `LiteLLM` is the standardization layer for Apilogy-hosted endpoints and external providers such as `Azure`

For now, the sandbox should:

- focus on `LLM` endpoints first
- let model providers add endpoints directly into the sandbox
- reuse Apilogy metadata where relevant
- standardize endpoint access through `LiteLLM`
- keep benchmark execution and review inside the sandbox
- later surface approved ratings into ranking pages, `AgentLab`, and Apilogy-linked discovery flows where useful

This gives the product a strong integration path without expanding the MVP beyond what the team can deliver.
