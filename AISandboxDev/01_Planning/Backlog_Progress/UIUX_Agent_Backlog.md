# UIUX Agent Backlog

Last updated: 2026-04-13

## 1. Agent Scope

Primary ownership:

- workflow clarity
- review usability
- state language
- design system consistency
- current-state sandbox architecture communication

## 2. Quarter Focus

## Q2 2026

- make the internal sandbox journey clear for model owners and reviewers

## Q3 2026

- strengthen reviewer workflow, evidence hierarchy, and localized benchmark communication

## Q4 2026

- improve internal assurance presentation and trusted-summary separation

## 2A. Progress Checklist

- `[x]` planning direction already reflects current-state sandbox architecture and internal-review positioning
- `[~]` UIUX-specific implementation pass has not been the primary focus during the current integration sprint
- `[ ]` reviewer and model-owner workflow clarity pass still pending
- `[ ]` history and comparison visual pattern refinement still pending
- `[ ]` architecture redraw and current-state diagram polish still pending

## 2B. Note

Current sprint priority has been technical integration, not new UX production work.

UIUX should use the latest lifecycle and status reality from FE, BE, and QA when its next pass starts.

## 3. Detailed Backlog

## Epic UX-1 - Sandbox Workflow Clarity

Goal:

- make the internal sandbox journey obvious for model owners and reviewers

### Story UX-1.1

Title:

- refine model owner journey from registration to run completion

Tasks:

- map the intended owner flow step by step
- make next actions obvious at each state
- distinguish setup, running, review-ready, and reviewed states

### Story UX-1.2

Title:

- refine reviewer journey for evidence, history, and decision flow

Tasks:

- define reviewer entry point
- define decision context layout
- define how comparison and findings support the decision

### Story UX-1.3

Title:

- standardize next-action patterns across sandbox screens

Tasks:

- keep action order consistent
- keep CTA language consistent
- reduce ambiguity between benchmark completion and review approval

## Epic UX-2 - Result Review and Evidence UX

Goal:

- make benchmark evidence easier to inspect without overwhelming users

### Story UX-2.1

Title:

- refine table-first result review as the default evidence UX

### Story UX-2.2

Title:

- improve modal and expanded-detail patterns for prompt and findings review

### Story UX-2.3

Title:

- define history and comparison visual patterns for repeated runs

## Epic UX-3 - Language and Status Consistency

Goal:

- reduce ambiguity in internal UI language

### Story UX-3.1

Title:

- standardize Indonesian-first labels for core sandbox actions and states

### Story UX-3.2

Title:

- remove certification-like wording from current-state sandbox UI

### Story UX-3.3

Title:

- define explicit language for review-ready, approved, restricted, and promotion-ready states

## Epic UX-4 - Architecture Communication

Goal:

- keep product visuals aligned with current reality

### Story UX-4.1

Title:

- redraw current-state `AI Sandbox` system architecture

### Story UX-4.2

Title:

- separate current-state and future-state architecture visuals

### Story UX-4.3

Title:

- align visual communication with our own sandbox product stance

## 4. Dependencies

- PM state definitions
- FE route and component baseline
- BE workflow states
- current architecture and taxonomy docs

## 5. UIUX Priority Order

1. reviewer and model-owner workflow clarity
2. language and state consistency
3. history and comparison patterns
4. architecture diagram refresh

## 6. Prompt for UIUX Agent

Use this prompt when assigning work:

`You are the UIUX Agent for AI Sandbox. Your job is to make the internal workflow obvious for model owners and reviewers. Preserve the table-first review baseline, clarify state language, and make reviewer decisions understandable. Do not design around Moonshot or LiteLLM native UI. Design around our own sandbox workflow: registration, validation, benchmark review, comparison, review gate, and promotion eligibility. Avoid certification-like language and keep architecture visuals aligned with current-state reality.`
