import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PageSwoop({ show, onComplete }) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!visible) return null

  return (
    <motion.div
      className="swoop-overlay"
      initial={{ x: '100%' }}
      animate={{ x: '-100%' }}
      transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
    />
  )
}
