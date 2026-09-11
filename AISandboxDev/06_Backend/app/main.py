"""FastAPI application factory with CORS, routes, and startup hooks."""

from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app.api import health, auth, models, runs, reviews, promote, ranking, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: create tables on startup."""
    # Startup: ensure tables exist and artifact directory created
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    settings.artifact_dir
    yield
    # Shutdown: nothing to clean up for now


def create_app() -> FastAPI:
    """Build and configure the FastAPI application."""
    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description="AI Sandbox Backend — Async SQLite/PostgreSQL API",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # ── CORS ──
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routes ──
    prefix = settings.api_prefix  # /api

    app.include_router(health.router, prefix=prefix)
    app.include_router(auth.router, prefix=prefix)
    app.include_router(models.router, prefix=prefix)
    app.include_router(runs.router, prefix=prefix)
    app.include_router(reviews.router, prefix=prefix)
    app.include_router(promote.router, prefix=prefix)
    app.include_router(ranking.router, prefix=prefix)
    app.include_router(users.router, prefix=prefix)

    return app


app = create_app()
