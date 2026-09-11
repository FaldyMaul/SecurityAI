# Agent Bridge Guide - Current Product Context

Last updated: 2026-04-10

This guide is the handoff bridge for:

- `UIUX Agent`
- `FE Agent`
- `BE Agent`
- `AI Engineer Agent`
- `QA Agent`
- `Publisher Agent`

Read this first before making further changes. If this file conflicts with older UI or planning docs, prefer this file together with the latest planning documents in `01_Planning`.

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

- `AI Sandbox` is the internal testing, scoring, evidence, and review workspace for `Model Owner`, `Model Vendor`, and `Admin / Reviewer`
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

- keep sandbox focused on submission, testing, results, history, and promotion eligibility
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

Immediate FE priorities:

- stabilize result review experience
- keep API-first lifecycle handling on model detail and run detail pages
- keep shared status rendering across pages
- support history and comparison
- keep internal/public surface separation clean

Current FE baseline that other agents should assume:

- benchmark wizard submits real backend run requests
- frontend polls backend lifecycle every `2 seconds` while active
- model detail page is API-first for lifecycle state
- run detail page uses the same lifecycle mapping
- fixture data is fallback-only when backend is unavailable

## 2.3 BE Agent

You own the backend contract for `AI Sandbox`.

Primary responsibility areas:

- model registration schema
- endpoint validation status model
- benchmark orchestration
- background job execution
- run result contract
- history and comparison APIs
- review gate state
- promotion eligibility state

Implementation rules:

- treat benchmark execution as background workflow, not page-bound logic
- preserve raw artifact traceability
- expose separate shapes for internal detail and downstream-safe summaries
- make review and promotion states explicit in the data model

Immediate BE priorities:

- finalize run-result schema
- define history and comparison contract
- define review gate and promotion eligibility state transitions
- reduce frontend dependence on fixtures
- keep lifecycle and result APIs stable for the new FE polling path
- keep the local native background execution path runnable when queue infrastructure is unavailable

## 2.4 AI Engineer Agent

You own the evaluation and benchmark layer direction.

Primary responsibility areas:

- `Moonshot` integration and package definition
- benchmark recipe quality
- Indonesia-specific localization of evaluation assets
- future expansion path for `Garak`, `PyRIT`, `LLM Guard`, and `DeepEval`

Implementation rules:

- keep `Moonshot` as the active benchmark foundation
- prioritize Indonesia-specific benchmark relevance
- define evidence requirements per recipe and package
- do not over-expand into too many engines before MVP flow is stable

Immediate AI Engineer priorities:

- refine benchmark package definition
- replace mock executor with real queued benchmark execution using `ARQ` plus `Redis`
- prioritize localized safety, privacy, and robustness packs
- prepare future-path integration design for security tools

Current local execution note:

- native FastAPI `BackgroundTasks` is the current local MVP execution path
- `ARQ` plus `Redis` remains the queue-hardening target, not the only allowed local runtime path

## 2.5 QA Agent

You are no longer testing a single blended sandbox-discovery app. You are testing:

- internal sandbox workflow integrity
- review gate and promotion eligibility
- downstream discovery safety after promotion

QA rules:

- test role separation between sandbox and `ModelHub`
- test that restricted or low-grade models never leak into `ModelHub`
- test that internal evidence stays internal
- test language consistency for Indonesian labels and copy
- test history, rerun, and comparison flows

Immediate QA priorities:

- validate review gate behavior
- validate benchmark history visibility and accuracy
- validate version comparison behavior
- validate internal versus public data separation
- validate that route labels and page ownership reflect sandbox versus `ModelHub`

## 2.6 Publisher Agent

You own the frontend publishing and deployment path.

Primary responsibility areas:

- Cloudflare Pages deployment path
- deployment documentation
- root directory and build configuration correctness
- edge/runtime compatibility awareness

Implementation rules:

- treat Cloudflare Pages native Git flow as the standard publishing path
- do not assume Windows-local `next-on-pages` is the target operating model
- keep deployment recovery notes current

Immediate Publisher priorities:

- preserve current deployment path stability
- keep deployment walkthrough and guide aligned
- document environment-specific limitations clearly

---

## 3. Updated Product Model

Use this as the operating model:

### AI Sandbox

- intake
- endpoint validation
- benchmark execution
- score generation
- recipe-level evidence review
- reviewer notes
- promotion eligibility
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
4. LLM API serving layer through `LiteLLM`

Platform-side flow should be communicated as:

1. model enters `AI Sandbox`
2. model is validated and tested
3. model evidence is stored and reviewed
4. model passes review gate and promotion eligibility
5. downstream systems may later reuse the approved signal

Do not present it as:

- developers logging into sandbox to do model discovery
- sandbox granting automatic certification or production approval

---

## 5. Language and Terminology Guide

Preferred current terminology:

- `AI Sandbox`
- `ModelHub`
- `AgentLab`
- `Apilogy`
- `Pengujian` instead of generic `Testing` where the UI is Indonesian
- `Riwayat Pengujian` for benchmark history
- `Promosi ke ModelHub` or `Eligible for ModelHub`

Avoid ambiguous terms:

- avoid calling `ModelHub` pages "sandbox leaderboard"
- avoid calling builder-facing discovery pages "review" pages
- avoid mixing internal review terms into public model cards
- avoid wording that implies automatic certification

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

Older assumption:

- benchmark execution is mainly a page interaction

Replace with:

- benchmark execution is a background workflow with history and evidence retention

---

## 7. Agent Delivery Checklist

Before closing a task, each agent should verify:

- the task is clearly assigned to `AI Sandbox` or `ModelHub`
- the persona is correct for that surface
- the terminology is consistent
- the work does not leak internal evidence to external users
- the work respects `LiteLLM`, background runs, history, and review-gate requirements

---

## 8. Recommended Source Files

Read these together:

- `01_Planning/AI_Sandbox_Implementation_Plan.md`
- `01_Planning/AI_Sandbox_Technology_Stack.md`
- `01_Planning/Telkom_AI_Assessment_and_Indonesia_Hub_Roadmap.md`
- `01_Planning/AI_Sandbox_Q1_2026_Progress_Report.md`
- `01_Planning/AI_Sandbox_Current_State_Architecture_Diagram_Description.md`
- `03_QA_Docs/Context_Changes_Summary.md`
- `05_Publisher/Deployment_Fixes_Walkthrough.md`

---

## 9. Immediate Next-Step Guidance

For `UIUX Agent`:

- keep the current-state architecture and review-gate UX aligned

For `FE Agent`:

- keep API-first lifecycle behavior stable and reduce fallback dependence further

For `BE Agent`:

- keep result, history, and review state contracts stable for FE polling and AI executor replacement

For `AI Engineer Agent`:

- replace mock execution with real queued Moonshot execution, then continue package design

For `QA Agent`:

- convert review gate and evidence expectations into explicit acceptance coverage

For `Publisher Agent`:

- keep the Cloudflare publishing path stable and documented
