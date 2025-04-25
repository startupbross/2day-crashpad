import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DateTime } from 'luxon'
import { motion } from 'framer-motion'
import './NavBar.css'

export default function NavBar() {
  const [times, setTimes] = useState({ LA: '', TOR: '', LON: '' })
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const location = useLocation()
  const isMobile = window.innerWidth < 768

  useEffect(() => {
    const updateTimes = () => {
      const now = DateTime.now()
      setTimes({
        LA: now.setZone('America/Los_Angeles').toFormat('h:mm:ss a'),
        TOR: now.setZone('America/Toronto').toFormat('h:mm:ss a'),
        LON: now.setZone('Europe/London').toFormat('h:mm:ss a'),
      })
    }
    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  const formatTime = (t) => {
    const [time, ampm] = t.split(' ')
    return (
      <>
        {time}
        <span className="ampm"> {ampm}</span>
      </>
    )
  }

  return (
    <motion.div
      className="navbar"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-left">
        <Link to="/" className="nav-logo">2DAY</Link>
      </div>

      <div className="nav-center">
        {!isMobile ? (
          <>
            <motion.div
              className="clock"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.4 }}
            >
              LA {formatTime(times.LA)}
            </motion.div>
            <motion.div
              className="clock toronto"
              title="2DAY HQ"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.4 }}
            >
              TOR {formatTime(times.TOR)}
            </motion.div>
            <motion.div
              className="clock"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.4 }}
            >
              LON {formatTime(times.LON)}
            </motion.div>
          </>
        ) : (
          <div className="clock toronto" title="2DAY HQ">
            TOR {formatTime(times.TOR)}
          </div>
        )}
      </div>

      <div className="nav-right">
        <div className="nav-links">
          <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>PROJECTS</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ABOUT</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>CONTACT</Link>
        </div>

        <div className="theme-toggle" onClick={toggleTheme}>
          <div className={`toggle-thumb ${theme === 'light' ? 'light' : 'dark'}`}>
            {theme === 'light' ? '☀' : '🌙'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
