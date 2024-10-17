'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"



export default function DynamicHero() {
  const [activeContent, setActiveContent] = useState(1)

  return (
    <section className="size-full">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Inscrivez-vous
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Suivez les étapes ci-dessous pour finaliser votre inscription.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size={'lg'} onClick={() => setActiveContent(1)}>1</Button>
            <Button size={'lg'} onClick={() => setActiveContent(2)}>2</Button>
            <Button size={'lg'} onClick={() => setActiveContent(3)}>3</Button>
          </div>
        </div>
        <div className="mt-16 grid gap-2 sm:grid-cols-2 items-center">
          {activeContent === 1 && <StepOne />}
          {activeContent === 2 && <StepTwo />}
          {activeContent === 3 && <StepThree />}
        </div>
      </div>
    </section>
  )
}

// Composant pour l'étape 1
function StepOne() {
  return (
    <>
      <div className="flex justify-center items-center"><Image
        src="/images/divers/inscription_dossier.png"
        alt="Le dossier"
        width={400}
        height={400}
        className="rounded-lg object-cover"
      /></div>
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Le dossier
        </h2>
        <div className="text-muted-foreground md:text-xl">
          <ul className="flex flex-col gap-2">
            <li> - Une séance d&apos;essai est possible et fortement recommandée avant toute inscription.</li>
            <li> - Récupérez le dossier d&apos;inscription
              <a href={'/documents/2024-2025_demande_de_licence.pdf'} download className="mx-2 text-primary">
                ici
              </a>
              ou directement sur place.
            </li>
            <li> - Remettez-le au gymnase Jean Guimier, du lundi au vendredi entre 17h00 et 20h00.</li>
            <li> - Vous pouvez également le déposer le samedi matin, de 10h30 à 12h00.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

// Composant pour l'étape 2
function StepTwo() {
  return (
    <>
      <div className="flex justify-center items-center"><Image
        src="/images/divers/inscription_informatique.png"
        alt="Inscription informatique"
        width={400}
        height={400}
        className="rounded-lg object-cover"
      /></div>
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Inscription informatique
        </h2>
        <div className="text-muted-foreground md:text-xl">
          <ul className="flex flex-col gap-2">
            <li> - Vous recevrez un lien par email.</li>
            <li> - Pour les mineurs, il n&apos;y a pas besoin de certificat médical. Remplissez uniquement le questionnaire de santé.</li>
            <li> - Assurez-vous que la photo soit récente, claire et sans couvre-chef.</li>
            <li> - Choisissez l&apos;assurance A, qui est incluse dans le prix de la licence.</li>
            <li> - Sélectionnez &quot;paiement au club&quot; comme type de paiement.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

// Composant pour l'étape 3
function StepThree() {
  return (
    <>
      <div className="flex justify-center items-center"><Image
        src="/images/divers/inscription_confirmation.png"
        alt="Confirmation"
        width={400}
        height={400}
        className="rounded-lg object-cover"
      /></div>
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Confirmation
        </h2>
        <div className="text-muted-foreground md:text-xl">
          <ul className="flex flex-col gap-2">
            <li> - Votre inscription a bien été reçue.</li>
            <li> - Le comité validera votre dossier dans les plus brefs délais.</li>
            <li> - Un email de confirmation vous sera envoyé une fois l&apos;inscription validée.</li>
          </ul>
        </div>
      </div>
    </>
  )
}