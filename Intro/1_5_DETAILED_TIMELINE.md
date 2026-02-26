# Detailed Timeline & Implementation Plan

This document outlines the detailed implementation timeline for the AI Security & Assurance initiatives, mapped across specific monthly milestones and categorized by capability groups.

## 1. Categorization of Activities

To ensure clear ownership and focused execution, activities are grouped into the following categories:
*   **Governance & Policy**: Defining rules, classifications, access controls, and leakage scenarios.
*   **Infrastructure Security (Infra Sec)**: Securing the underlying networks, APIs, and hosting environments.
*   **AI Security (AI Sec) / Runtime Guardrails**: Implementing input/output protection, prompt injection defense, and behavior rules.
*   **Architecture & Engineering (Eng)**: Integrating controls into gateways (e.g., Apilogy) and establishing secure patterns.
*   **Defensive Security (Blue Team)**: Detection engineering, logging, alerting, dashboards, and incident response.
*   **Offensive Security (Red Team)**: Adversarial simulation, scenario design, and vulnerability identification based on OWASP Top 10.

---

## 2. Implementation Timeline

### 📅 Current (February) - Foundation & Discovery
**Focus:** Establish baselines, classify data, and map the attack surface.

| Category | Initiative / Task |
| :--- | :--- |
| **Governance** | **Classify Data Sensitivity Level (#1)**<br>Define Public/Internal/Confidential levels and map AI use cases. |
| **Governance** | **Define Data Leakage Scenarios (#5)**<br>Document RAG leakage, model memorization, and mitigations. |
| **Infra Sec** | **Identify Internal vs External Exposure (#2)**<br>Inventory all AI APIs, map DNS/Firewall exposure, assign risk ratings. |
| **Architecture** | **Baseline Architecture Review (TBD)**<br>Review current deployment against "Telkom AI Infra Hardening" checklist. |

### 📅 Step 1 (March) - Runtime Guardrails & Control Plane
**Focus:** Implement active protection mechanisms (Gateway, Input/Output barriers).

| Category | Initiative / Task |
| :--- | :--- |
| **AI Sec** | **Define Unsafe AI Behavior (#3)**<br>Categorize ethical/legal violations and define detection thresholds. |
| **AI Sec** | **Define Prompt Injection Patterns (#4)**<br>Build regex/keyword libraries for injection detection. |
| **Eng** | **Apilogy Gateway Integration (TBD)**<br>Implement centralized auth, rate limiting, and traffic routing for AI models. |
| **Blue Team** | **Detection & Response Capability #1 (#9)**<br>Map OWASP Top 10 to preventive controls and detection rules. |

### 📅 Step 2 (April) - Secure RAG & Advanced Defense
**Focus:** Deepen security for retrieval systems and specific LLM attack vectors.

| Category | Initiative / Task |
| :--- | :--- |
| **Red Team** | **Security Scenario Design #1 (#6)**<br>Simulate Prompt Injection, Sensitive Info Disclosure, Supply Chain attacks. |
| **Red Team** | **Security Scenario Design #2 (#7)**<br>Simulate Improper Output Handling, Excessive Agency, System Prompt Leakage. |
| **Governance** | **RAG Role-Based Access Control (RBAC) (TBD)**<br>Enforce strict document-level access control in Vector DB. |
| **Blue Team** | **Detection & Response Capability #2 (#10)**<br>Implement log schemas and detection rules for RAG-specific attacks. |

### 📅 Step 3 (May) - Operational Execution & Monitoring
**Focus:** Establish continuous monitoring, routing, and adversarial follow-ups.

| Category | Initiative / Task |
| :--- | :--- |
| **Red Team** | **Security Scenario Design #3 (#8)**<br>Simulate Misinformation and Unbounded Consumption (DoS) attacks. |
| **Blue Team** | **Detection & Response Capability #3 (#11)**<br>Finalize Severity Mapping and Alert Routing strategy. |
| **Blue Team/Eng** | **AI Security Dashboard Launch (TBD)**<br>Launch Datadog dashboard for real-time AI security metrics. |

### 📅 Step 4 (June) - Incident Response & Maturation
**Focus:** Validate response capabilities and operationalize playbooks.

| Category | Initiative / Task |
| :--- | :--- |
| **Blue Team** | **Detection & Response Capability #4 (#12)**<br>Draft, refine, and validate AI Incident Response SOPs/Playbooks via Tabletop Exercises. |

### 🚀 Future (Scope-Based Backlog)
**Focus:** Long-term strategic improvements and standardization.

| Category | Initiative / Task |
| :--- | :--- |
| **Eng / Arch** | **Control Plane Evolution**<br>Design API Gateway Architecture specifically for AI Models; Configure centralized logging for AI Model access. |
| **AI Sec** | **Runtime Guardrails Hardening**<br>Implement automated Output Filtering for PII/Data Leakage; Develop "Circuit Breaker" for unsafe AI responses. |
| **Governance** | **Secure RAG Audits**<br>Routine audits of RAG query logs; refinement of Document-Level Access Control. |
| **Governance** | **Standardization**<br>Draft AI Security Baseline v0.1; Review Baseline with External Units (RMU, CYS); Finalize AI Ethics Guidelines. |
| **Blue Team** | **Continuous Response Maturation**<br>Draft advanced Operational SOPs for AI Misuse; Set up broader Datadog Dashboards for integrated AI metrics. |
