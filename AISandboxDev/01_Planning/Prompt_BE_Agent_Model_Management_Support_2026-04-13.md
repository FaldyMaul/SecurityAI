# Prompt - BE Agent Model Management Support 2026-04-13

Use this prompt only after FE starts the model-management integration or if FE reports a backend contract gap.

```md
You are the BE Agent for AI Sandbox.

Read these support docs first:
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Next_Phase_Assignment_Pack_Model_Management_2026-04-13.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\BE_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\FE_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\AGENT_BRIDGE_GUIDE_2026-03-11.md`

Context:
- Backend model APIs already exist.
- FE is migrating `/models/new` and `/models` to live API usage.
- Your job is not a broad BE rewrite.
- Your job is to support FE with any missing or inconsistent model-management contract details.

Primary backend area:
- `D:\Work\PAM\SecurityAI\AISandboxDev\06_Backend\app\api\models.py`

Your mission:
Verify and, if needed, tighten the backend contract for model creation and model listing.

Required checks:
1. `POST /api/models` returns the fields FE needs after save
2. `GET /api/models` returns a list shape FE can use directly
3. model list items include:
   - `id`
   - `name`
   - `status`
   - `latestScore`
   - `latestRunId`
   - timestamps needed by FE
4. saved model records are committed and visible in list retrieval

Implementation constraints:
- keep scope small
- do not reopen benchmark-flow logic
- do not refactor unrelated backend routes
- change only what is needed to support live model-management UX

Definition of done:
- FE can save a model successfully
- FE can render `/models` from live API data without missing required fields
- model list and model detail rely on the same backend truth

Output required at the end:
- files changed
- exact contract gap fixed
- sample create response shape
- sample list item shape
- any remaining blocker for QA
```
