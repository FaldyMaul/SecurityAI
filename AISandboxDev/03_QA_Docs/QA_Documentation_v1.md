# AI Sandbox – QA Documentation (v1.0)

This document contains test cases, risks, and release notes for the AI Sandbox MVP.

---

## 1. Happy Path Test Cases

### 1.1 Model Owner: Submit & Assess
| ID | Test Case | Action | Expected Result |
|----|-----------|--------|-----------------|
| HP-01 | Add Model (Manual) | Navigate to `+ Add Model`, fill mandatory fields, click `Save Draft`. | Model appears in "My Models" list with `draft` status. |
| HP-02 | Validate Endpoint | Click `Validate` on a draft model with a correct URL. | Status changes to `endpoint_valid`; "Start Benchmark" button becomes active. |
| HP-03 | Run Benchmark | Select "Indonesia Core Trust Package" and click `Start Benchmark`. | Progress bar starts; status transitions `queued` → `running` → `completed`. |
| HP-04 | View Scorecard | Open a completed run. | Five category score blocks and findings accordion are displayed with correct data. |
| HP-05 | Submit for Review | Click `Submit for Review` on a completed assessment. | Status changes to `pending_review`; model becomes read-only for owner. |

### 1.2 Reviewer: Assess & Publish
| ID | Test Case | Action | Expected Result |
|----|-----------|--------|-----------------|
| HP-06 | Process Review | Open model from Review Queue, add notes, select `Approved` in Decision Drawer. | Decision is saved; audit trail records the event; Publication toggle becomes active. |
| HP-07 | Publish Model | Switch the Publication toggle to `On` and confirm. | Model status becomes `published`; model appears on the public Ranking page. |

### 1.3 Builder/Public: Discover
| ID | Test Case | Action | Expected Result |
|----|-----------|--------|-----------------|
| HP-08 | Compare Models | Select 3 models on Ranking page, click `Compare`. | Comparison table and Radar chart display side-by-side attributes correctly. |

---

## 2. Negative Test Cases

| ID | Test Case | Action | Expected Result |
|----|-----------|--------|-----------------|
| NEG-01 | Invalid Endpoint | Enter malformed URL or unreachable server during validation. | `validation_failed` status; error message visible; retry enabled. |
| NEG-02 | Auth Failure | Submit model with incorrect API Key. | Benchmark run fails with `run_failed` status; logs show "Unauthorized" error. |
| NEG-03 | Missing Mandatory Fields | Attempt to save manual model with empty `Model Name`. | Form validation prevents submission; red error text appears under field. |
| NEG-04 | Unauthorized Access | Login as Model Owner and attempt to access `/reviews` or `/dashboard`. | Redirect to `Access Denied` page. |
| NEG-05 | Duplicate Submission | Attempt to click `Submit for Review` multiple times (double-click). | UI prevents multiple calls; only one submission is processed. |

---

## 3. Edge Cases

| ID | Test Case | Action | Expected Result |
|----|-----------|--------|-----------------|
| EDGE-01 | Benchmark Timeout | Run benchmark on a very slow model endpoint (> 5 mins). | System marks run as `run_failed` due to timeout; user given "Rerun" option. |
| EDGE-02 | Max Comparisons | Attempt to add a 4th model to the comparison bar. | Toast notification appears stating "Maximum 3 models for comparison". |
| EDGE-03 | Empty Ranking | Search for a non-existent provider on the Ranking page. | "No models match" empty state with illustration and "Clear Filter" CTA. |
| EDGE-04 | Model Unpublished | Navigate to a public profile URL of a model that was just hidden. | System returns a friendly 404/Not Found page. |
| EDGE-05 | Large Findings | Model assessment returns > 100 individual findings. | Findings accordion implements pagination or virtual scrolling for performance. |

---

## 4. Regression Risks

1. **LiteLLM / Moonshot Updates**: Changes in underlying benchmark engines may break result parsing or score calculation logic.
2. **Permission Matrix Shifts**: Adding new roles or splitting the Admin role might lead to visibility leaks or locked-out model owners.
3. **State Machine Deadlocks**: Improper handling of failed runs could leave models stuck in `run_in_progress` indefinitely.
4. **Legion UI Kit Breaking Changes**: Updates to the core UI library could affect custom-extended components like `StatusBadge` or `WorkflowStepper`.
5. **Language Sync**: Adding new features without updating both `id.json` and `en.json` will result in missing string errors.

---

## 5. Release Notes Draft (v1.0.0-MVP)

**"Laying the Foundation for AI Trust in Indonesia"**

### New Features
- **Model Registry**: Securely register LLM endpoints from manual sources or import directly from Apilogy.
- **Automated Benchmarking**: Integrated with Moonshot to assess models across Security, Privacy, and Trust categories.
- **Expert Review Flow**: Dedicated queue for admins to audit evidence and make informed approval decisions.
- **Public Ranking**: A trust-based catalog of approved models with side-by-side comparison capabilities.
- **Bilingual Interface**: Full support for Bahasa Indonesia and English.

### Improvements & Fixes
- Implemented Legion UI Kit for a premium, consistent design language.
- Added lazy-loading for evidence panels to optimize performance on large assessments.
- Real-time run status polling (no more page refreshes needed).

---

## 6. Developer Checklist

### Pre-Deployment
- [ ] **Linting**: Run `npm run lint` and ensure 0 errors.
- [ ] **Type Check**: Ensure `tsc` passes without errors.
- [ ] **MSW Disabled**: Verify `NEXT_PUBLIC_MSW_ENABLED=false` for production builds.
- [ ] **Environment Variables**: Verify all `API_URL` and `AUTH` keys are set in the target environment.
- [ ] **i18n Coverage**: Check `id.json` and `en.json` for missing keys using the translation audit tool.

### Post-Deployment
- [ ] **Smoke Test**: Login as each persona and verify landing page redirects.
- [ ] **CORS Check**: Verify the frontend can talk to the backend/LiteLLM gateway.
- [ ] **Analytics/Logs**: Ensure error tracking (e.g., Sentry) is capturing frontend exceptions.
- [ ] **Responsive Check**: Verify Ranking and Public Profile on an actual mobile device.
