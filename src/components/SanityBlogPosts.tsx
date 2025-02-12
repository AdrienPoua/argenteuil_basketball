
"use client";
import { ReactElement } from "react";
import { SanityDocument } from 'next-sanity';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/integrations/sanity/image';
import { MAX_POSTS_ON_HOME_PAGE } from "@/data/magicNumber";
import { useSanity } from "@/hooks/useSanity";

interface PropsType {
  post: SanityDocument;
  small?: boolean;
}

export default function PostsWrapper() {
    const { leftPostOnHomePage, rightPostOnHomePage, postsOnHomePage } = useSanity();
    return (
      <div className='mb-20'>
        <div className='-mx-4 mb-10 flex flex-wrap gap-6'>
          <div className='w-full md:w-[calc(50%-24px)]'>
            {leftPostOnHomePage && (
              <div className='sticky top-16 h-[1000px] max-h-[80vh]'>
                <SanityCard post={leftPostOnHomePage} />
              </div>
            )}
          </div>
          <div className='w-full md:w-[calc(50%-24px)]'>
            <div className='mb-8 h-[1000px] max-h-[80vh]'>
              {rightPostOnHomePage && <SanityCard post={rightPostOnHomePage} />}
            </div>
            <div className='flex flex-wrap gap-6'>
              {postsOnHomePage?.slice(0, MAX_POSTS_ON_HOME_PAGE).map((post: SanityDocument) => (
                <div key={post._id} className='mb-4 max-h-[50vh] w-full md:h-[700px] md:w-[calc(50%-12px)]'>
                  <SanityCard post={post} small={true} />
                </div>
              ))}
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
      <Link href={`/actualites/${slug.current}`} className='flex size-full'>
        <Card className='group flex grow flex-col overflow-hidden rounded-3xl border-none'>
          <CardContent className={`relative grow overflow-hidden ${small ? 'hidden md:block' : ''} `}>
            <Image
              src={urlFor(postImage).url()}
              alt={title}
              layout='fill'
              className='display-hidden size-full transition-transform duration-300 group-hover:scale-110'
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
