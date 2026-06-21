from pydantic import BaseModel
from typing import Optional
from datetime import date

class StreakOut(BaseModel):
    id: str
    current_streak: int
    longest_streak: int
    last_activity_date: Optional[date] = None
    freeze_count: int
    total_xp: int
    
    class Config:
        from_attributes = True

class StreakUpdate(BaseModel):
    action: str  # "complete_task", "use_freeze"

class LeaderboardStreakOut(BaseModel):
    user_id: str
    name: str
    avatar_url: Optional[str] = None
    current_streak: int

class LeaderboardWeeklyOut(BaseModel):
    user_id: str
    name: str
    avatar_url: Optional[str] = None
    weekly_xp: int