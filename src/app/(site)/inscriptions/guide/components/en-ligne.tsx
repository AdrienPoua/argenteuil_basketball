import ContactModal from '@/components/parts/contact-modal/modal'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function EnLigne() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-lg bg-primary/5 p-6 text-secondary sm:p-8">
      <div className="text-center">
        <h2 className="text-2xl text-primary sm:text-3xl">Inscription en ligne</h2>
        <p className="mt-4 font-secondary text-foreground/80">
          Suivez ces étapes simples pour vous inscrire et payer en ligne
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col justify-center gap-4 rounded-lg border border-primary/10 bg-background/50 p-6">
          <ContactModal
            label="Appuyez ici"
            defaultTab="preinscription"
            className="mx-auto w-fit bg-secondary transition-all duration-300 hover:bg-secondary/80"
          />
          <Info
            title="Délai"
            icon="⏰"
            description="Vous allez reçevoir un email dans les 48H de la part de IDF0095019@ffbb.com"
          />
          <Info
            title="Impératif"
            icon="🚨"
            description="Vous devez remplir le formulaire reçu par email pour valider votre inscription"
          />
          <Info
            title="Tutoriel"
            icon="🎥"
            description="Vous avez du mal à remplir le formulaire ?"
            link="https://www.youtube.com/watch?v=DLAjRlDBxt4"
          />
          <Info
            title="Paiement"
            icon="💰"
            description="Choissisez paiement en ligne lors du paiement"
          />
        </div>
      </div>
    </div>
  )
}

const Info = ({
  title,
  icon,
  description,
  link,
}: {
  title: string
  icon: string
  description: string
  link?: string
}) => {
  return (
    <div className="w-full rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
      <p className="font-secondary text-sm text-foreground">
        <span className="mr-2 text-base">{icon}</span>
        <strong className="text-primary">{title}</strong> <br />
        {link ? (
          <Link href={link} target="_blank">
            <Button
              variant="link"
              className="text-wrap text-blue-500 underline underline-offset-2 transition-all duration-300 hover:-translate-y-1"
            >
              {description}
            </Button>
          </Link>
        ) : (
          <span className="text-foreground/80">{description}</span>
        )}
      </p>
    </div>
  )
}
