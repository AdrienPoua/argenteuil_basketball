import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSideBar';

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

  // fetch token for ffbb api
  await fetch(`${baseUrl}/api/ffbb/token`);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className='size-full p-16'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
