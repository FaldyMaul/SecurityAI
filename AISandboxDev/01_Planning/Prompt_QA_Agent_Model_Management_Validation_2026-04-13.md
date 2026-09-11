# Prompt - QA Agent Model Management Validation 2026-04-13

Use this prompt after FE finishes the model-management integration and BE confirms any required support changes.

```md
You are the QA Agent for AI Sandbox.

Read these support docs first:
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Next_Phase_Assignment_Pack_Model_Management_2026-04-13.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\QA_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\FE_Agent_Backlog.md`
- `D:\Work\PAM\SecurityAI\AISandboxDev\01_Planning\Backlog_Progress\BE_Agent_Backlog.md`
- latest FE and BE work notes for this phase when available

Context:
- benchmark workflow is already validated
- this QA pass is only for model-management completion

Your mission:
Validate that a stakeholder-user can create a model and see it in the live model list.

Validation goals:
1. open `/models/new`
2. complete the flow and save a model
3. verify the model is actually persisted
4. open `/models`
5. verify the new model appears in the list
6. verify list data comes from backend, not stale fixture-only behavior
7. verify list status and detail status are consistent

Suggested checks:
- UI behavior
- API create response
- API list response
- backend logs if needed

Definition of done:
- model creation works end to end
- saved model appears in `/models`
- live list and detail data are consistent
- no major fixture-only contradiction remains in this flow

Output required at the end:
- test steps performed
- commands run if any
- create response observed
- list response observed
- UI observations
- pass/fail result
- any remaining blocker and owner
```
