import { useState } from 'react'
import Cursor from './components/Cursor'
import { Aurora, Stars, FloatingEmojis } from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import Tracks from './components/Tracks'
import StreakSection from './components/StreakSection'
import GithubSection from './components/GithubSection'
import { Testimonials, WhySection, CTA, Footer } from './components/Sections'
import { useReveal, useRipple } from './hooks/useEffects'
import AuthModal from './components/AuthModal'
import VideoPlayerModal from './components/VideoPlayerModal'
import Dashboard from './components/Dashboard'
import { useAuth } from './context/AuthContext'

export default function App() {
  useReveal()
  useRipple()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { isAuthenticated, user, authLoading } = useAuth()

  if (isAuthenticated && user) {
    return (
      <>
        <Aurora />
        <Stars />
        <FloatingEmojis />
        <Cursor />
        <Dashboard />
        <AuthModal />
      </>
    )
  }

  return (
    <>
      <Aurora />
      <Stars />
      <FloatingEmojis />
      <Cursor />
      <Navbar />
      {isAuthenticated && authLoading ? (
        <div className="app-loading-screen">Loading your dashboard...</div>
      ) : (
        <>
          <Hero />
          <Marquee />
          <HowItWorks />
          <Tracks onSelectCourse={setSelectedCourse} />
          <StreakSection />
          <GithubSection />
          <Testimonials />
          <WhySection />
          <CTA />
          <Footer />
        </>
      )}
      <AuthModal />
      {selectedCourse && (
        <VideoPlayerModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  )
}
