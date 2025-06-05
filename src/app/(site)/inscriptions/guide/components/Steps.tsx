export function Preambule() {
  return (
    <div className='space-y-6'>
      <ul className='list-disc space-y-2 pl-5'>
        <li>Les inscriptions commenceront le 15 septembre {new Date().getFullYear()}</li>
        <li>Les entrainements commenceront le 15 septembre {new Date().getFullYear()}</li>
        <li>Nous sommes présent au forum des associations qui a lieu chaque année à Jean Vilar</li>
        <li>Moyen de paiement (chèque ou espèces) - Paiement en plusieurs fois possible</li>
        <li>Une séance d&apos;essaie est recommandée pour les nouveaux adhérents</li>
        <li className='text-red-500'> Pas de certificat médical necessaire pour les mineurs</li>
      </ul>
    </div>
  );
}

export function StepOne() {
  return (
    <div className='space-y-6'>
      <p>
        Pour votre inscription, vous avez besoin de:
        <ul className='mb-5 list-disc pl-5'>
          <li>Demande de licence (Récupérable sur place également) </li>
          <li> Moyen de paiement (chèque ou espèces) - Paiement en plusieurs fois possible</li>
          <li className='text-red-500'> Ne pas donner le certificat médical ! </li>
        </ul>
        <p>Rendez vous au gymnase Jean Guimier, 2 rue jean de la fontaine 95100 Argenteuil</p>
        <ul className='list-disc pl-5'>
          <li>
            <strong>Du lundi au vendredi</strong> : 17h30 - 20h00
          </li>
          <li>
            <strong>Samedi</strong> : 10h00 - 12h00
          </li>
          <li>
            Mr.DIME (Bass) est responsable des inscriptions, il vous attendra à l&apos;accueil ou dans le gymnase.
          </li>
          <p className='text-orange-500'>
            {' '}
            Une fois les documents remis, vous recevrez un email avec un lien pour{' '}
            <strong>finaliser votre inscription</strong>{' '}
          </p>
        </ul>
      </p>
    </div>
  );
}

export function StepTwo() {
  return (
    <div className='space-y-6'>
      <h3 className='text-2xl font-bold'>Inscription en ligne</h3>
      <p className='text-orange-500'>L&apos;inscription informatique est obligatoire pour être licencié FFBB.</p>
      <ol className='list-decimal space-y-4 pl-5'>
        <li>
          Utiliser le lien que vous avez reçu par email{' '}
          <strong className='text-orange-500'> (cela peut prendre quelques jours)</strong> pour obtenir votre licence
        </li>
        <li>
          <strong>Remplissez le formulaire</strong> avec vos informations personnelles
        </li>
        <li>
          {' '}
          <span className='text-orange-500'> L&apos;assurance A </span> est incluse dans le prix de l&apos;inscription{' '}
        </li>
        <li>
          Choissisez <span className='text-orange-500'> &quot;paiement au club&quot; </span> lorsque cela vous sera
          demandé
        </li>
      </ol>
    </div>
  );
}

export function StepThree() {
  return (
    <div className='space-y-6'>
      <h3 className='text-2xl font-bold'>Validation</h3>
      <p>
        Une fois le formulaire rempli et <strong className='text-orange-500'> après validation du club </strong> vous
        recevrez un email qui confirme votre inscription
      </p>
      <p>Vous êtes désormais licencié FFBB et vous pouvez venir jouer à l&apos;entrainement !</p>
    </div>
  );
}
