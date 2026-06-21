const steps = [
  { icon:'📱', label:'Open the app',      wd:'0s'   },
  { icon:'🎬', label:'Watch a lesson',    wd:'.4s'  },
  { icon:'✏️', label:'Take a quiz',       wd:'.8s'  },
  { icon:'⚒️', label:'Build project',     wd:'1.2s' },
  { icon:'🟩', label:'Commit to GitHub',  wd:'1.6s' },
  { icon:'🔥', label:'Streak +1 !',       wd:'2s'   },
]

export default function HowItWorks() {
  return (
    <section className="sec how-sec sec-center" id="how">
      <div className="reveal">
        <div className="sec-label">💫 Daily habit loop</div>
        <h2 className="sec-title">Your <span className="grad-text">30-min</span> daily routine</h2>
        <p className="sec-desc">
          Just like Snapchat — open every day, complete tasks, keep the streak alive.
          Miss one day and it resets. That feeling is what makes you unstoppable.
        </p>
      </div>
      <div className="loop-steps">
        {steps.map((step, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center' }}>
            <div className={`loop-step reveal-pop rd${i + 1}`}>
              <div className="ls-ring" style={{ '--wd': step.wd }}>{step.icon}</div>
              <div className="ls-label">{step.label}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`loop-arrow reveal rd${i + 1}`}>→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}