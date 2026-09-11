# Country-Specific & Regional Compliance in AI Testing Tools

You noticed a key feature in **Project Moonshot**: it was built by the Singapore government (IMDA) and therefore includes specific test datasets and compliance guardrails tailored specifically to Singaporean context (e.g., local vernacular, specific SG racial/religious harm datasets). 

When building a **National AI Sandbox** for a different country (like Indonesia, the US, or within the EU), you must consider how the other tools handle *regionally specific* or *culturally specific* testing.

Here is the breakdown of how the other major OSS tools handle country-specific compliance compared to Moonshot.

---

## 1. Project Moonshot (The Baseline)
*   **Regional Focus:** **High (Singapore / General)**
*   **How it works:** Because IMDA sponsors it, Moonshot explicitly ships with datasets targeting SG-specific demographic bias and local language nuances (Singlish).
*   **The Lesson:** If you deploy Moonshot in another country, you cannot blindly trust its default "bias" scores, because it might not be checking for the specific minority groups or cultural slurs relevant to *your* nation. You must create custom Moonshot datasets tailored to your local demographics.

## 2. Giskard (The EU AI Act Specialist)
*   **Regional Focus:** **High (European Union)**
*   **How it works:** Giskard is primarily an EU-based company. They actively map their testing framework to conform specifically to the **EU AI Act** (specifically Article 10, which governs high-risk datasets and bias).
*   **Country-Specific Bias:** While Giskard provides the *mathematical framework* to detect bias, the EU AI Act explicitly states that datasets must account for "specific geographical, contextual, behavioural or functional settings." Therefore, Giskard expects you to upload a local dataset, and its engine will scan *that* local data for bias.

## 3. DeepEval (Data Residency & Configurable Metrics)
*   **Regional Focus:** **Agnostic (Highly Configurable)**
*   **How it works:** DeepEval focuses heavily on **Data Residency laws** (like GDPR or local data sovereignty laws that mandate citizen data cannot leave the country). Because it runs 100% locally and can use local LLM judges (like Qwen 30B), no data ever crosses international borders, instantly satisfying local compliance laws.
*   **Culturally Specific Metrics:** DeepEval allows you to write custom criteria for its `ToxicityMetric` or `BiasMetric`. You can literally prompt the DeepEval judge: *"Evaluate this output based on the cultural norms and offensive terminology specific to Indonesian culture."*

## 4. Garak (The Universal Vulnerability Scanner)
*   **Regional Focus:** **Low (Strictly Technical / Translative)**
*   **How it works:** Garak does not care about local laws; it cares about breaking the code. Its probes (like the `realtoxicityprompts` or `donotanswer` datasets) are largely based on Western/English datasets. 
*   **Culturally Specific Probes:** Garak does have a distinct feature: **Translation support**. If your National Sandbox is testing an LLM trained for a specific language (e.g., Bahasa Indonesia), Garak can translate its massive payload of English jailbreaks into the target language to see if the model's safety guardrails fail when the language switches.

## 5. LLM Guard (The PII & Privacy Enforcer)
*   **Regional Focus:** **High (Data Privacy Laws - GDPR, CCPA, HIPAA)**
*   **How it works:** LLM Guard is actively designed to detect **Personally Identifiable Information (PII)** before it hits the LLM. 
*   **Country-Specific Scanners:** What counts as PII changes by country (e.g., a US Social Security Number vs. an Indonesian KTP number vs. an EU IBAN). LLM Guard's `Anonymize` scanner uses advanced Named Entity Recognition (NER) and Regex. You easily configure it to look for specific regional ID formats to ensure compliance with local country privacy laws (like Indonesia's PDP Law).

---

## Conclusion & Strategy for the Sandbox

**Tools do not automatically know your culture.** With the exception of Moonshot (which favors Singapore) and Giskard (which maps to the EU AI Act), you cannot assume that passing an "Ethics Test" in these tools means it passes *your country's* ethics test.

### How to Build Regional Compliance into Your Sandbox:
If you are building this for a specific Nation (e.g., Indonesia), you must:
1.  **For Moonshot/Giskard:** Curate a specific `.csv` dataset of locally relevant prompts (local slang, culturally sensitive topics, local political figures) and upload it as a custom recipe.
2.  **For LLM Guard:** Update the PII regex patterns to specifically catch national ID formats, local phone number structures, and local banking formats so that the Sandbox inherently complies with local data privacy laws.
