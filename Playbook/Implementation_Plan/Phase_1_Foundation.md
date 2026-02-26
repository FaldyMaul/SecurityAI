# Phase 1: Foundation & Governance (Weeks 1-3)

## Objective
Establish the regulatory baseline, operational structure, and procedural rules for the National AI Sandbox. This phase ensures that the technical testing platform has a well-defined standard to measure against (e.g., EU AI Act, KOMINFO guidelines) and designates the personnel responsible for its continuous operation.

## Key Deliverables
1. **Master Playbook & Guidelines V1.0**: Finalize the core modular documents (Overview, Framework, Roles, Assessment plans).
2. **AI Security Baseline Document**: Defines technical and non-technical minimum requirements for all production GenAI models.
3. **Operational SOPs**: Clear, step-by-step procedures detailing what to do during an AI incident (e.g., PII breach, model hallucination leading to brand damage).

## Team Structure & Resource Allocation
Based on the current PAM Security AI team structure:

*   **Management & PM**: Supervisor (Hadi), Sec/AI Manager (FAN), PM (Faldy), Scrum Master (Edo). *Role: Drive the alignment with Telkom legal and government affairs.*
*   **Blue Team (Defensive/Governance)**: Ardy, Danar, Tyo, Fajar. *Role: Write the rules, define "pass/fail" thresholds, and act as the Human-in-the-Loop (HITL) reviewers.*
*   **Red Team (Offensive)**: Dicky, Syarif, Wawan. *Role: Begin researching zero-day jailbreaks and adversarial techniques specifically effective against Indonesian language models.*

### ⚠️ Projected Talent / Resource Needs
*   **AI Policy Expert / Legal Liaison**: Currently, the team lacks a dedicated legal resource. Given the risk of "Regulatory Uncertainty," a part-time consultant or liaison from the Legal & Compliance unit is highly recommended to ensure our thresholds meet upcoming national laws.

## Implementation Steps

1.  **Define Risk Categories & Thresholds**:
    *   *Action*: The Blue Team maps out specific risks (Hallucination, Bias, Toxicity, PII Leakage, Jailbreak Vulnerability).
    *   *Decision*: Establish what constitutes a "Critical Failure" vs. a "Warning." (e.g., Any PII leakage is a hard fail, but minor stylistic bias might be a warning).
2.  **Formalize the HITL Review Process**:
    *   *Action*: Detail the exact workflow when an automated test flags a model. Who reviews it? How long do they have? What is the escalation path to Management?
3.  **Draft Initial Acceptance Criteria**:
    *   *Action*: Create the rubric that models must pass to exit the Sandbox and enter production.

## Verification & Review
*   Present the finalized "AI Security Baseline Document" and "Operational SOPs" to external units (RMU, CYS) for formal sign-off before proceeding to technical implementation.
