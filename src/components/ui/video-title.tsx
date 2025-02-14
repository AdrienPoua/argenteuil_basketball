'use client';

import { ReactElement } from 'react';
import { cn } from '@/lib/utils/cn';
import { AppearFromLeft } from '@/components/motion/AppearFromLeft';

type PropsType = {
  children: React.ReactNode;
  className?: string;
  type: 'h1' | 'h2' | 'hero';
  video?: string;
};

export default function VideoTitle({
  children,
  className,
  type = 'h2',
  video = '/videos/basketball.mp4',
}: Readonly<PropsType>): ReactElement {
  return (
    <AppearFromLeft className={cn('mb-20 mt-1', className)}>
      <div className='relative mx-auto h-full w-full md:w-fit'>
        <video className='absolute inset-0 size-full object-cover' autoPlay muted loop playsInline>
          <source src={video} type='video/mp4' />
        </video>
        <div className='size-full flex-col items-center justify-center bg-black text-center text-white mix-blend-multiply'>
          {type === 'h1' && (
            <h1 className={cn('border-2 border-primary px-10', 'text-4xl font-bold uppercase md:text-6xl lg:text-8xl')}>
              {children}
            </h1>
          )}
          {type === 'h2' && (
            <h2
              className={cn(
                'w-full border-2 border-primary px-10 font-bold uppercase',
                'text-5xl md:text-6xl lg:text-8xl',
              )}
            >
              {children}
            </h2>
          )}
        </div>
      </div>
    </AppearFromLeft>
  );
}
