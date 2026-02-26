# AI Sandbox Privacy & Security Interceptor Benchmark

## 1. Executive Summary

This document evaluates the **Real-Time Privacy & Security Interceptors** (Layer 3) for the National AI Sandbox. Unlike static CI/CD testing (Promptfoo) or aggressive red-teaming (Garak), interceptors act as active middleware or "firewalls" during inference. They analyze prompts coming *in* and responses going *out* in real-time.

The baseline for this capability in the initial architecture was **Microsoft Presidio** (focused heavily on PII). This benchmark investigates whether there are better, more comprehensive Open-Source Software (OSS) alternatives that handle *both* Privacy (PII leakage) and Security (Prompt Injection, Toxicity, Jailbreaks) simultaneously.

---

## 2. OSS Interceptor Capability Comparison

The table below breaks down the top open-source tools capable of real-time input/output filtering for LLMs.

| Interceptor Tool | OSS Status & GitHub Stars | Core Language & Tech Stack | Primary Capabilities | Docs & Community | Key Strengths & Limitations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LLM Guard** *(Protect AI)* | Free OSS<br>**~2.5k Stars** | **Python** (Model agnostic) | **Privacy & Security.** PII Redaction, Secret scanning, Prompt Injection detection, output toxicity/bias filtering. | **Great** - Strong backing from Protect AI, focused solely on LLM App firewalls. | **Strengths**: True "Drop-in" firewall. Does everything Presidio does (PII) PLUS stops prompt injections and malicious links.<br>**Limitations**: Can add latency to real-time chats if all heavy scanners are enabled. |
| **NeMo Guardrails** *(NVIDIA)* | Free OSS<br>**~5.6k Stars** | **Python, Colang**, C++ (`annoy`) | **Dialog Control & Security.** Jailbreak prevention, RAG grounding, topical steering, PII masking. | **Excellent** - Highly active, backed by NVIDIA. Integrates with all major frameworks (LangChain, LlamaIndex). | **Strengths**: Best for steering complete conversation flows and ensuring the AI stays on topic.<br>**Limitations**: High learning curve. Requires writing custom rules in "Colang" (NVIDIA's domain-specific language). |
| **Microsoft Presidio** | Free OSS<br>**~2.5k+ Stars** | **Python**, Go (REST API) | **Privacy only.** Best-in-class entity recognition (NER) and regex-based PII redaction/anonymization. | **Great** - Industry standard for traditional data de-identification. | **Strengths**: The absolute gold standard for finding KTP, Emails, and Phone numbers. Highly customizable.<br>**Limitations**: Only handles privacy. It will NOT catch a prompt injection or a jailbreak attempt. |

---

## 3. Deep Dive Insights

### A. The Baseline Privacy Standard: Microsoft Presidio
**Presidio** remains the enterprise standard for data de-identification. If the *only* goal of Layer 3 is to ensure that users do not accidentally paste their KTP or Credit Card into the AI Sandbox, Presidio is flawless. However, modern LLM firewalls need to do more than just redact PII; they must also block malicious payloads. 

### B. The "All-in-One" Firewall: LLM Guard (Protect AI)
**LLM Guard** has emerged as the most complete OSS "security toolkit" for LLM interactions. It acts exactly like a traditional IT firewall but for generative AI.
*   **Input Scanners:** Checks for prompt injections, hidden text, banned topics, and automatically anonymizes PII (doing Presidio's job).
*   **Output Scanners:** Ensures the LLM isn't leaking secrets, generating toxic content, or hallucinating URLs.
*   **Verdict:** It provides the most immediate "plug-and-play" value for the Sandbox without requiring developers to learn new logic languages.

### C. The Architectural Heavyweight: NeMo Guardrails (NVIDIA)
**NeMo** is less of a simple filter and more of a conversational traffic cop. It uses a unique language (`Colang`) to explicitly map out what the AI is allowed to talk about.
*   **Verdict:** If the Sandbox aims to build specific, highly restricted AI Agents (e.g., an HR Bot that refuses to talk about finance), NeMo is the best choice. For a generalized testing sandbox, its implementation overhead might be too heavy.

---

## 4. Strategic Recommendation for the Sandbox Interceptor

Relying solely on Presidio leaves the Sandbox vulnerable to active adversarial attacks during runtime. The Sandbox requires an interceptor that handles both Privacy and Security natively within the **Platform-as-a-Service (PaaS)** architecture.

**Recommendation: Implement LLM Guard as the Primary Firewall**
1.  **Why:** It offers the "best of both worlds." LLM Guard natively handles PII redaction/anonymization (using tools under the hood that mimic Presidio's NER logic) while simultaneously providing robust defense against Prompt Injections and Jailbreaks. Because it is written in Python, it integrates flawlessly with LiteLLM and DeepEval.
2.  **Implementation:** Deploy LLM Guard as an active middleware proxy immediately in front of the target AI Agent (or Apilogy models). 
3.  **The Automated PaaS Flow:** 
    *   User (or Automated Garak Test Suite) submits a prompt -> Hits **LLM Guard (Input Scan)** -> PII is redacted, Injections are blocked in real-time.
    *   Clean prompt hits **LiteLLM (API Gateway)** -> Routed and billed to the target LLM.
    *   LLM generates response -> Hits **LLM Guard (Output Scan)** -> Checked for toxicity/leaked secrets.
    *   User (or deep testing pipeline) receives safe response.

*(Optional Alternative)*: If the team is deeply embedded in the NVIDIA ecosystem or requires intense topical steering, **NeMo Guardrails** should be adopted, but it will require significantly more development time to write Colang configurations.
