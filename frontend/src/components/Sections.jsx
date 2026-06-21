import { useAuth } from '../context/AuthContext'

const testimonials = [
  { text:'I went from knowing absolutely nothing about code to landing a frontend developer role at a startup — in 8 months. SheBuilds made it feel possible every single day.', name:'Priya Sharma', role:'Frontend Developer · Delhi',   initial:'P', avatarBg:'linear-gradient(135deg,var(--pink),var(--purple))' },
  { text:"The streak system is genius. I didn't want to break my 45-day chain, so I coded even on days I was exhausted. That discipline completely changed my life.",             name:'Anjali Verma', role:'Data Analyst · Mumbai',          initial:'A', avatarBg:'linear-gradient(135deg,var(--teal),var(--blue))'   },
  { text:'My GitHub went from completely empty to 200+ commits in 3 months. Recruiters noticed. I got 3 interview calls in one week and accepted my dream offer.',               name:'Riya Kapoor',  role:'Full Stack Dev · Bangalore',      initial:'R', avatarBg:'linear-gradient(135deg,var(--yellow),#F97316)'     },
]

const whyCards = [
  { icon:'🛡️', title:'Safe community',    desc:'A judgment-free space where women lift each other up. No toxic culture. Ever.' },
  { icon:'🎯', title:'Structured paths',   desc:'Zero guessing about what to learn. Clear step-by-step roadmaps from day 1 to job offer.' },
  { icon:'👩‍💼', title:'Women mentors',    desc:'Real code reviews from women engineers at top tech companies around the world.' },
  { icon:'💸', title:'Free. Always.',      desc:'Funded by grants and CSR partnerships. Education is a right — not something you pay for.' },
]

export function Testimonials() {
  return (
    <section className="sec sec-center" id="stories">
      <div className="reveal">
        <div className="sec-label">🌟 Real stories</div>
        <h2 className="sec-title">She did it. <span className="grad-text">So can you.</span></h2>
      </div>
      <div className="test-grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`test-card reveal-pop rd${i+1}`}>
            <div className="test-quote">"</div>
            <div className="test-stars">★★★★★</div>
            <p className="test-text">{t.text}</p>
            <div className="test-author">
              <div className="test-av" style={{ background:t.avatarBg }}>{t.initial}</div>
              <div>
                <div className="test-name">{t.name}</div>
                <div className="test-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function WhySection() {
  return (
    <section className="sec sec-center">
      <div className="reveal">
        <div className="sec-label">💎 Why SheBuilds</div>
        <h2 className="sec-title">Built <span className="grad-text">differently</span>, for you</h2>
      </div>
      <div className="why-grid">
        {whyCards.map((c, i) => (
          <div key={i} className={`why-card reveal-pop rd${i+1}`}>
            <span className="why-icon">{c.icon}</span>
            <div className="why-title">{c.title}</div>
            <p className="why-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function CTA() {
  const { isAuthenticated, openAuthModal } = useAuth()

  const handleCTA = () => {
    if (isAuthenticated) {
      const el = document.getElementById('tracks')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      openAuthModal()
    }
  }

  return (
    <section className="cta-sec">
      <div className="cta-card reveal">
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🚀</div>
        <h2 className="sec-title">Your future starts <span className="grad-text">today</span></h2>
        <p className="cta-sub">Join 12,000+ women who stopped waiting and started building. No experience needed. No credit card. Just you and your ambition. 💜</p>
        <button className="btn-glow" style={{ fontSize:'1rem', padding:'1.1rem 3rem' }} onClick={handleCTA}>
          <span>Start learning — it's free ✨</span>
        </button>
        <div className="cta-note">No credit card · No experience needed · Always free · Always yours</div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo">SheBuilds ✨</div>
          <p className="footer-desc">Free learning platform for women in tech. Learn, build, commit, and lead the future.</p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <a href="#">Courses</a><a href="#">Streaks</a><a href="#">Community</a><a href="#">Certificates</a>
        </div>
        <div className="footer-col">
          <h4>Tracks</h4>
          <a href="#">Web Development</a><a href="#">AI &amp; ML</a><a href="#">Web3</a><a href="#">Design</a>
        </div>
        <div className="footer-col">
          <h4>About</h4>
          <a href="#">Our Mission</a><a href="#">Mentors</a><a href="#">Partners</a><a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 SheBuilds. Free forever. Made with 💜 for every woman who dares to build.</span>
        <span className="footer-copy">India 🇮🇳</span>
      </div>
    </footer>
  )
}