# LLM Guard - Analysis & Strategy Guide

This document provides a detailed breakdown of **LLM Guard** (developed by Protect AI), its technical stack, core features, expected output formats, and a comprehensive cost analysis. 

Unlike Moonshot (which acts as an offline evaluator and red-teaming tool), **LLM Guard is a real-time, runtime firewall**. It sits directly between the user and your LLM (e.g., Qwen 30B) to intercept, sanitize, and block malicious prompts *before* they reach the model, as well as filtering the response *before* it reaches the user.

---

## 1. Core Features & Capabilities

LLM Guard is designed to be a drop-in middleware security layer. Its features are strictly divided into two phases: **Input Scanners** (protecting the LLM from the user) and **Output Scanners** (protecting the user from the LLM).

### Input Scanners (User -> Firewall -> LLM)
*   **Prompt Injection & Jailbreak Defense:** Detects structure-based and semantic prompt injections designed to hijack the model's instructions (e.g., "Ignore previous instructions").
*   **PII & Secrets Redaction:** Automatically detects and masks Personally Identifiable Information (SSNs, emails, credit cards) and API keys/secrets *before* the LLM sees them. (Acts as a direct replacement for Microsoft Presidio).
*   **Toxicity & Harmful Language:** Drops prompts that contain hate speech, self-harm, or violence.
*   **Language & Tone Restriction:** Forces the user to only communicate in specified languages or blocks overly aggressive tones.
*   **Code Scanning:** Checks if the user is attempting to inject malicious code snippets.

### Output Scanners (LLM -> Firewall -> User)
*   **Data Leakage Prevention:** Ensures the LLM isn't accidentally regurgitating sensitive training data or un-redacting PII.
*   **Hallucination / Fact-Checking:** Compares the output against the source context to estimate if the model made something up.
*   **Regex / Pattern Matching:** Blocks specific IP ranges, URLs, or competitor names from being mentioned in the output.

---

## 2. Technical Stack & Output Format

### Tech Stack Integration
*   **Language:** Pure Python.
*   **Architecture & Deployment:** It is an API/Middleware layer. It can be installed as a standard Python library (`pip install llm-guard`) or deployed via a Docker container/Kubernetes as a standalone REST API Gateway.
*   **Dependencies:** Runs entirely on open-source NLP and ML models (e.g., Transformers, ONNX, SpaCy). 
*   **Interoperability:** Seamlessly integrates with **LiteLLM**, LangChain, and OpenAI-compatible endpoints.

### Expected Output Format
When LLM Guard intercepts a prompt or response, its Python functions return a tuple/JSON containing three key variables: `Sanitized Content`, `Boolean Status`, and `Risk Score`. 

**Example JSON / Python Output:**
```json
{
  "is_valid": false, 
  "sanitized_prompt": "My phone number is [REDACTED_PHONE_NUMBER]",
  "results": {
    "PromptInjection": {
      "is_valid": true,
      "risk_score": 0.05
    },
    "Anonymize": {
      "is_valid": false,
      "risk_score": 0.99
    }
  }
}
```
*   **is_valid:** If `false`, the firewall drops the request or returns an error to the user.
*   **sanitized_prompt:** If the scanner is set to *redact* rather than *block* (e.g., for PII), it rewrites the prompt safely and passes the sanitized version to the LLM.

---

## 3. Resource & Cost Analysis

The biggest advantage of LLM Guard in a modern GenAI stack is that it relies heavily on **small, specialized, local models** rather than massive LLM API calls.

### 3.1 Cost Breakdown
| Component | Provider / Execution Environment | Cost per 1M Tokens |
| :--- | :--- | :--- |
| **LLM Guard Core Framework** | OSS (MIT License) | **$0.00** |
| **PII & Secrets Scanners** | Local Regex / ONNX Models | **$0.00** (Pure Local Compute) |
| **Prompt Injection Scanners** | Local specialized NLP models (e.g., DeBERTa) | **$0.00** (Pure Local Compute) |
| **Protect AI Enterprise Platform** | Commercial License (Optional) | Paid Enterprise Contract (If you want their managed dashboard/SaaS) |

### 3.2 Computational Resources Required
Because LLM Guard does not send your data to OpenAI/GPT-4 for scanning, it requires local compute power. However, it is highly optimized:
*   **CPU Optimization:** It is built for extremely fast latency on CPUs using ONNX Runtime. Most scanners execute in single-digit milliseconds.
*   **GPU Optional:** While it can utilize a GPU to speed up injection models, a standard production server CPU is sufficient for real-time text chatting.
*   **RAM:** Requires ~2GB to 4GB of RAM to hold the local NLP models (like spaCy and DeBERTa-based injection models) in memory.

### 3.3 The Zero-Cost Architecture with Qwen 30B
When combined with your Qwen 30B model, the architecture looks like this:

1. User sends prompt.
2. **LLM Guard (Running on CPU Middleware)** intercepts prompt -> Scans for injections / PII -> (Cost: $0.00, Time: ~30ms).
3. Sanitized prompt is sent to **Local Qwen 30B (Running on GPU)** -> Generates response -> (Cost: $0.00, Time: ~1-3s).
4. Output is generated.
5. **LLM Guard (Running on CPU Middleware)** intercepts output -> Scans for leakage/hallucination -> (Cost: $0.00, Time: ~30ms).
6. Safe output delivered to User. 

## 4. Conclusion
**LLM Guard** acts as the perfect runtime companion to **Moonshot**. 
* Use **Moonshot** for offline Sandbox testing to red-team the model and generate compliance reports (NIST/ISO).
* Use **LLM Guard** in your production code to act as the active firewall, completely free of external API token costs, ensuring user queries don't compromise your local Qwen 30B.
