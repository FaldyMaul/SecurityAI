# Giskard - Analysis & Strategy Guide

This document provides a detailed breakdown of **Giskard** (an open-source AI testing and evaluation framework), its technical stack, core features, expected output formats, and a comprehensive cost analysis.

Giskard occupies a unique space in the AI ecosystem. While Moonshot focuses heavily on adversarial red-teaming and compliance recipes, and DeepEval acts like a pure Pytest CI/CD library, **Giskard is designed as an end-to-end "Quality Assurance (QA) Platform" for ML/LLMs that bridges the gap between software engineers, data scientists, and business stakeholders.**

---

## 1. Core Features & Capabilities

Giskard was originally built to test classic tabular ML models, but has recently heavily pivoted into LLM and RAG evaluation. It offers automated scanning alongside a collaborative visual workspace.

### Key Evaluation Features
*   **The Automated LLM Vulnerability Scanner:** You can wrap your LLM/Agent in Giskard, and the scanner will automatically barrage it with prompts to detect vulnerabilities like:
    *   Prompt Injections (Jailbreaks)
    *   Data Leakage & Sensitive Information Disclosure
    *   Hallucinations & Misinformation
    *   Toxicity, Harmful Content, and Stereotypes/Bias
    *   Formatting Issues (e.g., Schema violations, ignoring instructions)
*   **RAG Evaluation Toolkit (RAGET):** Specifically designed to test Retrieval-Augmented Generation. Giskard automatically generates a dedicated evaluation dataset (Q&A pairs) from your Knowledge Base and assesses the accuracy of individual components: the *Generator*, *Retriever*, *Rewriter*, and *Router*.
*   **Custom Test Suites:** You can write your own custom domain-specific tests or pull from an open-source catalog of test heuristics.

### The "Human-in-the-Loop" Platform
Unlike purely code-based frameworks, Giskard excels at collaboration:
*   Provides a **Collaborative Red-Teaming Playground** where non-technical domain experts can manually poke the model and flag toxic or hallucinated responses.
*   Allows teams to define policies, establish Ground Truths, and visually approve or reject tests before they block a deployment.

---

## 2. Technical Stack & Output Format

### Tech Stack Integration
*   **Language:** Open-source Python library (`pip install giskard`).
*   **Execution Paradigm:** Can run entirely inside a Jupyter Notebook, Python script, or integrate directly into CI/CD pipelines (GitHub Actions, GitLab CI).
*   **Ecosystem Compatibility:** Integrates natively with Hugging Face, LangChain, LlamaIndex, PyTorch, pandas, MLflow, and cloud providers (AWS, Azure, GCP).
*   **Model Support:** Uses LLMs to evaluate other LLMs. It supports OpenAI (GPT-4), Mistral, and local open-source models via Ollama.

### Expected Output Format
Giskard provides both code-level and business-level reporting:

*   **Jupyter / CLI Output:** When running `scan()`, it aggressively prints out a detailed report inside the console/notebook, listing vulnerabilities found, the specific prompts that triggered them, and a severity score.
*   **Metrics:** It provides quantitative scores like Bias Score, Toxicity Score, Output Variability, and Grounding Score (for RAG).
*   **Visual Dashboard:** The Giskard UI Hub (when deployed) creates beautiful, visual report cards. It highlights failures and provides an interactive interface to debug the root causes of formatting errors or schema violations.

---

## 3. Resource & Cost Analysis

Giskard utilizes a "freemium" open-core model. The core Python testing library is free, but the collaborative Hub and advanced Enterprise features are paid. Furthermore, like DeepEval, the *act of testing* incurs LLM API costs.

### 3.1 Cost Breakdown
| Component | Provider / Execution Environment | Cost Impact |
| :--- | :--- | :--- |
| **Giskard Python Library (Testing & Scanning)** | OSS (Apache 2.0) | **$0.00** |
| **LLM-Assisted Detectors (Default: OpenAI)** | OpenAI / GPT-4 | **High** (Token usage to generate adversarial prompts and grade responses). |
| **LLM-Assisted Detectors (Local: Qwen 30B)** | Local (Ollama) | **$0.00** (Pure Local Compute). |
| **Giskard Hub (Visual Workspace)** | OSS self-hosted (Basic) | **$0.00** (Requires your local VM compute). |
| **Giskard Cloud / Enterprise Suite** | Paid Service | **Custom Enterprise Pricing** (For managed cloud, SSO, compliance reporting, and team collaboration). |

### 3.2 The Zero-Cost Architecture with Qwen 30B
Because Giskard's automated scanner relies heavily on a "Judge LLM" to generate the attacks and evaluate the answers, using GPT-4 for everything becomes expensive fast. However, it natively supports Ollama:

1. Connect Giskard to your local **Qwen 30B** via the LangChain/Ollama integration.
2. In Giskard's configuration, set the `llm_client` to point to your `http://localhost:11434` instance.
3. Giskard will now use Qwen 30B to generate the synthetic RAG questions, formulate the adversarial jailbreaks, and act as the judge determining if a response was truthful or toxic.
4. **Note:** Ensure your local machine has sufficient GPU/RAM resources, as Giskard can generate *thousands* of requests during a comprehensive scan.

## 4. Conclusion & Positioning in Your Stack
*   **Moonshot:** Standardized, CLI-driven red-teaming focused on strict predefined compliance recipes (NIST/MLCommons). 
*   **LLM Guard:** The real-time runtime firewall sitting in front of the application blocking malicious inputs.
*   **DeepEval:** The developer-centric, Pytest CI/CD tool for daily engineering checks.
*   **Giskard:** Best suited for teams where non-technical domain experts (Audit, Legal, Business Owners) need a visual dashboard to review RAG answers, participate in red-teaming, and sign off on a model's safety before deployment. You use the free library combined with Qwen 30B to eliminate API costs while gaining enterprise-grade QA reporting.
