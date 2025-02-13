import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PostContent } from './PostContent';
import { sanityFetch } from '@/integrations/sanity/fetch';
import { POST_QUERY } from '@/integrations/sanity/queries';
import { SanityDocument } from 'next-sanity';
import { cn } from '@/lib/utils/cn';

export const metadata = {
  title: 'Actualités | Argenteuil Basketball',
  description: "Découvrez les actualités du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Actualités - Argenteuil Basketball',
    description: "Toutes les infos sur les actualités du club de basket d'Argenteuil.",
  },
};

async function getPost(slug: string) {
  const post = await sanityFetch<SanityDocument>({ query: POST_QUERY(slug) });
  if (!post) notFound();
  return post;
}

interface PageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Readonly<PageProps>) {
  const post = await getPost(params.slug);

  return (
    <>
      <Header />
      <main className={cn('flex grow flex-col items-center bg-foreground', 'pt-32')}>
        <Suspense fallback={<div>Loading...</div>}>
          <PostContent data={post} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
