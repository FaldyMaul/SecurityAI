"""Review endpoints. Matches FE MSW /api/reviews handlers."""

from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.review import Review, AuditTrailEntry
from app.schemas.review import ReviewRead, ReviewDecisionCreate

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("")
async def list_reviews(db: AsyncSession = Depends(get_db)):
    """List all reviews. Matches FE PaginatedResponse."""
    result = await db.execute(select(Review).order_by(Review.created_at.desc()))
    reviews = result.scalars().all()

    review_reads = []
    for r in reviews:
        audit_result = await db.execute(
            select(AuditTrailEntry).where(AuditTrailEntry.review_id == r.id)
        )
        audit_entries = audit_result.scalars().all()
        review_reads.append(
            ReviewRead.from_orm_review(r, audit_entries).model_dump(mode="json")
        )

    return {
        "data": review_reads,
        "total": len(review_reads),
        "page": 1,
        "limit": 10,
        "totalPages": 1,
    }


@router.get("/{review_id}")
async def get_review(review_id: str, db: AsyncSession = Depends(get_db)):
    """Get a single review with audit trail."""
    result = await db.execute(select(Review).where(Review.id == review_id))
    review = result.scalar_one_or_none()
    if not review:
        raise HTTPException(status_code=404, detail="Not found")

    audit_result = await db.execute(
        select(AuditTrailEntry).where(AuditTrailEntry.review_id == review_id)
    )
    audit_entries = audit_result.scalars().all()

    return {
        "success": True,
        "data": ReviewRead.from_orm_review(review, audit_entries).model_dump(mode="json"),
    }


@router.post("/{review_id}/decision")
async def set_decision(
    review_id: str,
    body: ReviewDecisionCreate,
    db: AsyncSession = Depends(get_db),
):
    """Set a review decision. Creates audit trail entry."""
    result = await db.execute(select(Review).where(Review.id == review_id))
    review = result.scalar_one_or_none()
    if not review:
        raise HTTPException(status_code=404, detail="Not found")

    import uuid

    old_decision = review.decision

    review.decision = body.decision
    review.decision_reason = body.reason
    review.reviewer_notes = body.notes
    review.status = "decided"
    review.reviewer_id = "user-admin"  # MVP: hardcoded
    review.reviewer_name = "Admin Reviewer"
    review.updated_at = datetime.now(timezone.utc)

    audit = AuditTrailEntry(
        id=f"audit-{uuid.uuid4().hex[:8]}",
        review_id=review_id,
        action="decision_set",
        actor="user-admin",
        actor_name="Admin Reviewer",
        old_value=old_decision,
        new_value=body.decision,
        reason=body.reason,
    )
    db.add(audit)
    await db.flush()

    return {"success": True, "message": "Keputusan berhasil direkam"}
