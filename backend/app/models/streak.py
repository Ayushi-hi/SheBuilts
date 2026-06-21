from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime, date

class Streak(Document):
    user_id: str = Field(..., unique=True, index=True)
    current_streak: int = 0
    longest_streak: int = 0
    last_activity_date: Optional[date] = None
    freeze_count: int = 0
    total_xp: int = 0
    last_freeze_reset_date: Optional[date] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        collection = "streaks"