# National AI Sandbox: Full Architecture & End-to-End Flow

This document details the complete, end-to-end technical architecture and operational flow of the National AI Sandbox. 

Based on the strict requirement for **100% Free Open-Source Software (OSS)** without enterprise feature-gates, and the need for **seamless integration**, the Sandbox adopts a **Unified Python Stack**. This allows all security, privacy, and evaluation tools to run in a single, cohesive ecosystem without language fragmentation.

---

## 1. The Full End-to-End Sandbox Flow

The AI Sandbox operates as a rigorous, automated pipeline. When a new AI model or application is proposed for production, it must successfully navigate this flow:

### Flow Phase 1: Intake & Sandbox Provisioning
1.  **AI Prototyping**: Developers use the fixed **AgentLab (Flowise OSS)** to construct the RAG pipeline or AI agent visually.
2.  **Environment Spin-up**: The Sandbox provisions an isolated testing environment (Docker).
3.  **Gateway Configuration**: **LiteLLM** (Python) connects to the target model's API via **Telkom Apilogy** and establishes a proxy and cost-tracking budget for the upcoming tests.

### Persona 1: The AI Engineer (Model/Infrastructure Owner)
*   **Goal**: Deploys raw models (e.g., Qwen 30B) to the Apilogy marketplace and needs to ensure they are robust against adversarial attacks.
*   **Workflow**:
    1.  The Engineer logs into the **National Sandbox Portal (Custom UI)** and registers the new Qwen 30B endpoint URL and its API Key. The Portal securely stores the key in a backend **Secrets Vault**.
    2.  They click "Initiate Baseline Scan", which automatically triggers the CI/CD pipeline. The pipeline pulls the API key from the Vault and uses it to barrage the model with **Garak** (OWASP vulnerabilities) and **DeepEval** (accuracy tests).
    3.  When the test finishes, they view the high-level Pass/Fail scores on the Portal. If the model fails a specific prompt injection, the Engineer opens the **Developer Trace Viewer (e.g., Phoenix)** to debug the exact raw traces and payload strings.

### Persona 2: The Product Manager (App Builder)
*   **Goal**: Builds an AI feature (e.g., an HR Chatbot using Flowise) and wants to get it certified for production release without understanding deep code.
*   **Workflow**:
    1.  The Product Manager submits their Flowise agent **Endpoint URL** and any required **Auth Headers/Tokens** to the Sandbox Portal.
    2.  The automated pipeline encrypts the tokens, injects them into the Python test suite environment, and runs the evaluation in the background exactly as an authenticated user would.
    3.  The PM logs into the **National Sandbox Portal (Custom UI)**. They do not see raw JSON logs; they see a simple dashboard with Dial Scores: *Contextual Relevancy: 95%, Hallucination Rate: 2%, OWASP Compliance: Pass*.
    4.  If the scores meet the minimum threshold, they click "Request Certification".

### Flow Phase 2: The Core Python Testing Pipeline
Because all testing tools are Python-based, they are orchestrated via a single cohesive script (e.g., using `pytest` natively).

1.  **Fast Regression (Accuracy)**: **DeepEval** (Python) executes a suite of tests against a "Golden Dataset," scoring Exact Match, Answer Relevancy, and hallucination rates via LLM-as-a-judge.
2.  **Deep Safety Scan (Bias & Ethics)**: If DeepEval passes, the **Giskard** (Python library) scanner automatically generates perturbated inputs to test for demographic bias and toxicity.
3.  **Adversarial Vulnerability Scan (Security)**: Next, **Garak** (Python) fires a barrage of known jailbreaks and prompt injections. 
4.  **Advanced Red-Teaming (Optional / High-Risk)**: For critical models, **PyRIT** (Python) simulates a multi-turn, intelligent attacker LLM to dynamically trick the target model.
5.  **Runtime Privacy Checks**: Throughout all inference, **LLM Guard** (Python) sits actively in the middle, scanning every input/output for leaked PII data and blocking live injections.

### Flow Phase 3: Observability, Mitigation & Reporting
1.  **Developer Observability (Optional)**: OpenTelemetry traces from DeepEval, LiteLLM, and LLM Guard can be streamed locally into **Arize Phoenix** strictly for AI Engineers to debug failed prompts at the code level.
2.  **Sandbox Web Portal**: The test suite outputs a final JSON result. Product Managers log into the **Custom Sandbox Portal (Vue/React)** to view a clean, high-level dashboard of their Agent's Pass/Fail metrics (Accuracy, Bias, OWASP).
3.  **Governance Reporting**: Once the model passes, a button on the Custom Portal triggers a CI/CD script that converts the JSON metrics into a standardized, static PDF report for Management audits. 

---

## 2. The Complete Stack Layer Architecture

To support the flow above, the architecture is specialized into layers. This strictly delineates the **Sandbox Testing Tools** (Layer 4/5) from the **Monitoring UI** (Layer 6) and the **Reporting** (Layer 7).

| Layer | Component Role | Selected Tool | Rationale for Integration & OSS Reality |
| :--- | :--- | :--- | :--- |
| **Layer 7: Reporting** | Static Compliance Output | **Pipeline PDF Generator** | *Replaces AI Verify.* A simple Python/CI script that converts the test outputs into a Management-ready PDF. Eliminates the need for buggy, low-adoption UI portals. |
| **Layer 6: Master UI Hub** | Governance Dashboard | **Custom Sandbox Portal (Vue/React)** | *Replaces forcing generic Observability tools.* There is no single OSS tool that perfectly combines DeepEval accuracy and Garak security into a non-technical management dashboard. Building a lightweight custom frontend to read the testing JSON is the only way to achieve exactly what the PM and Management personas need. |
| **Layer 5: Core Testing Engine** | Accuracy Evaluator | **DeepEval** | Acts as "Pytest for LLMs", creating a unified Python testing suite that flows perfectly into the other tools. |
| **Layer 4: Security Scanners** | Vulnerability Probes | **Garak & Giskard** | Both are native Python libraries. Garak specifically maps its attacks to the **OWASP Top 10**. |
| **Layer 3: Advanced Red Team**| Adaptive Hacking | **PyRIT** | Microsoft's Python tool for adaptive, multi-turn AI attacks. |
| **Layer 2: Privacy Firewall** | Real-time Filtering | **LLM Guard** | An all-in-one Python firewall that handles PII redaction *and* prompt injection blocking. |
| **Layer 1: AI Gateway** | Proxy & Cost Control| **LiteLLM** | The mandatory gateway. Tracks Apilogy API costs and handles rate-limiting. |
| **Layer 0: Infrastructure** | Target APIs & Builders | **Flowise + Apilogy**| Flowise builds the Agents; Apilogy provides the foundation models. |

---

## 5. How the Tools Interact (Architectural Diagram)

```text
[Pipeline PDF Generator]  <------ (Reporting for Management Audits)
    (Static Outputs)                 |
                                     ^
[Custom Sandbox Portal]   <------- (Governance Hub for Product Managers)
 (Manages Inputs: URLs,              |
  API Keys, Headers)                 ^
          |---------------->[Secrets Vault / CI ENV Injection]
                                     |
                                     v
[Unified Python Testing Pipeline] ---+ (Sandbox Execution Tools)
  |-- DeepEval (Accuracy)            |
  |-- Giskard (Bias/Safety)          |
  |-- Garak (Security Probes)        |
  |-- Developer Trace UI (Phoenix)   |
                                     |
[Real-Time Firewall]                 |
    (LLM Guard) ---------------------+
         |
         v
[AI Gateway Proxy]
    (LiteLLM)
         |
         v
[Base Model / Agents]
 (Apilogy / Flowise AgentLab)
```

## 4. Summary of the Integration Strategy

By pivoting away from disparate JS/TS tools (like Promptfoo and Langfuse) and standardizing entirely on a **Unified Python Stack**, the National AI Sandbox becomes infinitely easier to build and maintain. A single DevOps pipeline can orchestrate LiteLLM, DeepEval, Garak, and LLM Guard, piping all telemetry directly into Arize Phoenix for a completely free, enterprise-grade, un-gated dashboard experience.
