'use client'
import { cn } from '@/utils/cn'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function DisapearOnScroll({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <motion.div className={cn('relative', className)} style={{ y, opacity }}>
      {children}
    </motion.div>
  )
}
