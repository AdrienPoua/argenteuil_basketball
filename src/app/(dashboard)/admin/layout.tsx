'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './layout.sidebar'

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="container mx-auto size-full p-16 font-sans">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
