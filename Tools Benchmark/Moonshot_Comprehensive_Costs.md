# Comprehensive Cost & Resource Analysis of All Moonshot Features

When evaluating all features across the four pillars of Moonshot testing, it is critical to understand the split between **Local Compute** (which is completely free) and **API Dependencies** (which incur token costs).

Moonshot’s architecture dictates that the *attacks* are usually generated locally, but the *grading/evaluation* of those attacks heavily relies on state-of-the-art "LLMs-as-a-Judge".

---

## 1. Resource Breakdown by Testing Pillar

### Pillar 1: Security & Adversarial Robustness (Red-Teaming)
*   **Attack Generations (Local Compute - FREE)**: Tools like `TextBugger`, `TextFooler`, `Homoglyph`, and `Payload Masking` are algorithmic. They run entirely on your local CPU/RAM to generate the adversarial prompts.
*   **Evaluation (API - PAID)**: The adversarial responses are usually graded by `flagjudgeannotator` (defaults to `flageval-flagjudge` API) or `gpt4annotator` (defaults to OpenAI GPT-4).

### Pillar 2: Safety, Ethics, & Policy Compliance
*   **Prompt Generation (Local Compute - FREE)**: Loading toxic datasets and generators runs locally.
*   **Evaluation (API - PAID)**: This is heavily reliant on external APIs.
    *   `llamaguardannotator`: Hits **Together AI** (`meta-llama/LlamaGuard-2-8b`).
    *   `mlc*` metrics (MLCommons IP, Hate, Violence, etc.): The `metrics_config.json` hardcodes all `mlcipv-annotator`, `mlcncr-annotator`, `mlcvcr-annotator`, etc., to use the **`openai-gpt4o`** endpoint.

### Pillar 3: Privacy & Cybersecurity Risks
*   **Leakage Evaluation (Local Compute - FREE)**: The `leakagerate` metric performs exact string matching against datasets like Enron Emails. This is 100% local and free.
*   **CyberSecEval (API - PAID)**: Meta's CyberSecEval (`cybersecevalannotator` and `cybersecevalannotator2`) are implemented via LLM judges. They default to **Azure GPT-4** (`llm-judge-azure-gpt4-annotator`) or **OpenAI GPT-4o**.

### Pillar 4: Accuracy, Faithfulness & RAG Evaluation
*   **Classical Metrics (Local Compute - FREE)**: Metrics like `bleuscore`, `rougescorer`, `bertscore`, `spelling`, and `exactstrmatch` use local Python libraries (like NLTK or HuggingFace transformers). They run locally and cost nothing.
*   **Advanced RAG Metrics (API - PAID)**: Moonshot mimics the *Ragas* framework for advanced evaluation. `answercorrectness`, `answerrelevance`, `contextprecision`, `contextrecall`, and `faithfulness` all require **both** an LLM and an Embedding Model. 
    *   **LLM Judge**: Defaults to `azure-langchain-openai-chatopenai-gpt4o` (Azure GPT-4o).
    *   **Embeddings**: Defaults to `azure-langchain-openai-embedding-ada-2` (Azure text-embedding-ada-002).

---

## 2. Hardcoded Default Endpoints Overview

If you attempt to run all Moonshot capabilities out of the box, you will be hit with billing from three distinct API providers:

1.  **OpenAI directly (`openai-gpt4o`, `openai-gpt4`)**: Used by MLCommons annotators and GPT-4 grading.
2.  **Microsoft Azure OpenAI (`azure-langchain-openai-*`)**: Heavily relied upon for RAG embeddings (Ada-2) and CyberSec evaluations.
3.  **Together AI (`together-llama-guard-2-mlccommons`)**: Used exclusively for the LlamaGuard safety metrics.

---

## 3. The "ALL LOCAL" Cost-Saving Strategy

Because almost all advanced metrics in Moonshot are routed through the `Connector.get_prediction()` interface, you can completely eliminate all of the costs above by redirecting JSON endpoints to your local **Qwen 30B** (and LlamaGuard running locally).

**What you need to do to make ALL features Free:**

1.  **Host Qwen 30B via Ollama/vLLM locally.**
2.  **Host LlamaGuard 3 via Ollama locally.**
3.  **Override the JSON Configurations:** Open `moonshot-data/metrics/metrics_config.json`.
    *   Change every instance of `"openai-gpt4o"` and `"azure-langchain-openai-chatopenai-gpt4o"` to a new custom endpoint, e.g., `"local-qwen-30b-judge"`.
    *   Change the embeddings endpoint (`"azure-langchain-openai-embedding-ada-2"`) to a local embeddings model (like `"local-nomic-embed-text"` via Ollama).
    *   Change `llamaguardannotator` to an endpoint pointing to your local LlamaGuard instance instead of Together.ai.

**Conclusion:** 
Running all Moonshot features "by the book" is designed for enterprise pockets (requiring OpenAI, Azure, and Together accounts simultaneously). However, by aggressively modifying `metrics_config.json` to point to your local Qwen 30B server, you can execute the entirety of the 4 pillars at **$0.00 API cost**.
