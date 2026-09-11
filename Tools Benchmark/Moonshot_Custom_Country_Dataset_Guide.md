# Guide: Creating Custom Country Datasets in Moonshot

To replicate the Singapore-specific testing capabilities for **Indonesia**, you need to follow a specific file structure and data schema within the Moonshot ecosystem. This guide explains how to structurally integrate these tests.

---

## 1. Directory Architecture
Custom datasets must be placed in the `moonshot-data` directory of your installation.

```text
moonshot-install/
├── moonshot-data/
│   ├── datasets/          <-- Your custom .json datasets go here
│   ├── recipes/           <-- Your test configurations go here
│   └── metrics/           <-- Grading logic (e.g., Levenshtein, Toxicity)
```

---

## 2. Dataset Schema (The "How-To")
Moonshot datasets are structured as **JSON** files. To create an Indonesian version, you should follow the schema used by `singapore-safety-questions.json`.

**File Path:** `moonshot-data/datasets/indonesia-safety-test.json`

### Required JSON Structure:
```json
{
    "name": "Indonesia Safety Benchmark",
    "description": "Prompts targeting Indonesian SARA, slang, and political context.",
    "license": "Apache-2.0",
    "reference": "National AI Sandbox",
    "examples": [
        {
            "input": "[Your Bahasa Indonesia Prompt Here]",
            "target": "unsafe"
        },
        {
            "input": "[Another Local Context Prompt]",
            "target": "safe"
        }
    ]
}
```

*   **input:** The actual prompt sent to the LLM (use local dialects, slang, or sensitive topics).
*   **target:** The expected classification (usually `safe` or `unsafe`) used by the metrics to calculate the pass/fail rate.

---

## 3. Integration Step: Creating a Recipe
Adding the dataset to the folder is not enough; you must tell Moonshot to *use* it. This is done via a **Recipe**.

**File Path:** `moonshot-data/recipes/indonesia-compliance.json`

```json
{
    "name": "Indonesian Compliance Check",
    "description": "Run safety tests against Indonesian cultural norms.",
    "tags": ["indonesia", "safety", "regulatory"],
    "datasets": ["indonesia-safety-test"],
    "metrics": ["toxicity", "leetspeak"]
}
```

---

## 4. Execution Step
Once the structural files are in place, you can trigger the test via the Moonshot CLI or your Custom UI Backend:

**CLI Command:**
```bash
python -m moonshot benchmark run -r indonesia-compliance -e [your-llm-endpoint]
```

---

## Summary of Steps:
1.  **Draft Propts:** Identify Indonesian-specific sensitivities (SARA, local laws, regional slang).
2.  **JSON Creation:** Format these prompts into the `examples` list in a JSON file.
3.  **Place File:** Save it specifically in `moonshot-data/datasets/`.
4.  **Define Recipe:** Create a Recipe file in `moonshot-data/recipes/` that links your new dataset to specific metrics (like toxicity or bias).
5.  **Run:** Execute the recipe against your target model.

By following this structure, your localized Indonesian tests will appear in the Moonshot UI and CLI alongside the default Singaporean benchmarks.
