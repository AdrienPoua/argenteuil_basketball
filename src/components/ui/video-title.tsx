'use client'

import { ReactElement } from 'react'
import { cn } from '@/utils/cn'
import { AppearFromLeft } from '@/components/motion/AppearFromLeft'

type PropsType = {
  children: React.ReactNode
  className?: string
  video?: string
}

export default function VideoTitle({
  children,
  className,
  video = '/videos/basketball.mp4',
}: Readonly<PropsType>): ReactElement {
  return (
    <AppearFromLeft className={cn('mb-20 mt-1', className)}>
      <div className="md:fit relative mx-auto h-full w-full">
        <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline>
          <source src={video} type="video/mp4" />
        </video>
        <div className="size-full flex-col items-center justify-center bg-black text-center text-white mix-blend-multiply">
          <h1
            className={cn(
              'border-2 border-primary px-10',
              'text-4xl font-bold uppercase md:text-6xl lg:text-8xl',
            )}
          >
            {children}
          </h1>
        </div>
      </div>
    </AppearFromLeft>
  )
}
