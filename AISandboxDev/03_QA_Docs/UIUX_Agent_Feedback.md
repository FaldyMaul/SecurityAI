# Feedback for UI/UX Agent – AI Sandbox Recovery

Based on the live QA testing conducted on 2026-03-11, the following visual and journey gaps need your immediate attention to meet the human review requirements.

## 1. Navigation & Product Surfaces
- **ModelHub Menu**: The sidebar is missing a dedicated "ModelHub" or "Explore Models" menu item. Currently, the "Promote" button redirects to the landing page instead of a focused internal discovery view.
- **Surface Separation**: Ensure `AI Sandbox` (internal) and `ModelHub` (public/discovery) use consistent but distinct Indonesian header labels.
- **Review Queue History**: Although "Antrean Review" was removed from the main journey, ensure the "History" tab in the Dashboard is polished to represent "recent activities" effectively.

## 2. Interaction Improvements
- **Package Detail Modal**: The assessment package detail is currently just a (?) tooltip. Per requirement, this should be a clickable element that opens a modal with internal test details (mirroring the Moonshot benchmark experience).
- **Model List Feedback**: The "Status" column is currently empty. Please design clear status badges (Draft, Running, Completed, Published) for the FE agent to populate.
## 3. UX Writing & Content Consistency
- **Promote to ModelHub**: Replace all instances of "Publish" or "Publikasikan" with "Promote to ModelHub" or "Promosikan ke ModelHub" to indicate a managed gating process.
- **Language Inconsistency**: There is a heavy mix of English and Indonesian. Most UI labels (e.g., "History Log", "Duration", "Completed", "Score") should be standardized to Indonesian if the target language is ID.
- **Terminology Sync**: Use "Pengujian" instead of "Testing" for a more professional Indonesian security platform.
- **Micro-copy**: Standardize the recap labels to be exactly: `Total Model`, `Testing Berjalan`, `Testing Selesai`, `Sedang di-Review`, `Model dipromosikan`.
- **Button Sync**: Ensure that `Promote to ModelHub`, `Rerun`, and `Run Benchmark` have consistent primary/secondary visual hierarchy as specified in the [Detailed Human Review](file:///d:/Work/PAM/SecurityAI/AISandboxDev/03_QA_Docs/QA_Detailed_Human_Review.md).
- **Responsive Navbar**: The top navbar still overflows on small screens (e.g., iPhone SE). A hamburger menu implementation is overdue.

---
*QA Testing ID: QA-2026-03-11-UIUX*
