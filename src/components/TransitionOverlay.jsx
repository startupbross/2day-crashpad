import { motion, AnimatePresence } from 'framer-motion'

export default function TransitionOverlay({ show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="transition-overlay"
          initial={{ scaleX: 0.02, scaleY: 0.02, opacity: 1 }}
          animate={{ scaleX: 1.05, scaleY: 1.05, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          onAnimationComplete={onComplete}
        />
      )}
    </AnimatePresence>
  )
}
