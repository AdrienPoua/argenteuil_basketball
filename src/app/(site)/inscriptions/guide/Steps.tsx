interface StepProps {
  title: string;
  content: React.ReactNode;
}

function Step({ title, content }: Readonly<StepProps>) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col justify-center space-y-4'>
        <h2 className='whitespace-nowrap text-3xl font-bold tracking-tighter text-primary sm:text-4xl'>{title}</h2>
        <div className='text-foreground'>{content}</div>
      </div>
    </div>
  );
}

export const StepOne = () => (
  <Step
    title='Le dossier'
    content={
      <ul className='flex list-disc flex-col gap-2 font-secondary'>
        <li className='font-secondary'>
          Récupérez le dossier d&apos;inscription
          <a
            href={'/documents/2024-2025_demande_de_licence.pdf'}
            download
            className='mx-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary'
          >
            en le téléchargeant ici
          </a>
          ou en début de saison au gymnase Jean Guimier.
        </li>
        <li className='font-secondary'>
          Remettez-le au gymnase Jean Guimier, du lundi au vendredi entre 17h00 et 20h00.
        </li>
        <li className='font-secondary'>Ou le samedi matin, de 10h30 à 12h00.</li>
        <li className='font-secondary'>Pour les mineurs, pas de certificat médical.</li>
        <li className='font-secondary'>
          Une séance d&apos;essai est recommandée avant toute inscription. Rendez-vous directement à l&apos;entrainement
        </li>
      </ul>
    }
  />
);

export const StepTwo = () => (
  <Step
    title='Inscription informatique'
    content={
      <ul className='flex list-disc flex-col gap-2 font-secondary'>
        <li className='font-secondary'>
          Vous recevrez un lien par email quelques jours après le dépot de votre dossier
        </li>
        <li className='font-secondary'>
          Remplissez le formulaire jusqu&apos;au bout. Défilez les documents si nécessaire pour passer à la suite.
        </li>
        <li className='font-secondary'>Choisissez l&apos;assurance A, qui est incluse dans le prix de la licence.</li>
        <li className='font-secondary'>Assurez-vous que la photo soit récente, claire et sans couvre-chef.</li>
        <li className='font-secondary'>Sélectionnez &quot;paiement au club&quot; comme type de paiement.</li>
      </ul>
    }
  />
);

export const StepThree = () => (
  <Step
    title='Confirmation'
    content={
      <ul className='flex list-disc flex-col gap-2 font-secondary'>
        <li className='font-secondary'>Le club valide votre dossier</li>
        <li className='font-secondary'>Le comité valide votre dossier si il est complet et correct.</li>
        <li className='font-secondary'>
          Un email de confirmation vous sera envoyé une fois l&apos;inscription validée.
        </li>
      </ul>
    }
  />
);
