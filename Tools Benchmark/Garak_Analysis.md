# Garak - Analysis & Strategy Guide

This document provides a detailed breakdown of **Garak** (Generative AI Red-teaming & Assessment Kit), its technical stack, core features, expected output formats, and a comprehensive cost analysis.

Giskard focuses on QA and collaboration, DeepEval focuses on Pytest CI/CD, and LLM Guard is a runtime firewall. **Garak is a pure, aggressive, open-source vulnerability scanner specifically designed for offensive security testing (Red-Teaming) of LLMs. It is heavily supported and updated by NVIDIA.**

---

## 1. Core Features & Capabilities

Garak acts like "Nmap" or "Metasploit" but specifically for Large Language Models. You point it at an LLM API or a local model, and it systematically attempts to break it.

### Offensive Security Features
*   **The Probes System:** Garak works by sending thousands of adversarial prompts called "Probes". It has a massive, constantly updated library of probes designed to trigger:
    *   **Jailbreaks** (DAN, Developer Mode, ignoring instructions).
    *   **Prompt Injections** (Both direct and indirect/cross-site).
    *   **Toxicity & Hate Speech Generation** (Forcing the model to output slurs or dangerous content).
    *   **Data Leakage** (Extracting PII or memorized training data).
    *   **Model Denial of Service (DoS)** (Sending specialized tokens meant to crash the tokenizer/generator).
*   **The Detectors System:** After a "Probe" is sent, a "Detector" evaluates the LLM's response to see if the attack was successful (a "Hit"). Detectors can be simple keyword matchers (e.g., did the model say the specified bad word?) or complex secondary LLM judges.
*   **Automated Scanning:** You can run it entirely unsupervised. It will exhaustively test the target model against every known vulnerability in its database.

---

## 2. Technical Stack & Output Format

### Tech Stack Integration
*   **Language:** Open-source Python tool (`pip install garak`).
*   **Execution Paradigm:** Pure Command Line Interface (CLI). It is designed for terminal execution by security engineers.
*   **Model Support:** Highly flexible. Native integrations (Generators) for:
    *   Local GGUF / ggml models (via `llama.cpp`)
    *   Hugging Face (Local and API)
    *   Ollama & LiteLLM
    *   REST APIs (You can point it at any custom endpoint returning JSON/Plaintext).
    *   OpenAI, Cohere, Anthropic, Bedrock, etc.

### Expected Output Format
Because it is a security tool, Garak's output is heavily focused on logs, audit trails, and data integration.

*   **Real-time CLI:** Prints interactive progress bars and alerts in the terminal as it discovers vulnerabilities during a scan.
*   **Structured Logs (JSONL):** Generates extremely granular `garak.log` and `.jsonl` files documenting *every single prompt sent*, the exact model response, and the detector's score.
*   **HTML Reports:** Generates a high-level, human-readable HTML summary report of the scan.
*   **AVID Integration:** Results can be structured using the AI Vulnerability Database (AVID) schema, allowing seamless ingestion into enterprise vulnerability management systems (like Splunk or custom SIEMs).

---

## 3. Resource & Cost Analysis

Garak is famously **100% free and open-source.** There are no enterprise tiers, no locked features, and no required SaaS hubs. 

However, the act of *running* Garak can be the most resource-intensive process out of all the testing frameworks analyzed so far.

### 3.1 Cost Breakdown
| Component | Provider / Execution Environment | Cost Impact |
| :--- | :--- | :--- |
| **Garak Framework (CLI Tool)** | OSS (NVIDIA/Community Supported) | **$0.00** |
| **Generators (Target LLMs via API)** | e.g., OpenAI / Anthropic | **Astronomical** (Do NOT point Garak at GPT-4 unless you have an unlimited budget. It sends *thousands* of prompts). |
| **Generators (Target LLMs via Local)** | Local (Ollama / Qwen 30B) | **$0.00** (Pure Local Compute. Highly Recommended). |
| **Detectors (Judge Models)** | Varies (Regex, Local Classifiers, or LLM APIs) | Varies (Free if using keyword/local classifiers; expensive if using LLM judge endpoints). |

### 3.2 The Hidden Costs of Red-Teaming
Garak is fundamentally a brute-force tool. A single comprehensive scan can take **hours to days** depending on the speed of the target model. 
*   If you point Garak at a paid cloud API (like OpenAI), you will pay for tens of thousands of tokens per hour.
*   To run Garak effectively, you need significant dedicated compute time.

### 3.3 The Zero-Cost Architecture with Qwen 30B
Garak is *perfectly* suited for testing local models like your **Qwen 30B**:

1. Run Qwen 30B locally via Ollama (`http://localhost:11434`).
2. Run Garak via the CLI, pointing its generator at the local REST endpoint or using the native Ollama integration.
3. Example Command: `python -m garak --model_type rest --model_name my_config.yaml --probes all`
4. Garak will spend the next several hours maliciously attacking your Qwen 30B.
5. Because everything is local, the **total API cost is $0.00**.

## 4. Conclusion & Positioning in Your Stack
*   **Moonshot:** Best for creating standardized compliance reports (IMDA/MLCommons) with a clean UI.
*   **LLM Guard:** Best as the runtime firewall protecting the live application.
*   **DeepEval:** Best for daily CI/CD pipeline RAG accuracy testing.
*   **Giskard:** Best for visual QA collaboration with non-technical teams.
*   **Garak:** Best for **hardcore, offensive security engineering**. If you want an automated tool to ruthlessly attempt to break your Qwen 30B guardrails over the weekend and give you a raw JSON log of every successful jailbreak, use Garak.
