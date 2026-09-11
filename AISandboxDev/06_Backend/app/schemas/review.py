"""Review schemas. Matches FE review.ts types."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AuditTrailRead(BaseModel):
    """Audit trail entry response."""
    id: str
    action: str
    actor: str
    actorName: str
    timestamp: datetime
    oldValue: Optional[str] = None
    newValue: Optional[str] = None
    reason: Optional[str] = None


class ReviewRead(BaseModel):
    """Response shape for a review. Matches FE Review interface."""
    id: str
    modelId: str
    modelName: str
    modelProvider: str
    runId: str
    runDate: datetime
    overallScore: float
    criticalCount: int
    status: str
    decision: Optional[str] = None
    decisionReason: Optional[str] = None
    reviewerNotes: Optional[str] = None
    reviewerId: Optional[str] = None
    reviewerName: Optional[str] = None
    isPublished: bool
    createdAt: datetime
    updatedAt: datetime
    auditTrail: list[AuditTrailRead] = []

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_review(cls, r, audit_entries=None) -> "ReviewRead":
        trail = []
        for a in (audit_entries or []):
            trail.append(AuditTrailRead(
                id=a.id, action=a.action, actor=a.actor,
                actorName=a.actor_name, timestamp=a.timestamp,
                oldValue=a.old_value, newValue=a.new_value, reason=a.reason,
            ))
        return cls(
            id=r.id, modelId=r.model_id, modelName=r.model_name,
            modelProvider=r.model_provider, runId=r.run_id,
            runDate=r.run_date, overallScore=r.overall_score,
            criticalCount=r.critical_count, status=r.status,
            decision=r.decision, decisionReason=r.decision_reason,
            reviewerNotes=r.reviewer_notes, reviewerId=r.reviewer_id,
            reviewerName=r.reviewer_name, isPublished=r.is_published,
            createdAt=r.created_at, updatedAt=r.updated_at,
            auditTrail=trail,
        )


class ReviewDecisionCreate(BaseModel):
    """Request body for POST /api/reviews/:id/decision."""
    decision: str
    reason: Optional[str] = None
    notes: Optional[str] = None
