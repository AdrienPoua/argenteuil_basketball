'use client';

import Header from '@/components/parts/header';
import Footer from '@/components/parts/footer';
import PostsWrapper from '@/components/SanityBlogPosts';
import WeeklyMatch from '@/components/parts/hero/match-of-the-week';
import H2 from '@/components/ui/h2';
import Link from 'next/link';
import { Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';
// Using client-side data fetching for all components
export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='min-h-screen lg:pt-44 bg-black'>
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
                className='flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-white transition-all hover:bg-orange-700'
              >
                <Users size={20} />
                Nos équipes
              </Link>
              <Link
                href='/plannings/matchs'
                className='flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-gray-900 transition-all hover:bg-gray-100'
              >
                <Calendar size={20} />
                Calendrier des matchs
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Élément de transition */}
        <div className='absolute bottom-0 left-0 z-20 h-24 w-full bg-gradient-to-t from-black to-transparent' />
      </section>

      <div className='relative'>
        <div className='pt-16'>
          <H2>Cette semaine</H2>
          <WeeklyMatch />
          <H2>Actualités</H2>
          <PostsWrapper />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
