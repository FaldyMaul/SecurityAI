"""Shared response wrappers matching FE ApiResponse / PaginatedResponse / ApiError."""

from __future__ import annotations

from typing import Any, Generic, List, Optional, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    """Standard single-item response. Matches FE ApiResponse<T>."""
    success: bool = True
    data: T
    message: Optional[str] = None


class PaginatedResponse(BaseModel, Generic[T]):
    """Standard paginated response. Matches FE PaginatedResponse<T>."""
    data: List[T]
    total: int
    page: int
    limit: int
    totalPages: int


class ApiErrorResponse(BaseModel):
    """Error response shape. Matches FE ApiError."""
    status: int
    message: str
    code: Optional[str] = None
    details: Optional[dict[str, Any]] = None


class SuccessMessage(BaseModel):
    """Simple success response."""
    success: bool = True
    message: str = "OK"
