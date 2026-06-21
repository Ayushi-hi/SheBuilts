import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

const tracks = [
  {
    icon:'💻', name:'Web Development',
    trackKey: 'webdev',
    desc:'From your first HTML tag to deploying live React apps. The most in-demand skill in tech.',
    pills:[
      { label:'HTML & CSS',   bg:'rgba(255,110,199,.15)', color:'var(--pink)'   },
      { label:'JavaScript',   bg:'rgba(168,85,247,.15)',  color:'var(--purple)' },
      { label:'React.js',     bg:'rgba(96,165,250,.15)',  color:'var(--blue)'   },
    ],
    weeks:'8 weeks · Beginner',
  },
  {
    icon:'🤖', name:'AI & Machine Learning',
    trackKey: 'ai',
    desc:'Build intelligent systems. From Python basics all the way to training your own neural networks.',
    pills:[
      { label:'Python',       bg:'rgba(45,212,191,.15)',  color:'var(--teal)'   },
      { label:'TensorFlow',   bg:'rgba(168,85,247,.15)',  color:'var(--purple)' },
      { label:'Data Science', bg:'rgba(255,110,199,.15)', color:'var(--pink)'   },
    ],
    weeks:'12 weeks · Intermediate',
  },
  {
    icon:'⛓️', name:'Web3 & Blockchain',
    trackKey: 'web3',
    desc:'Build decentralised apps on Ethereum. Smart contracts, DeFi, and the future of the internet.',
    pills:[
      { label:'Solidity',  bg:'rgba(252,211,77,.15)',  color:'var(--yellow)' },
      { label:'Ethereum',  bg:'rgba(96,165,250,.15)',  color:'var(--blue)'   },
      { label:'DApps',     bg:'rgba(45,212,191,.15)',  color:'var(--teal)'   },
    ],
    weeks:'10 weeks · Advanced',
  },
  {
    icon:'🎨', name:'UI/UX Design',
    trackKey: 'design',
    desc:'Design stunning products in Figma. Build a portfolio that gets you interviews at top companies.',
    pills:[
      { label:'Figma',          bg:'rgba(255,110,199,.15)', color:'var(--pink)'   },
      { label:'Design Systems', bg:'rgba(168,85,247,.15)',  color:'var(--purple)' },
      { label:'Portfolio',      bg:'rgba(96,165,250,.15)',  color:'var(--blue)'   },
    ],
    weeks:'6 weeks · Creative',
  },
  {
    icon:'☁️', name:'Cloud & DevOps',
    trackKey: 'cloud',
    desc:'Deploy, scale and automate with AWS, Docker and CI/CD. High-paying, high-demand skill.',
    pills:[
      { label:'AWS',    bg:'rgba(252,211,77,.15)',  color:'var(--yellow)' },
      { label:'Docker', bg:'rgba(45,212,191,.15)',  color:'var(--teal)'   },
      { label:'CI/CD',  bg:'rgba(96,165,250,.15)',  color:'var(--blue)'   },
    ],
    weeks:'10 weeks · Advanced',
  },
  {
    icon:'📱', name:'Mobile Development',
    trackKey: 'mobile',
    desc:'Build real iOS & Android apps with React Native. One codebase, two platforms, endless impact.',
    pills:[
      { label:'React Native', bg:'rgba(255,110,199,.15)', color:'var(--pink)'   },
      { label:'Navigation',   bg:'rgba(168,85,247,.15)',  color:'var(--purple)' },
      { label:'App Stores',   bg:'rgba(45,212,191,.15)',  color:'var(--teal)'   },
    ],
    weeks:'8 weeks · Intermediate',
  },
]

const delays = ['rd1','rd2','rd3','rd4','rd5','rd6']

export default function Tracks({ onSelectCourse }) {
  const { isAuthenticated, token, openAuthModal } = useAuth()
  const [dbCourses, setDbCourses] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.getCourses().then(data => {
      if (Array.isArray(data)) {
        setDbCourses(data)
      }
    }).catch(err => {
      console.error("Error loading courses:", err)
      setMessage('We could not load courses right now. Please try again in a moment.')
    })
  }, [])

  const handleTrackClick = async (trackKey) => {
    if (!isAuthenticated) {
      openAuthModal()
      return
    }

    setMessage('')

    const course = dbCourses.find(c => c.track === trackKey)
    if (!course) {
      setMessage('Lessons for this track are coming soon.')
      return
    }

    // Check lessons count directly from the list course object
    if (!course.lessons || course.lessons.length === 0) {
      setMessage('Lessons for this track are coming soon.')
      return
    }

    try {
      await api.enrollCourse(token, course.id).catch(err => {
        if (!err.message?.toLowerCase().includes('already enrolled')) {
          throw err
        }
      })

      const details = await api.getCourseDetails(course.id)
      if (!details || !details.lessons || details.lessons.length === 0) {
        setMessage('Lessons for this track are coming soon.')
      } else {
        onSelectCourse(details)
      }
    } catch (err) {
      console.error("Error loading course details:", err)
      setMessage(err.message || 'We could not open this course right now.')
    }
  }

  return (
    <section className="sec" id="tracks">
      <div className="reveal sec-center" style={{ marginBottom:0 }}>
        <div className="sec-label">📚 Learning tracks</div>
        <h2 className="sec-title">Choose your <span className="grad-text">path</span></h2>
        <p className="sec-desc">
          Every track starts from zero — no experience needed. Pick one and we'll guide you all the way to your first job. 💼
        </p>
        {message && (
          <div className="auth-error" style={{ marginTop:'1rem' }}>
            {message}
          </div>
        )}
      </div>
      <div className="tracks-grid">
        {tracks.map((t, i) => (
          <div
            key={i}
            className={`track-card reveal-pop ${delays[i]}`}
            onClick={() => handleTrackClick(t.trackKey)}
            style={{ cursor: 'pointer' }}
          >
            <span className="t-icon">{t.icon}</span>
            <div className="t-name">{t.name}</div>
            <p className="t-desc">{t.desc}</p>
            <div className="t-pills">
              {t.pills.map((p, j) => (
                <span key={j} className="t-pill" style={{ background:p.bg, color:p.color }}>{p.label}</span>
              ))}
            </div>
            <div className="t-footer">
              <span className="t-weeks">{t.weeks}</span>
              <div className="t-arrow">→</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}