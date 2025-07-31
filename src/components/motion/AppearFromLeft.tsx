'use client'

import { motion, AnimatePresence, Easing } from 'framer-motion'

export const AppearFromLeft = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const initial = { opacity: 0, x: -300 }
  const animate = { opacity: 1, x: 0 }
  const transition = { duration: 0.5, ease: 'easeOut' as Easing }
  const exit = { opacity: 0, x: 300 }

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={initial}
        whileInView={animate}
        transition={transition}
        exit={exit}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
