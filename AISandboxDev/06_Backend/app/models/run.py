"""Run, BenchmarkResult, and RecipeResult ORM models."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Text, Float, Integer, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Run(Base):
    """A single benchmark run for a model. Maps to FE Run type."""

    __tablename__ = "runs"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    model_id: Mapped[str] = mapped_column(String(50), ForeignKey("sandbox_models.id"), nullable=False)
    package_name: Mapped[str] = mapped_column(String(255), nullable=False, default="Indonesia Core Trust Package")
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="queued")
    overall_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    scores: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    started_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    duration: Mapped[int | None] = mapped_column(Integer, nullable=True)
    progress: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    findings: Mapped[list | None] = mapped_column(JSON, nullable=True)
    selected_categories: Mapped[list | None] = mapped_column(JSON, nullable=True)
    selected_recipes: Mapped[list | None] = mapped_column(JSON, nullable=True)
    recipe_results_map: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    error: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    guardrail_profile: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )


class BenchmarkResult(Base):
    """Full benchmark result for a completed run. Maps to FE BenchmarkResult type."""

    __tablename__ = "benchmark_results"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    run_id: Mapped[str] = mapped_column(String(50), ForeignKey("runs.id"), unique=True, nullable=False)
    metadata_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    overall_grade: Mapped[str] = mapped_column(String(1), nullable=False, default="E")
    overall_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    grading_scale: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    category_results: Mapped[list | None] = mapped_column(JSON, nullable=True)
    raw_artifact_path: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )


class RecipeResult(Base):
    """Per-recipe result detail. Maps to FE SelectedRecipeResult type."""

    __tablename__ = "recipe_results"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    run_id: Mapped[str] = mapped_column(String(50), ForeignKey("runs.id"), nullable=False)
    recipe_id: Mapped[str] = mapped_column(String(100), nullable=False)
    category_id: Mapped[str] = mapped_column(String(50), nullable=False)
    category_name: Mapped[str] = mapped_column(String(255), nullable=False)
    recipe_name: Mapped[str] = mapped_column(String(255), nullable=False)
    method: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    dataset: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    grade: Mapped[str] = mapped_column(String(1), nullable=False, default="E")
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="failed")
    total_tests: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    passed: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    failed: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    critical: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    findings: Mapped[list | None] = mapped_column(JSON, nullable=True)
    recommendations: Mapped[list | None] = mapped_column(JSON, nullable=True)
