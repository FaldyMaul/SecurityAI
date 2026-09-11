# Product Manager Agent Backlog

Last updated: 2026-04-13

## 1. Agent Scope

Primary ownership:

- roadmap alignment
- backlog quality
- reporting
- product language and scope control

## 2. Quarter Focus

## Q2 2026

- keep the sandbox scope narrow enough to complete the MVP workflow

## Q3 2026

- keep evidence, localization, and standards mapping aligned as the scope expands

## Q4 2026

- support internal assurance hardening and downstream-ready summary framing

## 2A. Progress Checklist

- `[x]` roadmap and backlog package refreshed
- `[x]` bridge docs aligned around AI Sandbox as our own product
- `[x]` FE, BE, AI Engineer, and QA handoff prompts created and iterated
- `[x]` integration status and QA findings notes created
- `[x]` backlog now reflects native local execution path instead of only ideal `ARQ` + `Redis` architecture
- `[x]` PM has now closed the bridge-phase loop in planning and backlog docs
- `[x]` PM steered and closed the model-management completion phase with QA validation
- `[ ]` stakeholder-facing progress reporting needs another refresh once the score-integrity path is fully confirmed
- `[ ]` PM now needs to steer the next phase: benchmark history, review gate, and promotion workflow

## 3. Detailed Backlog

## Epic PM-1 - Roadmap and Scope Control

Goal:

- keep `AI Sandbox` scope clear and protected

### Story PM-1.1

Title:

- maintain clear `AI Sandbox` versus `ModelHub` boundary in planning docs

### Story PM-1.2

Title:

- keep Q2 priorities aligned to post-Q1 baseline

### Story PM-1.3

Title:

- prevent roadmap drift into too many future tools too early

## Epic PM-2 - Reporting and Stakeholder Communication

Goal:

- keep project reporting accurate and decision-oriented

### Story PM-2.1

Title:

- maintain quarterly reporting and follow-up alignment notes

### Story PM-2.2

Title:

- keep architecture and system-flow communication aligned with current-state reality

### Story PM-2.3

Title:

- maintain stakeholder-ready summaries for security and assurance positioning

## Epic PM-3 - Cross-Agent Coordination

Goal:

- keep all agents working from the same assumptions

### Story PM-3.1

Title:

- keep backlog ownership and dependencies current

### Story PM-3.2

Title:

- update bridge and roadmap docs when implementation reality changes

Tasks:

- reflect backend shifts from prototype assumption to active async backend baseline
- record when the system is using mock execution versus real queued execution
- keep FE, BE, and AI Engineer handoff docs aligned to the same current state

### Story PM-3.3

Title:

- ensure planning language does not overclaim certification or production approval

### Story PM-3.4

Title:

- manage the mock-to-real execution bridge as an active blocker track

Tasks:

- record that backend Phase 1 foundation is complete
- record that current benchmark execution is mock-driven but API-integrated
- flag FE polling as a blocking dependency for visible end-to-end UX
- flag AI executor replacement with `ARQ` plus `Redis` as a blocking dependency for real benchmark execution
- keep priority order clear so FE can validate lifecycle UX before full executor replacement is done
- update master backlog whenever the backend state machine or worker design changes

Status:

- materially advanced on `2026-04-13`

Note:

- the blocker track has evolved from lifecycle and polling into score integrity and contract alignment
- the current blocker track has now moved into reviewer workflow maturity, history, and promotion-state clarity

## Epic PM-4 - Agent Tasking Clarity

Goal:

- make work packets clear enough that agents can execute without large interpretation gaps

### Story PM-4.1

Title:

- keep role prompts current for every agent backlog

### Story PM-4.2

Title:

- turn roadmap items into quarter-ready task lists

### Story PM-4.3

Title:

- keep task sequencing and dependencies explicit

## 4. Dependencies

- all functional backlogs
- roadmap docs
- architecture and taxonomy docs

## 5. PM Priority Order

1. roadmap and scope control
2. cross-agent coordination
3. agent tasking clarity
4. mock-to-real execution blocker management
5. stakeholder reporting

## 6. Prompt for Product Manager Agent

Use this prompt when assigning work:

`You are the Product Manager Agent for AI Sandbox. Keep the scope clear, the roadmap realistic, and the language disciplined. Protect the boundary between AI Sandbox and downstream systems, prevent future-tool sprawl, and keep all agent backlogs aligned to the same current-state reality. Actively manage the Q2 bridge from mock benchmark execution to real queued execution: FE must poll the backend lifecycle correctly, and AI Engineer must replace mock delay logic with ARQ plus Redis plus Moonshot execution. When converting plans into tasks, make execution packets concrete enough that FE, BE, AI Engineer, QA, UIUX, and Publisher agents can act without guessing.`
