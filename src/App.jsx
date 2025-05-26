import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NavBar from './components/NavBar'
import PageSwoop from './components/PageSwoop'
import './App.css'

function Preloader({ onDone }) {
  const fullText = 'A private strategy-led design studio crafting bold brand identities.'
  const [typed, setTyped] = useState('')
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTyped(prev => prev + fullText[index])
        setIndex(prev => prev + 1)
      }, 45)
      return () => clearTimeout(timeout)
    } else {
      const delay = setTimeout(() => {
        setDone(true)
        setTimeout(onDone, 600)
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [index, fullText, onDone])

  return (
    <div className={`preloader ${done ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="typed-line">
          {typed}<span className="cursor" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const swoopPlayed = useRef(false)

  const [showPreloader, setShowPreloader] = useState(isHome && !swoopPlayed.current)
  const [showSwoop, setShowSwoop] = useState(false)
  const [showContent, setShowContent] = useState(!isHome)

  const handlePreloaderDone = () => {
    setShowPreloader(false)
    setShowSwoop(true)
  }

  const handleSwoopComplete = () => {
    setShowSwoop(false)
    setShowContent(true)
    swoopPlayed.current = true
  }

  return (
    <>
      {showPreloader && <Preloader onDone={handlePreloaderDone} />}
      {showSwoop && <PageSwoop show={showSwoop} onComplete={handleSwoopComplete} />}

      {showContent && (
        <div className="page-wrapper">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      )}
    </>
  )
}
