import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './NavBar.css'

export default function NavBar() {
  const location = useLocation()

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
        <Link
          to="/projects"
          className={location.pathname === '/projects' ? 'nav-link active' : 'nav-link'}
        >
          Projects
        </Link>
        <Link
          to="/about"
          className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
        >
          Contact
        </Link>
      </div>

      <div className="nav-right">
      <span className="based-in">
        <span className="dot-pulse" /> Based in Toronto
      </span>


      </div>
    </motion.div>
  )
}
