# 07 — QA: Security and Standard / Regulation Alignment

## 1. Objective
This document evaluates the alignment of the **SecurityAI / AI Sandbox** platform with international security standards and regulations, specifically focusing on the Frontend/UI implementation as an **Evidence and Assurance System**.

## 2. Executive Summary of Alignment
The platform is designed to provide **technical evidence** and **traceable assurance**. While the sandbox itself does not grant certification, it automates the "Measure" and "Verify" phases of major AI risk frameworks.

| Standard | Status | Core Evidence Source |
| :--- | :--- | :--- |
| **ISO/IEC 42001** | `Partial` | Lifecycle controls, V&V evidence, and risk recording. |
| **NIST AI RMF 1.0** | `Strong` | Primarily supports `MEASURE` and elements of `MANAGE`. |
| **OWASP LLM Top 10** | `Strong` | Direct technical testing via Garak, Moonshot, and PyRIT. |

---

## 3. Standard-Specific Alignment Analysis

### 3.1 ISO/IEC 42001 (AI Management System)
The platform aligns with the **A.6 AI System Life Cycle** and **A.5 Impact Assessment** controls by providing:
- **Immutable Audit Trails**: Every decision (Apprave, Restrict, Reassess) is captured in the `AuditTrailTimeline`.
- **Versioned Benchmarks**: Benchmark runs are linked to specific model versions, supporting A.6.2 (Verification and Validation).
- **Transparency**: High-fidelity scorecards and findings categories support A.8 (Information for Interested Parties).

**Frontend Compliance Check:**
- [x] **Traceability**: Decisions are linked to specific benchmark evidence.
- [x] **Accountability**: Actor names and timestamps are recorded for all status changes.
- [!] **Gap**: Formal "Impact Assessment" templates are not yet integrated into the UI.

### 3.2 NIST AI RMF 1.0 (Risk Management Framework)
The platform focuses on the **MEASURE** and **MANAGE** quadrants:
- **Measure 1 & 2**: Quantitative scores for Accuracy, Security, Privacy, and Safety.
- **Measure 3**: Tracking risk over time via "Benchmark History".
- **Manage 1**: Decision workflow allows human-in-the-loop to "Restrict" or "Approve with Controls" based on findings.

**Frontend Compliance Check:**
- [x] **Risk Communication**: Uses accessible color-coded severity indicators (excellent → critical).
- [x] **Context Awareness**: Model cards include "Intended Use Case" and "Suitability" tags (aligned with MAP quadrant).

### 3.3 OWASP Top 10 for LLM Applications
Directly addressed through the **Findings Accordion** which categories results based on vulnerability types:
- **LLM01: Prompt Injection** -> Tested via Garak/PyRIT.
- **LLM02: Insecure Output Handling** -> Visualized via evaluation findings.
- **LLM06: Sensitive Information Disclosure** -> Filtered via LLM Guard / Moonshot privacy packs.

---

## 4. UI/UX & Frontend Security Compliance Audit

### 4.1 Security Design Patterns
The following frontend components implement specific security/governance requirements:
- **`DecisionDrawer`**: Enforces accountability. Requires a mandatory "Reason" for any negative or conditional regulatory decision.
- **`PublicationToggle`**: Implements "Security by Default". Published status is a conscious separate step from assessment, preventing accidental exposure of unreviewed models.
- **`FindingsAccordion`**: Segregates raw technical artifacts (for engineers) from interpreted severity scores (for management).
- **`EvidencePanel`**: Provides the "Ground Truth" for any claim, allowing auditors to see the exact prompt/response pair causing a failure.

### 4.2 Data Protection and Privacy (PDP Alignment)
- **PII Masking**: The build plan specifies masking endpoint URLs and masking API keys in the UI after save.
- **Permission Guards**: Role-based access control (RBAC) is implemented via Next.js middleware, ensuring "Model Owners" only see their models, while "Admins" see the full review queue.

### 4.3 Accessibility (WCAG 2.1 AA)
- **Verified**: All color tokens and status badges have been audited for contrast (ratios ≥ 4.5:1).
- **Focus Management**: Modals and Drawers (DecisionDrawer) implement focus traps to ensure keyboard accessibility.

---

## 5. Regulatory Gaps & Recommendations

| Gap | Recommended Action | Standard Impact |
| :--- | :--- | :--- |
| **Impact Assessment** | Integrate a structured form for "Context and Impact" during model registration. | ISO A.5 / NIST MAP |
| **Supplier Assurance** | Add a supplier risk checklist for external (Azure/OpenAI) providers. | ISO A.10 |
| **Incident Reporting** | Add a workflow to report and track "In-Production" incidents post-publication. | ISO A.8 / NIST MANAGE |
| **Data Provenance** | Explicitly record training/fine-tuning dataset origins in the model metadata. | ISO A.7 |

## 6. Conclusion
The **SecurityAI Frontend** is highly compliant with the technical assurance requirements of ISO and NIST. It provides a robust "Evidence Hub" that balances the needs of developers (raw logs) and regulators (scorecards and audit trails). Expansion should focus on the "GOVERN" aspect through policy management modules.
