'use client'
import {
  Calendar,
  Camera,
  Euro,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Trophy,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuth } from '@/core/presentation/hooks/divers/useAuth'

export function AppSidebar() {
  const { logout } = useAuth()
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        {/* Section Gestion */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestion du site</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.site.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Section Inscriptions */}
        <SidebarGroup>
          <SidebarGroupLabel>Inscriptions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.inscriptions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Section Emails */}
        <SidebarGroup>
          <SidebarGroupLabel>Emails</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.emails.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/studio/structure" target="_blank">
                    <Camera />
                    <span>Blog</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>Accueil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  variant="primary"
                  onClick={() => {
                    logout()
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
  )
}

const navItems = {
  site: [
    {
      title: 'Matchs',
      url: `/admin/gestion/matchs`,
      icon: Trophy,
    },
    {
      title: 'Membres',
      url: '/admin/gestion/membres',
      icon: GraduationCap,
    },
    {
      title: 'Equipes',
      url: '/admin/gestion/equipes',
      icon: UsersRound,
    },
    {
      title: 'FAQ',
      url: '/admin/gestion/faq',
      icon: HelpCircle,
    },
    {
      title: 'Documents',
      url: '/admin/gestion/documents',
      icon: FileText,
    },
    {
      title: 'Tarifs',
      url: '/admin/gestion/tarifs',
      icon: Euro,
    },
  ],
  inscriptions: [
    {
      title: 'Pré-inscriptions',
      url: '/admin/inscriptions/pre-inscriptions',
      icon: UsersRound,
    },
  ],
  emails: [
    {
      title: 'Réservations',
      url: '/admin/emails/reservations',
      icon: Calendar,
    },
    {
      title: 'Adhérents',
      url: '/admin/emails/adherents',
      icon: UsersRound,
    },
  ],
}
