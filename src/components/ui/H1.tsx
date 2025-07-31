'use client';
import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function Index({ children, className }: Readonly<PropsType>): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='relative flex h-96 flex-col items-center justify-center overflow-hidden'
    >
      <div className='relative h-full w-full'>
        <video className='absolute inset-0 size-full object-cover' autoPlay muted loop playsInline>
          <source src='/videos/basketball.mp4' type='video/mp4' />
        </video>
        <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black text-white mix-blend-multiply'>
          <h1 className={cn('border-2 border-white px-10 text-9xl font-bold uppercase', className)}>{children}</h1>
        </div>
      </div>
    </motion.div>
  );
}
