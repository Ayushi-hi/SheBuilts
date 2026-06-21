import httpx
import time

BASE_URL = "http://127.0.0.1:8000/api"

def run_verification():
    client = httpx.Client()
    
    # 1. Register a test user
    email = f"progress_test_{int(time.time())}@example.com"
    print(f"Registering user: {email}...")
    r = client.post(f"{BASE_URL}/auth/register", json={
        "name": "Progress Tester",
        "email": email,
        "password": "password123"
    })
    print("Register response:", r.json())
    assert r.status_code == 201
    
    # 2. Login
    print("Logging in...")
    r = client.post(f"{BASE_URL}/auth/login", json={
        "email": email,
        "password": "password123"
    })
    login_data = r.json()
    assert r.status_code == 200
    token = login_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Get Course to verify lessons are seeded
    print("Fetching courses...")
    r = client.get(f"{BASE_URL}/courses/")
    courses = r.json()
    assert r.status_code == 200
    
    # Find a course that has lessons
    course_with_lessons = None
    for c in courses:
        if c.get("lessons"):
            course_with_lessons = c
            break
            
    assert course_with_lessons is not None, "No courses with lessons found!"
    course_id = course_with_lessons["id"]
    lesson = course_with_lessons["lessons"][0]
    lesson_id = lesson["id"]
    
    print(f"Using Course: '{course_with_lessons['title']}' ({course_id})")
    print(f"Using Lesson: '{lesson['title']}' ({lesson_id})")
    
    # 4. Post progress (50% watched)
    print("\nUpdating progress to 50%...")
    r = client.post(f"{BASE_URL}/progress/update", json={
        "course_id": course_id,
        "lesson_id": lesson_id,
        "watched_seconds": 14400.0,
        "total_duration": 28800.0
    }, headers=headers)
    p_data = r.json()
    print("Progress 50% response:", p_data)
    assert r.status_code == 200
    assert p_data["percent_watched"] == 50.0
    assert p_data["completed"] is False
    assert isinstance(p_data["id"], str)
    assert isinstance(p_data["user_id"], str)
    
    # 5. Post progress (92% watched)
    print("\nUpdating progress to 92%...")
    r = client.post(f"{BASE_URL}/progress/update", json={
        "course_id": course_id,
        "lesson_id": lesson_id,
        "watched_seconds": 26496.0,
        "total_duration": 28800.0
    }, headers=headers)
    p_data2 = r.json()
    print("Progress 92% response:", p_data2)
    assert r.status_code == 200
    assert p_data2["percent_watched"] == 92.0
    assert p_data2["completed"] is True
    
    # 6. Fetch /progress/me
    print("\nFetching user progress list...")
    r = client.get(f"{BASE_URL}/progress/me", headers=headers)
    me_progress = r.json()
    print("GET /progress/me response:", me_progress)
    assert r.status_code == 200
    assert len(me_progress) >= 1
    assert me_progress[0]["lesson_id"] == lesson_id
    assert me_progress[0]["completed"] is True
    
    # 7. Fetch /progress/me/{course_id}
    print(f"\nFetching progress list for course {course_id}...")
    r = client.get(f"{BASE_URL}/progress/me/{course_id}", headers=headers)
    course_progress = r.json()
    print(f"GET /progress/me/{course_id} response:", course_progress)
    assert r.status_code == 200
    assert len(course_progress) == 1
    assert course_progress[0]["lesson_id"] == lesson_id
    
    print("\n[SUCCESS] Video progress tracking endpoints successfully verified and operational!")

if __name__ == "__main__":
    run_verification()
