from app.models import Streak, DailyTask, User
from datetime import date, timedelta
from bson import ObjectId

class LeaderboardService:
    @staticmethod
    async def get_streak_leaderboard() -> list:
        # Retrieve top 10 streaks by current streak
        streaks = await Streak.find_all().sort(-Streak.current_streak).limit(10).to_list()
        
        # Batch fetch user profiles
        user_ids = [s.user_id for s in streaks]
        try:
            object_ids = [ObjectId(uid) for uid in user_ids if ObjectId.is_valid(uid)]
            users = await User.find({"_id": {"$in": object_ids}}).to_list()
            user_map = {str(u.id): u for u in users}
        except Exception:
            user_map = {}
        
        leaderboard = []
        for streak in streaks:
            uid = streak.user_id
            if uid in user_map:
                user = user_map[uid]
                leaderboard.append({
                    "user_id": uid,
                    "name": user.name,
                    "avatar_url": user.avatar_url,
                    "current_streak": streak.current_streak
                })
        return leaderboard

    @staticmethod
    async def get_weekly_leaderboard() -> list:
        today = date.today()
        # Monday of current week
        start_of_week = today - timedelta(days=today.weekday())
        
        # Convert date to datetime at start of day to match MongoDB storage if stored as datetime
        # Beanie's Field(default_factory=date.today) stores as Date object or Datetime.
        # We can match on the date directly.
        # But we cast it as datetime just in case.
        from datetime import datetime, time
        start_dt = datetime.combine(start_of_week, time.min)
        
        pipeline = [
            {
                "$match": {
                    "$or": [
                        {"date": {"$gte": start_dt}},
                        {"date": {"$gte": start_dt.isoformat()}}
                    ]
                }
            },
            {
                "$group": {
                    "_id": "$user_id",
                    "weekly_xp": {"$sum": "$xp_earned"}
                }
            },
            {
                "$sort": {"weekly_xp": -1}
            },
            {
                "$limit": 10
            }
        ]
        
        weekly_data = await DailyTask.aggregate(pipeline).to_list()
        
        user_ids = [item["_id"] for item in weekly_data]
        try:
            object_ids = [ObjectId(uid) for uid in user_ids if ObjectId.is_valid(uid)]
            users = await User.find({"_id": {"$in": object_ids}}).to_list()
            user_map = {str(u.id): u for u in users}
        except Exception:
            user_map = {}
            
        leaderboard = []
        for item in weekly_data:
            uid = item["_id"]
            if uid in user_map:
                user = user_map[uid]
                leaderboard.append({
                    "user_id": uid,
                    "name": user.name,
                    "avatar_url": user.avatar_url,
                    "weekly_xp": item["weekly_xp"]
                })
                
        # Pad with other users if less than 10 have done tasks this week
        if len(leaderboard) < 10:
            already_added = {item["user_id"] for item in leaderboard}
            top_streaks = await Streak.find_all().sort(-Streak.total_xp).to_list()
            for s in top_streaks:
                if len(leaderboard) >= 10:
                    break
                if s.user_id not in already_added:
                    try:
                        user = await User.get(ObjectId(s.user_id))
                    except Exception:
                        user = None
                    if user:
                        leaderboard.append({
                            "user_id": s.user_id,
                            "name": user.name,
                            "avatar_url": user.avatar_url,
                            "weekly_xp": 0
                        })
                        already_added.add(s.user_id)
                        
        return leaderboard
