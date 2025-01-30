import Form from './components/Form';
import Accordion from './components/Accordion';
import { FAQService } from '@/database/services/FAQ';

export default async function Index() {
  const faqService = new FAQService();
  const faqs = await faqService.getFaqs();
  return (
    <div className='flex w-full grow flex-col gap-5'>
      <Form />
      <div className='mx-auto flex w-[1000px] flex-col gap-3'>
        {faqs.map((faq) => (
          <Accordion key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}
