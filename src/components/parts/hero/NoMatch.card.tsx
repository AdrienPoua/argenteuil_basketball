'use client'

import { motion } from 'framer-motion'
import { IconBallBasketball, IconCalendarOff, IconHomeHeart } from '@tabler/icons-react'

export const NoMatch = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-10 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 text-center shadow-lg backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
        className="mb-6 flex justify-center"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="rounded-full bg-primary/10 p-4"
          >
            <IconBallBasketball size={64} className="text-primary" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="absolute -right-2 -top-2 rounded-full bg-muted p-2"
          >
            <IconCalendarOff size={24} className="text-muted-foreground" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
          Aucun match cette semaine
        </h3>
        <p className="text-lg text-muted-foreground">
          Profitez-en pour vous reposer et vous entraîner ! 🏀
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-sm text-primary"
        >
          <IconHomeHeart size={20} />
          <span>Restez connectés pour les prochains matchs</span>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute left-4 top-4 h-8 w-8 rounded-full bg-primary/5"></div>
      <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-primary/5"></div>
      <div className="absolute right-12 top-8 h-4 w-4 rounded-full bg-primary/10"></div>
    </motion.div>
  )
}
