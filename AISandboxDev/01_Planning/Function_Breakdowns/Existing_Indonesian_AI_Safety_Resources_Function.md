# Function Breakdown: Existing Indonesian AI Safety Resources

## 1. Goal

Identify reusable Indonesian datasets and policy references that can accelerate the first localized benchmark pack instead of building everything from scratch.

## 2. Assumptions

- Existing external datasets are good bootstrap sources, not final production assets by themselves.
- `Moonshot` is the primary engine consuming the localized data.
- Human review is still required for sensitive and ambiguous cases.
- Local regulatory references should shape the benchmark categories.

## 3. Scope

- Dataset inventory.
- Policy reference inventory.
- Recommended minimum viable Indonesian pack strategy.

Out of scope:

- Final curation of the production dataset.
- Automated import scripts.
- Licensing clearance and legal approval for every external source.

## 4. Risks

- External dataset quality, format, or licensing blocks direct reuse.
- Sensitive cultural or regional cases are underrepresented.
- Policy mapping is too shallow to support governance review.
- Source links become stale without an internal mirrored inventory.

## 5. Subtasks

- Validate dataset accessibility, licensing, and format.
- Create source evaluation criteria for quality and coverage.
- Define how each source maps into risk buckets and Moonshot schema.
- Identify gaps requiring custom Indonesian prompts.
- Create a source inventory with versioning and provenance tracking.

## 6. Subtasks for Product_UI (`02_Product_UI`)

- Minimal only: define how localized benchmark packs and source provenance should be surfaced in admin views or benchmark metadata pages.

## 7. Subtasks for QA_Docs (`03_QA_Docs`)

- Document dataset provenance, licensing notes, and quality caveats.
- Create curation checklist for cleaning, tagging, and human review.
- Define source-to-risk-category mapping documentation.
- Record known data gaps and follow-up collection needs.
