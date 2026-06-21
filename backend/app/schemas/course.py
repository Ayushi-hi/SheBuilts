from pydantic import BaseModel
from typing import List, Optional

class LessonSchema(BaseModel):
    title: str
    youtube_url: str
    duration_mins: int

class LessonOut(BaseModel):
    id: str
    title: str
    youtube_url: str
    youtube_video_id: str
    duration_seconds: int
    order: int

class CourseCreate(BaseModel):
    title: str
    description: str
    track: str
    difficulty: str
    weeks: int
    lessons: List[LessonSchema]

class CourseOut(BaseModel):
    id: str
    title: str
    description: str
    track: str
    difficulty: str
    weeks: int
    lessons: List[LessonOut]
    
    class Config:
        from_attributes = True

class CourseWithProgress(CourseOut):
    progress_percent: Optional[float] = None
    enrolled: bool = False