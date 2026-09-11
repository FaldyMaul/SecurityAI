# AI Sandbox System Flow Review

Date: 2026-04-02

This note reviews the current big-picture `AI Sandbox System Flow` image against the latest planning and delivery status.

---

## 1. Overall Assessment

The current image is still useful as a strategic concept diagram, but it is not fully accurate as a current-state product or architecture diagram.

Recommendation:

- keep it as a future-state or concept view
- do not use it as the primary current-state architecture slide without revision

---

## 2. What Is Still Relevant

- model registration
- isolated sandbox environment
- AI gateway and routing concept
- benchmark and testing pipeline
- privacy, safety, and security checks
- logging and monitoring
- pass or fail style decision point
- mitigation and retesting loop

These parts still align with the product direction.

---

## 3. What Is No Longer Fully Accurate

## Apilogy placement

In the image, `Apilogy` appears directly beside the gateway path.

Current planning position:

- `LiteLLM` is the primary endpoint abstraction
- `Apilogy` is a capability marketplace and metadata source

Recommendation:

- move `Apilogy` to a metadata or source-reference role, not as a primary serving control component

## Testing tool emphasis

In the image, the testing block highlights multiple tools at once:

- `DeepEval`
- `Giskard`
- `Garak`
- `PyRIT`
- `LLM Guard`

Current planning position:

- `Moonshot` is the active benchmark foundation
- `Garak`, `PyRIT`, `DeepEval`, and `LLM Guard` are future or partial integration directions
- `Giskard` is not currently central to MVP

Recommendation:

- update the current-state diagram to show `Moonshot` as the benchmark foundation
- show other tools as later integration layers or optional extensions

## Compliance and certification language

In the image:

- `Governance & Certification`
- `Compliance Report`
- `Final Stage — Deployment Ready`
- `Approved for Production`

These labels are too strong for the current product truth.

Current planning position:

- the sandbox is an evidence and assurance system
- it does not itself create formal certification
- it should determine review outcome and promotion eligibility

Recommendation:

- replace with:
  - `Review and Assurance`
  - `Assessment Report`
  - `Promotion Eligibility`
  - `Approved for Downstream Use`

## Monitoring tool examples

The image shows `mlflow` and `Langfuse`.

Current planning position:

- observability remains relevant
- these specific tools are not yet established as confirmed implementation anchors in the main planning docs

Recommendation:

- either label them as examples
- or remove tool logos from the current-state diagram

## Mitigation loop references

The image shows `Flowise` and `Agentlab` inside the mitigation loop.

Current planning position:

- `AgentLab` is a downstream consumer, not a mandatory current sandbox component

Recommendation:

- keep mitigation loop conceptually
- remove or de-emphasize downstream product branding from the current-state sandbox diagram

---

## 4. Recommended Updated Structure

The image should be split into two architecture views.

## View A: Current-State AI Sandbox MVP

Suggested flow:

1. model registration
2. endpoint validation through `LiteLLM`
3. benchmark execution through `Moonshot`
4. evidence and artifact storage
5. history and comparison
6. review gate
7. promotion eligibility decision

## View B: Future-State Expanded Trust Pipeline

Suggested flow:

1. model intake
2. multi-tool testing layers
3. privacy and security extensions
4. observability and monitoring
5. review and governance workflow
6. downstream publication or product consumption

---

## 5. Final Recommendation

The current image is still relevant as a strategic direction, but it should be updated before being used as the main product architecture reference.

Best next step:

- create one simplified current-state `AI Sandbox` architecture diagram
- keep the current image as a future-state trust pipeline reference after relabeling and tool-position refinement
