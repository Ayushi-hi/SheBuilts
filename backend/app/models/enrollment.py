from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime

class Enrollment(Document):
    user_id: str = Field(..., index=True)
    course_id: str = Field(..., index=True)
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    progress_percent: float = 0.0
    completed_at: Optional[datetime] = None
    
    class Settings:
        collection = "enrollments"