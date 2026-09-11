# AI Sandbox Personas and User Journeys

Last updated: 2026-04-02

This document defines the current persona model for the internal `AI Sandbox` product surface.

It should be read together with the `ModelHub` product split described in other planning documents.

---

## 1. Scope of This Persona Model

This persona model is specifically for:

- model submission
- endpoint validation
- benchmark execution
- internal result review
- rerun and reassessment
- promotion eligibility

It is not the main persona model for developer-facing discovery in `ModelHub`.

---

## 2. Persona Design Principle

Personas are based on responsibility in the workflow, not only by organization title.

For the sandbox, the key questions are:

- who registers the model
- who operates the assessment workflow
- who reviews the evidence
- who decides whether the model can move out of the sandbox

---

## 3. Recommended Sandbox Persona Set

## Active personas

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

## Related but mainly external personas

- `Developer`
- `Use Case Owner`
- `Public Viewer`

These related personas are important overall, but they mainly belong to `ModelHub`.

---

## 4. Active Personas

## 4.1 Model Owner

### Role

The `Model Owner` is the internal person or team responsible for registering a model and driving it through the sandbox workflow.

### Main goals

- submit the model for evaluation
- understand strengths and weaknesses
- fix issues and rerun when needed
- prepare the model for review

### Main actions

- create model entry
- configure endpoint
- start benchmark package
- review scorecard
- inspect recipe-level failures
- rerun

### What they need to see

- validation status
- run history
- current score summary
- prompt and response detail when relevant
- review gate status

## 4.2 Model Vendor

### Role

The `Model Vendor` is a variation of the model owner role, often representing the party providing the model or endpoint rather than the internal consuming team.

### Main goals

- provide a valid endpoint
- prove model quality and readiness
- respond to failures and restrictions

### Main actions

- supply endpoint details
- validate serving path
- rerun after fixes
- support reviewer follow-up

### What they need to see

- connection status
- benchmark findings
- rerun expectations
- restriction reasons if blocked

## 4.3 Admin / Reviewer

### Role

The `Admin / Reviewer` is the current merged operational persona for:

- governance review
- evidence inspection
- platform oversight
- promotion eligibility decision

### Main goals

- inspect evidence
- determine whether the model is safe enough to move forward
- block or restrict high-risk results
- maintain traceability and control

### Main actions

- open review queue
- inspect findings and evidence
- compare runs
- record reviewer decision
- mark promotion eligibility

### What they need to see

- score summary
- recipe-level failures
- evidence and history
- version comparison
- audit-friendly decision context

---

## 5. Journey Overview

## Model Owner / Vendor Journey

1. create draft model
2. validate endpoint
3. run benchmark
4. review result and history
5. rerun or send to review gate

## Admin / Reviewer Journey

1. open review-ready item
2. inspect score summary and evidence
3. compare versions if needed
4. set decision
5. decide promotion eligibility

---

## 6. Workflow Statuses

Recommended workflow statuses:

- `draft`
- `endpoint_valid`
- `validation_failed`
- `run_queued`
- `run_in_progress`
- `run_failed`
- `assessment_completed`
- `review_ready`
- `approved`
- `approved_with_controls`
- `restricted`
- `reassessment_required`
- `promotion_ready`

Important rule:

- `promotion_ready` is not the same as published in `ModelHub`

---

## 7. Final Recommendation

Keep the sandbox persona model narrow and operational:

- center the workflow on model owners, vendors, and reviewers
- avoid reintroducing builder-facing discovery personas into sandbox planning
- use the sandbox as the trust preparation surface, not the main model selection surface
