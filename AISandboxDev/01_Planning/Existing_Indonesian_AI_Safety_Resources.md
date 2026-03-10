# Library of Existing Indonesian AI Safety Resources (Updated)

You do **NOT** have to build the Indonesian safety dataset from scratch. The fastest path is to leverage existing, human-verified Indonesian datasets and integrate them into the **Moonshot** evaluation engine.

---

## 1. Core Indonesian Safety & Knowledge Datasets

| Dataset Name | Best Used For | Size / Scale | Verified Link |
| :--- | :--- | :--- | :--- |
| **IndoSafety** | **Human-verified safety evaluation.** Covers formal, colloquial, Javanese, Sundanese, and Minangkabau. | 2,500+ Test set | [GitHub (falensiazmi/IndoSafety)](https://github.com/falensiazmi/IndoSafety) |
| **IndoDiscourse** | Multi-labeled dataset for **toxicity, polarization, and demographic analysis** of Indonesian online discourse. | 43,000+ entries | [Hugging Face (Exqrch/IndoDiscourse)](https://huggingface.co/datasets/Exqrch/IndoDiscourse) |
| **IndoMMLU** | **Multitask language understanding.** 63 tasks based on the Indonesian educational curriculum. | 14,906 questions | [GitHub (fajri91/IndoMMLU)](https://github.com/fajri91/IndoMMLU) |
| **Abusive & Hate Speech** | Multi-label detection of **HS and Abusive** language in Indonesian tweets. | 13,000+ tweets | [Kaggle (ilhamfp31/Indonesian-Abusive-Hate-Speech)](https://www.kaggle.com/datasets/ilhamfp31/indonesian-abusive-and-hate-speech-twitter-text?select=README.md) |
| **Awesome Indonesia NLP** | High-level index of **Indonesian NLP resources**, tools, and datasets. | Resource Hub | [GitHub (irfnrdh/Awesome-Indonesia-NLP)](https://github.com/irfnrdh/Awesome-Indonesia-NLP) |

---

## 2. Indonesian Governance & Policy References
Use these to map your test cases to local regulatory expectations:

*   **Komdigi (Kemkominfo) Circular No. 9/2023:** On AI Ethics and internal policy expectations. [JDIH Komdigi](https://jdih.komdigi.go.id/produk_hukum/view/id/883/t/surat%2Bedaran%2Bmenteri%2Bkomunikasi%2Bdan%2Binformatika%2Bnomor%2B9%2Btahun%2B2023)
*   **OJK AI Governance:** Guidance for AI adoption in the Indonesian banking and financial sector.

---

## 3. Integration Strategy: "The Indonesian Pack"

Instead of a new platform, build an **Indonesia Verify benchmark pack** that plugs directly into Moonshot.

1.  **Engine:** Reuse Moonshot (Red teaming, Runner, Scorer).
2.  **Benchmark Layer:** Swap English/SG assets for the datasets listed above.
3.  **Policy Mapping:** Align test results with Komdigi and OJK requirements.

**Minimum Viable Version (MVV) Target:**
*   200–300 Safety prompts (IndoSafety)
*   100 Privacy/Data leakage prompts (Custom)
*   100 Jailbreak prompts (Custom/Garak translated)
*   200 Factuality prompts (IndoMMLU)
*   100 Bias/Fairness prompts (IndoDiscourse)
*   **3 Languages:** Formal Indonesian, Colloquial, and Javanese/Sundanese.

---

## 4. How to Use
1.  **Download** the datasets from the links above.
2.  **Convert** to Moonshot JSON schema (Input/Target).
3.  **Save** to `moonshot-data/datasets/`.
4.  **Define** an Indonesian-specific Recipe.
5.  **Run** the benchmark using your local Qwen or Telkom Apilogy endpoint.
