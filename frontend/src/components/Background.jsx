import { useEffect } from 'react'

export function Aurora() {
  return (
    <div className="aurora">
      <div className="aurora-blob" />
      <div className="aurora-blob" />
      <div className="aurora-blob" />
      <div className="aurora-blob" />
    </div>
  )
}

export function Stars() {
  useEffect(() => {
    const container = document.getElementById('stars')
    if (!container || container.childElementCount > 0) return
    for (let i = 0; i < 90; i++) {
      const s = document.createElement('div')
      s.className = 'star'
      const sz = Math.random() * 2.5 + 0.5
      s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${(Math.random()*3+1.5).toFixed(1)}s;--del:${(Math.random()*4).toFixed(1)}s;`
      container.appendChild(s)
    }
  }, [])
  return <div id="stars" />
}

export function FloatingEmojis() {
  useEffect(() => {
    const container = document.getElementById('emojis')
    if (!container || container.childElementCount > 0) return
    const emojis = ['✨','💻','🤖','⛓️','🎨','🔥','🟩','🏅','💜','⭐','🚀','💡','📱','☁️']
    emojis.forEach((em, i) => {
      const el = document.createElement('div')
      el.className = 'emoji-float'
      el.textContent = em
      el.style.cssText = `left:${5 + i * 7}%;--d:${(7 + Math.random() * 8).toFixed(1)}s;--delay:${(Math.random() * 10).toFixed(1)}s;`
      container.appendChild(el)
    })
  }, [])
  return <div id="emojis" />
}