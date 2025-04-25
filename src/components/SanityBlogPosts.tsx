'use client';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { SanityDocument } from 'next-sanity';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/integrations/sanity/image';
import { MAX_POSTS_ON_HOME_PAGE } from '@/data/magicNumber';
import { useSanity } from '@/hooks/useSanity';
import { Skeleton } from '@/components/ui/skeleton';
import ScaleFromBottom from '@/components/motion/ScaleFromBottom';
import { cn } from '@/lib/utils/cn';
interface PropsType {
  post: SanityDocument;
  small?: boolean;
}

export default function PostsWrapper() {
  const { leftPostOnHomePage, rightPostOnHomePage, postsOnHomePage } = useSanity();

  // Références pour notre effet sticky manuel
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  // Effet pour calculer la hauteur du contenu de la colonne droite
  useEffect(() => {
    const updateHeight = () => {
      if (rightColumnRef.current) {
        setContainerHeight(rightColumnRef.current.offsetHeight);
      }
    };

    updateHeight();

    // Observer les changements de taille pour mettre à jour la hauteur du conteneur
    const resizeObserver = new ResizeObserver(updateHeight);
    if (rightColumnRef.current) {
      resizeObserver.observe(rightColumnRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [postsOnHomePage, rightPostOnHomePage]);

  // Effet pour gérer le sticky
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !containerRef.current) return;

      const containerTop = containerRef.current.getBoundingClientRect().top;
      // Simple toggle basé sur la position du conteneur
      setIsSticky(containerTop <= 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialisation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='container mx-auto mb-20 md:px-24'>
      <div className='flex flex-col gap-6 md:flex-row'>
        {/* Colonne gauche avec effet sticky */}
        <div
          className='md:w-1/2'
          ref={containerRef}
          style={{
            minHeight: isSticky && containerHeight ? `${containerHeight}px` : 'auto',
          }}
        >
          <div
            ref={stickyRef}
            className='aspect-[9/10] w-full'
            style={{
              position: isSticky ? 'fixed' : 'relative',
              top: isSticky ? '50px' : 'auto',
              width: isSticky ? containerRef.current?.offsetWidth + 'px' : '100%',
            }}
          >
            {leftPostOnHomePage ? <SanityCard post={leftPostOnHomePage} /> : <SkeletonCard />}
          </div>
        </div>

        {/* Colonne droite avec contenu défilant */}
        <div className='space-y-6 md:w-1/2' ref={rightColumnRef}>
          <div className='aspect-[9/10] w-full'>
            {rightPostOnHomePage ? <SanityCard post={rightPostOnHomePage} /> : <SkeletonCard />}
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {postsOnHomePage ? (
              postsOnHomePage.slice(0, MAX_POSTS_ON_HOME_PAGE).map((post: SanityDocument) => (
                <ScaleFromBottom key={post._id} className='mb-4 max-h-[30rem]'>
                  <SanityCard post={post} small />
                </ScaleFromBottom>
              ))
            ) : (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SanityCard({ post, small }: Readonly<PropsType>): ReactElement {
  const { Image: postImage, title, publishedAt: date, slug } = post;
  const formatedDate = new Date(date).toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/actualites/${slug.current}`} className='group flex size-full'>
      <Card
        className={cn(
          'flex size-full grow flex-col overflow-hidden rounded-3xl border-none',
          'group:hover:border-2 group:hover:border-primary',
        )}
      >
        <CardContent className={`relative h-full grow overflow-hidden p-0 ${small ? 'hidden md:block' : ''} `}>
          <Image
            src={urlFor(postImage).url()}
            alt={title}
            width={1000}
            height={1000}
            objectFit='cover'
            className='h-full transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110'
          />
          <div className='absolute inset-0 bg-black bg-opacity-50' />
        </CardContent>
        <CardFooter className='mt-3 flex flex-col items-start'>
          <h2 className='text-xl text-black'>{title}</h2>
          <p className='text-background'>{formatedDate}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

function SkeletonCard(): ReactElement {
  return (
    <div className='flex size-full'>
      <div className='group flex grow flex-col overflow-hidden rounded-3xl border-none'>
        <div className='relative grow overflow-hidden'>
          <Skeleton className='absolute inset-0' />
        </div>
        <div className='mt-3 flex flex-col items-start gap-2'>
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-4 w-1/4' />
        </div>
      </div>
    </div>
  );
}
