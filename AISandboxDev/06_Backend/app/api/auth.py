"""Auth endpoints (simplified MVP — returns configured user)."""

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRead

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/me")
async def get_current_user(db: AsyncSession = Depends(get_db)):
    """Return the current user. MVP: returns first user (model_owner)."""
    result = await db.execute(select(User).order_by(User.created_at).limit(1))
    user = result.scalar_one_or_none()
    if not user:
        return {"success": True, "data": None}
    return {"success": True, "data": UserRead.from_orm_user(user).model_dump(mode="json")}


@router.post("/login")
async def login(db: AsyncSession = Depends(get_db)):
    """Simplified login. Returns first user."""
    result = await db.execute(select(User).order_by(User.created_at).limit(1))
    user = result.scalar_one_or_none()
    if not user:
        return {"success": False, "message": "No users configured"}
    return {
        "success": True,
        "data": UserRead.from_orm_user(user).model_dump(mode="json"),
        "message": "Login successful",
    }


@router.post("/logout")
async def logout():
    """Simplified logout."""
    return {"success": True}
