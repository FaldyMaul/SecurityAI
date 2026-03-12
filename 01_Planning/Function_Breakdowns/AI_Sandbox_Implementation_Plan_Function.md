# Function Breakdown: AI Sandbox Implementation Plan

## 1. Goal

Define the phased delivery plan for the AI Sandbox from access layer through assessment, review, publication, and later AgentLab integration.

## 2. Assumptions

- MVP starts with internal LLM assessment, especially `Telkom AI`.
- `LiteLLM` is the access and observability layer, not the scoring engine.
- `Moonshot` is the first benchmark engine.
- Results must be reviewable before publication.
- `Apilogy` and `AgentLab` are integration targets, not the primary control plane.

## 3. Scope

- Delivery phases from foundation to expansion.
- Workstream ownership across gateway, evaluation, orchestration, UX, and review.
- Immediate MVP definition and next steps.

Out of scope:

- Full national model hub on day one.
- Broad multimodal or non-LLM benchmarking in MVP.
- Full compliance automation.

## 4. Risks

- Access layer instability blocks all later phases.
- MVP scope expands too early into too many engines or model types.
- Review workflow is underdefined, causing publication ambiguity.
- Ownership gaps across backend, UX, and governance slow execution.
- Missing raw evidence storage weakens auditability.

## 5. Subtasks

- Finalize phase-by-phase exit criteria.
- Confirm MVP benchmark package and evidence outputs.
- Define model registry schema and review state machine.
- Define backlog by workstream with owners and dependencies.
- Lock integration sequence: `LiteLLM` -> benchmark -> review -> publish -> consume.
- Convert plan phases into sprint-ready epics.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Design the MVP navigation for model submission, run status, scorecard, review queue, and ranking.
- Create page requirements for each workstream touchpoint.
- Define state indicators for draft, running, failed, pending review, approved, and published.
- Map phase outputs to UI modules and dashboard widgets.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Define phase exit checklists and acceptance criteria.
- Create evidence retention and traceability requirements.
- Document review and publication SOPs.
- Create test scenarios for workflow transitions and failed runs.
- Prepare RACI-aligned QA ownership notes for each workstream.
