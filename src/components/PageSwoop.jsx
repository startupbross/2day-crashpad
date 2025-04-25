import { motion, AnimatePresence } from 'framer-motion'

export default function PageSwoop({ show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="swoop-overlay"
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={onComplete}
        />
      )}
    </AnimatePresence>
  )
}
