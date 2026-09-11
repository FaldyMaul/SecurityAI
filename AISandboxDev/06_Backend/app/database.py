"""SQLAlchemy async database engine and session management.

MVP uses aiosqlite for local development since Docker is not available.
PostgreSQL is the production target — switch via DATABASE_URL when ready.
"""

from __future__ import annotations

import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

# ── Determine database URL ──
# Fallback to aiosqlite for local MVP development
_db_url = settings.database_url
if not _db_url or "postgresql" not in _db_url:
    _db_url = "sqlite+aiosqlite:///./ai_sandbox.db"

engine = create_async_engine(
    _db_url,
    echo=settings.debug,
)

from sqlalchemy import event

@event.listens_for(engine.sync_engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    if "sqlite" in _db_url:
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.execute("PRAGMA synchronous=NORMAL")
        cursor.close()


AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

class Base(DeclarativeBase):
    """Base class for all ORM models."""
    pass

async def get_db():
    """FastAPI dependency that yields an async database session."""
    async with AsyncSessionLocal() as db:
        try:
            yield db
            await db.commit()
        except Exception:
            await db.rollback()
            raise
