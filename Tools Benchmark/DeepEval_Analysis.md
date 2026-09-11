# DeepEval - Analysis & Strategy Guide

This document provides a detailed breakdown of **DeepEval** (developed by Confident AI), its technical stack, core features, expected output formats, and a comprehensive cost analysis.

While LLM Guard is a *real-time runtime firewall*, and Moonshot acts as an *offline red-teaming and adversarial testing standard*, **DeepEval is primarily a Pytest-integrated evaluation and unit-testing framework for LLM applications.** It is designed specifically for CI/CD integration and quantitative testing of RAG pipelines and agents.

---

## 1. Core Features & Capabilities

DeepEval provides an extensive library of 30+ to 50+ research-backed "LLM-as-a-judge" metrics. Unlike Moonshot's static recipes, DeepEval natively integrates with standard Python testing frameworks (`pytest`), allowing developers to treat LLM outputs just like traditional software unit tests.

### Key Evaluation Metrics
*   **RAG Metrics:** Faithfulness, Answer Relevancy, Contextual Recall, Contextual Precision, and Contextual Relevancy.
*   **Agentic Evaluation:** Task Completion, Tool Correctness (evaluating if an agent selected the right tool/function).
*   **Conversational / Memory Metrics:** Knowledge Retention (did the LLM remember turn 1 in turn 5?), Conversation Completeness, and Role Adherence.
*   **Custom G-Eval:** Allows developers to pass a plain-text grading rubric, and the framework automatically scores the model using Chain-of-Thought reasoning.
*   **Safety & Bias:** Measures Toxicity, Bias, and Harassment.

### Advanced Capabilities
*   **Synthetic Data Generation:** Uses "Evolution techniques" to artificially generate complex edge-case datasets (e.g., generating hard multi-hop queries from a single PDF) for testing.
*   **Auto-Prompt Optimization:** Can iteratively test and tweak system prompts to maximize scores.
*   **Tracing & Observability:** Automatically tracks exactly what steps a LlamaIndex or LangChain pipeline took during a test.

---

## 2. Technical Stack & Output Format

### Tech Stack Integration
*   **Language:** Python (Open-Source Apache-2.0).
*   **Execution Paradigm:** Command Line Interface (CLI) and Pytest. You literally write tests like `def test_rag_faithfulness():` and run them via `deepeval test run test_rag.py`.
*   **Compatibility:** Seamlessly traces popular frameworks (LlamaIndex, LangChain, Hugging Face, Crew AI). 
*   **Model Support:** Can use OpenAI (GPT-4o), Azure, or local Ollama models as the "Judge".

### Expected Output Format
Because it runs on top of Pytest, DeepEval outputs to the terminal like a standard testing suite, but also generates structured tracking data.

*   **Metric Output:** Every metric returns a tuple:
    1.  `score`: A float between 0.0 and 1.0.
    2.  `reason`: A verbose text string explaining *why* the judge LLM gave that score.
    3.  `is_successful()`: A boolean determined by comparing the score to a predefined threshold (e.g., > 0.5 is a PASS).
*   **Reporting:** Can automatically dump results locally into CSV or JSON files.
*   **Dashboard (Optional):** Can push traces and test runs to the web platform (Confident AI) for visual tracking of "Test Pass Rates" over time.

---

## 3. Resource & Cost Analysis

The open-source `deepeval` Python library is completely free. However, **the costs are incurred purely by the LLM-as-a-Judge API calls.**

### 3.1 Cost Breakdown
| Component | Provider / Execution Environment | Cost Impact |
| :--- | :--- | :--- |
| **DeepEval Framework (CLI/Pytest)** | OSS (Apache-2.0) | **$0.00** |
| **LLM Evaluator (e.g., GPT-4o)** | OpenAI API / Azure | **High** (Token usage for evaluating every single test case). |
| **LLM Evaluator (e.g., Local Qwen)** | Local (Ollama) | **$0.00** (Pure Local Compute). |
| **Confident AI Web Platform** | Confident AI (Commercial) | **Paid Subscription** (Required for team dashboards, SSO, and advanced cloud test tracking). |

### 3.2 The Hidden Costs of Evaluation
DeepEval can become extremely expensive if not managed properly. 
*   **Why?** To evaluate a single RAG generation for "Faithfulness", DeepEval must send the user's prompt, the RAG context, and the LLM response to an evaluator like `GPT-4o`. If you have a test dataset of 1,000 Q&As running in your nightly CI/CD pipeline, the API costs accumulate rapidly (e.g., $10-$20+ per pipeline run depending on context length).

### 3.3 The Zero-Cost Architecture with Qwen 30B
DeepEval natively supports custom models for its judges. You can integrate your **Local Qwen 30B** to bring the cost down to zero:

1. Write a custom Python class inheriting from `deepeval.models.DeepEvalBaseLLM`.
2. Inside the class, point the `generate()` function to your local Qwen 30B endpoint (`http://localhost:11434/...`).
3. Pass your custom Qwen model into the `llm=` parameter of any DeepEval metric (e.g., `FaithfulnessMetric(llm=my_custom_qwen)`).
4. **Warning:** Smaller local models (like 8B) often struggle to strictly adhere to DeepEval's internal JSON generation requirements for grading. However, your **Qwen 30B** is large and capable enough to serve as a high-quality, free judge.

## 4. Conclusion & Positioning in Your Stack
*   **Moonshot:** Best for highly structured, interactive security red-teaming (simulating real-world attacks based on MLCommons/NIST).
*   **LLM Guard:** Best as the runtime firewall protecting the actual production user endpoint.
*   **DeepEval:** Best as your internal software engineering tool. It belongs in your CI/CD pipeline (e.g., GitHub Actions) to run nightly regression tests on your RAG accuracy. Using your Qwen 30B as the backend evaluator guarantees these tests remain 100% free.
