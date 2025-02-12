import Image from 'next/image';
import HeaderAndFooter from '@/components/layouts/HeaderAndFooter';
import PostsWrapper from '@/components/SanityBlogPosts';

export default function HomePage() {
  return (
    <HeaderAndFooter>
        <HeroSection />
        <div className='mx-auto max-w-[80%]'>
          <h2 className='mb-8 text-5xl text-white'>Actualités </h2>
          <PostsWrapper />
        </div>
    </HeaderAndFooter>
  );
}

const HeroSection = () => {
  return (
    <main className='-mt-16 flex grow flex-col'>
      <div className='relative h-svh'>
        <div className='marker: absolute inset-x-0 bottom-0 h-96 w-full bg-gradient-to-t from-black from-20%'></div>
        <Image
          src={'/images/background.jpg'}
          alt='background'
          className='size-full object-cover'
          width={1920}
          height={1080}
        />
      </div>
    </main>
  );
};


