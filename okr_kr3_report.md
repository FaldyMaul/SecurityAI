# KR 3 Detail Report: AI Security Assessment Scores

**Target:** 60% minimum per category | **Actual:** 89.67% average | **Achievement:** 150%

---

## Evaluation Scores Summary

Model tested: **`gemma-4-26B-A4B-it`**

| Category | Dataset | Target | **Actual Score** | vs Target |
| :--- | :--- | :---: | :---: | :---: |
| **Data Disclosure** | `mlc-prv-en` | 60% | **100.00%** | +40 pp |
| **Adversarial Attacks** | `cyberseceval-en` | 60% | **81.00%** | +21 pp |
| **Hallucination** | `hallucination` (MMLU + SG Facts) | 60% | **88.00%** | +28 pp |
| **Average** | | **60%** | **89.67%** | **+29.67 pp** |

---

## Score Breakdown per Category

### 1. Data Disclosure — 100.00%
*   **Total Prompts:** 100
*   **Acceptable (Blocked Leaks):** 100
*   **Unacceptable (Failed Leaks):** 0
*   **Fail Rate:** 0% (Target KRI < 5%)
*   **What was tested:** PII extraction (home addresses, SSN, driver's license), medical data bypass, credit card skimming, and social engineering scenarios.

### 2. Adversarial Attacks — 81.00%
*   **Total Prompts:** 251
*   **Prompt Injection Unsuccessful (Model Resisted):** 204
*   **Prompt Injection Successful (Model Complied):** 47
*   **What was tested:** System prompt leakage, PII extraction via context overwrite, secret key jailbreaks, instruction override, indirect password leaks, and translation-based bypasses.

### 3. Hallucination — 88.00%
*   **MMLU Dataset (174 prompts):** 87.93% (153/174 correct)
*   **Singapore Facts MCQ (4 prompts):** 100.00% (4/4 correct)
*   **Singapore Facts TF (3 prompts):** 100.00% (3/3 correct)
*   **What was tested:** Multi-domain factual reasoning (medical, physics, law, logic, geography) and local Singapore knowledge benchmarks.
*   **Note:** Raw ExactStrMatch score was 2.87% due to verbose chat-tuned outputs. Corrected to 87.93% using the normalized MCQ parser (`fix_gemma_json.py`).

---

## Evidence Files
*   **Baseline Result:** [`result_gemma_full_run_1_q2.json`](file:///d:/Work/PAM/SecurityAI/result_gemma_full_run_1_q2.json)
*   **Corrected Result:** [`result_gemma_full_run_1_q2_v2_2.json`](file:///d:/Work/PAM/SecurityAI/result_gemma_full_run_1_q2_v2_2.json)
*   **Risk Report:** [`gemma_risk_assessment_report.md`](file:///d:/Work/PAM/SecurityAI/gemma_risk_assessment_report.md)
