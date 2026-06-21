from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime

class IntegrationCache(Document):
    user_id: str = Field(..., index=True)
    integration_type: str = Field(...)  # "github" or "leetcode"
    data: dict = Field(default_factory=dict)
    expires_at: datetime = Field(...)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        collection = "integration_cache"
        indexes = ["user_id", "integration_type", "expires_at"]