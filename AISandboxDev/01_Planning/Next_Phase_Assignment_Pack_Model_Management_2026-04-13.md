# Next Phase Assignment Pack - Model Management 2026-04-13

This document defines the first assignment sequence after the local MVP validation bridge phase was completed.

## 1. Why This Is The Next Phase

The benchmark workflow is now validated end to end for the current local MVP path.

What is still visibly incomplete for a stakeholder acting as user:

- cannot reliably save a new model from the UI
- `/models` page still shows fixture-based state instead of live backend data
- model list and model detail can disagree because they are not reading from the same source

This makes `Model Management Completion` the next practical product phase before real `Telkom AI` model-under-test integration.

## 2. Phase Goal

Make model registration and model listing behave like a real product flow.

By the end of this phase:

- a user can create a model in `/models/new`
- the model is actually saved through backend API
- the model appears in `/models`
- `/models` reflects live backend status and latest run fields
- model list and model detail use the same source of truth

## 3. Assignment Order

1. `FE Agent`
2. `BE Agent` if FE exposes contract gaps
3. `QA Agent`

Reason:

- frontend currently contains the largest visible gap
- backend model APIs already exist
- QA should validate only after FE has moved the UI off fixture-first behavior

## 4. Scope By Agent

### FE Agent

Primary mission:

- connect `Simpan Model` to backend
- migrate `/models` page to live API data

Expected result:

- model management works from stakeholder point of view

### BE Agent

Primary mission:

- support FE migration with any needed contract adjustments

Expected result:

- backend payloads fully support live model list and model create use cases

### QA Agent

Primary mission:

- verify new model save and live list rendering work end to end

Expected result:

- stakeholder can create a model and see it in the product without fixture confusion

## 5. Success Criteria

This phase is complete when:

- `/models/new` saves to backend successfully
- `/models` shows the saved model from API
- `/models` no longer behaves as a fixture-only page
- list status and detail status are consistent
- QA validates the model-management flow
