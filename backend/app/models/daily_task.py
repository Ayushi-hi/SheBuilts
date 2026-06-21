from beanie import Document
from pydantic import Field
from typing import List
from datetime import date as date_type, datetime

class DailyTask(Document):
    user_id: str = Field(..., index=True)
    date: date_type = Field(default_factory=date_type.today)
    tasks_completed: List[dict] = Field(default_factory=list)
    xp_earned: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "daily_tasks"