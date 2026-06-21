import httpx
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

class HttpClient:
    def __init__(self, timeout: int = 10):
        self.timeout = timeout
    
    async def get(self, url: str, headers: Optional[Dict] = None) -> Optional[Dict[str, Any]]:
        """Make GET request"""
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, headers=headers)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPError as e:
            logger.error(f"HTTP Error: {e}")
            return None
        except Exception as e:
            logger.error(f"Error in GET request: {e}")
            return None
    
    async def post(self, url: str, json: Dict = None, headers: Optional[Dict] = None) -> Optional[Dict[str, Any]]:
        """Make POST request"""
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(url, json=json, headers=headers)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPError as e:
            logger.error(f"HTTP Error: {e}")
            return None
        except Exception as e:
            logger.error(f"Error in POST request: {e}")
            return None