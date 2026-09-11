"""Health check endpoint."""

from fastapi import APIRouter

router = APIRouter(tags=["system"])


@router.get("/health")
async def health_check():
    """System health check. Matches FE MSW /api/health handler."""
    return {
        "success": True,
        "data": {
            "api": "healthy",
            "database": "healthy",
            "litellm": "not_configured",
            "moonshot": "not_configured",
            "jobQueue": 0,
            "lastFailure": None,
        },
    }
