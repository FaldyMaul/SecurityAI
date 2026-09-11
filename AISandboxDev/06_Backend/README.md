# 06_Backend - Backend Agent Brief

Last updated: 2026-04-10

This folder is the working area for the `BE Agent`.

## Purpose

The backend owns the core application contract for `AI Sandbox`.

Primary responsibilities:

- model registration schema
- endpoint validation state
- benchmark orchestration
- background benchmark execution
- result and artifact contract
- benchmark history
- version comparison
- review gate state
- promotion eligibility state

## Current Product Truth

The backend supports `AI Sandbox` first.

Important boundaries:

- `AI Sandbox` is the internal assessment workspace
- `ModelHub` is downstream and should consume safe summary outputs later
- `LiteLLM` is the primary endpoint access abstraction
- `Moonshot` is the current benchmark foundation

## Immediate Priorities

1. finalize run-result schema
2. finalize history and comparison APIs
3. define review-ready and promotion-eligibility state transitions
4. reduce frontend fixture dependence

## Recommended Source Files

- `../01_Planning/AI_Sandbox_Implementation_Plan.md`
- `../01_Planning/AI_Sandbox_Technology_Stack.md`
- `../01_Planning/Integration_Status_Update_2026-04-10.md`
- `../01_Planning/Backlog_Progress/BE_Agent_Backlog.md`
- `AIEngine_Backend_Integration_Boundary_2026-04-10.md`
- `../AGENT_BRIDGE_GUIDE_2026-03-11.md`

## Current Integration Note

As of `2026-04-10`:

- frontend lifecycle polling is already integrated against backend APIs
- current benchmark execution in backend is still mock-driven
- the next cross-agent integration step is the AI Engineer replacement of mock execution with real queued `Moonshot` execution using `ARQ` + `Redis`

When the AI Engineer Agent works inside `06_Backend`, they should stay focused on:

- executor boundary
- queue integration
- progress persistence
- result parsing

They should avoid broad schema or route refactors unless those changes are documented clearly for the `BE Agent`.
