# Build & Evaluation Guide: AI Sandbox Testing Techniques

This guide translates the IMDA LLM Evaluation Taxonomy and the AI Verify Foundation (AIVF) Pilot lessons into a concrete build structure for Telkom's AI Sandbox.

## 1. Benchmarking & Evaluation Taxonomy

To build a robust sandbox, Telkom DDP must execute tests across the following taxonomic pillars identified in global standards:

### 1.1 General & Domain-Specific Capabilities
*   **Goal**: Ensure the model actually performs its intended task (e.g., telco customer service, CV extraction) without degrading performance.
*   **Build Action**: 
    1.  Create a "Golden Dataset" of 500-1000 domain-specific queries (e.g., Telkom indihome troubleshooting questions).
    2.  Use **Promptfoo** to execute evaluations automatically on every model update.
    3.  *Metrics*: Rouge Score, Exact Match, Contextual Relevance.

### 1.2 Safety & Trustworthiness
*   **Goal**: Identify Toxicity, Bias, and ensure Robustness (consistency under perturbation).
*   **Build Action**:
    1.  Deploy the **Giskard Hub** via docker-compose into the Sandbox environment.
    2.  Use Giskard's automated vulnerability scanner to test for Bias (e.g., checking if the Age Estimator or CV Extractor discriminates based on demographics).
    3.  *Metrics*: Demographic representation disparity, Hate speech identification rate.

### 1.3 Undesirable Use Cases & Data Governance (Leakage)
*   **Goal**: Ensure models (like Terra AI ID Check) do not regurgitate PII or provide misinformation.
*   **Build Action**:
    1.  Employ **Presidio** (by Microsoft) alongside the application pipeline to detect PII in prompts and responses.
    2.  *Red-Teaming*: Use an offensive model (LLM-as-attacker) to attempt to extract Telkom proprietary data from the system prompt.
    3.  *Metrics*: PII Leakage count, System Prompt exposure attempts.

### 1.4 Extreme Risks / Adversarial Vulnerability
*   **Goal**: Prevent direct and indirect prompt injections (e.g., malicious text hidden in an uploaded CV).
*   **Build Action**:
    1.  Run **Garak** on all web-facing LLMs to test 400+ known prompt injection techniques (e.g., DAN jailbreaks).
    2.  Implement **PyRIT** for adaptive, multi-turn exploitation testing (simulating a persistent attacker).
    3.  *Metrics*: Jailbreak success rate (Threshold defined in Playbook must be < 1%).

---

## 2. Setting Up the Automated Sandbox (CI/CD)

The "Build" phase of the sandbox should not rely on manual testing alone. It must be integrated into the deployment pipeline.

### Step 1: Provision the Testing Environment
*   Deploy a dedicated Kubernetes cluster (or isolated VM) for the AI Sandbox.
*   Spin up instances of Giskard, Promptfoo, and MLflow for artifact tracking.

### Step 2: The Continuous Evaluation Pipeline
Configure a GitHub Actions or GitLab CI pipeline that triggers on every model weight update or system prompt change:
1.  **Unit Tests (Component level)**: Verify input/output filters are active.
2.  **Safety Scan**: Run Garak (Adversarial testing) -> Fail build if Vulnerability Score > 0.
3.  **Benchmarking**: Run Promptfoo -> Compare against baseline "Golden Dataset".
4.  **Reporting**: Export results to the Assurance Dashboard (e.g., Datadog or AI Verify Report).

### Step 3: Human Calibration Loop
*   *IMDA Lesson Learnt*: "Use LLMs as judges, but with skill and caution".
*   For all automated tests scored by an LLM-Judge, send a random 5% sample of outputs to Telkom SMEs (Subject Matter Experts) to blindly grade.
*   Adjust the LLM-Judge's prompt if its scores deviate from human experts by more than 10%.

---

## 3. Recommended Initial Sandbox Run

To validate the build, we recommend piloting the Sandbox pipeline on the **Telkom LLM (Qwen 3 30B)** instance currently on Apilogy:

1.  **Red Team Initialization**: Point PyRIT at the Telkom LLM API endpoint. Use the `CyberSecEval` (Purple Llama) datasets for prompt injection.
2.  **Privacy Audit Check**: Feed 100 synthetic CVs into the "Any CV Extractor". Run Giskard's Data Leakage scan to ascertain if the model outputs sensitive PII unnecessarily.
3.  **Produce AI Verify Report**: Upon completion, feed the evaluation metrics into the AI Verify toolkit to generate a stakeholder-ready compliance report.
