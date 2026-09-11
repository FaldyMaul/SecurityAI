# AI Verify vs. Moonshot: What to Install for Compliance

To answer your question directly: **No, for testing an LLM like Qwen 30B, you do NOT need to install the heavy, Kubernetes/Docker-based AI Verify Core Framework.** 

Here is exactly why, how they differ, and what you should do to tell an auditor your model complies with ISO 42001.

---

## 1. The Difference Between AI Verify and Moonshot

Both tools are part of the Singapore Government's AI governance initiative, but they serve different purposes:

### **AI Verify (The Core Framework)**
*   **What it is:** A massive, enterprise-grade governance platform. 
*   **What it tests:** It was originally built for **Traditional AI** (tabular data, image classifiers, regression models). It runs tests for things like *Demographic Parity* (ensuring an HR algorithm doesn't discriminate based on age) and *Partial Dependence Plots* (Explainability).
*   **The Output:** Generates a 100+ page PDF that acts as a comprehensive governance audit report.
*   **Installation:** Extremely heavy. Requires Docker/Kubernetes because it spins up multiple microservices and databases.

### **Project Moonshot**
*   **What it is:** A specialized toolkit specifically built for **Large Language Models (LLMs)**.
*   **What it tests:** It focuses on the unique vulnerabilities of Generative AI: Prompt Injection, Toxicity, Hallucinations (RAG), and Jailbreaking.
*   **The Output:** Generates technical Benchmark Reports specifically for the safety and robustness of the LLM.
*   **Installation:** Lightweight. You already have it running via a simple Python `pip install` and `npm run dev`.

---

## 2. What Should You Do for Your Qwen 30B Model?

If your goal is to tell an auditor or model provider that your generative AI application (using Qwen 30B) complies with ISO 42001, **Moonshot is the correct tool of choice.** 

You do not need to install the Kubernetes-based AI Verify Core because Traditional AI metrics (like counterfactual explanations for tabular data) do not apply to an LLM chatting with users.

### The Actionable Workflow to Prove Compliance:

1. **Rely on the Moonshot Benchmarking Tool you already installed.** You are already running the Moonshot UI and Web API.
2. **Execute the Crosswalk Mapping:** Follow the steps in the `Moonshot_Auditor_Compliance_Guide.md` we created. Run the `mlc-ai-safety.json` and `cyberseceval` cookbooks against Qwen 30B in Moonshot.
3. **Export the Moonshot Benchmark Report:** In your locally running Moonshot UI (`localhost`), click **Download Report**.
4. **Present the Evidence:** 
   * Hand the auditor the **Moonshot Benchmark Report** as empirical proof of safety testing.
   * Hand them the **AI Verify Crosswalk PDF** (`Crosswalk-AIV-and-ISO42001-final.pdf`) to prove that the tests Moonshot just ran directly satisfy ISO 42001 clauses (like Clause A.6.2.4 "AI system verification and validation").

**Conclusion:** Moonshot operates *under* the AI Verify Foundation specifically to solve the LLM testing problem. By handing an auditor a Moonshot report mapped to the overarching AI Verify foundation standards, you successfully demonstrate ISO 42001 compliance without needing to deploy the massive traditional AI Verify Kubernetes cluster.
