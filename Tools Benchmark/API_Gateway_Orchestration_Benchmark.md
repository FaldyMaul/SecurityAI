# AI Sandbox API Gateway & Orchestration Benchmark (Fixed Tooling)

## 1. Executive Summary

This document tracks the rationale and benchmark details for the foundational infrastructure tools of the National AI Sandbox: **The API Gateway** (Layer 0), the **Base Provider**, and the **Agent Orchestration Framework**.

Based on architectural decisions and enterprise integration requirements, these tools are **fixed** for the current iteration of the Sandbox.

---

## 2. Fixed Infrastructure Tools

| Domain | Selected Tool | OSS Status | Core Language | Rationale for Selection |
| :--- | :--- | :--- | :--- | :--- |
| **API Gateway & Routing (Layer 0)** | **LiteLLM** | Free OSS (MIT)<br>**~16k+ Stars** | **Python** (Docker Proxy) | LiteLLM standardizes over 100+ LLM APIs into the standard OpenAI format. It provides flawless cost tracking (spend per project/agent), automatic retries for rate limits, and load balancing. It is essential for managing Sandbox API quotas across the automated Python testing suite (Garak and DeepEval). |
| **LLM Provider / Base Model Platform** | **Telkom Apilogy** | Enterprise Managed | N/A | Apilogy acts as the secure, locally-hosted or curated provider for the LLMs interacting with the Sandbox. All traffic leaving the LiteLLM proxy routes through Apilogy to ensure internal enterprise compliance. |
| **Agent / Orchestration Framework** | **AgentLab (Flowise OSS)** | Free OSS<br>**~32k+ Stars** | **TypeScript, Node.js** | Flowise provides an incredibly powerful, drag-and-drop visual interface for building LangChain/LlamaIndex agents. It democratizes the creation of RAG pipelines and custom conversational AI, allowing rapid prototyping of the AI tools that the Sandbox will subsequently evaluate. |

---

## 3. Deep Dive: Why LiteLLM is the Ultimate Gateway

While there are alternatives (like Portkey or Langfuse's internal gateway), **LiteLLM Proxy Server** is the undisputed champion for open-source AI Gateways.

1.  **Universal Translator:** The backend Python Suite (Garak, Giskard, DeepEval) expects OpenAI-formatted API endpoints. LiteLLM instantly translates requests to Anthropic, Google Vertex, or specialized local models, meaning the testing pipeline code never has to change.
2.  **Cost Control:** Red-teaming with tools like Garak and PyRIT consumes massive amounts of tokens. LiteLLM intercepts every call, tracks the token count, and logs the exact cost in IDR/USD, preventing budget overruns during automated CI/CD testing.
3.  **Resilience (Fallbacks):** If a primary model fails during a 10,000-prompt Garak scan due to API rate limits, LiteLLM automatically falls back to a secondary model, ensuring the security test completes without failing the pipeline.

## 4. Architectural Integration Summary

The integration between these fixed tools forms the backbone of the Sandbox environment before any evaluation begins:

1.  A developer uses **AgentLab (Flowise)** to visually construct a new RAG Chatbot.
2.  Flowise makes API calls, which are routed directly through **LiteLLM**.
3.  **LiteLLM** logs the token cost, standardizes the request, and forwards it to the **Apilogy** enterprise endpoint.
4.  Once the Agent is built, the Sandbox Security Scanners (Garak, Giskard) send their attack payloads to the Agent's endpoint, with traffic also passing through LiteLLM for cost-monitoring.
