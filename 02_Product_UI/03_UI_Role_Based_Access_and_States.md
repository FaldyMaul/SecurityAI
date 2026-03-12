# UI Task Detail: Role-Based Access and States

## Goal

Make role-based behavior explicit in the UI so the product does not leak the wrong data or expose the wrong actions.

## UX and Journey Context

The role boundaries in this file come from `01_Planning/AI_Sandbox_Personas_and_User_Journeys.md`.

Key journey rule:

- each persona should see only the information needed for the next responsible action in the workflow

That means:

- `Model Owner` sees assessment progress and fix-or-submit actions
- `Admin / Reviewer` sees evidence, decision controls, and publication controls
- `Use Case Builder / Product Owner` sees approved summaries, comparison, risks, and recommended controls
- `Public Viewer` sees only published, non-sensitive summary information

## Roles in Scope

- `Model Owner`
- `Admin / Reviewer`
- `Use Case Builder / Product Owner`
- `Public Viewer`

## Detailed Tasks

### 1. Build the view-permission matrix

- define which pages each role can access
- define which actions each role can trigger
- define which fields are:
  - visible
  - hidden
  - masked
  - editable
  - read-only

### 2. Define action availability by state

- specify which actions are enabled for each model state
- examples:
  - draft model can be edited by `Model Owner`
  - pending review model cannot be published
  - restricted model cannot appear as recommended to builders
- create a matrix for page actions versus workflow states

### 3. Define system messages and empty states

- access denied message
- no pending review items
- no published models
- benchmark failed
- evidence unavailable
- model restricted

### 4. Define audit-facing UI behavior

- ensure reviewer decisions show who acted and when
- define where decision history appears
- define whether score changes across reruns are visible side by side

## Output Expected From This File

- a permission-aware UI behavior model that reduces rework during implementation

## Dependencies

- `01_Planning/Function_Breakdowns/AI_Sandbox_Personas_and_User_Journeys_Function.md`
- `01_Planning/Function_Breakdowns/AI_Sandbox_Implementation_Plan_Function.md`
