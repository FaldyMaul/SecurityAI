# UI Task Detail: Core Workflows

## Goal

Turn the core sandbox workflow into concrete UI tasks for submission, validation, benchmarking, review, and publication.

## UX and Journey Context

This file is the UI implementation view of the main loop defined in `01_Planning/AI_Sandbox_Main_User_UX_Journeys.md`.

Reference journey translation:

- `Model Owner` journey:
  - create model entry
  - validate endpoint
  - run benchmark package
  - monitor run status
  - review scorecard
  - choose submit for review or rerun
- `Admin / Reviewer` journey:
  - open review queue
  - inspect assessment summary
  - drill into evidence
  - set decision
  - control publication
- `Use Case Builder / Product Owner` journey:
  - browse ranking
  - filter and shortlist
  - open model detail
  - compare models
  - use approved model in app or later in `AgentLab`

This means the workflows below are not only system steps. They are user journeys and should be designed with explicit entry points, success states, and next actions.

## Workflow Areas

1. model onboarding
2. endpoint validation
3. benchmark run execution
4. review and decision
5. publication and discovery

## Detailed Tasks

### 1. Model onboarding flow

- design the `Add Model` flow for both:
  - manual endpoint entry
  - import from `Apilogy`
- define required and optional fields
- define inline validation rules for credentials, endpoint URL, and model metadata
- define the draft-save behavior
- define success output: creation of a draft model record

### 2. Endpoint validation flow

- design the validation-start interaction
- define the loading, success, and failure states
- define the retry interaction when validation fails
- define which technical details are shown directly and which stay behind an advanced panel

### 3. Benchmark run flow

- design package selection for MVP benchmark packs
- define the run initiation flow and confirmation
- define the benchmark status page:
  - queued
  - running
  - partial issue
  - failed
  - completed
- define what progress information is meaningful to the user
- define links from a completed run into scorecard and evidence views

### 4. Review and decision flow

- design the review queue list for `Admin / Reviewer`
- define the review detail layout:
  - overall score summary
  - category findings
  - evidence drill-down
  - reviewer notes
  - decision controls
- define decision options:
  - approve
  - approve with conditions
  - request rerun
  - restrict
- define mandatory fields before a reviewer can submit a decision

### 5. Publication and discovery flow

- design the publish control state after approval
- define what appears on internal ranking pages
- define what appears on public or semi-public model profile pages
- define how restricted or not-yet-approved models should be represented in the UI
- define the builder journey after publication so model discovery feels like a decision workflow, not a static listing

## Output Expected From This File

- screen-level tasks that can be used directly for wireframes or tickets

## Dependencies

- `01_Planning/Function_Breakdowns/AI_Sandbox_Main_User_UX_Journeys_Function.md`
- `01_Planning/Function_Breakdowns/Apilogy_AI_Capability_and_Sandbox_Integration_Function.md`
- `01_Planning/Function_Breakdowns/Telkom_AI_Assessment_and_Indonesia_Hub_Roadmap_Function.md`
