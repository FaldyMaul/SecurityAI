"""Run and benchmark result schemas. Matches FE run.ts types."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class RunRead(BaseModel):
    """Response shape for a run. Matches FE Run interface."""
    id: str
    modelId: str
    packageName: str
    status: str
    overallScore: Optional[float] = None
    scores: Optional[dict] = None
    startedAt: Optional[datetime] = None
    completedAt: Optional[datetime] = None
    duration: Optional[int] = None
    progress: Optional[dict] = None
    findings: Optional[list] = None
    selectedCategories: Optional[list] = None
    selectedRecipes: Optional[list] = None
    recipeResults: Optional[dict] = None
    error: Optional[dict] = None
    createdAt: datetime

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_run(cls, r) -> "RunRead":
        return cls(
            id=r.id,
            modelId=r.model_id,
            packageName=r.package_name,
            status=r.status,
            overallScore=r.overall_score,
            scores=r.scores,
            startedAt=r.started_at,
            completedAt=r.completed_at,
            duration=r.duration,
            progress=r.progress,
            findings=r.findings,
            selectedCategories=r.selected_categories,
            selectedRecipes=r.selected_recipes,
            recipeResults=r.recipe_results_map,
            error=r.error,
            createdAt=r.created_at,
        )


class RunCreate(BaseModel):
    """Request body for POST /api/models/:id/runs."""
    packageName: str = "Indonesia Core Trust Package"
    selectedCategories: Optional[list] = None
    selectedRecipes: Optional[list] = None


class BenchmarkResultRead(BaseModel):
    """Full benchmark result response. Matches FE BenchmarkResult interface."""
    metadata: Optional[dict] = None
    overallGrade: str
    overallScore: float
    gradingScale: Optional[dict] = None
    categoryResults: Optional[list] = None

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_result(cls, br) -> "BenchmarkResultRead":
        return cls(
            metadata=br.metadata_json,
            overallGrade=br.overall_grade,
            overallScore=br.overall_score,
            gradingScale=br.grading_scale,
            categoryResults=br.category_results,
        )


class PromoteValidateResponse(BaseModel):
    """Response for promotion validation."""
    canPublish: bool
    grade: str
    score: float
    runId: str
    reason: str
    minimumGrade: str = "C"


class PromoteResponse(BaseModel):
    """Response for successful promotion."""
    modelId: str
    status: str
    runId: str
    promotedAt: datetime
    grade: str
