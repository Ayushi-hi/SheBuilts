from beanie import Document
from pydantic import Field
from datetime import datetime

class Badge(Document):
    user_id: str = Field(..., index=True)
    badge_type: str = Field(...)  # "7_day_warrior", "30_day_legend", "100_day_queen", "first_commit", "first_course_complete", "leetcode_solver"
    earned_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "badges"
