"""User settings endpoints. Matches FE MSW /api/users handlers."""

from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.patch("/me")
async def update_user():
    """Update current user settings."""
    return {"success": True, "message": "Pengaturan berhasil disimpan"}


@router.patch("/me/preferences")
async def update_preferences():
    """Update user preferences."""
    return {"success": True, "message": "Pengaturan berhasil disimpan"}


@router.patch("/me/notifications")
async def update_notifications():
    """Update notification settings."""
    return {"success": True, "message": "Pengaturan berhasil disimpan"}
