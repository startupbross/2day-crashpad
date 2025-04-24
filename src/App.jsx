import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
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
      <div className="typed-line">
        {typed}<span className="cursor" />
      </div>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <div className="nav">
            <Link to="/" className="nav-logo">2DAY</Link>
            <div className="nav-links">
              <Link to="/projects">PROJECTS</Link>
              <Link to="/about">ABOUT</Link>
              <Link to="/contact">CONTACT</Link>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
      )}
    </>
  )
}
