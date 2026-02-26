# AI Sandbox Frontend & UI Tools Benchmark

## 1. Executive Summary

This document evaluates the Graphical User Interface (GUI) and Frontend management tools available for the National AI Sandbox. 

While core testing engines (like Garak and DeepEval) run primarily via Python scripts, a robust Frontend or "Hub UI" is necessary for stakeholders to interpret results, manage test runs, and view visual dashboards. Furthermore, based on strict requirements, the chosen UI must be **100% Free Open-Source Software (OSS)** without enterprise feature-gates, and it must deeply integrate with **LLM Security Posture Management**.

We benchmarked dedicated open-source LLM Observability platforms to identify the best tool for the Sandbox's unique security and reporting needs.

---

## 2. OSS Frontend & Hub UI Capability Comparison

The table below breaks down the frontend visualization and management capabilities of the primary observability platforms.

| Tool UI / Hub | OSS Status & GitHub Stars | Core Focus & Tech Stack | Visualizations & Dashboards | Key Strengths & Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Langfuse** | Free OSS Core<br>**~22k Stars** | **General Observability**<br>*(TypeScript, Next.js, Postgres)* | High-end observability, tracing, prompt management, and metrics dashboards. | **Strengths**: Best-in-class UI for general LLM tracing. Massive community.<br>**Limitations**: Fails the pure OSS test; critical team features (RBAC, advanced security) require a paid Enterprise License. |
| **Promptfoo Web Viewer** | Free OSS<br>**~10.6k Stars** | **Local Regression Testing**<br>*(TypeScript)* | Matrix views of prompt outputs vs. expected results. | **Strengths**: Fastest local setup (`promptfoo view`).<br>**Limitations**: Only shows Promptfoo results natively. Lacks a persistent database for Management. |
| **Arize Phoenix** | Free OSS<br>**~8.5k Stars** | **Data Science & Evals**<br>*(Python, OpenTelemetry)* | Detailed traces of LLM decision-making, UMAP visualizations for dataset evaluation. | **Strengths**: 100% free with no feature gates. Excellent for troubleshooting RAG.<br>**Limitations**: Geared heavily toward data scientists; lacks built-in security guardrail dashboards out-of-the-box. |
| **OpenLIT** | Free OSS<br>**~2k Stars** | **LLM Security Posture**<br>*(OpenTelemetry, Python)* | Real-time Guardrail metrics, Data Leak Detection, GPU monitoring. | **Strengths**: Purpose-built for AI Engineering and Security. 100% free.<br>**Limitations**: Very small community (2k stars). Still primarily an engineering trace viewer, not a Management Governance portal. |
| **AI Verify / Moonshot** | Free OSS<br>*(~300 Stars)* | **Compliance Checklists**<br>*(TypeScript, React)* | Formalized UI aligned with IMDA standards. | **Strengths**: Generates PDF reports.<br>**Limitations**: Extremely low adoption. Manual checklist approach rather than automated telemetry. |

---

## 3. The Honest Reality: There is No "Perfect" Free OSS UI

After deep researching Langfuse, Phoenix, OpenLIT, and AI Verify, it is clear that **forcing any of these tools to act as the overarching "National Sandbox UI" is a mistake.** 

Here is why:
1.  **They are built for Engineers, not Management:** Tools like Phoenix and OpenLIT are "Observability" platforms. They are designed for data scientists to look at complex telemetry traces, span latencies, and token counts.
2.  **Enterprise Traps:** Tools that *do* have nice team management and governance dashboards (like Langfuse or Giskard Hub) lock those features behind massive Enterprise Paywalls.
3.  **Fragmented Workflows:** None of these tools natively combine a vulnerability scanner (like Garak) and an OWASP Top 10 compliance checklist into a single, management-friendly view without heavy customization.

## 4. The Recommendation: Build a Custom "Sandbox Portal"

Because we have a strict requirement for **100% Free** software, and we need to serve three very distinct personas (AI Engineers, Product Managers, and IMDA/Management Auditors), the only proper architectural decision is to **build a custom, lightweight Web Portal (e.g., in Vue.js or React)**.

Instead of trying to force a pre-built observability tool to act as a governance dashboard, we build our own "pane of glass" that simply reads the JSON outputs from our Python backend tools.

### 1. The Real-Time Developer Observability (Optional)
*   **The Tool**: **Arize Phoenix** (Running locally)
*   **The Use Case**: The AI Engineer uses this purely as a background "flight recorder" to debug why an Agent failed a specific prompt injection by looking at the raw OpenTelemetry traces. 

### 2. The Sandbox Web Portal (The Main UI)
*   **The Tool**: **Custom Vue.js / React App (National Sandbox Dashboard)**
*   **The Flow**: When a PM uploads an AI Agent, the Python testing suite (Garak, DeepEval) runs in the backend. When finished, it outputs a single JSON file with the scores. The Custom Dashboard reads this JSON and displays a simple, beautiful traffic-light system (Red/Yellow/Green) for "Accuracy", "Bias", and "OWASP Context".
*   **The View**: The PM logs into the portal, sees their specific Agent, and sees exactly what tests passed or failed in plain language, without seeing confusing developer logs.

### 3. The Static Compliance Report (For Management / Government)
*   **The Tool**: **CI/CD Pipeline PDF Generator (Integrated into Custom Portal)**
*   **The Flow**: Management logs into the Custom Sandbox Portal, selects a "Certified Agent", and clicks "Download Report". The backend converts the exact test JSON into a formal, stamped PDF covering IMDA standards and OWASP Top 10 compliance. 
*   **The View**: A static, un-editable official read-out.
