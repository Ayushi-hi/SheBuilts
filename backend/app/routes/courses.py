from fastapi import APIRouter, Query, status
from app.services.course_service import CourseService

router = APIRouter(prefix="/api/courses", tags=["courses"])

@router.get("/", response_model=list, status_code=status.HTTP_200_OK)
async def get_courses(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    track: str = Query(None)
):
    """Get all courses with pagination and optional track filter"""
    if track:
        courses = await CourseService.get_courses_by_track(track)
    else:
        courses = await CourseService.get_all_courses(skip=skip, limit=limit)
    
    return [
        {
            "id": str(c.id),
            "title": c.title,
            "description": c.description,
            "track": c.track,
            "difficulty": c.difficulty,
            "weeks": c.weeks,
            "lessons": c.lessons
        }
        for c in courses
    ]

@router.get("/{course_id}", response_model=dict, status_code=status.HTTP_200_OK)
async def get_course(course_id: str):
    """Get course details"""
    course = await CourseService.get_course(course_id)
    return {
        "id": str(course.id),
        "title": course.title,
        "description": course.description,
        "track": course.track,
        "difficulty": course.difficulty,
        "weeks": course.weeks,
        "lessons": course.lessons
    }