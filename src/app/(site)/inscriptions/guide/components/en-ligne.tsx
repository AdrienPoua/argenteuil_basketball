import React from 'react'
import { CheckCircle, Mail, CreditCard, AlertTriangle } from 'lucide-react'
import ContactModal from '@/components/parts/contact-modal/modal'

export default function EnLigne() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-lg bg-primary/5 p-5 text-secondary">
      <div className="mb-10 text-center">
        <h2 className="text-2xl text-primary">Guide d&apos;inscription - Paiement en ligne</h2>
        <p className="font-secondary">
          Suivez ces étapes simples pour vous inscrire et payer en ligne
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Étape 1 */}
        <div className="flex gap-4 rounded-lg border p-4">
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              1
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-2 flex items-center gap-2 text-lg text-primary">
              <CheckCircle className="h-5 w-5 text-secondary" />
              Remplir le formulaire de pré-inscription
            </h3>
            <div className="my-5 flex justify-center">
              <ContactModal label="Appuyez ici" defaultTab="preinscription" />
            </div>
            <div className="rounded-md border p-3">
              <p className="font-secondary text-sm text-secondary">
                💡 <strong>Astuce :</strong> Vérifiez bien votre adresse email, c&apos;est là que
                vous recevrez la suite des instructions !
              </p>
            </div>
          </div>
        </div>

        {/* Étape 2 */}
        <div className="flex gap-4 rounded-lg border p-4">
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              2
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-2 flex items-center gap-2 text-lg text-primary">
              <Mail className="h-5 w-5 text-blue-500" />
              Remplir le formulaire de la fédération
            </h3>
            <p className="mb-3 font-secondary text-foreground">
              Sous <strong>48h</strong>, vous recevrez par email un formulaire d&apos;inscription de
              la fédération (IDF0095019@ffbb.com)
            </p>
            <div className="rounded-md border p-3">
              <p className="font-secondary text-sm text-secondary">
                ⏰ Délai : Pensez à vérifier vos spams si vous ne recevez rien après 48h !
              </p>
            </div>
          </div>
        </div>

        {/* Étape 3 */}
        <div className="flex gap-4 rounded-lg border p-4">
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              3
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-2 flex items-center gap-2 text-lg text-primary">
              <CreditCard className="h-5 w-5 text-green-500" />
              Payer en ligne via HelloAsso
            </h3>
            <p className="mb-3 font-secondary text-foreground">
              Une fois le formulaire rempli, choissiez &quot;paiement en ligne&quot; et suivez les
              instructions.
            </p>

            <div className="space-y-3">
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <p className="font-secondary text-sm text-red-500">
                    <strong>Important :</strong> Pensez à bien{' '}
                    <strong>décocher le &quot;don&quot;</strong> qui est coché par défaut sur
                    HelloAsso !
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-green-200 bg-green-50 p-3">
                <p className="font-secondary text-sm text-green-500">
                  💳 <strong>Facilité de paiement :</strong> Possibilité de payer en{' '}
                  <strong>3 fois sans frais</strong> directement sur HelloAsso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
