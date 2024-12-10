'use client'
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
  SidebarRail
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react"
import {
  Trophy,
  LayoutDashboard,
  Calendar,
  UserCog,
  GraduationCap,
  UsersRound,
  HelpCircle,
  LogOut,
  Camera,
  Home
} from "lucide-react"
import Link from "next/link"


export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader />
      <SidebarContent >
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
      <SidebarFooter >
        <SidebarGroup >
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
              <SidebarMenuItem >
                <SidebarMenuButton asChild>
                  <SidebarMenuButton className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-foreground" onClick={() => signOut()}>
                    <LogOut />
                    <span>Déconnexion</span>
                  </SidebarMenuButton>
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


const topItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Matchs",
    url: "/dashboard/matchs",
    icon: Trophy,
  },
  {
    title: "Convocations",
    url: "/dashboard/convocations",
    icon: Calendar,
  },
  {
    title: "Correspondants",
    url: "/dashboard/correspondants",
    icon: UserCog,
  },
  {
    title: "Staffs",
    url: "/dashboard/staffs",
    icon: GraduationCap,
  },
  {
    title: "Equipes",
    url: "/dashboard/equipes",
    icon: UsersRound,
  },
  {
    title: "FAQ",
    url: "/dashboard/faq",
    icon: HelpCircle,
  }
]

const bottomItems = [
  {
    title: "Blog",
    url: "/studio/structure",
    icon: Camera
  },
  {
    title: "Acceuil",
    url: "/",
    icon: Home,
  }
]
