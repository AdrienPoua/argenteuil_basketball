'use client';

import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Users, Home, Plane, LayoutGrid } from 'lucide-react';
import { cn } from '@/utils/cn';
import MatchProvider, { useMatchContext } from './context';
import { motion } from 'framer-motion';
import type React from 'react'; // Added import for React

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MatchProvider>
      <LayoutContent>{children}</LayoutContent>
    </MatchProvider>
  );
}

function LayoutContent({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setCurrentMonth, setCurrentFilter, setCurrentView, currentMonth, currentFilter, currentView } =
    useMatchContext();
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  return (
    <div className='relative min-h-screen bg-background'>
      {children}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed bottom-12 left-0 right-0 mx-auto',
          'flex flex-col items-center justify-center gap-4',
          'w-fit max-w-md rounded-2xl bg-primary/90 shadow-lg backdrop-blur-sm',
          'px-6 py-4 text-primary-foreground',
        )}
      >
        <div className='space-y-1 text-center'>
          <h2 className='text-2xl font-bold'>{months[currentMonth]}</h2>
          <p className='text-sm uppercase tracking-wide'>
            {currentFilter} - {'par ' + currentView}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full text-primary-foreground hover:bg-primary-foreground/20'
            onClick={() => setCurrentMonth((prev) => (prev <= 0 ? 11 : prev - 1))}
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full text-primary-foreground hover:bg-primary-foreground/20'
            onClick={() => setCurrentMonth((prev) => (prev >= 11 ? 0 : prev + 1))}
          >
            <ChevronRight className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'rounded-full text-primary-foreground hover:bg-primary-foreground/20',
              currentFilter === 'tous' && 'bg-primary-foreground/20',
            )}
            onClick={() => setCurrentFilter('tous')}
          >
            <LayoutGrid className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'rounded-full text-primary-foreground hover:bg-primary-foreground/20',
              currentFilter === 'domicile' && 'bg-primary-foreground/20',
            )}
            onClick={() => setCurrentFilter('domicile')}
          >
            <Home className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'rounded-full text-primary-foreground hover:bg-primary-foreground/20',
              currentFilter === 'extérieur' && 'bg-primary-foreground/20',
            )}
            onClick={() => setCurrentFilter('extérieur')}
          >
            <Plane className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'rounded-full text-primary-foreground hover:bg-primary-foreground/20',
              currentView === 'date' && 'bg-primary-foreground/20',
            )}
            onClick={() => setCurrentView('date')}
          >
            <Calendar className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'rounded-full text-primary-foreground hover:bg-primary-foreground/20',
              currentView === 'équipe' && 'bg-primary-foreground/20',
            )}
            onClick={() => setCurrentView('équipe')}
          >
            <Users className='h-5 w-5' />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
