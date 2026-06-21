from fastapi import APIRouter, Depends, status
from app.dependencies import get_current_user
from app.models import User
from app.services.user_service import UserService
from app.schemas import UserOut, UserDashboard

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/me", response_model=UserOut, status_code=status.HTTP_200_OK)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return UserOut(
        id=str(current_user.id),
        email=current_user.email,
        name=current_user.name,
        avatar_url=current_user.avatar_url,
        github_username=current_user.github_username,
        leetcode_username=current_user.leetcode_username,
        created_at=current_user.created_at,
        is_active=current_user.is_active
    )

@router.get("/me/dashboard", response_model=UserDashboard, status_code=status.HTTP_200_OK)
async def get_dashboard(current_user: User = Depends(get_current_user)):
    """Get user dashboard with streak, courses, and stats"""
    dashboard = await UserService.get_user_dashboard(str(current_user.id))
    return dashboard