# AI Sandbox Main User UX Journeys

> Update note on March 11, 2026:
> This file should now be read as the internal `AI Sandbox` journey document.
> Developer-facing discovery and leaderboard journeys belong mainly to `ModelHub`.
> Read together with `Product_Alignment_Update_2026-03-11.md`.

This document describes the detailed UX journeys for the main user types of the `AI Sandbox` application.

It is focused on the current core sandbox personas:

- `Model Owner`
- `Admin / Reviewer`

The goal is to make the end-to-end user flow clear before designing screens, navigation, and permissions in detail.

---

## 1. UX Design Goal

The sandbox should support one clear internal product loop:

1. A model is submitted.
2. The model is assessed.
3. The result is reviewed.
4. The approved result is published.
5. the reviewed result is marked as promotion-eligible
6. the approved result can later be surfaced in `ModelHub` and then in `AgentLab`

This means the UX should not feel like a raw benchmark console. It should feel like a guided assessment and publish-eligibility workflow.

An important context for this UX is that many model endpoints may already exist in `Apilogy`, Telkom's internal API marketplace, while some may come from external providers such as `Azure`. That means the UX should support both:

- direct manual model registration
- selecting or importing an endpoint from `Apilogy`
- registering an external endpoint that will be standardized through `LiteLLM`

---

## 2. Main User Types

The main user types for the current sandbox scope are:

- `Model Owner`
- `Admin / Reviewer`

Each user type has a different intention, so each should have a different default experience.

Important note:

- `Use Case Builder / Product Owner` and `Public Viewer` belong mainly to `ModelHub`, not to the internal sandbox

---

## 3. UX Journey Principles

The journeys should follow these principles:

- show users only what they need for their role
- keep technical detail behind drill-down views
- make the next action obvious
- separate internal review from `ModelHub` promotion
- convert benchmark outputs into decision-friendly language

---

## 4. Model Owner Journey

## 4.1 Main intention

The `Model Owner` wants to submit a model, run the assessment, and understand what must be fixed or reviewed.

## 4.2 Entry point

Typical entry points:

- `Models` page
- `Add Model` button
- direct access to a draft model record

## 4.3 End-to-end flow

### Stage 1: Create model entry

The `Model Owner` starts by creating a new model record.

Input fields may include:

- model name
- provider or owner team
- base model
- `Apilogy` capability reference if available
- endpoint URL
- authentication method
- model version
- intended use case

The form should also make it clear that the endpoint can come from:

- `Apilogy`
- an external provider such as `Azure`

Expected UX outcome:

- the user understands what minimum information is required
- the platform creates a draft model record

### Stage 2: Validate endpoint

The platform checks whether the endpoint is reachable and correctly configured.

Expected UX outcome:

- clear success or failure message
- visible status such as `endpoint valid` or `connection failed`
- simple retry flow if validation fails

### Stage 3: Run benchmark package

The `Model Owner` selects the benchmark package and starts the run.

For MVP, this is likely one main package such as:

- `Indonesia Core Trust Package`

Expected UX outcome:

- the user sees what the package covers
- the user can start the run with one clear action
- the system shows progress and current status

### Stage 4: Monitor run status

The user waits while the platform runs the benchmark.

Expected UX outcome:

- clear run status such as `queued`, `running`, `completed`, `failed`
- estimated completion context if possible
- no need to refresh manually if avoidable

### Stage 5: Review scorecard

Once completed, the `Model Owner` lands on the model result page.

The result page should show:

- overall rating
- score by category
- top critical findings
- failed prompt samples
- review status
- publication status

Expected UX outcome:

- the user quickly understands whether the result is good or bad
- the user knows whether the model is ready for review

### Stage 6: Decide next step

The `Model Owner` should now have two obvious next actions:

- submit for review
- fix issues and rerun later

Expected UX outcome:

- the next step is explicit
- the user is not confused about whether the model is already approved

## 4.4 Key screens for this persona

- model list
- add model form
- endpoint validation result
- benchmark package selection
- run progress page
- result scorecard page
- run history page

## 4.5 UX risks to avoid

- forcing the user to read low-level benchmark logs first
- unclear endpoint setup requirements
- no distinction between assessment result and approval status
- too many benchmark options in MVP

---

## 5. Admin / Reviewer Journey

## 5.1 Main intention

The `Admin / Reviewer` wants to review completed assessments, decide model status, and control publication.

## 5.2 Entry point

Typical entry points:

- `Review Queue`
- `All Models`
- `Completed Assessments`
- `Admin Dashboard`

## 5.3 End-to-end flow

### Stage 1: Open pending review

The `Admin / Reviewer` sees models waiting for decision.

The queue should show:

- model name
- latest run date
- overall rating
- critical finding count
- current status

Expected UX outcome:

- the reviewer can prioritize quickly
- high-risk items stand out immediately

### Stage 2: Inspect assessment summary

The reviewer opens the detailed scorecard.

The review page should show:

- overall rating
- category-level breakdown
- severity summary
- failed cases
- evidence links
- notes from the model owner if present

Expected UX outcome:

- the reviewer can make a fast first judgment
- serious risk is visible without opening every detail

### Stage 3: Drill into evidence

If needed, the reviewer checks detailed evidence.

This may include:

- failed prompt examples
- model responses
- raw artifact links
- repeat run comparison

Expected UX outcome:

- evidence is available when needed
- technical details do not overwhelm the main review screen

### Stage 4: Set decision

The reviewer chooses the final model status.

Suggested decision options:

- `approved`
- `approved with controls`
- `restricted`
- `reassessment required`
- `not approved`

Expected UX outcome:

- the decision action is explicit
- the reason can be recorded
- the status updates immediately in the system

### Stage 5: Control publication

Review status and publication status should be separate.

The reviewer should explicitly decide whether the model result is:

- published
- hidden
- not publishable yet

Expected UX outcome:

- internal approval and public visibility are not confused
- restricted or rejected models are not accidentally exposed

### Stage 6: Operational follow-up

The `Admin / Reviewer` may also:

- rerun or requeue jobs
- manage package visibility
- inspect failing jobs
- update benchmark package settings

Expected UX outcome:

- operational controls are available without leaving the admin area

## 5.4 Key screens for this persona

- admin dashboard
- review queue
- model review page
- findings detail page
- publication control page
- run diagnostics page
- system health page

## 5.5 UX risks to avoid

- mixing publication with approval in one uncontrolled action
- hiding severe findings below raw detail
- making all models look equally urgent
- forcing admins to jump across too many pages

---

## 6. Use Case Builder / Product Owner Journey

## 6.1 Main intention

The `Use Case Builder / Product Owner` wants to choose the right model for an app, use case, `AgentLab` flow, or an Apilogy-managed use case.

## 6.2 Entry point

Typical entry points:

- ranking page
- model catalog
- approved models page
- later, model selection inside `AgentLab`

In the Telkom environment, these published results may later sit alongside Apilogy capability pages or be reused inside Apilogy-managed use case flows.

## 6.3 End-to-end flow

### Stage 1: Browse ranked models

The user opens the ranking or model catalog page.

The page should show:

- ranked list of published models
- model name
- overall rating
- short suitability summary
- approval label

Expected UX outcome:

- the user can quickly scan candidate models
- the page feels like a decision tool, not a test log viewer

### Stage 2: Filter and shortlist

The user filters models by:

- approval status
- use case fit
- score range
- provider or category

Expected UX outcome:

- users reduce the list quickly
- discovery is easy for non-experts

### Stage 3: Open model detail page

The user opens one model summary.

The page should show:

- overall rating
- strengths
- limitations
- score breakdown
- major risks
- recommended controls
- suggested use cases

Expected UX outcome:

- the user understands if the model fits their purpose
- the information is readable without security expertise

### Stage 4: Compare models

The user compares two or more models.

The comparison view should help answer:

- which model is safer
- which model is more suitable for the planned use case
- which model has fewer restrictions

Expected UX outcome:

- tradeoffs are visible side by side
- the user can make a decision confidently

### Stage 5: Use in app or AgentLab

The user selects the model for implementation.

Later inside `AgentLab`, this should be surfaced as:

- score label
- approval status
- key warnings
- recommended controls

Expected UX outcome:

- model choice is supported by trusted internal evidence
- the same trust signal can later be reused in Apilogy-related use case selection

## 6.4 Key screens for this persona

- ranking page
- model catalog
- model detail page
- model comparison page
- later: AgentLab model picker with rating badge

## 6.5 UX risks to avoid

- showing too much technical evidence by default
- no clear recommendation or suitability label
- making users infer meaning from raw category scores alone

---

## 7. Public Viewer Journey

## 7.1 Main intention

The `Public Viewer` wants a simple and trustworthy view of model rankings and summaries.

## 7.2 Entry point

Typical entry points:

- landing page
- published ranking page
- article or summary page

## 7.3 End-to-end flow

### Stage 1: Discover models

The user opens a page showing published model ratings.

The page should show:

- model name
- rating
- short summary
- approval label

Expected UX outcome:

- model ranking is easy to understand
- the page feels editorial and trustworthy

### Stage 2: Read summary

The user opens a published model profile or article.

The page should show:

- what the model is
- its current rating
- what it is suitable for
- major limitations

Expected UX outcome:

- non-technical readers understand the takeaway quickly

## 7.4 Key screens for this persona

- landing page
- published ranking page
- public model summary page

## 7.5 UX risks to avoid

- leaking internal reviewer notes
- exposing raw exploit evidence
- using overly technical language

---

## 8. Cross-Journey State Flow

These journeys connect through a shared state model.

Recommended high-level states:

- `draft`
- `endpoint registered`
- `assessment running`
- `assessment completed`
- `under review`
- `approved`
- `approved with controls`
- `restricted`
- `reassessment required`
- `not approved`
- `published`
- `hidden`

The expected relationship between states and audiences is:

- `Model Owner` works mostly from `draft` to `assessment completed`
- `Admin / Reviewer` works mostly from `under review` to final decision
- `Use Case Builder / Product Owner` mainly sees approved and published content
- `Public Viewer` only sees published content

---

## 9. Recommended Navigation by Persona

To keep the app clear, the default navigation should reflect the user role.

### Model Owner

- `My Models`
- `Add Model`
- `Runs`
- `Results`

### Admin / Reviewer

- `Dashboard`
- `Review Queue`
- `All Models`
- `Runs`
- `Publication`
- `System`

### Use Case Builder / Product Owner

- `Ranking`
- `Models`
- `Compare`
- later: `Use in AgentLab`

### Public Viewer

- `Home`
- `Rankings`
- `Model Profiles`

---

## 10. MVP UX Flow Recommendation

For MVP, keep the UX simple and explicit.

### MVP core flow

1. `Model Owner` adds `Telkom AI` into the sandbox, with optional linkage to `Apilogy`.
2. `Model Owner` runs the benchmark package.
3. The platform generates score and findings.
4. `Admin / Reviewer` reviews and sets final status.
5. Approved result is published to the ranking page.
6. `Use Case Builder / Product Owner` uses the published result to choose a model.

### MVP UX focus

- one benchmark package
- one review queue
- one result scorecard
- one ranking page
- simple publish or hide decision

This is enough to validate the product flow before adding more complex personas or benchmark packages.

---

## 11. Final Recommendation

The main UX flow should be designed around four different experiences:

- `submit and assess`
- `review and publish`
- `discover and choose`
- `read and trust`

That maps directly to:

- `Model Owner`
- `Admin / Reviewer`
- `Use Case Builder / Product Owner`
- `Public Viewer`

If the UI supports these four experiences cleanly, the application will already provide a strong foundation for later `AgentLab` integration.
