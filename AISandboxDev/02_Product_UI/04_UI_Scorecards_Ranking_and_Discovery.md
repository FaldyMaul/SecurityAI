# UI Task Detail: Scorecards, Ranking, and Discovery

## Goal

Define how trust outputs are presented to builders, reviewers, and viewers so the scores support decisions rather than just display benchmark data.

## UX and Journey Context

This file is driven by the later stages of the planning journeys:

- `Model Owner` needs a scorecard that explains what failed and what to do next
- `Admin / Reviewer` needs evidence drill-down and decision support
- `Use Case Builder / Product Owner` needs ranking, comparison, restrictions, and suitability guidance
- `Public Viewer` needs a clean published summary without internal findings detail

The scorecard and ranking experience should therefore convert technical benchmark outputs into decision-ready language, as stated in `01_Planning/AI_Sandbox_Main_User_UX_Journeys.md`.

## Detailed Tasks

### 1. Define the MVP scorecard structure

- decide the top-level score blocks:
  - model trust
  - security
  - privacy
  - application readiness
  - compliance evidence coverage
- define what each score links to
- define summary versus drill-down behavior

### 2. Define findings presentation

- group findings by category and severity
- define how failed cases link to evidence
- define how mitigations or review notes are displayed
- define what should be hidden from public viewers

### 3. Define ranking page behavior

- define columns and sorting behavior
- define filters:
  - provider
  - model type
  - approval status
  - intended use case
  - score range
- define how unpublished and restricted models are handled

### 4. Define model comparison experience

- choose the MVP compare pattern for two or more models
- define the comparison attributes:
  - scores
  - strengths
  - weaknesses
  - restrictions
  - recommended use cases
- define which persona needs this in MVP

### 5. Define future discovery hooks

- prepare space for:
  - `AgentLab` consumption
  - `Apilogy` trust enrichment
- keep these as extension points, not MVP blockers

## Output Expected From This File

- a clear design brief for trust score presentation and model selection UX

## Dependencies

- `01_Planning/Function_Breakdowns/AI_Sandbox_Standards_Mapping_and_Gap_Analysis_Function.md`
- `01_Planning/Function_Breakdowns/Telkom_AI_Assessment_and_Indonesia_Hub_Roadmap_Function.md`
- `01_Planning/Function_Breakdowns/Apilogy_AI_Capability_and_Sandbox_Integration_Function.md`
