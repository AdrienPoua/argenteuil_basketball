import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/parts/header';
import Footer from '@/components/Footer';
import { PostContent } from './PostContent';
import { sanityFetch } from '../../../../../core/infrastructure/sanity/fetch';
import { POST_QUERY } from '../../../../../core/infrastructure/sanity/queries';
import { SanityDocument } from 'next-sanity';
import ReadingProgressBar from './ReadingProgressBar';
import ShareButtons from './ShareButtons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
      <ReadingProgressBar />
      <div className='h-36 bg-foreground' />
      <main className='w-full bg-foreground'>
        {/* Bannière de navigation avec bouton de retour */}
        <Button asChild size='sm' className='mx-auto flex w-fit items-center text-sm font-medium'>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Retour à la page d&apos;accueil
          </Link>
        </Button>

        {/* Conteneur principal de l'article */}
        <article className='container mx-auto px-4 py-10'>
          {/* Contenu principal */}
          <div className='prose prose-lg mx-auto'>
            <Suspense fallback={<div className='py-10 text-center'>Chargement de l&apos;article...</div>}>
              <PostContent data={post} />
            </Suspense>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
