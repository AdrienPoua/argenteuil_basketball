import { getServerSession } from 'next-auth';
import { authOptions } from '@/integrations/nextAuth/auth';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSideBar';
import { PageHeader } from '@/components/dashboard/PageHeader';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
        <main className='container mx-auto size-full p-16'>
          <PageHeader />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
