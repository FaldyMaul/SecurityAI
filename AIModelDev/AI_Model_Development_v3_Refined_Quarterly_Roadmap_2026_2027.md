# AI Model Development v3 Refined Quarterly Roadmap 2026-2027

Last updated: 2026-04-10

Related documents:

- [AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_v3_Refined_2026.md](D:\Work\PAM\SecurityAI\AIModelDev\AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_v3_Refined_2026.md)
- [AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md](D:\Work\PAM\SecurityAI\AIModelDev\AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md)
- [AI_Sandbox_v2_Refined_Quarterly_Roadmap_2026_2027.md](D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\AI_Sandbox_v2_Refined_Quarterly_Roadmap_2026_2027.md)

---

## 1. Purpose

This document converts the final AI model-development roadmap into a detailed quarterly execution plan from `Q1 2026` to `Q1 2027`.

This roadmap follows the chosen final plan closely:

- keep `LiteLLM` as the deployed front door
- use `LiteLLM Content Filter` as the baseline protection layer in `Q2 2026`
- expand privacy and prompt-attack handling in `Q3 2026`
- strengthen truthfulness and runtime grounding in `Q4 2026`
- mature the local sovereign semantic guardrail stack in `Q1 2027`

The roadmap is organized by these model-development layers:

- `Goals`
- `Observability & Monitoring`
- `Guardrails`
- `Guard Model`

---

## 2. Main Goal by Quarter

## Q1 2026 Main Goal

Establish `LiteLLM` as the deployed model gateway and validate the baseline guardrail surface.

## Q2 2026 Main Goal

Operationalize the built-in `LiteLLM Content Filter` as the baseline protection layer.

## Q3 2026 Main Goal

Implement structured expansion for privacy and prompt-attack handling using local and sovereign controls.

## Q4 2026 Main Goal

Strengthen truthfulness and runtime grounding controls for higher-risk production paths.

## Q1 2027 Main Goal

Mature the local sovereign guardrail stack into a deeper semantic and localization-aware layer.

---

## 3. Roadmap by Quarter

## 3.1 Q1 2026 (`Done`)

### Focus

Deploy the gateway baseline and validate the initial guardrail surface.

### Goals

- establish `LiteLLM` as the deployed model gateway
- confirm the serving path, request routing, and token tracking baseline
- validate that gateway-level controls can be attached to the deployed path

### Observability & Monitoring

- deploy `LiteLLM`
- track requests
- track tokens
- confirm baseline request telemetry can be tied to model usage

### Guardrails

- test `LiteLLM` guardrails feature in the deployed environment
- inspect how built-in content-filter categories appear in practice
- confirm whether the gateway can support future logging of guardrail events

### Guard Model

- keep heavy semantic guard models out of the first baseline
- avoid introducing separate moderation models before the gateway baseline is proven stable

### Expected Outcome

- `LiteLLM` is live, observable, and confirmed as the front door for later protection layers

---

## 3.2 Q2 2026

### Focus

Turn `LiteLLM Content Filter` into the real baseline protection layer.

### Goals

- operationalize the built-in `LiteLLM Content Filter` as the baseline protection layer
- make content filtering active, visible, and reviewable

### Observability & Monitoring

- add guardrail event logging
- link `LiteLLM` request telemetry and token telemetry
- record whether each request was:
  - passed
  - flagged
  - blocked
- confirm logs are usable for later sandbox evidence display

### Guardrails

- establish baseline gateway protection using `LiteLLM Content Filter`
- enable baseline blocking or filtering for:
  - prompt injection
  - denied medical advice
  - denied legal advice
  - denied financial advice
  - harmful violence
  - harmful self-harm
  - harmful child safety
  - illegal weapons
  - toxic and abusive language
  - keyword blocking
  - pattern matching
  - block code execution
  - prebuilt pattern PII masking
- document the active category mapping and rollout status
- distinguish which categories are:
  - fully enabled
  - partially enabled
  - monitored only

### Guard Model

- deploy `DeBERTa Prompt Injection` model as the first specialist guard model
- scope it narrowly to prompt-injection and prompt-risk use cases
- avoid expanding it into a general moderation stack in this quarter

### Expected Outcome

- the model stack has a practical baseline filter layer plus the first specialist prompt-injection model

---

## 3.3 Q3 2026

### Focus

Expand privacy and prompt-attack handling using stronger local controls.

### Goals

- implement structured expansion for privacy and prompt-attack handling
- move from only built-in categories toward stronger local and sovereign controls

### Observability & Monitoring

- make blocked or flagged events traceable per request
- ensure log records can distinguish:
  - which rule or category triggered
  - which model or route was used
  - whether the event was only flagged or fully blocked

### Guardrails

- add system prompt extraction blocking
- add data-exfiltration pattern blocking through `LLM Guard`
- integrate `Presidio` PII detection
- improve privacy handling across:
  - inbound prompts
  - outbound responses
  - logs
- document what remains rule-based versus model-based

### Guard Model

- deploy `Llama Guard 3` as the main semantic guard model for the next layer
- keep its use scoped to high-risk safety classification, not every request path
- validate resource usage and response latency before wider rollout

### Expected Outcome

- the stack moves beyond baseline gateway filtering into stronger privacy, prompt-defense, and semantic moderation controls

---

## 3.4 Q4 2026

### Focus

Add runtime grounding and truthfulness controls for higher-risk production paths.

### Goals

- strengthen truthfulness and grounding controls for higher-risk production paths
- make runtime grounding practical for sensitive answer paths

### Observability & Monitoring

- capture runtime-grounding and truthfulness-related telemetry where possible
- improve traceability of:
  - grounding checks
  - policy fallback behavior
  - retrieval-linked or unsupported answer decisions

### Guardrails

- add deeper data-exfiltration pattern blocking through `LLM Guard`
- operationalize `NeMo Guardrails` or `Guardrails AI` for runtime grounding
- begin Indonesian localization tuning
- improve handling of:
  - Bahasa slang
  - code-mixing
  - local harmful-content categories
- separate generic safety behavior from Indonesia-specific semantic behavior

### Guard Model

- establish quantized deployment direction by fine-tuning the security model
- test whether quantized moderation or safety classifiers stay accurate enough for the chosen categories

### Expected Outcome

- higher-risk truthfulness paths gain runtime grounding and the local stack begins adapting to Indonesian language reality

---

## 3.5 Q1 2027

### Focus

Mature the local sovereign semantic guardrail layer.

### Goals

- mature the local sovereign guardrail stack into a deeper semantic layer
- improve local semantic handling for production-like scenarios

### Observability & Monitoring

- improve truthfulness and semantic-check observability for higher-risk paths
- make localization-oriented failures easier to inspect in logs and review records

### Guardrails

- expand local rules and datasets for:
  - slang
  - social nuance
  - local bias patterns
- deepen semantic controls for Indonesia-specific risk categories
- distinguish between:
  - global safety rules
  - local sovereign or Indonesian rules

### Guard Model

- fine-tune the Indonesian localization guard model
- validate whether the tuned model improves local-language semantic handling without adding too much runtime cost

### Expected Outcome

- the model-development stack becomes materially stronger for Indonesian semantic and localization-aware risk handling

---

## 4. Quarterly Recap by Layer

## 4.1 Goals

| Quarter | Goal |
|---|---|
| `Q1 2026` | Establish `LiteLLM` as the deployed model gateway and validate the baseline guardrail surface |
| `Q2 2026` | Operationalize the built-in `LiteLLM Content Filter` as the baseline protection layer |
| `Q3 2026` | Implement structured expansion for privacy and prompt-attack handling using local and sovereign controls |
| `Q4 2026` | Strengthen truthfulness and runtime grounding controls for higher-risk production paths |
| `Q1 2027` | Mature the local sovereign guardrail stack into a deeper semantic and localization-aware layer |

## 4.2 Observability & Monitoring

| Quarter | Plan |
|---|---|
| `Q1 2026` | deploy `LiteLLM` and track requests and tokens |
| `Q2 2026` | add guardrail event logging and link request and token telemetry |
| `Q3 2026` | make blocked or flagged events traceable per request |
| `Q4 2026` | capture runtime-grounding and truthfulness-related telemetry |
| `Q1 2027` | improve truthfulness and semantic-check observability for higher-risk paths |

## 4.3 Guardrails

| Quarter | Plan |
|---|---|
| `Q1 2026` | test `LiteLLM` guardrails feature in the deployed environment |
| `Q2 2026` | establish baseline protection using `LiteLLM Content Filter` categories |
| `Q3 2026` | add system prompt extraction blocking, `LLM Guard` exfiltration controls, and `Presidio` integration |
| `Q4 2026` | add runtime grounding, deeper exfiltration control, and Indonesian localization tuning |
| `Q1 2027` | expand local rules and datasets for slang, nuance, and local bias patterns |

## 4.4 Guard Model

| Quarter | Plan |
|---|---|
| `Q1 2026` | keep heavy semantic guard models out of the first baseline |
| `Q2 2026` | deploy `DeBERTa Prompt Injection` model |
| `Q3 2026` | deploy `Llama Guard 3` as the semantic guard model |
| `Q4 2026` | establish quantized deployment direction by fine-tuning the security model |
| `Q1 2027` | fine-tune the Indonesian localization guard model |

---

## 5. Final Recommendation

The best execution order for the chosen AI model-development roadmap is:

1. keep `LiteLLM` deployed and monitored as the front door
2. use `Q2 2026` to make `LiteLLM Content Filter` the real baseline protection layer
3. use `Q3 2026` to add `LLM Guard`, `Presidio`, and `Llama Guard 3`
4. use `Q4 2026` for runtime grounding and Indonesian localization tuning
5. use `Q1 2027` for localization-specific semantic refinement and guard-model fine-tuning

If reduced to one sentence:

- the roadmap should move from `LiteLLM built-ins first` to `selected local semantic models second`, then into `localized truthfulness and Indonesian semantic refinement`.

