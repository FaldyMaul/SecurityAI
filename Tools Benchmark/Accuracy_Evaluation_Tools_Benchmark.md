# AI Sandbox Accuracy & CI/CD Evaluator Benchmark (Layer 1)

## 1. Executive Summary

This document evaluates the **Accuracy Benchmarking and CI/CD Evaluation frameworks** (Layer 1) for the National AI Sandbox. This layer is responsible for the systematic testing of an LLM's outputs against expected baselines, focusing on accuracy, regression testing, and objective metrics (e.g., ROUGE, Faithfulness, Answer Relevancy).

This benchmark compares three of the most popular open-source evaluation tools: **Promptfoo**, **DeepEval**, and **Ragas**, to determine the best approach for continuous evaluation within the Sandbox pipeline.

---

## 2. OSS Evaluator Capability Comparison

The table below breaks down the primary open-source frameworks for LLM evaluation.

| Evaluator Tool | OSS Status & GitHub Stars | Core Language & Tech Stack | Primary Focus | Docs & Community | Key Strengths & Limitations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DeepEval** *(Confident AI)*<br>*(Top Recommendation)* | Free OSS<br>**~13.8k Stars** | **Python** (Native Pytest integration) | **Comprehensive Evaluation.** "Pytest for LLMs". Covers 50+ research-backed metrics including G-Eval, Hallucination, and Toxicity. | **Strengths**: Incredibly deep metrics natively built for Python CI/CD. Perfectly integrates with Garak & LLM Guard for a Unified Python Stack.<br>**Limitations**: Python-centric workflow (which is actually a benefit for the Sandbox's architectural alignment). |
| **Ragas** | Free OSS<br>**~12.7k Stars** | **Python** | **RAG Evaluation.** Specifically designed for Retrieval-Augmented Generation pipelines. | **Strengths**: Best-in-class for measuring Context Precision, Context Recall, and Faithfulness of RAG systems.<br>**Limitations**: Highly specialized for RAG; less suited for general conversational LLM benchmarking. |
| **Promptfoo** | Free OSS<br>**~10.6k Stars** | **TypeScript** / Node.js (Language Agnostic CLI) | **Regression & Prompt Testing.** Matrix testing of prompts across multiple models. | **Strengths**: Unmatched speed and ease of use. Uses simple YAML configs.<br>**Limitations**: Written in TypeScript, immediately fragmenting the Python-based Sandbox architecture. Cannot share the same runtime traces as Garak/LiteLLM. |

---

## 3. Deep Dive Insights

### A. The "Speed & Simplicity" Champion: Promptfoo
**Promptfoo** relies on a blazing-fast CLI and simple YAML files. Developers define a prompt, a set of variables, and "assertions" (e.g., `contains-all`, `is-json`, `llm-rubric`). When integrated into Gitlab/GitHub actions, it runs instantly and breaks the build if a regression is detected. It is perfectly suited as the **Baseline CI/CD tool** because it treats prompt engineering like traditional unit testing.

### B. The "Deep Python" Champion: DeepEval
**DeepEval** is built to feel exactly like `pytest`. For teams deep in Python (using LangChain or LlamaIndex), DeepEval is incredibly powerful. It offers advanced, research-backed metrics out of the box that evaluate *how* the AI thinks (e.g., G-Eval criteria). If the Sandbox needs complex, multi-turn conversational evaluation and strict mathematical grading of hallucinations, DeepEval is superior to Promptfoo.

### C. The "RAG Specialist": Ragas
If the overarching architecture relies heavily on Vector Databases and retrieving external documents (RAG), **Ragas** is mandatory. Promptfoo and DeepEval can evaluate the *final output*, but only Ragas intricately scores the *retrieval* mechanisms (Context Precision/Recall).

---

## 4. Strategic Recommendation for the Sandbox Evaluator

For a true "Platform-as-a-Service" (PaaS) architecture, the testing engine must be completely automated, easily triggerable from a web portal, and natively compatible with the other Sandbox tools (Garak, Giskard, LiteLLM, LLM Guard).

**The Winner: DeepEval (The Unified Python Stack)**

If the Sandbox selects Promptfoo, the architecture breaks into two disconnected halves (TypeScript for Accuracy, Python for Security). If the Sandbox selects **DeepEval**, the entire evaluation pipeline becomes universally Python-native.

1.  **PaaS Automation:** DeepEval behaves like `pytest`. A single backend command triggered from the **Custom Sandbox Portal** can run both DeepEval (Accuracy) and Garak (Security) in the exact same Docker container.
2.  **Shared Tracing:** Because DeepEval is Python, its OpenTelemetry traces merge perfectly with LiteLLM and LLM Guard into a single payload for the UI to consume.
3.  **Advanced Metrics:** It provides strict mathematical grading (Answer Relevancy, Faithfulness) via LLM-as-a-judge, which directly outputs as a JSON score for the Management Compliance PDF.

*(Note: Ragas can be imported into the DeepEval suite if highly specialized RAG chunk-retrieval metrics are required for a specific Apilogy model, as both are Python libraries).*

**Summary of Architecture:**
*   **The PaaS Testing Engine:** -> `DeepEval` (Python). Triggered automatically via CI/CD when a PM requests certification on the Custom Portal.
*   **The Result Delivery:** -> Outputs JSON scores directly to the Custom Portal for Dashboard Visualization.
