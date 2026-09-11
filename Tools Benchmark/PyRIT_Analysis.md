# PyRIT - Analysis & Strategy Guide

This document provides a detailed breakdown of **PyRIT** (Python Risk Identification Tool), its technical stack, core features, expected output formats, and a comprehensive cost analysis.

Developed by the **Microsoft AI Red Team**, PyRIT is an open-source framework designed specifically to automate the red-teaming of generative AI systems. If *Garak* is a brute-force vulnerability scanner, **PyRIT is an intelligent, multi-turn adversarial actor.**

---

## 1. Core Features & Capabilities

PyRIT goes beyond simply sending thousands of static bad prompts. It excels at engaging the target LLM in a structured conversation to subtly bypass its defenses over time.

### Offensive Security Features
*   **Multi-Turn Conversational Red-Teaming (Crescendo Attacks):** This is PyRIT's standout feature. Instead of asking "How do I build a bomb?" (which is easily caught), PyRIT will act like a helpful user over 10 conversational turns, slowly steering the target AI into providing dangerous information.
*   **Automated Target Probing:** It automatically generates prompts to test for bias, prohibited content, sensitive data extraction, and code execution vulnerabilities.
*   **Extensible Scoring Engine:** After extracting an answer, PyRIT evaluates the response. It allows you to use Azure AI Content Safety filters, classical Machine Learning models, or another "Judge LLM" to determine if the attack was successful.
*   **Prompt Encoders (Evasion):** It natively supports obfuscating malicious prompts using encodings (Base64, Rot13, HEX) or even ASCII-art to trick the target model's input filters.
*   **Multi-Modal Support:** PyRIT is capable of red-teaming computer vision models and speech-recognition systems, not just text-based LLMs.

---

## 2. Technical Stack & Output Format

### Tech Stack Integration
*   **Language:** Open-source Python library (`pip install pyrit`).
*   **Memory Management:** Strictly uses **DuckDB** to record every single conversational turn, context, and scoring evaluation.
*   **Model Support:** Highly integrated with the Microsoft ecosystem (Azure OpenAI, Azure Machine Learning Endpoints) but completely agnostic. It supports Hugging Face, local models, and raw OpenAI APIs.
*   **Execution Paradigm:** Typically run via Python scripts where you define the `Target`, the `Attacker Strategy`, and the `Scorer`.

### Expected Output Format
Because PyRIT utilizes a robust local database, its output is heavily geared toward data scientists and security analysts:

*   **DuckDB Database:** Every interaction is written to a local `.db` file. This allows security teams to run complex SQL queries across the entire red-teaming campaign to find specific failure modes.
*   **JSON Representations:** For classic logging, the output structure is a detailed JSON object containing `category_name`, `category_description`, and the Judge's `rationale` for why the attack succeeded or failed.
*   **BI Integration:** The DuckDB format allows you to seamlessly pull the red-teaming data into tools like Excel, Power BI, or Tableau for executive vulnerability reporting.

---

## 3. Resource & Cost Analysis

PyRIT is open-source (MIT License) and completely free to use. 

However, because its fundamental architecture involves "AI fighting AI" (using an Attacker LLM to fight a Target LLM, and a Judge LLM to score the fight), the API costs can become extraordinarily high if you rely on commercial models.

### 3.1 Cost Breakdown
| Component | Provider / Execution Environment | Cost Impact |
| :--- | :--- | :--- |
| **PyRIT Framework / Orchestrator** | OSS (Microsoft Supported) | **$0.00** |
| **The Target LLM** | E.g., Azure OpenAI | **High** (Token usage for the system being attacked). |
| **The Attacker LLM (Red Team Agent)** | E.g., GPT-4 | **High** (Token usage for the AI generating the complex multi-turn attacks). |
| **The Scorer LLM (Judge)** | E.g., GPT-4 / Azure Content Safety | **High** (Token usage for evaluating the chat logs). |

### 3.2 The Hidden Costs of Multi-Turn Attacks
Unlike Garak (which sends a single prompt and waits for an answer), PyRIT opens an active dialog. A single test scenario might require 10 back-and-forth turns. By turn 10, the context window sent to the Attacker LLM, Target LLM, and Scorer LLM is massive. Running a full suite of PyRIT tests against GPT-4 can consume millions of tokens very quickly.

### 3.3 The Zero-Cost Architecture with Qwen 30B
To leverage the power of Microsoft's AI Red Team framework for free, you must centralize the compute locally:

1. Host your **Qwen 30B** locally via Ollama/vLLM (`http://localhost:11434`).
2. Configure PyRIT to use your local Qwen 30B as the **Target** (the model being tested).
3. Connect a secondary local model (or use Qwen 30B again) to act as the **Attacker Strategy Model**.
4. Use PyRIT's classic ML scorers or point it to a local NLP classifier instead of Azure Content Safety for the **Scorer**.
5. PyRIT will orchestrate the LLMs fighting each other completely locally, generating deep DuckDB analytics, for a total API cost of **$0.00**.

## 4. Conclusion & Positioning in Your Stack
*   **Moonshot:** Best for creating standardized compliance reports (IMDA/MLCommons).
*   **LLM Guard:** Best as the runtime firewall protecting the live application.
*   **DeepEval:** Best for daily CI/CD pipeline RAG accuracy testing.
*   **Giskard:** Best for visual QA collaboration with non-technical teams.
*   **Garak:** Best for fast, aggressive, brute-force vulnerability scanning.
*   **PyRIT:** Best for **advanced, sophisticated, conversational red-teaming**. If you need to test if your model can be tricked by a malicious user stringing it along over 20 conversational turns, or if you need to test against sophisticated evasions (base64, ciphers), PyRIT's automated attacker agents are the industry standard.
