'use client';
import HeaderAndFooter from '@/components/layouts/HeaderAndFooter';
import PostsWrapper from '@/components/SanityBlogPosts';
import VideoTitle from '@/components/ui/video-title';
import DisapearOnScroll from '@/components/motion/DisapearOnScroll';

export default function HomePage() {
  return (
    <HeaderAndFooter>
      <DisapearOnScroll className='flex h-screen items-center justify-center'>
        <VideoTitle type='h1' video='/videos/basketball.mp4'>
          Argenteuil Basketball
        </VideoTitle>
      </DisapearOnScroll>
      <div className='relative'>
        <VideoTitle type='h2' video='/videos/news.mp4'>
          Informations
        </VideoTitle>
        <PostsWrapper />
      </div>
    </HeaderAndFooter>
  );
}
