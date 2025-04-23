import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'

function Preloader({ onDone }) {
  const [numbers, setNumbers] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let flashes = 10
    let count = 0

    const interval = setInterval(() => {
      const newNum = Math.floor(Math.random() * 100)
      setNumbers(prev => [...prev, newNum])
      count++

      if (count >= flashes) {
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 1000) // allow fade-out to finish
        }, 500)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`preloader ${done ? 'fade-out' : ''}`}>
      {numbers.map((num, idx) => (
        <span key={idx} style={{ animationDelay: `${idx * 0.05}s` }}>
          {num}
        </span>
      ))}
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
