# AI Sandbox Technology Stack

This document defines the recommended technology stack for the `AI Sandbox / Model Hub` product.

It is based on the current implementation direction:

- `Sandbox` is the trust, assessment, review, and ranking layer
- `Apilogy` is the capability marketplace and use case platform
- `AgentLab` consumes model scores from the sandbox
- model endpoints may come from internal sources or external providers
- all endpoint access should be standardized through `LiteLLM`

The first focus remains:

- `LLM assessment first`

---

## 1. Core Stack Summary

The recommended stack is:

- `Frontend`: React-based app using the provided UI system
- `Backend`: Python
- `Primary Database`: PostgreSQL
- `Gateway / Model Access`: LiteLLM
- `Core Evaluation Engine`: Moonshot
- `Future Evaluation Engine`: DeepEval
- `Infrastructure for MVP`: VM or containers
- `Infrastructure for later scale`: K3s
- `Artifact Storage`: object storage or file-based artifact storage
- `Optional Vector Store`: Elasticsearch
- `Default Evaluator LLM`: `Telkom AI Qwen 30B`

---

## 2. Frontend Technology

## Recommended choice

- `React` app
- preferably with `Next.js`
- use the provided UI system as the design and component foundation:
  - `https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/?path=/docs/welcome--docs`

## Why this choice

The product needs:

- internal dashboard UX
- admin and review pages
- ranking pages
- public or semi-public model profile pages
- later integration patterns with `AgentLab`

This is a better fit for a structured React application than for a notebook-style UI.

## How to position the provided UI

The provided Chromatic-hosted UI reference should be treated as:

- the component and design system base
- the visual language for the sandbox app
- the starting point for pages such as:
  - model registration
  - benchmark run status
  - scorecard
  - review queue
  - ranking page
  - model profile page

## Frontend recommendation

- `Next.js`
- `TypeScript`
- provided UI component system from the supplied URL
- charting library if needed for scores and trends

---

## 3. Backend Technology

## Recommended choice

- `Python`

## Why Python is the correct backend

Most of the evaluation ecosystem is already Python-native:

- `Moonshot`
- `DeepEval`
- `PyRIT`
- `Garak`
- `Giskard`
- `LLM Guard`
- `LiteLLM`

Using Python in the backend reduces integration friction significantly.

## Recommended backend framework

- `FastAPI`

## Why FastAPI

- easy to build internal APIs
- good async support
- strong Python ecosystem fit
- simple background job integration
- easy OpenAPI generation

## Backend responsibilities

The backend should handle:

- model registry
- provider metadata
- benchmark job orchestration
- artifact collection
- result normalization
- scoring
- review state management
- publication state management
- API for frontend, AgentLab, and later Apilogy-linked flows

---

## 4. Database and Storage

## Primary database

- `PostgreSQL`

## Why PostgreSQL

- mature and stable
- easy to operate
- strong fit for structured application data
- suitable for run history, models, users, reviews, and scores
- works well with Python and modern web stacks

## What PostgreSQL should store

- model records
- provider metadata
- optional Apilogy references
- benchmark run metadata
- normalized results
- scorecards
- approval status
- publication status
- audit trail metadata

## Raw artifact storage

Use:

- object storage if available
- or structured filesystem storage for MVP

This should store:

- Moonshot JSON
- DB artifacts
- future security scan logs
- exports and reports

The source of truth should not be the PDF or summary page. It should be:

- raw artifacts
- normalized database records

---

## 5. Gateway and Model Access Layer

## Recommended choice

- `LiteLLM`

## Why LiteLLM is important

`LiteLLM` should be the standard access layer for all model endpoints.

That includes:

- internal endpoints from `Apilogy`
- external endpoints such as `Azure`
- future providers if needed

## LiteLLM responsibilities

- standardize model access
- normalize request format
- provide one consistent interface to downstream tools
- support monitoring and usage visibility
- support guardrail-related access controls where relevant
- reduce integration differences between providers

## Why this matters for the product

Without `LiteLLM`, the sandbox would need provider-specific integration logic for:

- Apilogy-hosted models
- Azure-hosted models
- any future provider

With `LiteLLM`, the sandbox can keep a cleaner execution path.

---

## 6. Core Evaluation Engines

## Phase 1 core engine

- `Moonshot`

## Why Moonshot is the first engine

It is the best fit for:

- baseline trust and safety assessment
- prompt-based benchmarking
- custom Indonesia benchmark packs
- machine-readable benchmark output
- evidence-oriented scoring

## Phase 2 or later engines

- `DeepEval` for app, RAG, and agent evaluation
- `PyRIT` for advanced multi-turn security testing
- `Garak` for offensive security scanning
- `Giskard` only if collaborative QA and RAG review become necessary

The platform should not try to integrate all of them in the MVP.

---

## 7. Evaluator LLM Strategy

## Recommended evaluator model

- `Telkom AI Qwen 30B`

## Why this is recommended

Use `Telkom AI Qwen 30B` as the evaluator or judge model where possible to avoid paid dependency on external providers.

This helps:

- reduce cost
- keep evaluation internal
- avoid reliance on paid APIs for basic scoring
- support OSS-first and internal-first implementation

## Use cases for evaluator LLM

`Telkom AI Qwen 30B` can be used for:

- LLM-as-judge scoring where supported
- evaluation reasoning
- DeepEval judge use cases later
- some review assistance workflows

## Important note

This does not mean every evaluation must rely only on one judge model forever.

It means the default cost-controlled strategy should be:

- use `Telkom AI Qwen 30B` first
- only introduce external judge models if a real accuracy gap appears

---

## 8. Optional Vector Database

## Recommended optional choice

- `Elasticsearch`

## Why Elasticsearch can be used

If the platform later needs vector capabilities, `Elasticsearch` can serve as:

- a search layer
- a document retrieval layer
- an optional vector database

This is useful if the platform later expands into:

- semantic search over benchmark findings
- search over prompt packs and datasets
- retrieval for model profile content
- RAG-related internal knowledge features

## Recommendation

Do not force vector storage into the MVP unless a real requirement appears.

Use `Elasticsearch` only if needed.

For MVP:

- PostgreSQL + artifact storage is enough

---

## 9. Infrastructure

## MVP infrastructure

Use:

- Linux VM
- containers
- Docker Compose or equivalent simple deployment

## Why this is right for MVP

- faster to stand up
- easier to debug
- lower operational overhead
- enough for first internal release

## Later infrastructure

- `K3s`

## Why K3s later

`K3s` is a good next step when the platform needs:

- more structured deployment management
- better service orchestration
- cleaner scaling path
- easier multi-service operations

This is a good future choice because it is lighter than a full Kubernetes setup but still gives a real cluster model.

## Infrastructure recommendation by phase

- MVP: VM + containers
- Growth phase: `K3s`

---

## 10. Suggested Language and Stack by Layer

## Frontend layer

- `TypeScript`
- `React`
- `Next.js`

## Backend layer

- `Python`
- `FastAPI`

## Data layer

- `PostgreSQL`
- object storage
- optional `Elasticsearch`

## Access layer

- `LiteLLM`

## Evaluation layer

- `Moonshot`
- later `DeepEval`
- later `PyRIT`
- later `Garak`

## Runtime protection layer

- later `LLM Guard`

## Infra layer

- containers
- later `K3s`

---

## 11. Recommended MVP Technical Stack

For MVP, use:

- `Next.js` frontend with the provided UI system
- `TypeScript`
- `Python FastAPI` backend
- `PostgreSQL`
- file or object-based artifact storage
- `LiteLLM`
- `Moonshot`
- `Telkom AI Qwen 30B` as evaluator if needed
- VM or Docker-based deployment

This is enough to deliver:

- endpoint registration
- one benchmark package run
- scorecard
- review flow
- ranking page
- later score exposure to `AgentLab`

---

## 12. Recommended Non-MVP Technical Additions

Add later:

- `DeepEval`
- `PyRIT`
- `Garak`
- `LLM Guard`
- `Elasticsearch`
- `K3s`

These should be introduced only when there is a real need.

---

## 13. Final Recommendation

The recommended technology direction is:

- `Frontend`: `Next.js` + `TypeScript` + the provided UI system
- `Backend`: `Python FastAPI`
- `Database`: `PostgreSQL`
- `Gateway`: `LiteLLM`
- `Core benchmark`: `Moonshot`
- `Evaluator model`: `Telkom AI Qwen 30B`
- `Infrastructure now`: VM + containers
- `Infrastructure later`: `K3s`
- `Optional vector capability`: `Elasticsearch`

This stack is consistent with:

- the current team direction
- the Python-heavy evaluation ecosystem
- the need to support both internal and external model providers
- the need to keep costs low by using internal evaluator capacity where possible
