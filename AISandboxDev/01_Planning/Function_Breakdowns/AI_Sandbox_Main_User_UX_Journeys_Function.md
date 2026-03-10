# Function Breakdown: AI Sandbox Main User UX Journeys

## 1. Goal

Define the end-to-end user journeys for the main personas so the product behaves like a guided trust workflow rather than a raw benchmark console.

## 2. Assumptions

- Main personas are `Model Owner`, `Admin / Reviewer`, `Use Case Builder / Product Owner`, and `Public Viewer`.
- Users need role-specific experiences and visible next actions.
- Model endpoints may come from `Apilogy` or external providers standardized via `LiteLLM`.
- Internal review and public publication must remain separate.

## 3. Scope

- Detailed flow stages for each persona.
- Key screens, entry points, and UX risks.
- Cross-journey state flow and MVP UX recommendation.

Out of scope:

- Final visual design system implementation.
- Detailed front-end component specs.
- Non-core personas beyond the current workflow.

## 4. Risks

- Journey complexity overwhelms model owners during onboarding.
- Reviewers lack evidence drill-down and make inconsistent decisions.
- Builders see scores but not decision context or usage restrictions.
- Public views accidentally expose internal-only detail.
- UX does not handle failed endpoint validation or rerun loops well.

## 5. Subtasks

- Convert each persona journey into explicit user stories.
- Define transition rules between each workflow stage.
- Identify mandatory data inputs at each step.
- Define empty, error, retry, and permission-denied states.
- Prioritize MVP journey slices versus later enhancements.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Create wireframes for model registration, endpoint validation, run monitoring, scorecard, review queue, ranking, and model detail pages.
- Define persona-based navigation and dashboard defaults.
- Design evidence drill-down and decision panels for reviewers.
- Design comparison and shortlist flows for builders.
- Create stateful UI patterns for pending, failed, approved, restricted, and published records.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Write journey acceptance criteria per persona.
- Document role-permission expectations and visibility boundaries.
- Define UX test cases for validation failure, reruns, review rejection, and publication gating.
- Capture copy requirements for warnings, decisions, and status messages.
