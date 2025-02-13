'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function ScaleFromBottom({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  const initial = { opacity: 0, scale: 0.5 };
  const animate = { opacity: 1, scale: 1 };
  const transition = { duration: 0.5, ease: 'easeOut' };
  const exit = { opacity: 0, scale: 0.5, y: -500 };

  return (
    <AnimatePresence>
      <motion.div className={className} initial={initial} whileInView={animate} transition={transition} exit={exit}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
