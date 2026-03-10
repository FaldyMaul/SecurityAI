# Function Breakdown: AI Sandbox Personas and User Journeys

## 1. Goal

Define the active personas, their responsibilities, and the minimum workflow roles needed to operate the sandbox MVP.

## 2. Assumptions

- Persona design is based on workflow responsibility, not org chart.
- `Admin / Reviewer` temporarily combines governance, operations, and audit responsibilities.
- `AI Security Team / Red Team` is optional for later phases.
- Current scope is model submission, evaluation, review, publication, and later consumption.

## 3. Scope

- Active persona definitions and needs.
- Optional persona boundary for future expansion.
- Journey overview, workflow statuses, publication flow, and access direction.

Out of scope:

- Fine-grained enterprise IAM model.
- Separate operating model for every governance stakeholder.
- Dataset curator as a standalone role in MVP.

## 4. Risks

- Overloaded `Admin / Reviewer` role creates approval bottlenecks.
- Persona boundaries are too vague for UI permissions or audit trails.
- Optional personas are introduced too early and inflate scope.
- Builders and public viewers receive unclear access boundaries.

## 5. Subtasks

- Finalize persona-to-permission matrix.
- Define ownership for each workflow status and transition.
- Clarify when `Admin / Reviewer` should split into separate roles.
- Convert persona needs into product requirements.
- Align access model with publication states.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Implement role-based navigation and default landing pages.
- Design persona-specific views for model owner, reviewer, builder, and public viewer.
- Define hidden versus visible fields by persona.
- Create status badges and action panels aligned to persona responsibilities.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Document role definitions and approval authority.
- Create permission test matrix by persona and workflow state.
- Define audit expectations for review decisions and publications.
- Document residual risk if multiple governance functions stay merged in MVP.
