import { getServerSession } from 'next-auth';
import { authOptions } from '@/integrations/nextAuth/auth';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSideBar';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { cookies } from 'next/headers';

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

  try {
    if (!cookies().get('ffbb_token')) {
      const tokenResponse = await fetch(`${baseUrl}/api/ffbb/token`);

      if (!tokenResponse.ok) {
        console.error('Erreur lors de la récupération du token FFBB');
        // Continuer malgré l'erreur pour ne pas bloquer l'interface
      }
    }
  } catch (error) {
    // Journaliser l'erreur mais continuer avec le rendu
    console.error('Erreur lors de la récupération du token:', error);
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
