from app.utils.http_client import HttpClient
from app.config import settings
from app.services.cache_service import CacheService
from app.models import User
from fastapi import HTTPException, status
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)
http_client = HttpClient()

class GitHubService:
    @staticmethod
    async def validate_username(username: str) -> bool:
        """Validate GitHub username exists"""
        url = f"{settings.GITHUB_API_URL}/users/{username}"
        data = await http_client.get(url)
        return data is not None
    
    @staticmethod
    async def connect_github(user_id: str, github_username: str) -> dict:
        """Connect GitHub account to user"""
        # Validate username
        if not await GitHubService.validate_username(github_username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="GitHub username not found"
            )
        
        # Update user
        user = await User.get(user_id)
        user.github_username = github_username
        await user.save()
        
        # Fetch initial stats
        stats = await GitHubService.get_stats(user_id)
        
        return {
            "message": "GitHub connected successfully",
            "username": github_username,
            "stats": stats
        }
    
    @staticmethod
    async def get_stats(user_id: str) -> dict:
        """Get GitHub stats from cache or API"""
        user = await User.get(user_id)
        
        if not user.github_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="GitHub not connected"
            )
        
        # Check cache first
        cached = await CacheService.get_cache(user_id, "github")
        if cached:
            return cached
        
        # Fetch from API
        stats = await GitHubService.fetch_github_stats(user.github_username)
        
        # Cache it
        await CacheService.set_cache(user_id, "github", stats)
        
        return stats
    
    @staticmethod
    async def fetch_github_stats(username: str) -> dict:
        """Fetch stats from GitHub API"""
        try:
            # Get user info
            user_url = f"{settings.GITHUB_API_URL}/users/{username}"
            user_data = await http_client.get(user_url)
            
            if not user_data:
                return {}
            
            # Get contributions this month
            events_url = f"{settings.GITHUB_API_URL}/users/{username}/events"
            events = await http_client.get(events_url)
            
            commits_this_month = 0
            contribution_streak = 0
            
            if events:
                today = datetime.utcnow().date()
                month_start = today.replace(day=1)
                
                for event in events:
                    event_date = datetime.fromisoformat(event['created_at'].replace('Z', '+00:00')).date()
                    
                    if event_date >= month_start and event['type'] == 'PushEvent':
                        commits_this_month += 1
                    
                    # Simple contribution streak (consecutive days with commits)
                    if event_date == today and event['type'] == 'PushEvent':
                        contribution_streak += 1
            
            # Get repos
            repos_url = f"{settings.GITHUB_API_URL}/users/{username}/repos"
            repos_data = await http_client.get(repos_url)
            
            repos = []
            if repos_data:
                repos = [
                    {
                        "name": repo['name'],
                        "url": repo['html_url'],
                        "stars": repo['stargazers_count'],
                        "language": repo['language']
                    }
                    for repo in repos_data[:5]  # Top 5 repos
                ]
            
            return {
                "username": username,
                "total_commits_this_month": commits_this_month,
                "contribution_streak": contribution_streak,
                "repos_count": user_data.get('public_repos', 0),
                "followers": user_data.get('followers', 0),
                "public_repos": repos,
                "profile_url": user_data.get('html_url', ''),
                "avatar_url": user_data.get('avatar_url', '')
            }
        
        except Exception as e:
            logger.error(f"Error fetching GitHub stats: {e}")
            return {}
    
    @staticmethod
    async def disconnect_github(user_id: str) -> dict:
        """Disconnect GitHub account"""
        user = await User.get(user_id)
        user.github_username = None
        user.github_stats = None
        await user.save()
        
        await CacheService.clear_cache(user_id, "github")
        
        return {"message": "GitHub disconnected"}