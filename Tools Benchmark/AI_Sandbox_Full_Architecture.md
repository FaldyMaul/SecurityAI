# National AI Sandbox: Full Architecture & End-to-End Flow

Based on deep research into Moonshot, LLM Guard, DeepEval, Giskard, Garak, and PyRIT, this document outlines the end-to-end architecture of the National AI Sandbox. It covers the technical stack, output integration strategy, justification for a multi-tool approach, and compliance mapping to OWASP, ISO, and NIST.

---

## 1. Output Format Integration Strategy (Overcoming PDF Limits)
A major challenge in building a unified Sandbox is that many standalone tools (like the core AI Verify framework or Moonshot's native UI) generate static PDF or HTML reports. *PDFs cannot be aggregated, queried, or parsed by a master dashboard.*

**The Solution:** The Sandbox Custom Backend must bypass the native UIs of these tools. It must exclusively request machine-readable outputs from the underlying Python engines, pull that data into a central PostgreSQL database, and build its own interactive dashboard.

*   **Moonshot:** While the UI exports PDFs, the core `moonshot` Python CLI writes all benchmarking results to raw `.json` files in `moonshot-data/runs/`. The Sandbox backend will natively parse these JSONs.
*   **Garak:** Outputs a highly detailed `.jsonl` (JSON Lines) file mapping every single prompt attempt and whether it was a "hit" (vulnerability found). 
*   **PyRIT:** Uses a local `DuckDB` database to track history. The Sandbox backend can run SQL queries directly against PyRIT's `.db` file to extract multi-turn attack successes.
*   **DeepEval:** Outputs standard JSON test reports (similar to Pytest metrics).
*   **Strategy:** By ingesting JSON, JSONL, and DuckDB, your Custom Sandbox UI renders a unified analytics dashboard. Only at the very end of the user journey does the Sandbox generate its *own* official PDF for management audits.

---

## 2. Justification: Why Not Use *Only* Moonshot?
Moonshot is an incredible, government-backed tool, but using it as the *sole* testing engine leaves critical gaps in a National Sandbox. A Sandbox must be comprehensive, while Moonshot is specialized for baseline compliance.

1.  **Limited Attack Depth (Single vs. Multi-turn):** Moonshot primarily sends single-turn static prompts. For highly secure systems (like government chatbots), attackers use multi-turn conversational trickery (Crescendo attacks). **PyRIT** must be integrated to provide this advanced, stateful conversational red-teaming.
2.  **Lacking Granular RAG Metrics:** Moonshot is great at checking base models for bias/toxicity, but it struggles to evaluate complex Retrieval-Augmented Generation (RAG) pipelines. **DeepEval** is required to mathematically score "Answer Relevancy" and "Faithfulness" against a live vector database.
3.  **No Runtime Protection:** Moonshot only tests models *before* deployment. A complete Sandbox ecosystem must offer users a way to protect models in production. **LLM Guard** provides this real-time firewall capability.
4.  **Offensive Brute-Forcing vs Compliance:** While Moonshot uses structured compliance recipes, **Garak** acts like a ruthless Nmap scanner, firing tens of thousands of exploits specifically designed to crash the system tokenizer or bypass specific guardrails.

---

## 3. Mapping the Stack to Global Standards
To achieve provable compliance, the Sandbox Orchestrator maps specific tools in its pipeline to specific regulatory frameworks:

| Governance Standard | The Requirement | The Sandbox Tool Solution |
| :--- | :--- | :--- |
| **ISO/IEC 42001** | *Clause A.6.2.4 (Verification & Validation).* Requires empirical evidence of safety testing before deployment. | **Moonshot.** Using ISO-mapped Cookbooks (e.g., `mlc-ai-safety`), Moonshot provides the exact JSON metrics proving the model passed ethical and safety thresholds. |
| **NIST AI RMF** | *MEASURE & MANAGE functions.* Requires tracking risks like demographic bias, toxicity, and hallucination. | **Moonshot & Giskard.** Both test for explicit demographic disparities and output toxicity required by NIST. |
| **OWASP Top 10 for LLMs** | *LLM01: Prompt Injection, LLM06: Sensitive Information Disclosure, LLM02: Insecure Output Handling.* | **Garak & LLM Guard.** Garak actively attempts to breach the OWASP Top 10 during staging. LLM Guard actively blocks OWASP Top 10 attacks in production. |
| **MITRE ATLAS** | *Advanced Threat Landscape.* Identifying sophisticated adversarial machine learning attacks. | **PyRIT.** Designed by Microsoft explicitly to simulate MITRE ATLAS multi-turn adversarial behaviors. |

---

## 4. The Complete Stack Layer Architecture

By combining these tools, the Sandbox achieves full coverage. The architecture is specialized into layers, strictly delineating the **Sandbox Testing Tools** (Layer 3/4/5) from the **Orchestrator UI** (Layer 6).

| Layer | Component Role | Selected Tool | Native Output Format | Resources & Cost (Default OSS) | Rationale for Integration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Layer 7: Reporting** | Static Compliance Output | **Sandbox PDF Generator** | `.pdf` | **$0 API**. Minimal compute CPU script. | A simple script that converts the aggregated dashboard metrics into an official Management-ready PDF. |
| **Layer 6: Master UI Hub** | Governance Dashboard | **Custom Sandbox App** | Aggregates JSON | **$50-$200/mo**. Standard Next.js server + PostgreSQL. | Ingests JSON/DB payloads from all underlying tools. Handles multi-tenancy auth and compliance questionnaires. |
| **Layer 5: Compliance Base** | Baseline Ethics & Safety | **Project Moonshot** | `.json` (via CLI) <br> `.pdf` (via UI) | **$0 API**. Uses local Qwen 30B to run tests. Requires standard API orchestration compute. | Acts as the foundation, mapping technical tests to ISO 42001 and NIST requirements. |
| **Layer 4: RAG & Accuracy** | Accuracy Evaluator | **DeepEval** | `.json` / CLI logs | **$0 API**. Uses local Qwen 30B as LLM judge. | Analyzes RAG pipelines for hallucinations and relevance. |
| **Layer 3: Offensive Security**| Vulnerability & Red Team | **Garak & PyRIT** | `.jsonl` (Garak) <br> `.db` DuckDB (PyRIT) | **$0 API**. Extremely high prompt volume sent to local Qwen 30B. | Garak probes for OWASP vulnerabilities; PyRIT orchestrates multi-turn MITRE ATLAS attacks. |
| **Layer 2: Privacy Firewall** | Real-time Filtering | **LLM Guard** | Native Python Dict / `.json` | **$0 API**. CPU or lightweight GPU (e.g. T4) to run local ONNX security models in real-time. | An all-in-one Python firewall that handles PII redaction and prompt injection blocking in real-time. |
| **Layer 1: AI Gateway** | Proxy & Cost Control| **LiteLLM** | API logs / DB | **$0**. Minimal API routing compute. | Tracks Apilogy API costs and routes traffic to the target models (e.g. Qwen 30B). |
| **Layer 0: Infrastructure** | Target APIs & Builders | **Flowise + Telkom Apilogy**| Chat / Vision API | Flowise hosting + Local GPU/Apilogy compute costs. | Flowise builds the Agents; Apilogy provides the foundation models. |

---

## 5. How the Tools Interact (Architectural Diagram)

```text
[Sandbox Custom PDF Generator]  <------ (Official ISO/NIST Audit Evidence)
                                     |
                                     ^
[Custom Sandbox Web Portal]   <------- (Governance Hub: Questionnaires & Dashboards)
 (Manages Inputs: URLs,              |  <-- (Ingests JSON, JSONL, DuckDB)
  API Keys, Headers)                 ^
          |---------------->[Python Orchestrator Backend API]
                                     |
                                     v
[Unified Open-Source Testing Pipeline] ---+ (Sandbox Execution Tools)
  |-- DeepEval (RAG Hallucination)        |
  |-- Project Moonshot (ISO/NIST Ethics)  |
  |-- Garak (OWASP Top 10 Security)       |
  |-- PyRIT (MITRE ATLAS Multi-turn)      |
                                     |
[Real-Time Firewall Deployments]     |
    (LLM Guard) ---------------------+
         |
         v
[AI Gateway Proxy]
    (LiteLLM)
         |
         v
[Base Model / Agents]
 (Apilogy / Flowise AgentLab / Ollama Qwen 30B)
```

By leveraging this multi-tool ecosystem orchestrated by a Custom UI, the National Sandbox guarantees that AI models are not only compliant with high-level ISO/NIST frameworks via Moonshot, but are also robustly defended against granular OWASP and MITRE threats via Garak and PyRIT.
