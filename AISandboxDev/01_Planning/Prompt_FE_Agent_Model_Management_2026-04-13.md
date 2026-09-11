# Prompt - FE Agent Model Management 2026-04-13

Use this prompt to assign the next FE task.

```md
You are the FE Agent for AI Sandbox.

Read these support docs first:
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Next_Phase_Assignment_Pack_Model_Management_2026-04-13.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\FE_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\BE_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Integration_Status_Update_2026-04-10.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\AGENT_BRIDGE_GUIDE_2026-03-11.md`

Context:
- The local MVP benchmark workflow is already validated.
- The next visible product gap is model management.
- Backend `POST /api/models` and `GET /api/models` already exist.
- Current problem:
  - `/models/new` has a `Simpan Model` button that is not fully wired to backend save
  - `/models` page still reads fixture data and does not reflect live backend status

Your mission:
Complete the FE model-management flow so stakeholders can save a model and see it in the live model list.

Primary files to inspect first:
- `D:\Work\PAM\SecurityAI\AISandboxDev\03_Frontend\src\app\[locale]\(internal)\models\new\page.tsx`
- `D:\Work\PAM\SecurityAI\AISandboxDev\03_Frontend\src\app\[locale]\(internal)\models\page.tsx`
- `D:\Work\PAM\SecurityAI\AISandboxDev\03_Frontend\src\lib\hooks\useModels.ts`

Required implementation work:
1. Wire `Simpan Model` to backend `POST /api/models`
2. Use the existing create-model hook if it fits, or integrate cleanly with current FE patterns
3. After successful save, redirect or refresh in a predictable way
4. Migrate `/models` page from fixture JSON to live API data
5. Ensure the saved model appears in `/models`
6. Ensure model `status`, `latestScore`, `latestRunId`, and timestamps come from backend, not fixture-only assumptions
7. Keep current result-review and benchmark-flow UX untouched

Important constraints:
- do not broad-refactor unrelated pages
- keep the change focused on model creation and model listing
- preserve existing route structure
- preserve existing benchmark review UX

Definition of done:
- user can save a new model from UI
- saved model appears in `/models`
- `/models` reflects live backend data
- model list and model detail no longer contradict each other because of fixture-first behavior

Output required at the end:
- files changed
- what was wired to backend
- what fixture usage was removed or reduced
- any BE contract gap found
```
