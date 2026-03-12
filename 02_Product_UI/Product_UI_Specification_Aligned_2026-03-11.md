# Product UI Specification - Aligned March 11, 2026

This document supersedes older blended UI framing where `AI Sandbox` and `ModelHub` were treated as one product surface.

Use this file together with:

- `01_Planning/Product_Alignment_Update_2026-03-11.md`
- `AGENT_BRIDGE_GUIDE_2026-03-11.md`
- `02_Product_UI/User_Flow.md`

---

## 1. Product Surface Split

## 1.1 AI Sandbox

Audience:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

Purpose:

- register model
- validate endpoint
- run benchmark
- inspect scorecard
- review evidence
- decide promotion eligibility

Core routes:

- `/dashboard`
- `/models`
- `/models/new`
- `/models/[id]`
- `/models/[id]/runs/[runId]`
- `/reviews`
- `/reviews/[id]`

## 1.2 ModelHub

Audience:

- `Developer`
- `Use Case Owner`
- `Product Owner`
- wider internal or public viewers where allowed

Purpose:

- leaderboard
- model profile
- comparison
- pricing
- documentation
- use case examples
- trust summary from sandbox

Core routes:

- `/`
- `/ranking`
- `/ranking/compare`
- `/models/[id]/public`

---

## 2. UX Rules

- do not expose raw evidence outside `AI Sandbox`
- do not make developers use sandbox pages for discovery
- keep review and promotion gating inside `AI Sandbox`
- keep leaderboard, comparison, pricing, and docs inside `ModelHub`
- use Indonesian-first labels by default
- treat benchmark history and version comparison as required

---

## 3. AI Sandbox Page Specification

### Dashboard

Purpose:

- reviewer and operator overview

Main sections:

- summary tiles
- pending review queue
- active and recent runs
- system health

### My Models

Purpose:

- model owner workspace

Main sections:

- filters
- model table
- status badges
- latest score
- actions

### Add Model

Purpose:

- create a draft model and validate endpoint path

Main sections:

- source selector
- manual config form
- optional `Apilogy` metadata import
- endpoint validation panel
- save and continue actions

Important note:

- `LiteLLM` is the primary technical path for validation and serving normalization

### Model Detail

Purpose:

- central sandbox record for a model

Main sections:

- model metadata
- workflow stepper
- endpoint card
- benchmark selector
- run history
- score summary
- findings summary

### Benchmark Run Detail

Purpose:

- live and historical run detail

Main sections:

- run header
- progress tracker
- scorecard
- evidence panel
- rerun action
- compare-with-previous action

### Review Queue and Review Detail

Purpose:

- review gate for promotion eligibility

Main sections:

- queue filters
- score summary
- evidence drill-down
- reviewer notes
- decision controls
- audit trail

Decision outputs:

- approved
- approved with controls
- restricted
- reassessment required

---

## 4. ModelHub Page Specification

### Landing

Purpose:

- top-level entry into `ModelHub`

Main sections:

- hero
- featured published models
- methodology summary
- browse CTA

### Ranking

Purpose:

- discover promoted models

Main sections:

- filters
- ranked grid or table
- compare bar
- trust summary chips

Visible data:

- approval status
- trust summary
- security summary
- pricing snippet
- use case fit

### Comparison

Purpose:

- compare shortlisted models

Main sections:

- score comparison
- strengths and weaknesses
- restrictions
- pricing
- use case fit

### Public Model Profile

Purpose:

- detailed but safe model summary

Main sections:

- hero summary
- trust overview
- limitations
- documentation links
- pricing or package notes
- use case examples

Never show:

- raw evidence
- reviewer notes
- internal-only findings detail

---

## 5. Shared Component Guidance

Shared across surfaces:

- badges
- tables
- cards
- filters
- charts
- empty states

Sandbox-only components:

- evidence panel
- decision drawer
- workflow stepper
- review audit trail
- run progress tracker

ModelHub-only components:

- compare bar
- ranking card
- pricing block
- documentation block
- example use case block

---

## 6. Status and Promotion Rules

Sandbox states:

- draft
- endpoint valid
- validation failed
- run queued
- run in progress
- run failed
- assessment completed
- review ready
- approved
- approved with controls
- restricted
- reassessment required

ModelHub visibility states:

- not promoted
- promotion ready
- published to `ModelHub`
- hidden from `ModelHub`

Rule:

- sandbox completion does not automatically create `ModelHub` visibility

---

## 7. Immediate UI Refinement Priorities

- make sandbox and `ModelHub` labels explicit in the UX copy
- rename ambiguous publish actions to indicate promotion into `ModelHub`
- make benchmark history and version comparison visible in sandbox flows
- ensure leaderboard and compare experiences are clearly `ModelHub`
- standardize Indonesian terminology
