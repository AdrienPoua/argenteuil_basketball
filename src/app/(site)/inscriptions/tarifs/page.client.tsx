import CallToAction from '@/components/ui/CallToAction';
import H1 from '@/components/ui/H1';
import { Tarif } from '@/core/domain/entities/tarif.entity';
import { TarifCard } from './page.card';

export default function TarifsClient({ tarifs }: { tarifs: Tarif[] }) {
  return (
    <div className='relative px-4 sm:px-6 lg:px-8'>
      {/* Hero section with animated background */}
      <H1 className='mb-3 text-center sm:mb-4'>Nos tarifs</H1>
      <div className='custom-gradient-tertiary relative mb-8 overflow-hidden rounded-xl p-6 sm:mb-12 sm:rounded-2xl sm:p-8'>
        <div className='relative z-10 space-y-2 sm:space-y-3'>
          <p className='text-sm text-gray-600 sm:text-lg'>
            💡 L&apos; assurance A est incluse dans le tarif de la licence.
          </p>
          <p className='text-sm text-gray-600 sm:text-lg'>
            💡 En plus du montant de la licence, les adultes qui travaillent peuvent prendre l&apos;option B à 6,27€ ou
            B+C à 6.63€
          </p>
          <p className='text-sm text-gray-600 sm:text-lg'>
            💡 -20€ sur le deuxième enfant de la même famille | -40€ sur le troisième enfant (déduction sur le dernier
            licencié uniquement)
          </p>
          <p className='text-sm text-gray-600 sm:text-lg'>
            💡 Les chèques vacances sont acceptés moyennant un supplément de 5€
          </p>
        </div>
      </div>

      {/* Cards layout for modern view */}
      <div className='mb-8 sm:mb-12'>
        {!tarifs || tarifs.length === 0 ? (
          <div className='py-8 text-center text-gray-500'>
            <p>Aucun tarif disponible pour le moment.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
            {tarifs.map((tarif, index) => (
              <TarifCard key={tarif.id} tarif={tarif} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Call to action */}
      <CallToAction
        title='Prêt à nous rejoindre ?'
        description="Inscription simple et rapide. Venez découvrir notre club lors d'un entraînement gratuit !"
        buttonLabel='💪 Contactez-nous pour vous inscrire'
        variant='gradient'
        className='mt-8 sm:mt-12'
      />
    </div>
  );
}
