'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function StepOne() {
  return (
    <div className='space-y-6'>
      <h3 className='text-2xl font-bold'>Documents nécessaires</h3>
      <p>Pour votre inscription, veuillez préparer les documents suivants:</p>
      <ul className='list-disc space-y-2 pl-5'>
        <li>Pas de certificat médical pour les mineurs</li>
        <li>Photo d&apos;identité récente</li>
        <li>Moyen de paiement (chèque ou espèces)</li>
      </ul>
      <div className='pt-4'>
        <Button asChild>
          <Link href='/documents'>Télécharger les documents</Link>
        </Button>
      </div>
    </div>
  );
}

export function StepTwo() {
  return (
    <div className='space-y-6'>
      <h3 className='text-2xl font-bold'>Inscription en ligne</h3>
      <p>L&apos;inscription au club d&apos;Argenteuil Basketball se fait en ligne via notre plateforme sécurisée.</p>
      <ol className='list-decimal space-y-4 pl-5'>
        <li>
          <strong>Créez votre compte</strong> sur la plateforme de la FFBB (vous recevrez un email avec un lien)
        </li>
        <li>
          <strong>Remplissez le formulaire</strong> avec vos informations personnelles
        </li>
        <li>
          <strong>Téléchargez les documents</strong> requis (certificat médical, photo, etc.)
        </li>
        <li>
          <strong>Vérifiez vos informations</strong> avant de finaliser votre inscription
        </li>
      </ol>
    </div>
  );
}

export function StepThree() {
  return (
    <div className='space-y-6'>
      <h3 className='text-2xl font-bold'>Validation et paiement</h3>
      <p>Une fois votre dossier complété, vous devez finaliser votre inscription par le paiement:</p>
      <div className='rounded-lg bg-primary/10 p-4'>
        <h4 className='mb-2 font-bold'>Options de paiement</h4>
        <ul className='list-disc space-y-2 pl-5'>
          <li>Sur place au gymnase (espèces ou chèque)</li>
          <li>Par courrier (chèque uniquement)</li>
          <li>Possibilité de paiement échelonné (jusqu&apos;à 3 fois)</li>
        </ul>
      </div>
      <p className='text-sm italic'>
        Votre inscription ne sera définitivement validée qu&apos;après réception du paiement complet.
      </p>
    </div>
  );
}
