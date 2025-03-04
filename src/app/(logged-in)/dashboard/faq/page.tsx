import Accordion from './components/Accordion';
import FAQService from '@/services/FAQ';
import FormModal from './components/FormModal';

export default async function Index() {
  const faqs = await FAQService.getFaqs();
  const totalFaqs = faqs.length;

  return (
    <div className='flex w-full grow flex-col gap-6'>
      <FormModal />

      <div className='mx-auto w-full max-w-3xl px-4'>
        {faqs.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center'>
            <h2 className='text-xl font-semibold'>Aucune FAQ disponible</h2>
            <p className='text-muted-foreground'>
              Ajoutez votre première FAQ en cliquant sur le bouton &quot;Ajouter une FAQ&quot;
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {faqs.map((faq) => (
              <Accordion key={faq.id} faq={faq} totalFaqs={totalFaqs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
