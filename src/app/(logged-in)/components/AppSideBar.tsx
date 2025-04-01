'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { signOut } from 'next-auth/react';
import {
  Trophy,
  LayoutDashboard,
  UserCog,
  GraduationCap,
  UsersRound,
  HelpCircle,
  LogOut,
  Camera,
  Home,
  Calendar,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {topItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Connexion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-foreground'
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      window.location.href = '/';
                    });
                  }}
                >
                  <LogOut />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const topItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Matchs',
    url: `/dashboard/matchs?month=${new Date().getMonth()}`,
    icon: Trophy,
  },
  {
    title: 'Correspondants',
    url: '/dashboard/correspondants',
    icon: UserCog,
  },
  {
    title: 'Réservations',
    url: '/dashboard/reservations',
    icon: Calendar,
  },
  {
    title: 'Membres',
    url: '/dashboard/membres',
    icon: GraduationCap,
  },
  {
    title: 'Inscriptions',
    url: '/dashboard/inscriptions',
    icon: GraduationCap,
  },
  {
    title: 'Equipes',
    url: '/dashboard/equipes',
    icon: UsersRound,
  },
  {
    title: 'FAQ',
    url: '/dashboard/faq',
    icon: HelpCircle,
  },
  {
    title: 'Documents',
    url: '/dashboard/documents',
    icon: FileText,
  },
];

const bottomItems = [
  {
    title: 'Blog',
    url: '/studio/structure',
    icon: Camera,
  },
  {
    title: 'Acceuil',
    url: '/',
    icon: Home,
  },
];
