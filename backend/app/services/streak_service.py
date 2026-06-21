from app.models import Streak, DailyTask, User, Badge, Enrollment
from datetime import date, timedelta
from fastapi import HTTPException, status
from typing import Optional

class StreakService:
    @staticmethod
    async def get_streak(user_id: str) -> Streak:
        streak = await Streak.find_one(Streak.user_id == user_id)
        if not streak:
            # Create a default streak if not found
            streak = Streak(user_id=user_id)
            await streak.insert()
        
        # Check and process reset or freeze reset
        streak = await StreakService._check_streak_and_freeze(streak)
        return streak
    
    @staticmethod
    async def _check_streak_and_freeze(streak: Streak) -> Streak:
        today = date.today()
        changed = False
        
        # 1. Reset freeze count to 2 every Monday
        current_monday = today - timedelta(days=today.weekday())
        if not streak.last_freeze_reset_date or streak.last_freeze_reset_date < current_monday:
            streak.freeze_count = 2
            streak.last_freeze_reset_date = today
            changed = True
            
        # 2. Miss a day -> streak resets to 0 (unless freeze used)
        # We only check if last_activity_date exists and was before yesterday
        if streak.last_activity_date and (today - streak.last_activity_date).days > 1:
            streak.current_streak = 0
            changed = True
            
        if changed:
            await streak.save()
            
        return streak

    @staticmethod
    async def update_streak(user_id: str, action: str) -> Streak:
        streak = await StreakService.get_streak(user_id)
        today = date.today()
        
        # Actions that count toward streak
        valid_actions = ["complete_task"]
        
        if action not in valid_actions:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid action. Must be one of: {', '.join(valid_actions)}"
            )
        
        # Award XP based on action
        xp_amount = 50
        # Add task to daily tasks
        daily_task = await DailyTask.find_one(
            DailyTask.user_id == user_id,
            DailyTask.date == today
        )
        
        if not daily_task:
            daily_task = DailyTask(
                user_id=user_id,
                date=today,
                xp_earned=xp_amount,
                tasks_completed=[{"task_name": action, "completed": True}]
            )
            await daily_task.insert()
            prev_count = 0
            new_count = 1
        else:
            prev_count = len(daily_task.tasks_completed)
            daily_task.xp_earned += xp_amount
            daily_task.tasks_completed.append({"task_name": action, "completed": True})
            await daily_task.save()
            new_count = len(daily_task.tasks_completed)
        
        # Award base XP to user's streak total
        streak.total_xp += xp_amount
        
        # Check if they hit exactly 3 daily tasks today to increment streak
        if prev_count < 3 and new_count >= 3:
            # 1. Run reset check first (in case they missed yesterday)
            if streak.last_activity_date and (today - streak.last_activity_date).days > 1:
                streak.current_streak = 0
            
            # 2. Increment streak and award 30 XP bonus
            streak.current_streak += 1
            if streak.current_streak > streak.longest_streak:
                streak.longest_streak = streak.current_streak
            
            streak.last_activity_date = today
            streak.total_xp += 30
            daily_task.xp_earned += 30
            await daily_task.save()
            
        await streak.save()
        
        # Auto-award badges when conditions met
        await StreakService.check_and_award_badges(user_id, streak)
        
        return streak
    
    @staticmethod
    async def use_freeze(user_id: str) -> Streak:
        """Use a freeze to protect today's streak"""
        streak = await StreakService.get_streak(user_id)
        today = date.today()
        
        if streak.freeze_count <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No freezes available"
            )
            
        if streak.last_activity_date == today:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Streak is already active today"
            )
            
        streak.freeze_count -= 1
        streak.last_activity_date = today
        await streak.save()
        return streak

    @staticmethod
    async def check_and_award_badges(user_id: str, streak: Streak) -> None:
        """Evaluate badge conditions and award them automatically"""
        existing = await Badge.find(Badge.user_id == user_id).to_list()
        existing_types = {b.badge_type for b in existing}
        
        # 1. 7_day_warrior
        if "7_day_warrior" not in existing_types and streak.current_streak >= 7:
            await Badge(user_id=user_id, badge_type="7_day_warrior").insert()
            
        # 2. 30_day_legend
        if "30_day_legend" not in existing_types and streak.current_streak >= 30:
            await Badge(user_id=user_id, badge_type="30_day_legend").insert()
            
        # 3. 100_day_queen
        if "100_day_queen" not in existing_types and streak.current_streak >= 100:
            await Badge(user_id=user_id, badge_type="100_day_queen").insert()
            
        # 4. first_commit
        if "first_commit" not in existing_types:
            user = await User.get(user_id)
            if user and user.github_username:
                try:
                    from app.services.github_service import GitHubService
                    stats = await GitHubService.get_stats(user_id)
                    if stats and stats.get("total_commits_this_month", 0) > 0:
                        await Badge(user_id=user_id, badge_type="first_commit").insert()
                except Exception:
                    pass
                    
        # 5. leetcode_solver
        if "leetcode_solver" not in existing_types:
            user = await User.get(user_id)
            if user and user.leetcode_username:
                try:
                    from app.services.leetcode_service import LeetCodeService
                    stats = await LeetCodeService.get_stats(user_id)
                    if stats and stats.get("total_solved", 0) > 0:
                        await Badge(user_id=user_id, badge_type="leetcode_solver").insert()
                except Exception:
                    pass
                    
        # 6. first_course_complete
        if "first_course_complete" not in existing_types:
            completed = await Enrollment.find_one(
                Enrollment.user_id == user_id,
                Enrollment.completed_at != None
            )
            if completed:
                await Badge(user_id=user_id, badge_type="first_course_complete").insert()