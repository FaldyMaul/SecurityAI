# Function Breakdown: Indonesian Sandbox Localization Guide

## 1. Goal

Define the technical localization work required to turn the generic sandbox toolchain into an Indonesia-ready evaluation environment.

## 2. Assumptions

- Default English or Singapore-centric datasets are insufficient.
- Localization requires custom assets across multiple tools, not one change.
- Indonesian privacy, slang, and cultural context must be handled explicitly.
- A local or localized judge model is required for context-aware evaluation.

## 3. Scope

- Localization requirements for `Moonshot`, `LLM Guard`, `PyRIT`, `DeepEval`, and `Garak`.
- Indonesia-specific checklist for datasets, regex patterns, and judge models.

Out of scope:

- Final production implementation for each tool.
- Full legal validation of policy interpretations.
- Runtime infrastructure for judge models.

## 4. Risks

- Teams assume localization is just translation, not context adaptation.
- Privacy scanning misses Indonesian identifiers such as `NIK` or `NPWP`.
- Judge models mis-score outputs because they lack local context.
- Offensive testing remains English-heavy and misses local jailbreak patterns.

## 5. Subtasks

- Define Indonesia-specific dataset requirements for Moonshot.
- Specify regex and detection rules for local PII patterns.
- Define judge-model requirements, prompts, and evaluation criteria.
- Specify Garak translation and localization strategy.
- Prioritize which localization assets are MVP-critical versus later.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Minimal only: define admin-facing configuration screens or metadata displays for localized packs, judge models, and policy tags if these are exposed in the product.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Document localization requirements per tool.
- Create validation checklist for Indonesian PII detection and masking.
- Define test cases for local slang, SARA, and regional-language handling.
- Create judge-model evaluation rubric for Indonesian cultural correctness.
