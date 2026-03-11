# Feedback for Frontend Agent – AI Sandbox Recovery

Based on the live QA testing conducted on 2026-03-11, the following technical bugs and integration gaps need your immediate attention to meet the requirement.

## 1. Functional Bugs
- **Promote to ModelHub (CRITICAL)**: Clicking "Promote to ModelHub" currently triggers a "**Gagal publish**" error even when model scores are valid (A/B). This effectively blocks the primary goal of the "Model Owner" journey into the discovery surface.
- **Model Status Data**: The "Status" column in the "Model Saya" list is currently empty for all rows. Please ensure the backend state (Draft, Running, Completed, Promoted) is correctly mapped and rendered.
- **ModelHub Flow**: Ensure the `ModelHub` routes (leaderboard, compare) are implemented within the correct context, allowing users to discover models without being redirected to the public landing page prematurely.

## 2. Integration Updates
- **Package Details**: Implement the logic to open a detail modal when the assessment package "?" icon is clicked. The content should be fetched based on the package ID.
- **LLM Summary Detail**: The "Review" button in the results page works, but ensure that the "AI Justification" content is granularly mapped to each category (SARA, PDP, etc.) within the modal.
- **Version Comparison**: Implement the data-fetching logic to compare two different runs of the same model and pass it to the (upcoming) comparison UI.

## 3. Technical Content Sync
- **Prompt Default**: The prompt selection currently defaults to 25%. It **MUST** default to 100% as per human review.
- **Status Data**: The Status column is empty. This needs to be populated from the model's current active test state.
- **Standard Sync**: Cross-verify that the current 3-package assessment set matches the Moonshot benchmark standards for Indonesia.
- **Standard Sync**: Cross-verify that the current 3-package assessment set matches the Moonshot benchmark standards for Indonesia. If not, update the package definitions.

---
*QA Testing ID: QA-2026-03-11-FE*
