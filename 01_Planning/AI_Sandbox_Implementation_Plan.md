# AI Sandbox Implementation Plan

This document defines the implementation plan for the `AI Sandbox` product, including delivery phases, technical scope, and the team or role in charge of each workstream.

It is aligned to the current target:

- assess internal models first, starting with `Telkom AI`
- build a unified sandbox workflow for scoring and review
- publish approved results for internal consumption
- later surface model scores and recommendations inside `AgentLab`

An important implementation context is that Telkom already has `Apilogy`, an internal API marketplace containing many AI endpoints. For this plan, `Apilogy` should be treated as an important internal capability marketplace and use case platform, while the sandbox remains the benchmark, review, and ranking layer. Endpoints may come from Apilogy or from external providers such as `Azure`, but they should be standardized through `LiteLLM`.

It also reflects the current implementation reality:

- the `AI Engineer` is already trying to deploy `LiteLLM` to monitor model usage and apply guardrails around model access

---

## 1. Implementation Objective

The implementation goal is to deliver the platform in controlled stages.

The first version should not try to solve the full national hub problem immediately.

The first practical outcome should be:

- one working model assessment workflow
- one review and publication workflow
- one model scorecard that can be consumed by internal builders

That trust output should later be consumable in two places:

- inside `AgentLab`
- inside Apilogy-related use case and subscription flows

The implementation should therefore move in this order:

1. establish model access and observability
2. establish baseline benchmark execution
3. establish review and publication workflow
4. establish model discovery and selection experience
5. later integrate scores into `AgentLab`

---

## 2. Current Starting Point

The current known starting point is:

- internal model target: `Telkom AI`
- base model: `Qwen 30B`
- internal capability marketplace: `Apilogy`
- current engineering activity: `LiteLLM` deployment for monitoring and guardrails

This is a good starting point because `LiteLLM` can become the first operational access layer for:

- endpoint normalization
- usage logging
- request monitoring
- model routing
- basic gateway-level policy control
- request standardization across Apilogy-hosted and external providers such as `Azure`

Important note:

- `LiteLLM` is part of the access and control plane
- it is not the main benchmark engine
- benchmark scoring should still be handled by the sandbox evaluation workflow

---

## 3. Delivery Principles

The implementation should follow these principles:

- keep MVP narrow
- use OSS-first components
- preserve raw evidence from the start
- make the workflow usable before making it broad
- separate review decision from public publication
- avoid building too many benchmark integrations in the first release

---

## 4. Delivery Phases

## Phase 0: Foundation and Access Layer

### Goal

Create the minimum technical foundation required to connect to models and observe traffic.

### Main deliverables

- working `LiteLLM` deployment
- initial endpoint mapping for LLM assessment
- connection to `Telkom AI`
- usage logging or request visibility
- basic guardrail policy at the gateway layer if available
- initial backend and storage setup

### Why this phase matters

Without a stable access layer, the rest of the sandbox workflow will be fragile.

### Team or role in charge

- `AI Engineer`
  - deploy `LiteLLM`
  - validate access path from Apilogy-hosted or external endpoints into the gateway
  - connect model endpoints
  - configure gateway and routing
  - validate observability and guardrail behavior

- `Backend Engineer`
  - prepare service integration points
  - prepare model registry schema
  - define how sandbox metadata, Apilogy references, and provider metadata are stored

- `Platform / DevOps`
  - provision VM, containers, network, secrets, and storage

### Exit criteria

- `LiteLLM` is running reliably
- `Telkom AI` endpoint details are mapped into the sandbox access flow through `LiteLLM`
- `Telkom AI` can be accessed through the gateway
- gateway logs or monitoring are visible

---

## Phase 1: Baseline Model Assessment MVP

### Goal

Deliver the first end-to-end benchmark workflow for `Telkom AI`.

### Main deliverables

- model registration flow
- endpoint intake flow with optional Apilogy linkage
- endpoint validation flow
- one benchmark package execution flow
- raw artifact storage
- normalized scorecard
- internal review flow

### Recommended technical scope

- `Moonshot` integration for baseline benchmark execution
- backend job orchestration
- `PostgreSQL` for metadata and normalized results
- object storage or structured artifact storage
- simple web UI for:
  - add model with optional linkage to `Apilogy`
  - run benchmark
  - view result
  - review result

### Team or role in charge

- `AI Engineer`
  - integrate `Moonshot`
  - define first benchmark run configuration
  - validate model behavior under baseline tests

- `Backend Engineer`
  - build run orchestration
  - persist provider metadata and optional `Apilogy` source reference in the model record
  - store run metadata
  - parse artifacts into normalized schema
  - expose API for result pages

- `Frontend Engineer`
  - build MVP UI flow for model submission, run status, and scorecard

- `Platform / DevOps`
  - maintain service deployment
  - configure storage
  - ensure job execution environment is stable

- `Product Owner / Business Analyst`
  - define MVP scope
  - define result language and decision labels
  - align the flow with internal users

### Exit criteria

- a user can register `Telkom AI`
- the `Telkom AI` record can be standardized through `LiteLLM` and optionally linked to an `Apilogy` source record
- a benchmark run completes successfully
- a scorecard is generated
- an internal reviewer can review the result

---

## Phase 2: Review, Approval, and Publication Workflow

### Goal

Turn the benchmark result into a usable internal trust signal.

### Main deliverables

- review queue
- final decision status
- publish or hide control
- ranking page or landing page summary
- model profile page

### Why this phase matters

The benchmark result only becomes useful when someone can approve it and others can consume it.

### Team or role in charge

- `Frontend Engineer`
  - build review queue
  - build approval action UX
  - build ranking page and model summary page

- `Backend Engineer`
  - implement review status model
  - implement publication status model
  - secure public vs internal data access

- `Admin / Reviewer`
  - define approval statuses
  - define what can be published
  - validate the review workflow

- `Product Owner / Business Analyst`
  - define public-facing language for rating and summary
  - define what information should remain internal

### Exit criteria

- reviewed models can be approved or restricted
- approved models can be published
- builders can browse published model ratings

---

## Phase 3: AgentLab Integration

### Goal

Surface model rating and guidance directly inside `AgentLab`.

### Main deliverables

- model rating API for `AgentLab`
- model picker metadata
- warning labels and recommended controls inside the model selection experience
- foundation for later trust signal reuse in Apilogy use case and subscription flows

### Why this phase matters

This turns the sandbox from a separate governance tool into a decision layer that directly influences model usage. A similar trust signal should later be consumable in Apilogy-related use case flows as well.

### Team or role in charge

- `Backend Engineer`
  - expose model rating API
  - expose approved model list
  - expose model guidance and status

- `Frontend Engineer` or `AgentLab Engineer`
  - integrate score badges and warning labels into `AgentLab`

- `Product Owner / Business Analyst`
  - define what minimum score or status is shown to builders
  - define what actions should be blocked or warned

### Exit criteria

- `AgentLab` users can see model rating and approval guidance at selection time

### Follow-on from this phase

After the same trust signal is working in `AgentLab`, it can be exposed into Apilogy-linked use case selection and subscription journeys.

---

## Phase 4: Expansion Layers

### Goal

Add depth after the baseline workflow is stable.

### Candidate expansions

- `DeepEval` for app, RAG, and agent evaluation
- `PyRIT` for advanced multi-turn red teaming
- `Garak` for offensive security scanning
- `LLM Guard` integration guidance for runtime protection patterns
- model comparison across multiple providers

### Team or role in charge

- `AI Engineer`
  - evaluate and integrate additional testing tools
  - validate scoring quality and fit

- `Backend Engineer`
  - extend orchestration and normalization layer

- `Frontend Engineer`
  - add new result pages, comparison views, and package selection UX

- `Security Team` optional later
  - validate advanced testing scenarios

### Exit criteria

- additional tools add clear value without breaking the core workflow

---

## 5. Workstream Breakdown

The implementation can be managed as parallel workstreams.

## Workstream A: Model Access and Gateway

### Scope

- `LiteLLM`
- optional `Apilogy` endpoint mapping
- endpoint routing
- usage logging
- guardrail-related gateway configuration

### Owner

- `AI Engineer`

### Support

- `Platform / DevOps`

### Current status

- already in progress

---

## Workstream B: Evaluation Engine

### Scope

- `Moonshot` integration
- benchmark execution
- baseline package setup

### Owner

- `AI Engineer`

### Support

- `Backend Engineer`

---

## Workstream C: Orchestration and Data Layer

### Scope

- job runner
- model registry
- optional `Apilogy` source reference
- run registry
- normalized results
- artifact mapping

### Owner

- `Backend Engineer`

### Support

- `AI Engineer`
- `Platform / DevOps`

---

## Workstream D: UX and Product Interface

### Scope

- model registration
- run status
- result scorecard
- review queue
- ranking page

### Owner

- `Frontend Engineer`

### Support

- `Product Owner / Business Analyst`
- `Backend Engineer`

---

## Workstream E: Review and Publication

### Scope

- approval status model
- publish or hide flow
- summary content structure

### Owner

- `Admin / Reviewer`

### Support

- `Frontend Engineer`
- `Backend Engineer`
- `Product Owner / Business Analyst`

---

## 6. Suggested Team Structure

The smallest practical team for MVP is:

- `1 AI Engineer`
- `1 Backend Engineer`
- `1 Frontend Engineer`
- `1 Product Owner / Business Analyst`
- shared `Platform / DevOps` support
- `1 Admin / Reviewer` acting as operational reviewer and product validator

If the team is smaller, one person may cover multiple roles:

- `AI Engineer` can also help backend integration
- `Frontend Engineer` can implement a simple admin interface
- `Product Owner` can also act as workflow validator

---

## 7. RACI-Style Ownership Summary

## LiteLLM deployment and monitoring

- Responsible: `AI Engineer`
- Accountable: `Tech Lead` or engineering owner
- Consulted: `Platform / DevOps`, `Backend Engineer`
- Informed: `Product Owner`

## Provider metadata and optional Apilogy mapping

- Responsible: `Backend Engineer`
- Accountable: `Tech Lead`
- Consulted: `AI Engineer`
- Informed: `Product Owner`

## Moonshot integration

- Responsible: `AI Engineer`
- Accountable: `Tech Lead`
- Consulted: `Backend Engineer`
- Informed: `Admin / Reviewer`

## Model registry and scoring backend

- Responsible: `Backend Engineer`
- Accountable: `Tech Lead`
- Consulted: `AI Engineer`
- Informed: `Frontend Engineer`

## MVP web UI

- Responsible: `Frontend Engineer`
- Accountable: `Product Owner`
- Consulted: `Backend Engineer`
- Informed: `Admin / Reviewer`

## Review and publication workflow

- Responsible: `Backend Engineer` and `Frontend Engineer`
- Accountable: `Admin / Reviewer`
- Consulted: `Product Owner`
- Informed: `Model Owner`

## Ranking page and model summary

- Responsible: `Frontend Engineer`
- Accountable: `Product Owner`
- Consulted: `Admin / Reviewer`
- Informed: `Use Case Builders`

## AgentLab integration

- Responsible: `Backend Engineer` and `AgentLab Engineer`
- Accountable: `Product Owner`
- Consulted: `AI Engineer`
- Informed: `Use Case Builders`

---

## 8. Immediate Next Steps

The most practical next steps are:

1. Stabilize `LiteLLM` deployment and confirm logging and guardrail behavior.
2. Define how provider metadata and optional `Apilogy` references will be represented in the sandbox model registry.
3. Create the `Telkom AI` record in the sandbox and standardize access through `LiteLLM`.
4. Integrate `Moonshot` for one baseline benchmark package.
5. Implement normalized score storage.
6. Build the MVP UI flow:
   - add model with optional linkage to `Apilogy`
   - run benchmark
   - review scorecard
   - approve and publish
7. Build the first ranking page.

This sequence will create the first usable version quickly.

---

## 9. MVP Definition in Implementation Terms

The MVP is complete when:

- `Telkom AI` is accessible through the chosen model access path
- the sandbox can run one benchmark package
- the result is stored and normalized
- an `Admin / Reviewer` can set final status
- an approved model can appear on a ranking page
- a `Use Case Builder` can use that result to guide model selection

That is the correct implementation target for the first release.

---

## 10. Final Recommendation

The implementation should be staged, not tool-heavy from day one.

The recommended order is:

1. `LiteLLM` foundation
2. `Moonshot` baseline evaluation
3. backend normalization and storage
4. review and publication workflow
5. ranking and discovery UX
6. `AgentLab` integration
7. advanced tools later

This keeps the team focused on a real working product instead of a wide but unfinished platform.
