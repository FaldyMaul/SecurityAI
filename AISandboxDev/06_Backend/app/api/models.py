"""Model CRUD endpoints. Matches FE MSW /api/models handlers."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.model import SandboxModel
from app.schemas.model import ModelCreate, ModelRead

router = APIRouter(prefix="/models", tags=["models"])


@router.get("")
async def list_models(
    page: int = 1,
    limit: int = 10,
    status: str | None = None,
    search: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    """List all models with optional filtering. Matches FE PaginatedResponse."""
    query = select(SandboxModel)

    if status:
        query = query.where(SandboxModel.status == status)
    if search:
        query = query.where(SandboxModel.name.ilike(f"%{search}%"))

    # Count
    count_q = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_q)).scalar() or 0

    # Paginate
    offset = (page - 1) * limit
    query = query.order_by(SandboxModel.created_at.desc()).offset(offset).limit(limit)
    result = await db.execute(query)
    models = result.scalars().all()

    total_pages = max(1, (total + limit - 1) // limit)

    return {
        "data": [ModelRead.from_orm_model(m).model_dump(mode="json") for m in models],
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": total_pages,
    }


@router.get("/{model_id}")
async def get_model(model_id: str, db: AsyncSession = Depends(get_db)):
    """Get a single model by ID."""
    result = await db.execute(select(SandboxModel).where(SandboxModel.id == model_id))
    model = result.scalar_one_or_none()
    if not model:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True, "data": ModelRead.from_orm_model(model).model_dump(mode="json")}


@router.post("")
async def create_model(body: ModelCreate, db: AsyncSession = Depends(get_db)):
    """Create a new model (draft). Matches FE POST /api/models."""
    model = SandboxModel(
        id=f"model-{uuid.uuid4().hex[:8]}",
        name=body.name,
        provider=body.provider,
        base_model=body.baseModel,
        endpoint_url=body.endpointUrl,
        auth_method=body.authMethod,
        api_key_encrypted=body.apiKey,
        model_version=body.modelVersion,
        intended_use_case=body.intendedUseCase,
        description=body.description,
        status="draft",
        owner_id="user-001",  # MVP: hardcoded current user
        owner_name="Budi Santoso",
        source=body.source,
    )
    db.add(model)
    await db.flush()

    return {
        "success": True,
        "data": ModelRead.from_orm_model(model).model_dump(mode="json"),
        "message": "Draf berhasil disimpan",
    }


@router.post("/{model_id}/validate")
async def validate_endpoint(model_id: str, db: AsyncSession = Depends(get_db)):
    """Validate model endpoint. MVP: always returns success."""
    result = await db.execute(select(SandboxModel).where(SandboxModel.id == model_id))
    model = result.scalar_one_or_none()
    if not model:
        raise HTTPException(status_code=404, detail="Not found")

    model.status = "endpoint_valid"
    model.updated_at = datetime.now(timezone.utc)
    await db.flush()

    return {"success": True, "data": {"status": "endpoint_valid"}}
