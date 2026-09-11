# April 2026 Progress Alignment Update

Date: 2026-04-02

This document summarizes what changed since the March 2026 alignment and serves as a compact planning bridge for the latest project state.

Important reporting note:

- although this update is dated April 2, 2026, it should be treated as part of the Q1 2026 closeout baseline
- it is not intended to represent separate Q2 delivery progress

---

## 1. Current Product Truth

The connected product landscape is now treated as:

- `AI Sandbox` = internal model assessment and trust-preparation workspace
- `ModelHub` = developer-facing leaderboard and discovery surface
- `AgentLab` = downstream consumer of approved model guidance
- `Apilogy` = capability marketplace and metadata source

The current delivery focus remains:

- mostly `AI Sandbox`
- some `ModelHub`

---

## 2. What Changed in Frontend

Frontend progress now includes:

- restored recipe result view using table-first UX
- category filter tabs in recipe results
- `Fail Only` review support
- detailed prompt and response modal
- copy actions for prompt and response
- verdict and analysis display per test item
- expandable row details with findings and short recommendations
- integrated findings accordion in the recipe detail area

Runtime and implementation changes also include:

- client and server component boundary fix
- custom Next.js dist handling to reduce Windows file lock issues in local development
- fixture-backed completed run coverage for QA and FE validation

Impact on planning:

- result inspection is now more advanced than the older planning docs implied
- table-first result review should be treated as the current baseline
- history and comparison should remain part of the main roadmap

---

## 3. What Changed in Deployment and Publishing

Deployment and publishing progress now includes:

- pivot away from Windows-local `@cloudflare/next-on-pages` execution
- adoption of Cloudflare Pages native Git deployment
- resolution of nested git/submodule conflict
- build configuration fixes for root directory and output handling
- edge-runtime compatibility adjustments
- `nodejs_compat` requirement identified and resolved

Impact on planning:

- deployment constraints are now known and should be reflected in stack and roadmap docs
- frontend publishing should be planned against Cloudflare Pages reality, not only local assumptions

---

## 4. What Changed in UI/UX Assumptions

UI/UX progress and design documentation now reinforce:

- the separation between `AI Sandbox` and `ModelHub`
- Legion-aligned design system usage
- WCAG-oriented contrast and accessibility work
- Moonshot-aligned module and recipe structure
- Indonesia-specific modules such as SARA, Bahasa, `UU PDP`, and `UU ITE`

Impact on planning:

- builder-facing discovery should be treated as `ModelHub`
- internal assessment should remain sandbox-focused
- Indonesian benchmark framing is now part of product identity, not a side note

---

## 5. What This Means for Roadmap and Stack

The roadmap should now emphasize:

1. sandbox assessment workflow completion
2. review gate and promotion eligibility
3. `ModelHub` MVP for approved summaries
4. later downstream reuse in `AgentLab` and `Apilogy`

The stack should now emphasize:

- `LiteLLM` as the primary endpoint abstraction
- `Moonshot` as the current benchmark foundation
- background benchmark execution
- history and version comparison support
- Cloudflare Pages operational constraints

---

## 6. Done, Partial, Next

## Done

- product split clarified
- core frontend result UX materially improved
- deployment path validated through Cloudflare Pages native Git flow
- Indonesia-specific benchmark framing documented

## Partial

- canonical planning docs were previously only partially aligned
- promotion terminology was inconsistent across older docs
- some frontend flows are still fixture-backed

## Next

- finish end-to-end promotion flow into `ModelHub`
- align backend schema with frontend expectations
- define minimum `ModelHub` metadata shape
- continue QA around benchmark history, comparison, and publish guards

These next items should be read as Q2 starting priorities after the current Q1 closeout baseline.

---

## 7. Unresolved Gaps

- final backend contract for recipe-level results and history
- full production-ready promotion flow into `ModelHub`
- complete pricing/docs/example model for `ModelHub`
- tighter consistency between Indonesian and English UI labels
