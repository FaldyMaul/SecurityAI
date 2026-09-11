# AISandboxDev - Development, Planning, and Delivery Guide

Last updated: 2026-04-02

This directory contains the main working materials for the `AI Sandbox` program, including planning, UI/UX, frontend, QA, publishing, backend, and AI engine workstreams.

The current delivery focus is:

- primarily `AI Sandbox`
- secondarily selected downstream preparation for `ModelHub`

---

## Directory Structure

- **[01_Planning](./01_Planning)**: Product plans, roadmap, progress reports, architecture notes, and backlog management.
- **[02_Product_UI](./02_Product_UI)**: UI/UX design assets, interface specifications, copy guidance, and workflow design.
- **[03_Frontend](./03_Frontend)**: Frontend implementation for the current `AI Sandbox` prototype using Next.js.
- **[03_QA_Docs](./03_QA_Docs)**: QA protocols, test guidance, review notes, and assurance documentation.
- **[05_Publisher](./05_Publisher)**: Deployment, publishing, Cloudflare guidance, and operational recovery walkthroughs.
- **[06_Backend](./06_Backend)**: Backend implementation and backend agent working area for API, orchestration, results, and review-state logic.
- **[07_AIEngine](./07_AIEngine)**: AI evaluation and benchmark-engine working area for `Moonshot`, localized benchmark design, and future security-tool integration planning.

---

## Current Product Positioning

The connected platform landscape is:

1. `AI Sandbox`
2. `ModelHub`
3. `AgentLab`
4. `Apilogy`

Current meaning of each:

- `AI Sandbox` = internal model assessment, evidence review, and promotion-eligibility workflow
- `ModelHub` = downstream discovery and leaderboard surface
- `AgentLab` = future downstream consumer of approved guidance
- `Apilogy` = capability marketplace and metadata source

Important note:

- developers and use-case owners are not the main users of `AI Sandbox`

---

## Main Working Areas

## Planning

Use `01_Planning` for:

- canonical implementation plan
- roadmap
- quarterly reporting
- architecture notes
- backlog and progress tracking

## UI and UX

Use `02_Product_UI` for:

- sandbox workflow design
- result review UX
- review-gate and state language
- architecture communication for current-state diagrams

## Frontend

Use `03_Frontend` for:

- internal and public route implementation
- result table and review experience
- state rendering and UI runtime behavior

## Backend

Use `06_Backend` for:

- model and run data contracts
- background benchmark execution
- result APIs
- history and comparison APIs
- review gate and promotion eligibility state

## AI Engine

Use `07_AIEngine` for:

- `Moonshot` package and recipe design
- localized Indonesia-specific benchmark assets
- security tool integration direction
- evidence quality expectations for benchmark outputs

## QA

Use `03_QA_Docs` for:

- workflow validation
- result quality checks
- security and assurance validation
- handoff and acceptance guidance

## Publishing

Use `05_Publisher` for:

- Cloudflare Pages deployment path
- publishing instructions
- deployment fixes and recovery notes

---

## Frontend Getting Started

The frontend is located in `03_Frontend`.

### Prerequisites

- Node.js (latest LTS recommended)
- npm

### Installation

```bash
cd AISandboxDev/03_Frontend
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

Important note:

- local Windows build behavior may differ from Cloudflare publishing behavior
- refer to `05_Publisher` for the current deployment path

---

## Recommended Entry Documents

Start here depending on your role:

- Product and planning: `01_Planning/AI_Sandbox_Implementation_Plan.md`
- Progress and reporting: `01_Planning/AI_Sandbox_Q1_2026_Progress_Report.md`
- Architecture communication: `01_Planning/AI_Sandbox_Current_State_Architecture_Diagram_Description.md`
- Agent handoff: `AGENT_BRIDGE_GUIDE_2026-03-11.md`

---

## Source Control Notes

Repository:

- `https://github.com/FaldyMaul/SecurityAI.git`

When updating docs or implementation artifacts:

- keep planning, delivery, and deployment documentation aligned with actual current-state behavior
- avoid reintroducing blended `AI Sandbox` and `ModelHub` language into sandbox-specific docs
