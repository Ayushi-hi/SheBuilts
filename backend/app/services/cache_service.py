from datetime import datetime, timedelta
from app.models import IntegrationCache
from typing import Optional

class CacheService:
    CACHE_TTL = 3600  # 1 hour
    
    @staticmethod
    async def get_cache(user_id: str, integration_type: str) -> Optional[dict]:
        """Get cached data if not expired"""
        cache = await IntegrationCache.find_one(
            IntegrationCache.user_id == user_id,
            IntegrationCache.integration_type == integration_type
        )
        
        if not cache:
            return None
        
        # Check if expired
        if cache.expires_at < datetime.utcnow():
            await cache.delete()
            return None
        
        return cache.data
    
    @staticmethod
    async def set_cache(user_id: str, integration_type: str, data: dict) -> None:
        """Cache data with TTL"""
        # Delete old cache
        old_cache = await IntegrationCache.find_one(
            IntegrationCache.user_id == user_id,
            IntegrationCache.integration_type == integration_type
        )
        if old_cache:
            await old_cache.delete()
        
        # Create new cache
        cache = IntegrationCache(
            user_id=user_id,
            integration_type=integration_type,
            data=data,
            expires_at=datetime.utcnow() + timedelta(seconds=CacheService.CACHE_TTL)
        )
        await cache.insert()
    
    @staticmethod
    async def clear_cache(user_id: str, integration_type: str) -> None:
        """Clear cache"""
        cache = await IntegrationCache.find_one(
            IntegrationCache.user_id == user_id,
            IntegrationCache.integration_type == integration_type
        )
        if cache:
            await cache.delete()