# AI Model Development Taxonomy: Guardrail Remediation Research v2 (2026)

Last updated: 2026-04-07

## 1. Purpose

This updated "v2" research note re-evaluates the guardrail stack for `AIModelDev`, strictly aligning with the **Zero API Subscription Cost** and **Minimum Integration Effort** constraints. Because Telkom AI possesses self-hosted GPU servers, "Zero Cost" means utilizing open-source (OSS) models and local inference engines without paying third-party providers (like AWS, OpenAI, or Lakera).

This document serves as the canonical strategy for when an AI Sandbox, Moonshot, or AI Verify benchmark returns a high-risk result.

---

## 2. The Phased "Minimum Effort" Deployment Strategy

To avoid overwhelming engineering teams with complex middleware configuration, guardrails must be deployed in phases.

### Phase 1: The MVP Gateway (Immediate Action)
At the MVP phase, you will rely **exclusively on the LiteLLM Content Filter**. 
- **Why**: It requires checking boxes in a UI. It operates at the routing layer before traffic hits your internal GPUs.
- **Goal**: Block 80% of blatant attacks (explicit jailbreaks, profanity, obvious exfiltration).

### Phase 2: The Sovereign GPU Expansion (Post-MVP)
When Moonshot red-teaming proves that the LiteLLM built-in regex/filters are failing (e.g., users using complex semantic bypasses), you expand to your local GPU servers.
- **Why**: Pure machine learning semantic classifiers catch context that regex and simple keywords miss.
- **Goal**: Deploy advanced classifiers via local engines (like `vLLM` or `Ollama`) and wire them into LiteLLM's custom guardrail webhooks to preserve the "minimum effort integration" rule.

---

## 3. The 2026 Optimized Tooling Stack

Based on current industry standards and deep-search research, these are the chosen tools for the Sovereign Stack.

### 1. The Gateway Router
* **Tool**: **LiteLLM**
* **URL**: [https://github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)
* **Justification**: The standard for API proxying. Its built-in `Content Filter` has zero latency and no external dependencies, fulfilling the MVP phase requirement instantly.

### 2. The PII / Privacy Redactor
* **Tool**: **Microsoft Presidio**
* **URL**: [https://github.com/microsoft/presidio](https://github.com/microsoft/presidio)
* **Justification**: The undisputed enterprise standard for finding and masking structured PII (emails, SSNs, phone numbers) using fast regex and spaCy, causing minimal latency overhead.

### 3. The Injection & Guardrail Orchestrator
* **Tool**: **Protect AI - LLM Guard**
* **URL**: [https://github.com/protectai/llm-guard](https://github.com/protectai/llm-guard)
* **Justification**: This is a major upgrade for Python environments over older, heavier frameworks like NeMo Guardrails. It acts as a comprehensive toolkit providing 35+ local scanners (Toxicity, BanTopics, PII, Secret Detection) that are easy to deploy locally.

### 4. The Specialized Injection Classifier
* **Tool**: **Protect AI - DeBERTa-v3 Prompt Injection**
* **URL**: [https://huggingface.co/protectai/deberta-v3-base-prompt-injection-v2](https://huggingface.co/protectai/deberta-v3-base-prompt-injection-v2)
* **Justification**: A fine-tuned classifier mathematically optimized to detect prompt injections. It is vastly superior and faster than routing prompts through a heavy 8-Billion parameter LLM just to detect an injection, drastically saving local GPU compute.

### 5. The Deep Semantic Toxicity Guardian
* **Tool**: **Llama Guard 3 (1B or 8B)**
* **URL**: [https://huggingface.co/meta-llama/Llama-Guard-3-8B](https://huggingface.co/meta-llama/Llama-Guard-3-8B)
* **Justification**: When you explicitly need to categorize text according to the MLCommons AI Safety Taxonomy (blocking violence, self-harm, child safety risks, hate speech), Llama Guard 3 provides state-of-the-art semantic blocking. 

---

## 4. Remediation Playbook by Risk Type

If `Moonshot` reports a High-Risk score, use this playbook before modifying the primary LLM weights.

### 5.1 Prompt Injection, Jailbreak, Prompt Extraction
* **Phase 1 (MVP)**: Turn on LiteLLM System Prompt & Jailbreak block rules. Isolate the system instructions from the user data string in your code.
* **Phase 2**: Route the input string through the local **Protect AI DeBERTa-v3 Classifier** on your GPU before sending it to the main model.

### 5.2 PII Leakage and Sensitive Data Exposure
* **Phase 1 (MVP)**: Use the built-in LiteLLM regex filters if available, or scrub the logs manually.
* **Phase 2**: Place **Microsoft Presidio** into the request pipeline to scrub outbound PII from the user prompt and inbound PII from the model response.

### 5.3 Hallucination and Unsupported Claims
* **Phase 1 (MVP)**: Adjust the system prompt. Add rules demanding abstention: `"If the answer is not in the provided documents, explicitly say 'I do not know'."`
* **Phase 2**: For critical domains, improve RAG pipeline chunking. Deploy **Guardrails AI** to run local code-based provenance checks against the citations.

### 5.4 Undesirable Content (Toxicity, Violence, Self-Harm, Safety, Unsafe Advice)
* **Phase 1 (MVP)**: Select the specific checkboxes in your `LiteLLM Content Filter` (e.g., Harmful Violence, Harmful Child Safety, Denied Financial/Medical Advice, Toxic Language).
* **Phase 2**: Use **LLM Guard's `BanTopics` scanner** to zero-shot classify bad topics. For deep semantic bypasses, route the request classification to your local **Llama Guard 3** instance.

---

## 5. Summary Verdict

Do not deploy `Llama Guard 3` or `LLM Guard` on Day 1. Deploying ML models requires provisioning `vLLM`, scaling GPUs, and writing middle-tier code (which violates "minimum integration effort" at the MVP stage). 

**At MVP, check the boxes in the LiteLLM UI.** Use Moonshot to measure the gap. Then, use your sovereign GPU infrastructure to explicitly plug those gaps using the optimized open-source tools listed in Section 3.
