# QA_Docs Task Index

This folder contains detailed QA and documentation tasks derived from the planning documents in `01_Planning`.

## Brief Summary

### Main goals

- define acceptance criteria and QA coverage for the sandbox MVP
- ensure review, publication, and evidence handling are reliable and auditable
- document how benchmark evidence supports trust decisions without overstating compliance

### Main pain points

- benchmark success does not automatically mean governance readiness
- multiple workflow states and personas create high risk of permission or publication mistakes
- evidence can become hard to audit if traceability is not defined early
- Indonesian localization adds dataset, policy, and validation complexity

### Stack

- backend and orchestration centered on `Python` and `FastAPI`
- `PostgreSQL` and artifact storage for evidence retention
- `LiteLLM` for gateway and access normalization
- UI consumers built in `React` / `Next.js`

### Language

- QA documentation must account for Indonesian and English content
- localized benchmark packs need support for formal Indonesian, colloquial Indonesian, and selected regional language cases
- policy and privacy checks must reference Indonesian context such as `UU PDP`

### Benchmark tools

- `Moonshot` is the main MVP benchmark engine
- future QA scope should anticipate `DeepEval`, `PyRIT`, `Garak`, and `LLM Guard`
- QA should validate both tool outputs and the sandbox's normalization, review, and publication workflow

Recommended execution order:

1. `01_QA_Scope_and_Test_Strategy.md`
2. `02_QA_Workflow_Acceptance_Criteria.md`
3. `03_QA_Role_Permission_and_Publication_Controls.md`
4. `04_QA_Evidence_Compliance_and_Traceability.md`
5. `05_QA_Localization_and_Benchmark_Pack_Validation.md`
6. `06_QA_Handoff_Checklist.md`

Primary goal:

- define the acceptance model, documentation set, and evidence requirements for a reliable sandbox MVP
