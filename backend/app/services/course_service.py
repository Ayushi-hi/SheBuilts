from app.models import Course
from fastapi import HTTPException, status

class CourseService:
    @staticmethod
    async def get_all_courses(skip: int = 0, limit: int = 10) -> list:
        courses = await Course.find().skip(skip).limit(limit).to_list()
        return courses
    
    @staticmethod
    async def get_course(course_id: str) -> Course:
        from bson import ObjectId
        try:
            course = await Course.get(ObjectId(course_id))
        except Exception:
            course = None
        
        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found"
            )
        return course
    
    @staticmethod
    async def get_courses_by_track(track: str) -> list:
        courses = await Course.find(Course.track == track).to_list()
        return courses