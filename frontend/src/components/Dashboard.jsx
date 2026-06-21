import { useState } from 'react'
import {
  Bell,
  BookOpen,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Clock3,
  Download,
  ExternalLink,
  Cloud,
  Flame,
  Grid2X2,
  GitBranch,
  GitCommit,
  GitFork,
  GitPullRequest,
  Github,
  GraduationCap,
  Home,
  Hash,
  Headphones,
  Image as ImageIcon,
  Laptop,
  LayoutGrid,
  Link,
  LockKeyhole,
  Mail,
  MapPin,
  Medal,
  MessageCircle,
  MoreVertical,
  Palette,
  Paperclip,
  Play,
  Rocket,
  Search,
  Share2,
  Settings,
  Shield,
  Smile,
  Sparkles,
  Star,
  Send,
  Target,
  Trash2,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'My Learning', icon: BookOpen },
  { label: 'Tracks', icon: LayoutGrid },
  { label: 'Streaks', icon: Flame },
  { label: 'Challenges', icon: Trophy },
  { label: 'Leaderboard', icon: Medal },
  { label: 'GitHub', icon: Github },
  { label: 'LeetCode', icon: Code2 },
  { label: 'Badges', icon: GraduationCap },
  { label: 'Community', icon: Users },
  { label: 'Settings', icon: Settings },
]

const trackCards = [
  { name: 'Web Development', icon: Laptop, courses: 8, progress: 65, tone: 'pink' },
  { name: 'AI & Machine Learning', icon: Sparkles, courses: 6, progress: 40, tone: 'purple' },
  { name: 'Web3 & Blockchain', icon: Code2, courses: 4, progress: 20, tag: 'Coming Soon', tone: 'blue' },
  { name: 'UI/UX Design', icon: Palette, courses: 5, progress: 10, tag: 'Coming Soon', tone: 'yellow' },
  { name: 'Cloud & DevOps', icon: Rocket, courses: 4, progress: 0, tone: 'teal' },
]

const recommended = [
  { title: 'TypeScript Basics', icon: 'TS', level: 'Intermediate', lessons: 6, hours: '2.5 hrs', progress: 30 },
  { title: 'Next.js App Router', icon: 'N', level: 'Intermediate', lessons: 8, hours: '3.1 hrs', progress: 20 },
  { title: 'Python for ML', icon: 'Py', level: 'Beginner', lessons: 10, hours: '4.2 hrs', progress: 0 },
  { title: 'Figma UI Design', icon: 'Fg', level: 'Beginner', lessons: 7, hours: '2 hrs', progress: 0 },
]

const trackPageCourses = [
  {
    title: 'React for Beginners',
    category: 'WEB DEVELOPMENT',
    icon: 'React',
    visual: 'react',
    description: 'Build modern, responsive web apps with React & Hooks.',
    level: 'Beginner',
    lessons: 12,
    projects: 8,
    completed: 8,
    progress: 65,
  },
  {
    title: 'AI & Machine Learning',
    category: 'AI & ML',
    icon: 'AI',
    visual: 'ai',
    description: 'Learn ML concepts and build intelligent models.',
    level: 'Intermediate',
    lessons: 15,
    projects: 6,
    completed: 6,
    progress: 40,
  },
  {
    title: 'UI/UX Design',
    category: 'UI/UX DESIGN',
    icon: 'Figma',
    visual: 'design',
    description: 'Design beautiful and intuitive user experiences.',
    level: 'Beginner',
    lessons: 12,
    projects: 4,
    completed: 3,
    progress: 10,
  },
  {
    title: 'Node.js & Express',
    category: 'BACKEND DEVELOPMENT',
    icon: 'node',
    visual: 'node',
    description: 'Build scalable backend APIs and REST services.',
    level: 'Intermediate',
    lessons: 14,
    projects: 5,
    completed: 3,
    progress: 20,
  },
  {
    title: 'Python for ML',
    category: 'PYTHON FOR ML',
    icon: 'Py',
    visual: 'python',
    description: 'Use Python for data analysis and machine learning.',
    level: 'Beginner',
    lessons: 10,
    projects: 4,
    completed: 0,
    progress: 0,
  },
]

const trackRecommendations = [
  { title: 'Next.js App Router', icon: 'N', level: 'Intermediate', progress: 20 },
  { title: 'Cloud & DevOps', icon: 'Cloud', level: 'Beginner', progress: 0 },
  { title: 'Web3 & Blockchain', icon: 'Web3', level: 'Beginner', progress: 0 },
]

const activeChallenges = [
  { title: 'React Streak Challenge', icon: Code2, color: 'purple', desc: 'Complete 10 React lessons in a row', progress: 70, meta: '7 / 10 lessons', time: 'Ends in 5 days', xp: '+200 XP' },
  { title: '30 Day Code Challenge', icon: Flame, color: 'orange', desc: 'Code every day for 30 days straight', progress: 42, meta: '12 / 30 days', time: 'Ends in 18 days', xp: '+500 XP' },
  { title: 'Cloud Explorer', icon: Cloud, color: 'blue', desc: 'Complete 5 Cloud & DevOps lessons', progress: 40, meta: '2 / 5 lessons', time: 'Ends in 10 days', xp: '+150 XP' },
]

const popularChallenges = [
  { title: 'Web Dev Sprint', icon: Laptop, desc: 'Build 3 projects and level up your web dev skills.', people: '1.2K participants', xp: '+300 XP', color: 'purple' },
  { title: 'LeetCode Ladder', icon: Code2, desc: 'Solve 100 LeetCode problems', people: '2.1K participants', xp: '+500 XP', color: 'orange' },
  { title: 'DSA Mastery', icon: Code2, desc: 'Solve 50 DSA problems', people: '856 participants', xp: '+400 XP', color: 'green' },
  { title: 'UI/UX Creator', icon: Palette, desc: 'Design 5 beautiful UI/UX projects', people: '742 participants', xp: '+250 XP', color: 'pink' },
  { title: 'AI Builder Challenge', icon: Sparkles, desc: 'Complete 6 AI & ML lessons and build a project', people: '623 participants', xp: '+350 XP', color: 'purple' },
  { title: 'Full Stack Builder', icon: LayoutGrid, desc: 'Complete 8 full stack lessons', people: '1.4K participants', xp: '+450 XP', color: 'blue' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [learningTab, setLearningTab] = useState('In Progress')

  const firstName = user?.name?.split(' ')?.[0] || 'Builder'
  const initial = firstName.charAt(0).toUpperCase()
  const streak = user?.streak?.current ?? 12
  const totalXp = user?.streak?.total_xp ?? 1250
  const enrolledCount = user?.enrolled_courses?.length || 8
  const lessonCount = user?.enrolled_courses?.reduce((sum, item) => sum + (item.completed_lessons || 0), 0) || 27
  const level = Math.max(1, Math.floor(totalXp / 500) + 2)
  const nextLevelXp = Math.ceil(totalXp / 500) * 500 + 500
  const xpPercent = Math.min(100, Math.round((totalXp / nextLevelXp) * 100))
  const githubName = user?.github_username || 'Connect GitHub'
  const leetcodeName = user?.leetcode_username || 'Connect LeetCode'

  return (
    <main className="dash-shell">
      <aside className="dash-sidebar">
        <div className="dash-logo">SheBuilds <Sparkles size={19} /></div>

        <div className="dash-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              className={`dash-nav-item ${activePage === label ? 'active' : ''}`}
              type="button"
              key={label}
              onClick={() => setActivePage(label)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <button className="dash-help" type="button">
          <span>💬</span>
          <div>
            <strong>Need help?</strong>
            <small>Join our Discord community</small>
          </div>
          <span>→</span>
        </button>
      </aside>

      <section className="dash-main">
        <header className="dash-topbar">
          <label className="dash-search">
            <Search size={19} />
            <input type="search" placeholder="Search for lessons, tracks, or topics..." />
            <kbd>Ctrl K</kbd>
          </label>

          <div className="dash-profile-strip">
            <div className="dash-streak-chip">
              <span>🔥</span>
              <strong>{streak}</strong>
              <small>day streak</small>
            </div>
            <button className="dash-bell" type="button" aria-label="Notifications">
              <Bell size={19} />
              <span>3</span>
            </button>
            <div className="dash-user-wrap">
              <button className="dash-user-menu" type="button" onClick={() => setIsProfileOpen((value) => !value)}>
                <span>{initial}</span>
                <div>
                  <strong>{firstName}</strong>
                  <small>Level {level}</small>
                </div>
                <ChevronDown size={17} />
              </button>

              {isProfileOpen && (
                <div className="dash-profile-menu">
                  <strong>{user?.name}</strong>
                  <small>{user?.email}</small>
                  <button type="button" onClick={logout}>Log out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {activePage === 'My Learning' ? (
          <MyLearningPage
            learningTab={learningTab}
            setLearningTab={setLearningTab}
            enrolledCount={enrolledCount}
            lessonCount={lessonCount}
            streak={streak}
            totalXp={totalXp}
            level={level}
            xpPercent={xpPercent}
          />
        ) : activePage === 'Tracks' ? (
          <TracksPage
            enrolledCount={enrolledCount}
            streak={streak}
          />
        ) : activePage === 'Streaks' ? (
          <StreaksPage
            streak={streak}
            lessonCount={lessonCount}
          />
        ) : activePage === 'Challenges' ? (
          <ChallengesPage />
        ) : activePage === 'Leaderboard' ? (
          <LeaderboardPage />
        ) : activePage === 'GitHub' ? (
          <GitHubPage githubName={githubName} streak={streak} />
        ) : activePage === 'LeetCode' ? (
          <LeetCodePage leetcodeName={leetcodeName} streak={streak} />
        ) : activePage === 'Badges' ? (
          <BadgesPage />
        ) : activePage === 'Community' ? (
          <CommunityPage />
        ) : activePage === 'Settings' ? (
          <SettingsPage
            user={user}
            firstName={firstName}
            streak={streak}
            totalXp={totalXp}
            level={level}
            nextLevelXp={nextLevelXp}
            xpPercent={xpPercent}
            lessonCount={lessonCount}
          />
        ) : (
          <DashboardHome
            firstName={firstName}
            enrolledCount={enrolledCount}
            lessonCount={lessonCount}
            streak={streak}
            totalXp={totalXp}
            level={level}
            nextLevelXp={nextLevelXp}
            xpPercent={xpPercent}
            githubName={githubName}
            leetcodeName={leetcodeName}
            user={user}
          />
        )}
      </section>
    </main>
  )
}

const settingsTabs = ['Profile', 'Account', 'Preferences', 'Notifications', 'Privacy & Security', 'Appearance', 'Connected Accounts']

const focusTags = ['DSA', 'Web Dev', 'System Design']

const notificationPrefs = [
  ['Learning Reminders', Bell, true],
  ['Challenge Updates', Trophy, true],
  ['Streak Alerts', Flame, true],
  ['Community Messages', MessageCircle, false],
  ['Event Notifications', CalendarDays, true],
  ['New Features', Sparkles, true],
]

function SettingsPage({ user, firstName, streak, totalXp, level, nextLevelXp, xpPercent, lessonCount }) {
  const fullName = user?.name || 'Ananya Sharma'
  const username = user?.username || `${firstName || 'ananya'}_builds`.toLowerCase()
  const email = user?.email || 'ananya@example.com'

  return (
    <div className="dash-content settings-page">
      <div className="settings-main">
        <section className="settings-heading">
          <h1>Settings</h1>
          <p>Manage your account, preferences, and app experience.</p>
        </section>

        <div className="settings-tabs" role="tablist" aria-label="Settings sections">
          {settingsTabs.map((tab, index) => (
            <button className={index === 0 ? 'active' : ''} type="button" role="tab" key={tab}>
              {tab}
            </button>
          ))}
        </div>

        <section className="dash-panel settings-profile-card">
          <SettingsSectionTitle title="Profile Information" subtitle="Update your personal information and how others see you." />
          <div className="settings-profile-grid">
            <div className="settings-avatar-wrap">
              <div className="settings-avatar">
                <span>{fullName.charAt(0)}</span>
              </div>
              <button type="button" aria-label="Edit profile photo"><Palette size={15} /></button>
            </div>

            <label className="settings-field">
              <span>Full Name</span>
              <input type="text" defaultValue={fullName} />
            </label>
            <label className="settings-field">
              <span>Username</span>
              <input type="text" defaultValue={username} />
            </label>
            <label className="settings-field settings-bio">
              <span>Bio</span>
              <textarea defaultValue="Aspiring Full Stack Developer who loves building projects and solving problems." maxLength="150" />
              <small>74/150</small>
            </label>
            <label className="settings-field">
              <span>Location</span>
              <div><MapPin size={16} /><input type="text" defaultValue="India" /></div>
            </label>
            <label className="settings-field">
              <span>Website</span>
              <div><input type="url" defaultValue="https://ananya.dev" /><ExternalLink size={15} /></div>
            </label>
            <button className="settings-save" type="button">Save Changes</button>
          </div>
        </section>

        <section className="dash-panel settings-preferences-card">
          <SettingsSectionTitle title="Learning Preferences" subtitle="Customize your learning experience." />
          <div className="settings-pref-grid">
            <SettingsPreference icon={Code2} title="Preferred Language" subtitle="Choose your preferred programming language.">
              <SettingsSelect label="Preferred language" value="JavaScript" />
            </SettingsPreference>
            <SettingsPreference icon={Target} title="Daily Goal" subtitle="Set your daily learning goal.">
              <SettingsSelect label="Daily goal" value="60 mins" />
            </SettingsPreference>
            <SettingsPreference icon={Trophy} title="Difficulty Level" subtitle="Set the default difficulty for recommendations.">
              <SettingsSelect label="Difficulty level" value="Intermediate" />
            </SettingsPreference>
            <SettingsPreference icon={Grid2X2} title="Focus Areas" subtitle="Choose topics you want to focus on.">
              <div className="settings-tags">
                {focusTags.map((tag) => <span key={tag}>{tag} <button type="button" aria-label={`Remove ${tag}`}>x</button></span>)}
                <button type="button" aria-label="Add focus area">+</button>
              </div>
            </SettingsPreference>
            <SettingsPreference icon={CheckCircle2} title="Learning Reminders" subtitle="Get reminded to keep your streak alive.">
              <SettingsToggle checked />
            </SettingsPreference>
            <SettingsPreference icon={CalendarDays} title="Weekend Mode" subtitle="Relaxed goals on weekends.">
              <SettingsToggle />
            </SettingsPreference>
          </div>
        </section>

        <section className="dash-panel settings-account-card">
          <SettingsSectionTitle title="Account Settings" subtitle="Manage your account settings and actions." />
          <div className="settings-account-grid">
            <SettingsAction icon={LockKeyhole} title="Change Password" subtitle="Update your password regularly." />
            <SettingsAction icon={Shield} title="Two-Factor Authentication" subtitle="Add an extra layer of security.">
              <SettingsToggle checked />
            </SettingsAction>
            <SettingsAction icon={Mail} title="Email Address" subtitle="Update your email address." value={email} />
            <SettingsAction icon={Download} title="Download My Data" subtitle="Download your learning data and progress." />
            <SettingsAction icon={Trash2} title="Delete Account" subtitle="Permanently delete your account and all data." danger />
          </div>
        </section>

        <section className="dash-panel settings-danger-card">
          <SettingsSectionTitle title="Danger Zone" subtitle="Irreversible and permanent actions." />
          <div className="settings-danger-row">
            <div><Trash2 size={19} /><span><strong>Delete Account Permanently</strong><small>Once you delete your account, there is no going back. Please be certain.</small></span></div>
            <button type="button">Delete Account</button>
          </div>
        </section>
      </div>

      <aside className="dash-right settings-side">
        <section className="dash-side-card settings-summary-card">
          <h3>Account Summary</h3>
          <div className="settings-level-row">
            <div className="settings-level-badge">{level}</div>
            <div><strong>Level {level}</strong><span>Keep learning to level up!</span></div>
          </div>
          <div className="dash-progress-line"><span style={{ width: `${xpPercent}%` }} /></div>
          <p>{totalXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</p>
          <div className="settings-summary-grid">
            <SummaryTile value={streak} label="Day Streak" />
            <SummaryTile value="342" label="Problems Solved" />
            <SummaryTile value="24" label="Badges Earned" />
            <SummaryTile value={lessonCount + 129} label="Challenges Completed" />
          </div>
        </section>

        <section className="dash-side-card settings-notify-card">
          <SettingsSectionTitle title="Notification Preferences" subtitle="Choose what you want to be notified about." />
          <div className="settings-notify-list">
            {notificationPrefs.map(([label, Icon, checked]) => (
              <div className="settings-notify-row" key={label}>
                <span><Icon size={16} />{label}</span>
                <SettingsToggle checked={checked} />
              </div>
            ))}
          </div>
        </section>

        <section className="dash-side-card settings-appearance-card">
          <SettingsSectionTitle title="Appearance" subtitle="Customize how SheBuilds looks for you." />
          <SettingsCompactRow label="Theme"><SettingsSelect label="Theme" value="Dark" /></SettingsCompactRow>
          <SettingsCompactRow label="Accent Color">
            <div className="settings-swatches">
              {['purple', 'pink', 'blue', 'cyan', 'orange', 'green'].map((color) => <button className={color} type="button" aria-label={`${color} accent`} key={color} />)}
            </div>
          </SettingsCompactRow>
          <SettingsCompactRow label="Font Size"><SettingsSelect label="Font size" value="Medium" /></SettingsCompactRow>
          <SettingsCompactRow label="Reduce Animations"><SettingsToggle /></SettingsCompactRow>
        </section>
      </aside>
    </div>
  )
}

function SettingsSectionTitle({ title, subtitle }) {
  return (
    <div className="settings-section-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}

function SettingsPreference({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="settings-pref-item">
      <div className="settings-pref-icon"><Icon size={21} /></div>
      <div><strong>{title}</strong><small>{subtitle}</small></div>
      <div className="settings-pref-control">{children}</div>
    </div>
  )
}

function SettingsAction({ icon: Icon, title, subtitle, value, danger, children }) {
  return (
    <div className={`settings-action ${danger ? 'danger' : ''}`}>
      <span><Icon size={19} /></span>
      <div><strong>{title}</strong><small>{subtitle}</small></div>
      {children || (value ? <em>{value}</em> : <ChevronRight size={18} />)}
    </div>
  )
}

function SettingsSelect({ label, value }) {
  return (
    <label className="settings-select" aria-label={label}>
      <select defaultValue={value}>
        <option>{value}</option>
      </select>
      <ChevronDown size={15} />
    </label>
  )
}

function SettingsToggle({ checked = false }) {
  return <button className={`settings-toggle ${checked ? 'on' : ''}`} type="button" aria-pressed={checked}><span /></button>
}

function SettingsCompactRow({ label, children }) {
  return <div className="settings-compact-row"><strong>{label}</strong>{children}</div>
}

function SummaryTile({ value, label }) {
  return <div className="settings-summary-tile"><strong>{value}</strong><span>{label}</span></div>
}

const communityMessages = [
  { name: 'Riya Patel', level: 6, time: '10:24 AM', text: 'Hey everyone! I just solved a really interesting DP problem today. The approach was a bit tricky but super fun. Happy to explain if anyone wants to know!', reactions: [['heart', 24], ['rocket', 12], ['like', 8]] },
  { name: 'Arjun Dev', level: 5, time: '10:27 AM', text: 'That is awesome @Riya Patel! Which problem was it?', reactions: [['heart', 4]] },
  { name: 'Meera Sharma', level: 7, time: '10:31 AM', text: "You can share the link, I'd love to try it too!", reactions: [['like', 3]] },
  { name: 'Riya Patel', level: 6, time: '10:33 AM', text: "Sure! It was Distinct Subsequences on LeetCode. Here's the link: leetcode.com/problems/distinct-subsequences", reactions: [['heart', 7], ['like', 2]] },
  { name: 'Devansh Verma', level: 4, time: '10:35 AM', text: 'Thanks! I will give it a try. By the way, anyone up for a code review session later today?', reactions: [['heart', 5], ['rocket', 2]] },
  { name: 'Ananya (You)', level: 4, time: '10:36 AM', text: "I'm in! Let's do it around 7 PM?", reactions: [['like', 3]], self: true },
  { name: 'Karan Malhotra', level: 5, time: '10:37 AM', text: 'Count me in as well!', reactions: [['like', 2]] },
]

function CommunityPage() {
  return (
    <div className="dash-content community-page">
      <div className="community-main">
        <section className="community-hero">
          <div>
            <h1><MessageCircle size={24} /> Community</h1>
            <p>Chat openly with fellow builders. Ask questions, share ideas, help others, and grow together.</p>
          </div>
          <div className="community-actions">
            <span><Users size={17} /> 128 Online <i /></span>
            <button type="button"><Headphones size={17} /> Join Voice Chat</button>
          </div>
        </section>

        <section className="dash-panel community-chat-panel">
          <div className="community-tabs">
            {['General', 'Help & Support', 'Projects', 'DSA Discussion', 'Off Topic'].map((tab, index) => (
              <button className={index === 0 ? 'active' : ''} type="button" key={tab}><Hash size={15} /> {tab}</button>
            ))}
            <button type="button" aria-label="Add channel">+</button>
          </div>

          <div className="community-welcome">
            <span>Welcome to the community! Be respectful, helpful and kind. Let's build an amazing space for everyone.</span>
            <button type="button">x</button>
          </div>

          <div className="community-thread">
            {communityMessages.map((message) => <CommunityMessage message={message} key={`${message.name}-${message.time}`} />)}
          </div>

          <div className="community-composer">
            <input type="text" placeholder="Type your message..." />
            <div>
              <button type="button" aria-label="Add emoji"><Smile size={18} /></button>
              <button type="button" aria-label="Mention user">@</button>
              <button type="button" aria-label="Add image"><ImageIcon size={18} /></button>
              <button type="button" aria-label="Attach file"><Paperclip size={18} /></button>
              <button type="button" aria-label="Add link"><Link size={18} /></button>
            </div>
            <button type="button"><Send size={17} /> Send</button>
          </div>
        </section>
      </div>

      <aside className="dash-right community-side">
        <section className="dash-side-card community-online-card">
          <div className="dash-side-head"><h3>Online Now</h3><button type="button">View all</button></div>
          <OnlineMember name="Riya Patel" level="Level 6" status="Solving DP problems" />
          <OnlineMember name="Arjun Dev" level="Level 5" status="Working on a MERN project" />
          <OnlineMember name="Meera Sharma" level="Level 7" status="Reading clean code" />
          <OnlineMember name="Devansh Verma" level="Level 4" status="Building in public" />
          <OnlineMember name="Karan Malhotra" level="Level 5" status="Listening to lo-fi" />
          <div className="community-more-members"><span>R</span><span>M</span><span>K</span><strong>+123 more members</strong></div>
        </section>

        <section className="dash-side-card community-contrib-card">
          <div className="dash-side-head"><h3>Top Contributors <span>(This Month)</span></h3><button type="button">View all</button></div>
          <ContributorRow rank="1" name="Riya Patel" xp="2,450 XP" />
          <ContributorRow rank="2" name="Meera Sharma" xp="2,120 XP" />
          <ContributorRow rank="3" name="Karan Malhotra" xp="1,980 XP" />
          <ContributorRow rank="4" name="Devansh Verma" xp="1,520 XP" />
          <ContributorRow rank="5" name="Arjun Dev" xp="1,410 XP" />
        </section>

        <section className="dash-side-card community-guidelines-card">
          <h3><Shield size={20} /> Community Guidelines</h3>
          <p>Let's keep our community positive and inclusive.</p>
          <ul>
            <li>Be respectful and kind to everyone</li>
            <li>No spam or self-promotion</li>
            <li>Help others and share knowledge</li>
            <li>Report any inappropriate behavior</li>
          </ul>
          <button className="streak-panel-link" type="button">Read full guidelines {'->'}</button>
        </section>
      </aside>
    </div>
  )
}

function CommunityMessage({ message }) {
  return (
    <article className={`community-message ${message.self ? 'self' : ''}`}>
      <div className="challenge-avatar">{message.self ? 'A' : message.name.charAt(0)}</div>
      <div>
        <header><strong>{message.name}</strong><span>Level {message.level}</span><time>{message.time}</time></header>
        <p>{message.text}</p>
        <div className="community-reactions">
          {message.reactions.map(([kind, count]) => <button type="button" key={kind}>{kind === 'heart' ? '♥' : kind === 'rocket' ? '↗' : '+'} {count}</button>)}
          <button type="button">+</button>
        </div>
      </div>
    </article>
  )
}

function OnlineMember({ name, level, status }) {
  return (
    <div className="online-member-row">
      <div className="challenge-avatar">{name.charAt(0)}<i /></div>
      <div><strong>{name}</strong><span>{level}</span><small>{status}</small></div>
    </div>
  )
}

function ContributorRow({ rank, name, xp }) {
  return (
    <div className="contributor-row">
      <span>{rank}</span>
      <div className="challenge-avatar">{name.charAt(0)}</div>
      <strong>{name}</strong>
      <em>{xp}</em>
    </div>
  )
}

const learningBadges = [
  { title: 'First Lesson', desc: 'Complete your first lesson', icon: BookOpen, color: 'purple', status: 'Earned' },
  { title: 'Quick Learner', desc: 'Complete 5 lessons', icon: GraduationCap, color: 'purple', status: 'Earned' },
  { title: 'Knowledge Seeker', desc: 'Complete 25 lessons', icon: LayoutGrid, color: 'blue', status: 'Earned' },
  { title: 'Learning Machine', desc: 'Complete 100 lessons', icon: BookOpen, color: 'blue', status: 'Earned' },
  { title: 'Master Learner', desc: 'Complete 250 lessons', icon: Star, color: 'gold', progress: 80, meta: '200 / 250' },
]

const streakBadges = [
  { title: '3 Day Streak', desc: 'Learn for 3 days', icon: Flame, color: 'orange', status: 'Earned' },
  { title: '7 Day Streak', desc: 'Learn for 7 days', icon: Flame, color: 'orange', status: 'Earned' },
  { title: '30 Day Streak', desc: 'Learn for 30 days', icon: Flame, color: 'orange', progress: 73, meta: '22 / 30' },
  { title: '60 Day Streak', desc: 'Learn for 60 days', icon: Flame, color: 'red', progress: 20, meta: '12 / 60' },
  { title: '100 Day Streak', desc: 'Learn for 100 days', icon: Flame, color: 'red', progress: 12, meta: '12 / 100' },
]

const codingBadges = [
  { title: 'Code Initiate', desc: 'Solve 10 problems', icon: Code2, color: 'green', status: 'Earned' },
  { title: 'Problem Solver', desc: 'Solve 50 problems', icon: Code2, color: 'green', status: 'Earned' },
  { title: 'DSA Explorer', desc: 'Solve 100 problems', icon: Code2, color: 'blue', progress: 78, meta: '78 / 100' },
  { title: 'Algorithm Master', desc: 'Solve 250 problems', icon: Laptop, color: 'purple', progress: 60, meta: '150 / 250' },
  { title: 'Code Champion', desc: 'Solve 500 problems', icon: Trophy, color: 'pink', progress: 46, meta: '230 / 500' },
]

function BadgesPage() {
  return (
    <div className="dash-content badges-page">
      <div className="dash-center">
        <section className="badges-hero">
          <div>
            <h1>Badges</h1>
            <p>Earn badges, showcase your achievements, and keep leveling up.</p>
          </div>
          <div className="tracks-astronaut"><span>BD</span></div>
        </section>

        <section className="badges-stats-grid">
          <StatCard icon={Trophy} label="Badges Earned" value="24" note="Amazing!" progress={75} />
          <StatCard icon={Star} label="Rare Badges" value="2" note="Keep going!" hot />
          <StatCard icon={Star} label="Total XP from Badges" value="1,250" note="+350 this month" />
          <StatCard icon={CheckCircle2} label="Collection Progress" value="75%" note="" progress={75} />
        </section>

        <section className="dash-panel badges-main-panel">
          <div className="badges-toolbar">
            <div className="tracks-tabs" role="tablist" aria-label="Badge filters">
              {['All Badges', 'Earned', 'Locked', 'Rare', 'Event'].map((tab, index) => (
                <button className={index === 0 ? 'active' : ''} type="button" key={tab}>{tab}</button>
              ))}
            </div>
            <label className="tracks-search">
              <Search size={17} />
              <input type="search" placeholder="Search badges..." />
            </label>
            <select aria-label="Sort badges" defaultValue="Latest">
              <option>Sort by: Latest</option>
              <option>Sort by: Progress</option>
              <option>Sort by: Rarity</option>
            </select>
          </div>

          <BadgeSection title="Learning Badges" badges={learningBadges} />
          <BadgeSection title="Streak Badges" badges={streakBadges} />
          <BadgeSection title="Coding Badges" badges={codingBadges} />
        </section>
      </div>

      <aside className="dash-right badges-side">
        <section className="dash-side-card badge-collector-card">
          <h3>Badge Collector</h3>
          <div className="badge-collector-body">
            <div className="badge-big-emblem purple"><Trophy size={46} /></div>
            <div>
              <strong>Level 4</strong>
              <span>Badge Explorer</span>
              <div className="dash-progress-line"><span style={{ width: '62%' }} /></div>
              <small>1,250 / 2,000 XP</small>
            </div>
          </div>
          <p>Collect more badges to level up!</p>
        </section>

        <section className="dash-side-card badge-rarity-card">
          <h3>Badge Rarity</h3>
          <div className="badge-rarity-layout">
            <div className="badge-rarity-donut"><strong>24</strong><span>Total</span></div>
            <div className="badge-rarity-list">
              <p><i className="common" />Common <strong>14 (58%)</strong></p>
              <p><i className="rare" />Rare <strong>7 (29%)</strong></p>
              <p><i className="epic" />Epic <strong>2 (8%)</strong></p>
              <p><i className="legendary" />Legendary <strong>1 (4%)</strong></p>
            </div>
          </div>
          <button className="streak-panel-link" type="button">View rarity guide {'->'}</button>
        </section>

        <section className="dash-side-card badges-recent-card">
          <div className="dash-side-head"><h3>Recently Earned</h3><button type="button">View all</button></div>
          <RecentBadge icon={<GraduationCap size={18} />} title="Quick Learner" desc="Complete 5 lessons" time="2h ago" />
          <RecentBadge icon={<Flame size={18} />} title="7 Day Streak" desc="Learn for 7 days" time="1d ago" />
          <RecentBadge icon={<Code2 size={18} />} title="Problem Solver" desc="Solve 50 problems" time="2d ago" />
          <RecentBadge icon={<Trophy size={18} />} title="Contest Participant" desc="Participate in any contest" time="3d ago" />
        </section>

        <section className="dash-side-card badges-friends-card">
          <div className="dash-side-head"><h3>Friends Leaderboard</h3><button type="button">View all</button></div>
          <FriendRankRow rank="1" name="Riya Patel" xp="26 badges" />
          <FriendRankRow rank="2" name="Meera Sharma" xp="24 badges" />
          <FriendRankRow rank="3" name="You" xp="24 badges" active />
          <FriendRankRow rank="4" name="Devanshi Verma" xp="20 badges" />
          <button className="streak-panel-link" type="button">Compare all badges {'->'}</button>
        </section>
      </aside>
    </div>
  )
}

function BadgeSection({ title, badges }) {
  return (
    <section className="badges-section">
      <div className="badges-section-head">
        <h2>{title}</h2>
        <button type="button">View all {'->'}</button>
      </div>
      <div className="badges-grid">
        {badges.map((badge) => <BadgeCard badge={badge} key={badge.title} />)}
      </div>
    </section>
  )
}

function BadgeCard({ badge }) {
  const Icon = badge.icon
  return (
    <article className="badge-card">
      <div className={`badge-emblem ${badge.color}`}><Icon size={38} /></div>
      <h3>{badge.title}</h3>
      <p>{badge.desc}</p>
      {badge.status ? (
        <span className="badge-earned">✓ {badge.status}</span>
      ) : (
        <>
          <div className="dash-mini-progress"><span style={{ width: `${badge.progress}%` }} /></div>
          <small>{badge.meta}</small>
        </>
      )}
    </article>
  )
}

function RecentBadge({ icon, title, desc, time }) {
  return (
    <div className="recent-badge-row">
      <span>{icon}</span>
      <div><strong>{title}</strong><small>{desc}</small></div>
      <em>{time}</em>
    </div>
  )
}

const topicMastery = [
  ['Arrays', 85, 'blue'],
  ['Graphs', 66, 'purple'],
  ['Strings', 78, 'yellow'],
  ['Dynamic Programming', 64, 'pink'],
  ['Linked Lists', 70, 'pink'],
  ['Backtracking', 58, 'yellow'],
  ['Trees', 72, 'yellow'],
  ['Binary Search', 82, 'orange'],
]

const leetcodeActivity = [
  ['Solved Two Sum', 'Easy', '2 min ago', 'C++'],
  ['Solved Binary Tree Level Order Traversal', 'Medium', '1 hour ago', ''],
  ['Solved Daily Challenge', 'Easy', 'Today', 'JavaScript'],
  ['Participated in Weekly Contest 401', 'Rank #1,248', 'Yesterday', ''],
  ['Solved Longest Substring Without Repeating', 'Medium', '2 days ago', 'C++'],
]

function LeetCodePage({ leetcodeName, streak }) {
  return (
    <div className="dash-content leetcode-page">
      <div className="dash-center">
        <section className="leetcode-hero">
          <div>
            <h1>LeetCode Overview</h1>
            <p>Sharpen your problem-solving skills and climb the rankings.</p>
          </div>
          <div className="tracks-astronaut"><span>LC</span></div>
        </section>

        <section className="leetcode-stats-grid">
          <StatCard icon={CheckCircle2} label="Problems Solved" value="342" note="↑ 18 this month" />
          <StatCard icon={Flame} label="Current Streak" value={streak + 2} note="Best: 21 days" hot />
          <StatCard icon={Trophy} label="Contest Rating" value="1,680" note="↑ 82 this month" />
          <StatCard icon={Cloud} label="Global Rank" value="98,765" note="Top 8.21%" />
          <StatCard icon={Star} label="Badges Earned" value="12" note="View all ->" />
        </section>

        <section className="leetcode-top-grid">
          <div className="dash-panel leetcode-breakdown-card">
            <h2>Problem Breakdown</h2>
            <div className="leetcode-donut-wrap">
              <div className="leetcode-donut"><strong>342</strong><span>Total Solved</span></div>
              <div className="leetcode-legend">
                <p><i className="easy" />Easy <strong>152 (44%)</strong></p>
                <p><i className="medium" />Medium <strong>134 (39%)</strong></p>
                <p><i className="hard" />Hard <strong>56 (17%)</strong></p>
              </div>
            </div>
            <div className="leetcode-mini-grid">
              <div><span>Acceptance Rate</span><strong>62.4%</strong><em>↑ 5.2%</em></div>
              <div><span>Submission Accuracy</span><strong>78.6%</strong><em>↑ 6.8%</em></div>
            </div>
          </div>

          <div className="dash-panel leetcode-calendar-card">
            <div className="dash-panel-title">
              <div><h2>Daily Streak Calendar</h2></div>
              <button type="button">This Year</button>
            </div>
            <div className="leetcode-calendar-layout">
              <div>
                <div className="leetcode-months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
                <div className="leetcode-heatmap">
                  {Array.from({ length: 84 }, (_, index) => <i className={`level-${(index * 4 + index % 6) % 5}`} key={index} />)}
                </div>
                <div className="leetcode-heatmap-footer">Less <i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /> More</div>
              </div>
              <div className="leetcode-calendar-stats">
                <MiniMetric icon={<Flame size={18} />} label="Current Streak" value="14 days" />
                <MiniMetric icon={<Trophy size={18} />} label="Longest Streak" value="21 days" />
                <MiniMetric icon={<CalendarDays size={18} />} label="Active Days" value="86 days" />
              </div>
            </div>
            <button type="button">View full calendar {'->'}</button>
          </div>

          <div className="dash-panel leetcode-contest-card">
            <div className="dash-panel-title">
              <div><h2>Contest Performance</h2></div>
              <button type="button">This Year</button>
            </div>
            <div className="leetcode-contest-layout">
              <div>
                <span>Rating</span>
                <strong>1,680 <em>↑ 82 (5.1%)</em></strong>
                <div className="leetcode-line-chart">
                  {[22, 30, 42, 50, 48, 60, 58, 72, 78, 80, 72, 76, 88, 96, 92].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}
                </div>
              </div>
              <div className="leetcode-contest-stats">
                <p>Top Percentile <strong>89.12%</strong></p>
                <p>Best Rank <strong>#1,248</strong></p>
                <p>Contests Attended <strong>18</strong></p>
              </div>
            </div>
            <button type="button">View contest history {'->'}</button>
          </div>
        </section>

        <section className="leetcode-mid-grid">
          <div className="dash-panel leetcode-topic-card">
            <div className="dash-panel-title"><div><h2>Topic Mastery</h2></div><button type="button">View all topics {'->'}</button></div>
            <div className="leetcode-topic-grid">
              {topicMastery.map(([name, value, color]) => <TopicRow name={name} value={value} color={color} key={name} />)}
            </div>
          </div>

          <div className="dash-panel leetcode-activity-card">
            <h2>Recent Activity</h2>
            {leetcodeActivity.map(([title, tag, time, lang]) => <LeetCodeActivity title={title} tag={tag} time={time} lang={lang} key={title} />)}
          </div>

          <div className="dash-panel leetcode-achievements-card">
            <div className="dash-panel-title"><div><h2>Achievements</h2></div><button type="button">View all {'->'}</button></div>
            <div className="leetcode-achievement-grid">
              <LeetAchievement value="50" title="50 Problems" desc="Solved 50 problems" color="purple" />
              <LeetAchievement value="SB" title="100 Problems" desc="Solved 100 problems" color="orange" />
              <LeetAchievement value={<Flame size={30} />} title="Daily Streak" desc="7 days streak" color="pink" />
              <LeetAchievement value={<Shield size={28} />} title="Contest" desc="Participant" color="yellow" />
              <LeetAchievement value={<GitBranch size={28} />} title="DP Expert" desc="Solve 50 DP problems" color="blue" />
              <LeetAchievement value={<Star size={28} />} title="Blind 75" desc="Completed" color="silver" />
            </div>
          </div>
        </section>

        <section className="leetcode-bottom-grid">
          <div className="dash-panel leetcode-recommend-card">
            <h2>Recommended For You</h2>
            <p>Based on your progress and goal</p>
            <div className="leetcode-rec-grid">
              <LeetRecommendation icon={<Shield size={24} />} title="Blind 75" subtitle="Must-do list" meta="75 problems" progress={32} />
              <LeetRecommendation icon={<CalendarDays size={24} />} title="Daily Challenge" subtitle="Practice daily" meta="Solve today's challenge" />
              <LeetRecommendation icon={<Sparkles size={24} />} title="Weekly Contest" subtitle="Improve ranking" meta="Next contest in 2d 14h" />
              <LeetRecommendation icon={<Trophy size={24} />} title="Dynamic Programming" subtitle="Track" meta="30 problems" progress={40} />
              <LeetRecommendation icon={<GitBranch size={24} />} title="Graph Problems" subtitle="Track" meta="25 problems" progress={28} />
            </div>
          </div>

          <div className="dash-panel leetcode-community-card">
            <div className="dash-panel-title"><div><h2>Community Ranking</h2></div><button type="button">This Month</button></div>
            <div className="leetcode-community-layout">
              <div>
                <span>Your Rank</span>
                <strong>#4,521 <em>↑ 1,248</em></strong>
                <div className="leetcode-sparkline">{[24, 24, 38, 52, 34, 41, 48, 40, 32, 44, 56, 65].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}</div>
                <small>Top 10% of all learners!</small>
              </div>
              <div className="leetcode-friends">
                <h3>Friends Leaderboard</h3>
                <FriendRankRow rank="1" name="Riya Patel" xp="1,920" />
                <FriendRankRow rank="2" name="Meera Sharma" xp="1,710" />
                <FriendRankRow rank="3" name="You" xp="1,680" active />
                <FriendRankRow rank="4" name="Devanshi Verma" xp="1,520" />
                <button type="button">View full leaderboard {'->'}</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function TopicRow({ name, value, color }) {
  return (
    <div className="leetcode-topic-row">
      <span className={color}><Code2 size={15} /></span>
      <strong>{name}</strong>
      <div><i style={{ width: `${value}%` }} /></div>
      <em>{value}%</em>
    </div>
  )
}

function LeetCodeActivity({ title, tag, time, lang }) {
  const isEasy = tag === 'Easy'
  const isMedium = tag === 'Medium'
  return (
    <div className="leetcode-activity-row">
      <span><CheckCircle2 size={16} /></span>
      <strong>{title}</strong>
      <em className={isEasy ? 'easy' : isMedium ? 'medium' : ''}>{tag}</em>
      <small>{time}</small>
      <b>{lang}</b>
    </div>
  )
}

function LeetAchievement({ value, title, desc, color }) {
  return (
    <div className={`leetcode-achievement ${color}`}>
      <span>{value}</span>
      <strong>{title}</strong>
      <small>{desc}</small>
    </div>
  )
}

function LeetRecommendation({ icon, title, subtitle, meta, progress }) {
  return (
    <article className="leetcode-rec-card">
      <span>{icon}</span>
      <strong>{title}</strong>
      <small>{subtitle}</small>
      <p>{meta}</p>
      {progress && <div className="dash-mini-progress"><i style={{ width: `${progress}%` }} /></div>}
      {progress && <em>{progress}%</em>}
    </article>
  )
}

const githubRepos = [
  { name: 'react-learning-hub', desc: 'A collection of React projects and practice apps', lang: 'JavaScript', stars: 42, ago: 'Updated 2h ago', color: 'yellow' },
  { name: 'python-data-analytics', desc: 'Data analysis projects using Python and Pandas', lang: 'Python', stars: 28, ago: 'Updated 1d ago', color: 'blue' },
  { name: 'ui-components-library', desc: 'Reusable UI components built with React & Tailwind', lang: 'TypeScript', stars: 16, ago: 'Updated 3d ago', color: 'teal' },
  { name: 'dev-portfolio', desc: 'My personal developer portfolio', lang: 'HTML', stars: 31, ago: 'Updated 1w ago', color: 'orange' },
  { name: 'ml-models-collection', desc: 'Machine learning models and experiments', lang: 'Python', stars: 12, ago: 'Updated 1w ago', color: 'blue' },
]

function GitHubPage({ githubName, streak }) {
  return (
    <div className="dash-content github-page">
      <div className="dash-center">
        <section className="github-hero">
          <div>
            <h1>GitHub</h1>
            <p>Your code journey, connected.</p>
          </div>
          <div className="tracks-astronaut"><span>GH</span></div>
        </section>

        <section className="github-stats-grid">
          <StatCard icon={Code2} label="Repositories" value="18" note="View all ->" />
          <StatCard icon={GitBranch} label="Contributions" value="142" note="This month ↑ 35%" />
          <StatCard icon={Star} label="Stars Earned" value="56" note="All time" hot />
          <StatCard icon={CalendarDays} label="Day Streak" value={streak} note="Keep it up!" />
          <StatCard icon={Clock3} label="Total Commits" value="850" note="All time" />
        </section>

        <section className="dash-panel github-connect-card">
          <div className="github-connected-left">
            <div className="github-logo-badge"><Github size={36} /><span>✓</span></div>
            <div>
              <h2>Connected to GitHub</h2>
              <strong>{githubName === 'Connect GitHub' ? 'ananya-25' : githubName}</strong>
              <p>Connected on 10 May 2024</p>
            </div>
          </div>
          <div className="github-sync">
            <button type="button">Sync Now</button>
            <small>Last synced just now</small>
          </div>
        </section>

        <section className="github-main-grid">
          <div className="dash-panel github-repos-panel">
            <PanelTitle title="Your Repositories" />
            {githubRepos.map((repo) => <RepoRow repo={repo} key={repo.name} />)}
            <button type="button">View all repositories on GitHub {'->'}</button>
          </div>

          <div className="dash-panel github-contribution-panel">
            <div className="dash-panel-title">
              <div><h2>Contribution Activity</h2></div>
              <button type="button">This Month</button>
            </div>
            <strong>142 <span>contributions</span></strong>
            <div className="github-heatmap">
              {Array.from({ length: 112 }, (_, index) => (
                <i className={`level-${(index * 5 + index % 7) % 5}`} key={index} />
              ))}
            </div>
            <div className="github-heatmap-footer">
              <span>Apr 29</span><span>May 6</span><span>May 13</span><span>May 20</span><span>May 27</span>
              <em>Less <i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /> More</em>
            </div>
            <div className="github-contrib-stats">
              <MiniMetric icon={<Flame size={18} />} label="Longest Streak" value="12 days" />
              <MiniMetric icon={<Sparkles size={18} />} label="Most Active" value="24 May" />
              <MiniMetric icon={<GitCommit size={18} />} label="This Month" value="142" />
            </div>
            <button type="button">View full contribution graph {'->'}</button>
          </div>
        </section>

        <section className="dash-panel github-activity-panel">
          <PanelTitle title="Recent GitHub Activity" />
          <GitHubActivity icon={<GitPullRequest size={18} />} text="Opened a pull request in react-learning-hub" tag="Pull Request" detail="Add dark mode toggle component" time="2h ago" />
          <GitHubActivity icon={<GitBranch size={18} />} text="Pushed 3 commits to python-data-analytics" tag="Push" detail="Update data cleaning script and fix null values" time="1d ago" />
          <GitHubActivity icon={<Star size={18} />} text="Starred tensorflow/tensorflow" tag="Star" detail="" time="2d ago" />
          <GitHubActivity icon={<GitFork size={18} />} text="Forked freeCodeCamp/freeCodeCamp" tag="Fork" detail="" time="3d ago" />
          <button type="button">View all activity on GitHub {'->'}</button>
        </section>
      </div>

      <aside className="dash-right github-side">
        <section className="dash-side-card github-profile-card">
          <h3>GitHub Profile</h3>
          <div className="github-profile-head">
            <div className="challenge-avatar">A</div>
            <div>
              <strong>ananya-25</strong>
              <span>Ananya Sharma</span>
              <small>India</small>
            </div>
          </div>
          <p>Learning. Building. Sharing.</p>
          <p>Aspiring full-stack developer & ML enthusiast.</p>
          <div className="github-profile-stats">
            <span><GitBranch size={16} /><strong>18</strong><small>Repos</small></span>
            <span><Users size={16} /><strong>56</strong><small>Followers</small></span>
            <span><Github size={16} /><strong>42</strong><small>Following</small></span>
          </div>
          <button type="button">View GitHub Profile <ExternalLink size={14} /></button>
        </section>

        <section className="dash-side-card github-achievements-card">
          <div className="dash-side-head">
            <h3>GitHub Achievements</h3>
            <button type="button">View all</button>
          </div>
          <div className="github-achievements">
            <Achievement icon={<Sparkles size={22} />} title="Quick Start" desc="First Commit" />
            <Achievement icon={<GitPullRequest size={22} />} title="Pull Shark" desc="Opened 10 PRs" />
            <Achievement icon={<Star size={22} />} title="Star Collector" desc="Earned 10 stars" />
            <Achievement icon={<Github size={22} />} title="Commit Master" desc="100 commits" />
          </div>
        </section>

        <section className="dash-side-card github-languages-card">
          <div className="dash-side-head">
            <h3>Top Languages</h3>
            <button type="button">This Month</button>
          </div>
          {[
            ['JavaScript', '45%', 'yellow'],
            ['Python', '30%', 'blue'],
            ['TypeScript', '15%', 'teal'],
            ['HTML', '5%', 'orange'],
            ['CSS', '5%', 'purple'],
          ].map(([name, value, color]) => <LanguageRow name={name} value={value} color={color} key={name} />)}
          <button className="streak-panel-link" type="button">View more languages {'->'}</button>
        </section>

        <section className="dash-side-card github-commits-card">
          <div className="dash-side-head">
            <h3>Recent Commits</h3>
            <button type="button">View all</button>
          </div>
          <CommitRow title="feat: add dark mode toggle" repo="react-learning-hub" hash="a1b2c3d" time="2h ago" />
          <CommitRow title="fix: handle null values in dataset" repo="python-data-analytics" hash="d4e5f6g" time="1d ago" />
          <CommitRow title="refactor: update component styles" repo="ui-components-library" hash="b7i8j9k" time="2d ago" />
          <CommitRow title="docs: update README" repo="dev-portfolio" hash="k9l0m1n" time="3d ago" />
          <button className="streak-panel-link" type="button">View all commits on GitHub {'->'}</button>
        </section>
      </aside>
    </div>
  )
}

function RepoRow({ repo }) {
  return (
    <div className="github-repo-row">
      <span className={repo.color}><Code2 size={18} /></span>
      <div>
        <strong>{repo.name}</strong>
        <p>{repo.desc}</p>
        <small>{repo.lang}</small>
      </div>
      <div className="repo-meter"><i className={repo.color} /></div>
      <em>{repo.ago}<small>☆ {repo.stars}</small></em>
      <button type="button"><MoreVertical size={16} /></button>
    </div>
  )
}

function MiniMetric({ icon, label, value }) {
  return (
    <div className="github-mini-metric">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  )
}

function GitHubActivity({ icon, text, tag, detail, time }) {
  return (
    <div className="github-activity-row">
      <span>{icon}</span>
      <div><strong>{text}</strong>{detail && <small>{detail}</small>}</div>
      <em>{tag}</em>
      <time>{time}</time>
    </div>
  )
}

function Achievement({ icon, title, desc }) {
  return (
    <div className="github-achievement">
      <span>{icon}</span>
      <strong>{title}</strong>
      <small>{desc}</small>
    </div>
  )
}

function LanguageRow({ name, value, color }) {
  return (
    <div className="github-language-row">
      <span className={color} />
      <strong>{name}</strong>
      <div><i className={color} style={{ width: value }} /></div>
      <em>{value}</em>
    </div>
  )
}

function CommitRow({ title, repo, hash, time }) {
  return (
    <div className="github-commit-row">
      <div className="challenge-avatar">A</div>
      <div><strong>{title}</strong><small>{repo}</small></div>
      <em>{hash}</em>
      <time>{time}</time>
    </div>
  )
}

const podiumUsers = [
  { rank: 2, name: 'Riya Patel', level: 5, xp: '1,050 XP', avatar: 'R', tone: 'silver' },
  { rank: 1, name: 'Meera Sharma', level: 6, xp: '1,250 XP', avatar: 'M', tone: 'gold' },
  { rank: 3, name: 'Sara Khan', level: 5, xp: '950 XP', avatar: 'S', tone: 'bronze' },
]

const leaderboardRows = [
  ['4', 'Younya', 'Level 4', '4', '850 XP', '↑ 2'],
  ['5', 'Devanshi Verma', 'Level 4', '4', '720 XP', '↑ 1'],
  ['6', 'Arjun Singh', 'Level 3', '4', '640 XP', '↓ 1'],
  ['7', 'Karan Malhotra', 'Level 3', '3', '590 XP', '↑ 3'],
  ['8', 'Priya Nair', 'Level 3', '3', '560 XP', '↓ 2'],
  ['9', 'Aditya Rao', 'Level 3', '3', '520 XP', '-'],
  ['10', 'Neha Gupta', 'Level 2', '2', '480 XP', '↑ 1'],
]

function LeaderboardPage() {
  return (
    <div className="dash-content leaderboard-page">
      <div className="dash-center">
        <section className="leaderboard-hero">
          <div>
            <h1>Leaderboard</h1>
            <p>Compete, climb the ranks, and get inspired by fellow builders.</p>
          </div>
          <div className="tracks-astronaut"><span>SB</span></div>
        </section>

        <section className="dash-panel leaderboard-main-panel">
          <div className="leaderboard-toolbar">
            <div className="tracks-tabs" role="tablist" aria-label="Leaderboard filters">
              <button className="active" type="button">Global</button>
              <button type="button">Friends</button>
            </div>
            <select aria-label="Leaderboard period" defaultValue="This Month">
              <option>This Month</option>
              <option>This Week</option>
              <option>All Time</option>
            </select>
            <select aria-label="Leaderboard level" defaultValue="All Levels">
              <option>All Levels</option>
              <option>Level 4+</option>
              <option>Level 5+</option>
            </select>
          </div>

          <div className="leaderboard-podium">
            {podiumUsers.map((user) => (
              <article className={`podium-card ${user.tone}`} key={user.rank}>
                <span>{user.rank}</span>
                <div className="podium-avatar">{user.avatar}</div>
                <h2>{user.name}</h2>
                <p>Level {user.level}</p>
                <strong>{user.xp}</strong>
              </article>
            ))}
          </div>

          <div className="leaderboard-table">
            <div className="leaderboard-table-head">
              <span>Rank</span><span>User</span><span>Level</span><span>XP</span><span>Change</span>
            </div>
            {leaderboardRows.map(([rank, name, level, levelNum, xp, change]) => (
              <LeaderboardTableRow rank={rank} name={name} level={level} levelNum={levelNum} xp={xp} change={change} key={rank} />
            ))}
          </div>

          <div className="leaderboard-pagination">
            <button type="button">‹</button>
            {[1, 2, 3, 4, 5].map((page) => <button className={page === 1 ? 'active' : ''} type="button" key={page}>{page}</button>)}
            <span>...</span>
            <button type="button">20</button>
            <button type="button">›</button>
          </div>
          <p className="leaderboard-note">Leaderboards update every hour</p>
        </section>
      </div>

      <aside className="dash-right leaderboard-side">
        <section className="dash-side-card your-rank-card">
          <div className="rank-badge">4</div>
          <div className="your-rank-head">
            <div className="challenge-avatar">A</div>
            <div>
              <strong>Ananya</strong>
              <small>Level 4</small>
              <em>850 <span>XP</span></em>
            </div>
          </div>
          <p>Keep going! You're in the top 10% of all learners.</p>
          <div className="dash-progress-line"><span style={{ width: '62%' }} /></div>
          <small>150 XP to reach top 3</small>
        </section>

        <section className="dash-side-card leaderboard-xp-card">
          <div className="dash-side-head">
            <h3>XP Overview</h3>
            <button type="button">This Month</button>
          </div>
          <strong>850 <span>XP</span></strong>
          <p>↑ 35% vs last month</p>
          <div className="challenge-bars">
            {[26, 56, 0, 30, 64, 22, 24, 70, 0, 48, 66, 0, 52, 64].map((height, index) => (
              <i style={{ height: `${height}%` }} key={index} />
            ))}
          </div>
          <button type="button">View XP History {'->'}</button>
        </section>

        <section className="dash-side-card top-movers-card">
          <h3>Top Movers</h3>
          <MoverRow name="Karan Malhotra" level="Level 3" xp="↑ 320 XP" />
          <MoverRow name="Priya Nair" level="Level 3" xp="↑ 210 XP" />
          <MoverRow name="Younya" level="Level 4" xp="↑ 180 XP" active />
          <button className="streak-panel-link" type="button">View all {'->'}</button>
        </section>

        <section className="dash-side-card friends-leaderboard-card">
          <div className="dash-side-head">
            <h3>Friends Leaderboard</h3>
            <button type="button">View all</button>
          </div>
          {[
            ['1', 'Riya Patel', '1,050 XP'],
            ['2', 'Sara Khan', '950 XP'],
            ['3', 'Younya', '850 XP'],
            ['4', 'Ananya (You)', '850 XP'],
            ['5', 'Devanshi Verma', '720 XP'],
          ].map(([rank, name, xp]) => (
            <FriendRankRow rank={rank} name={name} xp={xp} key={rank} active={name.includes('You')} />
          ))}
        </section>
      </aside>
    </div>
  )
}

function LeaderboardTableRow({ rank, name, level, levelNum, xp, change }) {
  const isDown = change.startsWith('↓')
  const isSame = change === '-'
  return (
    <div className="leaderboard-table-row">
      <span>{rank}</span>
      <div className="leaderboard-user-cell">
        <div className="challenge-avatar">{name.charAt(0)}</div>
        <div><strong>{name}</strong><small>{level}</small></div>
      </div>
      <span className="leaderboard-level-badge">{levelNum}</span>
      <span>{xp}</span>
      <em className={isDown ? 'down' : isSame ? 'same' : ''}>{change}</em>
    </div>
  )
}

function MoverRow({ name, level, xp, active }) {
  return (
    <div className={`mover-row ${active ? 'active' : ''}`}>
      <div className="challenge-avatar">{name.charAt(0)}</div>
      <div><strong>{name}</strong><small>{level}</small></div>
      <em>{xp}</em>
    </div>
  )
}

function FriendRankRow({ rank, name, xp, active }) {
  return (
    <div className={`friend-rank-row ${active ? 'active' : ''}`}>
      <span>{rank}</span>
      <div className="challenge-avatar">{name.charAt(0)}</div>
      <strong>{name}</strong>
      <em>{xp}</em>
    </div>
  )
}

function ChallengesPage() {
  return (
    <div className="dash-content challenges-page">
      <div className="dash-center">
        <section className="challenges-hero">
          <div>
            <h1>Challenges</h1>
            <p>Test your skills, track your progress, and earn rewards.</p>
          </div>
          <div className="tracks-astronaut"><span>SB</span></div>
        </section>

        <section className="challenges-stats-grid">
          <StatCard icon={Trophy} label="Challenges Joined" value="12" note="View all ->" />
          <StatCard icon={CheckCircle2} label="Challenges Completed" value="7" note="Keep going ->" />
          <StatCard icon={Flame} label="Active Challenges" value="3" note="You got this!" hot />
          <StatCard icon={Star} label="Challenge XP Earned" value="850" note="This month" progress={72} />
        </section>

        <section className="dash-panel challenges-panel">
          <div className="challenges-toolbar">
            <div className="tracks-tabs" role="tablist" aria-label="Challenge filters">
              {['All Challenges', 'Active', 'Completed', 'Upcoming'].map((tab, index) => (
                <button className={index === 0 ? 'active' : ''} type="button" key={tab}>{tab}</button>
              ))}
            </div>
            <label className="tracks-search">
              <Search size={17} />
              <input type="search" placeholder="Search challenges..." />
            </label>
            <select aria-label="Sort challenges" defaultValue="Latest">
              <option>Sort by: Latest</option>
              <option>Sort by: XP</option>
              <option>Sort by: Ending Soon</option>
            </select>
          </div>

          <div className="challenges-section-title">
            <h2>Active Challenges</h2>
            <button type="button">View all active {'->'}</button>
          </div>
          <div className="active-challenge-grid">
            {activeChallenges.map((challenge) => (
              <ActiveChallengeCard challenge={challenge} key={challenge.title} />
            ))}
          </div>

          <div className="challenges-section-title">
            <h2>Popular Challenges</h2>
            <button type="button">View all challenges {'->'}</button>
          </div>
          <div className="popular-challenge-grid">
            {popularChallenges.map((challenge) => (
              <PopularChallengeCard challenge={challenge} key={challenge.title} />
            ))}
          </div>
        </section>
      </div>

      <aside className="dash-right challenges-side">
        <section className="dash-side-card challenge-progress-card">
          <h3>Your Challenge Progress</h3>
          <div className="tracks-donut-wrap">
            <div className="challenge-donut">
              <strong>58%</strong>
              <span>Overall Progress</span>
            </div>
            <div className="tracks-progress-legend">
              <p><i className="done" />Completed <strong>58%</strong></p>
              <p><i className="doing" />In Progress <strong>25%</strong></p>
              <p><i className="todo" />Not Started <strong>17%</strong></p>
            </div>
          </div>
        </section>

        <section className="dash-side-card challenge-xp-card">
          <div className="dash-side-head">
            <h3>XP from Challenges</h3>
            <button type="button">This Month</button>
          </div>
          <strong>850 <span>XP</span></strong>
          <p>+35% vs last month</p>
          <div className="challenge-bars">
            {[24, 9, 30, 8, 28, 28, 41, 54, 73, 26, 0, 64, 36].map((height, index) => (
              <i style={{ height: `${height}%` }} key={index} />
            ))}
          </div>
          <button type="button">View XP History {'->'}</button>
        </section>

        <section className="dash-side-card challenge-leaderboard-card">
          <div className="dash-side-head">
            <h3>Leaderboard</h3>
            <button type="button">This Month</button>
          </div>
          {[
            ['1', 'Meera Sharma', 'Level 6', '1,250 XP'],
            ['2', 'Riya Patel', 'Level 5', '1,050 XP'],
            ['3', 'Sara Khan', 'Level 5', '950 XP'],
            ['4', 'You', 'Level 4', '850 XP'],
            ['5', 'Devanshi Verma', 'Level 4', '720 XP'],
          ].map(([rank, name, level, xp]) => (
            <LeaderboardRow rank={rank} name={name} level={level} xp={xp} key={rank} active={name === 'You'} />
          ))}
          <button className="streak-panel-link" type="button">View full leaderboard {'->'}</button>
        </section>

        <section className="dash-side-card featured-challenge-card">
          <h3>Featured Challenge</h3>
          <div className="featured-challenge-body">
            <div className="challenge-shield"><Code2 size={38} /></div>
            <div>
              <strong>Frontend Ninja</strong>
              <p>Build 3 advanced frontend projects</p>
              <small>12,450 participants</small>
              <small>Ends in 22 days</small>
            </div>
          </div>
          <div className="featured-challenge-footer">
            <strong>+600 XP</strong>
            <button type="button">Join Challenge {'->'}</button>
          </div>
        </section>
      </aside>
    </div>
  )
}

function ActiveChallengeCard({ challenge }) {
  const Icon = challenge.icon
  return (
    <article className={`active-challenge-card ${challenge.color}`}>
      <button type="button" aria-label={`More options for ${challenge.title}`}><MoreVertical size={18} /></button>
      <div className="challenge-shield"><Icon size={36} /></div>
      <h3>{challenge.title}</h3>
      <p>{challenge.desc}</p>
      <div className="dash-progress-line"><span style={{ width: `${challenge.progress}%` }} /></div>
      <strong>{challenge.meta}</strong>
      <footer><span><Clock3 size={15} /> {challenge.time}</span><em>{challenge.xp}</em></footer>
    </article>
  )
}

function PopularChallengeCard({ challenge }) {
  const Icon = challenge.icon
  return (
    <article className={`popular-challenge-card ${challenge.color}`}>
      <div className="popular-challenge-icon"><Icon size={30} /></div>
      <div>
        <h3>{challenge.title}</h3>
        <p>{challenge.desc}</p>
        <small><Users size={13} /> {challenge.people}</small>
      </div>
      <strong>{challenge.xp}</strong>
      <button type="button" aria-label={`Open ${challenge.title}`}>›</button>
    </article>
  )
}

function LeaderboardRow({ rank, name, level, xp, active }) {
  return (
    <div className={`challenge-leader-row ${active ? 'active' : ''}`}>
      <span>{rank}</span>
      <div className="challenge-avatar">{name === 'You' ? 'A' : name.charAt(0)}</div>
      <div>
        <strong>{name}</strong>
        <small>{level}</small>
      </div>
      <em>{xp}</em>
    </div>
  )
}

function StreaksPage({ streak, lessonCount }) {
  return (
    <div className="dash-content streaks-page">
      <div className="dash-center">
        <section className="streaks-hero">
          <div>
            <h1>Streaks</h1>
            <p>Consistency is your superpower. Keep showing up, keep leveling up!</p>
          </div>
          <div className="tracks-astronaut">
            <span>SB</span>
          </div>
        </section>

        <section className="streaks-stats-grid">
          <article className="dash-stat-card streaks-current-card">
            <div className="streaks-fire-ring"><Flame size={38} /></div>
            <div>
              <span>Current Streak</span>
              <strong>{streak} <small>days</small></strong>
              <small>Keep it up! You're on fire.</small>
            </div>
          </article>
          <StatCard icon={Trophy} label="Longest Streak" value="18" note="Achieved on 10 May 2024" hot />
          <StatCard icon={CalendarDays} label="Total Active Days" value="27" note="In the last 60 days" />
          <StatCard icon={BookOpen} label="Lessons Completed" value={lessonCount} note="During current streak" />
        </section>

        <section className="dash-panel streak-progress-panel">
          <h2>Streak Progress</h2>
          <p>You've completed {streak} days in a row. Just 6 more days to beat your record!</p>
          <div className="streak-timeline">
            {['6 May', '7 May', '8 May', '9 May', '10 May', '11 May', '12 May', '13 May', '14 May', '15 May', '17 May', '18 May'].map((day, index) => (
              <div className={index < 7 ? 'done' : index === 11 ? 'goal' : ''} key={day}>
                <span>{index === 4 || index === 11 ? <Flame size={17} /> : index < 7 ? '✓' : ''}</span>
                <small>{day}</small>
                {index === 6 && <em>Today</em>}
              </div>
            ))}
          </div>
          <div className="streaks-progress-bar"><span /></div>
          <div className="streaks-share-callout">
            <Zap size={25} />
            <div>
              <strong>You're building an unstoppable habit!</strong>
              <small>Consistency compounds. Your future self will thank you.</small>
            </div>
            <button type="button"><Share2 size={16} /> Share your streak</button>
          </div>
        </section>

        <section className="dash-panel streak-insights-panel">
          <div className="dash-panel-title">
            <div>
              <h2>Streak Insights</h2>
            </div>
            <button type="button">This Month</button>
          </div>
          <div className="streak-insights-grid">
            <div className="streak-chart-card">
              <h3>Daily Completion Time</h3>
              <p>Average time you spend learning</p>
              <strong>42 <small>min</small></strong>
              <em>+18% vs last month</em>
              <div className="streak-line-chart">
                {[38, 46, 58, 49, 36, 52, 42, 49, 46, 56, 34, 45, 58, 47, 62, 50, 60, 66].map((height, index) => (
                  <i style={{ height: `${height}%` }} key={index} />
                ))}
              </div>
            </div>
            <div className="streak-insight-list">
              <InsightRow icon={<Star size={17} />} title="Best Day" value="10 May" detail="3 lessons" />
              <InsightRow icon={<Clock3 size={17} />} title="Most Active Time" value="7 PM - 9 PM" detail="You're most active" />
              <InsightRow icon={<LayoutGrid size={17} />} title="Weekly Average" value="6.2 days" detail="Per week" />
              <InsightRow icon={<Flame size={17} />} title="Current Streak Rank" value="Top 24%" detail="Among all learners" />
            </div>
          </div>
        </section>

        <section className="dash-panel streak-heatmap-panel">
          <div className="dash-panel-title">
            <div>
              <h2>Activity Heatmap</h2>
              <p>Your learning activity over time</p>
            </div>
            <button type="button">Last 6 Weeks</button>
          </div>
          <div className="streak-heatmap">
            {Array.from({ length: 120 }, (_, index) => (
              <i className={`level-${(index * 7 + index % 5) % 5}`} key={index} />
            ))}
          </div>
          <div className="streak-heatmap-footer">
            <span>Apr 29</span><span>May 6</span><span>May 13</span><span>May 20</span><span>May 27</span>
            <em>Less <i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /> More</em>
          </div>
        </section>
      </div>

      <aside className="dash-right streaks-side">
        <section className="dash-side-card streak-calendar-card">
          <div className="dash-side-head">
            <h3>Streak Calendar</h3>
            <div>
              <button type="button">‹</button>
              <button type="button">›</button>
            </div>
          </div>
          <h4>May 2024</h4>
          <div className="streak-calendar-weekdays">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
          </div>
          <div className="streak-calendar-grid">
            {Array.from({ length: 35 }, (_, index) => (
              <span className={index % 9 === 0 ? 'empty' : index === 13 ? 'best' : index % 7 === 5 ? 'quiet' : 'active'} key={index} />
            ))}
          </div>
          <div className="streak-calendar-legend">
            <span><i className="active" />Active</span>
            <span><i className="quiet" />No activity</span>
            <span><i className="best" />Best day</span>
          </div>
          <button className="streak-panel-link" type="button">View full calendar {'->'}</button>
        </section>

        <section className="dash-side-card streak-milestone-card">
          <h3>Streak Milestones</h3>
          <MilestoneRow title="3 Day Streak" detail="Keep going!" done />
          <MilestoneRow title="7 Day Streak" detail="One week strong!" done />
          <MilestoneRow title="14 Day Streak" detail="Two weeks of greatness!" />
          <MilestoneRow title="30 Day Streak" detail="Unstoppable learner!" />
          <MilestoneRow title="60 Day Streak" detail="Legendary dedication!" />
          <button className="streak-panel-link" type="button">View all milestones {'->'}</button>
        </section>

        <section className="dash-side-card streak-tips-card">
          <h3>Tips to Keep Your Streak</h3>
          <TipRow icon={<Sparkles size={20} />} title="Set a daily learning goal" detail="Even 15 minutes counts!" />
          <TipRow icon={<CalendarDays size={20} />} title="Learn at the same time daily" detail="Build a habit that sticks." />
          <TipRow icon={<Trophy size={20} />} title="Track your progress" detail="Celebrate small wins." />
          <button className="streak-panel-link" type="button">Explore Challenges {'->'}</button>
        </section>
      </aside>
    </div>
  )
}

function InsightRow({ icon, title, value, detail }) {
  return (
    <div className="streak-insight-row">
      <span>{icon}</span>
      <strong>{title}</strong>
      <em>{value}<small>{detail}</small></em>
    </div>
  )
}

function MilestoneRow({ title, detail, done }) {
  return (
    <div className={`streak-milestone-row ${done ? 'done' : ''}`}>
      <span>{done ? <Flame size={17} /> : <LockKeyhole size={16} />}</span>
      <div>
        <strong>{title}</strong>
        <small>{detail}</small>
      </div>
      <em>{done ? '✓' : <LockKeyhole size={14} />}</em>
    </div>
  )
}

function TipRow({ icon, title, detail }) {
  return (
    <div className="streak-tip-row">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{detail}</small>
      </div>
    </div>
  )
}

function TracksPage({ enrolledCount, streak }) {
  const tabs = ['All Tracks', 'In Progress', 'Completed', 'Saved']

  return (
    <div className="dash-content tracks-page">
      <div className="dash-center">
        <section className="tracks-hero">
          <div>
            <h1>Tracks</h1>
            <p>Follow structured paths, build real skills, and become job-ready.</p>
          </div>
          <div className="tracks-astronaut">
            <span>SB</span>
          </div>
        </section>

        <section className="tracks-stats-grid">
          <StatCard icon={BookOpen} label="Tracks Enrolled" value={enrolledCount} note="View all ->" />
          <StatCard icon={Play} label="Overall Progress" value="72%" note="" progress={72} />
          <StatCard icon={Trophy} label="Tracks Completed" value="3" note="Keep going!" hot />
          <StatCard icon={Clock3} label="Time Spent Learning" value="42h 15m" note="This month" />
        </section>

        <section className="dash-panel tracks-list-panel">
          <div className="tracks-toolbar">
            <div className="tracks-tabs" role="tablist" aria-label="Track filters">
              {tabs.map((tab, index) => (
                <button className={index === 0 ? 'active' : ''} type="button" key={tab}>{tab}</button>
              ))}
            </div>
            <label className="tracks-search">
              <Search size={17} />
              <input type="search" placeholder="Search tracks..." />
            </label>
            <select aria-label="Sort tracks" defaultValue="Recent">
              <option>Sort by: Recent</option>
              <option>Sort by: Progress</option>
              <option>Sort by: Name</option>
            </select>
          </div>

          <div className="tracks-course-list">
            {trackPageCourses.map((course) => (
              <TrackRow course={course} key={course.title} />
            ))}
          </div>
        </section>
      </div>

      <aside className="dash-right tracks-side">
        <section className="dash-side-card tracks-progress-card">
          <div className="dash-side-head">
            <h3>Your Progress</h3>
            <button type="button">This Month</button>
          </div>
          <div className="tracks-donut-wrap">
            <div className="tracks-donut" aria-label="72 percent overall progress">
              <strong>72%</strong>
              <span>Overall Progress</span>
            </div>
            <div className="tracks-progress-legend">
              <p><i className="done" />Completed <strong>72%</strong></p>
              <p><i className="doing" />In Progress <strong>20%</strong></p>
              <p><i className="todo" />Not Started <strong>8%</strong></p>
            </div>
          </div>
        </section>

        <section className="dash-side-card tracks-rec-panel">
          <h3>Recommended for You</h3>
          {trackRecommendations.map((item) => (
            <TrackRecommendation item={item} key={item.title} />
          ))}
          <button type="button">Explore more tracks {'->'}</button>
        </section>

        <section className="dash-side-card tracks-streak-panel">
          <h3>Track Streak</h3>
          <strong><Flame size={22} /> {streak} <span>Days in a row</span></strong>
          <div className="tracks-week">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div key={`${day}-${index}`}>
                <span className={index < 5 ? 'done' : index === 6 ? 'today' : ''}>{index < 5 ? '✓' : index === 6 ? '!' : '-'}</span>
                <small>{day}</small>
              </div>
            ))}
          </div>
          <p><span>Longest streak: 18 days</span><em>Keep it up!</em></p>
        </section>

        <section className="dash-side-card tracks-completed-panel">
          <div className="dash-side-head">
            <h3>Recently Completed</h3>
            <button type="button">View all</button>
          </div>
          <CompletedTrack icon={<Github size={19} />} title="Git & GitHub Basics" time="Completed 2 days ago" />
          <CompletedTrack icon="CSS" title="HTML & CSS Basics" time="Completed 1 week ago" />
          <CompletedTrack icon="JS" title="JavaScript Essentials" time="Completed 2 weeks ago" />
        </section>
      </aside>
    </div>
  )
}

function TrackRow({ course }) {
  return (
    <article className="tracks-row">
      <div className={`tracks-art ${course.visual}`}>
        <span>{course.category}</span>
        <strong>{course.icon}</strong>
        <div className="tracks-code-lines">
          <i /><i /><i /><i /><i />
        </div>
      </div>
      <div className="tracks-row-info">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="tracks-badges">
          <span className={course.level === 'Intermediate' ? 'intermediate' : ''}>{course.level}</span>
          <span>{course.lessons} Lessons</span>
          <span>{course.projects} Projects</span>
        </div>
      </div>
      <div className="tracks-row-progress">
        <div className="tracks-row-actions">
          <button type="button" aria-label={`Save ${course.title}`}><Bookmark size={18} /></button>
          <button type="button" aria-label={`More options for ${course.title}`}><MoreVertical size={18} /></button>
        </div>
        <p>{course.progress}% completed</p>
        <div className="dash-progress-line"><span style={{ width: `${course.progress}%` }} /></div>
        <small>{course.completed} / {course.lessons} lessons</small>
        <button className="tracks-continue-btn" type="button">{course.progress > 0 ? 'Continue' : 'Start Track'} {'->'}</button>
      </div>
    </article>
  )
}

function TrackRecommendation({ item }) {
  return (
    <article className="tracks-rec-item">
      <div>{item.icon}</div>
      <span>
        <strong>{item.title}</strong>
        <small className={item.level === 'Intermediate' ? 'intermediate' : ''}>{item.level}</small>
        <i><b style={{ width: `${item.progress}%` }} /></i>
      </span>
      <em>{item.progress}%</em>
    </article>
  )
}

function CompletedTrack({ icon, title, time }) {
  return (
    <div className="tracks-completed-row">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{time}</small>
      </div>
      <em>+200 XP</em>
    </div>
  )
}

function DashboardHome({ firstName, enrolledCount, lessonCount, streak, totalXp, level, nextLevelXp, xpPercent, githubName, leetcodeName, user }) {
  return (
    <div className="dash-content">
      <div className="dash-center">
        <section className="dash-welcome">
          <div>
            <h1>Welcome back, {firstName}! 👋</h1>
            <p>Keep learning, keep building, keep leading.</p>
          </div>
          <div className="dash-astronaut">👩‍🚀</div>
        </section>

        <section className="dash-stats-grid">
          <StatCard icon={BookOpen} label="Courses Enrolled" value={enrolledCount} note="View all →" />
          <StatCard icon={Play} label="Lessons Completed" value={lessonCount} note="Keep going →" />
          <StatCard icon={Flame} label="Day Streak" value={streak} note="Amazing! 🔥" hot />
          <StatCard icon={Trophy} label="Total XP" value={totalXp.toLocaleString()} note={`Level ${level}`} progress={xpPercent} />
        </section>

        <section className="dash-panel dash-continue">
          <PanelTitle title="Continue Learning" action="View all →" />
          <div className="dash-course-card">
            <div className="dash-course-art">
              <span>WEB DEVELOPMENT</span>
              <strong>⚛</strong>
            </div>
            <div className="dash-course-info">
              <h3>React for Beginners</h3>
              <p>Build modern, responsive web apps with React and Hooks.</p>
              <div className="dash-progress-line"><span style={{ width: '65%' }} /></div>
              <small>Lesson 12 of 18 • 32 min left</small>
            </div>
            <div className="dash-next-up">
              <h4>Next Up</h4>
              <p><span>13</span> State & Props in Depth <small>25 min</small></p>
              <p><span>14</span> Handling Events <small>18 min</small></p>
              <p><span>15</span> Conditional Rendering <small>22 min</small></p>
              <button type="button">Continue Learning →</button>
            </div>
          </div>
        </section>

        <section className="dash-panel">
          <PanelTitle title="Your Learning Tracks" action="View all tracks →" />
          <div className="dash-track-grid">
            {trackCards.map(({ name, icon: Icon, courses, progress, tag, tone }) => (
              <article className={`dash-track-card ${tone}`} key={name}>
                {tag && <span className="dash-track-tag">{tag}</span>}
                <Icon size={28} />
                <h3>{name}</h3>
                <p>{courses} courses <span>{progress}%</span></p>
                <div className="dash-mini-progress"><span style={{ width: `${progress}%` }} /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="dash-panel">
          <PanelTitle title="Recommended For You" subtitle="Based on your progress and interests" action="View all →" />
          <div className="dash-rec-grid">
            {recommended.map((item) => (
              <article className="dash-rec-card" key={item.title}>
                <div className="dash-rec-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.level}</span>
                </div>
                <p>{item.lessons} lessons • {item.hours}</p>
                <div className="dash-mini-progress"><span style={{ width: `${item.progress}%` }} /></div>
                <small>{item.progress}%</small>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="dash-right">
        <DashboardRightRail streak={streak} totalXp={totalXp} level={level} nextLevelXp={nextLevelXp} xpPercent={xpPercent} githubName={githubName} leetcodeName={leetcodeName} user={user} />
      </aside>
    </div>
  )
}

function MyLearningPage({ learningTab, setLearningTab, enrolledCount, lessonCount, streak, totalXp, level, xpPercent }) {
  const courses = [
    {
      title: 'React for Beginners',
      track: 'WEB DEVELOPMENT',
      icon: '⚛',
      description: 'Build modern, responsive web apps with React & Hooks.',
      progress: 65,
      lesson: 'Lesson 12 of 18',
      time: '32 min left',
      next: ['State & Props in Depth', 'Handling Events', 'Conditional Rendering'],
    },
    {
      title: 'AI & Machine Learning',
      track: 'AI & ML',
      icon: '🤖',
      description: 'Learn ML concepts and build intelligent models.',
      progress: 40,
      lesson: 'Lesson 6 of 15',
      time: '1.2 hrs left',
      next: ['Linear Regression', 'Model Evaluation', 'Feature Engineering'],
    },
    {
      title: 'UI/UX Design',
      track: 'UX/UI DESIGN',
      icon: '🎨',
      description: 'Design beautiful and intuitive user experiences.',
      progress: 10,
      lesson: 'Lesson 3 of 12',
      time: '45 min left',
      next: ['Wireframing', 'Design Systems', 'Prototyping'],
    },
    {
      title: 'Next.js App Router',
      track: 'FULL STACK',
      icon: 'N',
      description: 'Build production-ready apps with routing, layouts, and server components.',
      progress: 35,
      lesson: 'Lesson 5 of 14',
      time: '55 min left',
      next: ['Nested Layouts', 'Server Components', 'Data Fetching'],
    },
    {
      title: 'Python for Data Science',
      track: 'DATA SCIENCE',
      icon: 'Py',
      description: 'Practice Python, NumPy, Pandas, and visual analysis workflows.',
      progress: 25,
      lesson: 'Lesson 4 of 16',
      time: '1 hr left',
      next: ['Pandas Basics', 'Cleaning Data', 'Charts with Matplotlib'],
    },
    {
      title: 'Cloud & DevOps Basics',
      track: 'CLOUD & DEVOPS',
      icon: '☁',
      description: 'Learn deployment, CI/CD basics, containers, and cloud fundamentals.',
      progress: 15,
      lesson: 'Lesson 2 of 12',
      time: '40 min left',
      next: ['Linux Essentials', 'Docker Intro', 'Deploying an API'],
    },
  ]

  return (
    <div className="dash-content learning-page">
      <div className="dash-center">
        <section className="learning-hero-panel">
          <div>
            <h1>My Learning</h1>
            <p>Your personalized learning journey. Keep building, keep growing.</p>
          </div>
          <div className="dash-astronaut">👩‍🚀</div>
        </section>

        <section className="dash-stats-grid">
          <StatCard icon={BookOpen} label="Courses Enrolled" value={enrolledCount} note="View all →" />
          <StatCard icon={Play} label="Lessons Completed" value={lessonCount} note="Keep going →" />
          <StatCard icon={Flame} label="Day Streak" value={streak} note="Amazing! 🔥" hot />
          <StatCard icon={Trophy} label="Total XP" value={totalXp.toLocaleString()} note={`Level ${level}`} progress={xpPercent} />
        </section>

        <section className="dash-panel learning-courses-panel">
          <div className="learning-tabs-row">
            {['In Progress', 'Completed', 'Saved', 'Wishlist'].map((tab) => (
              <button
                type="button"
                key={tab}
                className={learningTab === tab ? 'active' : ''}
                onClick={() => setLearningTab(tab)}
              >
                {tab}
              </button>
            ))}
            <select aria-label="Sort courses" defaultValue="Recent">
              <option>Recent</option>
              <option>Progress</option>
              <option>Name</option>
            </select>
          </div>

          <div className="learning-course-list">
            {courses.map((course) => (
              <LearningCourseCard course={course} key={course.title} />
            ))}
          </div>
        </section>
      </div>

      <aside className="dash-right learning-side">
        <section className="dash-side-card learning-progress-card">
          <div className="dash-side-head">
            <h3>Your Progress</h3>
            <button type="button">This Month⌄</button>
          </div>
          <strong>27</strong>
          <span>Lessons Completed</span>
          <div className="learning-bars">
            {[28, 46, 68, 34, 70, 30, 78, 100, 56, 76, 82, 42].map((height, index) => (
              <i style={{ height: `${height}%` }} key={index} />
            ))}
          </div>
          <p>↑ 23% vs last month</p>
        </section>

        <section className="dash-side-card">
          <div className="dash-side-head">
            <h3>XP Breakdown</h3>
            <button type="button">This Month⌄</button>
          </div>
          <ul className="dash-xp-list">
            <li><span>Lessons Completed</span><strong>+850 XP</strong></li>
            <li><span>Daily Streak ({streak} days)</span><strong>+240 XP</strong></li>
            <li><span>GitHub Contribution</span><strong>+120 XP</strong></li>
            <li><span>Challenge Completed</span><strong>+40 XP</strong></li>
          </ul>
          <div className="learning-total-xp">
            <span>Total XP Earned</span>
            <strong>{totalXp.toLocaleString()} XP</strong>
          </div>
        </section>

        <section className="dash-side-card">
          <PanelTitle title="Continue Learning" action="" />
          <MiniCourse title="Web Development" subtitle="React for Beginners" progress="65%" icon="⚛" />
          <MiniCourse title="AI & ML" subtitle="AI & Machine Learning" progress="40%" icon="🤖" />
          <MiniCourse title="UI/UX Design" subtitle="UI/UX Design" progress="10%" icon="🎨" />
          <button type="button">View all in-progress →</button>
        </section>

        <section className="dash-side-card">
          <PanelTitle title="Recommended For You" action="" />
          <MiniCourse title="Next.js App Router" subtitle="Intermediate" progress="20%" icon="N" />
          <MiniCourse title="Python for ML" subtitle="Beginner" progress="0%" icon="Py" />
          <MiniCourse title="Figma UI Design" subtitle="Beginner" progress="0%" icon="Fg" />
          <button type="button">View more recommendations →</button>
        </section>
      </aside>
    </div>
  )
}

function LearningCourseCard({ course }) {
  return (
    <article className="learning-course-card">
      <div className="learning-course-art">
        <span>{course.track}</span>
        <strong>{course.icon}</strong>
      </div>
      <div className="learning-course-main">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="learning-course-progress">
          <div className="dash-progress-line"><span style={{ width: `${course.progress}%` }} /></div>
          <small>{course.progress}% completed</small>
        </div>
        <div className="learning-course-meta">
          <span>{course.lesson}</span>
          <span>{course.time}</span>
        </div>
      </div>
      <div className="learning-next-list">
        <div className="learning-card-menu"><MoreVertical size={18} /></div>
        <h4>Next Up</h4>
        {course.next.map((item, index) => (
          <p key={item}><span>{index + 4}</span>{item}<small>{index === 0 ? '25' : index === 1 ? '18' : '22'} min</small></p>
        ))}
        <button type="button">View full curriculum →</button>
      </div>
    </article>
  )
}

function MiniCourse({ title, subtitle, progress, icon }) {
  return (
    <div className="learning-mini-course">
      <div>{icon}</div>
      <span><strong>{title}</strong><small>{subtitle}</small></span>
      <em>{progress}</em>
    </div>
  )
}

function DashboardRightRail({ streak, totalXp, level, nextLevelXp, xpPercent, githubName, leetcodeName, user }) {
  return (
    <>
      <section className="dash-side-card dash-streak-card">
        <h3>Your Streak 🔥</h3>
        <p>You're on fire! Keep it up.</p>
        <strong>{streak} <span>days</span></strong>
        <div className="dash-week">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={`${day}-${index}`}>
              <span className={index < 6 ? 'done' : ''}>{index < 5 ? '✓' : index === 5 ? 'S' : '-'}</span>
              <small>{day}</small>
            </div>
          ))}
        </div>
        <button type="button">View Streak Calendar →</button>
      </section>

      <section className="dash-side-card">
        <h3>Level {level}</h3>
        <p>{totalXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</p>
        <div className="dash-progress-line"><span style={{ width: `${xpPercent}%` }} /></div>
        <ul className="dash-xp-list">
          <li><span>Lessons Completed</span><strong>+850 XP</strong></li>
          <li><span>Daily Streak ({streak} days)</span><strong>+240 XP</strong></li>
          <li><span>GitHub Contribution</span><strong>+120 XP</strong></li>
          <li><span>Challenge Completed</span><strong>+40 XP</strong></li>
        </ul>
        <button type="button">View XP History →</button>
      </section>

      <section className="dash-side-card">
        <div className="dash-side-head">
          <h3>Connected Accounts</h3>
          <button type="button">Manage</button>
        </div>
        <AccountRow icon={<Github size={24} />} name="GitHub" detail={githubName} meta={`${user?.github?.commits_this_month ?? 128} contributions this month`} connected={!!user?.github_username} />
        <AccountRow icon={<Code2 size={24} />} name="LeetCode" detail={leetcodeName} meta={`Rank: ${user?.leaderboard_rank || '128,765'}`} connected={!!user?.leetcode_username} />
      </section>

      <section className="dash-side-card">
        <div className="dash-side-head">
          <h3>Recent Activity</h3>
          <button type="button">View all</button>
        </div>
        <Activity text='Completed lesson "React Hooks"' time="2h ago" xp="+50 XP" />
        <Activity text="Solved 2 LeetCode problems" time="5h ago" xp="+40 XP" />
        <Activity text="7 GitHub contributions" time="1d ago" xp="+30 XP" />
      </section>
    </>
  )
}

function StatCard({ icon: Icon, label, value, note, hot, progress }) {
  return (
    <article className={`dash-stat-card ${hot ? 'hot' : ''}`}>
      <div className="dash-stat-icon"><Icon size={27} /></div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
        <small>{note}</small>
        {progress !== undefined && <div className="dash-mini-progress"><span style={{ width: `${progress}%` }} /></div>}
      </div>
    </article>
  )
}

function PanelTitle({ title, subtitle, action }) {
  return (
    <div className="dash-panel-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <button type="button">{action}</button>}
    </div>
  )
}

function AccountRow({ icon, name, detail, meta, connected }) {
  return (
    <div className="dash-account-row">
      {icon}
      <div>
        <strong>{name}</strong>
        <span>{detail}</span>
        <small>{meta}</small>
      </div>
      <em>{connected ? 'Connected' : 'Add'}</em>
    </div>
  )
}

function Activity({ text, time, xp }) {
  return (
    <div className="dash-activity-row">
      <span>✦</span>
      <div>
        <strong>{text}</strong>
        <small>{time}</small>
      </div>
      <em>{xp}</em>
    </div>
  )
}
