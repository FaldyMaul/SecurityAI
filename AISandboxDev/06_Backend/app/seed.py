"""Seed database with FE fixture-equivalent data.

Usage:
    python -m app.seed

Creates tables and loads all fixture data from the FE mocks directory.
Uses async SQLAlchemy engine (aiosqlite for MVP, asyncpg for production).
"""

from __future__ import annotations

import asyncio
import json
from datetime import datetime, timezone
from pathlib import Path

from app.database import engine, Base, AsyncSessionLocal
from app.models import User, SandboxModel, Run, BenchmarkResult, Review, AuditTrailEntry, RankingEntry


FIXTURE_DIR = Path(__file__).resolve().parent.parent.parent / "03_Frontend" / "src" / "mocks" / "fixtures"


def load_fixture(name: str):
    """Load a JSON fixture file from the FE mocks directory."""
    path = FIXTURE_DIR / name
    if not path.exists():
        print(f"  ! Fixture not found: {path}")
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def parse_dt(s: str | None) -> datetime | None:
    if not s:
        return None
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


async def seed_users(session):
    data = load_fixture("users.json")
    for u in data:
        user = User(
            id=u["id"],
            name=u.get("displayName", u.get("name", "")),
            email=u["email"],
            role=u["role"],
            preferences=u.get("preferences"),
            notifications=u.get("notifications"),
            created_at=parse_dt(u.get("createdAt")) or datetime.now(timezone.utc),
        )
        await session.merge(user)
    await session.commit()
    print(f"  + Seeded {len(data)} users")


async def seed_models(session):
    data = load_fixture("models.json")
    for m in data:
        model = SandboxModel(
            id=m["id"],
            name=m["name"],
            provider=m["provider"],
            base_model=m.get("baseModel"),
            endpoint_url=m["endpointUrl"],
            auth_method=m["authMethod"],
            status=m["status"],
            owner_id=m["ownerId"],
            owner_name=m.get("ownerName", ""),
            source=m.get("source", "manual"),
            latest_score=m.get("latestScore"),
            latest_run_id=m.get("latestRunId"),
            latest_run_date=parse_dt(m.get("latestRunDate")),
            created_at=parse_dt(m.get("createdAt")) or datetime.now(timezone.utc),
            updated_at=parse_dt(m.get("updatedAt")) or datetime.now(timezone.utc),
        )
        await session.merge(model)
    await session.commit()
    print(f"  + Seeded {len(data)} models")


async def seed_runs(session):
    data = load_fixture("runs.json")
    for r in data:
        run = Run(
            id=r["id"],
            model_id=r["modelId"],
            package_name=r.get("packageName", "Indonesia Core Trust Package"),
            status=r["status"],
            overall_score=r.get("overallScore"),
            scores=r.get("scores"),
            started_at=parse_dt(r.get("startedAt")),
            completed_at=parse_dt(r.get("completedAt")),
            duration=r.get("duration"),
            progress=r.get("progress"),
            findings=r.get("findings"),
            selected_categories=r.get("selectedCategories"),
            selected_recipes=r.get("selectedRecipes"),
            recipe_results_map=r.get("recipeResults"),
            error=r.get("error"),
            created_at=parse_dt(r.get("createdAt")) or datetime.now(timezone.utc),
        )
        await session.merge(run)
    await session.commit()
    print(f"  + Seeded {len(data)} runs")


async def seed_benchmark_results(session):
    data = load_fixture("benchmark-results.json")
    if isinstance(data, dict):
        for run_id, result in data.items():
            br = BenchmarkResult(
                id=f"br-{run_id}",
                run_id=run_id,
                metadata_json=result.get("metadata"),
                overall_grade=result.get("overallGrade", "E"),
                overall_score=result.get("overallScore", 0),
                grading_scale=result.get("gradingScale"),
                category_results=result.get("categoryResults"),
            )
            await session.merge(br)
        await session.commit()
        print(f"  + Seeded {len(data)} benchmark results")
    elif isinstance(data, list):
        for item in data:
            run_id = item.get("runId", item.get("run_id", ""))
            br = BenchmarkResult(
                id=f"br-{run_id}",
                run_id=run_id,
                metadata_json=item.get("metadata"),
                overall_grade=item.get("overallGrade", "E"),
                overall_score=item.get("overallScore", 0),
                grading_scale=item.get("gradingScale"),
                category_results=item.get("categoryResults"),
            )
            await session.merge(br)
        await session.commit()
        print(f"  + Seeded {len(data)} benchmark results")
    else:
        print("  ! benchmark-results.json format not recognized")


async def seed_reviews(session):
    data = load_fixture("reviews.json")
    for r in data:
        review = Review(
            id=r["id"],
            model_id=r["modelId"],
            model_name=r["modelName"],
            model_provider=r["modelProvider"],
            run_id=r["runId"],
            run_date=parse_dt(r["runDate"]),
            overall_score=r["overallScore"],
            critical_count=r.get("criticalCount", 0),
            status=r["status"],
            decision=r.get("decision"),
            decision_reason=r.get("decisionReason"),
            reviewer_notes=r.get("reviewerNotes"),
            reviewer_id=r.get("reviewerId"),
            reviewer_name=r.get("reviewerName"),
            is_published=r.get("isPublished", False),
            created_at=parse_dt(r.get("createdAt")) or datetime.now(timezone.utc),
            updated_at=parse_dt(r.get("updatedAt")) or datetime.now(timezone.utc),
        )
        await session.merge(review)

        for a in r.get("auditTrail", []):
            entry = AuditTrailEntry(
                id=a["id"],
                review_id=r["id"],
                action=a["action"],
                actor=a["actor"],
                actor_name=a["actorName"],
                timestamp=parse_dt(a["timestamp"]),
                old_value=a.get("oldValue"),
                new_value=a.get("newValue"),
                reason=a.get("reason"),
            )
            await session.merge(entry)

    await session.commit()
    print(f"  + Seeded {len(data)} reviews")


async def seed_ranking(session):
    data = load_fixture("ranking.json")
    for r in data:
        entry = RankingEntry(
            id=f"rank-{r.get('modelId', '')}",
            model_id=r["modelId"],
            model_name=r["modelName"],
            provider=r["provider"],
            rank=r["rank"],
            overall_score=r["overallScore"],
            scores=r.get("scores"),
            approval_label=r.get("approvalLabel", ""),
            suitability_tags=r.get("suitabilityTags"),
            strengths=r.get("strengths"),
            weaknesses=r.get("weaknesses"),
            restrictions=r.get("restrictions"),
            recommended_use_cases=r.get("recommendedUseCases"),
            is_published=r.get("isPublished", False),
            last_assessed_at=parse_dt(r.get("lastAssessedAt")),
        )
        await session.merge(entry)
    await session.commit()
    print(f"  + Seeded {len(data)} ranking entries")


async def run_seed_async():
    """Create tables and load all fixture data asynchronously."""
    print("\n[Seed] Creating tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("[Seed] Tables created")

    async with AsyncSessionLocal() as session:
        await seed_users(session)
        await seed_models(session)
        await seed_runs(session)
        await seed_benchmark_results(session)
        await seed_reviews(session)
        await seed_ranking(session)

    print("\n[Seed] Database seeded successfully!\n")


if __name__ == "__main__":
    asyncio.run(run_seed_async())
