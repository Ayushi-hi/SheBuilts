from app.schemas.user import UserRegister, UserLogin, UserOut, UserDashboard
from app.schemas.course import CourseCreate, CourseOut
from app.schemas.enrollment import EnrollmentOut, EnrollmentCreate
from app.schemas.streak import StreakOut, StreakUpdate
from app.schemas.daily_task import DailyTaskOut
from app.schemas.progress import VideoProgressUpdate, VideoProgressOut

__all__ = [
    "UserRegister", "UserLogin", "UserOut", "UserDashboard",
    "CourseCreate", "CourseOut",
    "EnrollmentOut", "EnrollmentCreate",
    "StreakOut", "StreakUpdate",
    "DailyTaskOut", "VideoProgressUpdate", "VideoProgressOut"
]