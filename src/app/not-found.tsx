import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-orange-100 p-4'>
      <div className='relative aspect-[2/1] w-full max-w-3xl overflow-hidden rounded-lg border-4 border-white bg-orange-500'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='h-48 w-48 rounded-full border-4 border-white' />
        </div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='rounded-lg bg-white p-8 text-center shadow-lg'>
            <h1 className='mb-4 text-6xl font-bold text-orange-600'>404</h1>
            <p className='mb-6 text-2xl text-orange-800'>Hors des limites !</p>
            <p className='mb-6 text-lg text-orange-700'>
              Cette page est aussi introuvable qu&apos;un ballon perdu dans les gradins.
            </p>
            <Button asChild className='bg-orange-500 text-white hover:bg-orange-600'>
              <Link href='/' className='flex items-center justify-center'>
                <ArrowLeft className='mr-2' />
                Retour au terrain
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
