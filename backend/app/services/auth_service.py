from app.models import User, Streak
from app.security import get_password_hash, verify_password, create_access_token
from app.schemas import UserRegister
from fastapi import HTTPException, status

class AuthService:
    @staticmethod
    async def register_user(user_data: UserRegister) -> dict:
        # Check if user exists
        existing_user = await User.find_one(User.email == user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        new_user = User(
            email=user_data.email,
            password_hash=hashed_password,
            name=user_data.name,
            is_active=True
        )
        
        await new_user.insert()
        
        # Create streak record
        streak = Streak(user_id=str(new_user.id))
        await streak.insert()
        
        return {
            "id": str(new_user.id),
            "email": new_user.email,
            "name": new_user.name
        }
    
    @staticmethod
    async def login_user(email: str, password: str) -> dict:
        user = await User.find_one(User.email == email)
        
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive"
            )
        
        access_token = create_access_token(data={"sub": user.email})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": str(user.id),
            "email": user.email,
            "name": user.name
        }