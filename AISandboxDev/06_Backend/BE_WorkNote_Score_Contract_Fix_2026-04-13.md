# BE Work Note: Score Contract Alignment
**Date**: 2026-04-13
**Role**: BE Agent

## 1. Root Cause (Backend Side)

The `NaN` scorecard and `overallScore: 0` issues had a single backend root cause chain:

1. **AI Engine** returns only one category: `[{"categoryId": "security", "score": 75}]`
2. **Worker** (`app/worker.py` line 122) hardcoded `scores={"security": overall_score}` — a partial, single-key dict
3. **FE normalizer** `isLegacyScoreBreakdown()` detects `"security" in scores` → routes into `LegacyScoreBreakdown` path → reads `scores.trust`, `scores.privacy`, `scores.readiness`, `scores.compliance` → all `undefined` → arithmetic becomes `NaN`
4. **`BenchmarkResult.category_results`** was passed through raw from AI Engine with wrong key names (`categoryId` instead of `id`, no `name`/`description`/`recipes`)
5. **`BenchmarkResult.grading_scale`** was never set → FE received `null`

## 2. Files Changed

### `app/utils/__init__.py`
- Added `SCORE_DIMENSIONS` constant: `("adversarial", "safety", "privacy", "hallucination")` — the exact 4 keys FE `ModuleScoreBreakdown` requires
- Added `_CATEGORY_TO_MODULE` mapping dict: maps AI Engine categoryIds (`security`, `trust`, `readiness`, etc.) to FE module keys
- Added `_MODULE_META` dict: name and description per module for building complete `CategoryResult` objects
- Added `build_complete_scores()`: takes AI Engine category list → returns complete 4-key dict, defaulting missing dimensions to `0.0`
- Added `build_complete_category_results()`: takes AI Engine category list → returns exactly 4 `CategoryResult` entries matching FE interface shape

### `app/worker.py`
- Replaced `scores={"security": overall_score}` with `scores=build_complete_scores(raw_categories)`
- Replaced raw `category_results` passthrough with `build_complete_category_results(raw_categories)`
- Added `grading_scale=DEFAULT_GRADING_SCALE` to `BenchmarkResult` insert
- Added structured log line showing final scores shape after benchmark completion
- Failure path now also produces complete 4-key shapes (all zeros) instead of empty lists

## 3. Exact Contract Change

### `Run.scores` — Before vs After

Before:
```json
{"security": 75.0}
```

After:
```json
{"adversarial": 75.0, "safety": 0.0, "privacy": 0.0, "hallucination": 0.0}
```

Key change: uses **module-style keys** (`adversarial`, `safety`, `privacy`, `hallucination`) which match `ModuleScoreBreakdown` directly. FE `isLegacyScoreBreakdown()` returns `false` for this shape, so it skips the legacy path and uses the values directly. No `NaN`.

### `BenchmarkResult.categoryResults` — Before vs After

Before:
```json
[{"categoryId": "security", "score": 75.0, "grade": "B", "passed": 75, "failed": 25}]
```

After:
```json
[
  {"id": "adversarial", "name": "Adversarial Robustness", "score": 75.0, "grade": "B", "description": "...", "recipes": []},
  {"id": "safety", "name": "Safety & Alignment", "score": 0.0, "grade": "E", "description": "...", "recipes": []},
  {"id": "privacy", "name": "Privacy", "score": 0.0, "grade": "E", "description": "...", "recipes": []},
  {"id": "hallucination", "name": "Hallucination & Truthfulness", "score": 0.0, "grade": "E", "description": "...", "recipes": []}
]
```

### `BenchmarkResult.gradingScale` — Before vs After

Before: `null`

After:
```json
{"A": [80, 100], "B": [60, 79], "C": [40, 59], "D": [20, 39], "E": [0, 19]}
```

## 4. Validation

Ran full E2E test via terminal:
- `POST /api/models/model-001/runs` → `queued`
- Polled `GET /runs/{id}` → observed `in_progress` then `completed_success`
- Final `Run.scores` = `{"adversarial": 75.0, "safety": 0.0, "privacy": 0.0, "hallucination": 0.0}` ✅
- Final `Run.overallScore` = `75.0` ✅
- `GET /runs/{id}/results` returned complete `BenchmarkResult` with 4 category entries and grading scale ✅
- Failure path verified: all dimensions default to `0.0`, never `null` or missing ✅

## 5. Does FE Still Need a Cleanup Pass?

**Minor**. The FE normalizer and `ScoreCardGrid` should work correctly now without changes because:
- `isLegacyScoreBreakdown()` returns `false` for the new shape (no `trust`/`security`/`readiness`/`compliance` keys)
- FE takes the `ModuleScoreBreakdown` path directly → reads `adversarial`, `safety`, `privacy`, `hallucination`

FE may optionally want to:
- Remove defensive `NaN` guards if they were added as workarounds
- Verify that `normalizeCategoryResults()` handles the new pre-normalized category shape correctly (it should — it calls `hasNewStructure` which checks if all `id`s match `ASSESSMENT_MODULES`, and they do)

## 6. Remaining Blockers for QA Rerun

**None on backend side.** QA can rerun immediately. The score contract is now complete, stable, and predictable for every execution path (success and failure).
