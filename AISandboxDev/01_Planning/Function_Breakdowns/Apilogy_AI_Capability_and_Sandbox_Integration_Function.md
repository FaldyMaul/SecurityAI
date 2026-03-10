# Function Breakdown: Apilogy AI Capability and Sandbox Integration

## 1. Goal

Define how `Apilogy` should integrate with the sandbox as the source of internal AI capabilities while the sandbox remains the trust, review, and ranking layer.

## 2. Assumptions

- `Apilogy` already holds a broad AI capability inventory.
- MVP should start with `LLM` endpoints, especially `Telkom LLM`.
- `Apilogy` metadata can pre-populate sandbox records.
- External endpoints remain supported through the same normalized access layer.

## 3. Scope

- Strategic positioning of `Apilogy`.
- MVP and future-stage integration model.
- Metadata import boundaries and ownership split between platforms.

Out of scope:

- Full ingestion of all AI capability types in MVP.
- Replacing `Apilogy` as the marketplace or subscription layer.
- Building deep bidirectional sync before the trust workflow is stable.

## 4. Risks

- Duplicate ownership between sandbox and `Apilogy` creates conflicting records.
- Metadata import quality is inconsistent across capabilities.
- MVP scope expands from `LLM` to all AI services too early.
- Subscription or discovery flows are coupled before trust status is mature.

## 5. Subtasks

- Define the minimal metadata contract imported from `Apilogy`.
- Define what the sandbox owns versus references.
- Specify endpoint onboarding flow for `Apilogy` versus manual external entry.
- Validate `Telkom LLM` as the first integration target.
- Define future trust-status feedback into discovery flows.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Design endpoint import and prefill flows from `Apilogy`.
- Show source labels such as `Imported from Apilogy` versus `External`.
- Create model detail sections for linked capability metadata and trust status.
- Design discovery surfaces where trust signals can later be surfaced back.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Document system-of-record boundaries between sandbox and `Apilogy`.
- Create field mapping and sync validation checklist.
- Define onboarding test cases for imported and manually entered endpoints.
- Document trust status publishing rules back to dependent discovery flows.
