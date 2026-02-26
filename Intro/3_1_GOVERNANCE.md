# Governance & Standardization

## 1. AI Ethics & Compliance
*   **Objective**: Ensure compliance with Personal Data Protection Law (PDP Law) and National AI Ethics Guidelines.
*   **Key Principles**:
    1.  **Transparency**: Users must know they are interacting with AI.
    2.  **Fairness**: Models must be tested for bias.
    3.  **Accountability**: Clear ownership of AI risks.
    4.  **Privacy**: Strict adherence to data minimization and protection.

## 2. Operational SOPs (Standard Operating Procedures)

### 2.1. SOP: AI Misuse and Incident Response
*   **Owner**: Blue Team (Ardy, Danar, Tyo, Fajar)
*   **Format**: Microsoft Word Online

#### 2.1.1. Draft Outline
1.  **Detection**: How an alert is triggered (e.g., Datadog high severity alert for "Prompt Injection Detected").
2.  **Triage**: Who analyzes the alert (L1 Analyst vs. Security Engineer).
3.  **Containment**: Steps to block the user or disable the specific AI model capability via Apilogy.
4.  **Eradication**: Tuning the guardrails to prevent recurrence.
5.  **Recovery**: Restoring service and notifying stakeholders.
6.  **Post-Mortem**: Documenting lessons learned.

## 3. Red Teaming Framework

### 3.1. AI Red Teaming Pipeline
*   **Owner**: Red Team (Dicky, Syarif, Wawan)
*   **Tools**: Custom Scripts, Open Source AI Red Teaming tools (e.g., Garak, PyRIT - *for future consideration*).

#### 3.1.1. Workflow
1.  **Scenario Design**: Create specific attack scenarios (Backlog items #6, #7, #8).
    *   *Example*: Attempt to extract PII from the RAG system.
    *   *Example*: Bypass content filters to generate toxic images.
2.  **Execution**: Run tests against the staging environment.
3.  **Reporting**: Dashboard visualization of successful vs. blocked attacks.
4.  **Remediation**: Feedback loop to Blue Team to update Guardrails.

### 3.2. Deliverables
*   [ ] Red Teaming SOP (Word Online)
*   [ ] Vulnerability Dashboard
