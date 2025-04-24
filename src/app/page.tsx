'use client';

import HeaderAndFooter from '@/components/layouts/HeaderAndFooter';
import PostsWrapper from '@/components/SanityBlogPosts';
import WeeklyMatch from '@/components/WeeklyMatch';
import H2 from '@/components/ui/h2';
import Link from 'next/link';
import { ArrowDown, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const goToNews = () => {
    const newsSection = document.getElementById('actualites');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <HeaderAndFooter>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Vidéo de fond avec overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"/>
          <video 
            className="h-full w-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            src="/videos/basketball.mp4"
          />
        </div>
        
        {/* Contenu hero */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              Argenteuil Basketball
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Rejoignez le club de basket emblématique de la ville d&apos;Argenteuil. Formation, compétition et passion !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/club/equipes" 
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Users size={20} />
                Nos équipes
              </Link>
              <Link 
                href="/plannings/matchs" 
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Calendar size={20} />
                Calendrier des matchs
              </Link>
            </div>
          </motion.div>
          
          {/* Indicateur de défilement */}
          <motion.div 
            className='absolute bottom-8 left-1/2 -translate-x-1/2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
            onClick={goToNews}
          >
            <ArrowDown className="text-white h-20 w-20" />
          </motion.div>
        </div>
        
        {/* Élément de transition */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-20" />
      </section>
      
      <div className="relative bg-black text-white overflow-hidden">
        <div className='pt-16'>
          <H2 anchor='this-week'>Cette semaine</H2>
          <WeeklyMatch />
          <H2 anchor='news'>Actualités</H2>
          <PostsWrapper />
        </div>
      </div>
    </HeaderAndFooter>
  );
}
