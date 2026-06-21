from pydantic import BaseModel
from datetime import date
from typing import List

class TaskItem(BaseModel):
    task_name: str
    completed: bool

class DailyTaskOut(BaseModel):
    id: str
    user_id: str
    date: date
    tasks_completed: List[dict]
    xp_earned: int
    
    class Config:
        from_attributes = True