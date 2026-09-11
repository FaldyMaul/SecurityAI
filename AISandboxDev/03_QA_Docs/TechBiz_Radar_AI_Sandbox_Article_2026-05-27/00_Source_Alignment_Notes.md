# Source Alignment Notes - TechBiz Radar AI Sandbox Article

Date: 2026-05-27

This note summarizes the internal and external references used to draft the TechBiz Radar 2.0 article.

## 1. Internal Product Truth Used

The article follows the current internal positioning:

- `AI Sandbox` is the internal assessment, evidence review, and promotion-eligibility layer.
- `ModelHub` is the downstream curated model catalog and model discovery surface.
- `AgentLab` is the Flowise OSS-based builder layer for AI agents and workflows.
- `APIHub` / `Apilogy` is the API marketplace and service exposure layer.
- `Executive Control Plane` is the future cross-product observability and governance view.

The article intentionally focuses on one use case:

- AI-powered evaluation of model quality, risk, and readiness before business usage.

## 2. Internal Development Status Used

From the latest AI Sandbox documentation, the current validated MVP state includes:

- backend foundation using `FastAPI`
- frontend foundation using `Next.js` and `TypeScript`
- model creation and model list integration validated
- run lifecycle validated from queued to running to completed state
- score rendering and date persistence validated
- local benchmark execution path validated for MVP using backend `BackgroundTasks`
- current scoring still uses simulation for model response behavior
- real `LiteLLM`-backed inference remains a later integration step

The article uses cautious language because the system is still MVP/pilot-oriented.

## 3. Internal Research Themes Used

From `Tools Benchmark` and `AISandboxDev` research:

- `Moonshot` is the current benchmark foundation.
- `LiteLLM` is the endpoint adapter, gateway, and control layer direction.
- `DeepEval` can support future app, RAG, and agent evaluation.
- `Garak` and `PyRIT` can support future security and red-team expansion.
- `LLM Guard` and LiteLLM guardrail capabilities can support runtime protection direction.
- Indonesian localization is important for SARA, Bahasa Indonesia, local factuality, privacy identifiers, and local regulatory context.

## 4. External References Used

External references were used only for broad credibility, not to overclaim internal readiness:

- AI Verify Foundation / Project Moonshot for LLM safety testing direction.
- NIST AI Risk Management Framework for risk management framing.
- OWASP Top 10 for LLM Applications for LLM-specific security risks such as prompt injection and sensitive information disclosure.
- LiteLLM documentation for gateway and guardrail direction.

## 5. Claim Discipline

The article avoids claims such as:

- guaranteed compliance
- zero risk
- fully automatic certification
- production-proven impact metrics
- completed national-scale platform

The article uses safer language:

- membantu
- mendukung
- berpotensi
- pada tahap awal
- dapat dikembangkan
- menjadi fondasi

