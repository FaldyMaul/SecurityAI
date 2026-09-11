# AI Sandbox Main User UX Journeys

Last updated: 2026-04-02

This document describes the current UX journeys for the internal `AI Sandbox` surface.

Important boundary:

- `AI Sandbox` is for `Model Owner`, `Model Vendor`, and `Admin / Reviewer`
- `ModelHub` is for `Developer` and `Use Case Owner`

This document therefore focuses on the internal sandbox flow only.

---

## 1. UX Design Goal

The internal product loop should be:

1. register model
2. validate endpoint
3. run benchmark in the background
4. review results and history
5. decide rerun or review gate
6. determine promotion eligibility for `ModelHub`

This means the UX should feel like a guided model assessment workflow, not a raw benchmark console and not a developer discovery portal.

---

## 2. Main User Types

The main sandbox user types for the current scope are:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

Important note:

- builders and public viewers belong mainly to `ModelHub`, not to the sandbox

---

## 3. UX Journey Principles

- show users only what they need for their role
- keep technical logs behind drill-down views
- make the next action obvious
- separate review gate from `ModelHub` promotion
- convert benchmark outputs into decision-friendly language
- support background execution, history, and version comparison

---

## 4. Model Owner / Model Vendor Journey

## Main intention

The model owner wants to register a model, validate endpoint access, run benchmark packages, inspect the results, and decide whether to rerun or send the result to the review gate.

## Entry points

- `Models`
- `Add Model`
- direct access to an existing draft model

## End-to-end flow

### Stage 1: Create model entry

The user creates a model record with:

- model name
- provider or owner team
- base model
- endpoint URL
- authentication method
- model version
- intended use case
- optional `Apilogy` metadata link

Expected outcome:

- a valid draft model record exists

### Stage 2: Validate endpoint

The platform checks the endpoint through the standard technical path.

Current product assumption:

- `LiteLLM` is the main access abstraction

Expected outcome:

- clear validation success or failure
- clear retry action

### Stage 3: Start background benchmark run

The user chooses the benchmark package and starts the run.

Expected outcome:

- the run continues safely in the background
- the user can navigate away without breaking the run

### Stage 4: Review run status and history

The user sees:

- current run status
- previous runs
- version history
- comparison opportunity where available

Expected outcome:

- the user understands the latest state and previous attempts

### Stage 5: Review scorecard and recipe-level results

The result page should show:

- overall rating
- category score breakdown
- recipe-level result table
- fail-oriented review support
- detailed prompt and response modal
- findings and short recommendations

Expected outcome:

- the user can quickly understand what passed, what failed, and what needs attention

### Stage 6: Decide next step

The user should have clear next actions:

- rerun
- send to review gate

Expected outcome:

- the user is not confused about whether the model is already visible in `ModelHub`

---

## 5. Admin / Reviewer Journey

## Main intention

The reviewer wants to inspect completed assessments, check evidence and history, and decide whether the result is eligible for promotion into `ModelHub`.

## Entry points

- `Review Queue`
- `Completed Assessments`
- `Dashboard`

## End-to-end flow

### Stage 1: Open review-ready item

The reviewer sees:

- model name
- latest run date
- current score summary
- review status

### Stage 2: Inspect assessment summary

The reviewer examines:

- score summary
- category findings
- major risk areas

### Stage 3: Drill into evidence and history

The reviewer drills into:

- prompt and response evidence
- recipe-level failures
- benchmark history
- version comparison where relevant

### Stage 4: Set decision

Decision outcomes include:

- approved
- approved with controls
- restricted
- reassessment required

### Stage 5: Mark promotion eligibility

The reviewer decides whether the model can move toward `ModelHub`.

Important rule:

- sandbox completion does not equal automatic publication

---

## 6. UX Risks to Avoid

- letting sandbox screens behave like `ModelHub` discovery screens
- hiding the difference between completed assessment and promotion eligibility
- making background runs feel page-bound
- showing raw technical logs before summary-level insights
- omitting history and comparison from repeated run workflows
