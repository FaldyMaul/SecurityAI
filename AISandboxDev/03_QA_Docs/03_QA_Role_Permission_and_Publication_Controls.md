# QA Task Detail: Role, Permission, and Publication Controls

## Goal

Verify that role boundaries, review controls, and publish visibility are enforced correctly.

## Detailed Tasks

### 1. Build the permission test matrix

- test page access by role
- test action access by role
- test field visibility by role
- test editability by role and state

### 2. Validate review controls

- verify only `Admin / Reviewer` can submit approval decisions
- verify decision actions are logged
- verify rerun requests return the model to the correct state

### 3. Validate publication controls

- verify only approved records can move to published
- verify restricted models cannot appear as recommended
- verify public viewers do not see internal evidence details

### 4. Validate edge cases

- reviewer loses access mid-flow
- model is rerun after prior approval
- score changes after rerun
- publication is withdrawn after release

## Output Expected From This File

- a permission and publication control pack that protects against governance regressions
