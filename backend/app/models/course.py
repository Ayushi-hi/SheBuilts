from beanie import Document
from pydantic import Field
from typing import List
from enum import Enum

class TrackEnum(str, Enum):
    WEBDEV = "webdev"
    AI = "ai"
    WEB3 = "web3"
    DESIGN = "design"
    CLOUD = "cloud"
    MOBILE = "mobile"

class Course(Document):
    title: str = Field(..., index=True)
    description: str
    track: TrackEnum
    difficulty: str
    weeks: int
    lessons: List[dict] = Field(default_factory=list)
    
    class Settings:
        collection = "courses"