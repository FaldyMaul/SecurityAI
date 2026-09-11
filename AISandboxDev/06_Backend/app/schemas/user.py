"""User schemas."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class UserRead(BaseModel):
    """User response shape. Matches FE User type."""
    id: str
    email: str
    displayName: str
    role: str
    preferences: Optional[dict] = None
    notifications: Optional[dict] = None
    createdAt: datetime

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_user(cls, user) -> "UserRead":
        return cls(
            id=user.id,
            email=user.email,
            displayName=user.name,
            role=user.role,
            preferences=user.preferences,
            notifications=user.notifications,
            createdAt=user.created_at,
        )
