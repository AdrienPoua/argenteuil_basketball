'use client';

import type Match from '@/models/Match';
import Card, { SkeletonCard } from './Card';
import { useMatchs } from '../actions/client.actions';
import { useMatchContext } from '../context';
import NoMatch from './NoMatch';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState, useRef, useEffect, Suspense } from 'react';

type PropsType = { matchs: ReturnType<Match['toPlainObject']>[] };

export default function TeamView({ matchs }: Readonly<PropsType>) {
  const { matchsByChampionnat } = useMatchs({ matchs });
  const { currentMonth } = useMatchContext();
  const monthsNotDisplayed = [5, 6, 7];
  if (monthsNotDisplayed.includes(currentMonth)) return <NoMatch />;

  return (
    <div className='container mx-auto flex flex-col gap-8 px-4'>
      {matchsByChampionnat.map((matchs, index) => {
        if (matchs.length === 0) return null;
        return <ChampionnatMatchs key={matchs[0].championnat} matchs={matchs} />;
      })}
    </div>
  );
}

function ChampionnatMatchs({ matchs }: Readonly<PropsType>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  // Check if content is scrollable on mount and window resize
  useEffect(() => {
    const checkIfScrollable = () => {
      if (!scrollContainerRef.current) return;
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const isScrollable = scrollWidth > clientWidth;
      setScrollable(isScrollable);

      // Also check initial scroll state
      checkScroll();
    };

    // Run on mount
    checkIfScrollable();

    // Add resize listener
    window.addEventListener('resize', checkIfScrollable);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfScrollable);
    };
  }, [matchs]);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // Small buffer
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 300; // Adjust as needed

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='space-y-4'>
      <h3 className='flex w-fit items-center rounded-lg bg-primary p-3 text-white'>{matchs[0].championnat}</h3>

      <div className='relative w-full'>
        {/* Navigation buttons - only shown if content is scrollable */}
        {scrollable && (
          <>
            <div className='absolute -left-10 top-1/2 z-10 hidden -translate-y-1/2 md:-left-20 md:block'>
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`rounded-full bg-primary/10 p-2 text-primary hover:bg-primary/20 ${!canScrollLeft ? 'cursor-not-allowed opacity-50' : ''}`}
                aria-label='Scroll left'
              >
                <ChevronLeftIcon className='h-10 w-10' />
              </button>
            </div>

            <div className='absolute -right-10 top-1/2 z-10 hidden -translate-y-1/2 md:-right-20 md:block'>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`rounded-full bg-primary/10 p-2 text-primary hover:bg-primary/20 ${!canScrollRight ? 'cursor-not-allowed opacity-50' : ''}`}
                aria-label='Scroll right'
              >
                <ChevronRightIcon className='h-10 w-10' />
              </button>
            </div>
          </>
        )}

        {/* Scroll container */}
        <div ref={scrollContainerRef} className='scrollbar-hide flex gap-4 overflow-x-auto pb-6' onScroll={checkScroll}>
          {matchs.map((match) => (
            <Suspense fallback={<SkeletonCard key={`skeleton-${match.id}`} />} key={match.id}>
              <div className='w-[220px] flex-shrink-0 overflow-hidden rounded-lg sm:w-[260px] md:w-[280px] lg:w-[300px]'>
                <Card match={match} />
              </div>
            </Suspense>
          ))}
        </div>

        {/* Visual scroll indicator for mobile - only shown if content is scrollable */}
        {scrollable && (
          <div className='mt-2 flex justify-center space-x-1 md:hidden'>
            <div className='h-1 w-10 rounded-full bg-primary/30'></div>
          </div>
        )}
      </div>
    </div>
  );
}
