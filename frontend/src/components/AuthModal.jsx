import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  AtSign,
  Eye,
  EyeOff,
  Github,
  Lock,
  Mail,
  Sparkles,
  User,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthModalOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeAuthModal()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isAuthModalOpen, closeAuthModal])

  if (!isAuthModalOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let res
      if (activeTab === 'login') {
        res = await login(email, password)
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        if (!termsAccepted) {
          setError('Please agree to the Terms of Service and Privacy Policy')
          setLoading(false)
          return
        }

        res = await register(name, email, password)
      }

      if (res.success) {
        // Reset states
        setName('')
        setEmail('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setTermsAccepted(false)
        setError('')
      } else {
        setError(res.error || 'Something went wrong')
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setError('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className={`auth-modal ${activeTab === 'signup' ? 'auth-modal-signup' : 'auth-modal-login'}`} onClick={(e) => e.stopPropagation()}>
        <span className="auth-float auth-float-one">⭐</span>
        <span className="auth-float auth-float-two">🪐</span>
        <span className="auth-float auth-float-three">🚀</span>

        <div className="auth-topbar">
          {activeTab === 'signup' ? (
            <button className="auth-icon-btn" onClick={() => switchTab('login')} aria-label="Back to login">
              <ArrowLeft size={20} />
            </button>
          ) : (
            <span />
          )}

          <div className="auth-brand">
            SheBuilds <Sparkles size={17} aria-hidden="true" />
          </div>

          <span aria-hidden="true" />
        </div>

        <div className="auth-heading">
          {activeTab === 'signup' && <div className="auth-pill">Join our community 🚀</div>}
          {activeTab === 'login' && <div className="auth-pill">Welcome back! 👋</div>}
          <h2>
            {activeTab === 'login' ? (
              <>
                Log in to <br /> continue your <span>journey</span>
              </>
            ) : (
              <>
                Create your <br /> <span>SheBuilds</span> account
              </>
            )}
          </h2>
          <p>
            {activeTab === 'login'
              ? "Let's pick up where you left off."
              : 'Start your coding journey with thousands of women worldwide.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {activeTab === 'signup' && (
            <label className="auth-field" htmlFor="auth-name">
              <User size={20} />
              <input
                id="auth-name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}

          <label className="auth-field" htmlFor="auth-email">
            {activeTab === 'login' ? <User size={20} /> : <Mail size={20} />}
            <input
              id="auth-email"
              type={activeTab === 'login' ? 'text' : 'email'}
              placeholder={activeTab === 'login' ? 'Email or Username' : 'Email Address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {activeTab === 'signup' && (
            <label className="auth-field" htmlFor="auth-username">
              <AtSign size={20} />
              <input
                id="auth-username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          )}

          <label className="auth-field" htmlFor="auth-password">
            <Lock size={20} />
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="auth-eye-btn"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </label>

          {activeTab === 'signup' && (
            <label className="auth-field" htmlFor="auth-confirm-password">
              <Lock size={20} />
              <input
                id="auth-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowConfirmPassword((value) => !value)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </label>
          )}

          {activeTab === 'login' ? (
            <button type="button" className="auth-link auth-forgot">
              Forgot password?
            </button>
          ) : (
            <label className="auth-terms">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                I agree to the <button type="button">Terms of Service</button> and{' '}
                <button type="button">Privacy Policy</button>
              </span>
            </label>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-glow auth-submit-btn" disabled={loading}>
            <span>
              {loading ? 'Processing...' : (activeTab === 'login' ? 'Log in →' : 'Create account ✨')}
            </span>
          </button>

          <div className="auth-divider">
            <span />
            <p>{activeTab === 'login' ? 'or continue with' : 'or sign up with'}</p>
            <span />
          </div>

          <div className="auth-socials">
            <button type="button" className="auth-social-btn">
              <Github size={22} />
              Continue with GitHub
            </button>
            <button type="button" className="auth-social-btn">
              <span className="auth-google">G</span>
              Continue with Google
            </button>
          </div>

          <p className="auth-switch-copy">
            {activeTab === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              className="auth-link"
              onClick={() => switchTab(activeTab === 'login' ? 'signup' : 'login')}
            >
              {activeTab === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
