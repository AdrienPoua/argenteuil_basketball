'use client';
import { ReactElement, useEffect, useState } from 'react';
import { SanityDocument } from 'next-sanity';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/integrations/sanity/image';
import { MAX_POSTS_ON_HOME_PAGE } from '@/data/magicNumber';
import { Skeleton } from '@/components/ui/skeleton';
import ScaleFromBottom from '@/components/motion/ScaleFromBottom';
import { cn } from '@/lib/utils/cn';

interface PropsType {
  post: SanityDocument;
  small?: boolean;
}

export default function PostsWrapper() {
  const [leftPostOnHomePage, setLeftPostOnHomePage] = useState<SanityDocument | null>(null);
  const [rightPostOnHomePage, setRightPostOnHomePage] = useState<SanityDocument | null>(null);
  const [postsOnHomePage, setPostsOnHomePage] = useState<SanityDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSanityData() {
      try {
        const [leftResponse, rightResponse, postsResponse] = await Promise.all([
          fetch('/api/sanity/left-post'),
          fetch('/api/sanity/right-post'),
          fetch('/api/sanity/home-posts'),
        ]);

        if (!leftResponse.ok || !rightResponse.ok || !postsResponse.ok) {
          throw new Error('Failed to fetch Sanity data');
        }

        const leftData = await leftResponse.json();
        const rightData = await rightResponse.json();
        const postsData = await postsResponse.json();

        setLeftPostOnHomePage(leftData);
        setRightPostOnHomePage(rightData);
        setPostsOnHomePage(postsData);
      } catch (error) {
        console.error('Error fetching Sanity data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSanityData();
  }, []);

  if (isLoading) {
    return (
      <div className='container mx-auto mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:px-24'>
        <div className='top-32 aspect-[9/10] w-full md:sticky'>
          <SkeletonCard />
        </div>
        <div>
          <div className='mb-8 aspect-[9/10]'>
            <SkeletonCard />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:px-24'>
      <div className='top-32 aspect-[9/10] w-full md:sticky'>
        {leftPostOnHomePage ? <SanityCard post={leftPostOnHomePage} /> : <SkeletonCard />}
      </div>
      <div>
        <div className='mb-8 aspect-[9/10]'>
          {rightPostOnHomePage ? <SanityCard post={rightPostOnHomePage} /> : <SkeletonCard />}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
          {postsOnHomePage ? (
            postsOnHomePage.slice(0, MAX_POSTS_ON_HOME_PAGE).map((post: SanityDocument, index: number) => (
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
            className='h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110'
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
