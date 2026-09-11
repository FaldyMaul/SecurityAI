# AI Sandbox Current-State Architecture Diagram Description

Date: 2026-04-02

This document describes the updated **current-state AI Sandbox architecture** in a format that can be used to redraw the main system diagram.

It is intended for:

- design or presentation updates
- product and architecture communication
- handoff to UIUX, FE, QA, or publisher agents

Important positioning:

- this is the **current-state AI Sandbox MVP** view
- this is **not** the future-state expanded trust pipeline
- `ModelHub`, `AgentLab`, and `Apilogy` should be shown only as external or downstream relationships where relevant

---

## 1. Diagram Title

Use this title:

**AI Sandbox Current-State Architecture**

Use this subtitle:

**Internal Model Assessment, Evidence Review, and Promotion Eligibility Workflow**

---

## 2. Diagram Purpose

The diagram should communicate that `AI Sandbox` is currently:

- an internal model assessment workspace
- an evidence and assurance system
- a review-gated workflow
- a trust-preparation layer before any downstream publication or reuse

The diagram should not imply:

- automatic certification
- automatic production approval
- that developers directly use the sandbox for discovery
- that all future security tools are already fully integrated

---

## 3. Recommended Left-to-Right Diagram Flow

The main flow should be presented left to right in **7 stages**.

## Stage 1 - Model Registration

Label:

**Step 1 - Model Registration**

Purpose:

- create internal model record
- capture endpoint and model metadata
- optionally capture source reference from `Apilogy`

Suggested short description:

**Model owner registers the model and provides endpoint details for testing.**

Recommended visual cues:

- person or team icon
- upload or form icon

Recommended footer label:

`AI Sandbox UI`

Important note:

- `Apilogy` should not be shown here as the main workflow engine
- if shown, it should appear only as an optional metadata or source-reference input

---

## Stage 2 - Sandbox Validation Setup

Label:

**Step 2 - Endpoint Validation and Sandbox Setup**

Purpose:

- validate endpoint connectivity
- prepare isolated assessment path
- confirm the model can be reached safely through the expected route

Suggested short description:

**Sandbox validates the endpoint and prepares the isolated testing path.**

Recommended visual cues:

- container or sandbox icon
- validation or checklist icon

Important note:

- this is where the system confirms the assessment environment, not production deployment

---

## Stage 3 - Endpoint Adapter and Routing

Label:

**Step 3 - Endpoint Adapter and Routing**

Primary technology to show:

- `LiteLLM`

Purpose:

- normalize endpoint access
- standardize request and response path
- provide a consistent execution route to benchmark tools

Suggested short description:

**Requests are routed through LiteLLM to standardize access, policy path, and observability.**

Recommended visual cues:

- gateway or routing icon
- shield or adapter icon

Important note:

- `LiteLLM` should be the main named tool in this block
- `Apilogy` should not sit beside it as an equal gateway component
- if `Apilogy` is shown at all, it should be off to the side as:
  - `Optional metadata source`
  - `Capability reference`

---

## Stage 4 - Benchmark Execution Pipeline

Label:

**Step 4 - Benchmark Execution Pipeline**

Primary technology to show:

- `Moonshot`

Purpose:

- run the current benchmark package
- generate structured evidence
- capture recipe-level results

Suggested short description:

**Moonshot executes the current benchmark package and produces machine-readable evidence.**

Recommended sub-areas inside this block:

- safety and harmful content
- privacy leakage
- robustness and jailbreak resistance
- localized evaluation and factuality

Important note:

- `Moonshot` should be visually emphasized as the current foundation
- `DeepEval`, `Garak`, `PyRIT`, and `LLM Guard` should not be shown as equal current-state cores unless clearly marked as future or partial layers

If you want to mention future tools in this block, use a small side annotation:

**Future expansion layers: DeepEval, Garak, PyRIT, LLM Guard**

---

## Stage 5 - Evidence, Artifacts, and History

Label:

**Step 5 - Evidence and Run History**

Purpose:

- store benchmark artifacts
- preserve run history
- support version comparison
- retain recipe-level evidence for review

Suggested short description:

**Results, artifacts, and versioned benchmark history are stored for traceability and review.**

Recommended visual cues:

- database icon
- document or evidence icon
- history/timeline icon

Recommended technology references:

- `PostgreSQL`
- artifact storage

Important note:

- this block is important because the sandbox is an evidence system, not just a runner

---

## Stage 6 - Review and Assurance Gate

Label:

**Step 6 - Review and Assurance Gate**

Purpose:

- inspect score summary
- inspect detailed evidence
- review benchmark history
- decide rerun, restriction, or approval status

Suggested short description:

**Reviewer inspects evidence and determines whether the model is eligible to move forward.**

Recommended decision outcomes to show:

- approved
- approved with controls
- restricted
- reassessment required

Recommended visual cues:

- reviewer or approval icon
- scorecard icon
- audit or clipboard icon

Important note:

- do not label this block as `Certification`
- do not imply formal compliance approval
- better labels are:
  - `Review and Assurance`
  - `Review Gate`
  - `Assurance Decision`

---

## Stage 7 - Promotion Eligibility Output

Label:

**Step 7 - Promotion Eligibility**

Purpose:

- mark the model as ready for downstream use
- prepare approved trust summary for later downstream publication

Suggested short description:

**Approved models become eligible for downstream publication or controlled reuse.**

Recommended output labels:

- `Eligible for ModelHub`
- `Approved for Downstream Use`
- `Ready for Trusted Publication`

Do not use:

- `Approved for Production`
- `Certified`
- `Deployment Ready`

because those overstate the current product and governance truth.

---

## 4. Optional Side Loops and Supporting Elements

## A. Mitigation and Retest Loop

Place below the main flow.

Label:

**Mitigation and Retest Loop**

Purpose:

- fix model issues
- improve prompts or serving policy
- refine data or benchmark performance
- rerun the model in the sandbox

Suggested short description:

**Failed or restricted models are improved and retested through the sandbox workflow.**

Important note:

- do not make `AgentLab` a mandatory component of this loop
- if mentioned, it should be a secondary future-facing note, not the main remediation engine

## B. Observability and Logging

Can be shown as a supporting strip above or below the main technical path.

Label:

**Observability and Logging**

Purpose:

- track requests
- collect metrics
- store logs
- support operational debugging and audit traceability

Suggested short description:

**Operational telemetry supports monitoring, troubleshooting, and audit traceability.**

Important note:

- if tools like `Langfuse` or `MLflow` are shown, mark them as examples rather than committed final tooling

## C. External Relationships

If external relationships are shown, place them outside the main core pipeline.

Recommended external boxes:

- `Apilogy`
  - label as `Capability catalog / metadata source`
- `ModelHub`
  - label as `Downstream discovery surface`
- `AgentLab`
  - label as `Future downstream consumer`

Important note:

- these should not visually dominate the main sandbox flow

---

## 5. Security and Compliance Positioning Notes

The diagram should communicate the following truths:

- all models should be tested before downstream exposure
- security, safety, and privacy are assessed in the sandbox
- failed or high-risk models should be improved and retested
- the sandbox creates technical evidence and review support
- the sandbox does not by itself create full certification

Recommended side-note copy:

- `All models must pass internal assessment before downstream promotion`
- `Security, safety, and privacy are evaluated in the sandbox`
- `Failed models must be improved and retested`
- `Assessment results support review and assurance, not automatic certification`

---

## 6. Current-State vs Future-State Tool Placement

## Current-state tools to emphasize

- `LiteLLM`
- `Moonshot`
- `FastAPI`
- `PostgreSQL`
- artifact storage

## Future or partial tools to de-emphasize

- `DeepEval`
- `Garak`
- `PyRIT`
- `LLM Guard`
- `Langfuse`
- `MLflow`
- `Giskard`

These can appear in:

- a small note
- a secondary legend
- a future-state companion diagram

They should not appear as if all are equally implemented today.

---

## 7. Recommended Final Slide Structure

If redrawing as a presentation slide, use this layout:

### Top

- title
- subtitle

### Center main row

1. model registration
2. validation and sandbox setup
3. `LiteLLM` routing
4. `Moonshot` benchmark pipeline
5. evidence and history
6. review and assurance gate
7. promotion eligibility

### Bottom row

- mitigation and retest loop

### Right side callouts

- internal assessment before downstream use
- security, safety, and privacy evaluation
- evidence and assurance, not automatic certification

### Side or footer notes

- `Apilogy` as metadata source
- `ModelHub` as downstream discovery
- `AgentLab` as future downstream consumer

---

## 8. Final Recommendation

Use this document to redraw the **current-state AI Sandbox architecture** as a simpler, more accurate diagram.

Best practice:

- keep the current big-picture image as a future-state concept after relabeling
- create a separate cleaner current-state diagram based on this Markdown for product, planning, and stakeholder communication
