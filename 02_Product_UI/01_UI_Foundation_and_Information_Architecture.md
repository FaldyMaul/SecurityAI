# UI Task Detail: Foundation and Information Architecture

## Goal

Define the overall product structure for the MVP UI so page design, routing, and components are aligned before detailed screen work starts.

## UX and Journey Context

This file should be read together with:

- `01_Planning/AI_Sandbox_Main_User_UX_Journeys.md`
- `01_Planning/AI_Sandbox_Personas_and_User_Journeys.md`

The UI architecture must support four distinct journey types:

- `Model Owner`: create model entry, validate endpoint, run package, review scorecard, submit for review or rerun
- `Admin / Reviewer`: open pending review, inspect summary and evidence, decide model status, control publication
- `Use Case Builder / Product Owner`: browse ranking, filter shortlist, open model detail, compare models, select for use case
- `Public Viewer`: discover published models and read approved summary only

The navigation and page map in this file should preserve that journey split instead of forcing all personas into the same default experience.

## Deliverables

- sitemap for MVP pages
- persona-to-navigation map
- page inventory
- page ownership and priority
- shared UI state model

## Detailed Tasks

### 1. Define the MVP page map

- create the initial page list:
  - dashboard
  - models list
  - add model
  - model detail
  - benchmark run detail
  - review queue
  - review detail
  - ranking page
  - model comparison
  - public model profile
- mark each page as `MVP`, `Phase 2`, or `Later`
- mark whether each page is internal-only or publish-facing

### 2. Define navigation by persona

- map the default landing page for each persona
- define which top-level navigation items each persona sees
- define which actions are visible from list pages versus detail pages
- define when a user should be redirected because of role restrictions
- align each navigation branch to the planning journeys, not only to page ownership

### 3. Define object model for the UI

- standardize the core objects shown in the UI:
  - model
  - endpoint
  - benchmark package
  - run
  - scorecard
  - review decision
  - publication record
- define the minimum fields each page needs from the backend

### 4. Define state language used across the product

- standardize labels for:
  - draft
  - endpoint validation pending
  - endpoint valid
  - validation failed
  - run queued
  - run in progress
  - run failed
  - pending review
  - approved
  - restricted
  - published
- define color and badge rules for these states

### 5. Define design system usage rules

- list the shared components required first:
  - table
  - status badge
  - stepper
  - tabs
  - score card
  - evidence panel
  - decision drawer or modal
  - compare view layout
- identify where the existing provided UI system can be reused without customization
- identify which sandbox-specific components must be created

## Output Expected From This File

- a product UI structure that lets designers and frontend engineers work in parallel

## Dependencies

- `01_Planning/Function_Breakdowns/AI_Sandbox_Main_User_UX_Journeys_Function.md`
- `01_Planning/Function_Breakdowns/AI_Sandbox_Personas_and_User_Journeys_Function.md`
- `01_Planning/Function_Breakdowns/AI_Sandbox_Implementation_Plan_Function.md`
