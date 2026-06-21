const items = [
  'Web Development','AI & Machine Learning','Web3 & Blockchain',
  'UI/UX Design','Cloud & DevOps','Mobile Dev',
  'Free Forever','Women in Tech','Learn · Build · Lead',
  'Daily Streaks','GitHub Commits',
]

export default function Marquee() {
  const all = [...items, ...items]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} className="m-item">
            <span className="m-sep">✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  )
}