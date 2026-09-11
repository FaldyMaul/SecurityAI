"""Ranking endpoints. Matches FE MSW /api/ranking handlers."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.ranking import RankingEntry

router = APIRouter(prefix="/ranking", tags=["ranking"])


def _entry_to_dict(r: RankingEntry) -> dict:
    return {
        "id": r.id,
        "modelId": r.model_id,
        "modelName": r.model_name,
        "provider": r.provider,
        "rank": r.rank,
        "overallScore": r.overall_score,
        "scores": r.scores,
        "approvalLabel": r.approval_label,
        "suitabilityTags": r.suitability_tags or [],
        "strengths": r.strengths or [],
        "weaknesses": r.weaknesses or [],
        "restrictions": r.restrictions,
        "recommendedUseCases": r.recommended_use_cases,
        "isPublished": r.is_published,
        "lastAssessedAt": r.last_assessed_at.isoformat() if r.last_assessed_at else None,
    }


@router.get("")
async def list_ranking(db: AsyncSession = Depends(get_db)):
    """List all ranking entries."""
    result = await db.execute(select(RankingEntry).order_by(RankingEntry.rank))
    entries = result.scalars().all()
    return {
        "data": [_entry_to_dict(e) for e in entries],
        "total": len(entries),
        "page": 1,
        "limit": 10,
        "totalPages": 1,
    }


@router.get("/compare")
async def compare_models(ids: str = "", db: AsyncSession = Depends(get_db)):
    """Compare ranking entries by model IDs."""
    id_list = [i.strip() for i in ids.split(",") if i.strip()]
    result = await db.execute(
        select(RankingEntry).where(RankingEntry.model_id.in_(id_list))
    )
    entries = result.scalars().all()
    return {"success": True, "data": {"models": [_entry_to_dict(e) for e in entries]}}
