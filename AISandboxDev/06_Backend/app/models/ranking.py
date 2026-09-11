"""RankingEntry ORM model for ModelHub leaderboard."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Float, Integer, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class RankingEntry(Base):
    """Materialized ranking row for promoted models."""

    __tablename__ = "ranking_entries"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    model_id: Mapped[str] = mapped_column(String(50), ForeignKey("sandbox_models.id"), unique=True, nullable=False)
    model_name: Mapped[str] = mapped_column(String(255), nullable=False)
    provider: Mapped[str] = mapped_column(String(255), nullable=False)
    rank: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    overall_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    scores: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    approval_label: Mapped[str] = mapped_column(String(50), nullable=False, default="")
    suitability_tags: Mapped[list | None] = mapped_column(JSON, nullable=True)
    strengths: Mapped[list | None] = mapped_column(JSON, nullable=True)
    weaknesses: Mapped[list | None] = mapped_column(JSON, nullable=True)
    restrictions: Mapped[list | None] = mapped_column(JSON, nullable=True)
    recommended_use_cases: Mapped[list | None] = mapped_column(JSON, nullable=True)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
    last_assessed_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
