from fastapi import APIRouter, Depends, status, HTTPException
from app.dependencies import get_current_user
from app.models import User, VideoProgress, Enrollment
from app.schemas.progress import VideoProgressUpdate, VideoProgressOut
from app.services.course_service import CourseService
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/progress", tags=["progress"])

@router.post("/update", response_model=VideoProgressOut, status_code=status.HTTP_200_OK)
async def update_progress(body: VideoProgressUpdate, current_user: User = Depends(get_current_user)):
    """Update video progress for user"""
    user_id = str(current_user.id)

    if body.watched_seconds < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="watched_seconds cannot be negative"
        )

    if body.total_duration <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="total_duration must be greater than 0"
        )

    course = await CourseService.get_course(body.course_id)
    lesson = next((item for item in course.lessons if item.get("id") == body.lesson_id), None)
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found in this course"
        )

    enrollment = await Enrollment.find_one(
        Enrollment.user_id == user_id,
        Enrollment.course_id == body.course_id
    )
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You must enroll in this course before saving progress"
        )

    watched_seconds = min(body.watched_seconds, body.total_duration)

    # Calculate percentage
    percent = (watched_seconds / body.total_duration) * 100
    percent = min(100.0, max(0.0, percent))

    completed = percent >= 90.0

    # Look for existing progress
    progress = await VideoProgress.find_one(
        VideoProgress.user_id == user_id,
        VideoProgress.course_id == body.course_id,
        VideoProgress.lesson_id == body.lesson_id
    )

    if progress:
        progress.watched_seconds = watched_seconds
        progress.total_duration = body.total_duration
        progress.percent_watched = percent
        # Keep completed as True if it was already completed
        progress.completed = progress.completed or completed
        progress.last_watched_at = datetime.utcnow()
        await progress.save()
    else:
        progress = VideoProgress(
            user_id=user_id,
            course_id=body.course_id,
            lesson_id=body.lesson_id,
            watched_seconds=watched_seconds,
            total_duration=body.total_duration,
            percent_watched=percent,
            completed=completed,
            last_watched_at=datetime.utcnow()
        )
        await progress.insert()

    return VideoProgressOut(
        id=str(progress.id),
        user_id=str(progress.user_id),
        course_id=progress.course_id,
        lesson_id=progress.lesson_id,
        watched_seconds=progress.watched_seconds,
        total_duration=progress.total_duration,
        percent_watched=progress.percent_watched,
        completed=progress.completed,
        last_watched_at=progress.last_watched_at
    )

@router.get("/me", response_model=List[VideoProgressOut], status_code=status.HTTP_200_OK)
async def get_my_progress(current_user: User = Depends(get_current_user)):
    """Get all video progress records for logged in user"""
    user_id = str(current_user.id)
    records = await VideoProgress.find(VideoProgress.user_id == user_id).to_list()
    
    return [
        VideoProgressOut(
            id=str(r.id),
            user_id=str(r.user_id),
            course_id=r.course_id,
            lesson_id=r.lesson_id,
            watched_seconds=r.watched_seconds,
            total_duration=r.total_duration,
            percent_watched=r.percent_watched,
            completed=r.completed,
            last_watched_at=r.last_watched_at
        )
        for r in records
    ]

@router.get("/me/{course_id}", response_model=List[VideoProgressOut], status_code=status.HTTP_200_OK)
async def get_my_progress_for_course(course_id: str, current_user: User = Depends(get_current_user)):
    """Get video progress for lessons within a specific course"""
    user_id = str(current_user.id)
    records = await VideoProgress.find(
        VideoProgress.user_id == user_id,
        VideoProgress.course_id == course_id
    ).to_list()
    
    return [
        VideoProgressOut(
            id=str(r.id),
            user_id=str(r.user_id),
            course_id=r.course_id,
            lesson_id=r.lesson_id,
            watched_seconds=r.watched_seconds,
            total_duration=r.total_duration,
            percent_watched=r.percent_watched,
            completed=r.completed,
            last_watched_at=r.last_watched_at
        )
        for r in records
    ]
