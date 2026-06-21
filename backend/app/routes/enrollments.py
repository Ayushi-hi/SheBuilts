from fastapi import APIRouter, Depends, status, HTTPException
from app.dependencies import get_current_user
from app.models import User, Enrollment
from app.services.course_service import CourseService

router = APIRouter(prefix="/api/courses", tags=["enrollments"])

@router.post("/{course_id}/enroll", status_code=status.HTTP_201_CREATED)
async def enroll_course(course_id: str, current_user: User = Depends(get_current_user)):
    """Enroll user in a course"""
    # Verify course exists
    course = await CourseService.get_course(course_id)
    
    # Check if already enrolled
    existing = await Enrollment.find_one(
        Enrollment.user_id == str(current_user.id),
        Enrollment.course_id == course_id
    )
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already enrolled in this course"
        )
    
    # Create enrollment
    enrollment = Enrollment(
        user_id=str(current_user.id),
        course_id=course_id,
        progress_percent=0.0
    )
    
    await enrollment.insert()
    
    return {
        "message": "Successfully enrolled in course",
        "enrollment": {
            "id": str(enrollment.id),
            "user_id": enrollment.user_id,
            "course_id": enrollment.course_id,
            "progress_percent": enrollment.progress_percent
        }
    }