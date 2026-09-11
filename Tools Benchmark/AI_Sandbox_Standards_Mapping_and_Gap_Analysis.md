# AI Sandbox Standards Mapping and Gap Analysis

This document connects the current `AI Sandbox` toolchain to:

- `ISO/IEC 42001`
- `NIST AI RMF 1.0`
- `OWASP Top 10 for LLM Applications`

It also explains where the current toolchain does **not** fully implement the standard intent and what should be added in the future.

This document is informed by the local AI Verify crosswalk materials:

- `D:\Work\PAM\SecurityAI\Research\Crosswalk-AIV-and-ISO42001-final.pdf`
- `D:\Work\PAM\SecurityAI\Research\AI_RMF_and_AI_Verify_Crosswalk.pdf`

The approach used here is:

1. use the AI Verify crosswalk as the benchmark style for ISO and NIST mapping
2. map our current tools and platform layers into similar evidence categories
3. identify where technical tooling is not enough

---

## 1. Important Compliance Positioning

The `AI Sandbox` can provide:

- technical testing evidence
- risk findings
- scorecards
- traceable benchmark history
- review records
- some governance-supporting documentation

The `AI Sandbox` cannot by itself create full compliance with:

- `ISO/IEC 42001`
- `NIST AI RMF`

This is because both frameworks include major non-technical requirements such as:

- policy
- accountability
- roles and responsibilities
- human oversight
- incident communication
- supplier management
- lifecycle governance

So the correct positioning is:

- the sandbox is an `evidence and assurance system`
- not a standalone compliance certification engine

---

## 2. Current Toolchain in Scope

The current and planned toolchain includes:

- `LiteLLM`
- `Moonshot`
- `DeepEval` later
- `PyRIT` later
- `Garak` later
- `LLM Guard` later
- `FastAPI` backend
- `PostgreSQL`
- artifact storage
- review and publication workflow
- `AgentLab` score consumption
- optional `Apilogy` linkage

These components contribute to standards coverage in different ways.

---

## 3. Mapping Logic Based on AI Verify Crosswalks

From the local `AI Verify` crosswalk PDFs, the important pattern is:

- standards are not mapped only to one tool
- they are mapped to a mix of:
  - documentation
  - process evidence
  - technical evidence
  - lifecycle controls

This is exactly how our sandbox should be positioned.

In practical terms:

- `Moonshot`, `DeepEval`, `PyRIT`, `Garak`, and `LLM Guard` provide technical evidence
- the sandbox review workflow provides structured decision evidence
- future governance workflows must provide the process and organizational evidence

---

## 4. ISO/IEC 42001 Mapping

The AI Verify crosswalk shows that ISO 42001 coverage spans:

- policy
- roles and accountability
- resources
- impact assessment
- lifecycle controls
- data governance
- communication and transparency
- intended use
- third-party responsibilities

Our sandbox can support part of this, but not all of it.

## 4.1 ISO Areas with Strong or Partial Tool Support

### A.5 Assessing impacts of AI systems

Relevant crosswalk cues from AI Verify:

- impact assessment process
- documentation of impact assessment
- impact on individuals and groups
- societal impact

Current sandbox support:

- safety benchmark results
- fairness findings
- privacy and harmful content findings
- structured review notes

Coverage level:

- `Partial`

Why only partial:

- the tools can generate risk evidence
- but formal impact assessment workflow still needs templates, human review, and documented approval

Recommendation:

- add an `AI Impact Assessment` form and workflow to the product later

### A.6 AI system life cycle

Relevant crosswalk cues from AI Verify:

- trustworthy development objectives
- verification and validation
- deployment
- operation and monitoring
- technical documentation
- event logging

Current sandbox support:

- `Moonshot` baseline benchmark evidence
- later `DeepEval`, `PyRIT`, and `Garak`
- raw artifact storage
- run history
- score trend and reassessment
- `LiteLLM` usage monitoring

Coverage level:

- `Strong for verification and validation`
- `Partial for deployment and monitoring`
- `Partial for documentation and logs`

Recommendation:

- keep benchmark runs versioned
- keep artifact and run logs immutable
- add lifecycle checkpoints:
  - pre-release review
  - production approval
  - reassessment cadence

### A.7 Data for AI systems

Relevant crosswalk cues from AI Verify:

- data acquisition
- data quality
- provenance
- data preparation

Current sandbox support:

- some metadata from Apilogy such as PII flags and retention clues
- dataset versioning for benchmark packs
- prompt and benchmark asset control

Coverage level:

- `Partial`

Gap:

- we do not yet have full data provenance and dataset governance workflow

Recommendation:

- add dataset registry
- record benchmark dataset source, owner, version, and approval
- add provenance fields for test packs and curated prompts

### A.8 Information for interested parties

Relevant crosswalk cues from AI Verify:

- system information for users
- external reporting
- communication of incidents

Current sandbox support:

- model profile page
- ranking page
- published summaries
- usage guidance

Coverage level:

- `Partial`

Gap:

- incident communication workflow is not implemented

Recommendation:

- add incident reporting and communication templates later
- add change log for model status changes and major findings

### A.9 Use of AI systems

Relevant crosswalk cues from AI Verify:

- responsible use
- intended use

Current sandbox support:

- suitability summary
- approval labels
- restrictions
- recommended controls
- later exposure inside `AgentLab`

Coverage level:

- `Strong for guidance`
- `Partial for policy enforcement`

Recommendation:

- enforce model usage restrictions in consuming systems where possible
- add policy-based blocking later in `AgentLab` or gateway logic

### A.10 Third-party and customer relationships

Relevant crosswalk cues from AI Verify:

- supplier responsibilities
- customer responsibilities
- allocation of responsibilities

Current sandbox support:

- some provider metadata
- ability to assess external endpoints through `LiteLLM`

Coverage level:

- `Weak to Partial`

Gap:

- supplier assurance workflow is not yet implemented
- third-party risk review is not yet formalized

Recommendation:

- add supplier risk checklist for external providers such as `Azure`
- require ownership, contractual, and data handling metadata for non-Telkom endpoints

---

## 4.2 ISO Areas with Weak Coverage Today

These ISO areas are not covered well by tools alone:

### A.2 Policies related to AI

Current coverage:

- `Weak`

What is missing:

- AI policy documents
- review cycle for policies
- alignment with organization policy

Recommendation:

- create an AI policy pack outside the benchmark tools
- later link policy evidence in the sandbox

### A.3 Internal organization

Current coverage:

- `Weak`

What is missing:

- role definitions
- reporting of concerns
- escalation process

Recommendation:

- define governance roles formally
- add review workflow and concern escalation records

### A.4 Resources for AI systems

Current coverage:

- `Weak to Partial`

What is missing:

- documented resource planning
- human competency records
- formal compute and tooling inventory governance

Recommendation:

- maintain a system resource register and ownership register

---

## 5. NIST AI RMF Mapping

The AI Verify crosswalk shows that NIST AI RMF spans:

- `Govern`
- `Map`
- `Measure`
- `Manage`

Our current toolchain is strongest in:

- `Measure`
- parts of `Map`
- parts of `Manage`

It is weakest in:

- `Govern`

## 5.1 Strongest NIST Coverage

### MEASURE 1 and MEASURE 2

Relevant crosswalk cues:

- appropriate methods and metrics
- evaluation for trustworthy characteristics

Current sandbox support:

- `Moonshot` baseline benchmarks
- later `DeepEval` for app and agent quality
- later `PyRIT` and `Garak` for adversarial testing
- category-level scorecards
- reproducible run history

Coverage level:

- `Strong`

This is the most natural fit for the sandbox.

### MEASURE 3

Relevant crosswalk cues:

- mechanisms for tracking AI risks over time

Current sandbox support:

- run history
- rescoring and reassessment
- published status changes
- review workflow

Coverage level:

- `Partial to Strong`

Recommendation:

- add mandatory periodic reassessment
- add model version-to-version comparison

### MAP 1 to MAP 5

Relevant crosswalk cues:

- context
- categorization
- expected usage
- system component risks
- impacts on people and society

Current sandbox support:

- model metadata
- use case fit
- category scores
- review summary
- optional Apilogy capability context

Coverage level:

- `Partial`

Gap:

- context and impact mapping are not yet fully formalized in workflow

Recommendation:

- add use case registration and impact assessment form
- require intended use and prohibited use fields

## 5.2 Weakest NIST Coverage

### GOVERN 1 to GOVERN 6

Relevant crosswalk cues:

- policies
- procedures
- accountability
- workforce preparation
- culture and communication
- third-party risk

Current sandbox support:

- very limited

Coverage level:

- `Weak`

Why:

- tooling cannot replace organization governance

Recommendation:

- create governance workflow modules later:
  - policy registry
  - approval authority matrix
  - training records
  - supplier assessment checklist
  - incident response playbooks

### MANAGE 1 to MANAGE 4

Relevant crosswalk cues:

- prioritize and respond to risks
- implement treatment strategies
- manage third-party risk
- document response and recovery

Current sandbox support:

- review status
- recommendations
- some reassessment logic

Coverage level:

- `Partial`

Gap:

- risk treatment workflow is still light
- response and recovery plans are not yet implemented

Recommendation:

- add remediation ticketing or action-tracking later
- add exception approval workflow
- add incident and response log

---

## 6. OWASP LLM Top 10 Mapping

Unlike ISO and NIST, `OWASP LLM Top 10` is much more naturally aligned to technical testing.

This means our sandbox tools can cover OWASP more directly.

## 6.1 Strong OWASP Coverage Areas

### Prompt injection and jailbreak-related risks

Current tool support:

- `Moonshot`
- later `PyRIT`
- later `Garak`
- later `LLM Guard`

Coverage level:

- `Strong`

### Sensitive information disclosure and privacy leakage

Current tool support:

- `Moonshot`
- later `LLM Guard`
- review scoring
- Apilogy metadata for PII clues

Coverage level:

- `Strong to Partial`

### Harmful output and unsafe behavior

Current tool support:

- `Moonshot`
- later `DeepEval`
- review and approval workflow

Coverage level:

- `Strong`

### Insecure model usage without controls

Current tool support:

- score labels
- recommended controls
- later `LLM Guard`
- later `AgentLab` guidance

Coverage level:

- `Partial`

Recommendation:

- later enforce warnings or blocks in consuming systems

## 6.2 Weaker OWASP Coverage Areas

### Supply chain and third-party dependencies

Coverage level:

- `Weak`

Reason:

- current tools assess endpoint behavior more than supply chain provenance

Recommendation:

- add supplier metadata collection
- add dependency and provider review checklist

### Excessive agency or unsafe tool autonomy

Coverage level:

- `Weak to Partial`

Reason:

- current MVP is model-first, not full agent runtime governance

Recommendation:

- add `DeepEval` and later agent-specific control testing
- add use case restrictions in `AgentLab`

### Denial of service and resilience

Coverage level:

- `Partial`

Reason:

- `Garak` can help later
- `LiteLLM` helps operationally
- but resilience engineering is broader than benchmark testing

Recommendation:

- add rate limiting, monitoring, fallback, and stress test workflow later

---

## 7. Tool-to-Standard Mapping Summary

## LiteLLM

Supports:

- NIST `MEASURE` and `MANAGE` support through monitoring and standardization
- ISO lifecycle support for operation and monitoring
- OWASP operational control support

Does not fully cover:

- policy
- accountability
- formal governance

## Moonshot

Supports:

- ISO verification and validation
- NIST `MEASURE`
- parts of `MAP`
- OWASP prompt injection, safety, and robustness evidence

Does not fully cover:

- governance policy
- supplier management
- incident communication
- organizational accountability

## DeepEval

Supports:

- app and agent evaluation
- RAG quality and hallucination evidence
- stronger application-readiness evidence for NIST `MEASURE`

Does not fully cover:

- organization governance
- external reporting
- supplier assurance

## PyRIT

Supports:

- advanced security evidence
- OWASP-style adversarial depth
- parts of NIST `MEASURE`

Does not fully cover:

- policy and governance
- broader lifecycle management

## Garak

Supports:

- offensive security evidence
- OWASP-oriented scanning

Does not fully cover:

- governance and process requirements
- intended use management

## LLM Guard

Supports:

- runtime risk reduction
- privacy and prompt protection
- operational safeguards

Does not fully cover:

- approval workflow
- evidence by itself unless integrated and logged properly

---

## 8. Current Gap Summary

The current toolchain is strongest at:

- benchmark execution
- technical evidence generation
- risk measurement
- runtime protection planning
- model scoring and review

The current toolchain is weakest at:

- policy management
- formal impact assessment workflow
- human oversight evidence
- supplier and third-party governance
- incident communication and response
- workforce and accountability evidence

This means the biggest gaps are not in scanner choice. The biggest gaps are in governance workflow.

---

## 9. Future Compliance Recommendations

To improve future alignment with ISO 42001 and NIST AI RMF, add these product capabilities later.

## Governance capabilities

- AI policy registry
- approval authority matrix
- role and responsibility records
- concern and escalation workflow
- training and competence evidence

## Lifecycle and review capabilities

- AI impact assessment form
- intended use and prohibited use declaration
- production approval checkpoint
- reassessment schedule and reminders
- model change log

## Data governance capabilities

- dataset registry
- dataset provenance records
- benchmark asset version control
- data handling classification fields

## Third-party and supplier capabilities

- supplier checklist for external providers
- provider ownership and data handling fields
- external model assurance review

## Risk treatment capabilities

- remediation action tracking
- exception workflow
- incident response workflow
- review of mitigation effectiveness

---

## 10. Recommended Compliance Roadmap

The practical roadmap should be:

### Now

- build strong `MEASURE` capability
- build baseline `MAP` capability
- build review and publication evidence
- focus on LLM trust scoring first

### Next

- add stronger `MANAGE` workflows
- add application and agent evaluation
- add runtime control integration

### Later

- add `GOVERN` workflows
- add policy registry
- add supplier assurance
- add impact assessment and incident workflows

This is the correct order because it matches what tooling can realistically deliver first.

---

## 11. Final Recommendation

The current AI Sandbox design can already provide credible technical evidence for:

- ISO 42001 lifecycle verification and validation areas
- NIST AI RMF `MEASURE`
- parts of `MAP` and `MANAGE`
- OWASP LLM technical risk testing

However, it is still incomplete for:

- ISO policy and organizational controls
- NIST `GOVERN`
- supplier governance
- incident communication and response
- full human oversight evidence

The correct future direction is therefore:

- keep the sandbox as the technical evidence engine
- add governance and workflow modules around it
- treat compliance as a combination of:
  - technical benchmark evidence
  - review workflow evidence
  - organizational policy and process evidence

That is the same broad pattern used by the AI Verify crosswalks and is the right way to position this platform internally.
