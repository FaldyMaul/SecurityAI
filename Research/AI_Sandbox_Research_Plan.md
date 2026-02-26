## 1. International Implementations of National AI Sandboxes

Research into global implementations shows several mature models for a National AI Sandbox:

| Country | Key Focus | Sandbox Mechanism |
| :--- | :--- | :--- |
| **Spain (EU Pilot)** | EU AI Act Compliance | Selection -> High-Risk System Testing -> Supervisory Support -> Compliance Certification. |
| **Singapore** | Trusted AI Ecosystem | **AI Verify** toolkit integration. Focuses on fairness, explainability, and public accountability. |
| **United Kingdom** | Pro-Innovation Growth | Sector-based (Finance, Health). Live testing with temporarily relaxed regulations. |
| **Norway (DPA)** | Privacy by Design | 1-on-1 regulatory guidance for AI startups to ensure GDPR compliance from day one. |

## 2. Assessment of DDP Telkom AI Capabilities (Apilogy Marketplace)

Based on the **AI Capability List PAM 2026** (19-02-26), here is the assessment of key models and OSS instances stored on **Apilogy**:

| Capability Name | Model Instance (OSS/Managed) | Critical Risks | Assessment Focus |
| :--- | :--- | :--- | :--- |
| **Telkom LLM** | Qwen 3 (30B, 4B), GPT-5 | System Prompt Leakage, Prompt Injection | Red Teaming (Garak) |
| **Terra AI ID Check** | Qwen 3 VL, 30B | **High PII Exposure**, Data Leakage | Privacy Audit (AI Verify) |
| **Any CV Extractor** | Qwen 3 30B | **High PII Exposure**, Sensitive Disclosure | Data Privacy Scan (Giskard) |
| **Age Estimator** | MiVolo d1 | **Face Biometry**, Algorithmic Bias | Bias/Fairness (AI Verify) |
| **Speech to Text** | Whisper V3 Large | PII Disclosure in Transcript | PII Extraction Test |
| **Object Detection** | YOLO V9 | False Positives, Detection Evasion | Robustness (ART) |
| **Text to Image** | Z Image | Harmful Content Generation | Safety Benchmark (Giskard) |
| **Text to SQL** | Qwen 3 30B | SQL Injection via LLM, Database Breach | Injection Probing (Promptfoo) |

### Key Observations from Capability List:
*   **Heavy Reliance on Qwen 3 Series**: Most LLM-based tools (Chatbots, Summarizers, Extractors) use Qwen 3 30B or VL-8B. Securing this specific model family is a top priority for the sandbox.
*   **PII Hotspots**: Services like "ID Check", "CV Extractor", and "Age Estimator" handle sensitive biometric and personal data. These must be the first candidates for the **Privacy & Data Leakage** module of the sandbox.
*   **On-Prem Deployment**: Most models are deployed On-Prem, allowing for deeper infrastructure-level security monitoring beyond API guardrails.

## 3. End-to-End AI Security Product Lifecycle

True end-to-end products (like **HiddenLayer**, **Lakera**, or **Robust Intelligence**) demonstrate a 5-stage lifecycle that Telkom should adopt:

1.  **Discovery**: Automatic inventory of models (detecting "Shadow AI").
2.  **Red Teaming**: Continuous automated adversarial stress-testing (using tools like **Garak**).
3.  **Governance**: Validating against ethics and bias benchmarks (using **AI Verify**).
4.  **Runtime Guardrails**: Real-time filtering of inputs/outputs using an **AI Firewall**.
5.  **Assurance Reporting**: Automated compliance documentation for stakeholders.

### Assessment Methodology:
1. **Red Teaming (Offensive)**:
    *   Use **Garak** for automated probes of 400+ vulnerabilities.
    *   Use **PyRIT** for adaptive, multi-turn adversarial simulations.
2. **Safety & Quality Scanning (Functional)**:
    *   Apply **Giskard** to detect hallucinations and toxic generation in RAG pipelines.
    *   Use **Promptfoo** to benchmark model performance against customer-specific "Golden Datasets".
3. **Governance & Compliance**:
    *   Execute **AI Verify** toolkit for objective process checks and accountability logs.
    *   Map findings to **OWASP Top 10 for LLM** for executive reporting.

## 2. Recommended Benchmarking Tools

We recommend the following tools for the National AI Sandbox:

### 2.1. Offensive & Vulnerability Scanning
*   **[Garak](https://garak.ai)**: An LLM vulnerability scanner (inspired by Nmap/Metasploit). Good for testing prompt injection and data leakage.
*   **[PyRIT](https://github.com/microsoft/pyrit)**: Microsoft's AI Red Teaming toolkit. Automates multi-turn attacks and complex threat scenarios.

### 2.2. Functional & Safety Testing
*   **[Giskard](https://giskard.ai)**: Scans models for hallucinations, bias, and performance issues. Includes "Phare" benchmark for safety.
*   **[Promptfoo](https://promptfoo.dev)**: Focuses on application-level testing. Great for evaluating prompts and outputs against custom benchmarks.

### 2.3. Governance & Trusted AI
*   **[AI Verify](https://aiverifyfoundation.sg/)**: Singapore's open-source testing framework. Excellent for transparency and accountability documentation.

## 3. Proposed Sandbox Architecture

A "National AI Sandbox" for Telkom should integrate these tools into a unified pipeline:

1.  **Secure Gateway (Apilogy)**: Centralized entry point for all DDP AI models. Implements rate limiting and base guardrails.
2.  **Automated Testing Pipeline**:
    *   CI/CD integration for Giskard scans.
    *   Scheduled Red Teaming rounds using Garak.
3.  **Assurance Dashboard (Datadog/Custom)**:
    *   Real-time monitoring of "Unsafe Behavior" events.
    *   Compliance scoring based on AI Verify results.

## 4. Next Steps

1.  **Pilot Test**: Run Garak and Giskard against a non-production instance of BigBox AI.
2.  **Baseline Definition**: Document the "Telkom AI Security Baseline v0.1" (as planned in `1_1_PROJECT_PLAN.md`).
3.  **Red Team Scenario Design**: Map OWASP Top 10 for LLM to specific DDP test cases.

## Verification Plan

### Automated Verification
*   **Garak Run**: Execute `python -m garak --model_type openai --model_name gpt-3.5-turbo` (example) to verify scanning capability.
*   **Giskard Scan**: Integrate `giskard_hub` with a sample DDP model to generate a report.

### Manual Verification
*   **Stakeholder Review**: Review this plan with Hadi (Security Manager) and FAN (Sr Manager).
*   **Playbook Validation**: Verify that the tools generate actionable data for the "AI Incident Response SOP".
