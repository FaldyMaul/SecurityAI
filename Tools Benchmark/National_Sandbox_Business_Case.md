# Business Case: National AI Sandbox Cost & Licensing

When building a custom "National AI Sandbox" that acts as a wrapper and orchestrator for underlying open-source security tools (*Moonshot, LLM Guard, DeepEval, Giskard, Garak, PyRIT*), you must evaluate two critical factors: **Legal Licensing** (Can you sell it?) and **Build Costs** (How much to develop the wrapper?).

---

## 1. Licensing & Commercial Viability
**The great news:** You are legally permitted to build a commercial product wrapped around these tools and sell it to others as a service (SaaS) or an enterprise platform.

Every single tool we evaluated uses a highly permissive open-source license:
*   **Moonshot (AI Verify Foundation):** [Apache License 2.0]
*   **LLM Guard (Protect AI):** [MIT License]
*   **DeepEval (Confident AI):** [Apache License 2.0]
*   **Giskard:** [Apache License 2.0]
*   **Garak (NVIDIA):** [Apache License 2.0]
*   **PyRIT (Microsoft):** [MIT License]

### What this means for your product:
*   **You can sell it:** Both MIT and Apache 2.0 licenses explicitly permit commercial use, modification, and distribution.
*   **You can modify their code:** You can fork their repositories or write custom adapters without having to open-source your proprietary custom UI or backend orchestrator.
*   **Your only requirement:** You must include a copy of the original copyright notice and license in your software documentation (e.g., an "Acknowledgements" or "Open Source Licenses" page in your web app), and for Apache 2.0 tools, state if you made significant changes to their core code.

---

## 2. Estimated Cost to Build (CapEx)

You are not building these complex testing engines from scratch; you are building an **Orchestrator Platform** (A beautiful UI, a user management system, an API backend, and a unified reporting dashboard).

### Development Team Required
To build a robust Minimum Viable Product (MVP) Version 1.0, you will need a lean, specialized team for approximately **3 to 4 months**:
*   **1x Lead AI/Security Engineer:** To write the Python adapter scripts that seamlessly trigger Moonshot, Garak, and PyRIT, and parse their complex JSONL outputs.
*   **1 or 2x Full-Stack Developers (Next.js / FastAPI):** To build the web portal, the compliance questionnaires, user authentication, and the database architecture.
*   **1x UI/UX Designer:** To ensure the dashboard looks like a premium "National" enterprise product (making the raw `.json` outputs look like beautiful safety scorecards).

**Estimated Software Development Cost:** Depending on your geographical region and whether you use an in-house team vs. an agency, building this custom orchestration wrapper will cost approximately **$40,000 to $120,000 USD** in developer salaries/fees to reach a polished, production-ready v1.0.

---

## 3. Estimated Running Costs (OpEx)

Because you are using the tools locally and taking advantage of the "Zero-API-Cost Qwen 30B" architecture we designed, your monthly running costs are exceptionally low compared to building this on OpenAI's GPT-4.

| Infrastructure Component | Purpose | Estimated Monthly Cost |
| :--- | :--- | :--- |
| **Web Server (Vercel / AWS ECS)** | Hosting the Next.js Frontend and FastAPI Backend. | **$50 - $200 / month** |
| **Database (PostgreSQL / Supabase)** | Storing user accounts, their saved compliance questionnaires, and test history. | **$30 - $100 / month** |
| **GPU Server (For Qwen 30B)** | To host Qwen 30B as the backend "Judge/Attacker" model for Moonshot and PyRIT. Requires ~24GB-48GB VRAM (e.g., 1x RTX A6000 or AWS `g5.2xlarge`). | **$500 - $1,500 / month** *(Can be lower if spun down when not in use).* |
| **LLM API Tokens** | To run the tests. | **$0.00** *(Everything runs locally through Qwen).* |

### Total OpEx
Your monthly running cost to support this entire National AI Sandbox platform will be roughly **$600 to $1,800 USD per month**. 

## 4. Conclusion
By utilizing permissive open-source frameworks (MIT/Apache 2.0) and building a custom orchestration layer, you completely avoid vendor lock-in and high licensing fees. You can build a highly lucrative, compliant, and branded Enterprise AI Security platform for a very reasonable upfront development cost, while maintaining a near-zero marginal cost of testing thanks to your local Qwen 30B architecture.
