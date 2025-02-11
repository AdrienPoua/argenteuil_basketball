'use client';

import { LoginForm } from '@/components/ui/login-form';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}
