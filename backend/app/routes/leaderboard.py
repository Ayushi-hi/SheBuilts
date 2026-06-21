from fastapi import APIRouter, Depends, status
from app.dependencies import get_current_user
from app.models import User
from app.services.leaderboard_service import LeaderboardService
from app.schemas.streak import LeaderboardStreakOut, LeaderboardWeeklyOut
from typing import List

router = APIRouter(prefix="/api/leaderboard", tags=["leaderboard"])

@router.get("/weekly", response_model=List[LeaderboardWeeklyOut], status_code=status.HTTP_200_OK)
async def get_weekly_leaderboard(current_user: User = Depends(get_current_user)):
    """Get weekly leaderboard sorted by XP earned this week"""
    leaderboard = await LeaderboardService.get_weekly_leaderboard()
    return leaderboard

@router.get("/streak", response_model=List[LeaderboardStreakOut], status_code=status.HTTP_200_OK)
async def get_streak_leaderboard(current_user: User = Depends(get_current_user)):
    """Get streak leaderboard sorted by current streak"""
    leaderboard = await LeaderboardService.get_streak_leaderboard()
    return leaderboard
