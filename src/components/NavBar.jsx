import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DateTime } from 'luxon'
import { motion, AnimatePresence } from 'framer-motion'
import './NavBar.css'

const timezones = [
  { label: 'LA', zone: 'America/Los_Angeles' },
  { label: 'TOR', zone: 'America/Toronto' },
  { label: 'LON', zone: 'Europe/London' }
]

export default function NavBar() {
  const [times, setTimes] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const location = useLocation()

  const navLinks = ['projects', 'about', 'contact']

  useEffect(() => {
    const updateTime = () => {
      const now = DateTime.now()
      const updated = {}
      timezones.forEach(tz => {
        updated[tz.label] = now.setZone(tz.zone).toFormat('h:mm:ss a')
      })
      setTimes(updated)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <motion.nav
      className={`navbar ${theme}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="nav-grid">
        {/* Left */}
        <div className="nav-left">
          <Link to="/" className="nav-logo">2DAY</Link>
        </div>

        {/* Center */}
        <div className="nav-center">
          {timezones.map(({ label }) => (
            <div
              key={label}
              className={`nav-clock ${label === 'TOR' ? 'highlight' : ''}`}
              title={label === 'TOR' ? '2DAY HQ' : ''}
            >
              {label} {times[label]}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="nav-right">
          <div className="theme-toggle-wrapper">
            <div className="theme-toggle-track" onClick={toggleTheme}>
              <motion.div
                className="theme-toggle-thumb"
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ left: theme === 'light' ? '20px' : '2px' }}
              />
            </div>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          </div>

          <div className="nav-links-desktop">
            {navLinks.map(link => (
              <Link
                key={link}
                to={`/${link}`}
                className={location.pathname.includes(link) ? 'active' : ''}
              >
                {link.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(link => (
              <Link
                key={link}
                to={`/${link}`}
                className={location.pathname.includes(link) ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.toUpperCase()}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
