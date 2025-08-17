export function Preambule() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-primary md:hidden">Introduction</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Les inscriptions commencent le 25 août {new Date().getFullYear()}</li>
        <li>Nous sommes présent au forum des associations</li>
        <li>
          Une <span className="text-secondary">séance d&apos;essai</span> est recommandée
        </li>
      </ul>
    </div>
  )
}

export function StepOne() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-primary md:hidden">Rendez vous sur place</h3>
      <p>
        <strong className="text-secondary">Documents nécessaires :</strong>
        <ul className="mb-5 list-disc pl-5">
          <li>
            <strong>Demande de licence</strong> (Récupérable sur place)
          </li>
          <li>
            <strong>Moyen de paiement</strong> (chèque ou espèces)
          </li>
        </ul>
        <strong className="text-secondary">Le rendez-vous :</strong>
        <ul className="list-disc pl-5">
          <li>
            <strong>Du lundi au vendredi</strong> : 17h30 - 19h30
          </li>
          <li>
            <strong>Samedi</strong> : 10h00 - 11h30
          </li>
          <li>
            <strong>Samedi</strong> : 13h00 - 15h30
          </li>
          <li>
            Au gymnase <strong>Jean Guimier</strong>
          </li>
          <li>
            Avec <strong className="italic">Bass</strong>
          </li>
        </ul>
        <p className="mt-5 text-secondary">
          Une fois les documents remis, vous recevrez un email avec un lien pour{' '}
          <strong className="text-secondary">finaliser votre inscription</strong>
        </p>
      </p>
    </div>
  )
}

export function StepTwo() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Inscription informatique</h3>
      <p className="text-secondary">
        L&apos;inscription informatique est obligatoire pour être licencié FFBB.
      </p>
      <ol className="list-decimal space-y-4 pl-5">
        <li>Remplissez le formulaire que vous avez reçu par email</li>
        <li>
          {' '}
          <span className="text-secondary"> L&apos;assurance A </span> est incluse dans le prix de
          l&apos;inscription{' '}
        </li>
        <li>
          Choissisez <span className="text-secondary"> &quot;paiement au club&quot; </span> lorsque
          cela vous sera demandé
        </li>
      </ol>
    </div>
  )
}

export function StepThree() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Validation</h3>
      <p>
        Une fois le formulaire rempli et{' '}
        <strong className="text-orange-500"> après validation du club </strong> vous recevrez un
        email qui confirme votre inscription
      </p>
      <p>Vous êtes désormais licencié FFBB et vous pouvez venir jouer vous entrainer !</p>
    </div>
  )
}
