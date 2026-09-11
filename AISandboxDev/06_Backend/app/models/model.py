"""SandboxModel ORM model."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class SandboxModel(Base):
    """Registered model in AI Sandbox. Maps to FE Model type."""

    __tablename__ = "sandbox_models"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    provider: Mapped[str] = mapped_column(String(255), nullable=False)
    base_model: Mapped[str | None] = mapped_column(String(255), nullable=True)
    endpoint_url: Mapped[str] = mapped_column(Text, nullable=False)
    auth_method: Mapped[str] = mapped_column(String(20), nullable=False, default="bearer")
    api_key_encrypted: Mapped[str | None] = mapped_column(Text, nullable=True)
    model_version: Mapped[str | None] = mapped_column(String(100), nullable=True)
    intended_use_case: Mapped[str | None] = mapped_column(Text, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="draft")
    owner_id: Mapped[str] = mapped_column(String(50), ForeignKey("users.id"), nullable=False)
    owner_name: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    source: Mapped[str] = mapped_column(String(20), nullable=False, default="manual")
    latest_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    latest_run_id: Mapped[str | None] = mapped_column(String(50), nullable=True)
    latest_run_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
