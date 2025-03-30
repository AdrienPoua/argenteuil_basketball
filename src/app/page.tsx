import HeaderAndFooter from '@/components/layouts/HeaderAndFooter';
import PostsWrapper from '@/components/SanityBlogPosts';
import VideoTitle from '@/components/ui/video-title';
import DisapearOnScroll from '@/components/motion/DisapearOnScroll';
import WeeklyMatch from '@/components/WeeklyMatch';
import H2 from '@/components/ui/h2';
export default function HomePage() {
  return (
    <HeaderAndFooter>
      <DisapearOnScroll className='flex h-screen items-center justify-center'>
        <VideoTitle video='/videos/basketball.mp4'>Argenteuil Basketball</VideoTitle>
      </DisapearOnScroll>
      <div className='relative'>
        <H2>Cette semaine</H2>
        <WeeklyMatch />
        <H2>Actualités</H2>
        <PostsWrapper />
      </div>
    </HeaderAndFooter>
  );
}
