from typing import List
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "shebuilds"
    
    # Redis (for caching)
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # App
    APP_NAME: str = "SheBuilds API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # External APIs
    GITHUB_API_URL: str = "https://api.github.com"
    LEETCODE_API_URL: str = "https://leetcode.com/graphql"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    def validate_startup(self):
        if self.SECRET_KEY == "your-secret-key-change-this-in-production":
            raise ValueError("SECRET_KEY must be set in the environment before starting the API")

settings = Settings()