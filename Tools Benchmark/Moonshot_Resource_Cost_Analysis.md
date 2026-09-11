# Moonshot Resource Requirements & Cost Analysis

This document outlines the computational and API resources required to run **Moonshot AI Verify**. It specifically analyzes the dependencies on paid APIs (like GPT-4 and LlamaGuard) and provides a strategy for a cost-effective setup utilizing a local **Qwen 30B** model.

---

## 1. Hardcoded API Dependencies in Moonshot

Moonshot uses an "Annotator" (LLM-as-a-judge) system to automatically grade the responses of the model you are testing. Based on a deep dive into the `moonshot-data/metrics/` directory, the following external models are hardcoded as the default evaluation engines:

### 1.1 OpenAI GPT-4 (`gpt4annotator.py`)
- **Required For:** Evaluating refusal rates, exact string matching, and complex grading criteria where a classical NLP metric fails.
- **Default Endpoint:** `llm-judge-openai-gpt4-annotator`
- **Cost Impact:** This requires an active OpenAI subscription. GPT-4 API costs apply (e.g., $5.00 / 1M input tokens, $15.00 / 1M output tokens). Running thousands of red-teaming prompts through GPT-4 as a judge will become **very expensive, very quickly**.

### 1.2 Together AI LlamaGuard (`llamaguardannotator.py`)
- **Required For:** Evaluating the safety and toxicity of responses against MLCommons compliance categories (Hate, Violence, Self-Harm, etc.).
- **Default Endpoint:** `together-llama-guard-2-mlccommons` (using `meta-llama/LlamaGuard-2-8b` via Together.ai).
- **Cost Impact:** Requires a Together AI paid account/subscription. While much cheaper than OpenAI, it still incurs cloud API costs per token.

---

## 2. Using Local Free Models (Qwen 30B Strategy)

You currently have **Qwen 30B** available for free locally. You can significantly reduce costs by leveraging it, but it requires two different integration strategies depending on its role:

### Target Model (The model being tested)
- **Feasibility:** **100% Free & Supported natively.**
- **How to do it:** Moonshot natively supports **Ollama** and **HuggingFace** connectors (`ollama-llama3.json`, etc.). You can host your Qwen 30B using Ollama or vLLM locally. You simply need to create a new `qwen-30b-local.json` connector endpoint in Moonshot pointing to your `http://localhost:11434` URL. Moonshot will seamlessly attack and evaluate your local free model.

### Evaluator Model (The model judging the tests)
- **Feasibility:** Needs minor code modification.
- **The Problem:** As noted above, `gpt4annotator.py` strictly looks for an OpenAI GPT-4 endpoint. 
- **The Solution (Zero Cost):** 
  To use Qwen 30B as your strict evaluator and avoid OpenAI costs entirely:
  1. Make a copy of `gpt4annotator.py` and name it `qwen_annotator.py`.
  2. Modify the line `DEFAULT_EVALUATION_MODEL = "llm-judge-openai-gpt4-annotator"` to point to a new local endpoint file (e.g., `"local-qwen-judge"`).
  3. Create the `local-qwen-judge.json` endpoint configuration using the Ollama/OpenAI-compatible local server hosting your Qwen 30B model.
  4. Ensure your Qwen 30B has a strict system prompt instructing it to output *only* JSON or strict categorical grades (e.g., `refuse` or `not refuse`) exactly as GPT-4 does.

---

## 3. Cost Estimation Summary & Detailed Module Breakdown

If you proceed with Moonshot out of the box without modifications, you will incur costs across three main API providers depending on the testing pillar. Below is the exact breakdown of resources used by every core Moonshot feature:

### 3.1 Detailed Module Resource Split

| Evaluation Module / Feature | Default API Endpoint | Resource / Provider | Cost Dependency |
| :--- | :--- | :--- | :--- |
| **Adversarial Generators** (TextBugger, Homoglyph, Payload Masking) | N/A (Algorithmic) | Local Compute | **100% Free** |
| **Classical NLP Metrics** (BLEU, ROUGE, BERTScore, Exact Match) | N/A (Algorithmic) | Local Compute | **100% Free** |
| **Data Leakage Evaluator** (`leakagerate`) | N/A (Algorithmic) | Local Compute | **100% Free** |
| **General Accuracy Judge** (`gpt4annotator`) | `openai-gpt4` | OpenAI API | GPT-4 Token Costs |
| **MLCommons Safety Metrics** (`mlcipv`, `mlcvcr`, etc.)| `openai-gpt4o` | OpenAI API | GPT-4o Token Costs |
| **CyberSecEval Security** (`cybersecevalannotator`) | `azure...chatopenai-gpt4o` | Azure OpenAI | GPT-4o Token Costs |
| **Advanced RAG Evaluators** (`answerrelevance`, etc.) | `azure...gpt4o` + `ada-2` | Azure OpenAI | LLM + Embedding Costs |
| **LlamaGuard Safety Check** (`llamaguardannotator`) | `together-llama-guard-2` | Together AI | Together.ai Token Costs |
| **FlagJudge Evaluator** (`flagjudgeannotator`) | `flageval-flagjudge` | FlagEval | Custom API Costs |

### 3.2 Projected Costs per 10,000 Tests

| Setup Architecture | Cloud Evaluators Used | Dependent Providers | Est. Cost / 10k Tests |
| :--- | :--- | :--- | :--- |
| **Default Moonshot Sandbox** | GPT-4o, Azure Ada-2, Together LlamaGuard | OpenAI, Azure, Together | **$75 - $265 per run** |
| **Zero-Cost Local Sandbox** | Qwen 30B (as Judge), LlamaGuard 3 (via Ollama) | Local Compute | **$0.00** |

**The Zero-Cost "Local Sandbox" Architecture:**

If you configure Moonshot to utilize your local infrastructure (`http://localhost:11434`), you do not need to pay these fees. By modifying the JSON endpoint definitions inside `moonshot-data/metrics/metrics_config.json`, you can redirect all the Azure and OpenAI metrics to point to your free local Qwen 30B and local Nomic embeddings. 

*Note on Safety Judge*: You can absolutely download LlamaGuard locally via Ollama (`ollama run llama-guard3`) and point a modified `llamaguardannotator.py` endpoint at your local server. This entirely eliminates the Together AI subscription requirement.

---

## 4. Conclusion & Next Steps

Moonshot restricts you by default to paid APIs for evaluation to ensure benchmark consistency. However, because it is open-source (Python), it does not strictly gate you.

**To achieve a completely free security pipeline:**
1. Host your **Qwen 30B** and **LlamaGuard 3** on your local machine using a standard inference engine like Ollama or LM Studio.
2. Clone/modify the Moonshot annotator Python files (`gpt4annotator.py` → `qwenannotator.py`).
3. Point those customized evaluators to your local `localhost` IP.
This guarantees you maintain absolute data privacy and incur $0 in token fees.
