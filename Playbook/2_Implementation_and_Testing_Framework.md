# 2. Implementation & Testing Framework

## 2.1 The 3-Step Lifecycle

The execution of the AI Sandbox follows a rigorous, non-negotiable 3-step lifecycle for every AI product.

### Step 1: IDENTIFY (Define the Scope)
Before testing begins, the specific context and risks of the application must be defined.
*   *Action*: Define what "baseline safety" means for this specific app. For a medical summarizer, the threshold for hallucination is zero. For a creative marketing copy generator, the threshold is higher.
*   *Action*: Select the appropriate test datasets (e.g., historical chat logs, synthetic adversarial datasets).

### Step 2: TEST (Execute the Scans)
The automated testing suite is unleashed on the application. This is split into two methodologies:

**A. Output Testing (Black-Box)**
Treats the application as a black box, exactly how an end-user would experience it.
*   *Technique*: Send thousands of queries (benign and malicious) to the API endpoint.
*   *Tools Used*: **Garak** (for vulnerability scanning), **Giskard** (for safety and hallucination), **Lakera** (for prompt injection tests).

**B. Component Testing (White-Box)**
When Output Testing fails, or for high-risk applications, testing moves into the application pipeline to diagnose execution pathways.
*   *Testing the System Prompt*: Ensure the prompt correctly enforces boundaries.
*   *Testing the Input Filter*: Send malicious code to ensure the filter drops it before reaching the LLM.
*   *Testing the External Knowledge Base (RAG)*: Ensure the retrieval mechanism fetches the correct documents, independent of the LLM's generation capability.

### Step 3: ASSESS (Analyze & Mitigate)
*   *Action*: Analyze the evaluation scores (using statistical models like BLEU, ROUGE, or LLM-as-a-judge).
*   *Action*: If baseline safety is not met, the product is routed back to development (Blue Team) for mitigation (e.g., strengthening the System Prompt, sanitizing the RAG database).

## 2.2 Core Benchmarks & Tools

To ensure consistency, the Sandbox mandates the use of specific, industry-standard tools:

| Risk Category | Recommended Testing Tool | Metodology |
| :--- | :--- | :--- |
| **Vulnerability & Jailbreaks** | **Garak**, **PyRIT** | Automated Red-Teaming, Prompt Injection |
| **Hallucination & Inaccuracy** | **Promptfoo** | Benchmarking against "Golden Datasets" |
| **Bias & Toxicity** | **Giskard Hub** | Safety Scanning, Demographic Parity Testing |
| **Data Leakage (PII)** | **Presidio** (Microsoft) | Component testing (Input/Output Filters) |
| **Governance & Reporting** | **AI Verify** | Standardized Self-Assessment Reports |

## 2.3 Constructing Test Data

"No one has the right test dataset to hand." - *IMDA Guidelines*

The Sandbox requires three types of test data:
1.  **Use-Case Specific (Historical)**: Real, anonymized user queries from previous interactions.
2.  **Simulation (Synthetic)**: For edge cases. We utilize a secondary "Generator LLM" to instantly create thousands of realistic but rare edge-case queries to stress-test the application.
3.  **Red-Teaming (Adversarial)**: Purpose-built datasets designed to break the model (e.g., CyberSecEval datasets).

---
*Next Module: [3. Operational Roles and Responsibilities](./3_Operational_Roles_and_Responsibilities.md)*
