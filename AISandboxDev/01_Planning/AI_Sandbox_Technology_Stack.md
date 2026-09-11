# AI Sandbox Technology Stack

Last updated: 2026-04-02

This document defines the current recommended technology stack for the product surfaces now in scope:

- `AI Sandbox`
- `ModelHub`

It reflects current implementation progress, QA feedback, and publisher deployment reality.

---

## 1. Core Stack Summary

The recommended stack is:

- `Frontend`: `Next.js` + `TypeScript`
- `Backend`: `Python` + `FastAPI`
- `Primary Database`: `PostgreSQL`
- `Gateway / Endpoint Adapter`: `LiteLLM`
- `Core Benchmark Engine`: `Moonshot`
- `Future Evaluation Engine`: `DeepEval`
- `Future Security Engines`: `PyRIT`, `Garak`
- `Runtime Protection Layer`: `LLM Guard`
- `Artifact Storage`: object storage or structured file-based storage
- `Deployment Surface`: Cloudflare Pages for frontend publishing path
- `Model Source Catalog`: `Apilogy`

---

## 2. Product Surface Stack Positioning

## AI Sandbox

Main responsibilities:

- model intake
- endpoint validation
- benchmark execution
- results review
- history and comparison
- promotion eligibility

Stack emphasis:

- `FastAPI`
- `LiteLLM`
- `Moonshot`
- `PostgreSQL`
- artifact storage
- internal `Next.js` UI

## ModelHub

Main responsibilities:

- leaderboard
- comparison
- model profile
- pricing, docs, and examples
- approved trust summaries

Stack emphasis:

- `Next.js`
- API-driven published summary layer
- same backend platform or adjacent API surface

Important note:

- `ModelHub` is not a separate benchmark engine
- it is a consumption surface for approved outputs plus richer business metadata

---

## 3. Frontend Technology

## Recommended choice

- `Next.js`
- `TypeScript`
- existing design system and Legion-based component usage
- `next-intl` for localization-aware routing

## Why this choice remains correct

The current frontend already demonstrates:

- locale-first routing
- role-aware route grouping
- internal and public surfaces in one codebase
- result table workflows and prompt-detail modal support

This is a strong fit for the current split:

- `(internal)` routes mainly serve `AI Sandbox`
- `(public)` routes mainly serve `ModelHub`

## Important frontend constraints

- do not model ranking as a sandbox-native page in product language
- builder-facing pages must not expose sandbox evidence details
- UI labels should trend toward Indonesian-first consistency

## Deployment reality

For publishing:

- Cloudflare Pages native Git integration is now the preferred deployment path
- do not rely on Windows-local `@cloudflare/next-on-pages` as the target operational flow
- edge/runtime compatibility and `nodejs_compat` constraints must be reflected in frontend planning

---

## 4. Backend Technology

## Recommended choice

- `Python`
- `FastAPI`

## Why it remains correct

Most of the evaluation ecosystem is still Python-native:

- `Moonshot`
- `DeepEval`
- `PyRIT`
- `Garak`
- `LLM Guard`
- `LiteLLM`

## Backend responsibilities

The backend should handle:

- model registry
- endpoint metadata
- benchmark orchestration
- background job execution
- artifact retention
- normalized results
- reviewer state
- promotion eligibility
- published summary APIs for `ModelHub`

Important update:

- benchmark execution is now treated as a required background workflow, not a page-bound action

---

## 5. Database and Storage

## Primary database

- `PostgreSQL`

## What PostgreSQL should store

- model records
- provider metadata
- optional `Apilogy` references
- run metadata
- normalized results
- scorecards
- reviewer decisions
- promotion eligibility
- published summary metadata

## Artifact storage

Use:

- object storage if available
- or structured filesystem storage for MVP

Artifacts should include:

- raw benchmark outputs
- recipe-level details
- versioned run artifacts
- future security scan logs

Important rule:

- the source of truth is raw artifacts plus normalized database records, not only summary pages

---

## 6. Gateway and Endpoint Access Layer

## Recommended choice

- `LiteLLM`

## Why `LiteLLM` is now more central than before

`LiteLLM` should be treated as:

- the primary endpoint adapter
- the standard validation path
- the main normalization layer for provider differences

This includes:

- internal endpoints
- external providers
- future serving paths

Important refinement:

- `Apilogy` remains a capability catalog and metadata source
- `LiteLLM` is the primary technical access abstraction

---

## 7. Benchmark and Evaluation Layers

## Current benchmark foundation

- `Moonshot`

Why:

- fits baseline trust and safety benchmarking
- supports Indonesia-specific recipes and benchmark packs
- produces machine-readable outputs suitable for history and review

## Planned expansion layers

- `DeepEval` for app, RAG, and agent evaluation
- `PyRIT` for deeper multi-turn security testing
- `Garak` for offensive attack coverage
- `LLM Guard` for runtime control alignment, not as the primary benchmark engine

Important rule:

- do not integrate all engines in MVP

---

## 8. Current Frontend and Publisher Constraints That Affect Stack Decisions

The stack must now account for:

- result table UX and detailed prompt/response display already implemented in frontend
- benchmark fixture and history-oriented result views
- Windows-local Next cache lock issues in development
- Cloudflare Pages root directory and build path requirements
- edge runtime compatibility requirements
- `nodejs_compat` flag requirement for deployed frontend

These are no longer theoretical concerns. They are operating constraints that should shape implementation choices.

---

## 9. Recommended MVP Stack Snapshot

## For AI Sandbox

- `Next.js`
- `TypeScript`
- `FastAPI`
- `PostgreSQL`
- `LiteLLM`
- `Moonshot`
- artifact storage

## For ModelHub

- `Next.js`
- published summary API
- same or adjacent metadata backend
- pricing/docs/example content layer

## For deployment

- Cloudflare Pages native Git flow for the current frontend publishing path

---

## 10. Final Recommendation

Keep the stack narrow and operationally grounded:

- `LiteLLM` as endpoint abstraction
- `Moonshot` as benchmark foundation
- `FastAPI` and `PostgreSQL` as the core application platform
- `Next.js` as the shared UI platform for both internal and discovery surfaces
- Cloudflare Pages constraints treated as real architectural inputs, not as publishing afterthoughts
