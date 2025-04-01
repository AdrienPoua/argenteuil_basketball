'use client';

import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/ui/login-form';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Loader className="h-10 w-10 animate-spin" />
    </div>
  }

  if (session) {
    return redirect('/dashboard');
  }


  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
        <Button className='mt-10 w-full' onClick={() => router.push('/')}>
          Retour à l&apos;acceuil
        </Button>
      </div>
    </div>
  );
}
