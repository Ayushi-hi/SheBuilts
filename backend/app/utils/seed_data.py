from app.models import Course, TrackEnum

async def seed_courses():
    """Seed database with 7 courses with updated lesson schemas"""
    
    # Check if courses need to be updated/re-seeded
    first_course = await Course.find_one()
    if first_course:
        needs_reseed = False
        if first_course.lessons and "youtube_video_id" not in first_course.lessons[0]:
            needs_reseed = True
        elif first_course.track == TrackEnum.WEBDEV and (len(first_course.lessons) > 0 and "id" not in first_course.lessons[0]):
            needs_reseed = True
            
        if needs_reseed:
            print("Outdated course schema detected. Clearing and re-seeding courses...")
            await Course.find_all().delete()

    # Check if courses already exist
    count = await Course.find().count()
    if count > 0:
        print("Courses already seeded")
        return
    
    courses_data = [
        {
            "title": "The Odin Project - Full Stack Web Development",
            "description": "Master full-stack web development with HTML, CSS, JavaScript, and Ruby on Rails",
            "track": TrackEnum.WEBDEV,
            "difficulty": "beginner",
            "weeks": 24,
            "lessons": [
                {
                    "id": "webdev_odin_1",
                    "title": "Foundations - HTML & CSS",
                    "youtube_url": "https://youtu.be/tVzUXW6siu0",
                    "youtube_video_id": "tVzUXW6siu0",
                    "duration_seconds": 28800,  # 480 mins * 60
                    "order": 1
                }
            ]
        },
        {
            "title": "freeCodeCamp React - Complete Modern React Tutorial",
            "description": "Learn React.js with hooks, state management, and modern development practices",
            "track": TrackEnum.WEBDEV,
            "difficulty": "intermediate",
            "weeks": 12,
            "lessons": [
                {
                    "id": "webdev_react_1",
                    "title": "React Fundamentals",
                    "youtube_url": "https://youtu.be/tVzUXW6siu0",
                    "youtube_video_id": "tVzUXW6siu0",
                    "duration_seconds": 43200,  # 720 mins * 60
                    "order": 1
                }
            ]
        },
        {
            "title": "freeCodeCamp Python for Machine Learning",
            "description": "Master Python, NumPy, Pandas, and Scikit-learn for AI/ML applications",
            "track": TrackEnum.AI,
            "difficulty": "intermediate",
            "weeks": 16,
            "lessons": [
                {
                    "id": "ai_ml_1",
                    "title": "Python Basics for ML",
                    "youtube_url": "https://www.youtube.com/live/1z5-O7-5AXk",
                    "youtube_video_id": "1z5-O7-5AXk",
                    "duration_seconds": 32400,  # 540 mins * 60
                    "order": 1
                }
            ]
        },
        {
            "title": "Patrick Collins - Solidity, Blockchain & Smart Contracts",
            "description": "Learn Solidity and Web3 development for decentralized applications",
            "track": TrackEnum.WEB3,
            "difficulty": "advanced",
            "weeks": 20,
            "lessons": [
                {
                    "id": "web3_solidity_1",
                    "title": "Blockchain Fundamentals",
                    "youtube_url": "https://youtu.be/M576WGiDBdQ",
                    "youtube_video_id": "M576WGiDBdQ",
                    "duration_seconds": 28800,  # 480 mins * 60
                    "order": 1
                }
            ]
        },
        {
            "title": "DesignCourse - Figma UI/UX Design Mastery",
            "description": "Master Figma and UI/UX design principles for modern web and mobile applications",
            "track": TrackEnum.DESIGN,
            "difficulty": "beginner",
            "weeks": 10,
            "lessons": []
        },
        {
            "title": "freeCodeCamp AWS Cloud Computing",
            "description": "Complete guide to Amazon Web Services for cloud infrastructure and deployment",
            "track": TrackEnum.CLOUD,
            "difficulty": "intermediate",
            "weeks": 14,
            "lessons": []
        },
        {
            "title": "Expo React Native - Mobile App Development",
            "description": "Build cross-platform mobile applications with React Native and Expo",
            "track": TrackEnum.MOBILE,
            "difficulty": "intermediate",
            "weeks": 12,
            "lessons": []
        }
    ]
    
    for course_data in courses_data:
        course = Course(**course_data)
        await course.insert()
    
    print("Seeded 7 courses successfully!")
