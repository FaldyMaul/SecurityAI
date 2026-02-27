# AI Sandbox Tools Benchmark & Indicator Analysis

## 1. Executive Summary

This document provides a comprehensive benchmark of the core AI testing tools proposed for the National AI Sandbox. 

Based on strict requirements to only use **100% Free Open-Source Software (OSS)** (avoiding enterprise feature gates) and to ensure **seamless integration**, this benchmark advocates for a **Unified Python Stack**. Consolidating the tooling into a single language ecosystem ensures that tools can communicate natively and share the same OpenTelemetry observability pipelines.

---

## 2. The Unified Python OSS Benchmark & Strategy

The table below evaluates the final selection of tools that adhere to the pure OSS constraint and the unified integration strategy.

| Layer Focus | Selected Tool | OSS Status & Stars | Why It Won (Integration & OSS constraints) | Key Indicators Tracked |
| :--- | :--- | :--- | :--- | :--- |
| **API Gateway** | **LiteLLM** | Free OSS (MIT)<br>*(~16k Stars)* | Standardizes requests to Apilogy & OpenAI formats natively in Python. Mandatory for rate-limits during testing. | Token Usage, Total Execution Cost (IDR), Latency. |
| **Governance Hub** | **Customized Base** | Streamlit or AI Verify Fork | **Replaces forcing generic Observability tools.** Because no default OSS tool perfectly combines Garak security and DeepEval accuracy into a single management view, leveraging a highly customizable Python dashboard (Streamlit) or forking a compliance UI (AI Verify) to read the test JSONs is the smartest enterprise-grade solution. | Unified Accuracy Score, OWASP Compliance Check, Toxicity Rate. |
| **Accuracy Evaluator** | **DeepEval** | Free OSS<br>*(~13.8k Stars)* | **Replaces Promptfoo.** While Promptfoo is fast (TS), DeepEval natively uses `pytest`. It allows the entire Sandbox testing engine to be deployed as one unified Python suite. | Answer Relevancy, Faithfulness (RAG), Hallucination Rate, G-Eval logic. |
| **Vulnerability Scanner** | **Garak** | Free OSS<br>*(~7k Stars)* | The definitive Python penetration tester. Massive library of known vulnerabilities. | Jailbreak Success Rate (<1%), Structural prompt injection vulnerability. |
| **Ethical / Safety Scanner**| **Giskard** | Free OSS Core<br>*(~5.1k Stars)* | While its UI has enterprise limits, its core Python scanning library is fully OSS and essential for catching bias. | Demographic Parity Disparity, Toxicity Identification Rate. |
| **Privacy Firewall** | **LLM Guard** | Free OSS<br>*(~2.5k Stars)* | **Replaces Presidio.** Also Python. It goes beyond Presidio's PII redaction by simultaneously blocking prompt injections in real-time. | PII Leakage Volume, Real-time blocked malicious prompts. |
| **Adaptive Red-Team** | **PyRIT** | Free OSS (MIT)<br>*(~3.5k Stars)* | Microsoft's Python tool for Agentic, multi-turn attacks. Fills the gap static scanners leave. | Multi-turn exploit success rate. |

---

## 3. The "Unified Stack" Integration Strategy

Instead of relying on disparate tools written in different languages (YAML, TypeScript, Python) that require complex message brokers to communicate, the **Unified Python Stack** creates a highly integrated architecture.

### The Standardized Flow

1.  **The Target**: The user builds an agent in **Flowise (AgentLab)**.
2.  **The Script**: The Sandbox engineer triggers a single Python test suite (using `pytest` + **DeepEval**).
3.  **The Attack Execution**: The Python suite imports **Garak** and **Giskard** natively. It fires thousands of test malicious prompts and evaluation questions at the Flowise agent.
4.  **The Gateway**: Every single API call from the test suite routes through the **LiteLLM** Python container, which computes the cost based on internal **Apilogy** pricing.
5.  **The Firewall Defense**: The Agent is protected by **LLM Guard** natively intercepting the traffic.
6.  **The Developer View**: Engineers can optionally run **Arize Phoenix** locally to view deep OpenTelemetry traces if a test fails.
7.  **The Web Portal (The Result)**: When the Python suite finishes, it outputs a single JSON results file. The PM/Management logs into the **Customized Sandbox Portal (Streamlit / AI Verify Fork)**, which reads that JSON and displays a beautiful, cohesive dashboard showing exactly how much the test cost, which OWASP injections succeeded, and the final DeepEval accuracy score.
8.  **The Management Report**: A button on the Customized Portal triggers a script that exports the JSON into a static, stamped PDF (Management Compliance Report), completely eliminating the need for bulky manual checklist apps.

---

## 4. Alternate & Eliminated Tools

Based on recent Security Team analysis and architectural constraints, the following tools were evaluated but placed in alternate or eliminated tracks:

*   **Kong API Gateway** (Alternate): An industry standard for REST routing, but **LiteLLM** was chosen for the Sandbox because it's "AI-Native" (translating payload schemas to OpenAI format natively).
*   **Guardrails AI** (Alternate): Excellent for forcing strict JSON/XML outputs via `.rail` files. However, **LLM Guard** serves as the primary drop-in firewall because it acts as a generalized net for all prompt injections without requiring custom schemas per model.
*   **IBM AI Fairness 360 & IBM ART** (Alternate Tracks): These are the undisputed gold standards for *Classical ML* (tabular data, vision evasion). They operate in parallel to the LLM Sandbox tools (DeepEval, PyRIT) when legacy or non-generative models are tested.
*   **Microsoft Counterfit** (Eliminated): A great classical ML automation tool, but superseded explicitly by Microsoft's **PyRIT** for Generative AI and LLM red-teaming.

*   **Native AI Verify (Unmodified)** (Eliminated): Low adoption as a standalone app (~300 GitHub stars) and highly manual. However, its *source code* is highly valuable as a forkable base for the Customized Portal.
*   **Promptfoo** (Eliminated): Incredible tool, but written in TypeScript. Using DeepEval (Python) allows all security tools to live in the same native environment for the Sandbox developers.
*   **Langfuse, Phoenix, & OpenLIT as the "Main UI"** (Eliminated): These are Observability tools for data scientists, not Governance Hubs. Langfuse has enterprise UI gates. True governance portals require paid licenses. Forking an OSS base (like Streamlit or AI Verify) to read backend JSON is the only way to avoid enterprise trapping while serving Management correctly.
*   **Microsoft Presidio** (Eliminated): Excellent for PII, but LLM Guard handles PII *plus* security threats under a single Python umbrella.
*   **NeMo Guardrails** (Eliminated): Required learning a new syntax (Colang). LLM Guard is a simpler drop-in Python firewall.

## 5. Summary of Combined Evaluation Indicators
By utilizing this highly integrated Python stack, the Sandbox tracks a cohesive set of final indicators:
1.  **Security Indicators (Garak/PyRIT)**: Jailbreak Success Rate, Prompt Injection Vulnerability Score.
2.  **Accuracy Indicators (DeepEval)**: RAG Faithfulness, Answer Relevancy, Context Recall.
3.  **Safety Indicators (Giskard)**: Disparate Impact, Toxicity Rate.
4.  **Privacy Indicators (LLM Guard)**: Real-time PII Anonymization Success.
