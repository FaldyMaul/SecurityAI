# AI Sandbox Personas and User Journeys

> Update note on March 11, 2026:
> This file should now be read mainly as the sandbox persona model.
> Builder and public discovery personas now belong mainly to `ModelHub`.
> Read together with `Product_Alignment_Update_2026-03-11.md`.

This document defines the personas and user journeys for the internal `AI Sandbox` application that later exposes approved results into `ModelHub` and `AgentLab`.

This file is not intended to describe every possible persona in the long-term platform. It is focused on the personas that matter for the application flow we need now.

The current product goal is:

- assess models through a unified sandbox workflow
- review the results internally
- prepare approved model results for promotion into `ModelHub`
- let downstream consumers such as `AgentLab` reuse those approved results later

An important product context is that Telkom already has `Apilogy`, an internal API marketplace listing many AI endpoints. For this app, the sandbox becomes the assessment and trust layer, while `Apilogy` remains a capability and use case platform. Endpoints may come from Apilogy or from outside providers such as `Azure`, but they should be standardized through `LiteLLM`. The current focus remains `LLM` endpoints first.

---

## 1. Scope of This Persona Model

This persona model is specifically for the application flow around:

- model submission
- benchmark execution
- internal review
- model approval or restriction
- review, restriction, and promotion eligibility
- later consumption inside `ModelHub` and `AgentLab`

For now, some roles that may exist in a larger governance platform are intentionally simplified or merged.

---

## 2. Persona Design Principle

Personas should be based on **responsibility in the workflow**, not only by organizational title.

For this app, the key question is:

- who submits the model
- who prepares the model score for downstream consumption
- who reviews and approves the result
- who operates the system
- who decides whether a model can be promoted out of the sandbox

---

## 3. Recommended Persona Set

## Active sandbox personas for current scope

- `Model Owner`
- `Admin / Reviewer`

## Optional personas for later phases

- `AI Security Team / Red Team`

Only these optional personas should be considered as separate roles later if the workflow becomes more specialized.

Roles that are intentionally not separated for now:

- `AI Governance / Risk / Compliance Reviewer`
- `Platform Admin`
- `Auditor / Reviewer`
- `Blue Team / AI Operations`
- `Executive / Decision Maker`

These roles are combined into one operational persona:

- `Admin / Reviewer`

Also, `Dataset / Benchmark Curator` is not treated as a separate persona for now. Those responsibilities will stay with the development team.

---

## 4. Active Personas

## 4.1 Model Owner

### Role

The `Model Owner` is the person or team responsible for registering a model endpoint and submitting it for assessment.

They usually own:

- the model endpoint
- the `Apilogy` capability reference when the endpoint already exists there
- model version information
- access credentials or connection setup
- intended use cases
- follow-up action when the model fails review

### Main goals

- submit the model for evaluation
- understand model strengths and weaknesses
- fix issues and rerun the assessment if needed
- get the model into a state where it can be published as usable

### Main questions

- Is my model ready to be used?
- What is the current rating?
- Which findings are blocking approval?
- What should be improved before the next run?

### Main actions in the app

- create model entry
- link or import the endpoint from `Apilogy`
- register endpoint and configuration
- launch benchmark package
- review results
- rerun after fixes

### What they need to see

- overall rating
- category score breakdown
- major findings
- failed cases
- review status
- publication status

---

## 4.2 Use Case Builder / Product Owner

### Role

The `Use Case Builder / Product Owner` is the user who wants to choose a model for an application, workflow, chatbot, RAG system, `AgentLab` flow, or a specific use case managed in `Apilogy`.

This includes:

- internal app builders
- chatbot owners
- solution teams
- `AgentLab` builders

### Main goals

- choose the right model for a use case
- avoid models with unacceptable risk
- understand what controls or restrictions apply
- compare models quickly

### Main questions

- Which model should I use?
- Is this model approved for my use case?
- What are the known risks?
- Does this model need runtime controls?
- How does it compare to another model?

### Main actions in the app

- browse ranking page
- filter models by status, score, and use case fit
- open model detail page
- compare model ratings
- check recommended usage guidance

### What they need to see

- rank or rating
- approval label
- suitability summary
- key risks
- recommended controls
- comparison view

### Important note

This persona is still important in the overall product, but it belongs mainly to `ModelHub` rather than to the sandbox workspace.

---

## 4.3 Admin / Reviewer

### Role

The `Admin / Reviewer` is the merged operational persona for the current product phase.

This persona combines responsibilities that might later split into separate roles, including:

- platform administration
- governance review
- risk and compliance review
- audit-style evidence inspection
- mitigation and control follow-up
- management-level decision support

For the current scope, these do not need to be separate user roles.

### Main goals

- operate the system
- review benchmark results
- decide whether a model is approved, restricted, or rejected
- manage promotion eligibility into `ModelHub`
- maintain traceability and operational control

### Main questions

- Did the benchmark run complete correctly?
- Is the model safe enough to approve?
- Which findings require restriction or mitigation?
- Should this model be allowed into `ModelHub`?
- What evidence supports the final decision?

### Main actions in the app

- manage users and roles
- manage benchmark package availability
- review all model results
- inspect detailed findings and evidence
- set final model status
- set publication visibility
- monitor jobs and platform health

### What they need to see

- all models and all runs
- full findings detail
- raw evidence references
- review queue
- final approval controls
- publication controls
- job health and system status

### Decision outputs

This persona should be able to set a model into statuses such as:

- `approved`
- `approved with controls`
- `restricted`
- `reassessment required`
- `not approved`
- `published`
- `hidden from public ranking`

---

## 4.4 Public Viewer

### Role

The `Public Viewer` is anyone who sees the published model ranking page or article after the internal review is complete.

This can include:

- internal employees
- use case teams
- business stakeholders
- management
- external viewers later, if publication is opened wider

### Main goals

- discover which models are ranked highest
- understand high-level strengths and limitations
- get a simple view without operational detail

### Main questions

- Which models have the best rating?
- Is this model approved?
- What is this model good for?
- What are the main limitations?

### Main actions in the app

- browse landing page or ranking page
- open model summary page
- read article-style summaries
- compare high-level ratings

### What they need to see

- ranked model list
- score summary
- approval label
- short model description
- basic risk notes

### What they should not see by default

- raw exploit logs
- internal reviewer comments
- detailed operational data
- hidden or restricted model evidence

---

## 5. Optional Persona

## 5.1 AI Security Team / Red Team

### Optional status

This is an optional persona for later phases.

For the current scope, it does not need to exist as a separate role unless advanced security testing becomes a regular dedicated workflow.

### Role

The `AI Security Team / Red Team` runs advanced adversarial testing beyond the baseline benchmark package.

### Main focus

- multi-turn red teaming
- jailbreak and prompt injection testing
- exploit discovery
- deeper offensive testing using tools such as `PyRIT` or `Garak`

### When to activate this persona

Separate this role later if:

- advanced red teaming becomes recurring
- security testing requires dedicated users
- findings need a distinct security workflow

---

## 6. Persona Priority

## Required for MVP

- `Model Owner`
- `Use Case Builder / Product Owner`
- `Admin / Reviewer`

## Publish-facing persona

- `Public Viewer`

## Optional for later

- `AI Security Team / Red Team`

This smaller set is enough for the current product scope.

---

## 7. End-to-End Journey Overview

The current end-to-end journey should be:

1. `Model Owner` registers a model endpoint in the sandbox.
2. The system validates the endpoint and available benchmark package.
3. `Model Owner` runs the assessment.
4. The system generates results and score breakdown.
5. `Admin / Reviewer` reviews the results and sets final status.
6. If approved, the model can be published to the ranking page or landing page.
7. `Use Case Builder / Product Owner` views the approved result and decides whether to use the model.
8. Later, the same result is shown inside `AgentLab` and can support use case selection flows linked to `Apilogy`.

This is the main product loop to optimize for.

---

## 8. Detailed User Journeys

## 8.1 Model Owner Journey

### Trigger

The `Model Owner` wants to submit a new model or a new model version for assessment.

### Steps

1. The `Model Owner` creates a model entry in the sandbox, with optional linkage to an Apilogy capability.
2. They enter endpoint details, credentials, model metadata, and intended use cases.
3. The platform validates that the endpoint is reachable.
4. The `Model Owner` selects the benchmark package.
5. The system runs the evaluation.
6. The `Model Owner` reviews the scorecard and findings.
7. If needed, they improve the model or wrapper and rerun.
8. They wait for final review and publication decision.

### Success criteria

- the endpoint is registered successfully
- the benchmark completes
- the owner understands the outcome clearly
- next actions are obvious

### Design concerns

- endpoint validation must be simple
- the benchmark package should be easy to understand
- results should distinguish summary vs detail

---

## 8.2 Admin / Reviewer Journey

### Trigger

A benchmark run is completed and requires review.

### Steps

1. The `Admin / Reviewer` opens the completed assessment.
2. They review the overall score and category breakdown.
3. They inspect major findings and evidence where needed.
4. They decide whether the model is:
   - approved
   - approved with controls
   - restricted
   - reassessment required
   - not approved
5. They decide whether the model should be published to the ranking page.
6. If needed, they record review notes or required controls.
7. The final status becomes visible to consuming users.

### Success criteria

- the reviewer can make a clear decision
- the decision is traceable
- publication is controlled intentionally

### Design concerns

- review screens must make severe issues obvious
- approval and publication must be separate actions
- the reviewer should be able to see all models and all runs

---

## 8.3 Use Case Builder / Product Owner Journey

### Trigger

The `Use Case Builder / Product Owner` wants to select a model for an app, `AgentLab` flow, or an Apilogy-managed use case.

### Steps

1. They open the ranking page or model catalog.
2. They filter by score, approval status, and intended use case.
3. They open a model summary page.
4. They read the rating, strengths, risks, and usage guidance.
5. They compare candidate models if needed.
6. They choose a model for the use case.
7. Later, they see the same result inside `AgentLab` or alongside model choices in Apilogy-linked use case flows.

### Success criteria

- model choice is easy and fast
- tradeoffs are understandable
- the user can act without reading raw benchmark logs

### Design concerns

- the model score must be translated into practical guidance
- the published result must be understandable by non-experts

---

## 8.4 Public Viewer Journey

### Trigger

The user opens the landing page, ranking page, or article that shows reviewed model results.

### Steps

1. The `Public Viewer` opens the published model list.
2. They scan rankings, labels, and short descriptions.
3. They open a model detail page or article.
4. They read the summary of rating, use case fit, and main limitations.

### Success criteria

- the ranking is easy to understand
- the information is useful without exposing internal detail
- the published page builds trust in the review process

### Design concerns

- avoid exposing sensitive raw evidence publicly
- use simple language
- keep public information separate from internal review data

---

## 9. Publication Flow

After a model is reviewed, the result should not stay only inside the internal review dashboard.

The intended publication flow is:

1. The model is assessed.
2. The `Admin / Reviewer` approves or restricts the model.
3. The `Admin / Reviewer` chooses whether the model result is publishable.
4. Approved model results are shown on:
   - a ranking page
   - a landing page section
   - an article or model summary page
5. The same approved status and score can later be surfaced inside `AgentLab` and Apilogy-linked use case flows.

This publication step is important because the product is also intended to help users discover and choose models, not only to test them.

---

## 10. Key Workflow Statuses

Suggested statuses for the current app:

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

These statuses should drive what users can see and do.

Example:

- a `Use Case Builder` should mainly see `approved`, `approved with controls`, and published entries
- a `Public Viewer` should only see `published` content
- an `Admin / Reviewer` should see everything

---

## 11. Access Direction

The current access model can remain simple.

- `Model Owner`
  - create and manage their model entries
  - run assessments
  - read their own result details

- `Use Case Builder / Product Owner`
  - read published or approved model scorecards
  - compare models
  - consume usage guidance

- `Admin / Reviewer`
  - full access to all models, results, review actions, and publication settings

- `Public Viewer`
  - read only published ranking and summary content

- `AI Security Team / Red Team` optional later
  - advanced security execution and detail access

---

## 12. MVP Recommendation

For the MVP, the app should optimize for this simple loop:

1. `Model Owner` registers `Telkom AI` in the sandbox.
2. `Model Owner` runs the benchmark package.
3. The system generates the scorecard.
4. `Admin / Reviewer` reviews and sets status.
5. Approved results are published to the ranking page.
6. `Use Case Builder / Product Owner` uses the result to choose a model.
7. Later, the same result is displayed inside `AgentLab` and can support Apilogy-related model selection flows.

This is enough for the first version.

There is no need yet to split governance, audit, blue team, executive, and admin into separate personas.

---

## 13. Final Recommendation

For the current product phase, keep the persona model intentionally small.

Use these active personas:

- `Model Owner`
- `Use Case Builder / Product Owner`
- `Admin / Reviewer`
- `Public Viewer`

Keep this optional for later:

- `AI Security Team / Red Team`

Do not create a separate persona yet for:

- benchmark curation
- governance review
- audit review
- blue team operations
- executive oversight

Those concerns can be handled under `Admin / Reviewer` for now.

This gives a cleaner foundation for:

- user journey design
- screen planning
- permission design
- public ranking flow
- `AgentLab` integration later
