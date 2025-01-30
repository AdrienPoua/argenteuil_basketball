import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/services/nextAuth/auth';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-6xl font-bold'>Unauthorized</h1>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className='size-full p-16'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
