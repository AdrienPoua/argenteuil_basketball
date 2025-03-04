import Form from './components/Form';
import Accordion from './components/Accordion';
import FAQService from '@/services/FAQ';

export default async function Index() {
  const faqs = await FAQService.getFaqs();
  const totalFaqs = faqs.length;
  
  return (
    <div className='flex w-full grow flex-col gap-5'>
      <Form />
      <div className='mx-auto w-full max-w-3xl px-4'>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Accordion key={faq.id} faq={faq} totalFaqs={totalFaqs} />
          ))}
        </div>
      </div>
    </div>
  );
}
