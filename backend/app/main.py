from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.config import settings
from app.database import init_db, close_db, ping_db
from app.routes import auth, users, courses, enrollments, streaks, integrations, leaderboard, progress
from app.utils.seed_data import seed_courses
from app.tasks.background_tasks import start_background_tasks, stop_background_tasks
import logging

logger = logging.getLogger(__name__)
scheduler = AsyncIOScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        settings.validate_startup()
        await init_db()
        await seed_courses()
        start_background_tasks(scheduler)
        logger.info("SheBuilds API started successfully")
    except Exception:
        logger.exception("Startup error")
        raise
    yield
    # Shutdown
    stop_background_tasks(scheduler)
    await close_db()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="API for SheBuilds - Women's Coding Learning Platform",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(courses.router)
app.include_router(enrollments.router)
app.include_router(streaks.router)
app.include_router(integrations.router)  # NEW
app.include_router(leaderboard.router)
app.include_router(progress.router)

@app.get("/", tags=["root"])
async def read_root():
    return {
        "message": "Welcome to SheBuilds API",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/api/health", tags=["health"])
async def health_check():
    database_ok = await ping_db()
    if not database_ok:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    return {"status": "healthy", "database": "connected"}