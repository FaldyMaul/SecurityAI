# AI Security Execution Roadmap & Strategy

## 1. Vision & Strategic Positioning
**"Security as the Enabler of Indonesia Emas 2045"**
*   **Core Philosophy**: AI security is not just cyber hygiene; it is **National System Assurance**.
*   **Positioning**: AI is Critical Information Infrastructure (CII), comparable to the telco core, power grid, and financial systems.
*   **Goal**: Digital Resilience = Security + Resilience + Public Trust.

## 2. The 5-Phase Execution Roadmap
This roadmap moves from infrastructure baselines to continuous assurance.

### 2.1. Phase 1: Infrastructure Hardening (AI Infra Security Baseline)
*   **Goal**: Secure the foundation (GPUs, K8s, Serving Stacks).
*   **Actions**:
    1.  Document current AI infrastructure & identify gaps.
    2.  Build "Telkom AI Infra Hardening Checklist" (mTLS, IAM, rootless containers).
    3.  Translate threat advisories (e.g., ShadowRay) into technical checks.
*   **Deliverable**: Technical Baseline (not just policy).

### 2.2. Phase 2: Secure Model & LLM Supply Chain
*   **Goal**: Trusted models only.
*   **Actions**:
    1.  Implement **LLM Admission Control** for Apilogy.
    2.  Strict allowlist for model formats (Safetensors/ONNX).
    3.  Provenance verification & License checks.
    4.  **Risk Tiering**: Public vs. Controlled vs. Sovereign models.
*   **Deliverable**: LLM Security Evaluation Checklist.

### 2.3. Phase 3: Product Guardrails (Mandatory Control)
*   **Goal**: Security controls, not UX features.
*   **Actions**:
    1.  **Architecture**: Standardize for TelkomGPT, AgentLab, and BUMN apps.
    2.  **Execution**:
        *   Custom scripts for low-latency.
        *   Python (LangGraph-style) for production control.
    3.  **Layers**:
        *   *Input*: Reject malicious prompts, Provide safe alternatives.
        *   *Output*: Validation & Tool allowlisting.
*   **Deliverable**: Telkom Guardrail Reference Architecture.

### 2.4. Phase 4: RAG & Data Governance
*   **Goal**: Prevent internal data abuse & ensure privacy.
*   **Actions**:
    1.  **Identity-Aware Retrieval**: RBAC must propagate to the vector DB.
    2.  No "AI Admin" shortcuts.
    3.  Data write-protection & Anti-indirect prompt injection.
*   **Deliverable**: RAG Security Playbook (mapped to UU PDP).

### 2.5. Phase 5: Continuous Red Teaming & Operations
*   **Goal**: Continuous assurance, not one-time testing.
*   **Actions**:
    1.  **Pipeline**: Automated probing (daily/weekly) + Manual scenario testing.
    2.  **Metrics**: Track Jailbreak rate, Hallucination rate.
    3.  **Feedback Loop**: Red Team findings immediately update Guardrails.
*   **Deliverable**: AI Security Monitoring Dashboard & Incident Response SOP.

---

## 3. Implementation Packages (Build vs. Adopt)

### 3.1. Package A: Control Plane & Secure Access
**"One Official Entry Point"**
*   **Scope**: AI Gateway, Policy Enforcement, Audit.
*   **Key Flow**: `User -> Gateway (Auth/Rate Limit) -> Policy -> Model`.
*   **Components**:
    *   **Adopt**: LiteLLM Proxy (Gateway/Budget), Envoy (Authz).
    *   **Build**: Telkom Risk Tiers, Apilogy Integration (Marketplace), Data Residency Enforcement.

### 3.2. Package B: Guardrails & RAG Governance
**"Safe Behavior & Controlled Data"**
*   **Scope**: Runtime safety, PII masking, RBAC for RAG.
*   **Key Flow**: `Input -> Guardrails (Injection Check) -> Model -> RAG (RBAC Check) -> Output Guardrails -> User`.
*   **Components**:
    *   **Adopt**: NeMo Guardrails, OWASP LLM Top 10 patterns, Vector DB security features.
    *   **Build**: Local language/cultural safety rules, Enterprise IAM integration, Komdigi alignment.

### 3.3. Package C: Continuous Testing & Assurance
**"Always Test, Always Monitor"**
*   **Scope**: Red Teaming, Monitoring, Incident Response.
*   **Key Flow**: `Automated Scan -> Manual Red Team -> Monitor (Datadog) -> Incident Response -> Fix/Harden`.
*   **Components**:
    *   **Adopt**: Garak (Scanner), PyRIT (Red Teaming), MITRE ATLAS (Taxonomy).
    *   **Build**: Custom attacks for local context, SOC/SIEM integration, Audit reporting.

---

## 4. Governance & Regulatory Frameworks

### 4.1. The Shift: Soft Law to Hard Law
*   **Soft Law**: NIST AI RMF, ISO 42001 (Voluntary standards).
*   **Hard Law**: EU AI Act (Mandatory compliance for high-risk).
*   **Telkom's Role**: Move from normative oversight to *execution cycles* (Design -> Deploy -> Monitor -> Correct).

### 4.2. Reference Standards
1.  **ISO/IEC 42001**: The "AI Management System" (Plan-Do-Check-Act for AI).
2.  **ISO/IEC 27090**: AI Security extensions to ISO 27001.
3.  **ISO/IEC 23894**: AI Risk Management methodology.
4.  **OWASP Top 10 for LLM**: De-facto standard for technical vulnerabilities.

### 4.3. National Contribution
*   Telkom acts as the **Implementation Partner** for Komdigi.
*   Providing reference architectures and shared testing practices to the BUMN ecosystem.
