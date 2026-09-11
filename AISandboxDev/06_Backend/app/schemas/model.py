"""Model schemas. Matches FE model.ts types."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ModelCreate(BaseModel):
    """Request body for POST /api/models."""
    name: str
    provider: str
    baseModel: Optional[str] = None
    endpointUrl: str
    authMethod: str = "bearer"
    apiKey: Optional[str] = None
    modelVersion: Optional[str] = None
    intendedUseCase: Optional[str] = None
    description: Optional[str] = None
    source: str = "manual"


class ModelRead(BaseModel):
    """Response shape for a model. Matches FE Model interface."""
    id: str
    name: str
    provider: str
    baseModel: Optional[str] = None
    endpointUrl: str
    authMethod: str
    status: str
    ownerId: str
    ownerName: str
    createdAt: datetime
    updatedAt: datetime
    latestScore: Optional[float] = None
    latestRunId: Optional[str] = None
    latestRunDate: Optional[datetime] = None
    source: str

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_model(cls, m) -> "ModelRead":
        return cls(
            id=m.id,
            name=m.name,
            provider=m.provider,
            baseModel=m.base_model,
            endpointUrl=m.endpoint_url,
            authMethod=m.auth_method,
            status=m.status,
            ownerId=m.owner_id,
            ownerName=m.owner_name,
            createdAt=m.created_at,
            updatedAt=m.updated_at,
            latestScore=m.latest_score,
            latestRunId=m.latest_run_id,
            latestRunDate=m.latest_run_date,
            source=m.source,
        )
