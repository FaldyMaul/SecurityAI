# QA Task Detail: Workflow Acceptance Criteria

## Goal

Create acceptance criteria for the full model lifecycle from registration through publication.

## Workflow Areas

1. model registration
2. endpoint validation
3. benchmark execution
4. review decision
5. publication
6. ranking and discovery

## Detailed Tasks

### 1. Model registration acceptance

- model can be created with required fields only
- invalid required fields are rejected with clear errors
- `Apilogy` import pre-fills expected metadata when available
- draft records can be resumed later

### 2. Endpoint validation acceptance

- reachable endpoint shows success state
- invalid credentials show failure state
- validation failure does not create false `ready` status
- retry flow works without duplicate model creation

### 3. Benchmark execution acceptance

- user can select the approved benchmark package
- run status transitions are correct
- failed runs are clearly marked and not treated as completed
- completed runs create a scorecard and evidence record

### 4. Review decision acceptance

- only authorized roles can review
- decision cannot be submitted without required fields
- decision history is stored and visible
- restricted models are not accidentally approved

### 5. Publication acceptance

- only approved models can be published
- unpublished models do not appear in publish-facing views
- changes in publication status propagate to discovery pages correctly

### 6. Ranking and discovery acceptance

- ranking page excludes hidden or restricted models as intended
- comparison only uses models allowed for that persona
- score summaries match the underlying reviewed result

## Output Expected From This File

- workflow-level acceptance criteria usable for test cases and sign-off
