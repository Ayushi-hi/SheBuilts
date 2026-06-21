import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const ring = document.getElementById('cur-ring')

    const onMove = (e) => {
      cur.style.left = e.clientX + 'px'
      cur.style.top  = e.clientY + 'px'
      setTimeout(() => {
        ring.style.left = e.clientX + 'px'
        ring.style.top  = e.clientY + 'px'
      }, 70)
    }

    const onEnter = () => {
      cur.style.width = '22px'; cur.style.height = '22px'
      cur.style.background = 'var(--purple)'
      ring.style.width = '54px'; ring.style.height = '54px'
      ring.style.borderColor = 'var(--purple)'; ring.style.opacity = '0.8'
    }

    const onLeave = () => {
      cur.style.width = '12px'; cur.style.height = '12px'
      cur.style.background = 'var(--pink)'
      ring.style.width = '38px'; ring.style.height = '38px'
      ring.style.borderColor = 'var(--pink)'; ring.style.opacity = '0.5'
    }

    document.addEventListener('mousemove', onMove)
    const targets = document.querySelectorAll('button,a,.track-card,.test-card,.why-card,.ls-ring')
    targets.forEach((el) => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      targets.forEach((el) => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  return (
    <>
      <div id="cur" />
      <div id="cur-ring" />
    </>
  )
}