from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional
from datetime import datetime

class User(Document):
    email: EmailStr = Field(..., unique=True, index=True)
    password_hash: str
    name: str
    avatar_url: Optional[str] = None
    github_username: Optional[str] = Field(None, sparse=True, index=True)
    leetcode_username: Optional[str] = Field(None, sparse=True, index=True)
    
    # GitHub stats cache
    github_stats: Optional[dict] = None
    github_stats_updated_at: Optional[datetime] = None
    
    # LeetCode stats cache
    leetcode_stats: Optional[dict] = None
    leetcode_stats_updated_at: Optional[datetime] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    
    class Settings:
        collection = "users"