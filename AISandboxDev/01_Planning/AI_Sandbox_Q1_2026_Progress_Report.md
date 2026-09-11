# AI Sandbox Q1 2026 Progress Report

Reporting period: Q1 2026, including early-April closeout updates through 2026-04-02  
Prepared on: 2026-04-02

---

## 1. Executive Summary

This report focuses on `AI Sandbox` as a standalone internal product surface.

During Q1 2026, including the early-April closeout updates, the project moved from broad concept definition into a clearer `AI Sandbox` MVP direction.

The most important outcome is that `AI Sandbox` is now clearly positioned as:

- the internal workspace for model registration, endpoint validation, benchmark execution, evidence review, and promotion eligibility
- the trust-preparation layer before any later downstream exposure to other platforms

Operationally, Q1 delivered meaningful progress in four areas:

- product and workflow clarification for `AI Sandbox`
- research and benchmark foundations for Indonesian AI testing
- frontend progress on result inspection and review usability
- deployment and publishing fixes that established a viable frontend publishing path

---

## 2. Scope of This Report

This report intentionally focuses on `AI Sandbox`.

In this report:

- `ModelHub` is treated only as a downstream destination for approved outputs
- `AgentLab` is treated only as a later consumer of approved guidance
- `Apilogy` is treated only as a capability and metadata source

The core subject of this report is:

- what was accomplished for the internal `AI Sandbox` product in Q1
- what security, compliance, and benchmark groundwork has been completed
- what remains to be done in the next quarter

---

## 3. AI Sandbox Product Focus and Current State

The current `AI Sandbox` focus is:

- model registration
- endpoint validation
- benchmark execution
- score generation
- result inspection
- history and comparison
- review gate
- promotion eligibility

The current intended users are:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

This is an important refinement from earlier blended product framing. `AI Sandbox` is not the developer-facing leaderboard or general model catalog.

---

## 4. What We Completed in Q1

## Product and planning alignment

- clarified `AI Sandbox` as the internal trust and evaluation workspace
- refined the role of review gate and promotion eligibility in the workflow
- established `LiteLLM` and `Moonshot` as the current technical foundation
- aligned planning around benchmark history, version comparison, and background execution

## Research and benchmark foundations

- documented Indonesia-specific benchmark direction
- defined localized benchmark ideas around SARA, Bahasa, `UU PDP`, and `UU ITE`
- aligned the benchmark framing with `Moonshot`-style recipes and modules
- documented standards mapping for `ISO/IEC 42001`, `NIST AI RMF`, and `OWASP LLM Top 10`

## Frontend and UI/UX progress

- restored a table-first result review experience
- added category filtering and fail-oriented inspection support
- added prompt and response detail modal inspection
- improved findings display and recipe-level result understanding
- validated dummy-data coverage for completed run review
- improved design system alignment and accessibility direction

## Deployment and publishing progress

- moved away from fragile Windows-local deployment assumptions
- established a viable Cloudflare Pages native Git publishing path for the frontend prototype
- resolved build-path, edge-runtime, and compatibility issues

---

## 5. Security, Compliance, and Assurance Homework Completed

Q1 included important homework that strengthens `AI Sandbox` as an evidence and assurance system.

## Standards and assurance positioning

Completed planning and QA work now positions the sandbox as:

- an evidence and assurance system
- not a standalone certification engine

This is important because the sandbox can provide:

- technical testing evidence
- traceable benchmark history
- scorecards
- findings
- review records

But it does not by itself create full compliance with:

- `ISO/IEC 42001`
- `NIST AI RMF`
- broader governance obligations outside technical testing

## Security benchmark and testing tool direction

The current and planned security-related tool direction includes:

- `Moonshot` as the current benchmark foundation
- `Garak` as a future offensive security scanning layer
- `PyRIT` as a future conversational red-team layer
- `LLM Guard` as a future runtime privacy and protection layer
- `DeepEval` as a later app and agent evaluation layer

## Security and compliance areas already framed

The project has already documented alignment or intended coverage for:

- harmful content and refusal quality
- prompt injection and jailbreak resistance
- privacy leakage and sensitive information disclosure
- bias and fairness
- factuality and localized knowledge
- traceability, evidence retention, and review records

## Indonesian security and privacy localization

Q1 also established the local security direction for Indonesia-specific evaluation, including:

- SARA-sensitive benchmark content
- Bahasa Indonesia safety and fluency considerations
- `UU PDP` privacy-focused rules and masking direction
- `UU ITE` and digital ethics considerations
- planned localized judge-model and privacy-pattern handling

This is strategically important because it turns `AI Sandbox` into a more locally relevant assurance platform instead of a generic imported benchmark wrapper.

---

## 6. Security Platform and Integration Direction

From the current planning, the security integration direction for `AI Sandbox` is:

- `LiteLLM` as the primary endpoint adapter and serving control point
- `Moonshot` as the main benchmark execution layer
- future integration with `Garak`, `PyRIT`, and `LLM Guard`
- observability and logging around model usage and benchmark execution

This means the security platform direction is layered:

1. endpoint and serving normalization
2. benchmark execution and evidence generation
3. privacy and runtime protection support
4. history, traceability, and review decision support

The current Q1 status is:

- foundation and design direction established
- early benchmark and frontend review experience implemented
- broader multi-tool security integration still pending

---

## 7. Frontend and Review Workflow Progress

Q1 delivered practical progress for the internal review experience:

- recipe result review was restored in a more usable table-first layout
- category filtering and fail-oriented inspection support faster triage
- prompt and response detail can be opened in a dedicated modal
- findings and recommendations are easier to inspect in context
- fixture-backed completed runs support QA and UI validation

These improvements matter because the sandbox depends on evidence review quality, not only benchmark execution.

---

## 8. Deployment and Publishing Progress

Q1 also delivered important publishing progress for the frontend prototype.

Important outcomes:

- deployment path clarified through Cloudflare Pages native Git integration
- root directory and output configuration issues identified and resolved
- edge-runtime behavior better understood
- `nodejs_compat` requirement documented and applied

This matters because operational deployment constraints now form part of the real implementation boundary for the sandbox frontend.

---

## 9. Current Architecture and Stack Snapshot

Current `AI Sandbox` stack direction:

- frontend: `Next.js` + `TypeScript`
- backend: `Python` + `FastAPI`
- access layer: `LiteLLM`
- benchmark engine: `Moonshot`
- database: `PostgreSQL`
- artifact layer: object storage or structured file-based storage
- publishing path: Cloudflare Pages for the frontend prototype

Current architectural positioning of the sandbox:

- intake and endpoint validation
- benchmark execution
- recipe-level results and evidence
- history and version comparison
- review and promotion eligibility

---

## 10. Review of the Current Big-Picture System Flow

The current diagram is still directionally useful, but it should be updated before being treated as the official current-state architecture.

## What is still relevant

- model submission remains relevant
- isolated sandbox idea remains relevant
- AI gateway and routing remain relevant
- core testing pipeline remains relevant
- privacy and security checks remain relevant
- logging and monitoring remain relevant
- mitigation and retesting loop remain relevant

## What should be updated

- `Apilogy` should no longer be shown as part of the primary AI gateway path; `LiteLLM` is now the main endpoint abstraction
- the diagram should emphasize review gate and promotion eligibility before any downstream use
- `Compliance Report` should not imply automatic formal certification
- `Final Stage - Deployment Ready` is too strong for the current product truth; it should instead say something like:
  - `Eligible for Promotion`
  - `Approved for Downstream Use`
  - `Ready for ModelHub Publication`
- `Giskard` is shown as a safety tool in the current diagram, but current planning positions `Moonshot` as the active benchmark foundation and `Giskard` is not central to the MVP
- `mlflow` and `Langfuse` may remain as observability examples, but they should be shown as optional or future-aligned unless actively implemented
- `AI Verify` should be presented as a reference framework or reporting alignment, not as an automatic final-certification output unless that workflow is actually implemented
- the mitigation loop referencing `Flowise` / `AgentLab` should be treated as a downstream remediation or reuse concept, not as a mandatory current-state component

## Current recommendation

The diagram is still useful as a strategic target-state picture, but it is not fully accurate as a current-state implementation picture.

It should be updated into two views:

1. current-state sandbox MVP architecture
2. future-state expanded trust pipeline

---

## 11. Current Risks and Blockers

Despite strong Q1 progress, several gaps remain:

- some older documentation still uses blended product language
- frontend result flows still depend partly on fixtures and prototype-level data
- final backend schema and API contract for recipe-level results, history, and promotion are not fully settled
- full multi-tool security integration is not yet implemented
- some compliance-oriented features remain planned rather than delivered
- the big-picture architecture image overstates some certification and production-readiness conclusions

---

## 12. Q2 Recommended Next Steps

Recommended Q2 priorities, starting after the Q1 closeout baseline, are:

1. complete the internal sandbox workflow from benchmark completion to promotion eligibility
2. stabilize benchmark history and version comparison across frontend and backend
3. reduce fixture dependence by aligning frontend and backend contracts
4. define the minimum review and assurance workflow for promotion eligibility
5. prioritize the next security integration layer after `Moonshot`, especially privacy and offensive testing support
6. update the system-flow diagram into a current-state and future-state version

---

## 13. Overall Status

Q1 2026 should be viewed as a meaningful foundation quarter for `AI Sandbox`.

The project did not complete a production-ready end-to-end trust platform in Q1, but it achieved the critical foundation milestones:

- it turned a broad concept into a clearer sandbox product structure
- it established benchmark and evidence-review direction
- it completed useful frontend review improvements
- it validated a workable publishing path
- it established the security and compliance framing needed for the next stage

That gives the team a stronger base for Q2 execution focused specifically on `AI Sandbox`.
