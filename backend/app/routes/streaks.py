from fastapi import APIRouter, Depends, status
from app.dependencies import get_current_user
from app.models import User
from app.services.streak_service import StreakService
from app.schemas import StreakOut, StreakUpdate

router = APIRouter(prefix="/api/streaks", tags=["streaks"])

@router.get("/me", response_model=StreakOut, status_code=status.HTTP_200_OK)
async def get_current_streak(current_user: User = Depends(get_current_user)):
    """Get current user's streak"""
    streak = await StreakService.get_streak(str(current_user.id))
    return streak

@router.post("/me/update", response_model=StreakOut, status_code=status.HTTP_200_OK)
async def update_streak(
    streak_update: StreakUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update user's streak"""
    streak = await StreakService.update_streak(str(current_user.id), streak_update.action)
    return streak

@router.post("/me/freeze", response_model=StreakOut, status_code=status.HTTP_200_OK)
async def use_freeze(current_user: User = Depends(get_current_user)):
    """Use a freeze to protect today's streak"""
    streak = await StreakService.use_freeze(str(current_user.id))
    return streak