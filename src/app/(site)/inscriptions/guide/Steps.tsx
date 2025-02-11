import Image from 'next/image';

interface StepProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: React.ReactNode;
}

function Step({ title, imageSrc, imageAlt, content }: Readonly<StepProps>) {
  return (
    <div className='grid items-center gap-8 sm:grid-cols-2'>
      <div className='flex items-center justify-center'>
        <Image src={imageSrc} alt={imageAlt} width={400} height={400} className='rounded-lg object-cover' />
      </div>
      <div className='flex flex-col justify-center space-y-4'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>{title}</h2>
        <div className='text-muted-foreground md:text-xl'>{content}</div>
      </div>
    </div>
  );
}

export const StepOne = () => (
  <Step
    title='Le dossier'
    imageSrc='/images/divers/inscription_dossier.png'
    imageAlt='Le dossier'
    content={
      <ul className='flex flex-col gap-2'>
        <li>
          Une séance d&apos;essai est possible et fortement recommandée avant toute inscription. Rendez-vous directement
          à l&apos;entrainement
        </li>
        <li>
          Récupérez le dossier d&apos;inscription
          <a
            href={'/documents/2024-2025_demande_de_licence.pdf'}
            download
            className='mx-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary'
          >
            ici
          </a>
          ou directement sur place.
        </li>
        <li>Remettez-le au gymnase Jean Guimier, du lundi au vendredi entre 17h00 et 20h00.</li>
        <li>Vous pouvez également le déposer le samedi matin, de 10h30 à 12h00.</li>
      </ul>
    }
  />
);

export const StepTwo = () => (
  <Step
    title='Inscription informatique'
    imageSrc='/images/divers/inscription_informatique.png'
    imageAlt='Inscription informatique'
    content={
      <ul className='flex flex-col gap-2'>
        <li>Vous recevrez un lien par email.</li>
        <li>
          Pour les mineurs, il n&apos;y a pas besoin de certificat médical. Remplissez uniquement le questionnaire de
          santé.
        </li>
        <li>Assurez-vous que la photo soit récente, claire et sans couvre-chef.</li>
        <li>Choisissez l&apos;assurance A, qui est incluse dans le prix de la licence.</li>
        <li>Sélectionnez &quot;paiement au club&quot; comme type de paiement.</li>
      </ul>
    }
  />
);

export const StepThree = () => (
  <Step
    title='Confirmation'
    imageSrc='/images/divers/inscription_confirmation.png'
    imageAlt='Confirmation'
    content={
      <ul className='flex flex-col gap-2'>
        <li>Votre inscription a bien été reçue.</li>
        <li>Le comité validera votre dossier dans les plus brefs délais.</li>
        <li>Un email de confirmation vous sera envoyé une fois l&apos;inscription validée.</li>
      </ul>
    }
  />
);
