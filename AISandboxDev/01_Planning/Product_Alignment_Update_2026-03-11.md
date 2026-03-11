# Product Alignment Update - March 11, 2026

This document refines the current product definition, goals, roadmap, and stack based on:

- latest frontend and QA implementation context
- QA feedback dated March 11, 2026
- current stakeholder clarification on the relationship between `AI Sandbox`, `ModelHub`, `AgentLab`, and `Apilogy`

It should be treated as the current alignment layer above older planning files when there is a conflict.

---

## 1. Executive Update

The main product correction is:

- `AI Sandbox` is not the main experience for developers or use case owners
- `ModelHub` is the discovery and leaderboard experience for developers and use case owners
- `AI Sandbox` is the controlled assessment workspace for `Model Owner` or `Model Vendor`
- `AgentLab` consumes approved model guidance later
- `Apilogy` remains the API marketplace and capability catalog

This means some earlier planning language that blended `Sandbox` and `ModelHub` should now be read as two connected but distinct product surfaces.

---

## 2. Refined Product Definitions

## 2.1 AI Sandbox

Primary purpose:

- isolated model intake, validation, testing, scoring, and review preparation

Primary users:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

Core responsibilities:

- register model or endpoint
- validate endpoint access
- run benchmark packages
- store artifacts and run history
- generate scorecards and draft findings
- support review, restriction, rerun, and publish eligibility

What it is not:

- not the main developer-facing model catalog
- not the final place for pricing, rich documentation, or use case examples
- not the main landing page for discovery

## 2.2 ModelHub

Primary purpose:

- developer-facing and use-case-facing model discovery, comparison, and model selection

Primary users:

- `Developer`
- `Use Case Owner`
- `Product Owner`
- `AgentLab team` later

Core responsibilities:

- leaderboard and ranking
- model profile and model comparison
- pricing and package visibility
- documentation links
- real use case examples
- trust, security, and readiness summaries coming from the sandbox

Important rule:

- `ModelHub` consumes approved sandbox outputs, but also contains metadata beyond sandbox scoring

## 2.3 AgentLab

Primary purpose:

- downstream builder environment that uses approved model guidance during agent or workflow creation

Core responsibilities:

- model picker integration
- guardrail and warning display
- recommendation reuse from `ModelHub` or sandbox-backed APIs

## 2.4 Apilogy

Primary purpose:

- API marketplace and capability inventory

Core responsibilities:

- endpoint catalog
- capability metadata
- subscription and use case flows
- source record for internal AI capabilities

Important rule:

- `Apilogy` is not replaced by the sandbox or by `ModelHub`

---

## 3. Updated Product Boundaries

## 3.1 User access boundary

`AI Sandbox`:

- used by `Model Owner`, `Model Vendor`, `Admin / Reviewer`

`ModelHub`:

- used by `Developer`, `Use Case Owner`, `Product Owner`

`Public` or wider internal audience:

- should only see approved and publishable model summaries through `ModelHub` or approved public pages

## 3.2 Data boundary

`AI Sandbox` owns:

- endpoint setup
- validation status
- benchmark run state
- raw artifacts
- benchmark history
- detailed findings
- review decision preparation

`ModelHub` owns:

- leaderboard presentation
- pricing
- documentation
- example use cases
- richer model profile content
- developer-facing comparison

Shared boundary:

- approved trust outputs from the sandbox can be promoted into `ModelHub`

## 3.3 Workflow boundary

Updated end-to-end flow:

1. `Model Owner` uploads or registers model in `AI Sandbox`
2. sandbox validates endpoint and runs benchmark packages
3. sandbox stores artifacts, scores, and history
4. reviewer confirms publish eligibility
5. approved trust summary is promoted to `ModelHub`
6. developers and use case owners discover models in `ModelHub`
7. `AgentLab` later consumes the approved model guidance

---

## 4. Key Changes Since Older Planning

The following older assumptions should be refined:

### 4.1 Ranking and leaderboard

Old framing:

- ranking page is part of sandbox UX

Updated framing:

- leaderboard and ranking are `ModelHub` concerns
- sandbox may expose a publish action, but the destination experience is `ModelHub`

### 4.2 Builder persona

Old framing:

- `Use Case Builder / Product Owner` is a primary sandbox persona

Updated framing:

- builder persona belongs mainly to `ModelHub`
- sandbox focus should stay on model submission, testing, and review preparation

### 4.3 Model source intake

Old framing:

- `Apilogy` import is central to endpoint intake

Updated framing from QA and current dev:

- `LiteLLM` is now the primary technical configuration source and access layer
- `Apilogy` remains a metadata and capability source, but not the main runtime integration abstraction

### 4.4 Review and publish logic

Old framing:

- submit for review was the primary post-assessment action

Updated framing from QA:

- current UI logic has shifted toward `Publish` and `Rerun`
- however, product definition still requires a review or gate before publish eligibility
- direct publish should be treated as publish after policy checks, not as bypass of governance intent

### 4.5 Run execution model

Updated direction:

- benchmark runs must be background tasks
- users must be able to navigate away safely
- benchmark history and version comparison are now first-class requirements

---

## 5. Updated Product Goals

## 5.1 Current goal for AI Sandbox

Deliver a reliable model-owner workflow for:

- model registration
- endpoint validation
- benchmark execution
- score generation
- rerun and history
- publish eligibility decision

Success means:

- a `Model Owner` can test a model end to end without needing engineering support for every run
- review-ready outputs are consistent and traceable
- poor-quality or high-risk models are blocked from `ModelHub`

## 5.2 Current goal for ModelHub

Deliver a clear developer-facing discovery surface for:

- leaderboard
- model profile
- model comparison
- trust and security summaries
- pricing, docs, and real use case examples

Success means:

- developers do not need access to sandbox internals to choose a model
- model selection becomes evidence-informed, not ad hoc

---

## 6. Updated Roadmap

## Phase A: Sandbox Foundation

Focus:

- `LiteLLM` integration
- endpoint validation
- `Moonshot` benchmark execution
- artifact and history storage
- role-based internal access

Primary surface:

- `AI Sandbox`

## Phase B: Sandbox Review and Promotion Gate

Focus:

- publish eligibility rules
- score normalization
- benchmark history
- version comparison
- reviewer notes and approval guard

Primary surface:

- `AI Sandbox`

## Phase C: ModelHub MVP

Focus:

- leaderboard
- model profile
- comparison
- published trust summaries
- pricing and documentation stubs

Primary surface:

- `ModelHub`

## Phase D: AgentLab and Apilogy Consumption

Focus:

- `AgentLab` model picker integration
- `Apilogy` trust-signal reuse
- recommendation APIs

Primary surfaces:

- `AgentLab`
- `Apilogy`

## Phase E: Expanded Evaluation Layers

Focus:

- `DeepEval` for app and RAG evaluation
- `PyRIT` and `Garak` for deeper security testing
- `LLM Guard` alignment with runtime policy controls

---

## 7. Updated Stack Positioning

## 7.1 Frontend

Current implementation direction is valid:

- `Next.js` with App Router
- locale-first routing
- `TypeScript`
- role-based route groups

But the product framing should be refined:

- internal route groups map mainly to `AI Sandbox`
- public and discovery route groups map mainly to `ModelHub`
- do not describe all pages as sandbox pages anymore

## 7.2 Backend

Current direction remains valid:

- `FastAPI`
- background job orchestration
- normalized score APIs
- publish guard enforcement

Refinement:

- backend should expose separate API shapes for internal sandbox detail versus `ModelHub` summary consumption

## 7.3 Access and serving layer

Current direction is stronger than before:

- `LiteLLM` should be treated as the main endpoint adapter and serving control plane
- guardrail and observability layers should be defined as part of the serving architecture, not only as optional extras

Serving architecture from stakeholder discussion:

1. core LLM and related model services
2. guardrail layer
3. observability layer
4. API serving layer

This should be reflected in future architecture diagrams and technical specs.

## 7.4 Evaluation and scoring

Current near-term foundation:

- `Moonshot`

Later expansion:

- `DeepEval`
- `PyRIT`
- `Garak`
- `LLM Guard` as runtime control support, not the primary benchmark engine

---

## 8. QA-Driven Refinements That Should Be Adopted

The following QA feedback should now be considered product-level guidance, not just UI polish:

- `LiteLLM` should be treated as the primary import and access abstraction
- benchmarking must work as a background task
- benchmark history is required
- version comparison is required
- publish guard must block invalid publication states
- Indonesian language consistency needs enforcement
- internal leaderboard behavior must not redirect incorrectly to a generic landing page

Open product clarification still needed:

- whether sandbox publish action creates a `ModelHub` record directly or creates a promotion-ready state that another process publishes
- whether `Admin / Reviewer` remains a single role in MVP or is split later

---

## 9. Immediate Documentation Updates Needed Across the Project

- refine any document that calls the leaderboard a sandbox page
- refine any document that treats builder persona as a sandbox primary user
- refine route and page specs to label `ModelHub` pages separately from sandbox pages
- refine frontend handoff docs to note `LiteLLM` as the primary integration abstraction
- refine QA docs to test promotion from sandbox to `ModelHub`, not only sandbox publication

---

## 10. Decision Summary for All Agents

Use these decisions unless a newer stakeholder update replaces them:

- `AI Sandbox` is for `Model Owner` and `Model Vendor`, not for general developers
- `ModelHub` is the leaderboard and discovery experience for developers and use case owners
- sandbox results feed `ModelHub`
- `LiteLLM` is the primary endpoint access abstraction
- `Moonshot` is the current benchmark foundation
- benchmark runs are background tasks
- benchmark history and version comparison are required
- publish guard must enforce trust and quality thresholds before a model appears in `ModelHub`
