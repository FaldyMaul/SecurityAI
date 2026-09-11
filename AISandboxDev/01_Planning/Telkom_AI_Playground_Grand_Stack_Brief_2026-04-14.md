# Telkom AI Playground Grand Stack Brief 2026-04-14

Last updated: 2026-04-14

This document is the big-picture product brief for the full `Telkom AI Playground` stack.

Use this document when:

- explaining the full product family to other agents
- aligning roadmap and architecture work across multiple products
- designing the bigger ecosystem beyond only `AI Sandbox`
- preparing grand-plan, grand-map, or executive-view discussions

This document is intentionally broader than the current `AI Sandbox` delivery focus.

---

## 1. Executive Summary

The target platform is not a single product. It is a connected product stack that covers:

1. `AI Sandbox`
2. `ModelHub`
3. `AgentLab`
4. `APIHub`
5. `Executive Control Plane`

These products work together as one modular ecosystem:

- `AI Sandbox` is the protected assessment and review layer
- `ModelHub` is the curated model catalog and inference-layer discovery surface
- `AgentLab` is the agent and workflow builder
- `APIHub` is the API marketplace, access-management layer, and service exposure layer
- `Executive Control Plane` is the cross-platform observability, usage, governance, and portfolio view

The key rule is:

- `AI Sandbox` sits in the shadow layer before `ModelHub`

That means a model should not become a curated, trusted catalog entry first. It should be assessed, reviewed, and gated in `AI Sandbox`, then promoted into `ModelHub` only when it is ready.

---

## 2. Why This Stack Exists

The platform is intended to solve four related problems:

1. trust and qualify AI models before wider use
2. help developers and use-case owners discover the right model
3. let builders compose models, tools, and APIs into real agents and workflows
4. give leadership visibility into usage, observability, quality, risk, and operational value

This is why the stack must be treated as a connected ecosystem, not as isolated tools.

---

## 3. Product List at a Glance

| Product | Primary role | Main users | Core outcome |
| --- | --- | --- | --- |
| `AI Sandbox` | shadow assessment and review layer | `Model Owner`, `Model Vendor`, `Admin / Reviewer` | test, score, review, and gate models before wider use |
| `ModelHub` | curated model catalog and inference discovery layer | `Developer`, `Use Case Owner`, `Product Owner` | discover approved models with ranking, summary, and usage guidance |
| `AgentLab` | agent and workflow builder | `Agent Builder`, `Developer`, `Solution Team` | build AI agents and workflows using approved models and services |
| `APIHub` | API marketplace, access, and exposure layer | `Developer`, `Integration Team`, `Platform Team` | discover APIs, subscribe, manage access, and publish reusable service endpoints |
| `Executive Control Plane` | portfolio, observability, and governance view | `Executive`, `Platform Owner`, `Risk/Governance`, `Ops` | see adoption, usage, cost, health, and policy status across the stack |

---

## 4. The Five Products in Detail

## 4.1 AI Sandbox

### Purpose

`AI Sandbox` is the internal assessment, evidence, and review workspace for models before they become trusted catalog assets.

### Role in the stack

- sits before `ModelHub`
- acts as the controlled entry gate for model trust
- stores detailed assessment evidence not meant for general discovery users

### Primary users

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`
- internal security, trust, and governance stakeholders

### Core capabilities

- model registration
- endpoint setup
- endpoint validation
- benchmark execution
- evidence capture
- score generation
- findings and review notes
- rerun history
- reviewer decision
- promotion eligibility

### What it should output

- internal run records
- internal evidence and findings
- structured assessment score
- reviewer decision state
- promotion-ready summary for downstream products

### What it should not become

- not the public or developer-facing catalog
- not the main leaderboard
- not the main API marketplace
- not the main agent builder

---

## 4.2 ModelHub

### Purpose

`ModelHub` is the curated model catalog and the inference-layer discovery surface.

### Role in the stack

- receives approved summaries from `AI Sandbox`
- helps developers and use-case owners choose the right model
- becomes the trusted catalog of models that are ready for reuse

### Primary users

- `Developer`
- `Use Case Owner`
- `Product Owner`
- internal builder teams

### Core capabilities

- curated model listing
- model profile
- ranking and comparison
- pricing and package visibility
- documentation links
- use case examples
- trust summary
- security summary
- readiness notes

### What it should consume

- promotion-approved trust summary from `AI Sandbox`
- runtime metadata from gateway and platform systems
- pricing and package metadata from platform teams

### What it should not contain

- raw internal benchmark evidence
- reviewer-only notes
- unapproved or restricted model records

---

## 4.3 AgentLab

### Purpose

`AgentLab` is the builder layer where teams turn approved models and APIs into usable agents and workflows.

### Current interpretation

- this is the same area where `Flowise OSS` already fits
- `AgentLab` is the practical builder workspace, not only a concept

### Role in the stack

- consumes model choices from `ModelHub`
- consumes API capabilities from `APIHub`
- lets teams visually compose tools, prompts, APIs, and models into working agents
- can produce reusable use-case endpoints that are then exposed through `APIHub`

### Primary users

- `Agent Builder`
- `Developer`
- solution and innovation teams

### Core capabilities

- visual flow design
- model selection
- tool and API integration
- workflow orchestration
- testing and iteration
- publish or deploy internal agents
- package selected use cases into callable service endpoints

### What it should depend on

- approved model choices from `ModelHub`
- API subscriptions and service access from `APIHub`
- policy guidance and warnings from governance systems

### What it should produce for downstream use

- internal agent workflows
- reusable use-case endpoints
- service definitions that can be registered or exposed through `APIHub`

---

## 4.4 APIHub

### Purpose

`APIHub` is the unified API marketplace, service access layer, and endpoint exposure layer.

### Naming note

- `APIHub` is the same product direction as `Apilogy`
- for the bigger-stack narrative, it is acceptable to speak about this as `APIHub (Apilogy)`

### Role in the stack

- exposes AI and non-AI APIs
- manages discovery, subscription, and access
- supplies service capabilities into `AgentLab`
- can act as the publishing layer for endpoints produced by `AgentLab` use cases
- can also support runtime connections needed by `ModelHub` and other products

### Primary users

- `Developer`
- `Integration Team`
- `Platform Team`
- partner ecosystem users later

### Core capabilities

- API catalog
- capability discovery
- subscription flow
- key and access management
- package and entitlement visibility
- usage-oriented metadata
- registration and exposure of reusable AI-agent endpoints
- endpoint lifecycle visibility for published services

### What it connects to

- internal AI services
- non-AI enterprise services
- external partner services where allowed
- workflow and builder products that need managed access
- `AgentLab` outputs that need to be exposed as reusable APIs

---

## 4.5 Executive Control Plane

### Purpose

The `Executive Control Plane` is the cross-product management and visibility layer.

This is not just a dashboard. It is the portfolio view that helps leadership and platform owners understand:

- what models are being used
- where they are being used
- what costs and usage patterns are emerging
- which models are healthy, risky, or restricted
- how observability, governance, and operations look across the ecosystem

### Primary users

- `Executive`
- `Platform Owner`
- `Operations`
- `Risk / Governance`
- `AI Center of Excellence`

### Core capabilities

- usage overview
- request and token visibility
- model adoption metrics
- health and reliability monitoring
- cost and consumption view
- guardrail and policy visibility
- audit and governance status
- portfolio and business performance view

### What it should aggregate

- usage and observability from the inference layer
- assessment and policy status from `AI Sandbox`
- model adoption from `ModelHub`
- workflow and agent usage from `AgentLab`
- service consumption from `APIHub`

---

## 5. Connection Model Between Products

The intended high-level connection is:

```text
AI Sandbox -> ModelHub -> AgentLab -> APIHub
                 ^              |
                 |              v
                 +------ approved models and service inputs ------+

Executive Control Plane sits above the whole stack
and reads usage, health, policy, and observability signals across all products.
```

The operational meaning is:

1. a model enters through `AI Sandbox`
2. the model is assessed, reviewed, and gated
3. approved trust summaries are promoted into `ModelHub`
4. builders use `ModelHub` to choose models
5. builders use `AgentLab` to create agents and workflows
6. builders use `APIHub` to attach AI and non-AI services into those workflows
7. selected `AgentLab` use cases are exposed through `APIHub` as reusable endpoints or managed services
8. leadership and platform teams use the `Executive Control Plane` to monitor the whole ecosystem

---

## 6. Product Boundaries and Data Boundaries

## 6.1 AI Sandbox -> ModelHub

`AI Sandbox` should pass only curated outputs into `ModelHub`, such as:

- approved score summary
- security and trust summary
- restrictions or usage notes
- review status suitable for wider visibility

`AI Sandbox` should not pass:

- raw prompts and responses
- internal reviewer notes
- full artifact trace
- incomplete or restricted run evidence

## 6.2 ModelHub -> AgentLab

`ModelHub` should provide:

- approved model options
- capability summary
- pricing or package summary
- readiness guidance
- trust and security notes for builders

`AgentLab` should use this to:

- choose models safely
- guide workflow design
- avoid unapproved model usage

## 6.3 APIHub -> AgentLab

`APIHub` should provide:

- service catalog
- subscription state
- entitlement and access metadata
- integration-ready connection details

`AgentLab` should use this to:

- attach APIs into workflows
- manage service usage consistently

## 6.4 AgentLab -> APIHub

`AgentLab` should also produce outputs that can move into `APIHub`, such as:

- reusable agent endpoints
- packaged workflow endpoints
- use-case services ready for managed access
- internal or partner-consumable API products

`APIHub` should use this to:

- register those outputs as discoverable services
- manage access and subscription
- expose them to downstream consumers in a governed way

## 6.5 Executive Control Plane -> All Products

The control plane should read:

- usage
- cost
- observability
- guardrail activity
- governance status
- portfolio health

It should not replace the domain products. It should summarize them.

---

## 7. Shared Platform and Governance Layer

Across all products, there will be cross-cutting platform capabilities.

These include:

- identity and access management
- gateway and routing
- observability and logging
- token and cost monitoring
- policy and governance controls
- security and privacy controls
- audit trail

For the current delivery reality:

- `LiteLLM` is the most important runtime control layer
- `Moonshot` is the benchmark foundation for `AI Sandbox`
- `Flowise OSS` is the practical base for `AgentLab`
- `Apilogy` aligns with the `APIHub` direction

---

## 8. Recommended End-to-End User Journey

The full ecosystem journey should be understood as:

### Stage 1: Model qualification

- model owner registers model in `AI Sandbox`
- sandbox validates endpoint and runs assessments
- reviewer determines whether the model is restricted, needs reassessment, or is ready for promotion

### Stage 2: Curated model discovery

- approved model summary appears in `ModelHub`
- developers and use-case owners compare the curated model options

### Stage 3: Agent and workflow building

- builders use `AgentLab` to create agents
- builders choose models from `ModelHub`
- builders connect APIs from `APIHub`

### Stage 4: Endpoint and service exposure

- selected `AgentLab` use cases are packaged as callable endpoints
- those endpoints are registered or exposed through `APIHub`
- other teams can then subscribe to and consume those published services

### Stage 5: Platform visibility and operations

- platform and executives use the `Executive Control Plane`
- they monitor usage, quality, cost, reliability, and governance signals across all layers

---

## 9. Bigger-View Roadmap Logic

For the bigger-stack plan, the sequencing should be understood like this:

## Phase A: Trust and qualification foundation

Primary product:

- `AI Sandbox`

Goal:

- establish trustworthy intake, testing, review, and promotion gating

## Phase B: Curated discovery layer

Primary product:

- `ModelHub`

Goal:

- make approved models discoverable with enough summary, ranking, and selection guidance

## Phase C: Builder and integration layer

Primary products:

- `AgentLab`
- `APIHub`

Goal:

- let teams create usable agents and workflows from approved models and subscribed services, then expose selected use cases as managed endpoints through `APIHub`

## Phase D: Portfolio and executive control layer

Primary product:

- `Executive Control Plane`

Goal:

- create top-level visibility across usage, reliability, governance, and cost

---

## 10. Current Delivery Focus Versus Bigger Vision

The current actual engineering focus is still narrower than the full vision.

Today:

- main focus is `AI Sandbox`
- partial alignment work exists for `ModelHub`
- `AgentLab` direction exists and is grounded in `Flowise OSS`
- `APIHub` direction exists through `Apilogy`
- `Executive Control Plane` is still a strategic planning layer, not yet the main implementation focus

This means agents should understand both truths at once:

- the big picture is the full playground stack
- the current build priority is still the shadow trust layer first

---

## 11. Agent Guidance for the Bigger View

When other agents use this brief, they should follow these rules:

### UIUX Agent

- design the stack as connected products, not one blended interface
- make `AI Sandbox` feel internal and evidence-heavy
- make `ModelHub` feel curated and selection-oriented
- make `AgentLab` feel builder-oriented
- make `APIHub` feel marketplace-oriented
- make the `Executive Control Plane` feel portfolio-oriented

### FE Agent

- keep route and surface separation clean
- do not let sandbox screens act like catalog screens
- preserve the difference between internal review state and published summary state

### BE Agent

- expose different data contracts for:
  - internal sandbox detail
  - curated hub summary
  - builder integration metadata
  - executive aggregation

### AI Engineer Agent

- keep assessment engines behind `AI Sandbox`
- keep model-serving and runtime-control alignment ready for `ModelHub` and later builder use

### QA Agent

- validate boundaries between products
- validate that restricted internal evidence never leaks into curated or external-facing surfaces

---

## 12. One-Line Product Logic

Use this short explanation when you need a simple shared statement:

`AI Sandbox qualifies models, ModelHub curates them, AgentLab builds use cases, APIHub supplies and exposes services, and the Executive Control Plane monitors the whole ecosystem.`

---

## 13. Recommended Follow-up Documents

This brief should later be complemented by:

- a product map showing personas by product
- a cross-product architecture diagram
- a roadmap by phase and quarter
- a data-boundary and API-boundary matrix
- an executive KPI and observability brief

For now, this file should be treated as the main higher-level product-stack reference for the full `Telkom AI Playground`.
