'use client';
import { SanityDocument } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { components } from './PortableText';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { estimateReadingTime } from '@/lib/utils/estimateReadingTime';

interface PostContentProps {
  data: SanityDocument;
}

export function PostContent({ data }: Readonly<PostContentProps>) {
  const readingTime = estimateReadingTime(data.body);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('flex flex-col items-center', 'container mx-auto px-4 md:px-0')}
    >
      <section className='relative mb-12 w-full'>
        <Button
          asChild
          className='hover:text-primary-dark absolute left-0 top-0 text-primary transition-colors duration-200'
          variant='ghost'
        >
          <Link href='/'>
            <ArrowLeft className='mr-2 h-5 w-5' />
            Retour
          </Link>
        </Button>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='mb-4 mt-16 text-center text-4xl font-bold text-background md:text-5xl'
        >
          {data.title}
        </motion.h1>
        <div className='flex items-center justify-center space-x-4 text-muted-foreground'>
          <time className='flex items-center' dateTime={data.publishedAt}>
            <Calendar className='mr-2 h-4 w-4' />
            {new Date(data.publishedAt).toLocaleDateString()}
          </time>
          <span className='flex items-center'>
            <Clock className='mr-2 h-4 w-4' />
            {readingTime} min de lecture
          </span>
        </div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={cn(
          'prose prose-lg md:prose-xl dark:prose-invert',
          'w-full max-w-none md:w-4/5 lg:w-3/4',
          'rounded-lg bg-card p-6 text-card-foreground shadow-lg md:p-10',
        )}
      >
        <PortableText value={data.body} components={components} />
      </motion.div>
    </motion.article>
  );
}
