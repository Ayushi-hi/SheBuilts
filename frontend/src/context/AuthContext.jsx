import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)
const TOKEN_STORAGE_KEY = 'shebuilds_token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  const isAuthenticated = !!token

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), [])
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), [])

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const normalizeError = useCallback((error, fallback) => {
    if (!error) return fallback
    if (error.status === 401) return 'Your session expired. Please log in again.'
    return error.message || fallback
  }, [])

  const refreshDashboard = useCallback(async (tkn) => {
    const t = tkn || token
    if (!t) return
    setAuthLoading(true)
    try {
      const [data, me] = await Promise.all([
        api.getDashboard(t),
        api.getMe(t),
      ])

      if (!data?.user || !me?.name) {
        throw new Error('Unable to load your account data')
      }

      setUser({
        name: data.user.name,
        email: data.user.email,
        avatar_url: data.user.avatar_url,
        github_username: me.github_username || null,
        leetcode_username: me.leetcode_username || null,
        streak: data.streak || { current: 0, longest: 0, freeze_count: 0, total_xp: 0 },
        github: data.github || { commits_this_month: 0, repos: [] },
        leetcode: data.leetcode || { solved_total: 0, easy: 0, medium: 0, hard: 0 },
        badges: data.badges || [],
        leaderboard_rank: data.leaderboard_rank || 0,
        enrolled_courses: data.enrolled_courses || [],
      })
      return true
    } catch (error) {
      console.error('refreshDashboard error:', error)
      if (error.status === 401) {
        clearSession()
      }
      throw error
    } finally {
      setAuthLoading(false)
    }
  }, [token, clearSession])

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!storedToken) {
      setAuthLoading(false)
      return
    }

    setToken(storedToken)
    refreshDashboard(storedToken).catch(() => {})
  }, [refreshDashboard])

  const login = useCallback(async (email, password) => {
    try {
      const data = await api.login({ email, password })
      if (!data.access_token) {
        return { success: false, error: 'Login failed' }
      }

      const tkn = data.access_token
      setToken(tkn)
      localStorage.setItem(TOKEN_STORAGE_KEY, tkn)
      await refreshDashboard(tkn)
      closeAuthModal()
      return { success: true }
    } catch (error) {
      clearSession()
      return { success: false, error: normalizeError(error, 'Login failed') }
    }
  }, [refreshDashboard, closeAuthModal, clearSession, normalizeError])

  const register = useCallback(async (name, email, password) => {
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' }
    }

    try {
      await api.register({ name, email, password })
      return await login(email, password)
    } catch (error) {
      return { success: false, error: normalizeError(error, 'Registration failed') }
    }
  }, [login, normalizeError])

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAuthenticated,
      authLoading,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      login,
      register,
      logout,
      refreshDashboard: () => refreshDashboard(token),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
