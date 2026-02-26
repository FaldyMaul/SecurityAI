# Project Name: Security for AI

## 1. Project Overview
*   **Background**: Telkom Indonesia, Digital Product Division (DDP), Unit Platform Engineering & Next Gen Capability (PAM).
*   **Context**: The unit checks security, AI, and infrastructure for developing new AI models, research, monitoring infra, maintaining security, and standardization.
*   **Initial Situation**: Implementation of guardrails for Image generation is in progress.

## 2. Goals & Objectives
The primary goal is to implement security controls, data protection, and governance models for AI services to ensure compliance with the Personal Data Protection Law and national AI ethics guidelines.

### 2.1. Specific Objectives
1.  **Secure Control Plane**: Secure access to AI models and APIs through a single control plane.
2.  **Runtime Guardrails**: Prevent unsafe AI behavior and data leakage in real-time.
3.  **Secure RAG**: Implement Role-Based Access Control (RBAC) for RAG data access.
4.  **Continuous Security**: Establish continuous AI security testing, monitoring, and incident response.
5.  **Practical Implementation**: Focus on practical tools and implementation, not just policy documentation.

## 3. Team Structure

### 3.1. Management
*   **Supervisor (Security Manager)**: Hadi
*   **Supervisor (Security & AI Senior Manager)**: FAN

### 3.2. Core Team
*   **PM & Data/AI Team**: Faldy
*   **Scrum Master**: Edo
*   **AI Engineers**: Dhiaul, Jabbar
*   **Infrastructure**: Beno

### 3.3. Security Engineers
*   **Blue Team**: Ardy, Danar, Tyo, Fajar
*   **Red Team**: Dicky, Syarif, Wawan

## 4. Scope & Deliverables

### 4.1. Scope
1.  Secure access (Control Plane)
2.  Runtime Guardrails
3.  Secure RAG (RBAC)
4.  Continuous Testing & Monitoring
5.  Practical SOPs & Tools

### 4.2. Deliverables
*   [ ] **Reference Architecture Diagrams** (High Level)
*   [ ] **Operational SOPs** for AI Misuse and Incidents (Word Online)
*   [ ] **AI Security Baseline Document v0.1** (Word Online)
*   [ ] **AI Control Plane & Gateway Reference Implementation** (Apilogy, Datadog)
*   [ ] **AI Red Teaming Pipeline, Dashboard, and SOP** (Word Online)
*   [ ] **AI Guardrails Tools Development** (Apilogy)
*   [ ] **RAG Security Guidance / RBAC Tools** (Spreadsheet)

## 5. Risk Management
1.  **Regulatory Uncertainty**: No regulation of AI Ethics/Security for AI released yet.
2.  **Resource Availability**: Lack of available resources.
3.  **External Dependencies**: Need to consult with External Units (RMU, CYS, etc.).
4.  **Government Initiatives**: Initiative to support government as telco company for national AI sandbox (High visibility/pressure).

## 6. Timeline & Milestones
*(To be determined based on sprint capacity)*
*   **Sprint 1-2 Focus**: Data sensitivity, Exposure identification, Unsafe behavior definitions, Red/Blue team scenario design.

## 7. Acceptance Criteria
*   **Produced 3 Playbooks/Guidelines**:
    1.  AI Security Baseline
    2.  Operational SOPs for AI Misuse
    3.  AI Red Teaming Pipeline & SOP
*   **Produced 2 Integrations/Tools**:
    1.  Apilogy Integration for Datadog (Control Plane & Gateway)
    2.  AI Guardrails Tools Development
