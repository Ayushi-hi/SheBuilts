from pydantic import BaseModel
from datetime import datetime

class VideoProgressUpdate(BaseModel):
    course_id: str
    lesson_id: str
    watched_seconds: float
    total_duration: float

class VideoProgressOut(BaseModel):
    id: str
    user_id: str
    course_id: str
    lesson_id: str
    watched_seconds: float
    total_duration: float
    percent_watched: float
    completed: bool
    last_watched_at: datetime

    class Config:
        from_attributes = True
