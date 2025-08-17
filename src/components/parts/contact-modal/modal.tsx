'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContactTab } from './contact-tab'
import { InscriptionTab } from './inscription-tab'

type PropsType = {
  label: string
  variant?:
    | 'ghost'
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'nav'
    | 'ghostSecondary'
    | 'activeNav'
    | 'matchNav'
    | 'connexion'
    | 'check'
    | 'blackAndWhite'
    | 'invisible'
    | 'mobileBar'
    | null
  className?: string
  defaultTab?: 'contact' | 'preinscription'
}

export default function ContactModal({
  label,
  variant = 'default',
  defaultTab = 'contact',
  className,
}: Readonly<PropsType>) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={className}
          size={variant === 'mobileBar' ? 'mobileBar' : 'default'}
        >
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="container max-h-[80dvh] max-w-[90%] overflow-y-auto md:max-w-screen-sm">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="flex w-full justify-center gap-4">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="preinscription">Pré-inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="contact">
            <ContactTab setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="preinscription">
            <InscriptionTab setOpen={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
