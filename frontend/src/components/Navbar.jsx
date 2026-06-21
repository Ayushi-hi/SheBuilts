import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'
import { Github, Code2 } from 'lucide-react'
import XPWidget from './XPWidget'

export default function Navbar() {
  const [slim, setSlim] = useState(false)
  const { isAuthenticated, user, token, authLoading, openAuthModal, logout, refreshDashboard } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [ghInput, setGhInput] = useState('')
  const [lcInput, setLcInput] = useState('')
  const [ghLoading, setGhLoading] = useState(false)
  const [lcLoading, setLcLoading] = useState(false)
  const [ghError, setGhError] = useState('')
  const [lcError, setLcError] = useState('')
  
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSlim(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleConnectGithub = async (e) => {
    e.preventDefault()
    if (!ghInput.trim()) return
    setGhLoading(true)
    setGhError('')
    try {
      await api.connectGithub(token, ghInput.trim())
      setGhInput('')
      await refreshDashboard()
    } catch (err) {
      setGhError(err.message || 'Error connecting')
    } finally {
      setGhLoading(false)
    }
  }

  const handleConnectLeetcode = async (e) => {
    e.preventDefault()
    if (!lcInput.trim()) return
    setLcLoading(true)
    setLcError('')
    try {
      await api.connectLeetcode(token, lcInput.trim())
      setLcInput('')
      await refreshDashboard()
    } catch (err) {
      setLcError(err.message || 'Error connecting')
    } finally {
      setLcLoading(false)
    }
  }

  return (
    <nav id="nav" className={slim ? 'slim' : ''}>
      <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
        SheBuilds ✨
      </div>
      <ul className="nav-links">
        <li><a href="#tracks"  onClick={(e) => { e.preventDefault(); scrollTo('tracks')  }}>Tracks</a></li>
        <li><a href="#streak"  onClick={(e) => { e.preventDefault(); scrollTo('streak')  }}>Streaks</a></li>
        <li><a href="#github"  onClick={(e) => { e.preventDefault(); scrollTo('github')  }}>GitHub</a></li>
        <li><a href="#stories" onClick={(e) => { e.preventDefault(); scrollTo('stories') }}>Stories</a></li>
      </ul>

      {isAuthenticated && user ? (
        <div className="nav-auth-container" ref={dropdownRef}>

          <div className="nav-streak">
            🔥 {user.streak?.current ?? 0}
          </div>

          <div
            className="nav-avatar"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title={user.name}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>

                  {isDropdownOpen && (
          <div className="nav-dropdown">

            <div className="nav-dropdown-section profile-sec">
              <div className="nav-dropdown-name">{user.name}</div>
              <div className="nav-dropdown-email">{user.email}</div>

              <XPWidget />
            </div>

              <div className="nav-dropdown-section">
                <div className="nav-dropdown-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Github size={16} /> GitHub Integration
                </div>
                {user.github_username ? (
                  <div className="integration-status">
                    <span className="connected-tag gh-connected">✓ @{user.github_username}</span>
                    <span className="integration-stat">
                      Commits: {user.github?.commits_this_month ?? 0}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleConnectGithub} className="nav-connect-row-wrapper">
                    <div className="nav-connect-row">
                      <input
                        type="text"
                        className="nav-connect-input"
                        placeholder="Username"
                        value={ghInput}
                        onChange={(e) => setGhInput(e.target.value)}
                        disabled={ghLoading}
                        required
                      />
                      <button type="submit" className="btn-glow btn-connect-small" disabled={ghLoading}>
                        <span>{ghLoading ? '...' : 'Connect'}</span>
                      </button>
                    </div>
                    {ghError && <div className="auth-error">{ghError}</div>}
                  </form>
                )}
              </div>

              <div className="nav-dropdown-section">
                <div className="nav-dropdown-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code2 size={16} style={{ color: 'var(--yellow)' }} /> LeetCode Integration
                </div>
                {user.leetcode_username ? (
                  <div className="integration-status">
                    <span className="connected-tag lc-connected">✓ @{user.leetcode_username}</span>
                    <div className="lc-stats">
                      <span className="lc-easy">E: {user.leetcode?.easy ?? 0}</span>
                      <span className="lc-medium">M: {user.leetcode?.medium ?? 0}</span>
                      <span className="lc-hard">H: {user.leetcode?.hard ?? 0}</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleConnectLeetcode} className="nav-connect-row-wrapper">
                    <div className="nav-connect-row">
                      <input
                        type="text"
                        className="nav-connect-input"
                        placeholder="Username"
                        value={lcInput}
                        onChange={(e) => setLcInput(e.target.value)}
                        disabled={lcLoading}
                        required
                      />
                      <button type="submit" className="btn-glow btn-connect-small" disabled={lcLoading}>
                        <span>{lcLoading ? '...' : 'Connect'}</span>
                      </button>
                    </div>
                    {lcError && <div className="auth-error">{lcError}</div>}
                  </form>
                )}
              </div>

              <div className="nav-dropdown-section logout-sec">
                <button className="logout-btn" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : isAuthenticated && authLoading ? (
        <button className="btn-nav" disabled>Loading...</button>
      ) : (
        <button className="btn-nav" onClick={openAuthModal}>Start Free 🚀</button>
      )}
    </nav>
  )
}