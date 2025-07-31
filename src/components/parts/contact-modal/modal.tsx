"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent, DialogTrigger
} from "@/components/ui/dialog"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/core/shared/utils/cn"
import { ContactTab } from "./contact-tab"
import { InscriptionTab } from "./inscription-tab"

type PropsType = {
  label: string
  variant?: "ghost" | "link" | "default" | "destructive" | "outline" | "secondary" | "nav" | "ghostSecondary" | "activeNav" | "matchNav" | "connexion" | "check" | "blackAndWhite" | "invisible" | null
  className?: string
}

export default function ContactModal({ label, variant = "ghost", className }: Readonly<PropsType>) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={cn(navigationMenuTriggerStyle(), className)}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-screen-sm max-h-[80dvh] overflow-y-auto">
        <Tabs defaultValue="contact" className="w-full">
       {/*  <TabsList className="flex justify-center gap-4 w-full">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="preinscription">Pré-inscription</TabsTrigger>
          </TabsList> */}
          <TabsContent value="contact">
            <ContactTab setOpen={setOpen} />
          </TabsContent>
          {/* <TabsContent value="preinscription">
            <InscriptionTab setOpen={setOpen} />
          </TabsContent> */}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
