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
| **Governance Hub** | **Custom Portal** | Custom Build<br>*(Vue / React)* | **Replaces forcing generic Observability tools.** Because no free OSS tool combines Garak security and DeepEval accuracy into a single management view, building a custom frontend to read the test JSONs is the only enterprise-grade solution without restrictive licenses. | Unified Accuracy Score, OWASP Compliance Check, Toxicity Rate. |
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
7.  **The Web Portal (The Result)**: When the Python suite finishes, it outputs a single JSON results file. The PM/Management logs into the **Custom Sandbox Portal (Vue/React)**, which reads that JSON and displays a beautiful, cohesive dashboard showing exactly how much the test cost, which OWASP injections succeeded, and the final DeepEval accuracy score.
8.  **The Management Report**: A button on the Custom Portal triggers a script that exports the JSON into a static, stamped PDF (Management Compliance Report), completely eliminating the need for bulky manual checklist apps like AI Verify.

---

## 4. The Eliminated Tools (And Why)

*   **AI Verify / Moonshot** (Eliminated): Low adoption (~300 GitHub stars). Highly manual checklist-based UI. Replaced by automated PDF reporting directly from Garak/DeepEval outputs.
*   **Promptfoo** (Eliminated): Incredible tool, but written in TypeScript. Using DeepEval (Python) allows all security tools to live in the same native environment for the Sandbox developers.
*   **Langfuse, Phoenix, & OpenLIT as the "Main UI"** (Eliminated): These are Observability tools for data scientists, not Governance Hubs. Langfuse has enterprise UI gates. True governance portals require paid licenses. Building a **Custom Sandbox Portal** to read backend JSON is the only way to avoid enterprise trapping while serving Management and PMs correctly.
*   **Microsoft Presidio** (Eliminated): Excellent for PII, but LLM Guard handles PII *plus* security threats under a single Python umbrella.
*   **NeMo Guardrails** (Eliminated): Required learning a new syntax (Colang). LLM Guard is a simpler drop-in Python firewall.

## 5. Summary of Combined Evaluation Indicators
By utilizing this highly integrated Python stack, the Sandbox tracks a cohesive set of final indicators:
1.  **Security Indicators (Garak/PyRIT)**: Jailbreak Success Rate, Prompt Injection Vulnerability Score.
2.  **Accuracy Indicators (DeepEval)**: RAG Faithfulness, Answer Relevancy, Context Recall.
3.  **Safety Indicators (Giskard)**: Disparate Impact, Toxicity Rate.
4.  **Privacy Indicators (LLM Guard)**: Real-time PII Anonymization Success.
