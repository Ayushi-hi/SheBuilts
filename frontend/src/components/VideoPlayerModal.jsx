import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

// Helper function to extract YouTube Video ID
function getYoutubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|live\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// YT IFrame API Loader Helper
const loadYoutubeAPI = (callback) => {
  if (window.YT && window.YT.Player) {
    callback();
    return;
  }

  const existingCallback = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if (existingCallback) existingCallback();
    callback();
  };

  if (!document.getElementById('youtube-iframe-api-script')) {
    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
};

export default function VideoPlayerModal({ course, onClose }) {
  const { token } = useAuth();
  const lessons = course.lessons || [];

  const [selectedLesson, setSelectedLesson] = useState(lessons[0] || null);
  const [progressMap, setProgressMap] = useState({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Refs for tracking latest state to prevent stale closures in callbacks & unmounts
  const latestSelectedLessonRef = useRef(selectedLesson);
  const latestProgressMapRef = useRef(progressMap);

  useEffect(() => {
    latestSelectedLessonRef.current = selectedLesson;
  }, [selectedLesson]);

  useEffect(() => {
    latestProgressMapRef.current = progressMap;
  }, [progressMap]);

  // Fetch progress on mount
  useEffect(() => {
    let active = true;
    const fetchProgress = async () => {
      if (!token) return;
      try {
        const progressList = await api.getMyProgressForCourse(token, course.id);
        if (!active) return;

        const map = {};
        if (Array.isArray(progressList)) {
          progressList.forEach(p => {
            if (p.course_id === course.id) {
              map[p.lesson_id] = p;
            }
          });
        }
        setProgressMap(map);
        setProgressLoaded(true);
      } catch (err) {
        console.error("Error fetching course progress:", err);
        setProgressLoaded(true);
      }
    };

    fetchProgress();
    return () => {
      active = false;
    };
  }, [course.id, token]);

  // Function to save progress to API
  const saveCurrentProgress = async () => {
    const player = playerRef.current;
    const lesson = latestSelectedLessonRef.current;

    if (player && typeof player.getCurrentTime === 'function' && lesson) {
      try {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();

        if (duration > 0) {
          const percent = Math.min(100, Math.max(0, (currentTime / duration) * 100));
          const isCompleted = percent >= 90;
          
          // Optimistic local state update
          setProgressMap(prev => {
            const existing = prev[lesson.id] || {};
            return {
              ...prev,
              [lesson.id]: {
                ...existing,
                watched_seconds: currentTime,
                total_duration: duration,
                percent_watched: percent,
                completed: existing.completed || isCompleted
              }
            };
          });

          await api.updateProgress(token, {
            course_id: course.id,
            lesson_id: lesson.id,
            watched_seconds: currentTime,
            total_duration: duration
          });
        }
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }
  };

  // Interval timer manager for 5-second progress updates
  const startProgressInterval = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(async () => {
      const player = playerRef.current;
      const lesson = latestSelectedLessonRef.current;

      if (player && typeof player.getCurrentTime === 'function' && lesson) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();

        if (duration > 0) {
          const percent = Math.min(100, Math.max(0, (currentTime / duration) * 100));
          const isCompleted = percent >= 90;
          
          // Check if completion status transitioned to completed for toast
          const previouslyCompleted = !!latestProgressMapRef.current[lesson.id]?.completed;

          // Optimistic local state update
          setProgressMap(prev => {
            const existing = prev[lesson.id] || {};
            return {
              ...prev,
              [lesson.id]: {
                ...existing,
                watched_seconds: currentTime,
                total_duration: duration,
                percent_watched: percent,
                completed: existing.completed || isCompleted
              }
            };
          });

          if (isCompleted && !previouslyCompleted) {
            setToastMessage("✓ Lesson completed!");
            setTimeout(() => setToastMessage(""), 3000);
          }

          try {
            await api.updateProgress(token, {
              course_id: course.id,
              lesson_id: lesson.id,
              watched_seconds: currentTime,
              total_duration: duration
            });
          } catch (err) {
            console.error("Failed to send periodic progress update:", err);
          }
        }
      }
    }, 5000);
  };

  const stopProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Setup/control player when selected lesson changes
  useEffect(() => {
    if (!selectedLesson) return;
    if (!progressLoaded) return;

    const videoId = getYoutubeId(selectedLesson.youtube_url);
    if (!videoId) return;

    let player = playerRef.current;
    const savedProgress = progressMap[selectedLesson.id];
    const startSeconds = savedProgress ? savedProgress.watched_seconds : 0;

    if (player && typeof player.loadVideoById === 'function') {
      player.loadVideoById({
        videoId: videoId,
        startSeconds: startSeconds
      });
    } else {
      loadYoutubeAPI(() => {
        const container = document.getElementById('yt-player');
        if (!container) return;

        playerRef.current = new window.YT.Player('yt-player', {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            start: Math.floor(startSeconds)
          },
          events: {
            onReady: (e) => {
              if (startSeconds > 0) {
                e.target.seekTo(startSeconds, true);
              }
            },
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.PLAYING) {
                startProgressInterval();
              } else {
                stopProgressInterval();
                if (e.data === window.YT.PlayerState.PAUSED) {
                  saveCurrentProgress();
                }
              }
            }
          }
        });
      });
    }

    return () => {
      stopProgressInterval();
    };
  }, [selectedLesson?.id, progressLoaded, course.id]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Save progress and destroy player on component unmount
  useEffect(() => {
    return () => {
      // Synchronous/immediate progress saving on unmount
      const player = playerRef.current;
      const lesson = latestSelectedLessonRef.current;

      if (player && typeof player.getCurrentTime === 'function' && lesson) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        if (duration > 0) {
          api.updateProgress(token, {
            course_id: course.id,
            lesson_id: lesson.id,
            watched_seconds: currentTime,
            total_duration: duration
          }).catch(err => console.error("Error saving progress on unmount:", err));
        }
      }

      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [course.id, token]);

  const handleLessonClick = async (lesson) => {
    if (selectedLesson && lesson.id === selectedLesson.id) return;
    
    // Save current lesson progress
    await saveCurrentProgress();
    
    // Switch to new lesson
    setSelectedLesson(lesson);
  };

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button className="video-close-btn" onClick={onClose} aria-label="Close video player">&times;</button>
        
        {/* Sidebar */}
        <div className="video-modal-sidebar">
          <div className="video-modal-course-title">{course.title}</div>
          <div className="video-lesson-list">
            {lessons.map((lesson, index) => {
              const prog = progressMap[lesson.id];
              const isCompleted = prog?.completed;
              const percent = prog?.percent_watched ? Math.round(prog.percent_watched) : 0;
              const isActive = selectedLesson?.id === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className={`video-lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="video-lesson-info">
                    <span className="video-lesson-number">{index + 1}.</span>
                    <span className="video-lesson-title">{lesson.title}</span>
                  </div>
                  <div className="video-lesson-status">
                    {isCompleted ? (
                      <span className="checkmark-icon">✓</span>
                    ) : percent > 0 ? (
                      <span className="percent-badge">{percent}%</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main content area */}
        <div className="video-modal-main">
          {selectedLesson ? (
            <div className="video-player-container">
              <div className="video-iframe-wrapper">
                <div id="yt-player"></div>
              </div>
              <div className="video-player-footer">
                <h3 className="video-player-lesson-title">{selectedLesson.title}</h3>
                <div className="video-progress-bar-container">
                  <div
                    className="video-progress-bar"
                    style={{ width: `${progressMap[selectedLesson.id]?.percent_watched || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="video-no-lesson">
              <p>Select a lesson to start learning!</p>
            </div>
          )}
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="video-toast">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  )
}
