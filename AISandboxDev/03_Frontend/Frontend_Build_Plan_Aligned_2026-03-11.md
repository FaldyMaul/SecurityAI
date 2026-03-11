# Frontend Build Plan - Aligned March 11, 2026

This document supersedes older blended frontend framing where `AI Sandbox` and `ModelHub` were described as one product surface.

Use this file together with:

- `AGENT_BRIDGE_GUIDE_2026-03-11.md`
- `01_Planning/Product_Alignment_Update_2026-03-11.md`
- `02_Product_UI/Product_UI_Specification_Aligned_2026-03-11.md`

---

## 1. Route Ownership

## 1.1 Internal Routes = AI Sandbox

Primary routes:

- `/dashboard`
- `/models`
- `/models/new`
- `/models/[id]`
- `/models/[id]/runs/[runId]`
- `/reviews`
- `/reviews/[id]`
- `/settings`

Primary personas:

- `Model Owner`
- `Model Vendor`
- `Admin / Reviewer`

## 1.2 Public and Discovery Routes = ModelHub

Primary routes:

- `/`
- `/ranking`
- `/ranking/compare`
- `/models/[id]/public`

Primary personas:

- `Developer`
- `Use Case Owner`
- `Product Owner`
- `Public Viewer`

---

## 2. Core Frontend Rules

- do not treat ranking as a sandbox page
- do not expose sandbox evidence in public or builder-facing routes
- keep all status rendering based on shared backend state
- keep benchmark execution background-safe
- keep benchmark history and version comparison as first-class features
- use `LiteLLM` as the primary endpoint integration abstraction in product logic

---

## 3. Immediate FE Priorities

- fix publish-to-leaderboard failure
- populate model status consistently
- keep internal compare and ranking flows in the correct route context
- implement package detail modal
- implement version comparison data flow
- default prompt selection to 100 percent
- standardize Indonesian labels where product copy requires it

---

## 4. Component Ownership by Surface

Sandbox-focused components:

- `ModelForm`
- `EndpointValidationCard`
- `WorkflowStepper`
- `RunProgressTracker`
- `AssessmentReport`
- `EvidencePanel`
- `DecisionDrawer`
- `AuditTrailTimeline`

ModelHub-focused components:

- `RankBadge`
- `CompareBar`
- `CompareTable`
- `ModelComparisonGrid`
- public ranking page shell
- public model profile shell

Shared components:

- `StatusBadge`
- `DataTable`
- `PageHeader`
- `EmptyStateBlock`
- `Skeleton`
- layout and navigation primitives

---

## 5. API Shape Expectations

Sandbox APIs should return:

- detailed run state
- detailed findings
- evidence references
- review status
- history and version metadata

ModelHub APIs should return:

- published trust summary
- model comparison fields
- pricing and documentation references
- use case fit and restrictions

Rule:

- do not reuse internal-detail payloads directly for public pages without a separate safe summary shape

---

## 6. Promotion Guard Expectations

Frontend should treat promotion into `ModelHub` as a guarded action, not as a cosmetic toggle.

At minimum:

- blocked for low-grade results
- blocked for restricted models
- blocked for incomplete review state
- clearly labeled as `ModelHub` promotion in UI copy when appropriate

---

## 7. Engineering Guidance

- keep `statusConfig` as the single status source
- maintain route-group separation in layout behavior
- ensure middleware and component guards align with surface ownership
- lazy-load heavy comparison and evidence views where useful
- avoid coupling builder-facing pages to sandbox-only assumptions
