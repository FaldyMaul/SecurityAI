# 3. Operational Roles & Responsibilities (PICs)

Technology alone cannot secure an AI application. The National AI Sandbox relies on a structured **Human-in-the-Loop (HITL)** model, divided into distinct operational squads with assigned Person-in-Charge (PIC) roles.

## 3.1 The Red Team (Offensive Squad)

The Red Team operates the Sandbox testing tools, acting as sophisticated adversaries against Telkom's AI products.

*   **Primary Responsibility**: To break the AI application before malicious actors do.
*   **Key Duties**:
    *   Design and execute complex, multi-turn prompt injection attacks (using tools like **PyRIT**).
    *   Attempt to extract proprietary data, PII, or the hidden System Prompt from the target model.
    *   Curate and update the adversarial "Attack Datasets" used by the automated pipeline (e.g., **Garak**).
    *   Identify entirely novel bypass techniques not yet caught by automated scanners.
*   **Target PIC Profile**: Cybersecurity specialists with a deep understanding of LLM vulnerability mechanics (e.g., understanding token limits, attention hijacking, and encoding bypasses).

## 3.2 The Blue Team (Defensive & Governance Squad)

The Blue Team receives the vulnerability reports from the Sandbox and must mitigate the findings before the product can be cleared for deployment.

*   **Primary Responsibility**: To secure the AI application, fix identified flaws, and ensure regulatory compliance.
*   **Key Duties**:
    *   Implement and tune "Input and Output Filters" (e.g., deploying an AI Firewall like Lakera Guard or Robust Intelligence).
    *   Rewrite and harden System Prompts to withstand the prompt injections discovered by the Red Team.
    *   Sanitize internal knowledge bases (RAG) to remove PII that caused Data Leakage failures.
    *   Generate the final compliance and governance reports using **AI Verify** for Executive and Government review.
*   **Target PIC Profile**: DDP Telkom AI Engineers, MLOps specialists, and GRC (Governance, Risk, and Compliance) officers.

## 3.3 The Subject Matter Experts (SMEs) - The Calibration Loop

While the Sandbox relies heavily on "LLM-as-a-judge" to evaluate thousands of tests automatically, human calibration is strictly required.

*   **Primary Responsibility**: To ensure the automated testing metrics align with human reality and domain-specific knowledge.
*   **Key Duties**:
    *   Blindly review a random 5% sample of the automated test results.
    *   If the automated LLM-Judge scored a response as "Accurate", but the SME knows it is factually incorrect (e.g., a hallucinated Telkom IndiHome policy), the SME overrides the score.
    *   Provide feedback to tune the grading prompt of the LLM-Judge.
*   **Target PIC Profile**: Non-technical domain experts (e.g., Telkom Legal counsel for legal chatbots, or Senior Customer Service Reps for support chatbots).

## 3.4 Workflow Handoff Example

1.  **Product Team** submits `Terra AI ID Check` v2 to the Sandbox.
2.  **Red Team (PIC)** initiates automated bias and data leakage scans via Giskard.
3.  *Result*: The scan reveals the model hallucinates on 15% of blurred ID cards.
4.  **Blue Team (PIC)** receives the report, identifies the failure in the RAG component, and implements a strict Confidence Threshold filter on the output.
5.  **Red Team (PIC)** re-runs the scan. *Result*: 0% hallucination. 
6.  **Blue Team (PIC)** generates the AI Verify report. The model passes to Production.

---
*Next Module: [4. Deployment and CI/CD Integration](./4_Deployment_and_CICD.md)*
