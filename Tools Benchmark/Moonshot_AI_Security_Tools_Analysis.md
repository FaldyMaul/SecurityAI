# Moonshot AI Security Tools Analysis

## 1. Executive Summary

This document provides a comprehensive analysis of the internal tools, metrics, and attack modules used by **AI Verify Foundation's Project Moonshot**. It also compares its architecture and tool selection against the `AI Sandbox Tools Benchmark` and evaluates its alignment with global AI security standards like **NIST AI RMF** and **ISO 42001**.

Contrary to architectures that orchestrate multiple heavy third-party external tools (like combining DeepEval, Garak, and Giskard), Moonshot adopts a **Native Python Plugin Architecture**. It implements a massive library of its own attack modules and metric evaluators natively, or wraps specific foundation models (e.g., LlamaGuard, CyberSecEval) directly.

---

## 2. Moonshot Internal Tools & Modules Benchmark

The table below catalogs Moonshot’s internal tooling approach based on its `moonshot-data` repository modules.

| Layer Focus | Moonshot's Implementation | Sandbox Benchmark Equivalent | Why it works (Applicability & Security Focus) | Key Indicators / Metrics Tracked |
| :--- | :--- | :--- | :--- | :--- |
| **Vulnerability & Payload Scanner** | **Native Attack Modules** (`textbugger_attack.py`, `homoglyph_attack.py`, `payload_mask_attack.py`) | **Garak** | Moonshot does not rely on Garak. Instead, it natively applies adversarial permutations (homoglyph, textfooler) and masks payloads to bypass basic string-matching guardrails. It is highly applicable for strict penetration testing. | Payload bypass rate, robustness against spelling perturbations. |
| **Adaptive Red-Team / Jailbreaks** | **Generators** (`malicious_question_generator.py`, `violent_durian.py`, Jailbreak Recipes) | **PyRIT / Garak** | It uses targeted generators and pre-baked jailbreak datasets (e.g., `jailbreak-dan.json`) combined with Meta's **CyberSecEval** annotators to red-team for prompt injection and cyber threats. | Jailbreak Success Rate, CyberSecEval Risk Score. |
| **Accuracy & RAG Evaluator** | **Native Metrics Library** (`faithfulness.py`, `answerrelevance.py`, `contextprecision.py`) | **DeepEval / Ragas** | Moonshot implements exact equivalents of Ragas/DeepEval metrics directly in its codebase. It uses classic NLP metrics alongside LLM-as-a-judge (`gpt4annotator`, `flagjudgeannotator`) without requiring the whole DeepEval framework. | Faithfulness, Answer Relevancy, Context Recall. |
| **Ethical / Safety Scanner** | **Safety Annotators** (`llamaguardannotator.py`, `lionguardclassifier.py`, `mlc-*` recipes) | **Giskard** | Highly aligned with MLCommons (MLC) AI Safety benchmarks and IMDA/Singapore context (LionGuard). Excellent for catching toxicity, bias, and undesirable content. | Toxicity Classification, Gender Bias Disparity, NudeNet score. |
| **Privacy Firewall** | **Leakage Metrics** (`leakagerate.py`, `privacy-enronemails.json`) | **LLM Guard / Presidio** | Moonshot tracks data leakage post-generation over live interception. It calculates the leakage rate of sensitive training/context data. | PII Leakage Volume / Rate. |

---

## 3. Applicability & Connection to Global Standards

### The Current State of Standards Alignment
Moonshot groups its tests into **"Recipes"** (specific test parameters) and **"Cookbooks"** (collections of recipes). 
Currently, Moonshot heavily indexes on two specific standard frameworks:
1. **MLCommons (MLC) AI Safety**: It has an extensive cookbook (`mlc-ai-safety.json`) and dozens of related recipes (`mlc-ipv-*`, `mlc-vcr-*`) mapping directly to MLCommons definitions of hazard categories (e.g., Hate speech, Violence, Sexual content).
2. **Singapore IMDA Context**: Native cookbooks mapping to `singapore-pofma-statements` and SGD contexts using locally trained classifiers like `lionguardclassifier.py`.

### Need for Refinement (ISO 42001 / NIST AI RMF)
While the *technical execution* of Moonshot covers the critical security domains of NIST AI RMF (Measure and Manage features) and ISO 42001 (Risk Assessments), **the taxonomy currently lacks explicit mapping to these standards.**

**Refinement Strategy:**
To make Moonshot immediately applicable for enterprise governance tracking against ISO/NIST, the following refinements are recommended:
*   **Create a `nist-ai-rmf.json` Cookbook**: Group existing MLCommons safety recipes, exact matching metrics, and data leakage metrics under NIST categories (`Measure-2.1` Security, `Measure-2.2` Safety, `Measure-2.4` Privacy). 
*   **Create an `iso-42001.json` Cookbook**: Map the outputs of the `cybersecevalannotator.py` and adversarial attack modules to ISO/IEC 42001 Annex A controls (e.g., A.7.2 AI system testing, A.7.4 Vulnerability Management).
*   **Pre-execution Guardrails**: Moonshot acts strictly as an evaluator. To map to NIST RMF's "Manage" function in production, a real-time firewall like **LLM Guard** (as proposed in the Sandbox Benchmark) is still required to block traffic *during runtime*, working in tandem with Moonshot's offline red-teaming.

---

## 4. Conclusion: Moonshot vs. The Unified Python Stack

*   **Replacing Dependencies:** If Moonshot is adopted as the core testing engine for the Sandbox, there is **no need to install DeepEval or Giskard**. Moonshot's native `metrics` library and safety annotators already cover this territory natively in Python.
*   **Gaps to Fill:** Moonshot is a testing and evaluation standard, not a real-time defense mechanism. The Sandbox will still require an API Gateway (like **LiteLLM**) and a runtime firewall (like **LLM Guard**) to provide comprehensive end-to-end security when deploying models to users. 
*   **Customization:** Moonshot's architecture is highly extensible. By writing custom JSON recipes, engineers can seamlessly brand and map tests to internal ISO/NIST compliance checklists, generating a unified risk report.
