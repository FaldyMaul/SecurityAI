"""Promotion endpoints. Matches FE MSW /api/models/:id/promote and /publish handlers."""

from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.model import SandboxModel
from app.models.run import Run
from app.utils import get_grade

router = APIRouter(prefix="/models/{model_id}", tags=["promotion"])


async def _get_latest_run(model_id: str, run_id: str | None, db: AsyncSession):
    """Find the relevant run for promotion validation."""
    if run_id:
        result = await db.execute(select(Run).where(Run.id == run_id, Run.model_id == model_id))
    else:
        result = await db.execute(
            select(Run)
            .where(Run.model_id == model_id)
            .order_by(Run.created_at.desc())
            .limit(1)
        )
    return result.scalar_one_or_none()


async def _validate_promotion(model_id: str, body: dict, db: AsyncSession):
    """Shared promotion validation logic."""
    run = await _get_latest_run(model_id, body.get("runId"), db)
    if not run:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "code": "NO_RUN_AVAILABLE",
                "message": "Model belum memiliki hasil benchmark untuk dipromosikan.",
            },
        )

    score = body.get("score") or body.get("overallScore") or run.overall_score or 0
    grade = get_grade(score)
    can_publish = grade not in ("D", "E")

    return {
        "canPublish": can_publish,
        "grade": grade,
        "score": score,
        "runId": run.id,
        "reason": (
            "Model memenuhi syarat minimum promosi ke ModelHub."
            if can_publish
            else f"Model grade {grade} tidak memenuhi minimum promosi. Perlu rerun setelah perbaikan."
        ),
        "minimumGrade": "C",
    }


@router.post("/promote/validate")
async def validate_promotion(model_id: str, body: dict = {}, db: AsyncSession = Depends(get_db)):
    """Check promotion eligibility."""
    data = await _validate_promotion(model_id, body, db)
    return {"success": True, "data": data}


@router.post("/promote")
async def promote_model(model_id: str, body: dict = {}, db: AsyncSession = Depends(get_db)):
    """Promote model to ModelHub."""
    run = await _get_latest_run(model_id, body.get("runId"), db)
    if not run:
        raise HTTPException(status_code=404, detail="Run tidak ditemukan.")

    score = body.get("overallScore") or body.get("score") or run.overall_score or 0
    grade = get_grade(score)

    if grade in ("D", "E"):
        raise HTTPException(
            status_code=422,
            detail={
                "success": False,
                "code": "PROMOTION_BLOCKED_LOW_GRADE",
                "message": f"Promosi ditolak. Grade {grade} berada di bawah standar minimum C.",
            },
        )

    # Update model status
    result = await db.execute(select(SandboxModel).where(SandboxModel.id == model_id))
    model = result.scalar_one_or_none()
    if model:
        model.status = "published_to_modelhub"
        model.updated_at = datetime.now(timezone.utc)

    return {
        "success": True,
        "data": {
            "modelId": model_id,
            "status": "published_to_modelhub",
            "runId": run.id,
            "promotedAt": datetime.now(timezone.utc).isoformat(),
            "grade": grade,
        },
        "message": "Model berhasil dipromosikan ke ModelHub.",
    }


# Legacy publish aliases (same logic)
@router.post("/publish/validate")
async def validate_publish(model_id: str, body: dict = {}, db: AsyncSession = Depends(get_db)):
    """Legacy alias for promote validation."""
    data = await _validate_promotion(model_id, body, db)
    return {"success": True, "data": data}


@router.post("/publish")
async def publish_model(model_id: str, body: dict = {}, db: AsyncSession = Depends(get_db)):
    """Legacy alias for promote."""
    return await promote_model(model_id, body, db)
