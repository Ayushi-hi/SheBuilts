from beanie import Document
from pydantic import Field
from datetime import datetime

class VideoProgress(Document):
    user_id: str = Field(..., index=True)
    course_id: str = Field(..., index=True)
    lesson_id: str = Field(..., index=True)
    watched_seconds: float = Field(0.0)
    total_duration: float = Field(0.0)
    percent_watched: float = Field(0.0)
    completed: bool = Field(False)
    last_watched_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "video_progress"
        indexes = [
            [("user_id", 1), ("course_id", 1), ("lesson_id", 1)]
        ]
