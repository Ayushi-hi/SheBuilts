from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EnrollmentCreate(BaseModel):
    course_id: str

class EnrollmentOut(BaseModel):
    id: str
    user_id: str
    course_id: str
    enrolled_at: datetime
    progress_percent: float
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True