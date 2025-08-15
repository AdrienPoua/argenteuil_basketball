'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Home,
  Menu,
  UserCog,
  UserCheck,
  Users,
  Building,
  CircleHelp,
  Calendar,
  DollarSign,
  FileText,
  Dumbbell,
  Mail,
  Phone,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import Logo from '@/components/Logo'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import ContactModal from '../contact-modal/modal'

const navigationData = [
  {
    label: 'Le club',
    icon: Users,
    dropdowns: [
      { label: 'Dirigeants', href: '/club/dirigeants', icon: UserCog },
      { label: 'Entraineurs', href: '/club/entraineurs', icon: UserCheck },
      { label: 'Equipes', href: '/club/equipes', icon: Users },
      { label: 'Gymnases', href: '/club/gymnases', icon: Building },
    ],
  },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Dialog>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
          <ScrollArea className="h-full">
            <div className="p-6">
              <Logo />
              <Accordion type="single" defaultValue="item-0" collapsible className="w-full">
                {navigationData.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={item.label} className="p-0">
                    <AccordionTrigger className="bg-background">
                      <span className="flex items-center text-nowrap text-foreground">
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.label}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.dropdowns.map((subItem) => (
                          <Button
                            key={subItem.href}
                            variant="ghost"
                            className="w-full justify-start pl-6"
                            onClick={() => setOpen(false)}
                          >
                            <Link href={subItem.href} className="flex items-center">
                              <subItem.icon className="mr-2 h-4 w-4" />
                              {subItem.label}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/plannings/entrainements" className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    entrainements
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/inscriptions/tarifs" className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    tarifs
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/documents" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/faq" className="flex items-center">
                    <CircleHelp className="mr-2 h-4 w-4" />
                    FAQ
                  </Link>
                </Button>
                <ContactModal label="Contact" variant="ghost" className="w-full justify-start" />
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="fixed inset-x-0 bottom-0 z-50 bg-background lg:hidden">
        <nav className="relative grid h-24 grid-cols-4 items-center justify-around border-t border-border px-5">
          <Link
            href="/"
            className={cn(
              'grid-span-1 flex h-full flex-col items-center justify-center',
              pathname === '/' && 'text-primary',
            )}
          >
            🏠
            <span className="text-xs">Accueil</span>
          </Link>
          <Link
            href="/inscriptions/guide"
            className={cn(
              'grid-span-1 flex h-full flex-col items-center justify-center',
              pathname.startsWith('/inscriptions') && 'text-primary',
            )}
          >
            📄
            <span className="text-xs">inscriptions</span>
          </Link>
          <Link
            href="/plannings/matchs"
            className={cn(
              'grid-span-1 flex h-full flex-col items-center justify-center',
              pathname.startsWith('/plannings/matchs') && 'text-primary',
            )}
          >
            🏀
            <span className="text-xs">Matchs</span>
          </Link>
          <div className="grid-span-1 flex h-full flex-col items-center justify-center">
            💻
            <ContactModal label="Contact" variant="mobileBar" />
          </div>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-1/2 top-0 h-12 w-12 -translate-y-1/2 translate-x-1/2"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
        </nav>
      </div>
    </Dialog>
  )
}
