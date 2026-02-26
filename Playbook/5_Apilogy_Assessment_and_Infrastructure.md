# 5. Apilogy Model Assessment & Infrastructure Setup

## 5.1 Reference Standards & Benchmarks

The National AI Sandbox does not invent security standards from scratch. We map our testing methodologies to globally recognized regimes to ensure Telkom products are enterprise-ready and internationally compliant:

1.  **NIST AI Risk Management Framework (AI RMF)**: Guides our 3-step lifecycle (Identify, Test, Assess) and taxonomy.
2.  **OWASP Top 10 for LLMs (v1.1)**: The primary benchmark checklist for the **Red Team**, covering Prompt Injection (LLM01), Data Leakage (LLM06), and Insecure Plugin Design (LLM07).
3.  **ISO/IEC 42001 (AI Management System)**: The overarching governance standard for the **Blue Team** to produce compliance documentation.
4.  **Singapore IMDA Starter Kit v1.0**: Specifically used for evaluating baseline Safety & Reliability.

## 5.2 Comprehensive Assessment of Telkom AI Capabilities (Apilogy)

All models currently listed in the **Apilogy Marketplace (PAM 2026)** must pass through the Sandbox. To manage this at scale, capabilities are consolidated into a single assessment matrix.

The table below is ranked from strictly most critical (Priority 1 with high PII exposure) to least critical, grouped by module category as mandated by the Sandbox Governance structure:

| Rank | Capability Name | Category | Priority | Underlying Model | PII Risk | Key Sandbox Test Focus |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Any CV Extractor** | LLM | **Priority 1** | Qwen 3 30B | **High** (Resume Processing) | Data Leakage (Presidio), Bias & Fairness. |
| **2** | **Terra AI ID Check** | LMM | **Priority 1** | Qwen 3 VL 8B, Qwen 3 30B | **High** (ID Card extraction) | PII Output Leakage, OCR Hallucination. |
| **3** | **Telkom LLM** | LLM | **Priority 1** | Qwen 3 (30B, 4B), GPT-5 | Low | Prompt Injection (Garak), Context Accuracy. |
| **4** | **Large MultiModal** | LMM | **Priority 1** | Qwen 3 VL 8B, Nanonets | Mod | Visual Adversarial inputs, Safe Content filtering. |
| **5** | **OCR Free Form** | LMM | **Priority 1** | Qwen 3 VL 8B, Qwen 30B | Mod | Visual Adversarial inputs, Hallucination mapping. |
| **6** | **Text to SQL** | LLM | **Priority 1** | Qwen 3 30B | Low | AppSec: SQL Injection via Prompt Injection. |
| **7** | **Chatbots (DCS, Wins, SDD, Emporium)**| LLM | **Priority 1** | Qwen 3 30B | Low | Domain Accuracy (Promptfoo), System Prompt breaking. |
| **8** | **App Endpoints (Summarize, Pijar, LKPP)**| LLM | **Priority 1** | Qwen 3 30B | Low | Functionality and robustness under load. |
| **9** | **Text to image** | Text-to-Image| **Priority 2** | Z Image | Low | NSFW Image generation, Copyright infringement tests. |
| **10** | **Speech to text** | STT | Priority 3 | Whisper V3 Large | **High** | Accidental PII transcription, Audio injections. |
| **11** | **Text to Speech** | TTS | Priority 3 | Custom Model | Low | Deepfake prevention, Harassment audio generation. |
| **12** | **Text Embedding** | Embedding | Priority 3 | Nomic Embed V2 | Low | Reversibility of Vector data to plaintext. |
| **13** | **Age Estimator** | Trad. CV | Priority 4 | MiVolo d1 | **High** (Biometric) | Algorithmic Bias & Fairness (AI Verify). |
| **14** | **Face Embedding** | Trad. CV | Priority 4 | FaceNet | **High** (Biometric) | Reversibility of facial vectors. |
| **15** | **OCR Document** | Trad. CV | Priority 4 | PaddleOCR v5 | Mod | Robustness on degraded PDFs. |
| **16** | **Object Detection** | Trad. CV | Priority 4 | YOLO V9 | Mod | False positive testing via synthetic noise. |

*Note: Models flagged with **High PII Risk** (e.g., CV Extractor, Terra AI, STT, Age/Face Estimators) require mandatory sign-off from the Data Privacy Officer (DPO) in addition to Blue/Red Team approval before deployment.*

## 5.3 The AI Playground: Agentlab (Flowise OSS)

Before rigorous automated testing is deployed, developers and the **Red Team** need a space to rapidly prototype LLM architectures and test prompt variations.

*   **Tool**: **Agentlab** (Telkom's internal deployment of **Flowise OSS**).
*   **Role in Sandbox**: Agentlab acts as the "Pre-Sandbox Prototyping Playground."
*   **Process**:
    1.  Developers construct RAG pipelines (Chains) visually in Agentlab.
    2.  The Red Team logs into Agentlab and performs **Manual Red Teaming** (Interactive testing) directly on the visual nodes to see where protections fail.
    3.  Once the Agentlab flow is deemed conceptually secure, it is committed to code and enters the CI/CD Automated Testing Pipeline described in Module 4.

## 5.4 Performance & Infrastructure Testing

Security validation is only half the battle. A model is not "Reliable" (per IMDA guidelines) if it crashes under load. Alongside functional security testing, the Sandbox enforces Infrastructure & Performance tests:

### 1. Response Time & Latency Testing
*   LLMs are notoriously slow. The Sandbox must enforce an SLA (Service Level Agreement) for Time-to-First-Token (TTFT) and Total Response Time.
*   **Requirement**: Load testing tools (e.g., Apache JMeter or K6) will bombard the Apilogy endpoint. If Latency exceeds the defined threshold (e.g., > 2000ms for Chatbots), the build fails.

### 2. GPU Utilization & Concurrency
*   AI models on Apilogy are deployed On-Prem. We must ensure they do not causes resource exhaustion (Denial of Service).
*   **Requirement**: The Sandbox will simulate 100+ concurrent requests. Systems must demonstrate proper request queuing without causing GPU Out-Of-Memory (OOM) fatal errors.

### 3. Rate Limiting Tests
*   **Requirement**: The Red Team will intentionally attempt to overwhelm the API to ensure Apilogy's API Gateway correctly rate-limits malicious rapid-fire requests, protecting backend GPU clusters.
