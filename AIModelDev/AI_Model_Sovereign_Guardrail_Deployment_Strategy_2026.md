# AI Model Sovereign Guardrail Deployment Strategy (Zero-Subscription / Local GPU) 2026

Last updated: 2026-04-07

## 1. Objective and Constraints

This deployment strategy focuses specifically on **setting up guardrails and improving main model benchmark scores (Moonshot tests)** while strictly adhering to your infrastructure constraints:
- **Zero API Subscription Cost**: No reliance on third-party security APIs like AWS Bedrock, OpenAI Moderation, or Lakera.
- **Sovereign Deployment**: Maximum utilization of your existing self-hosted GPU servers for data privacy.
- **Wrapper-First Methodology**: We will improve the system's overall safety score by wrapping the model in controls *before* we attempt to fine-tune or replace the primary model itself.

---

## 2. The Sovereign Guardrail Architecture (Optimized 2026 Stack)

Based on our existing taxonomy (`AI_Model_Development_Taxonomy_Guardrail_Remediation_Research_2026.md`) and the latest 2026 security benchmarks, the architecture takes a layered, "wrapper-first" approach using the most optimal open-source toolings available.

### Layer 1: The Zero-Cost Gateway (LiteLLM)
Before traffic even touches your GPU servers, it will route through the **LiteLLM Content Filter** (as seen in your UI).
- **Function**: Catches ~80% of standard attacks (baseline Toxicity, explicit Jailbreaks, Data Exfiltration).
- **Action**: Enable these toggles in the UI immediately. It requires no GPU compute and no coding effort.

### Layer 2: The Data Privacy Layer (Presidio / Protect AI)
- **Function**: Detects and anonymizes PII (Personally Identifiable Information) before it reaches the main model.
- **Optimum Tool Choice**: **Microsoft Presidio** remains the absolute undisputed industry standard for fast, regex/spaCy-based structured PII masking. Alternatively, you can use the PII scanner built directly into the **Protect AI LLM Guard** toolkit (Layer 4) if you want all your python components bundled together. Both run entirely locally.

### Layer 3: The Sovereign Classifier Models (DeBERTa-v3 / Llama Guard)
Because you own your GPU servers, you can run advanced semantic protection without API costs. 
- **Function**: Deep semantic analysis of prompts to catch injection that bypasses LiteLLM.
- **Optimum Tool Choice**: For Prompt Injection specifically, **Protect AI's DeBERTa-v3** is the industry standard—it is faster, lighter, and more accurate at catching injections than heavy LLMs. For general Toxicity/Hate, deploy **Llama Guard 3**. 
- **Integration Hack**: Wire your local classifier endpoints into LiteLLM's existing custom guardrail webhooks.

### Layer 4: The Hallucination Orchestrator (LLM Guard / NeMo Guardrails)
- **Function**: Truthfulness enforcement and complex context management. 
- **Optimum Tool Choice**: **Protect AI's LLM Guard** is highly recommended as a comprehensive, production-ready framework (with 35+ local scanners). **NeMo Guardrails** is an alternative but is heavier, requiring custom `Colang`. Deploy these *only* if the underlying app operates in domains dictating strict citations.

---

## 3. How to Improve Benchmark Scores (Remediation Tactics)

If Moonshot returns a high-risk score on the main model, apply these tactics in order:

### For 5.1 Prompt Injection / Jailbreaks
- **Tactic 1**: Enable LiteLLM's System Prompt & Jailbreak block rules.
- **Tactic 2**: Apply strict separation of `system`, `developer`, and `user` content. 
- **Tactic 3**: If score remains poor, route prompts through a local **DeBERTa-v3 Prompt Injection Classifier** on your GPU server. 

### For 5.3 Hallucination and Unsupported Claims
- **Tactic 1**: Improve your search retrieval (RAG) chunking strategy.
- **Tactic 2**: Modify the system prompt with strict abstention templates.
- **Tactic 3**: Apply `Guardrails AI` provenance local validators to force citation checks.

### For 5.4 Undesirable Content (Toxicity, Violence, Self-Harm, Safety, Unsafe Advice)
If your model produces or accepts hate speech, violent content, self-harm discussions, child safety violations, illegal weapons discussions, or unsafe specialized advice (medical/legal), follow this layered defense:
- **Tactic 1 (The Gateway)**: Enable the specific filters in the **LiteLLM Content Filter UI**. The UI has dedicated checkboxes for: *Harmful Violence, Harmful Self-Harm, Harmful Child Safety, Harmful Illegal Weapons, Toxic & Abusive Language, and Denied Medical/Legal/Financial Advice*.
- **Tactic 2 (The Local Scanners)**: Use **Protect AI's LLM Guard** locally. You can use its `Toxicity` scanner and configure the `BanTopics` scanner with zero-shot classifiers to explicitly block domains like "illegal weapons" or "self-harm strategies".
- **Tactic 3 (The Deep Semantic Guardian)**: Route traffic through **Llama Guard 3 1B/8B** on your GPU server. Llama Guard natively implements the *MLCommons AI Safety Taxonomy*, which is mathematically trained specifically to classify and block those exact vulnerability categories.
---

## 4. Execution Roadmap (Q2/Q3 2026 Focus)

Following the `AI_Model_Development_Quarterly_Roadmap_2026_2027.md`, your immediate execution steps are:

**Q2 2026 (Operationalizing the Baseline):**
- Lock in the `LiteLLM` gateway. Activate built-in UI content filters.
- Run Moonshot benchmarks and record the failure categories.
- Deploy local `Presidio` for PII protection.

**Q3 2026 (Strengthening with GPUs):**
- Spin up `Llama Guard 3` on the local GPU servers.
- Connect Llama Guard to LiteLLM to serve as the "Layer 3" catch-all for toxic/jailbreak prompts.
- Implement localized safety coverage for Indonesian traffic.

**Q4 2026 (Hardening):**
- If hallucination dictates, pilot `NeMo Guardrails` for strict output grounding.
- Review wrapper-first architecture to see if main-model fine-tuning is actually necessary (usually, it isn't).

---

## 5. Recapping for the AI Sandbox (For Cross-Agent Alignment)

*Context for frontend/backend agents planning the AI Sandbox:*

1. **The Policy**: The AI Sandbox must be designed to respect the wrapper-first architecture. Any model registered in the AI Sandbox **must** be routed through the `LiteLLM` gateway proxy, not queried directly.
2. **The Scoring Gate**: A model cannot be promoted or marked "Safe" in the AI Sandbox unless it passes the `Moonshot` benchmark runs.
3. **The Remediation Loop**: If the Sandbox UI displays a "High Risk" rating for a model, the fix is not performed in the Sandbox UI. The AIModelDev team will implement a new wrapper check (e.g., local Presidio or Llama Guard update) at the gateway layer and trigger a retest in the Sandbox.
