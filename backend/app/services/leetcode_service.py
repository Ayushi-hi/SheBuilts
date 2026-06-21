from app.utils.http_client import HttpClient
from app.config import settings
from app.services.cache_service import CacheService
from app.models import User
from fastapi import HTTPException, status
import logging

logger = logging.getLogger(__name__)
http_client = HttpClient()

class LeetCodeService:
    GRAPHQL_QUERY = """
    query getUserProfile($username: String!) {
        matchedUser(username: $username) {
            username
            profile {
                realName
                reputation
                userAvatar
            }
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
            userCalendar {
                submissionCalendar
            }
            streamers {
                list
            }
        }
    }
    """
    
    @staticmethod
    async def validate_username(username: str) -> bool:
        """Validate LeetCode username exists"""
        query = {
            "query": LeetCodeService.GRAPHQL_QUERY,
            "variables": {"username": username}
        }
        
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://leetcode.com/",
            "Origin": "https://leetcode.com"
        }
        data = await http_client.post(settings.LEETCODE_API_URL, json=query, headers=headers)
        
        if not data or not data.get('data', {}).get('matchedUser'):
            return False
        
        return data.get('data', {}).get('matchedUser') is not None
    
    @staticmethod
    async def connect_leetcode(user_id: str, leetcode_username: str) -> dict:
        """Connect LeetCode account to user"""
        # Validate username
        if not await LeetCodeService.validate_username(leetcode_username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="LeetCode username not found"
            )
        
        # Update user
        user = await User.get(user_id)
        user.leetcode_username = leetcode_username
        await user.save()
        
        # Fetch initial stats
        stats = await LeetCodeService.get_stats(user_id)
        
        return {
            "message": "LeetCode connected successfully",
            "username": leetcode_username,
            "stats": stats
        }
    
    @staticmethod
    async def get_stats(user_id: str) -> dict:
        """Get LeetCode stats from cache or API"""
        user = await User.get(user_id)
        
        if not user.leetcode_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="LeetCode not connected"
            )
        
        # Check cache first
        cached = await CacheService.get_cache(user_id, "leetcode")
        if cached:
            return cached
        
        # Fetch from API
        stats = await LeetCodeService.fetch_leetcode_stats(user.leetcode_username)
        
        # Cache it
        await CacheService.set_cache(user_id, "leetcode", stats)
        
        return stats
    
    @staticmethod
    async def fetch_leetcode_stats(username: str) -> dict:
        """Fetch stats from LeetCode GraphQL API"""
        try:
            query = {
                "query": LeetCodeService.GRAPHQL_QUERY,
                "variables": {"username": username}
            }
            
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://leetcode.com/",
                "Origin": "https://leetcode.com"
            }
            data = await http_client.post(settings.LEETCODE_API_URL, json=query, headers=headers)
            
            if not data or not data.get('data', {}).get('matchedUser'):
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Unable to fetch LeetCode stats right now"
                )
            
            user_data = data['data']['matchedUser']
            
            # Extract stats
            ac_stats = user_data.get('submitStatsGlobal', {}).get('acSubmissionNum', [])
            
            easy = 0
            medium = 0
            hard = 0
            
            for stat in ac_stats:
                difficulty = stat.get('difficulty', '').lower()
                count = stat.get('count', 0)
                
                if difficulty == 'easy':
                    easy = count
                elif difficulty == 'medium':
                    medium = count
                elif difficulty == 'hard':
                    hard = count
            
            total_solved = easy + medium + hard
            
            # Get acceptance rate
            acceptance_rate = 0.0
            for stat in ac_stats:
                submissions = stat.get('submissions', 0)
                if submissions > 0:
                    rate = (stat.get('count', 0) / submissions) * 100
                    acceptance_rate += rate
            
            acceptance_rate = acceptance_rate / len(ac_stats) if ac_stats else 0
            
            return {
                "username": username,
                "total_solved": total_solved,
                "easy_solved": easy,
                "medium_solved": medium,
                "hard_solved": hard,
                "acceptance_rate": round(acceptance_rate, 2),
                "rank": user_data.get('profile', {}).get('reputation', 0),
                "avatar_url": user_data.get('profile', {}).get('userAvatar', ''),
                "real_name": user_data.get('profile', {}).get('realName', '')
            }
        
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error fetching LeetCode stats: {e}")
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Unable to fetch LeetCode stats right now"
            )
    
    @staticmethod
    async def disconnect_leetcode(user_id: str) -> dict:
        """Disconnect LeetCode account"""
        user = await User.get(user_id)
        user.leetcode_username = None
        user.leetcode_stats = None
        await user.save()
        
        await CacheService.clear_cache(user_id, "leetcode")
        
        return {"message": "LeetCode disconnected"}