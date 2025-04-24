'use client';

import { Suspense } from 'react';
import HeaderAndFooter from '@/components/layouts/HeaderAndFooter';
import PostsWrapper from '@/components/SanityBlogPosts';
import WeeklyMatch from '@/components/WeeklyMatch';
import H2 from '@/components/ui/h2';
import Link from 'next/link';
import { ArrowDown, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

// Using client-side data fetching for all components
export default function HomePage() {
  return (
    <HeaderAndFooter>
      <section className='relative h-screen w-full overflow-hidden'>
        {/* Vidéo de fond avec overlay */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute inset-0 z-10 bg-black/40' />
          <video className='h-full w-full object-cover' autoPlay muted loop playsInline src='/videos/basketball.mp4' />
        </div>

        {/* Contenu hero */}
        <div className='relative z-20 flex h-full flex-col items-center justify-center px-4 text-white'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <h1 className='mb-4 text-5xl font-bold tracking-tight md:text-7xl'>Argenteuil Basketball</h1>
            <p className='mx-auto mb-8 max-w-3xl text-xl opacity-90 md:text-2xl'>
              Rejoignez le club de basket emblématique de la ville d&apos;Argenteuil. Formation, compétition et passion
              !
            </p>

            <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row'>
              <Link
                href='/club/equipes'
                className='flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition-all hover:bg-orange-700'
              >
                <Users size={20} />
                Nos équipes
              </Link>
              <Link
                href='/plannings/matchs'
                className='flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-gray-900 transition-all hover:bg-gray-100'
              >
                <Calendar size={20} />
                Calendrier des matchs
              </Link>
            </div>
          </motion.div>

          {/* Indicateur de défilement */}
          <motion.div
            className='absolute bottom-8 left-1/2 z-50 -translate-x-1/2'
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
          >
            <Link href='#this-week' className='z-50 cursor-pointer bg-red-500'>
              <ArrowDown className='h-20 w-20 text-white' />
            </Link>
          </motion.div>
        </div>

        {/* Élément de transition */}
        <div className='absolute bottom-0 left-0 z-20 h-24 w-full bg-gradient-to-t from-black to-transparent' />
      </section>

      <div className='relative overflow-hidden bg-black text-white'>
        <div className='pt-16'>
          <H2 anchor='this-week'>Cette semaine</H2>
          <WeeklyMatch />
          <H2 anchor='news'>Actualités</H2>
          <Suspense fallback={<div className='py-8 text-center'>Chargement des actualités...</div>}>
            <PostsWrapper />
          </Suspense>
        </div>
      </div>
    </HeaderAndFooter>
  );
}
