# How to Use the AI Verify Testing Framework PDF

You highlighted the `aivtf-pdf.pdf` document. This document is the ultimate "checklist" provided by the Singapore government. 

**The Short Answer:** Yes, your organization *should* fill out a form like the one in that PDF to achieve compliance. But you must understand that the PDF requires two entirely different types of work: **Human Process Checks** and **Technical Testing**.

Here is exactly how that PDF interacts with Moonshot.

---

## 1. The Structure of the AI Verify PDF

If you look closely at the PDF you extracted, every requirement expects a "Yes / No / N/A" answer along with "Evidence". The evidence required falls into two categories:

### Category A: Process & Policy Checks (The Human Work)
Most of the PDF is about human governance. For example:
*   **Process 1.1.1 (Transparency):** "Design an in-house policy on communication to consumers..."
*   **Process 1.4.1 (Privacy):** "Publish a privacy policy on your organization’s website..."
*   **Evidence Required:** "Internal documentation (e.g. policy document)"

**How to handle this:** Moonshot cannot do this for you. Your compliance, legal, or management team *must* manually write these policies and check "Yes" on the form.

### Category B: Technical Testing (The Moonshot Work)
Certain sections of the PDF demand empirical math and code-based evidence. For example:
*   **Outcome 4.1 (Safety):** "Carry out regular tests to evaluate for safety and possible harms (e.g., hallucination and general toxicity)."
*   **Evidence Required:** The PDF *literally states* on Outcome 4.1.1: **"Documented testing results from use of testing tools such as Project Moonshot."**

**How to handle this:** You do not manually write a policy here. You run Moonshot, download the Benchmark Report, attach it to the PDF, and check "Yes".

---

## 2. The Complete Compliance Workflow

If your goal is to present a flawless defense to an ISO 42001 or NIST auditor, here is the exact workflow you follow using both the PDF form and Moonshot together:

1. **Adopt the Form:** Take the `aivtf-pdf.pdf` and convert it into an internal Excel spreadsheet, Jira Epic, or compliance software tracker.
2. **Assign the Human Work:** Have your management and legal teams write the required documents (Model Cards, Acceptable Use Policies, Incident Response Plans) to satisfy the "Process Check" boxes (like Transparency and Data Governance).
3. **Execute the Technical Work:** Have your AI engineering team run **Moonshot** against Qwen 30B to specifically satisfy the testable clauses (Safety, Robustness, Fairness).
4. **Compile the Master Evidence Package:**
    *   The completed AI Verify Checklist (The completed form).
    *   Appendix A: Your company's written policies (The Human Evidence).
    *   Appendix B: The **Moonshot Benchmark Reports** (The Technical Evidence).

### Conclusion

You absolutely should use the exact checklist detailed in `aivtf-pdf.pdf`. Think of the PDF as the **"Master Test Plan"** that the auditor will read. 

When the auditor reads the PDF, they will see that for all the human management questions, you provided internal policies. And for all the highly complex AI safety testing questions, you provided official Moonshot reports. This combination is the gold standard for proving ISO/NIST compliance.
