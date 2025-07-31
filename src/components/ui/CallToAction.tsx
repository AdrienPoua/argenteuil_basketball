import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import ContactModal from '@/components/parts/contact-modal/modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import club from '@/core/shared/config/club'

interface CallToActionProps {
  title: string
  description: string
  buttonLabel?: string
  className?: string
}

/**
 * Composant Call-to-Action réutilisable avec modale de contact intégrée
 */
export default function CallToAction({
  title,
  description,
  buttonLabel = '🏀 Contactez-nous 🏀',
  className = '',
}: Readonly<CallToActionProps>) {
  return (
    <div
      className={`mx-auto max-w-screen-xl rounded-xl bg-primary/20 p-8 text-center ${className}`}
    >
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      <p className={`mb-6`}>{description}</p>

      <div className="flex justify-center">
        <Dialog>
          <ContactModal label={buttonLabel} variant="outline" />

          <DialogContent className="sm:max-w-md md:max-w-screen-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl text-primary">
                <Mail className="h-5 w-5 text-primary" />
                Contactez-nous
              </DialogTitle>
              <DialogDescription>
                Une question ? Une demande ? Nous sommes là pour vous aider !
              </DialogDescription>
            </DialogHeader>

            <ContactModal label={buttonLabel} variant="outline" />

            <DialogFooter className="flex-col space-y-4 sm:space-y-4">
              <div className="mx-auto rounded-lg bg-muted/30 p-4">
                <p className="mb-2 text-sm text-muted-foreground">Autres moyens de contact :</p>
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
