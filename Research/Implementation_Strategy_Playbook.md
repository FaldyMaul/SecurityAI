# Implementation Strategy Playbook: National AI Sandbox

## Overview

Based on extensive research of international implementations (including Singapore's IMDA Starter Kit, the EU AI Act pilots, and the Global AI Assurance Pilot), this playbook details the end-to-end framework for producing, building, and implementing a National AI Sandbox for DDP Telkom.

The strategy adopts a **"System-Level Reliability"** focus rather than just a **"Model-Level Safety"** approach, as recommended by the AI Verify Foundation (AIVF).

---

## 1. Core Operating Principles

1.  **Context-Specific Risk Thresholds**: 
    - *Lesson Learnt*: Universal baselines do not apply. The tolerance for hallucination in a health app differs significantly from an internal productivity chatbot.
    - *Action*: Segment Telkom’s AI capabilities into risk tiers (e.g., Critical, Moderate, Low).

2.  **Look Under the Hood (Component Testing)**:
    - *Lesson Learnt*: Testing just the end outputs is insufficient. Component testing helps diagnose failure points.
    - *Action*: Implement testing at the System Prompt level, Input/Output Filters, and External Knowledge Base (RAG) layers, in addition to end-to-end output testing.

3.  **Human-Calibrated "LLM-as-a-Judge"**:
    - *Lesson Learnt*: Automated testing is required for scale, but it must be calibrated by Human Subject Matter Experts (SMEs).
    - *Action*: Deploy LLMs to score test outputs, but maintain a human-in-the-loop review for sample edge cases.

---

## 2. The 3-Step Lifecycle (Produce, Build, Implement)

We adopt the structured approach recommended by IMDA guidelines for the AI Sandbox:

### Phase 1: IDENTIFY (Produce the Framework)
1. **Determine Key Risks**: Map the 5 core GenAI risks to Telkom's Apilogy modules:
    *   **Hallucination/Inaccuracy**: (e.g., Telkom LLM, RAG apps)
    *   **Bias in Decision Making**: (e.g., Age Estimator, CV Extractor)
    *   **Undesirable Content**: (e.g., Z Image, Chatbots)
    *   **Data Leakage**: (e.g., Terra AI ID Check - High PII Exposure)
    *   **Vulnerability to Adversarial Prompts**: (e.g., Text to SQL)
2. **Set Thresholds & Baselines**: Define the "passing mark" for each application before it can move from Sandbox to Production.
3. **Curate Test Data**: Source use-case specific historical data, generate synthetic data, and utilize red-teaming (adversarial) datasets.

### Phase 2: TEST (Build the Pipeline)
Build the automated testing pipeline utilizing open-source and commercial benchmarking tools.
1. **Component-Level Testing (White-Box)**:
    *   *Input Filters*: Test resilience to indirect prompt injections (e.g., embedded in uploaded documents).
    *   *System Prompts*: Test boundary enforcement (e.g., refusing to answer out-of-domain topics).
2. **Output-Level Testing (Black-Box)**:
    *   Run standardized benchmarking tools (e.g., **Garak** for vulnerabilities, **Promptfoo** for contextual accuracy).
    *   Conduct automated red-teaming (e.g., using **Lakera Red** or **PyRIT**).

### Phase 3: ASSESS (Implement the Governance)
1. **Analyze Results**: Review evaluating metrics across runs to ensure consistency. 
2. **Establish the "Assurance Dashboard"**: Aggregate the scoring of the 5 core risks into a unified compliance score (using tools like **AI Verify** or **Credo AI**).
3. **Determine Mitigation**: For failed areas, apply mitigations (e.g., refining system prompts, updating knowledge bases, or applying a strict output firewall like **Robust Intelligence**).

---

## 3. Technology Stack Recommendations

To build this Sandbox, Telkom DDP should provision:

*   **Red Teaming Engine**: Garak, PyRIT
*   **Safety & Governance Framework**: AI Verify Toolkit
*   **Evaluation & MLOps Engine**: Giskard / Promptfoo for continuous CI/CD integration.
*   **Data Generator (Synthetic Data)**: Utilizing a robust internal LLM (e.g., Qwen 3 30B) to generate diverse, synthetic, and adversarial test datasets.

*Next: See **Build_and_Evaluation_Guide.md** for technical specifics on executing these tests.*
