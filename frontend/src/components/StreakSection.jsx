import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const weekDays = [
  { type:'done',  letter:'M' },
  { type:'done',  letter:'T' },
  { type:'done',  letter:'W' },
  { type:'done',  letter:'T' },
  { type:'done',  letter:'F' },
  { type:'today', letter:'S' },
  { type:'empty', letter:'S' },
]

const infoItems = [
  { bg:'rgba(255,110,199,.15)', icon:'🔥', title:'Streak counter',     desc:'Milestone badges at 7, 30 and 100 days. Show them off to the world.' },
  { bg:'rgba(96,165,250,.15)',  icon:'❄️', title:'Streak freeze',      desc:'Life happens — you get 2 freezes per week to protect your hard work.' },
  { bg:'rgba(252,211,77,.15)',  icon:'🏆', title:'Weekly leaderboard', desc:'Compete with friends. Being #1 is more fun than you think.' },
]

export default function StreakSection() {
  const { isAuthenticated, user } = useAuth()
  const [count, setCount] = useState(0)
  const [task3Done, setTask3Done] = useState(false)
  const currentStreak = user?.streak?.current ?? 0
  const freezeCount = user?.streak?.freeze_count ?? 0
  const totalXp = user?.streak?.total_xp ?? 0

  useEffect(() => {
    const target = isAuthenticated ? currentStreak : 0
    if (target <= 0) {
      setCount(0)
      return undefined
    }
    let n = 0
    const timer = setInterval(() => {
      n++
      setCount(n)
      if (n >= target) clearInterval(timer)
    }, 55)
    return () => clearInterval(timer)
  }, [isAuthenticated, currentStreak])

  return (
    <section className="sec" id="streak">
      <div className="streak-sec">

        <div className="streak-phone reveal-pop">
          <div className="phone-notch" />
          <div className="streak-hero">
            <span className="fire-emoji">🔥</span>
            <div className="streak-big-num">{count}</div>
            <div className="streak-sub-lbl">
              {isAuthenticated ? "day streak - keep showing up." : "Sign in to start your streak."}
            </div>
          </div>
          <div className="week-grid">
            {weekDays.map((d, i) => (
              <div key={i} className={`wd ${d.type}`}>
                <div className="wd-dot" />
                <span style={{ fontSize:'7px', color: d.type === 'today' ? 'rgba(255,255,255,.7)' : 'rgba(255,110,199,.6)' }}>
                  {d.letter}
                </span>
              </div>
            ))}
          </div>
          <div className="task-list">
            <div className="task-row">
              <div className="task-chk done">✓</div>
              <div className="task-lbl">{isAuthenticated ? `Freeze credits left: ${freezeCount}` : 'Save your lesson progress automatically'}</div>
              <div className="task-xp">{isAuthenticated ? 'Ready' : 'Live'}</div>
            </div>
            <div className="task-row">
              <div className="task-chk done">✓</div>
              <div className="task-lbl">{isAuthenticated ? `XP earned: ${totalXp}` : 'Track streaks and coding progress'}</div>
              <div className="task-xp">{isAuthenticated ? 'XP' : 'Progress'}</div>
            </div>
            <div className="task-row" onClick={() => setTask3Done(v => !v)} style={{ cursor:'pointer' }}>
              <div className={`task-chk ${task3Done ? 'done' : ''}`}>{task3Done ? '✓' : '○'}</div>
              <div className="task-lbl">{isAuthenticated ? 'Stay consistent and keep the streak alive' : 'Connect GitHub and LeetCode when you are ready'}</div>
              <div className="task-xp">{isAuthenticated ? 'Daily' : 'Optional'}</div>
            </div>
          </div>
        </div>

        <div className="streak-info-side reveal rd2">
          <div className="sec-label">🔥 Daily streaks</div>
          <h2 className="sec-title">
            Don't break<br />the <span className="grad-text">chain</span>
          </h2>
          <p style={{ color:'var(--muted)', fontSize:'.97rem', lineHeight:1.75, marginBottom:'2rem', fontWeight:500 }}>
            Your streak should reflect real activity, not made-up demo numbers.
            Sign in, keep learning consistently, and your progress will show up here automatically.
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

      </div>
    </section>
  )
}