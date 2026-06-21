import { useAuth } from '../context/AuthContext'

const GH_PATTERN = [0,0,1,2,3,2,1,0,2,3,4,3,2,1,0,1,2,3,4,3,2,0,1,2,3,2,1,0,0,1,2,3,3,4,3,2,1,2,3,4,4,3,2,1,2,3,4,3,2,1,0,1,2,3,4,3,2,1,0,1,2,3,2,3,4,3,2,1,0,1,2,3,4,3,2,1,0,1,2,3,2,1,0,0,1,2,3,4,3,2,0,1,2,3,4,3,2,1,0,1,2,3,4,3,2,1,2,3,4,3,2,1]

const infoItems = [
  { bg:'rgba(45,212,191,.15)',  icon:'🟩', title:'Green squares every day',       desc:"Your GitHub contribution graph fills with real commits from real code you wrote." },
  { bg:'rgba(255,110,199,.15)', icon:'⚒️', title:'Real projects, not just exercises', desc:"Portfolio site, quiz app, ML classifier — things you'll actually show employers." },
  { bg:'rgba(168,85,247,.15)',  icon:'👩‍💼', title:'Mentor code review',           desc:"Women engineers review every project and give real, actionable feedback." },
]

export default function GithubSection() {
  const { isAuthenticated, user } = useAuth()
  const githubConnected = !!user?.github_username
  const username = user?.github_username || 'your-profile'
  const commits = user?.github?.commits_this_month ?? 0
  const repos = Array.isArray(user?.github?.repos) ? user.github.repos.slice(0, 3) : []

  return (
    <section className="sec gh-sec" id="github">
      <div className="gh-two-col">

        <div className="reveal rd1">
          <div className="sec-label">🟩 GitHub commits</div>
          <h2 className="sec-title">Build your<br /><span className="grad-text">real portfolio</span></h2>
          <p style={{ color:'var(--muted)', fontSize:'.97rem', lineHeight:1.75, marginBottom:'2rem', fontWeight:500 }}>
            Connect your GitHub account to track coding activity alongside your lessons.
            Your profile should reflect real work, not placeholder stats.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
            {infoItems.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize:'.93rem', fontWeight:700, marginBottom:'3px' }}>{item.title}</div>
                  <div style={{ fontSize:'.83rem', color:'var(--muted)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gh-panel reveal-pop rd3">
          <div className="gh-head">
            <div className="gh-av">{username.charAt(0).toUpperCase()}</div>
            <div>
              <div className="gh-uname">{githubConnected ? user?.name : 'Connect your GitHub'}</div>
              <div className="gh-handle">
                @{username} {githubConnected ? `· ${commits} contributions this month` : '· track your real activity'}
              </div>
            </div>
          </div>
          <div className="gh-contrib-lbl">Contribution activity</div>
          <div className="gh-grid">
            {GH_PATTERN.map((v, i) => (
              <div key={i} className={`gh-sq g${v}`} />
            ))}
          </div>
          <div className="gh-repos">
            {githubConnected && repos.length > 0 ? repos.map((repo, index) => (
              <div key={`${repo.name}-${index}`} className="gh-repo">
                <div>
                  <div className="gh-repo-name">{repo.name || 'Repository'}</div>
                  <div className="gh-repo-meta">
                    <div className="gh-lang-dot" style={{ background:'#39d353' }} />
                    <span>{repo.language || 'Code'}</span>
                  </div>
                </div>
                <div style={{ fontSize:'10px', color:'#7d8590' }}>{repo.updated_at || 'recent'}</div>
              </div>
            )) : (
              <div className="gh-repo">
                <div>
                  <div className="gh-repo-name">{isAuthenticated ? 'Connect GitHub in the profile menu' : 'Sign in to connect GitHub'}</div>
                  <div className="gh-repo-meta">
                    <div className="gh-lang-dot" style={{ background:'#7d8590' }} />
                    <span>We will show live activity here once your account is connected.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}