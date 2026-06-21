import { useAuth } from '../context/AuthContext'

export default function Hero() {
  const { isAuthenticated, user, openAuthModal } = useAuth()
  const streak = user?.streak?.current ?? 0
  const commits = user?.github?.commits_this_month ?? 0
  const xp = user?.streak?.total_xp ?? 0
  const latestBadge = user?.badges?.[0]?.name || user?.badges?.[0]?.title || 'Earn your first badge'

  const handleBeginJourney = () => {
    if (isAuthenticated) {
      const el = document.getElementById('tracks')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      openAuthModal()
    }
  }

  const handleSeeHowItWorks = () => {
    const el = document.getElementById('how')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="home">
      <div className="floating-cards">
        <div className="f-card" style={{ top:'18%', left:'2%', '--dur':'5s', '--del':'0s', '--rot':'-3deg', '--rot2':'2deg' }}>
          <div className="fc-label">🔥 Streak</div>
          <div className="fc-val" style={{ fontSize:'1.6rem', background:'linear-gradient(135deg,#FF6EC7,#FCD34D)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            {isAuthenticated ? `${streak} days` : 'Build your streak'}
          </div>
        </div>
        <div className="f-card" style={{ top:'25%', right:'2%', '--dur':'6s', '--del':'1.2s', '--rot':'3deg', '--rot2':'-2deg' }}>
          <div className="fc-label">🟩 GitHub</div>
          <div className="fc-val" style={{ color:'#39d353' }}>
            {isAuthenticated ? `${commits} commits` : 'Connect GitHub'}
          </div>
        </div>
        <div className="f-card" style={{ bottom:'28%', left:'3%', '--dur':'7s', '--del':'2s', '--rot':'2deg', '--rot2':'-3deg' }}>
          <div className="fc-label">🏅 Badge</div>
          <div className="fc-val">{latestBadge}</div>
        </div>
        <div className="f-card" style={{ bottom:'22%', right:'3%', '--dur':'5.5s', '--del':'0.8s', '--rot':'-2deg', '--rot2':'3deg' }}>
          <div className="fc-label">⭐ XP</div>
          <div className="fc-val" style={{ color:'#A855F7' }}>
            {isAuthenticated ? `${xp} pts` : 'Track your progress'}
          </div>
        </div>
      </div>

      <div className="hero-badge">
        <div className="badge-dot" />
        Free for every woman in tech
      </div>

      <h1>
        <span className="grad-text">Learn.</span><br />
        <span className="grad-text">Build.</span><br />
        <span style={{ color:'#fff' }}>Lead the future.</span>
      </h1>

      <p className="hero-sub">
        Master Web Dev, AI, Web3 &amp; more with structured lessons, saved progress,
        and optional GitHub and LeetCode integrations to keep your learning visible. 💜
      </p>

      <div className="hero-btns">
        <button className="btn-glow" onClick={handleBeginJourney}><span>Begin my journey 🚀</span></button>
        <button className="btn-outline" onClick={handleSeeHowItWorks}>See how it works →</button>
      </div>

      <div className="hero-stats">
        <div><div className="stat-n">{isAuthenticated ? streak : 'Beta'}</div><div className="stat-l">{isAuthenticated ? 'Current streak' : 'Early access'}</div></div>
        <div><div className="stat-n">6</div><div className="stat-l">Tracks</div></div>
        <div><div className="stat-n">Free</div><div className="stat-l">Always &amp; forever</div></div>
        <div><div className="stat-n">{isAuthenticated ? commits : 'Real'}</div><div className="stat-l">{isAuthenticated ? 'GitHub commits tracked' : 'Progress tracking'}</div></div>
      </div>
    </section>
  )
}