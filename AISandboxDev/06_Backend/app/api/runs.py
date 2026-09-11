"""Run endpoints. Matches FE MSW /api/models/:id/runs handlers."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db, AsyncSessionLocal
from app.models.model import SandboxModel
from app.models.run import Run, BenchmarkResult
from app.schemas.run import RunRead, RunCreate, BenchmarkResultRead
from app.utils import get_grade

import asyncio

router = APIRouter(prefix="/models/{model_id}/runs", tags=["runs"])

# REMOVED run_mock_benchmark in favor of ARQ worker `run_benchmark_task`


@router.get("")
async def list_runs(model_id: str, db: AsyncSession = Depends(get_db)):
    """List all runs for a model. Matches FE PaginatedResponse."""
    result = await db.execute(
        select(Run)
        .where(Run.model_id == model_id)
        .order_by(Run.created_at.desc())
    )
    runs = result.scalars().all()
    return {
        "data": [RunRead.from_orm_run(r).model_dump(mode="json") for r in runs],
        "total": len(runs),
        "page": 1,
        "limit": 100,
        "totalPages": 1,
    }


@router.get("/{run_id}")
async def get_run(model_id: str, run_id: str, db: AsyncSession = Depends(get_db)):
    """Get a single run by ID."""
    result = await db.execute(select(Run).where(Run.id == run_id))
    run = result.scalar_one_or_none()
    if not run:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True, "data": RunRead.from_orm_run(run).model_dump(mode="json")}


@router.post("")
async def create_run(model_id: str, body: RunCreate, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    """Create a new run (queued). Matches FE POST /api/models/:id/runs."""
    run = Run(
        id=f"run-{uuid.uuid4().hex[:8]}",
        model_id=model_id,
        package_name=body.packageName,
        status="queued",
        selected_categories=body.selectedCategories,
        selected_recipes=body.selectedRecipes,
        started_at=datetime.now(timezone.utc),
        created_at=datetime.now(timezone.utc),
    )
    db.add(run)
    
    # Update Model status to run_queued
    result = await db.execute(select(SandboxModel).where(SandboxModel.id == model_id))
    model = result.scalar_one_or_none()
    if model:
        model.status = "run_queued"
        
    await db.commit()

    # Enqueue benchmark task directly via BackgroundTasks since Docker/Redis is unavailable natively
    from app.worker import run_benchmark_task
    
    background_tasks.add_task(run_benchmark_task, None, run.id)
    
    return {
        "success": True,
        "data": {"id": run.id, "status": "queued", "createdAt": run.created_at.isoformat()},
    }


@router.get("/{run_id}/results")
async def get_run_results(model_id: str, run_id: str, db: AsyncSession = Depends(get_db)):
    """Get full benchmark results for a completed run."""
    result = await db.execute(select(BenchmarkResult).where(BenchmarkResult.run_id == run_id))
    br = result.scalar_one_or_none()
    if not br:
        raise HTTPException(status_code=404, detail="No benchmark results found for this run")
    return {"success": True, "data": BenchmarkResultRead.from_orm_result(br).model_dump(mode="json")}
