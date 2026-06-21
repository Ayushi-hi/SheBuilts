from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings
from app.models import User, Course, Enrollment, Streak, DailyTask, Badge, IntegrationCache, VideoProgress

db_client = None


async def init_db():
    """Initialize MongoDB connection"""
    global db_client

    try:
        db_client = AsyncIOMotorClient(settings.MONGODB_URL)

        await init_beanie(
            database=db_client[settings.DATABASE_NAME],
            document_models=[
                User,
                Course,
                Enrollment,
                Streak,
                DailyTask,
                Badge,
                IntegrationCache,
                VideoProgress,
            ],
        )

        print("MongoDB connected successfully!")
        return db_client

    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        raise


async def close_db():
    """Close MongoDB connection"""
    global db_client

    if db_client:
        db_client.close()
        print("MongoDB connection closed")


async def ping_db() -> bool:
    """Check whether MongoDB is reachable."""
    if not db_client:
        return False

    try:
        await db_client.admin.command("ping")
        return True
    except Exception:
        return False
