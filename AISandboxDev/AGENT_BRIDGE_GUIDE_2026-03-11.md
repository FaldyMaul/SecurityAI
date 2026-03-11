# Agent Bridge Guide - Current Product Context

This guide is the handoff bridge for:

- `UIUX Agent`
- `FE Agent`
- `QA Agent`

Read this first before making further changes. If this file conflicts with older UI or planning docs, prefer this file together with `01_Planning/Product_Alignment_Update_2026-03-11.md`.

---

## 1. Current Product Truth

There are four connected products:

1. `AI Sandbox`
2. `ModelHub`
3. `AgentLab`
4. `Apilogy`

Current delivery focus:

- mostly `AI Sandbox`
- some `ModelHub`

Product split:

- `AI Sandbox` is the internal testing and scoring workspace for `Model Owner` or `Model Vendor`
- `ModelHub` is the leaderboard and discovery surface for `Developer` and `Use Case Owner`
- `AgentLab` will consume approved model guidance later
- `Apilogy` remains the capability marketplace and source inventory

Important boundary:

- do not design or build as if developers work directly inside `AI Sandbox`

---

## 2. What Each Agent Must Assume

## 2.1 UIUX Agent

You are designing two connected surfaces, not one:

- internal `AI Sandbox` flow
- developer-facing `ModelHub` flow

Current sandbox primary personas:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

Current `ModelHub` primary personas:

- `Developer`
- `Use Case Owner`
- `Product Owner`

Design rules:

- keep sandbox focused on submission, testing, results, and publish eligibility
- keep `ModelHub` focused on ranking, comparison, pricing, docs, and use case selection
- never mix internal evidence-heavy review UI into the developer-facing hub
- use Indonesian-first UX copy unless a bilingual need is explicit

Immediate UIUX priorities:

- make the sandbox journey clearer for model owners
- define promotion from sandbox result to `ModelHub` listing
- make leaderboard clearly belong to `ModelHub`, not to sandbox
- polish benchmark history and version comparison UX
- standardize language and status labels

## 2.2 FE Agent

You are implementing one codebase that currently hosts multiple route groups, but the product meaning of those routes must be kept distinct.

Map routes like this:

- `(internal)` routes are mainly `AI Sandbox`
- `(public)` ranking and public model pages are mainly `ModelHub`

Implementation rules:

- do not compute status ad hoc per page; keep shared status config
- keep benchmark execution background-safe
- keep publish guards enforced before any `ModelHub` visibility
- treat `LiteLLM` as the primary endpoint integration abstraction
- support benchmark history and version comparison as first-class features

Immediate FE priorities from QA:

- fix publish-to-leaderboard failure
- populate status column correctly
- ensure internal comparison flow does not redirect to generic landing
- implement package detail modal
- implement run-to-run comparison support
- default prompt selection to 100 percent

## 2.3 QA Agent

You are no longer testing a single blended sandbox-discovery app. You are testing:

- internal sandbox workflow integrity
- promotion or publication rules into `ModelHub`
- developer-facing discovery safety after publication

QA rules:

- test role separation between sandbox and `ModelHub`
- test that restricted or low-grade models never leak into `ModelHub`
- test that internal evidence stays internal
- test language consistency for Indonesian labels and copy
- test history, rerun, and comparison flows

Immediate QA priorities:

- validate publish guard behavior
- validate benchmark history visibility and accuracy
- validate version comparison behavior
- validate internal versus public data separation
- validate that route labels and page ownership reflect sandbox versus `ModelHub`

---

## 3. Updated Product Model

Use this as the operating model:

### AI Sandbox

- intake
- endpoint validation
- benchmark execution
- score generation
- reviewer notes
- publish eligibility
- rerun and version history

### ModelHub

- leaderboard
- model profile
- comparison
- pricing
- documentation
- real case examples
- trust summary
- security summary

### AgentLab

- model selection informed by approved guidance

### Apilogy

- source catalog and capability marketplace

---

## 4. Architecture Guidance

Serving-side architecture should be communicated as:

1. core LLM and related services
2. guardrail layer
3. observability layer
4. LLM API serving layer

Platform-side flow should be communicated as:

1. model enters `AI Sandbox`
2. model is tested and scored
3. model passes publish gate
4. model summary is promoted to `ModelHub`
5. `AgentLab` and possibly `Apilogy` reuse that approved signal

Do not present it as:

- developers logging into sandbox to do model discovery

---

## 5. Language and Terminology Guide

Preferred current terminology:

- `AI Sandbox`
- `ModelHub`
- `AgentLab`
- `Apilogy`
- `Pengujian` instead of generic `Testing` where the UI is Indonesian
- `Riwayat Pengujian` for benchmark history
- `Publikasikan ke ModelHub` if the action promotes to the developer-facing hub

Avoid ambiguous terms:

- avoid calling `ModelHub` pages "sandbox leaderboard"
- avoid calling builder-facing discovery pages "review" pages
- avoid mixing internal review terms into public model cards

---

## 6. Required Changes to Older Thinking

Older assumption:

- builder journey lives mainly inside sandbox

Replace with:

- builder journey lives mainly inside `ModelHub`

Older assumption:

- `Apilogy` import is the primary model source

Replace with:

- `LiteLLM` is the primary technical adapter, while `Apilogy` remains a metadata and capability source

Older assumption:

- publication is a simple UI toggle

Replace with:

- publication is a guarded promotion step with quality and policy checks

---

## 7. Agent Delivery Checklist

Before closing a task, each agent should verify:

- the task is clearly assigned to `AI Sandbox` or `ModelHub`
- the persona is correct for that surface
- the terminology is consistent in Indonesian-first copy
- the route or screen does not leak internal evidence to external users
- the work respects `LiteLLM`, background runs, history, and publish-guard requirements

---

## 8. Recommended Source Files

Read these together:

- `01_Planning/Product_Alignment_Update_2026-03-11.md`
- `03_QA_Docs/Context_Changes_Summary.md`
- `03_QA_Docs/UIUX_Agent_Feedback.md`
- `03_QA_Docs/Frontend_Agent_Feedback.md`
- `02_Product_UI/User_Flow.md`
- `02_Product_UI/Product_UI_Specification.md`

---

## 9. Immediate Next-Step Guidance

For `UIUX Agent`:

- split internal sandbox flow from `ModelHub` discovery flow in wireframes and labels

For `FE Agent`:

- stabilize publish flow, status rendering, and comparison flow before new feature expansion

For `QA Agent`:

- convert the product split into explicit test coverage for sandbox versus `ModelHub`
