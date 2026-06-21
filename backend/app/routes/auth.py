from fastapi import APIRouter, status
from app.schemas import UserRegister, UserLogin
from app.services.auth_service import AuthService

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    """Register a new user"""
    result = await AuthService.register_user(user_data)
    return {
        "message": "User registered successfully",
        "user": result
    }

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(user_data: UserLogin):
    """Login user and get JWT token"""
    result = await AuthService.login_user(user_data.email, user_data.password)
    return result