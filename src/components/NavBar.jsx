import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down → shrink
        setIsShrunk(true);
      } else {
        // Scrolling up → expand back
        setIsShrunk(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      className={`navbar ${isShrunk ? 'navbar-shrink' : ''}`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-left">
        <Link to="/" className="nav-logo">2DAY</Link>
      </div>

      <div className="nav-center">
        <span className="based-in">
          <span className="dot-pulse" /> Based in Toronto
        </span>
      </div>

      <div className="nav-right">
        <div className="nav-desktop-links">
          <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>About</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>Contact</Link>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? 'line open' : 'line'} />
          <span className={isOpen ? 'line open' : 'line'} />
          <span className={isOpen ? 'line open' : 'line'} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Link to="/about" onClick={() => setIsOpen(false)} className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
