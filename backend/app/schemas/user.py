from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    name: str = Field(..., min_length=2)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    email: str
    name: str
    avatar_url: Optional[str] = None
    github_username: Optional[str] = None
    leetcode_username: Optional[str] = None
    created_at: datetime
    is_active: bool
    
    class Config:
        from_attributes = True

class DashboardUser(BaseModel):
    name: str
    email: str
    avatar_url: Optional[str] = None

class DashboardStreak(BaseModel):
    current: int
    longest: int
    freeze_count: int
    total_xp: int

class DashboardGithub(BaseModel):
    commits_this_month: int
    repos: List[dict] = []

class DashboardLeetcode(BaseModel):
    solved_total: int
    easy: int
    medium: int
    hard: int

class DashboardBadge(BaseModel):
    badge_type: str
    earned_at: datetime

class DashboardCourse(BaseModel):
    id: str
    title: str
    description: str
    track: str
    difficulty: str
    weeks: int
    lessons: List[dict]

class DashboardEnrolledCourse(BaseModel):
    course: DashboardCourse
    progress_percent: float

class UserDashboard(BaseModel):
    user: DashboardUser
    streak: DashboardStreak
    github: DashboardGithub
    leetcode: DashboardLeetcode
    badges: List[DashboardBadge] = []
    enrolled_courses: List[DashboardEnrolledCourse] = []
    leaderboard_rank: int

    class Config:
        from_attributes = True