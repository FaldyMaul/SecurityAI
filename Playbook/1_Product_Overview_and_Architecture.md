# 1. Product Overview & Architecture

## 1.1 What is the National AI Sandbox?

The **National AI Sandbox** is a secure, controlled testing environment established by DDP Telkom. It serves as a mandatory gateway for all Generative AI (GenAI) models and applications before they are deployed into production, particularly those destined for public use or critical enterprise functions.

The Sandbox provides a verifiable, standardized process to assess AI models against five core risks:
1.  **Hallucination & Inaccuracy**
2.  **Bias in Decision Making**
3.  **Undesirable Content Generation**
4.  **Data Leakage (PII)**
5.  **Vulnerability to Adversarial Prompts (Jailbreaks)**

By moving from a ad-hoc "Model-Level Safety" testing approach to a structured **"System-Level Reliability"** framework, the Sandbox ensures Telkom's AI products are robust, ethical, and compliant with emerging national and international regulations (like the EU AI Act and Singapore's IMDA guidelines).

## 1.2 Target Audience & Stakeholders

The Sandbox outputs and compliance reports are designed for three primary audiences:

1.  **Government & Regulators (e.g., KOMINFO, BSSN)**:
    *   *Purpose*: Can view transparent, standardized reports (e.g., generated via AI Verify) demonstrating that Telkom's public-facing AI (like Terra AI ID Check) is safe, unbiased, and protects citizen data.
2.  **Telkom Executive Management & Legal**:
    *   *Purpose*: Receives high-level Assurance Dashboards detailing the risk posture of the entire AI portfolio, enabling informed decisions on market releases and liability management.
3.  **DDP Telkom Engineering & Product Teams**:
    *   *Purpose*: Utilizes the granular, technical breakdown of failed tests to debug specific components (like RAG pipelines or System Prompts) before launch.

## 1.3 High-Level Architecture

The AI Sandbox operates as a continuous evaluation pipeline integrated directly into Telkom’s existing infrastructure (Apilogy). 

### The Core Loop

1.  **Model Intake (Apilogy Marketplace)**: A new model version (e.g., Qwen 3 30B) or a new application endpoint is registered for testing.
2.  **The Testing Engine (The Sandbox Core)**:
    *   *Adversarial Simulation*: The target model is bombarded with automated prompt injections (via **Garak** or **PyRIT**).
    *   *Functional Benchmarking*: The model is tested against Telkom’s internal "Golden Datasets" to measure accuracy and context retention (via **Promptfoo**).
    *   *Safety & Bias Scanning*: The model's outputs are analyzed for toxicity, bias, and PII leakage (via **Giskard**).
3.  **The Governance Layer**:
    *   Test results are aggregated and scored.
    *   **AI Verify** (or a similar GRC platform like Credo AI) translates these raw technical scores into a standardized compliance report.
4.  **The Assurance Dashboard**:
    *   Results are visualized (e.g., via **Datadog**) showing a clear "Pass/Fail" for the deployment candidate based on predefined risk thresholds.

---
*Next Module: [2. Implementation and Testing Framework](./2_Implementation_and_Testing_Framework.md)*
