import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <div className="nav">
        <div className="nav-logo">2DAY</div>
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
  )
}
