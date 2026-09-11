# Backlog Progress

Last updated: 2026-04-13

This folder contains the active execution backlog for the current `AI Sandbox` program.

Use this folder for:

- delivery planning
- agent assignment
- quarterly execution tracking
- turning roadmap items into concrete tasks

## 1. How to Use This Folder

Start in this order:

1. [AI_Sandbox_Master_Backlog_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Master_Backlog_Plan_2026.md)
2. the architecture and taxonomy docs for current technical direction
3. the agent backlog files for implementation-ready tasking

Important interpretation:

- roadmap docs explain timing and direction
- backlog docs explain concrete execution
- agent backlogs explain ownership and handoff prompts

## 2. Current Program Focus

The current program focus is:

- build `AI Sandbox` as our own internal product
- keep `LiteLLM` as the runtime control layer
- keep `Moonshot` as the benchmark engine
- keep the sandbox UI and workflow as our own product surface
- complete the MVP workflow before over-expanding tools

Main execution areas:

- `Governance`
- `Reporting & Certification`
- `Advanced Red Team`
- `AI Sandbox Development`
- `Test Modules`

## 3. Core Backlog Files

- [AI_Sandbox_Master_Backlog_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Master_Backlog_Plan_2026.md)
- [AI_Sandbox_Build_Plan_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Build_Plan_2026.md)
- [AI_Sandbox_Detailed_Architecture_Delivery_Matrix_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Detailed_Architecture_Delivery_Matrix_2026.md)
- [AI_Sandbox_Taxonomy_Current_and_Future_Execution_2026.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Sandbox_Taxonomy_Current_and_Future_Execution_2026.md)

## 4. Agent Backlog Files

- [FE_Agent_Backlog.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\FE_Agent_Backlog.md)
- [UIUX_Agent_Backlog.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\UIUX_Agent_Backlog.md)
- [BE_Agent_Backlog.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\BE_Agent_Backlog.md)
- [QA_Agent_Backlog.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\QA_Agent_Backlog.md)
- [Publisher_Agent_Backlog.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Publisher_Agent_Backlog.md)
- [AI_Engineer_Agent_Backlog.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\AI_Engineer_Agent_Backlog.md)
- [Product_Manager_Agent_Backlog.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\Product_Manager_Agent_Backlog.md)

Each agent file should now be used as:

- the role brief
- the prioritized task list
- the dependency view
- the definition-of-done checklist
- the prompt template for assigning work to that agent

## 5. Working Rule

Treat `Q1 2026` as the baseline already established.

The current active delivery quarter is `Q2 2026`, with these priorities:

- complete our own sandbox workflow
- reduce fixture dependence
- make benchmark evidence reviewable and decision-ready
- stabilize review gate and promotion-eligibility states
- validate completed FE polling and API-first lifecycle integration
- replace mock benchmark delay flow with real queued execution using `ARQ` + `Redis` + `Moonshot`

## 6. Current Implementation Bridge

As of `2026-04-10`, the active backend bridge state is:

- backend foundation is functional on `Python 3.11` async SQLAlchemy
- run creation and state transitions are API-backed
- current benchmark execution is still mock-driven in backend
- frontend must poll backend model and run endpoints to reflect queued and running status
- frontend now polls backend model and run endpoints and uses fixture data only as explicit fallback
- AI execution must move next to real queued execution rather than direct mock delay

Use the agent backlog files with that interpretation, especially for:

- `FE Agent`
- `AI Engineer Agent`
- `Product Manager Agent`

## 7. Progress Snapshot

Current status as of `2026-04-13`:

- `[x]` FE polling and API-first lifecycle integration completed
- `[x]` FE queued-to-running UX refinement completed
- `[x]` FE local MVP duration estimate refinement completed
- `[x]` BE native background execution stabilization completed for local MVP
- `[x]` BE score contract alignment completed for FE-safe score rendering
- `[x]` AI Engine local dataset loop integration completed
- `[x]` AI Engine zero-score collapse fix completed for current MVP simulation path
- `[x]` QA rerun confirmed score integrity, FE-safe rendering, and date persistence
- `[x]` FE model creation and live model-list integration completed
- `[x]` QA Phase 2 model-management validation passed for manual entry, fallback, and recovery
- `[~]` Local MVP is runnable end to end, but benchmark scoring is still simulation-based, not real LiteLLM inference
- `[ ]` Production-grade queue isolation through `ARQ` + `Redis` remains future hardening work
- `[ ]` Reviewer workflow, history comparison depth, and promotion gate maturity remain active backlog items

Interpretation:

- the local MVP validation phase is complete
- the model-management completion phase is also complete
- the next active phase is benchmark history, review gate, and promotion workflow maturity
