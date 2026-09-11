"""Utility: score-to-grade conversion and FE score contract helpers.

Must match FE getGradeFromScore and ModuleScoreBreakdown / CategoryResult shapes.
"""

from __future__ import annotations

from typing import Any


def get_grade(score: float) -> str:
    """Convert numeric score to letter grade (A–E)."""
    if score >= 80:
        return "A"
    if score >= 60:
        return "B"
    if score >= 40:
        return "C"
    if score >= 20:
        return "D"
    return "E"


DEFAULT_GRADING_SCALE = {
    "A": [80, 100],
    "B": [60, 79],
    "C": [40, 59],
    "D": [20, 39],
    "E": [0, 19],
}

# ── FE Score Contract ──
# FE ModuleScoreBreakdown requires exactly these 4 keys.
# Using the module-style keys avoids the legacy normalizer path entirely.
SCORE_DIMENSIONS = ("adversarial", "safety", "privacy", "hallucination")

# Maps AI Engine categoryId → FE module dimension key
_CATEGORY_TO_MODULE: dict[str, str] = {
    "security": "adversarial",
    "adversarial": "adversarial",
    "trust": "safety",
    "safety": "safety",
    "privacy": "privacy",
    "hallucination": "hallucination",
    "readiness": "hallucination",
    "compliance": "hallucination",
}

# Module metadata for building complete CategoryResult objects
_MODULE_META: dict[str, dict[str, str]] = {
    "adversarial": {"name": "Adversarial Robustness", "description": "Ketahanan terhadap serangan adversarial dan manipulasi prompt."},
    "safety": {"name": "Safety & Alignment", "description": "Keselamatan model terhadap toxicity, bias, dan harmful content."},
    "privacy": {"name": "Privacy", "description": "Perlindungan data pribadi dan informasi sensitif."},
    "hallucination": {"name": "Hallucination & Truthfulness", "description": "Kebenaran jawaban, konsistensi, dan akurasi konteks lokal."},
}


def build_complete_scores(ai_engine_categories: list[dict[str, Any]]) -> dict[str, float]:
    """Build a complete ModuleScoreBreakdown dict from AI Engine category output.

    Always returns all 4 dimension keys. Unevaluated dimensions default to 0.
    """
    scores: dict[str, float] = {dim: 0.0 for dim in SCORE_DIMENSIONS}
    for cat in ai_engine_categories:
        raw_id = cat.get("categoryId", "")
        module_key = _CATEGORY_TO_MODULE.get(raw_id, raw_id)
        if module_key in scores:
            scores[module_key] = float(cat.get("score", 0.0))
    return scores


def build_complete_category_results(ai_engine_categories: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Build a complete list of CategoryResult dicts matching the FE CategoryResult interface.

    Always returns exactly 4 entries (one per module). Unevaluated modules get score 0 / grade E.
    """
    # Index incoming results by module key
    by_module: dict[str, dict[str, Any]] = {}
    for cat in ai_engine_categories:
        raw_id = cat.get("categoryId", "")
        module_key = _CATEGORY_TO_MODULE.get(raw_id, raw_id)
        if module_key in dict.fromkeys(SCORE_DIMENSIONS):
            by_module[module_key] = cat

    results = []
    for dim in SCORE_DIMENSIONS:
        meta = _MODULE_META[dim]
        source = by_module.get(dim, {})
        score = float(source.get("score", 0.0))
        results.append({
            "id": dim,
            "name": meta["name"],
            "score": score,
            "grade": get_grade(score),
            "description": meta["description"],
            "recipes": [],  # Will be populated when real recipe-level results exist
        })
    return results
