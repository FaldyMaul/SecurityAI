# Architectural Justification: Why Build a Custom UI Instead of Using Moonshot?

When developing the **National AI Sandbox**, a common question arises: *If Moonshot already has a Web UI, why don't we just deploy that and give users the login? Why pay developers to build a custom application?*

While Moonshot is an incredible *testing engine*, its out-of-the-box Web UI is fundamentally inadequate to serve as a national-level, enterprise compliance platform. 

Here is the detailed justification for why you must build a custom **Orchestration UI** from scratch.

---

## 1. The "Human Process" Gap (The Compliance Forms)

As established in the AI Verify Testing Framework (`aivtf-pdf.pdf`), **80% of ISO 42001 and NIST compliance revolves around human processes and written policies**, not just technical tests.

*   **Moonshot's UI Limitation:** The Moonshot UI is strictly a technical dashboard. It lets you select a model, click "Run Attack," and view a chart of the prompt injects. It **does not** have features to ask the user: *"Have you written a Data Privacy Policy?"* or *"Please upload your System Impact Assessment."*
*   **The Custom UI Solution:** A custom sandbox allows you to digitize the actual ISO 42001 compliance questionnaire. The user journey begins with a form where they answer the governance questions, upload their policy PDFs, and *then* the UI triggers the Moonshot technical test. The custom app mathematically combines the human form answers with the Moonshot technical score to generate one master **Certificate of Conformity**.

## 2. Multi-Tool Orchestration (Beyond Moonshot)

Moonshot is excellent at basic safety benchmarking, but it is not the *only* tool you need in a National Sandbox.
*   If an agency needs to test their retrieval-augmented generation (RAG) database for hallucinations, you need **DeepEval**.
*   If a highly sensitive military or financial bot needs to be tested against sophisticated multi-turn conversational hackers, you need **PyRIT**.
*   If you need to rapidly brute-force a local LLM to crash it, you need **Garak**.

*   **Moonshot's UI Limitation:** The Moonshot UI *only* runs Moonshot. You cannot click a button in Moonshot and have it launch a PyRIT conversational attack.
*   **The Custom UI Solution:** Your custom app acts as a central "Orchestrator". Behind the scenes, your Python FastAPI backend can trigger `moonshot`, `deepeval`, `garak`, or `pyrit` via their command-line interfaces. To the user, it is one seamless, unified "National Sandbox" experience.

## 3. Multi-Tenancy and Enterprise User Management

A "National Sandbox" implies that dozens of different government ministries, agencies, or private companies will be logging in to use it.

*   **Moonshot's UI Limitation:** The Moonshot UI is built as a single-tenant, local developer tool. It expects one engineer to run it locally on their laptop (`npm run dev`). It does not have robust enterprise features like Role-Based Access Control (RBAC), SSO (Single Sign-On), Organization Workspaces, or isolated databases where Agency A cannot see Agency B's test results.
*   **The Custom UI Solution:** By building a custom Next.js/React frontend with a PostgreSQL database, you can implement enterprise SaaS architecture. Agency A gets a secure dashboard. Agency B gets a secure dashboard. You have full control over who sees what data.

## 4. White-Labeling and National Branding

Trust is paramount when dealing with national-level AI security.

*   **Moonshot's UI Limitation:** The Moonshot UI is hardcoded to look like Moonshot. It carries their specific branding, logos, and color schemes.
*   **The Custom UI Solution:** A custom build allows you to completely "White-Label" the experience. You can brand it as the **"Official National AI Sandbox,"** use your organization's domain name, implement your country's official design system, and format the final PDF reports precisely matching your government's legal requirements.

---

## Conclusion

Deploying the default Moonshot UI is equivalent to giving a non-technical auditor a developer's IDE. It is too narrow, too technical, and completely ignores the human governance aspect of ISO 42001.

By investing in a lightweight Custom Orchestration UI, you transform raw, disparate open-source tools (Moonshot, DeepEval, PyRIT) into a single, cohesive, enterprise-grade **Compliance Platform** that seamlessly handles both the legal questionnaires and the advanced technical red-teaming.
