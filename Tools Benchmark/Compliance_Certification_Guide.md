# AI Compliance: Certifying Models vs. Certifying Organizations

When trying to prove that your Qwen 30B model (or any LLM) complies with ISO 42001 and the NIST AI RMF, it is critical to understand a major distinction in how these frameworks are designed.

**The Short Answer:** No, you cannot simply map a technical Moonshot test to every single point in ISO 42001 to get a "certification" for the model itself, because ISO and NIST are *process* frameworks, not just technical benchmarks.

Here is exactly how certification works and what you should map.

---

## 1. You Certify the Organization, Not Just the Model

**ISO/IEC 42001** is an Artificial Intelligence Management System (AIMS) standard. It is built exactly like ISO 27001 (Information Security). 
*   **What this means:** An auditor does not grant an "ISO 42001 Certificate" to *Qwen 30B*. The auditor grants the certificate to **your company/team**. The certificate proves that your organization has the correct rules, processes, and testing in place to safely manage AI.

**NIST AI RMF** is a Risk Management Framework. 
*   **What this means:** NIST does not even offer formal "certifications." It provides a blueprint (Map, Measure, Manage, Govern) for how to handle AI risk. 

---

## 2. Where Moonshot Fits in the Frameworks

If you look at the AI Verify Crosswalks, ISO 42001 and NIST AI RMF have dozens of clauses. **Moonshot (and technical testing in general) only covers the technical validation clauses.**

### What Moonshot CAN Prove (Technical Validation)
Moonshot helps you check off the boxes for clauses related to "Measurement" and "Verification."
*   **ISO A.6.2.4 (Verification and Validation):** Moonshot's `mlc-ai-safety` cookbook proves you tested for toxicity and safety before deployment.
*   **ISO A.7.4 (Quality of Data):** Moonshot proves the model doesn't hallucinate or leak sensitive data.
*   **NIST MEASURE 2:** Testing the model for trustworthy characteristics like Robustness and Fairness.

### What Moonshot CANNOT Prove (Human & Process Governance)
You cannot use technical tests for the majority of the standards, which are purely about human organization:
*   **ISO A.3 (Internal Organization):** You must prove you have dedicated "AI Roles" and "Reporting of Concerns" policies. 
*   **ISO A.4.6 (Human Resources):** You must prove the people building the AI are trained.
*   **NIST GOVERN 2:** You must prove accountability structures are in place.

---

## 3. The Strategy to Claim "Compliance"

If your goal is to tell your customers, stakeholders, or auditors: *"Our generative AI application is ISO 42001 / NIST Compliant"*, you must do the following:

### Step 1: The Technical Evidence (Moonshot)
You map your Moonshot tests to the specific technical clauses (Safety, Robustness, Fairness). You save the Moonshot Benchmark Reports as your empirical evidence that the model is technically safe.

### Step 2: The Policy Evidence (Process)
You must write documents defining your human processes. For example:
*   An **AI Acceptable Use Policy**.
*   An **AI System Impact Assessment** (A document explaining *why* you chose Qwen 30B and what risks it poses to users).
*   A **Data Provenance Log** (Where did the fine-tuning data come from?).

### Step 3: The System Audit Report (or Declaration of Conformity)
Instead of a "certificate," you create a **Declaration of Conformity** (or a System Audit Report) for your specific application. 
This is a document you hand to a client that says:

> *"Our AI Application aligns with ISO/IEC 42001 and the NIST AI RMF. We enforce the Governance and Mapping clauses through our internal AI Policies and Impact Assessments (attached). Furthermore, we fulfill the continuous Measurement and Verification clauses (ISO A.6.2.4) by subjecting our Qwen 30B model to automated adversarial red-teaming prior to every deployment, utilizing the AI Verify Foundation's Moonshot framework. See attached Moonshot Benchmark Test Reports as evidence of our model's safety, robustness, and resistance to prompt injection."*

By combining the **human policies** with the **Moonshot Benchmark reports**, you achieve full, provable compliance with ISO and NIST.
