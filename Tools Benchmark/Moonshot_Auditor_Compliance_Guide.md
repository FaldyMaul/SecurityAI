# How to Use Moonshot for ISO 42001 & NIST AI RMF Audits

To prove to an auditor that your Qwen 30B model complies with **ISO/IEC 42001** and the **NIST AI RMF**, you must bridge the gap between Moonshot's automated tests and the AI Verify Crosswalk documents you provided.

Auditors do not just want to see code; they want to see **traceability**—how a technical test directly satisfies a specific compliance clause.

Here is the exact strategy and workflow to present Moonshot's results to an auditor.

---

## Step 1: Understand the AI Verify Crosswalk Mapping

The foundation of your audit defense relies on the PDFs you provided. The crosswalks explicitly link technical testing principles (Safety, Robustness, Fairness, Security) to specific ISO and NIST clauses. 

Moonshot is the technical *engine* that executes these tests. By categorizing Moonshot's metrics under the AI Verify principles, you create a direct line of traceability to the standards.

### Traceability Matrix for the Auditor

**1. Verification and Validation (ISO A.6.2.4 / NIST MEASURE 2)**
*   **The Standard Requires:** Evidence that the AI system was evaluated for trustworthy characteristics before deployment.
*   **AI Verify Principle:** Safety (4.3-4.6), Robustness (6.4-6.5), Security (5.5-5.7).
*   **Moonshot Evidence:** Run the `mlc-ai-safety.json` and `cyberseceval-cookbook-all-languages.json` cookbooks. The output report proves that the model successfully defended against prompt injections, toxicity, and cyber threats.

**2. Fair and Inclusive Design (ISO A.6.1.3 / NIST GOVERN 3)**
*   **The Standard Requires:** Processes to ensure the trustworthy design of an AI system, particularly avoiding discrimination.
*   **AI Verify Principle:** Fairness (7.1 - 7.9).
*   **Moonshot Evidence:** Run the `chinese-safety-cookbook.json` or `singapore-context.json` to demonstrate that the model avoids cultural bias, stereotypes, and contextual discrimination.

**3. Information for Interested Parties (ISO A.8 / NIST MAP 1)**
*   **The Standard Requires:** Transparent system documentation regarding vulnerabilities.
*   **AI Verify Principle:** Transparency (1.1-1.5).
*   **Moonshot Evidence:** The Moonshot Benchmarking UI generates a downloadable **Benchmark Report**. This report is the artifact you hand to the auditor to satisfy the Transparency requirement, detailing exactly what the model failed at and what it passed.

---

## Step 2: Create "Audit-Ready" Custom Cookbooks

While Moonshot comes with default cookbooks, the best way to impress an auditor is to create custom cookbooks explicitly named after the compliance frameworks. 

You should create two new JSON files in `moonshot-data/cookbooks/`:
1.  `iso-42001-verification.json`
2.  `nist-airmf-measure.json`

Inside these cookbooks, you combine all the recipes necessary to satisfy that specific standard. For example, your `iso-42001-verification.json` would look like this:
```json
{
    "id": "iso-42001-verification",
    "name": "ISO 42001 Clause A.6.2.4 Validation",
    "description": "Aggregated test suite satisfying ISO 42001 validation requirements via checking Safety, Robustness, and Security.",
    "recipes": [
        "analogical-similarity",
        "chinese-safety-recipe",
        "cyberseceval-recipe",
        "mlc-ai-safety"
    ]
}
```

---

## Step 3: Generating and Presenting the Auditor Report

When the auditor asks, *"How did you validate this model against ISO 42001?"*, you follow this exact workflow:

1.  **Run the Cookbook:** Use the Moonshot Web UI or CLI to run the `iso-42001-verification.json` cookbook against your Qwen 30B model.
2.  **Navigate to Benchmarking:** Open the Moonshot Web UI and go to the "Benchmarking" tab.
3.  **Generate the Artifact:** Moonshot will compile all the results from the various recipes (Toxicity, Bias, Prompt Injection) into a single, unified visual dashboard.
4.  **Export the Report:** Click the `Download Report` button in the Moonshot UI. This will export a comprehensive document detailing:
    *   The Model Tested (Qwen 30B)
    *   The Cookbook Executed (ISO 42001 Validation)
    *   The Grading Criteria (e.g., 99% Pass rate on LlamaGuard safety checks)
    *   The exact prompts the model failed on (for remediation tracking).
5.  **Deliver the Package:** Hand the auditor three things:
    *   The **AI Verify Crosswalk PDF** (Showing the theoretical mapping).
    *   Your **Custom Moonshot Cookbook JSON** (Showing your testing methodology).
    *   The **Moonshot Downloaded Benchmark Report** (Showing the empirical evidence that the model passed the mapped tests).

This creates an airtight, verifiable chain of evidence from the highest-level ISO clause down to the exact mathematical testing metric executed by Moonshot.
