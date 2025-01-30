import H1 from '@/components/H1';
import MainSection from '@/components/layouts/MainSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQService } from '@/database/services/FAQ';

export default async function Index() {
  const faq = await new FAQService().getFaqs();
  return (
    <>
      <H1> Vos questions </H1>
      <MainSection>
        <div className='mx-auto mb-10 flex max-w-[800px] justify-center'></div>
        <div className='mx-auto flex max-w-[800px] flex-col gap-5'>
          {faq.map((item) => (
            <Accordion type='single' collapsible className='w-full' key={item.id}>
              <AccordionItem value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className='bg-foreground p-5 text-background'>
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </MainSection>
    </>
  );
}
