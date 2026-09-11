# Backend Agent Implementation Plan

Date: 2026-04-02
Owner: BE Agent
Scope: `AISandboxDev/06_Backend`

---

## 1. Situation Assessment

### What Exists Today

| Layer | Status | Detail |
|-------|--------|--------|
| **Frontend** | ✅ Prototype running | Next.js app with MSW mock handlers, fixture JSON, full TypeScript type definitions |
| **Backend** | ❌ Empty | Only `README.md` exists in `06_Backend/` |
| **Database** | ❌ None | No schema, no migrations, no storage |
| **Benchmark Engine** | ⚠️ Separate | Moonshot exists in `07_AIEngine/`, not yet integrated with an API layer |
| **LiteLLM** | ⚠️ Conceptual | Recommended as endpoint adapter, no running instance yet |

### Frontend Data Contracts Already Defined

The FE has well-defined TypeScript types that the backend **must** match:

- `model.ts` — `Model`, `ModelStatus`, `AuthMethod`
- `run.ts` — `Run`, `BenchmarkResult`, `RecipeResult`, `PromptResult`, review-related scoring
- `review.ts` — `Review`, `ReviewDecision`, `AuditTrailEntry`
- `ranking.ts` — `RankingEntry`, `ComparisonData`
- `api.ts` — `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError`
- `handlers.ts` — 18 MSW endpoints defining exact URL patterns and response shapes

> **IMPORTANT**: The backend API must produce responses that are **drop-in replacements** for the MSW mock handlers. The FE should only need to disable MSW and point `NEXT_PUBLIC_API_URL` to the real backend.

---

## 2. Technology Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Language** | Python 3.11+ | Moonshot, LiteLLM, DeepEval, PyRIT all Python-native |
| **Framework** | FastAPI | Async-first, Pydantic schema validation, auto OpenAPI docs |
| **Database** | PostgreSQL 15+ | Relational model fits review/audit/history; JSONB for flexible artifact storage |
| **ORM** | SQLAlchemy 2.0 + Alembic | Mature async support, migration management |
| **Background Jobs** | ARQ (Redis-backed) | Lightweight async job queue; Celery as alternative if needed |
| **Endpoint Adapter** | LiteLLM (Python SDK) | Unified model access for validation and benchmark proxy |
| **Benchmark Engine** | Moonshot (Python SDK) | Current foundation; invoked via background jobs |
| **Artifact Storage** | Local filesystem (MVP) → S3/R2 later | Structured directories per run, immutable after completion |
| **Auth** | JWT + API key | JWT for UI sessions, API key for service-to-service |
| **CORS** | FastAPI middleware | Allow Next.js dev server (port 3001) and Cloudflare domain |

---

## 3. Project Structure

```
06_Backend/
├── BE_Implementation_Plan_2026-04-02.md   # This document
├── README.md                               # Agent brief (existing)
├── app/
│   ├── __init__.py
│   ├── main.py                            # FastAPI app factory, middleware, CORS
│   ├── config.py                          # Settings via pydantic-settings
│   ├── database.py                        # SQLAlchemy engine, session factory
│   │
│   ├── models/                            # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── model.py                       # SandboxModel table
│   │   ├── run.py                         # Run, BenchmarkResult tables
│   │   ├── review.py                      # Review, AuditTrail tables
│   │   ├── ranking.py                     # RankingEntry (materialized/view)
│   │   └── user.py                        # User table
│   │
│   ├── schemas/                           # Pydantic request/response schemas
│   │   ├── __init__.py
│   │   ├── common.py                      # ApiResponse, PaginatedResponse, ApiError
│   │   ├── model.py                       # ModelCreate, ModelRead, ModelListParams
│   │   ├── run.py                         # RunRead, BenchmarkResultRead, etc.
│   │   ├── review.py                      # ReviewRead, ReviewDecisionCreate
│   │   ├── ranking.py                     # RankingEntryRead, ComparisonData
│   │   └── user.py                        # UserRead
│   │
│   ├── api/                               # Route handlers
│   │   ├── __init__.py
│   │   ├── auth.py                        # /api/auth/*
│   │   ├── models.py                      # /api/models/*
│   │   ├── runs.py                        # /api/models/:id/runs/*
│   │   ├── reviews.py                     # /api/reviews/*
│   │   ├── ranking.py                     # /api/ranking/*
│   │   ├── users.py                       # /api/users/*
│   │   ├── promote.py                     # /api/models/:id/promote/*
│   │   └── health.py                      # /api/health
│   │
│   ├── services/                          # Business logic
│   │   ├── __init__.py
│   │   ├── model_service.py               # CRUD + status transitions
│   │   ├── benchmark_service.py           # Moonshot invocation, result parsing
│   │   ├── validation_service.py          # LiteLLM endpoint validation
│   │   ├── review_service.py              # Review gate logic
│   │   ├── promotion_service.py           # Eligibility rules, grade calculation
│   │   ├── ranking_service.py             # Leaderboard computation
│   │   └── artifact_service.py            # Raw output storage/retrieval
│   │
│   ├── jobs/                              # Background task definitions
│   │   ├── __init__.py
│   │   ├── benchmark_job.py               # Run Moonshot benchmark
│   │   └── validation_job.py              # Async endpoint validation
│   │
│   └── utils/
│       ├── __init__.py
│       ├── grading.py                     # Score → Grade conversion
│       └── security.py                    # JWT, hashing, auth helpers
│
├── migrations/                            # Alembic migrations
│   ├── alembic.ini
│   ├── env.py
│   └── versions/
│
├── artifacts/                             # Runtime artifact storage (gitignored)
│
├── tests/
│   ├── conftest.py
│   ├── test_models.py
│   ├── test_runs.py
│   ├── test_reviews.py
│   ├── test_promotion.py
│   └── test_benchmark.py
│
├── pyproject.toml                         # Dependencies, project metadata
├── requirements.txt                       # Pinned deps for deployment
├── .env.example                           # Environment variable template
└── Dockerfile                             # Container image for deployment
```

---

## 4. Database Schema

### 4.1 `sandbox_models` table

Maps to FE `Model` type.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | e.g. `model-001` style or true UUID |
| `name` | `VARCHAR(255)` | |
| `provider` | `VARCHAR(255)` | |
| `base_model` | `VARCHAR(255)` | nullable |
| `endpoint_url` | `TEXT` | |
| `auth_method` | `ENUM('bearer','api_key','basic','none')` | |
| `api_key_encrypted` | `TEXT` | encrypted at rest |
| `model_version` | `VARCHAR(100)` | nullable |
| `intended_use_case` | `TEXT` | nullable |
| `description` | `TEXT` | nullable |
| `status` | `VARCHAR(50)` | see ModelStatus enum below |
| `owner_id` | `UUID` FK → users | |
| `source` | `ENUM('manual','apilogy')` | |
| `latest_score` | `FLOAT` | nullable, denormalized |
| `latest_run_id` | `UUID` FK → runs | nullable |
| `latest_run_date` | `TIMESTAMPTZ` | nullable |
| `created_at` | `TIMESTAMPTZ` | |
| `updated_at` | `TIMESTAMPTZ` | |

**ModelStatus enum values** (aligned with FE `model.ts`):

```
draft → validation_pending → validation_failed | endpoint_valid
endpoint_valid → run_queued → run_in_progress → run_failed | assessment_completed
assessment_completed → review_ready → pending_review
pending_review → approved | approved_with_controls | restricted | reassessment_required
approved | approved_with_controls → promotion_ready → published_to_modelhub
```

### 4.2 `runs` table

Maps to FE `Run` type.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | |
| `model_id` | `UUID` FK → sandbox_models | |
| `package_name` | `VARCHAR(255)` | benchmark package used |
| `status` | `ENUM('queued','in_progress','running','completed','failed')` | |
| `overall_score` | `FLOAT` | nullable |
| `scores` | `JSONB` | `ModuleScoreBreakdown` or legacy |
| `started_at` | `TIMESTAMPTZ` | nullable |
| `completed_at` | `TIMESTAMPTZ` | nullable |
| `duration` | `INTEGER` | seconds, nullable |
| `progress` | `JSONB` | `RunProgress` shape |
| `selected_categories` | `JSONB` | array of `AssessmentModuleId` |
| `selected_recipes` | `JSONB` | array of recipe ID strings |
| `error` | `JSONB` | `RunError` shape, nullable |
| `created_at` | `TIMESTAMPTZ` | |

### 4.3 `benchmark_results` table

One row per completed run.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | |
| `run_id` | `UUID` FK → runs | UNIQUE |
| `metadata` | `JSONB` | `BenchmarkMetadata` |
| `overall_grade` | `CHAR(1)` | A–E |
| `overall_score` | `FLOAT` | |
| `grading_scale` | `JSONB` | grade boundaries |
| `category_results` | `JSONB` | array of `CategoryResult` |
| `raw_artifact_path` | `TEXT` | path to immutable raw output |
| `created_at` | `TIMESTAMPTZ` | |

### 4.4 `recipe_results` table

Per-recipe detail for filtered queries and history comparison.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | |
| `run_id` | `UUID` FK → runs | |
| `recipe_id` | `VARCHAR(100)` | |
| `category_id` | `VARCHAR(50)` | adversarial/safety/privacy/hallucination |
| `category_name` | `VARCHAR(255)` | |
| `recipe_name` | `VARCHAR(255)` | |
| `method` | `VARCHAR(255)` | |
| `dataset` | `VARCHAR(255)` | |
| `score` | `FLOAT` | |
| `grade` | `CHAR(1)` | |
| `status` | `ENUM('passed','failed','warning')` | |
| `total_tests` | `INTEGER` | |
| `passed` | `INTEGER` | |
| `failed` | `INTEGER` | |
| `critical` | `INTEGER` | |
| `findings` | `JSONB` | array of `RecipeFindingSummary` |
| `recommendations` | `JSONB` | array of strings |

### 4.5 `reviews` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | |
| `model_id` | `UUID` FK → sandbox_models | |
| `model_name` | `VARCHAR(255)` | denormalized snapshot |
| `model_provider` | `VARCHAR(255)` | denormalized snapshot |
| `run_id` | `UUID` FK → runs | |
| `run_date` | `TIMESTAMPTZ` | |
| `overall_score` | `FLOAT` | |
| `critical_count` | `INTEGER` | |
| `status` | `ENUM('pending','decided','overridden')` | |
| `decision` | `VARCHAR(50)` | nullable |
| `decision_reason` | `TEXT` | nullable |
| `reviewer_notes` | `TEXT` | nullable |
| `reviewer_id` | `UUID` FK → users | nullable |
| `reviewer_name` | `VARCHAR(255)` | nullable |
| `is_published` | `BOOLEAN` | default false |
| `created_at` | `TIMESTAMPTZ` | |
| `updated_at` | `TIMESTAMPTZ` | |

### 4.6 `audit_trail` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | |
| `review_id` | `UUID` FK → reviews | |
| `action` | `VARCHAR(50)` | decision_set, decision_overridden, publication_toggled, notes_updated |
| `actor` | `UUID` FK → users | |
| `actor_name` | `VARCHAR(255)` | |
| `timestamp` | `TIMESTAMPTZ` | |
| `old_value` | `TEXT` | nullable |
| `new_value` | `TEXT` | nullable |
| `reason` | `TEXT` | nullable |

### 4.7 `ranking_entries` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | |
| `model_id` | `UUID` FK → sandbox_models | UNIQUE |
| `model_name` | `VARCHAR(255)` | |
| `provider` | `VARCHAR(255)` | |
| `rank` | `INTEGER` | |
| `overall_score` | `FLOAT` | |
| `scores` | `JSONB` | trust/security/privacy/readiness/compliance |
| `approval_label` | `VARCHAR(50)` | |
| `suitability_tags` | `JSONB` | |
| `strengths` | `JSONB` | |
| `weaknesses` | `JSONB` | |
| `restrictions` | `JSONB` | nullable |
| `recommended_use_cases` | `JSONB` | nullable |
| `is_published` | `BOOLEAN` | |
| `last_assessed_at` | `TIMESTAMPTZ` | |

### 4.8 `users` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | `UUID` PK | |
| `name` | `VARCHAR(255)` | |
| `email` | `VARCHAR(255)` UNIQUE | |
| `role` | `ENUM('model_owner','admin','reviewer','developer')` | |
| `avatar_url` | `TEXT` | nullable |
| `preferences` | `JSONB` | |
| `created_at` | `TIMESTAMPTZ` | |

---

## 5. API Contract (Aligned with FE MSW Handlers)

All responses follow the FE wrapper types:

```python
# Success
{ "success": True, "data": T, "message": "..." }

# Paginated
{ "data": T[], "total": int, "page": int, "limit": int, "totalPages": int }

# Error
{ "status": int, "message": str, "code": str, "details": {} }
```

### 5.1 Auth Endpoints

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/auth/me` | P1 |
| `POST` | `/api/auth/login` | P1 |
| `POST` | `/api/auth/logout` | P1 |

### 5.2 Model Endpoints

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/models` | P1 |
| `GET` | `/api/models/:id` | P1 |
| `POST` | `/api/models` | P1 |
| `POST` | `/api/models/:id/validate` | P1 |

### 5.3 Run Endpoints

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/models/:id/runs` | P1 |
| `GET` | `/api/models/:id/runs/:runId` | P1 |
| `POST` | `/api/models/:id/runs` | P1 |

### 5.4 Benchmark Result Endpoints (NEW)

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/models/:id/runs/:runId/results` | P1 |
| `GET` | `/api/models/:id/runs/:runId/recipes` | P2 |
| `GET` | `/api/models/:id/runs/:runId/recipes/:recipeId` | P2 |

### 5.5 Promotion Endpoints

| Method | Path | Priority |
|--------|------|----------|
| `POST` | `/api/models/:id/promote/validate` | P2 |
| `POST` | `/api/models/:id/promote` | P2 |
| `POST` | `/api/models/:id/publish/validate` | P3 |
| `POST` | `/api/models/:id/publish` | P3 |

### 5.6 Review Endpoints

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/reviews` | P2 |
| `GET` | `/api/reviews/:id` | P2 |
| `POST` | `/api/reviews/:id/decision` | P2 |

### 5.7 Ranking Endpoints

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/ranking` | P3 |
| `GET` | `/api/ranking/compare` | P3 |

### 5.8 History & Comparison (NEW)

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/models/:id/history` | P2 |
| `GET` | `/api/models/:id/compare?runs=id1,id2` | P2 |

### 5.9 System

| Method | Path | Priority |
|--------|------|----------|
| `GET` | `/api/health` | P1 |

---

## 6. Key Business Logic

### 6.1 Grade Calculation (must match FE)

```python
def get_grade(score: float) -> str:
    if score >= 80: return "A"
    if score >= 60: return "B"
    if score >= 40: return "C"
    if score >= 20: return "D"
    return "E"
```

### 6.2 Promotion Eligibility Rules

1. Run must be `completed`
2. Grade must be >= `C` (score >= 40)
3. Review must exist with decision in `['approved', 'approved_with_controls']`
4. No unresolved `critical` findings
5. Model status must be `promotion_ready`

### 6.3 Background Benchmark Workflow

```
1. POST /api/models/:id/runs → Create Run (status=queued) → Enqueue job
2. Job picks up → Update Run (status=running) → Call Moonshot SDK
3. On success → Parse output → Store results + artifacts → Update Run (completed) → Auto-create Review
4. On failure → Update Run (failed) → Update Model (run_failed)
```

---

## 7. Phased Delivery Plan

### Phase 1 — Foundation & Core CRUD (April 2–15)

Goal: Backend boots, connects to DB, serves model/run CRUD.

- [ ] Initialize FastAPI project
- [ ] PostgreSQL + SQLAlchemy setup
- [ ] Alembic migrations
- [ ] Users, Models, Runs tables + CRUD
- [ ] Auth endpoints (simplified)
- [ ] Health endpoint
- [ ] CORS middleware
- [ ] Response wrappers matching FE types
- [ ] Seed data from fixtures

### Phase 2 — Benchmark Execution & Results (April 16–30)

Goal: Background jobs, results stored and retrievable.

- [ ] Redis + ARQ worker
- [ ] BenchmarkResults + RecipeResults tables
- [ ] Endpoint validation via LiteLLM
- [ ] Benchmark job orchestration
- [ ] Artifact storage
- [ ] Model status transitions

### Phase 3 — History, Comparison & Review (May 1–15)

- [ ] History API
- [ ] Run comparison API
- [ ] Reviews + AuditTrail tables
- [ ] Review decision flow
- [ ] Auto-create review on run completion

### Phase 4 — Promotion & Ranking (May 16–31)

- [ ] Promotion eligibility + guard rules
- [ ] Ranking table + materialization
- [ ] Ranking API with filters
- [ ] Publish legacy aliases

### Phase 5 — Hardening (June)

- [ ] Error handling middleware
- [ ] Rate limiting + logging
- [ ] Integration tests
- [ ] Docker Compose (app + db + redis)
- [ ] Security review

---

## 8. Open Questions

1. **PostgreSQL hosting**: Docker local or existing server?
2. **Moonshot MVP scope**: Start with mock executor or real SDK?
3. **Auth depth**: Real JWT or simplified user for MVP?
4. **LiteLLM deployment**: Existing proxy or embed SDK?
5. **Backend deployment target**: VPS, Docker, or Cloudflare Workers?
