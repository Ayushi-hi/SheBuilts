# SheBuilds ✨ - Women's Coding Learning Platform

SheBuilds is a modern, high-fidelity web application designed as a women's coding platform. It features interactive learning tracks, real-time progress updates, streak preservation mechanics, and seamless GitHub and LeetCode integrations to track progress and solve coding challenges.

---

## 🚀 What Has Been Built

### 1. Interactive Learning Tracks & Course Integration
- Interactive path selection cards powered by a responsive CSS grid layout.
- Connected tracks on the landing page to dynamic backend courses matching respective track keys (`webdev`, `ai`, `web3`, `design`, `cloud`, `mobile`).
- Graceful validation: if a track is click-selected and has no lessons (or is coming soon), it displays an alert rather than breaking.

### 2. Video Player Modal & Progress Syncing
- **Modal Component (`VideoPlayerModal.jsx`)**: A full-screen dark glassmorphism modal showing a course lesson sidebar on the left and a YouTube player on the right.
- **YouTube IFrame API integration**: Dynamically loads the official YouTube script only once. It parses and loads YouTube video IDs from various URL patterns (`youtu.be`, `youtube/watch`, `youtube/live`).
- **State Preservation**: Queries the backend on load to recover saved watched positions and automatically seeks to the saved duration.
- **Periodic API Synchronization**: Regularly saves user watch positions to the database every 5 seconds while playing, and on pauses or component unmount.
- **Optimistic Sidebar Progress**: Shows percent watched badges on partially watched lessons, checks off completed lessons immediately when progress reaches 90% or more, and triggers a floating completion toast notification.

### 3. Profile & Integration Customizations
- **Lucide Icons**: Placed GitHub and LeetCode logos next to headings in the profile dropdown menu.
- **Navbar Dropdown Overrides**: Increased dropdown boundaries (`min-width: 320px`, `max-width: 340px`), positioned the dropdown on top of other elements using `z-index: 999`, and updated layout properties to prevent connect buttons and usernames from wrapping or clipping.

---

## 📂 Folder Structure & File Map

Here is the directory structure for both the frontend and backend of the project:

```text
shecoder/
├── backend/                       # Python FastAPI backend
│   ├── app/
│   │   ├── models/                # Database documents mapped via Beanie ODM
│   │   │   ├── __init__.py
│   │   │   ├── badge.py           # User achievement badges model
│   │   │   ├── course.py          # Tracks, lessons, and course details
│   │   │   ├── daily_task.py      # XP, streak challenges
│   │   │   ├── enrollment.py      # Course enrollment mappings
│   │   │   ├── integration_cache.py # Cached GitHub & LeetCode stats
│   │   │   ├── streak.py          # Daily engagement logs
│   │   │   ├── user.py            # User credentials and details
│   │   │   └── video_progress.py  # Lesson duration progress
│   │   ├── routes/                # FastAPI routers (Endpoints)
│   │   │   ├── auth.py            # Registration & login
│   │   │   ├── courses.py         # Course queries & metadata
│   │   │   ├── enrollments.py     # Course registration handlers
│   │   │   ├── integrations.py    # Github & Leetcode account sync handlers
│   │   │   ├── leaderboard.py     # Ranked score listings
│   │   │   ├── progress.py        # Video watched-seconds updates
│   │   │   ├── streaks.py         # Engagement status updates
│   │   │   └── users.py           # Profile metadata retrieval
│   │   ├── schemas/               # Pydantic serialization / deserialization schemas
│   │   ├── services/              # Business logic helpers
│   │   ├── tasks/                 # Background scheduler tasks (APScheduler)
│   │   ├── utils/
│   │   │   └── seed_data.py       # Seeds MongoDB Atlas with initial courses & lessons
│   │   ├── config.py              # Environment settings parser
│   │   ├── database.py            # MongoDB Atlas client connection setup
│   │   ├── main.py                # App entrypoint and CORS policy setup
│   │   └── security.py            # Password hashing & JWT signature validation
│   ├── .env                       # Environment credentials
│   ├── requirements.txt           # Python dependency manifest
│   ├── run.py                     # Main runner file for backend server
│   └── verify_progress.py         # Progress database validation script
│
├── shebuilds-frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── AuthModal.jsx      # Sign in / Sign up form overlays
│   │   │   ├── Background.jsx     # Floating background emojis, stars & aurora blobs
│   │   │   ├── Cursor.jsx         # Custom fluid cursor followers
│   │   │   ├── GithubSection.jsx  # Landing page contribution graphs
│   │   │   ├── Hero.jsx           # Top welcome section and stats
│   │   │   ├── HowItWorks.jsx     # Process steps infographic
│   │   │   ├── Marquee.jsx        # Scrolling dynamic banner
│   │   │   ├── Navbar.jsx         # Header links, profile dropdown & connections
│   │   │   ├── Sections.jsx       # Why-choose-us, CTA, and Footer components
│   │   │   ├── StreakSection.jsx  # Landing page streak displays
│   │   │   ├── Tracks.jsx         # Learning path options mapped to courses
│   │   │   └── VideoPlayerModal.jsx # Video player with lesson checklists & progress bars
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # React context state for auth tokens & session persistence
│   │   ├── hooks/
│   │   │   └── useEffects.js      # Animations hooks (e.g. reveal effects, ripples)
│   │   ├── styles/
│   │   │   └── index.css          # Styled classes, variables, animations & scrollbars
│   │   ├── App.jsx                # Layout orchestrator
│   │   ├── api.js                 # Network wrapper around backend endpoints
│   │   └── main.jsx               # React DOM render entry
│   ├── package.json               # Frontend dependencies list
│   └── vite.config.js             # Vite configurations
│
└── run-frontend.cmd               # Quick launcher script for frontend development server
```

---

## 🛠️ Setup & Running the Application

Follow these steps to configure, install dependencies, and run both services locally:

### 1. Prerequisites
- **Node.js**: Version 18.x or higher
- **Python**: Version 3.10.x or higher
- **MongoDB**: Access to a MongoDB Atlas cluster or a local MongoDB database server.

---

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the dependencies listed in `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
4. Verify or modify the environment values in the `.env` file (e.g., connection strings for `MONGODB_URL` and `REDIS_URL`).
5. Run the server:
   ```bash
   python run.py
   ```
   *The backend will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000) (Interactive Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)).*

---

### 3. Frontend Setup
1. Navigate to the `shebuilds-frontend` directory:
   ```bash
   cd shebuilds-frontend
   ```
2. Install the necessary packages, including the Lucide icon library:
   ```bash
   npm install
   npm install lucide-react@0.383.0
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```
   *Alternatively, on Windows, you can double-click or run `run-frontend.cmd` from the root directory.*
   *The frontend development server will launch at [http://localhost:5173](http://localhost:5173).*

---

## 🔗 Main API Routes & Endpoints

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user and login | No |
| `POST` | `/api/auth/login` | Login user and return JWT Access Token | No |
| `GET` | `/api/users/me` | Fetch detailed user metadata | Yes |
| `GET` | `/api/users/me/dashboard` | Fetch stats for user dashboard | Yes |
| `GET` | `/api/courses/` | Get list of all available learning courses | No |
| `GET` | `/api/courses/{course_id}`| Get full detail of a course (including lessons list) | No |
| `POST` | `/api/courses/{course_id}/enroll` | Enroll the user in a course | Yes |
| `GET` | `/api/progress/me` | Get all video progress logs for user | Yes |
| `GET` | `/api/progress/me/{course_id}` | Get progress records for a course's lessons | Yes |
| `POST` | `/api/progress/update` | Save/Update watched position for a lesson | Yes |
| `POST` | `/api/integrations/github/connect` | Connect GitHub profile username | Yes |
| `POST` | `/api/integrations/leetcode/connect` | Connect LeetCode profile username | Yes |
