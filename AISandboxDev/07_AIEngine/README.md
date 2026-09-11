# 07_AIEngine - AI Engineer Agent Brief

Last updated: 2026-04-10

This folder is the working area for the `AI Engineer Agent`.

## Purpose

The AI engine workstream owns the benchmark and evaluation layer of `AI Sandbox`.

Primary responsibilities:

- `Moonshot` integration and package design
- recipe and benchmark quality
- Indonesia-specific localization of benchmark assets
- evidence quality expectations
- future-path design for `Garak`, `PyRIT`, `LLM Guard`, and `DeepEval`

## Current Product Truth

The current benchmark foundation is:

- `Moonshot`

Important boundaries:

- do not assume all future security tools are equally implemented today
- prioritize reliable benchmark evidence before broad tool expansion
- keep localized Indonesian evaluation direction central to the benchmark roadmap

## Immediate Priorities

1. refine current benchmark package design
2. replace mock executor with real queued `Moonshot` execution using `ARQ` + `Redis`
3. prioritize localized safety, privacy, and robustness benchmark packs
4. define evidence expectations per recipe output
5. define the next practical security-tool expansion layer after `Moonshot`

## Recommended Source Files

- `../01_Planning/AI_Sandbox_Q1_2026_Progress_Report.md`
- `../01_Planning/Indonesian_Sandbox_Localization_Guide.md`
- `../01_Planning/Indonesia_Verify_Blueprint.md`
- `../01_Planning/Integration_Status_Update_2026-04-10.md`
- `../01_Planning/Backlog_Progress/AI_Engineer_Agent_Backlog.md`
- `FollowUp_For_AIEngine_from_BE.md`
- `AI_Engineer_Execution_Brief_2026-04-10.md`
- `../06_Backend/AIEngine_Backend_Integration_Boundary_2026-04-10.md`
- `../AGENT_BRIDGE_GUIDE_2026-03-11.md`

## Working Rule

The AI Engineer Agent primarily works in:

- `07_AIEngine`

The AI Engineer Agent may also work in:

- `06_Backend`

when the task is specifically about:

- replacing mock benchmark execution
- adding `ARQ` worker integration
- wiring `Redis` queue handling
- parsing real `Moonshot` outputs into backend result schema

Do not broad-refactor backend ownership areas outside the benchmark executor boundary without documenting the change clearly.

## Local Moonshot Reference

Use the local Moonshot install as the first reference before re-implementing benchmark logic:

- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot`
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-data`
- `D:\Work\PAM\SecurityAI\moonshot-install\moonshot-ui`

For MVP, prefer copying or adapting the minimum useful benchmarking modules first rather than trying to integrate the entire Moonshot surface at once.
