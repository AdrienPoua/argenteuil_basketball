import ContactModal from '@/components/parts/contact-modal/modal'

export default function EnLigne() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-lg bg-primary/5 p-5 text-secondary">
      <div className="mb-10 text-center">
        <h2 className="text-2xl text-primary">
          Guide d&apos;inscription <br /> Paiement en ligne
        </h2>
        <p className="mt-3 font-secondary">
          Suivez ces étapes simples pour vous inscrire et payer en ligne
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Étape 1 */}
        <div className="flex gap-4 rounded-lg border p-4">
          <div className="flex-1">
            <h3 className="mb-2 flex items-center gap-2 text-lg text-primary">
              <NumberIndex number="1" />
              Remplir le premier formulaire
            </h3>
            <div className="my-5 flex justify-center">
              <ContactModal label="Appuyez ici" defaultTab="preinscription" />
            </div>
            <Info
              title="Astuce"
              icon="💡"
              description="Vérifiez bien votre adresse email, c'est là que vous recevrez la suite des instructions !"
            />
          </div>
        </div>

        {/* Étape 2 */}
        <div className="flex gap-4 rounded-lg border p-4">
          <div className="flex-1">
            <h3 className="mb-2 flex items-center gap-2 text-lg text-primary">
              <NumberIndex number="2" />
              Remplir le deuxième formulaire
            </h3>
            <p className="mb-5 font-secondary text-foreground">
              Sous <strong>48h</strong>, vous recevrez par email un formulaire d&apos;inscription de
              la fédération (IDF0095019@ffbb.com)
            </p>
            <Info
              title="Délai"
              icon="⏰"
              description="Pensez à vérifier vos spams si vous ne recevez rien après 48h !"
            />
          </div>
        </div>

        {/* Étape 3 */}
        <div className="flex gap-4 rounded-lg border p-4">
          <div className="flex-1">
            <h3 className="mb-2 flex items-center gap-2 text-lg text-primary">
              <NumberIndex number="3" />
              Payer en ligne via HelloAsso
            </h3>
            <p className="mb-5 font-secondary text-foreground">
              Une fois le formulaire rempli, choissiez &quot;paiement en ligne&quot; et suivez les
              instructions.
            </p>

            <div className="space-y-3">
              <Info
                title="Important"
                icon="⚠️"
                description='Pensez à bien décocher le "don" qui est coché par défaut sur HelloAsso !'
              />
              <Info
                title="Facilité de paiement"
                icon="💳"
                description="Possibilité de payer en 3 fois sans frais directement sur HelloAsso."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NumberIndex = ({ number }: Readonly<{ number: string }>) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
      {number}
    </div>
  )
}

const Info = ({
  title,
  icon,
  description,
}: {
  title: string
  icon: string
  description: string
}) => {
  return (
    <div className="mx-auto rounded-md border p-3">
      <p className="font-secondary text-sm text-secondary">
        {icon} <strong>{title} :</strong> {description}
      </p>
    </div>
  )
}
