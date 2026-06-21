from app.models import User, Enrollment, Streak, DailyTask, Badge, Course
from app.schemas import UserOut, UserDashboard
from app.services.streak_service import StreakService
from app.services.github_service import GitHubService
from app.services.leetcode_service import LeetCodeService
from fastapi import HTTPException, status
from datetime import date
from bson import ObjectId

class UserService:
    @staticmethod
    async def get_user(user_id: str) -> User:
        try:
            user = await User.get(ObjectId(user_id))
        except Exception:
            user = None
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user
    
    @staticmethod
    async def get_user_dashboard(user_id: str) -> UserDashboard:
        user = await UserService.get_user(user_id)
        
        # Get/update streak info
        streak = await StreakService.get_streak(user_id)
        streak_data = {
            "current": streak.current_streak,
            "longest": streak.longest_streak,
            "freeze_count": streak.freeze_count,
            "total_xp": streak.total_xp
        }
        
        # Fetch GitHub stats if connected
        github_data = {"commits_this_month": 0, "repos": []}
        if user.github_username:
            try:
                stats = await GitHubService.get_stats(user_id)
                github_data = {
                    "commits_this_month": stats.get("total_commits_this_month", 0),
                    "repos": stats.get("public_repos", [])
                }
            except Exception:
                pass
                
        # Fetch LeetCode stats if connected
        leetcode_data = {"solved_total": 0, "easy": 0, "medium": 0, "hard": 0}
        if user.leetcode_username:
            try:
                stats = await LeetCodeService.get_stats(user_id)
                leetcode_data = {
                    "solved_total": stats.get("total_solved", 0),
                    "easy": stats.get("easy_solved", 0),
                    "medium": stats.get("medium_solved", 0),
                    "hard": stats.get("hard_solved", 0)
                }
            except Exception:
                pass
                
        # Fetch badges
        badges = await Badge.find(Badge.user_id == user_id).to_list()
        badges_list = [{"badge_type": b.badge_type, "earned_at": b.earned_at} for b in badges]
        
        # Get enrolled courses
        enrollments = await Enrollment.find(Enrollment.user_id == user_id).to_list()
        enrolled_courses = []
        for e in enrollments:
            try:
                course = await Course.get(ObjectId(e.course_id))
            except Exception:
                course = None
            if course:
                enrolled_courses.append({
                    "course": {
                        "id": str(course.id),
                        "title": course.title,
                        "description": course.description,
                        "track": course.track,
                        "difficulty": course.difficulty,
                        "weeks": course.weeks,
                        "lessons": course.lessons
                    },
                    "progress_percent": e.progress_percent
                })
                
        # Calculate leaderboard rank (by total_xp)
        higher_xp_count = await Streak.find(Streak.total_xp > streak.total_xp).count()
        leaderboard_rank = higher_xp_count + 1
        
        user_out = {
            "name": user.name,
            "email": user.email,
            "avatar_url": user.avatar_url
        }
        
        return UserDashboard(
            user=user_out,
            streak=streak_data,
            github=github_data,
            leetcode=leetcode_data,
            badges=badges_list,
            enrolled_courses=enrolled_courses,
            leaderboard_rank=leaderboard_rank
        )
    
    @staticmethod
    async def update_user(user_id: str, **kwargs) -> User:
        user = await UserService.get_user(user_id)
        for key, value in kwargs.items():
            if value is not None and hasattr(user, key):
                setattr(user, key, value)
        await user.save()
        return user