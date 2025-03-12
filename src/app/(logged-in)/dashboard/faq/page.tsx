import Accordion from './components/Accordion';
import FAQService from '@/services/FAQ';
import AddFAQModal from './components/AddFAQModal';

export default async function Index() {
  const faqs = await FAQService.getFaqs();
  const totalFaqs = faqs.length;

  return (
    <div className='flex w-full grow flex-col gap-5'>
      <div className='mx-auto flex w-full max-w-3xl items-center justify-between px-4'>
        <AddFAQModal />
      </div>
      <div className='mx-auto w-full max-w-3xl px-4'>
        <div className='space-y-4'>
          {faqs.map((faq) => (
            <Accordion key={faq.id} faq={faq} totalFaqs={totalFaqs} />
          ))}
        </div>
      </div>
    </div>
  );
}
