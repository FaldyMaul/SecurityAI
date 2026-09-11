import sys
import logging
from sqlalchemy import select, update
import asyncio
from datetime import datetime, timezone
from pathlib import Path

from arq.connections import RedisSettings

# Bootstrap path so 07_AIEngine is importable side-by-side with 06_Backend
backend_dir = Path(__file__).resolve().parent.parent
project_root = backend_dir.parent
if str(project_root) not in sys.path:
    sys.path.append(str(project_root))
if str(backend_dir) not in sys.path:
    sys.path.append(str(backend_dir))

from app.database import AsyncSessionLocal
from app.models.run import Run, BenchmarkResult
from app.models.model import SandboxModel
from app.config import settings
from app.utils import get_grade, build_complete_scores, build_complete_category_results, DEFAULT_GRADING_SCALE

logger = logging.getLogger("arq.worker")
logger.setLevel(logging.INFO)
if not logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s"))
    logger.addHandler(handler)


async def run_benchmark_task(ctx, run_id: str):
    """
    ARQ task to run the Moonshot benchmark.
    Transitions states, executes logic, saves results.
    """
    logger.info(f"Worker picked up benchmark task for run: {run_id}")
    
    async with AsyncSessionLocal() as db:
        run = await db.scalar(select(Run).where(Run.id == run_id))
        if not run:
            logger.error(f"Run {run_id} not found in database!")
            return
            
        model_id = run.model_id
        package_name = run.package_name
        
        # Transition to in_progress securely
        logger.info(f"Transitioning Run {run_id} to in_progress")
        await db.execute(
            update(Run)
            .where(Run.id == run_id)
            .values(
                status="in_progress",
                progress={"completed": 0, "total": 100, "current_task": "Initializing Moonshot Executor"},
                started_at=datetime.now(timezone.utc)
            )
        )
        await db.execute(
            update(SandboxModel)
            .where(SandboxModel.id == model_id)
            .values(status="run_in_progress")
        )
        await db.commit()

    async def update_progress(completed: int, total: int, task_name: str):
        async with AsyncSessionLocal() as update_db:
            await update_db.execute(
                update(Run)
                .where(Run.id == run_id)
                .values(
                    progress={
                        "completed": completed,
                        "total": total,
                        "current_task": task_name
                    }
                )
            )
            await update_db.commit()


    # Execute Moonshot Benchmark
    try:
        from importlib import import_module
        ai_engine = import_module("07_AIEngine.benchmark_runner")
        
        benchmark_output = await ai_engine.run_benchmark(
            run_id=run_id,
            model_id=model_id,
            package_name=package_name,
            progress_callback=update_progress
        )
        
        raw_categories = benchmark_output["category_results"]
        complete_scores = build_complete_scores(raw_categories)
        overall_score = benchmark_output["overall_score"]
        category_results = build_complete_category_results(raw_categories)
        status = "completed_success"
        logger.info(f"Run {run_id} scores: {complete_scores} | overall: {overall_score}")
    except Exception as e:
        logger.exception(f"Exception during benchmark run {run_id}: {e}")
        status = "failed"
        overall_score = 0.0
        complete_scores = build_complete_scores([])
        category_results = build_complete_category_results([])

    # Finalize
    logger.info(f"Finalizing benchmark run {run_id} with status: {status}")
    async with AsyncSessionLocal() as db:
        run = await db.scalar(select(Run).where(Run.id == run_id))
        if run:
            now_utc = datetime.now(timezone.utc)
            started_dt = run.started_at.replace(tzinfo=timezone.utc) if run.started_at else now_utc
            duration = int((now_utc - started_dt).total_seconds())
            
            progress = run.progress or {}
            progress["completed"] = progress.get("total", 100)
            progress["current_task"] = "Completed" if status == "completed_success" else "Failed"

            await db.execute(
                update(Run)
                .where(Run.id == run_id)
                .values(
                    status=status,
                    overall_score=overall_score,
                    scores=complete_scores,
                    completed_at=now_utc,
                    duration=duration,
                    progress=progress
                )
            )

            if status == "completed_success":
                # Create benchmark result
                import uuid
                br_id = f"br-{uuid.uuid4().hex[:8]}"

                # Build complete metadata matching FE BenchmarkMetadata interface
                result_metadata = {
                    "id": br_id,
                    "startTime": started_dt.isoformat(),
                    "endTime": now_utc.isoformat(),
                    "duration": duration,
                    "status": status,
                    "packageName": run.package_name or "Indonesia Core Trust Package",
                    "modelId": model_id,
                    "promptSelectionPercentage": 100,
                    "systemPrompt": "",
                    "engine": "arq-moonshot-worker",
                }

                await db.execute(
                    BenchmarkResult.__table__.insert().values(
                        id=br_id,
                        run_id=run_id,
                        overall_grade=get_grade(overall_score),
                        overall_score=overall_score,
                        grading_scale=DEFAULT_GRADING_SCALE,
                        metadata_json=result_metadata,
                        category_results=category_results,
                        created_at=now_utc
                    )
                )

            # Update Model status
            model_updates = {
                "status": "assessment_completed" if status == "completed_success" else "assessment_failed",
            }
            if status == "completed_success":
                model_updates["latest_score"] = overall_score
                model_updates["latest_run_id"] = run_id
                model_updates["latest_run_date"] = now_utc

            await db.execute(
                update(SandboxModel)
                .where(SandboxModel.id == model_id)
                .values(**model_updates)
            )
            
            await db.commit()
            logger.info(f"Database fully committed for run {run_id}")

class WorkerSettings:
    functions = [run_benchmark_task]
    redis_settings = RedisSettings.from_dsn(settings.redis_url)
