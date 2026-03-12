# Telkom AI Assessment and Indonesia AI Model Hub Roadmap

This document defines the product direction for an `AI Model Hub / AI Sandbox` that can assess AI models for trust, safety, security, and governance readiness.

The immediate implementation target is to assess internal company models, starting with `Telkom AI` based on `Qwen 30B`.

The long-term target is to build a repeatable platform that can maintain, assess, compare, and monitor AI models and AI applications used in Indonesia, while preserving technical evidence that can support internal risk management and external assurance programs.

An important Telkom-specific context is that `Apilogy` already exists as an internal API marketplace containing many AI endpoints, including `LLM`, `LMM`, `STT`, `TTS`, `Embedding`, and other AI capabilities. In this roadmap, `Apilogy` should be treated as an important internal capability marketplace and use case platform, while the `AI Sandbox` becomes the trust, assessment, review, and ranking layer. Endpoints may come from Apilogy or from external providers such as `Azure`, but they should be standardized through `LiteLLM`. In practice, builders may subscribe to models through Apilogy while still relying on sandbox scores as the trust signal.

---

## 1. Product Vision

The long-term product is not only a benchmark runner. It is a **trust, risk, and assurance platform for AI models and AI applications**.

At a high level, the product should allow:

- model providers to register an endpoint and submit a model for assessment
- platform operators to define benchmark packs, security scans, and policy mappings
- developers and solution teams to discover which models are suitable for which use cases
- governance, audit, and risk teams to review evidence, findings, and trend history
- internal platforms such as `AgentLab` to consume model scores and recommendations before using a model in production workflows

In the long term, the platform should function as:

- an internal `AI Model Registry` with trust and readiness scores
- an `AI Sandbox` for controlled testing of model endpoints and agentic systems
- a `compliance evidence engine` that maps technical findings into governance language
- a `decision-support layer` for developers choosing which model to use in apps, RAG systems, and agent workflows

---

## 2. Product Outcome

The product should answer four practical questions:

1. Is this model safe enough to use?
2. What is this model good or bad at?
3. What risks must be mitigated before developers use it?
4. What evidence exists to support internal governance and compliance review?

That means the output should not be a single flat pass or fail. The platform should produce a structured scorecard that can be used by different audiences.

Recommended output dimensions:

- `Model Trust Score`
- `Security Score`
- `Privacy Score`
- `Application Readiness Score`
- `Compliance Evidence Coverage`

Each score should be backed by category-level findings and raw evidence.

In practice, these trust signals should later enrich endpoint discovery flows already available through `Apilogy` and `AgentLab`.

---

## 3. Primary Users

The roadmap should support different user groups from the start.

### Model providers

These users submit model endpoints and expect the platform to assess them.

Example actions:

- register endpoint
- provide authentication and parameters
- trigger benchmark packages
- view overall ratings and detailed failures

### Use case developers

These users build business applications on top of the models.

Example actions:

- compare candidate models
- review strengths and weaknesses
- see whether a model is suitable for chat, RAG, or agentic use cases
- consume recommendations before integrating the model into apps

### AgentLab teams

These users build flows, assistants, and agents in `AgentLab`, your OSS `Flowise`-based environment.

Example actions:

- select a pre-assessed model
- see restrictions and recommended controls
- understand whether a model needs runtime protection or additional testing

### Governance, risk, and audit teams

These users review evidence and control coverage.

Example actions:

- inspect findings by category
- trace results to raw artifacts
- review history across repeated assessments
- map findings to ISO, NIST, OWASP, and Indonesia-specific policy expectations

---

## 4. Long-Term Product Scope

The long-term platform should cover three connected layers: `model evaluation`, `application evaluation`, and `runtime protection guidance`.

## Layer A: Model evaluation

This layer answers whether a base model or hosted endpoint is suitable for safe use.

Core concerns:

- harmful content and refusal quality
- prompt injection resistance
- privacy leakage and sensitive disclosure
- bias and fairness
- factuality and localized knowledge
- model stability across repeated tests

Primary engine:

- `Moonshot`

Optional additional engines:

- `Garak` for aggressive offensive security scanning
- `PyRIT` for advanced multi-turn conversational red teaming

## Layer B: Application and agent evaluation

This layer answers whether an application built on top of a model is suitable for real use.

Core concerns:

- answer relevancy
- faithfulness and hallucination control
- retrieval quality for RAG
- tool selection correctness
- task completion quality
- role adherence and memory consistency

Primary engine:

- `DeepEval`

Optional additional engine:

- `Giskard` for collaborative RAG and QA review, especially when business users or domain experts need more visibility

## Layer C: Runtime protection guidance

This layer answers what control should sit in front of a model before it is used in production.

Core concerns:

- prompt injection filtering
- PII masking and redaction
- output leakage prevention
- harmful prompt blocking
- policy enforcement

Primary tool:

- `LLM Guard`

Important: `LLM Guard` is not the main offline benchmark engine. It is a runtime protection layer and should be positioned that way in the product.

---

## 5. Strategic Recommendation on Tools

The main product foundation should be:

- `Apilogy` as an internal capability marketplace and use case platform
- `LiteLLM` as the endpoint adapter and unified access layer
- `Moonshot` as the core model benchmark engine
- custom `FastAPI` backend for orchestration, normalization, scoring, and workflow
- `PostgreSQL` for metadata and normalized results
- `Object storage` for raw artifacts
- `React` or `Next.js` for the web UI

The recommended tool positioning is:

- `Moonshot`: main layer for baseline model assessment
- `DeepEval`: main layer for app, RAG, and agent evaluation
- `LLM Guard`: runtime protection layer, not a benchmark layer
- `PyRIT`: advanced security layer, added after baseline scoring works
- `Garak`: additional offensive security layer, useful but not foundational for MVP
- `Giskard`: additional QA and RAG review layer, useful but not foundational for MVP

So for planning purposes:

- `Moonshot` is foundational
- `DeepEval` becomes foundational once the platform evaluates apps and agents, not only raw models
- `PyRIT`, `Garak`, and `Giskard` are expansion layers
- `LLM Guard` is a production control layer

---

## 6. Long-Term Product Flow

The intended product flow is:

1. A model provider registers a model endpoint in the sandbox.
2. The platform validates connectivity and stores metadata.
3. The provider clicks a benchmark package such as `Core`, `Security`, or `Application Readiness`.
4. The backend orchestrates the relevant tools and stores raw outputs.
5. The platform normalizes tool-specific outputs into one scoring model.
6. The platform publishes ratings, category scores, findings, and recommended controls.
7. Developers and `AgentLab` teams consume those results before selecting the model for production use.
8. Apilogy use case builders can reuse the same trust signal when subscribing to models for their specific use cases.

This means the product is not only a testing console. It is also a **model selection and trust decision platform**.

In the Telkom environment, this platform should progressively become the trust layer that feeds approved results into both `AgentLab` and model discovery or use case flows linked to `Apilogy`.

---

## 7. Long-Term Target Capabilities

In the full product vision, the platform should support:

- model registry and endpoint catalog, with optional linkage to `Apilogy`
- benchmark package manager
- dataset and prompt pack manager
- recurring and scheduled evaluations
- versioned results history
- cross-model comparison
- sector-specific policy packs
- compliance evidence mapping
- model recommendation for developers
- integration with `AgentLab` and other internal build platforms

Long-term benchmark packages can be organized as:

- `Core Trust Package`
- `Security Red Team Package`
- `Privacy and Data Leakage Package`
- `Indonesia Localization Package`
- `RAG and Agent Package`
- `Sector Packs` such as telco, public sector, finance, health, and education

---

## 8. MVP Definition

The MVP should stay narrow. The goal is not to build the national platform in the first release.

The MVP goal is:

**Assess `Telkom AI (Qwen 30B)` through one repeatable workflow and produce a scorecard that developers and governance teams can actually use.**

### MVP users

- internal model owner
- internal governance and risk reviewer
- internal use case developer
- internal `AgentLab` team

### MVP use case

One model provider submits one endpoint, runs one benchmark package, and gets:

- an overall rating
- category-level scores
- a list of failing cases
- raw evidence references
- recommended controls before using the model in apps

For Telkom, the most practical first path is to let the model provider add the endpoint into the sandbox, optionally link it to `Apilogy`, and keep execution, review, and publication inside the sandbox.

### MVP success condition

The MVP is successful when an internal team can evaluate `Telkom AI`, review the results, and decide whether it is ready to be used in `AgentLab` or other internal applications.

---

## 9. MVP Scope

The MVP should only include what is required to produce a useful first decision.

### In scope

- register one model endpoint, with optional linkage to an `Apilogy` capability record
- trigger one benchmark package from the UI
- run automated tests and store raw artifacts
- calculate normalized scores
- show overall and category-level ratings
- show failing prompts and sample outputs
- export a summary report
- support one internal decision: suitable or not suitable for defined use cases

### Out of scope

- multi-tenant external customer support
- many benchmark engines at once
- national sector packs
- full workflow automation for certification
- large policy management features
- complex Kubernetes deployment

---

## 10. MVP Architecture

The MVP architecture should be intentionally simple.

## Layer 0: Infrastructure

- Linux VM or container host
- Docker Compose
- `PostgreSQL`
- object storage or filesystem-based artifact storage

## Layer 1: Endpoint access

- `LiteLLM`

Purpose:

- normalize access to the model endpoint
- support future provider variation without changing the UI contract
- sit between sandbox execution and upstream endpoints from `Apilogy` or external providers such as `Azure`

## Layer 2: Core benchmark engine

- `Moonshot`

Purpose:

- run the baseline benchmark pack
- support custom Indonesian datasets and benchmark recipes

## Layer 3: Orchestration and normalization

- custom `FastAPI` backend

Purpose:

- create jobs
- launch benchmark runs
- collect artifacts
- parse results
- normalize scores
- expose APIs to the UI

## Layer 4: UI and scorecard

- `React` or `Next.js`

Purpose:

- model registration with optional Apilogy linkage
- package execution
- result review
- findings drill-down
- summary export

---

## 11. MVP Benchmark Package

For the first release, use one package only: `Indonesia Core Trust Package v1`.

This package should cover:

- harmful content and refusal behavior
- prompt injection resistance
- privacy and sensitive data leakage
- bias and fairness
- factuality in Indonesian context
- formal and colloquial Bahasa Indonesia prompts

This package is enough to establish a first baseline for `Telkom AI`.

If needed, show the result to users in five score buckets:

- `Safety`
- `Security`
- `Privacy`
- `Fairness`
- `Localization and Factuality`

---

## 12. MVP Output for End Users

The end-user experience should be clear and practical.

After a run, the platform should show:

- overall model rating
- category score breakdown
- pass or fail by category
- top high-severity findings
- example failed prompts and responses
- recommended usage guidance
- recommended runtime controls

For developers and `AgentLab` teams, the most important final message is:

- recommended for use
- recommended with controls
- restricted use
- not recommended

That decision label is more useful than raw benchmark data alone.

---

## 13. Suggested Scoring Model

The scoring model should remain explainable.

Recommended top-level score dimensions:

- `Model Trust Score`
- `Security Score`
- `Privacy Score`
- `Application Readiness Note`

For the MVP, `Application Readiness Note` can be qualitative instead of fully scored.

Example logic:

- high safety and privacy, medium security: `Recommended with controls`
- weak privacy leakage or repeated harmful behavior: `Restricted use`
- severe failures in critical categories: `Not recommended`

This is better than forcing one number to represent all risks.

---

## 14. Telkom AI First Rollout Plan

The first execution plan should focus on `Telkom AI`.

### Step 1: Register the endpoint

Capture:

- model name: `Telkom AI`
- base model: `Qwen 30B`
- optional `Apilogy` capability reference
- endpoint URL
- auth method
- model parameters
- owner team
- intended business use cases

### Step 2: Create `Indonesia Core Trust Package v1`

Build the first prompt pack with:

- safety prompts
- privacy prompts
- prompt injection prompts
- bias prompts
- factuality prompts
- formal and colloquial Indonesian prompts

### Step 3: Run the first benchmark

For the first baseline:

- freeze the package version
- store all raw outputs unchanged
- normalize results into the internal schema
- generate the first scorecard

### Step 4: Review and classify failures

Classify each issue into:

- model limitation
- prompt design issue
- missing guardrail
- application integration risk
- dataset gap

### Step 5: Produce rollout recommendation

Generate the final recommendation for internal users:

- suitable for limited internal testing
- suitable for selected production use cases with controls
- not ready for general use

---

## 15. Indonesia Localization Priorities

Localization is a product differentiator and should be built from the first benchmark package.

### Language coverage

- formal Bahasa Indonesia
- colloquial Bahasa Indonesia
- regional language coverage later, such as Javanese and Sundanese

### Local risk patterns

- SARA-related harmful content and bias
- Indonesian privacy identifiers such as `NIK`, `KTP`, `NPWP`, phone numbers, and banking data
- local social, religious, and political sensitivity
- Indonesian law, geography, government services, and public information context
- slang-based jailbreaks and prompt injections

### Candidate data sources already identified

- `IndoSafety`
- `IndoDiscourse`
- `IndoMMLU`
- Indonesian abusive and hate speech datasets

These should be converted into versioned benchmark assets compatible with the platform.

---

## 16. Compliance Positioning

The product should be positioned as an **evidence and assurance platform**, not an automatic certification engine.

It can support:

- technical evidence for safety, security, bias, privacy, and localization testing
- recurring model risk measurement
- auditable benchmark history
- structured reporting aligned to `OWASP`, `NIST AI RMF`, and `ISO/IEC 42001`

It cannot replace:

- organization-wide governance processes
- legal sign-off
- management approval
- formal certification activity

This distinction should remain explicit in all roadmap and product messaging.

---

## 17. Expansion Path After MVP

After the MVP proves the workflow on `Telkom AI`, the recommended expansion order is:

1. Add support for multiple internal and external model endpoints, with optional `Apilogy` linkage.
2. Add model comparison and run history.
3. Add `DeepEval` for app, RAG, and agent evaluation.
4. Add `LLM Guard` integration guidance for runtime protection in production apps.
5. Add `PyRIT` for advanced multi-turn red teaming.
6. Add `Garak` when stronger offensive security coverage is needed.
7. Add `Giskard` only if collaborative RAG and business QA workflows become important.
8. Add sector packs and multi-organization capabilities.

This order keeps the implementation grounded in real user value.

---

## 18. Final Recommendation

The long-term view should be:

- build an AI trust and assurance platform, not only a benchmark runner
- position `Apilogy` as a capability marketplace and use case platform, and the sandbox as the assessment and trust layer
- support model providers, developers, `AgentLab`, and governance teams
- separate model evaluation, application evaluation, and runtime protection clearly
- make the platform a decision layer for which models can be used in which contexts

The MVP should be:

- one internal model: `Telkom AI`
- one benchmark package: `Indonesia Core Trust Package v1`
- one repeatable workflow from endpoint registration to rating and evidence export
- one clear outcome: determine whether the model is ready for internal application usage

That is the correct level of ambition for the first release. It creates a real operational baseline without overbuilding the platform too early.
