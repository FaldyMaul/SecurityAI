# National AI Sandbox: Master Playbook

## Executive Summary
This Master Playbook defines the end-to-end framework, architecture, and operational model for the National AI Sandbox at DDP Telkom. It serves as the definitive reference for Government stakeholders, Telkom Management, and technical implementation teams. 

The Sandbox is designed to systematically evaluate AI products (like Telkom LLM, Terra AI ID Check) for security, bias, and compliance before they are released to the public or integrated into critical national infrastructure.

## Table of Contents

The Playbook is divided into specific, detailed modules located in this directory:

### 1. [Product Overview & Architecture](./1_Product_Overview_and_Architecture.md)
*   **What is the AI Sandbox?** Definition, goals, and strategic value for National infrastructure.
*   **Target Audience**: How Telkom, Government regulators, and third-party auditors interact with the Sandbox.
*   **High-Level Architecture**: The technical flow from Model Intake -> Testing Pipeline -> Assurance Dashboard.

### 2. [Implementation & Testing Framework](./2_Implementation_and_Testing_Framework.md)
*   **The 3-Step Lifecycle**: Identify, Test, Assess.
*   **Core Benchmarks**: The exact tools used (e.g., Garak, Giskard, PyRIT, AI Verify).
*   **Component vs. Output Testing**: Deep dive into testing System Prompts, RAG Knowledge Bases, and Input/Output filters.

### 3. [Operational Roles & Responsibilities (PICs)](./3_Operational_Roles_and_Responsibilities.md)
*   **The Human-in-the-Loop (HITL) Model**.
*   **Red Team (Offensive)**: Responsibilities, PICs, and adversarial simulation duties.
*   **Blue Team (Defensive/Governance)**: Responsibilities, PICs, and mitigation strategies.
*   **SME Escalation Paths**: How domain experts calibrate automated LLM-Judges.

### 4. [Deployment & CI/CD Integration](./4_Deployment_and_CICD.md)
*   **Automated Pipeline integration**: Triggering sandbox tests on weight updates or prompt changes.
*   **Infrastructure Requirements**: Compute, API gateways, and logging (e.g., MLflow, Datadog).

### 5. [Apilogy Model Assessment & Infrastructure Setup](./5_Apilogy_Assessment_and_Infrastructure.md)
*   **Reference Standards**: NIST AI RMF, OWASP Top 10 for LLMs, ISO/IEC 42001.
*   **Assessment of Telkom Models**: Detailed Sandbox assessment plan for models on Apilogy (e.g., Qwen 3, Whisper V3, Terra AI).
*   **The AI Playground**: Using Telkom's Agentlab (Flowise OSS) for rapid Sandbox prototyping.
*   **Performance & Infra Testing**: Requirements for Load Testing, Response Time (Latency), and GPU utilization.

### 6. [Project Output & Implementation Plan](./6_Project_Output_and_Implementation_Plan.md)
*   **Outputs by Layer**: Defining the Sandbox as a Standard (Foundation), Platform (Engine), and Dashboard (Deliverable).
*   **Detailed Implementation Phases**:
    *   [Phase 1: Foundation & Governance](./Implementation_Plan/Phase_1_Foundation.md)
    *   [Phase 2: Core Platform Setup](./Implementation_Plan/Phase_2_Platform_Setup.md)
    *   [Phase 3: Pilot Assessment](./Implementation_Plan/Phase_3_Pilot_Assessment.md)
    *   [Phase 4: Dashboard Integration](./Implementation_Plan/Phase_4_Dashboard_Integration.md)
    *   [Phase 5: CI/CD Scaling](./Implementation_Plan/Phase_5_CICD_Scaling.md)

---
*Prepared by DDP Telkom Security AI Team - 2026*
