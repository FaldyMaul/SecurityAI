"""Application configuration via environment variables."""

from __future__ import annotations

import json
from pathlib import Path
from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Central application settings loaded from .env or environment."""

    # ── Application ──
    app_name: str = "AI Sandbox Backend"
    app_env: str = "development"
    debug: bool = True
    secret_key: str = "change-me"
    api_prefix: str = "/api"

    # ── Server ──
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True

    # ── Database ──
    database_url: str = "postgresql+asyncpg://sandbox:sandbox@localhost:5432/ai_sandbox"
    database_url_sync: str = "postgresql+psycopg2://sandbox:sandbox@localhost:5432/ai_sandbox"

    # ── CORS ──
    cors_origins: str = '["http://localhost:3000","http://localhost:3001"]'

    # ── JWT ──
    jwt_secret_key: str = "change-me-jwt"
    jwt_algorithm: str = "HS256"
    jwt_expiry_minutes: int = 1440

    # ── Redis ──
    redis_url: str = "redis://localhost:6379/0"

    # ── LiteLLM ──
    litellm_api_base: str = "http://localhost:4000"

    # ── Artifact Storage ──
    artifact_storage_path: str = "./artifacts"

    @property
    def cors_origin_list(self) -> List[str]:
        """Parse CORS origins from JSON string."""
        try:
            return json.loads(self.cors_origins)
        except (json.JSONDecodeError, TypeError):
            return ["http://localhost:3000", "http://localhost:3001"]

    @property
    def artifact_dir(self) -> Path:
        p = Path(self.artifact_storage_path)
        p.mkdir(parents=True, exist_ok=True)
        return p

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8", "extra": "ignore"}


settings = Settings()
