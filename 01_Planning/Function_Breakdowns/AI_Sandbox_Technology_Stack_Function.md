# Function Breakdown: AI Sandbox Technology Stack

## 1. Goal

Define the recommended MVP and target technology stack for the sandbox across frontend, backend, database, gateway, evaluation, and infrastructure layers.

## 2. Assumptions

- `LLM assessment first` remains the implementation focus.
- `React` or `Next.js` is the frontend direction.
- `Python` and `FastAPI` are the backend standard.
- `PostgreSQL`, artifact storage, and `LiteLLM` are core platform components.
- `Moonshot` is first, with other engines added later.

## 3. Scope

- Layer-by-layer stack selection and rationale.
- MVP infrastructure recommendation.
- Non-MVP additions for later scale.

Out of scope:

- Exact deployment topology and IaC details.
- Vendor procurement or licensing decisions.
- Low-level performance tuning.

## 4. Risks

- Stack selection is accepted without validating integration constraints.
- Background job, artifact storage, and evaluator orchestration are underspecified.
- The frontend design system choice is not translated into page architecture.
- Later engines add incompatible runtime or dependency expectations.

## 5. Subtasks

- Convert stack decisions into implementation architecture diagrams.
- Define service boundaries and API contracts.
- Specify job orchestration, queueing, and artifact storage behavior.
- Confirm evaluator model strategy and fallback options.
- Define MVP infrastructure, observability, and deployment requirements.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Translate the frontend stack choice into app shell, routing, page modules, and component reuse rules.
- Define charting and score visualization requirements.
- Align the provided UI system with sandbox-specific screens and interactions.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Document architecture decisions and technical constraints.
- Create environment readiness and deployment validation checklists.
- Define non-functional test areas: performance, reliability, observability, and data retention.
- Prepare integration test matrix for `LiteLLM`, backend APIs, storage, and evaluation engines.
