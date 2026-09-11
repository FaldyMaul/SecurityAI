# AI Model Development Taxonomy: Guardrail Remediation Research v3 (Late 2026 Edition)

Last updated: 2026-04-07

## 1. Purpose

After exhaustive deep-dive research into the absolute latest 2026 Open Source / Sovereign LLM ecosystems, this document finalizes the ultimate "Zero-Cost + Local GPU" Guardrail Strategy. It defines the tools, the phases, and specifically solves the **Bahasa Indonesia** localization challenge that generic Western models fail to handle.

---

## 2. The Phased Deployment Strategy

You must avoid "technical debt" by refusing to deploy heavy ML models before they are actually needed.

### Phase 1: The MVP Gateway (Immediate Action)
At the MVP phase, you rely **exclusively on the LiteLLM Content Filter**. 
- **Action**: Check the boxes in the LiteLLM UI (Toxic Language, Jailbreak, etc.).
- **Goal**: Block 80% of standard overt attacks at $0 infrastructural cost.

### Phase 2: The Sovereign GPU Expansion (Post-MVP)
When `Moonshot` red-teaming proves that LiteLLM regex filters are being bypassed by complex semantic attacks or local Indonesian slang, you expand to your local GPU servers.
- **Action**: Deploy semantic classifiers on your local GPU (`vLLM`) and wire them directly into LiteLLM's existing custom guardrail webhooks.

---

## 3. The Ultimate 2026 Tooling Stack (With Justifications)

Here are the definitive, heavily-researched tools you will use.

### 1. The Gateway Router
* **Tool**: **LiteLLM** (Python)
* **URL**: [https://github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)
* **Justification**: LiteLLM is the permanent anchor of the sovereignty stack. It is the perfect MVP and scales well into production. We will not replace LiteLLM; instead, we will simply enrich its routing capabilities by plugging our local GPU models directly into its webhooks as traffic demands.

### 2. The PII / Privacy Redactor
* **Tool**: **Microsoft Presidio**
* **URL**: [https://github.com/microsoft/presidio](https://github.com/microsoft/presidio)
* **Justification**: The undisputed enterprise standard for finding and masking structured PII (emails, SSNs, phone numbers) using fast regex and spaCy, causing minimal latency overhead.

### 3. The Pipeline Orchestrator & Scanners
* **Tool**: **Protect AI - LLM Guard**
* **URL**: [https://github.com/protectai/llm-guard](https://github.com/protectai/llm-guard)
* **Justification**: The definitive Python toolkit providing 35+ local scanners. Much easier to set up than NeMo Guardrails. It acts as the glue to run your custom zero-shot ML safety checks on the GPU.

### 4. The Specialized Injection Classifier
* **Tool**: **Protect AI - DeBERTa-v3 Prompt Injection**
* **URL**: [https://huggingface.co/protectai/deberta-v3-base-prompt-injection-v2](https://huggingface.co/protectai/deberta-v3-base-prompt-injection-v2)
* **Justification**: A fine-tuned classifier mathematically optimized to detect prompt injections. It is vastly superior and faster than routing prompts through a heavy 8-Billion parameter LLM.

### 5. The Deep Semantic Guardian (General Safety)
* **Tool**: **Llama Guard 3 (1B or 8B)**
* **URL**: [https://huggingface.co/meta-llama/Llama-Guard-3-8B](https://huggingface.co/meta-llama/Llama-Guard-3-8B)
* **Justification**: Provides comprehensive coverage of the MLCommons AI Safety Taxonomy (blocking violence, self-harm, child safety risks, hate speech). We chose this over Google's *ShieldGemma* because Llama Guard integrates better as an all-in-one general safety layer, whereas Gemma requires highly granular per-category tweaking.

### 6. The Localization Authority (Bahasa Indonesia)
* **Data/Tool**: **IndoSafety Dataset / Sahabat-AI**
* **URL/Entity**: [https://huggingface.co/Sahabat-AI](https://huggingface.co/Sahabat-AI)
* **Justification**: Western models (like Llama Guard) often fail to grasp Indonesian cultural nuance, code-mixing, or regional slang. To safely test and block Indonesian toxicity, use the **IndoSafety** principles and benchmark against **Sahabat-AI** (a massive open-source Indonesian LLM initiative).

---

## 4. Remediation Playbook by Risk Type

If `Moonshot` reports a High-Risk score, use this playbook:

### 5.1 Prompt Injection, Jailbreak, Prompt Extraction
* **Phase 1 (MVP)**: Turn on LiteLLM System Prompt & Jailbreak block rules. Isolated system instructions.
* **Phase 2**: Route the input string through the local **Protect AI DeBERTa-v3 Classifier** on your GPU.

### 5.2 PII Leakage and Sensitive Data Exposure
* **Phase 1 (MVP)**: Use the built-in LiteLLM regex filters.
* **Phase 2**: Route traffic through local **Microsoft Presidio** to scrub PII from both prompt and response.

### 5.3 Hallucination, Bias, and Truthfulness
* **Phase 1 (MVP)**: Leverage the checkboxes in the **LiteLLM Content Filter** targeting Bias (Gender, Racial, Religious). For Hallucination, modify the System Prompt with aggressive abstention templates: `"If the context does not contain the answer, explicitly state 'I do not know'."`
* **Phase 2 (The Local Scanners)**: Hallucinations cannot be solved purely by a UI checkbox. You must improve your RAG pipeline's search accuracy. To ensure truthfulness natively, deploy the **Fact-Checking/Provenance scanner within Protect AI LLM Guard**, which runs locally to verify if the model's output matches the retrieved documents.

### 5.4 Undesirable Content & Cultural Localization (Bahasa)
* **Phase 1 (MVP)**: Select the specific checkboxes in your `LiteLLM Content Filter` (e.g., Harmful Violence, Toxic Language, Denied Medical Advice).
* **Phase 2 (Deep Semantic)**: Run traffic through **Llama Guard 3**. 
* **Phase 2 (Indonesian Slang)**: Relying on Llama Guard in English is insufficient. Update your custom rules/scanners inside `Protect AI LLM Guard` using local datasets modeled after the **IndoSafety** research.
