from fastapi import APIRouter, Depends, Query, status, HTTPException
from app.dependencies import get_current_user
from app.models import User
from app.services.github_service import GitHubService
from app.services.leetcode_service import LeetCodeService

router = APIRouter(prefix="/api/integrations", tags=["integrations"])

# ==================== GITHUB ====================

@router.get("/github/connect", status_code=status.HTTP_200_OK)
async def connect_github(
    username: str = Query(...),
    current_user: User = Depends(get_current_user)
):
    """Connect GitHub account"""
    result = await GitHubService.connect_github(str(current_user.id), username)
    return result

@router.get("/github/stats", status_code=status.HTTP_200_OK)
async def get_github_stats(current_user: User = Depends(get_current_user)):
    """Get GitHub stats (cached for 1 hour)"""
    stats = await GitHubService.get_stats(str(current_user.id))
    return stats

@router.post("/github/disconnect", status_code=status.HTTP_200_OK)
async def disconnect_github(current_user: User = Depends(get_current_user)):
    """Disconnect GitHub account"""
    result = await GitHubService.disconnect_github(str(current_user.id))
    return result

# ==================== LEETCODE ====================

@router.get("/leetcode/connect", status_code=status.HTTP_200_OK)
async def connect_leetcode(
    username: str = Query(...),
    current_user: User = Depends(get_current_user)
):
    """Connect LeetCode account"""
    result = await LeetCodeService.connect_leetcode(str(current_user.id), username)
    return result

@router.get("/leetcode/stats", status_code=status.HTTP_200_OK)
async def get_leetcode_stats(current_user: User = Depends(get_current_user)):
    """Get LeetCode stats (cached for 1 hour)"""
    stats = await LeetCodeService.get_stats(str(current_user.id))
    return stats

@router.post("/leetcode/disconnect", status_code=status.HTTP_200_OK)
async def disconnect_leetcode(current_user: User = Depends(get_current_user)):
    """Disconnect LeetCode account"""
    result = await LeetCodeService.disconnect_leetcode(str(current_user.id))
    return result

# ==================== AUTO-UPDATE STREAK ====================

@router.post("/github/update-streak", status_code=status.HTTP_200_OK)
async def update_streak_github(current_user: User = Depends(get_current_user)):
    """Update streak for GitHub commit"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="GitHub streak verification is not implemented yet"
    )

@router.post("/leetcode/update-streak", status_code=status.HTTP_200_OK)
async def update_streak_leetcode(current_user: User = Depends(get_current_user)):
    """Update streak for LeetCode submission"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="LeetCode streak verification is not implemented yet"
    )

# ==================== GET STATUS ====================

@router.get("/status", status_code=status.HTTP_200_OK)
async def get_integration_status(current_user: User = Depends(get_current_user)):
    """Get integration status for user"""
    return {
        "github": {
            "connected": current_user.github_username is not None,
            "username": current_user.github_username,
            "stats_updated_at": current_user.github_stats_updated_at
        },
        "leetcode": {
            "connected": current_user.leetcode_username is not None,
            "username": current_user.leetcode_username,
            "stats_updated_at": current_user.leetcode_stats_updated_at
        }
    }