"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Home, Menu, Trophy, UserCog, UserCheck, Users, Building, CircleHelp, Calendar, DollarSign, FileText, Dumbbell } from 'lucide-react'
import { cn } from "@/utils/cn"
import Logo from "@/components/Logo"
import { Dialog } from "@/components/ui/dialog"

const navigationData = [
  {
    label: "Le club",
    icon: Users,
    dropdowns: [
      { label: "Dirigeants", href: "/club/dirigeants", icon: UserCog },
      { label: "Entraineurs", href: "/club/entraineurs", icon: UserCheck },
      { label: "Equipes", href: "/club/equipes", icon: Users },
      { label: "Gymnases", href: "/club/gymnases", icon: Building }
    ]
  },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Dialog>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <ScrollArea className="h-full">
            <div className="p-6">
              <Logo />
              <Accordion type="single" collapsible className="w-full">
                {navigationData.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={item.label} className="p-0">
                    <AccordionTrigger className="bg-background">
                      <span className="flex items-center text-foreground text-nowrap">
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
                  <Link href="/entrainements" className="flex items-center">
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
                    <FileText  className="mr-2 h-4 w-4" />
                    Documents
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/faq" className="flex items-center">
                    <CircleHelp  className="mr-2 h-4 w-4" />
                    FAQ
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
        <nav className="flex h-16 items-center justify-around bg-background border-t border-border">
          <Link href="/" className={cn("flex flex-col items-center", pathname === "/" && "text-primary")}>
            <Home className="h-6 w-6" />
            <span className="text-xs">Accueil</span>
          </Link>
          <Link href="/inscriptions/guide" className={cn("flex flex-col items-center", pathname.startsWith("/club") && "text-primary")}>
            <Users className="h-6 w-6" />
            <span className="text-xs">inscriptions</span>
          </Link>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <Link href="/matchs/calendrier" className={cn("flex flex-col items-center", pathname.startsWith("/matchs/calendrier") && "text-primary")}>
            <Calendar className="h-6 w-6" />
            <span className="text-xs">Calendrier</span>
          </Link>
          <Link href="/matchs/resultats" className={cn("flex flex-col items-center", pathname.startsWith("/matchs/resultats") && "text-primary")}>
            <Trophy className="h-6 w-6" />
            <span className="text-xs">Matchs</span>
          </Link>
        </nav>
      </div>
    </Dialog>
  )
}

