'use client'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import ContactForm from '@/components/forms/contact-form'
import { DialogFooter } from '@/components/ui/dialog'
import club from '@/core/shared/config/club'

type PropsType = {
  setOpen: (open: boolean) => void
}

export function ContactTab({ setOpen }: Readonly<PropsType>) {
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const onSuccess = () => {
    setOpen(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 9000)
    toast.success('Message envoyé avec succès')
  }
  const onError = () => {
    setError(true)
    setTimeout(() => {
      setOpen(false)
      setError(false)
    }, 9000)
    toast.error("Une erreur est survenue lors de l'envoi du message")
  }
  return (
    <>
      <ContactForm onSuccess={onSuccess} onError={onError} error={error} success={success} />
      <DialogFooter className="flex-col py-4">
        <div className="mx-auto px-4">
          <div className="space-y-2">
            <Link
              className="flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              href={`mailto:${club.contact.email}`}
            >
              <Mail className="h-4 w-4" />
              {club.contact.email}
            </Link>
            <Link
              className="flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              href={`tel:${club.contact.phone}`}
            >
              <Phone className="h-4 w-4" />
              {club.contact.phone}
            </Link>
          </div>
        </div>
      </DialogFooter>
    </>
  )
}
