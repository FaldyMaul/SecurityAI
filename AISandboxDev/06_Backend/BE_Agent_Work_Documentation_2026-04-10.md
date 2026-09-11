# Backend Agent Work Documentation

Date: 2026-04-10
Agent: BE Agent
Scope: `AISandboxDev/06_Backend`

---

## Current Status

**Phase 1 COMPLETE** — Backend is running and serving all API endpoints with seeded fixture data.

## What Was Built

- FastAPI application with **22 API endpoints** matching FE MSW handlers
- SQLAlchemy ORM with **8 database tables**
- Pydantic schemas with **camelCase field names** matching FE TypeScript types
- Seed script loading data from **FE fixture JSON files**
- Swagger UI at `http://localhost:8000/docs`

## Stack

| Component | Implementation |
|-----------|---------------|
| Framework | FastAPI 0.135 |
| Database Runtime | **Async SQLAlchemy 2.0** (`AsyncSession`) |
| Database MVP | SQLite via `aiosqlite` (Python 3.11 64-bit) |
| Database Prod | PostgreSQL via `asyncpg` |
| Auth | Simplified MVP (returns configured user) |
| Background Jobs | Planned (ARQ + Redis) |

## How to Run

```bash
cd 06_Backend

# First time setup
python -m venv venv
.\venv\Scripts\pip.exe install fastapi uvicorn sqlalchemy alembic pydantic pydantic-settings "python-jose[cryptography]" python-multipart httpx

# Seed the database
.\venv\Scripts\python.exe -m app.seed

# Start the server
.\venv\Scripts\python.exe -m uvicorn app.main:app --port 8000 --reload
```

## API Endpoints

All endpoints are under `/api/` prefix and return responses matching the FE TypeScript types.

### Implemented (Phase 1)
- `GET /api/health` — System health check
- `GET/POST /api/auth/me|login|logout` — Simplified auth
- `GET/POST /api/models` — Model CRUD
- `GET/POST /api/models/:id/runs` — Run CRUD
- `GET /api/models/:id/runs/:rid/results` — Benchmark results
- `GET/POST /api/reviews` — Review queue + decisions
- `POST /api/models/:id/promote|publish` — Promotion workflow
- `GET /api/ranking` — Leaderboard

### Planned (Phase 2+)
- `GET /api/models/:id/history` — Run history timeline
- `GET /api/models/:id/compare` — Run-to-run comparison
- Background benchmark execution via ARQ worker

## Database Tables

| Table | Records | Source |
|-------|---------|--------|
| users | 2 | users.json |
| sandbox_models | 5 | models.json |
| runs | 9 | runs.json |
| benchmark_results | 4 | benchmark-results.json |
| recipe_results | 0 | (Phase 2) |
| reviews | 2 | reviews.json |
| audit_trail | 1 | reviews.json |
| ranking_entries | 3 | ranking.json |

## FE Integration

To connect the FE to the real backend:
1. Set `NEXT_PUBLIC_API_URL=http://localhost:8000` in `03_Frontend/.env`
2. Disable MSW mock handlers
3. The response shapes are identical — no FE changes needed

## Dependencies on Other Agents

| Dependency | Agent | Status |
|-----------|-------|--------|
| FE TypeScript types | FE Agent | ✅ Aligned |
| Benchmark recipes | AI Engineer Agent | ⏳ Phase 2 |
| Review decision states | PM Agent | ✅ Aligned |
| Deployment pipeline | Publisher Agent | ⏳ Phase 5 |
