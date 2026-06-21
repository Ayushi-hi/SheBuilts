from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.models import User, Streak
from app.services.github_service import GitHubService
from app.services.leetcode_service import LeetCodeService
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

async def refresh_github_stats():
    """Refresh GitHub stats for all active users with GitHub connected"""
    try:
        users = await User.find(User.github_username != None).to_list()
        
        for user in users:
            try:
                stats = await GitHubService.fetch_github_stats(user.github_username)
                user.github_stats = stats
                user.github_stats_updated_at = datetime.utcnow()
                await user.save()
                logger.info(f"Updated GitHub stats for {user.email}")
            except Exception as e:
                logger.error(f"Error updating GitHub stats for {user.email}: {e}")
    except Exception as e:
        logger.error(f"Error in refresh_github_stats: {e}")

async def refresh_leetcode_stats():
    """Refresh LeetCode stats for all active users with LeetCode connected"""
    try:
        users = await User.find(User.leetcode_username != None).to_list()
        
        for user in users:
            try:
                stats = await LeetCodeService.fetch_leetcode_stats(user.leetcode_username)
                user.leetcode_stats = stats
                user.leetcode_stats_updated_at = datetime.utcnow()
                await user.save()
                logger.info(f"Updated LeetCode stats for {user.email}")
            except Exception as e:
                logger.error(f"Error updating LeetCode stats for {user.email}: {e}")
    except Exception as e:
        logger.error(f"Error in refresh_leetcode_stats: {e}")

async def reset_weekly_freezes():
    """Reset freeze count to 2 every Monday"""
    try:
        from datetime import date
        today = date.today()
        await Streak.find_all().update({"$set": {"freeze_count": 2, "last_freeze_reset_date": today}})
        logger.info("✅ Reset weekly freezes for all users")
    except Exception as e:
        logger.error(f"Error resetting weekly freezes: {e}")

def start_background_tasks(scheduler: AsyncIOScheduler):
    """Start background tasks scheduler"""
    try:
        # Refresh every 6 hours
        scheduler.add_job(refresh_github_stats, 'interval', hours=6, id='refresh_github_stats')
        scheduler.add_job(refresh_leetcode_stats, 'interval', hours=6, id='refresh_leetcode_stats')
        # Reset freezes every Monday at 00:00
        scheduler.add_job(reset_weekly_freezes, 'cron', day_of_week='mon', hour=0, minute=0, id='reset_weekly_freezes')
        
        scheduler.start()
        logger.info("✅ Background tasks started")
    except Exception as e:
        logger.error(f"Error starting background tasks: {e}")

def stop_background_tasks(scheduler: AsyncIOScheduler):
    """Stop background tasks"""
    try:
        scheduler.shutdown()
        logger.info("❌ Background tasks stopped")
    except Exception as e:
        logger.error(f"Error stopping background tasks: {e}")