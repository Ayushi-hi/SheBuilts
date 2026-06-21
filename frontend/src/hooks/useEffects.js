import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal,.reveal-pop').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export function useRipple() {
  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.currentTarget
      const rect = btn.getBoundingClientRect()
      const sz = Math.max(rect.width, rect.height)
      const el = document.createElement('span')
      el.className = 'ripple-el'
      el.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX - rect.left - sz / 2}px;top:${e.clientY - rect.top - sz / 2}px;`
      btn.appendChild(el)
      setTimeout(() => el.remove(), 650)
    }
    const buttons = document.querySelectorAll('button')
    buttons.forEach((btn) => {
      btn.style.position = 'relative'
      btn.style.overflow = 'hidden'
      btn.addEventListener('click', handleClick)
    })
    return () => buttons.forEach((btn) => btn.removeEventListener('click', handleClick))
  }, [])
}